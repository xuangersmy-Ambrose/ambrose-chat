/**
 * AMBROSE Health Recommendations Module v1.1
 * 个性化建议引擎前端模块
 * 修复：XSS漏洞、清理console、添加常量
 */

// 常量定义
const RECOMMENDATION_CONSTANTS = {
  API_ENDPOINTS: {
    TODAY: '/recommendations/today',
    ACCEPT: (id) => `/recommendations/${id}/accept`,
    COMPLETE: (id) => `/recommendations/${id}/complete`,
    DISMISS: (id) => `/recommendations/${id}/dismiss`
  },
  TYPE_ICONS: {
    exercise: '💪',
    nutrition: '🥗',
    sleep: '😴',
    hydration: '💧',
    lifestyle: '🌱'
  },
  TYPE_LABELS: {
    exercise: '运动',
    nutrition: '营养',
    sleep: '睡眠',
    hydration: '饮水',
    lifestyle: '生活方式'
  },
  DIFFICULTY_LABELS: {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  },
  ACTION_MESSAGES: {
    accept: '已接受建议，加油完成！',
    complete: '太棒了！继续保持！',
    dismiss: '已跳过此建议'
  }
};

// 安全转义函数
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

class RecommendationEngine {
  constructor() {
    this.apiBaseUrl = window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api';
    this.recommendations = [];
    this.userProfile = null;
    this.isLoading = false;
  }

  async init() {
    await this.loadRecommendations();
    this.setupEventListeners();
  }

  getAuthToken() {
    return localStorage.getItem('ambrose_token') || '';
  }

