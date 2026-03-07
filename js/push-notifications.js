/**
 * AMBROSE Health Push Notification System v1.1
 * 推送提醒系统 (喝水/运动/睡眠)
 * 基于 Service Workers + Push API
 * 修复：XSS漏洞、内存泄漏、敏感信息硬编码
 */

// 常量定义
const PUSH_CONSTANTS = {
  STORAGE_KEYS: {
    TOKEN: 'ambrose_token',
    SUBSCRIPTION: 'pushSubscription',
    SETTINGS: 'pushSettings'
  },
  API_ENDPOINTS: {
    SETTINGS: '/push/settings',
    SUBSCRIBE: '/push/subscribe',
    UNSUBSCRIBE: '/push/unsubscribe',
    TEST: '/push/test'
  },
  DEFAULT_SETTINGS: {
    isSubscribed: false,
    preferences: {
      waterReminders: {
        enabled: true,
        interval: 60,
        startTime: '08:00',
        endTime: '22:00'
      },
      exerciseReminders: {
        enabled: true,
        time: '18:00',
        days: ['mon', 'tue', 'wed', 'thu', 'fri']
      },
      sleepReminders: {
        enabled: true,
        bedtime: '22:30',
        wakeTime: '07:00'
      },
      reportNotifications: {
        enabled: true,
        time: '09:00'
      }
    }
  },
  INTERVALS: {
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000
  }
};

// 安全转义函数
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

class PushNotificationManager {
  constructor() {
    this.apiBaseUrl = window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api';
    // VAPID公钥从配置读取，不再硬编码
    this.vapidPublicKey = window.AMBROSE_CONFIG?.vapidPublicKey || '';
    this.swRegistration = null;
    this.isSubscribed = false;
    this.subscription = null;
    this.settings = null;
    this.reminderTimers = {};
    this.isDestroyed = false;
  }

  async init() {
    if (this.isDestroyed) return false;
    
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      this.renderUnsupportedUI();
      return false;
    }
    
