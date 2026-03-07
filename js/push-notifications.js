/**
 * AMBROSE Health Push Notification System v1.1
 * 推送提醒系统 (喝水/运动/睡眠)
 * 基于 Service Workers + Push API
 */

class PushNotificationManager {
  constructor() {
    this.apiBaseUrl = window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api';
    this.swRegistration = null;
    this.isSubscribed = false;
    this.subscription = null;
    this.settings = null;
    this.reminderTimers = {};
    
    // VAPID公钥 (需要在服务器配置)
    this.vapidPublicKey = 'BEl62iM-_Y5y1P7T5wHb9w5y1P7T5wHb9w5y1P7T5wHb9w5y1P7T5wHb9'; // 替换为实际公钥
  }

  // 初始化
  async init() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      this.renderUnsupportedUI();
      return false;
    }
    
    try {
      // 注册Service Worker
      this.swRegistration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', this.swRegistration);
      
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
      
      return true;
    } catch (error) {
      console.error('Push notification init error:', error);
      return false;
    }
  }

  // 获取认证Token
  getAuthToken() {
    return localStorage.getItem('ambrose_token') || '';
  }

  // 加载推送设置
  async loadSettings() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/push/settings`, {
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
        // 使用默认设置
        this.settings = this.getDefaultSettings();
      }
    } catch (error) {
      console.error('Load settings error:', error);
      this.settings = this.getDefaultSettings();
    }
  }

  // 获取默认设置
  getDefaultSettings() {
    return {
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
    };
  }

  // 订阅推送
  async subscribe() {
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
      console.error('Subscribe error:', error);
      this.showToast('订阅失败，请重试', 'error');
      return false;
    }
  }

  // 取消订阅
  async unsubscribe() {
    try {
      if (this.subscription) {
        await this.subscription.unsubscribe();
      }
      
      // 通知服务器
      await fetch(`${this.apiBaseUrl}/push/unsubscribe`, {
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
      console.error('Unsubscribe error:', error);
      this.showToast('取消订阅失败', 'error');
      return false;
    }
  }

  // 保存订阅到服务器
  async saveSubscription(subscription) {
    try {
      await fetch(`${this.apiBaseUrl}/push/subscribe`, {
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
      console.error('Save subscription error:', error);
    }
  }

  // 更新设置
  async updateSettings(preferences) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/push/settings`, {
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
      console.error('Update settings error:', error);
      this.showToast('保存失败', 'error');
    }
    return false;
  }

  // 启动本地提醒 (备用方案)
  startLocalReminders() {
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

  // 停止本地提醒
  stopLocalReminders() {
    Object.values(this.reminderTimers).forEach(timer => {
      if (timer) clearInterval(timer);
    });
    this.reminderTimers = {};
  }

  // 安排喝水提醒
  scheduleWaterReminders(settings) {
    const interval = (settings.interval || 60) * 60 * 1000; // 转换为毫秒
    
    const checkAndNotify = () => {
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

  // 安排运动提醒
  scheduleExerciseReminders(settings) {
    const checkAndNotify = () => {
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
    
    this.reminderTimers.exercise = setInterval(checkAndNotify, 60 * 1000); // 每分钟检查
  }

  // 安排睡眠提醒
  scheduleSleepReminders(settings) {
    const checkAndNotify = () => {
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
    
    this.reminderTimers.sleep = setInterval(checkAndNotify, 60 * 1000);
  }

  // 安排报告提醒
  scheduleReportReminders(settings) {
    const checkAndNotify = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (currentTime === settings.time) {
        this.showLocalNotification('📊 健康日报', '您的今日健康报告已生成，点击查看！', 'report');
      }
    };
    
    this.reminderTimers.report = setInterval(checkAndNotify, 60 * 1000);
  }

  // 显示本地通知
  showLocalNotification(title, body, tag = 'general') {
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

  // 发送测试通知
  async sendTestNotification(type = 'test') {
    if (!this.isSubscribed) {
      this.showToast('请先启用推送通知', 'error');
      return;
    }
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/push/test`, {
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
      console.error('Test notification error:', error);
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

  // 更新UI
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

  // 渲染设置表单
  renderSettingsForm() {
    const container = document.getElementById('pushSettingsForm');
    if (!container || !this.settings) return;
    
    const prefs = this.settings.preferences;
    
    container.innerHTML = `
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
            <input type="time" id="waterStartTime" value="${prefs.waterReminders?.startTime || '08:00'}">
          </div>
          <div class="option-row">
            <label>结束时间</label>
            <input type="time" id="waterEndTime" value="${prefs.waterReminders?.endTime || '22:00'}">
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
            <input type="time" id="exerciseTime" value="${prefs.exerciseReminders?.time || '18:00'}">
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
            <input type="time" id="sleepBedtime" value="${prefs.sleepReminders?.bedtime || '22:30'}">
          </div>
          <div class="option-row">
            <label>起床时间</label>
            <input type="time" id="sleepWakeTime" value="${prefs.sleepReminders?.wakeTime || '07:00'}">
          </div>
        </div>
      </div>

      <button class="btn-primary" onclick="window.pushNotificationManager.saveSettings()">保存设置</button>
    `;
    
    // 绑定切换事件
    container.querySelectorAll('.toggle-switch input').forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const options = e.target.closest('.setting-group').querySelector('.setting-options');
        if (options) {
          options.style.display = e.target.checked ? 'block' : 'none';
        }
      });
    });
  }

  // 保存设置
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

  // 渲染不支持UI
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

  // Base64转Uint8Array
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

  // 显示提示
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.className = `toast show ${type}`;
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }
}

// 导出实例
window.pushNotificationManager = new PushNotificationManager();