  async loadRecommendations() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    try {
      const response = await fetch(`${this.apiBaseUrl}${RECOMMENDATION_CONSTANTS.API_ENDPOINTS.TODAY}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to load recommendations');
      
      const result = await response.json();
      this.recommendations = result.data || [];
      this.renderRecommendations();
      
      return this.recommendations;
    } catch (error) {
      this.loadMockRecommendations();
    } finally {
      this.isLoading = false;
    }
  }

  loadMockRecommendations() {
    this.recommendations = [
      {
        id: 'rec_001',
        type: 'exercise',
        title: '午后快走20分钟',
        description: '在工作间隙进行20分钟快走，约可增加2500步，有助于提升心肺功能。',
        reason: '检测到您今日步数偏少',
        difficulty: 'easy',
        estimatedTime: 20,
        calories: 100,
        status: 'pending'
      },
      {
        id: 'rec_002',
        type: 'hydration',
        title: '每小时一杯水',
        description: '设置定时提醒，每小时喝一杯水（约250ml），轻松达到每日2000ml目标。',
        reason: '今日饮水量不足目标75%',
        difficulty: 'easy',
        estimatedTime: 5,
        status: 'pending'
      },
      {
        id: 'rec_003',
        type: 'sleep',
        title: '建立睡前放松仪式',
        description: '今晚尝试在睡前30分钟进行冥想或深呼吸练习，远离电子屏幕。',
        reason: '您的平均睡眠时间不足7小时',
        difficulty: 'easy',
        estimatedTime: 30,
        status: 'pending'
      },
      {
        id: 'rec_004',
        type: 'nutrition',
        title: '增加蛋白质摄入',
        description: '午餐或晚餐增加一份瘦肉、鱼类或豆制品，有助于肌肉恢复和增长。',
        reason: '支持您的健身目标',
        difficulty: 'easy',
        status: 'pending'
      }
    ];
    
    this.renderRecommendations();
  }

  renderRecommendations() {
    const container = document.getElementById('recommendationsList');
    if (!container) return;
    
    const pendingRecs = this.recommendations.filter(r => r.status === 'pending');
    
    if (pendingRecs.length === 0) {
      container.innerHTML = `
        <div class="empty-recommendations">
          <div class="empty-icon">🎉</div>
          <div class="empty-text">今日建议已全部完成！</div>
          <div class="empty-subtext">继续记录数据，获得更精准的个性化建议</div>
        </div>
      `;
      return;
    }
    
    // 使用DocumentFragment优化性能
    const fragment = document.createDocumentFragment();
    
    pendingRecs.forEach(rec => {
      const card = this.createRecommendationCard(rec);
      fragment.appendChild(card);
    });
    
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  createRecommendationCard(rec) {
    const typeIcons = RECOMMENDATION_CONSTANTS.TYPE_ICONS;
    const typeLabels = RECOMMENDATION_CONSTANTS.TYPE_LABELS;
    const difficultyLabels = RECOMMENDATION_CONSTANTS.DIFFICULTY_LABELS;
    
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    card.dataset.id = escapeHtml(rec.id);
    
    card.innerHTML = `
      <div class="rec-header">
        <div class="rec-type">
          <span class="rec-icon">${escapeHtml(typeIcons[rec.type] || '💡')}</span>
          <span class="rec-type-label">${escapeHtml(typeLabels[rec.type] || rec.type)}</span>
        </div>
        <span class="rec-difficulty difficulty-${escapeHtml(rec.difficulty)}">${escapeHtml(difficultyLabels[rec.difficulty])}</span>
      </div>
      
      <h4 class="rec-title">${escapeHtml(rec.title)}</h4>
      <p class="rec-description">${escapeHtml(rec.description)}</p>
      
      <div class="rec-meta">
        ${rec.estimatedTime ? `<span class="rec-time">⏱️ ${escapeHtml(rec.estimatedTime)}分钟</span>` : ''}
        ${rec.calories ? `<span class="rec-calories">🔥 ${escapeHtml(rec.calories)}千卡</span>` : ''}
      </div>
      
      <div class="rec-reason">💡 ${escapeHtml(rec.reason)}</div>
      
      <div class="rec-actions">
        <button class="rec-btn accept" data-action="accept">接受</button>
        <button class="rec-btn complete" data-action="complete">已完成</button>
        <button class="rec-btn dismiss" data-action="dismiss">暂不需要</button>
      </div>
    `;
    
    // 绑定按钮事件
    const buttons = card.querySelectorAll('.rec-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        this.handleAction(rec.id, action);
      });
    });
    
    return card;
  }

  async handleAction(recId, action) {
    const validActions = ['accept', 'complete', 'dismiss'];
    if (!validActions.includes(action)) {
      this.showToast('无效的操作', 'error');
      return;
    }
    
    try {
      const endpoint = RECOMMENDATION_CONSTANTS.API_ENDPOINTS[action.toUpperCase()](recId);
      
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Action failed');
      
      // 更新本地状态
      const rec = this.recommendations.find(r => r.id === recId);
      if (rec) {
        rec.status = action === 'accept' ? 'accepted' : action === 'complete' ? 'completed' : 'dismissed';
      }
      
      // 重新渲染
      this.renderRecommendations();
      
      // 显示反馈
      this.showToast(RECOMMENDATION_CONSTANTS.ACTION_MESSAGES[action]);
      
    } catch (error) {
      this.showToast('操作失败，请重试', 'error');
      
      // 本地模拟
      const rec = this.recommendations.find(r => r.id === recId);
      if (rec) {
        rec.status = action === 'accept' ? 'accepted' : action === 'complete' ? 'completed' : 'dismissed';
      }
      this.renderRecommendations();
    }
  }

  async refreshRecommendations() {
    const btn = document.getElementById('refreshRecsBtn');
    if (btn) {
      btn.classList.add('loading');
      btn.disabled = true;
    }
    
    await this.loadRecommendations();
    
    if (btn) {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
    
    this.showToast('建议已更新！');
  }

  getRecommendationStats() {
    const total = this.recommendations.length;
    const completed = this.recommendations.filter(r => r.status === 'completed').length;
    const accepted = this.recommendations.filter(r => r.status === 'accepted').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, accepted, completionRate };
  }

  renderStats() {
    const stats = this.getRecommendationStats();
    
    const updateEl = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    
    updateEl('recTotalCount', stats.total);
    updateEl('recCompletedCount', stats.completed);
    updateEl('recAcceptedCount', stats.accepted);
    updateEl('recCompletionRate', stats.completionRate + '%');
  }

  filterByType(type) {
    const container = document.getElementById('recommendationsList');
    if (!container) return;
    
    const cards = container.querySelectorAll('.recommendation-card');
    cards.forEach(card => {
      const recId = card.dataset.id;
      const rec = this.recommendations.find(r => r.id === recId);
      
      if (type === 'all' || rec?.type === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // 更新筛选按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === type);
    });
  }

  setupEventListeners() {
    // 刷新按钮 - 使用防抖
    const refreshBtn = document.getElementById('refreshRecsBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', debounce(() => this.refreshRecommendations(), 300));
    }
    
    // 筛选按钮 - 使用防抖
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', debounce(() => this.filterByType(btn.dataset.filter), 100));
    });
  }

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = escapeHtml(message);
      toast.className = `toast show ${escapeHtml(type)}`;
      setTimeout(() => toast.classList.remove('show', type), 3000);
    }
  }

  // 清理方法
  destroy() {
    // 清理事件监听器
    const refreshBtn = document.getElementById('refreshRecsBtn');
    if (refreshBtn) {
      refreshBtn.replaceWith(refreshBtn.cloneNode(true));
    }
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.replaceWith(btn.cloneNode(true));
    });
    
    this.recommendations = [];
  }
}

// 导出实例
window.recommendationEngine = new RecommendationEngine();
window.RecommendationEngine = RecommendationEngine;
window.RECOMMENDATION_CONSTANTS = RECOMMENDATION_CONSTANTS;