    try {
      // 注册Service Worker
      this.swRegistration = await navigator.serviceWorker.register('/sw.js');
      
      // 获取当前订阅状态
      this.subscription = await this.swRegistration.pushManager.getSubscription();
      this.isSubscribed = !!this.subscription;
      
      // 加载设置
      await this.loadSettings();
      
      // 更新UI
      this.updateUI();
      
      // 如果是首次访问，请求权限
      if (this.isSubscribed) {
        this.startLocalReminders();
      }
      
      // 页面卸载时清理资源
      this.setupCleanupHandler();
      
      return true;
    } catch (error) {
      return false;
    }
  }

  setupCleanupHandler() {
    // 页面卸载前清理资源
    const cleanup = () => this.destroy();
    window.addEventListener('beforeunload', cleanup);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // 页面隐藏时可以暂停非必要的定时器
      }
    });
  }

  getAuthToken() {
    return localStorage.getItem(PUSH_CONSTANTS.STORAGE_KEYS.TOKEN) || '';
  }

  async loadSettings() {
    try {
      const response = await fetch(`${this.apiBaseUrl}${PUSH_CONSTANTS.API_ENDPOINTS.SETTINGS}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        this.settings = result.data;
        this.isSubscribed = result.data.isSubscribed;
      } else {
        this.settings = { ...PUSH_CONSTANTS.DEFAULT_SETTINGS };
      }
    } catch (error) {
      this.settings = { ...PUSH_CONSTANTS.DEFAULT_SETTINGS };
    }
  }

  async subscribe() {
    if (!this.vapidPublicKey) {
      this.showToast('推送服务未配置，请联系管理员', 'error');
      return false;
    }
    
    try {
      // 请求通知权限
      const permission = await Notification.requestPermission();
      
      if (permission !== 'granted') {
        this.showToast('需要通知权限才能使用提醒功能', 'error');
        return false;
      }
      
      // 订阅Push
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });
      
      this.subscription = subscription;
      this.isSubscribed = true;
      
      // 发送到服务器
      await this.saveSubscription(subscription);
      
      // 启动本地提醒
      this.startLocalReminders();
      
      this.updateUI();
      this.showToast('推送通知已启用！');
      
      return true;
    } catch (error) {
      this.showToast('订阅失败，请重试', 'error');
      return false;
    }
  }

  async unsubscribe() {
    try {
      if (this.subscription) {
        await this.subscription.unsubscribe();
      }
      
      // 通知服务器
      await fetch(`${this.apiBaseUrl}${PUSH_CONSTANTS.API_ENDPOINTS.UNSUBSCRIBE}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      this.subscription = null;
      this.isSubscribed = false;
      
      // 停止本地提醒
      this.stopLocalReminders();
      
      this.updateUI();
      this.showToast('推送通知已关闭');
      
      return true;
    } catch (error) {
      this.showToast('取消订阅失败', 'error');
      return false;
    }
  }

  async saveSubscription(subscription) {
    try {
      await fetch(`${this.apiBaseUrl}${PUSH_CONSTANTS.API_ENDPOINTS.SUBSCRIBE}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          deviceInfo: {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            language: navigator.language
          }
        })
      });
    } catch (error) {
      // 静默处理错误
    }
  }

  async updateSettings(preferences) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${PUSH_CONSTANTS.API_ENDPOINTS.SETTINGS}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences })
      });
      
      if (response.ok) {
        this.settings.preferences = preferences;
        this.showToast('设置已保存');
        
        // 重新启动提醒
        if (this.isSubscribed) {
          this.stopLocalReminders();
          this.startLocalReminders();
        }
        
        return true;
      }
    } catch (error) {
      this.showToast('保存失败', 'error');
    }
    return false;
  }

  startLocalReminders() {
    if (this.isDestroyed) return;
    if (!this.settings?.preferences) return;
    
    const prefs = this.settings.preferences;
    
    // 喝水提醒
    if (prefs.waterReminders?.enabled) {
      this.scheduleWaterReminders(prefs.waterReminders);
    }
    
    // 运动提醒
    if (prefs.exerciseReminders?.enabled) {
      this.scheduleExerciseReminders(prefs.exerciseReminders);
    }
    
    // 睡眠提醒
    if (prefs.sleepReminders?.enabled) {
      this.scheduleSleepReminders(prefs.sleepReminders);
    }
    
    // 报告通知
    if (prefs.reportNotifications?.enabled) {
      this.scheduleReportReminders(prefs.reportNotifications);
    }
  }

  stopLocalReminders() {
    Object.values(this.reminderTimers).forEach(timer => {
      if (timer) {
        clearInterval(timer);
        clearTimeout(timer);
      }
    });
    this.reminderTimers = {};
  }

  scheduleWaterReminders(settings) {
    const interval = (settings.interval || 60) * PUSH_CONSTANTS.INTERVALS.MINUTE;
    
    const checkAndNotify = () => {
      if (this.isDestroyed) return;
      
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (currentTime >= settings.startTime && currentTime <= settings.endTime) {
        this.showLocalNotification('💧 喝水提醒', '该喝水了！保持身体水分充足。', 'water');
      }
    };
    
    // 立即检查一次
    checkAndNotify();
    
    // 设置定时器
    this.reminderTimers.water = setInterval(checkAndNotify, interval);
  }

  scheduleExerciseReminders(settings) {
    const checkAndNotify = () => {
      if (this.isDestroyed) return;
      
      const now = new Date();
      const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const today = dayNames[now.getDay()];
      
      if (settings.days?.includes(today)) {
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        if (currentTime === settings.time) {
          this.showLocalNotification('💪 运动提醒', '今天还没运动呢，动起来吧！', 'exercise');
        }
      }
    };
    
    this.reminderTimers.exercise = setInterval(checkAndNotify, PUSH_CONSTANTS.INTERVALS.MINUTE);
  }

  scheduleSleepReminders(settings) {
    const checkAndNotify = () => {
      if (this.isDestroyed) return;
      
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      // 睡前提醒 (提前30分钟)
      const [bedHour, bedMin] = settings.bedtime.split(':').map(Number);
      const reminderTime = `${String(bedHour).padStart(2, '0')}:${String(Math.max(0, bedMin - 30)).padStart(2, '0')}`;
      
      if (currentTime === reminderTime) {
        this.showLocalNotification('😴 睡眠提醒', '还有30分钟到睡觉时间，开始准备吧！', 'sleep');
      }
      
      if (currentTime === settings.bedtime) {
        this.showLocalNotification('😴 该睡觉了', '保证充足睡眠，明天精神满满！', 'sleep');
      }
      
      // 起床提醒
      if (currentTime === settings.wakeTime) {
        this.showLocalNotification('☀️ 早上好', '新的一天开始了，记得记录睡眠数据！', 'sleep');
      }
    };
    
    this.reminderTimers.sleep = setInterval(checkAndNotify, PUSH_CONSTANTS.INTERVALS.MINUTE);
  }

  scheduleReportReminders(settings) {
    const checkAndNotify = () => {
      if (this.isDestroyed) return;
      
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (currentTime === settings.time) {
        this.showLocalNotification('📊 健康日报', '您的今日健康报告已生成，点击查看！', 'report');
      }
    };
    
    this.reminderTimers.report = setInterval(checkAndNotify, PUSH_CONSTANTS.INTERVALS.MINUTE);
  }

  showLocalNotification(title, body, tag = 'general') {
    if (this.isDestroyed) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    
    const options = {
      body,
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      tag,
      requireInteraction: tag !== 'water',
      actions: [
        { action: 'open', title: '打开应用' },
        { action: 'dismiss', title: '忽略' }
      ]
    };
    
    if (this.swRegistration) {
      this.swRegistration.showNotification(title, options);
    } else {
      new Notification(title, options);
    }
  }

  async sendTestNotification(type = 'test') {
    if (!this.isSubscribed) {
      this.showToast('请先启用推送通知', 'error');
      return;
    }
    
    try {
      const response = await fetch(`${this.apiBaseUrl}${PUSH_CONSTANTS.API_ENDPOINTS.TEST}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type })
      });
      
      if (response.ok) {
        this.showToast('测试通知已发送');
      }
    } catch (error) {
      // 本地测试
      const testMessages = {
        water: { title: '💧 喝水提醒', body: '该喝水了！保持身体水分充足。' },
        exercise: { title: '💪 运动提醒', body: '今天还没运动呢，动起来吧！' },
        sleep: { title: '😴 睡眠提醒', body: '该准备睡觉了，保证充足睡眠哦。' }
      };
      
      const msg = testMessages[type] || { title: '🔔 测试通知', body: '推送通知功能正常工作！' };
      this.showLocalNotification(msg.title, msg.body, type);
    }
  }

  updateUI() {
    // 更新订阅状态显示
    const statusEl = document.getElementById('pushStatus');
    if (statusEl) {
      statusEl.textContent = this.isSubscribed ? '已启用' : '未启用';
      statusEl.className = this.isSubscribed ? 'status-enabled' : 'status-disabled';
    }
    
    // 更新切换按钮
    const toggleBtn = document.getElementById('pushToggleBtn');
    if (toggleBtn) {
      toggleBtn.textContent = this.isSubscribed ? '关闭推送' : '启用推送';
      toggleBtn.className = this.isSubscribed ? 'btn-secondary' : 'btn-primary';
    }
    
    // 更新设置表单
    this.renderSettingsForm();
  }

  renderSettingsForm() {
    const container = document.getElementById('pushSettingsForm');
    if (!container || !this.settings) return;
    
    const prefs = this.settings.preferences;
    
    const form = document.createElement('div');
    form.innerHTML = `
      <div class="setting-group">
        <div class="setting-header">
          <span class="setting-title">💧 喝水提醒</span>
          <label class="toggle-switch">
            <input type="checkbox" id="waterEnabled" ${prefs.waterReminders?.enabled ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-options" ${prefs.waterReminders?.enabled ? '' : 'style="display:none"'}>
          <div class="option-row">
            <label>间隔 (分钟)</label>
            <select id="waterInterval">
              <option value="30" ${prefs.waterReminders?.interval === 30 ? 'selected' : ''}>30分钟</option>
              <option value="60" ${prefs.waterReminders?.interval === 60 ? 'selected' : ''}>1小时</option>
              <option value="120" ${prefs.waterReminders?.interval === 120 ? 'selected' : ''}>2小时</option>
            </select>
          </div>
          <div class="option-row">
            <label>开始时间</label>
            <input type="time" id="waterStartTime" value="${escapeHtml(prefs.waterReminders?.startTime || '08:00')}">
          </div>
          <div class="option-row">
            <label>结束时间</label>
            <input type="time" id="waterEndTime" value="${escapeHtml(prefs.waterReminders?.endTime || '22:00')}">
          </div>
        </div>
      </div>

      <div class="setting-group">
        <div class="setting-header">
          <span class="setting-title">💪 运动提醒</span>
          <label class="toggle-switch">
            <input type="checkbox" id="exerciseEnabled" ${prefs.exerciseReminders?.enabled ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-options" ${prefs.exerciseReminders?.enabled ? '' : 'style="display:none"'}>
          <div class="option-row">
            <label>提醒时间</label>
            <input type="time" id="exerciseTime" value="${escapeHtml(prefs.exerciseReminders?.time || '18:00')}">
          </div>
        </div>
      </div>

      <div class="setting-group">
        <div class="setting-header">
          <span class="setting-title">😴 睡眠提醒</span>
          <label class="toggle-switch">
            <input type="checkbox" id="sleepEnabled" ${prefs.sleepReminders?.enabled ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="setting-options" ${prefs.sleepReminders?.enabled ? '' : 'style="display:none"'}>
          <div class="option-row">
            <label>就寝时间</label>
            <input type="time" id="sleepBedtime" value="${escapeHtml(prefs.sleepReminders?.bedtime || '22:30')}">
          </div>
          <div class="option-row">
            <label>起床时间</label>
            <input type="time" id="sleepWakeTime" value="${escapeHtml(prefs.sleepReminders?.wakeTime || '07:00')}">
          </div>
        </div>
      </div>

      <button class="btn-primary" id="savePushSettings">保存设置</button>
    `;
    
    container.innerHTML = '';
    container.appendChild(form);
    
    // 绑定切换事件
    container.querySelectorAll('.toggle-switch input').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const options = e.target.closest('.setting-group').querySelector('.setting-options');
        if (options) {
          options.style.display = e.target.checked ? 'block' : 'none';
        }
      });
    });
    
    // 绑定保存按钮
    const saveBtn = document.getElementById('savePushSettings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveSettings());
    }
  }

  async saveSettings() {
    const prefs = {
      waterReminders: {
        enabled: document.getElementById('waterEnabled')?.checked || false,
        interval: parseInt(document.getElementById('waterInterval')?.value || 60),
        startTime: document.getElementById('waterStartTime')?.value || '08:00',
        endTime: document.getElementById('waterEndTime')?.value || '22:00'
      },
      exerciseReminders: {
        enabled: document.getElementById('exerciseEnabled')?.checked || false,
        time: document.getElementById('exerciseTime')?.value || '18:00',
        days: ['mon', 'tue', 'wed', 'thu', 'fri']
      },
      sleepReminders: {
        enabled: document.getElementById('sleepEnabled')?.checked || false,
        bedtime: document.getElementById('sleepBedtime')?.value || '22:30',
        wakeTime: document.getElementById('sleepWakeTime')?.value || '07:00'
      },
      reportNotifications: {
        enabled: true,
        time: '09:00'
      }
    };
    
    await this.updateSettings(prefs);
  }

  renderUnsupportedUI() {
    const container = document.getElementById('pushNotificationSection');
    if (container) {
      container.innerHTML = `
        <div class="unsupported-message">
          <div class="unsupported-icon">🔔</div>
          <h3>推送通知不可用</h3>
          <p>您的浏览器不支持推送通知功能。请使用现代浏览器如 Chrome、Firefox 或 Safari。</p>
        </div>
      `;
    }
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = escapeHtml(message);
      toast.className = `toast show ${escapeHtml(type)}`;
      setTimeout(() => toast.classList.remove('show', type), 3000);
    }
  }

  // 销毁方法 - 清理所有资源
  destroy() {
    this.isDestroyed = true;
    
    // 停止所有定时器
    this.stopLocalReminders();
    
    // 清理引用
    this.swRegistration = null;
    this.subscription = null;
    this.settings = null;
  }
}

// 导出实例
window.pushNotificationManager = new PushNotificationManager();
window.PushNotificationManager = PushNotificationManager;
window.PUSH_CONSTANTS = PUSH_CONSTANTS;
