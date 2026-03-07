/**
 * AMBROSE Health Daily Report Module v1.1
 * AI每日健康报告生成模块
 * 修复：XSS漏洞、清理console、添加常量
 */

// 常量定义
const REPORT_CONSTANTS = {
  API_ENDPOINTS: {
    TODAY: '/reports/today',
    GENERATE: '/reports/generate',
    HISTORY: '/reports/history'
  },
  STORAGE_KEY: 'ambrose_token',
  SCORE_COLORS: {
    EXCELLENT: '#30D158',
    GOOD: '#FFD93D',
    POOR: '#FF6B6B'
  },
  CATEGORY_LABELS: {
    exercise: '💪 运动',
    nutrition: '🥗 营养',
    sleep: '😴 睡眠',
    hydration: '💧 饮水',
    lifestyle: '🌱 生活方式'
  },
  PRIORITY_LABELS: {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
};

// 安全转义函数
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

class DailyReportManager {
  constructor() {
    this.apiBaseUrl = window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api';
    this.currentReport = null;
    this.isLoading = false;
  }

  async init() {
    await this.loadTodayReport();
    this.setupEventListeners();
  }

  getAuthToken() {
    return localStorage.getItem(REPORT_CONSTANTS.STORAGE_KEY) || '';
  }

  async loadTodayReport() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    try {
      const response = await fetch(`${this.apiBaseUrl}${REPORT_CONSTANTS.API_ENDPOINTS.TODAY}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to load report');
      
      const result = await response.json();
      this.currentReport = result.data;
      this.renderReport();
      
      return this.currentReport;
    } catch (error) {
      if (window.AMBROSE_CONFIG?.debug) {
        // 仅在调试模式下输出
      }
      this.loadMockReport();
    } finally {
      this.isLoading = false;
    }
  }

  loadMockReport() {
    this.currentReport = {
      content: {
        summary: '今日整体表现不错！步数达到目标，睡眠质量良好。',
        highlights: [
          '步数达到10000+，运动量充足！',
          '睡眠质量良好，有助于身体恢复。'
        ],
        concerns: [
          '饮水量略低于目标，建议增加。'
        ],
        recommendations: [
          {
            category: 'hydration',
            title: '多喝水',
            description: '目标是每天2000ml水，每小时记得喝一杯。',
            priority: 'medium'
          }
        ]
      },
      dataSnapshot: {
        steps: 10500,
        calories: 2100,
        water: 1600,
        sleep: 7.5,
        exercise: 45,
        goalCompletion: 85
      },
      scores: {
        overall: 82,
        activity: 88,
        nutrition: 75,
        sleep: 85
      },
      generatedAt: new Date().toISOString(),
      isRead: false
    };
    
    this.renderReport();
  }

  renderReport() {
    if (!this.currentReport) return;
    
    this.renderSummary();
    this.renderScores();
    this.renderHighlights();
    this.renderConcerns();
    this.renderRecommendations();
    this.renderDataSnapshot();
  }

  renderSummary() {
    const el = document.getElementById('reportSummary');
    if (el) {
      // 安全设置文本内容
      el.textContent = this.currentReport.content.summary || '';
    }
  }

  renderScores() {
    const { scores } = this.currentReport;
    if (!scores) return;
    
    const updateScore = (id, value, label) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const circle = el.querySelector('.score-circle');
      const text = el.querySelector('.score-value');
      const labelEl = el.querySelector('.score-label');
      
      if (text) text.textContent = escapeHtml(value);
      if (labelEl) labelEl.textContent = escapeHtml(label);
      
      // 更新圆形进度
      if (circle) {
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (value / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        circle.style.stroke = this.getScoreColor(value);
      }
    };
    
    updateScore('overallScore', scores.overall, '综合评分');
    updateScore('activityScore', scores.activity, '活动');
    updateScore('nutritionScore', scores.nutrition, '营养');
    updateScore('sleepScore', scores.sleep, '睡眠');
  }

  getScoreColor(score) {
    if (score >= 80) return REPORT_CONSTANTS.SCORE_COLORS.EXCELLENT;
    if (score >= 60) return REPORT_CONSTANTS.SCORE_COLORS.GOOD;
    return REPORT_CONSTANTS.SCORE_COLORS.POOR;
  }

  renderHighlights() {
    const container = document.getElementById('reportHighlights');
    if (!container) return;
    
    const highlights = this.currentReport.content.highlights || [];
    
    if (highlights.length === 0) {
      container.innerHTML = '<div class="empty-state">今日暂无亮点数据</div>';
      return;
    }
    
    // 使用DocumentFragment优化性能
    const fragment = document.createDocumentFragment();
    
    highlights.forEach(h => {
      const item = document.createElement('div');
      item.className = 'highlight-item';
      item.innerHTML = `
        <span class="highlight-icon">🌟</span>
        <span class="highlight-text">${escapeHtml(h)}</span>
      `;
      fragment.appendChild(item);
    });
    
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  renderConcerns() {
    const container = document.getElementById('reportConcerns');
    if (!container) return;
    
    const concerns = this.currentReport.content.concerns || [];
    
    if (concerns.length === 0) {
      container.innerHTML = '<div class="empty-state">🎉 今日没有需要关注的问题</div>';
      return;
    }
    
    const fragment = document.createDocumentFragment();
    
    concerns.forEach(c => {
      const item = document.createElement('div');
      item.className = 'concern-item';
      item.innerHTML = `
        <span class="concern-icon">⚠️</span>
        <span class="concern-text">${escapeHtml(c)}</span>
      `;
      fragment.appendChild(item);
    });
    
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  renderRecommendations() {
    const container = document.getElementById('reportRecommendations');
    if (!container) return;
    
    const recs = this.currentReport.content.recommendations || [];
    
    const fragment = document.createDocumentFragment();
    
    recs.forEach(rec => {
      const card = document.createElement('div');
      card.className = `recommendation-card priority-${escapeHtml(rec.priority)}`;
      card.innerHTML = `
        <div class="rec-header">
          <span class="rec-category">${escapeHtml(this.getCategoryLabel(rec.category))}</span>
          <span class="rec-priority">${escapeHtml(this.getPriorityLabel(rec.priority))}</span>
        </div>
        <h4 class="rec-title">${escapeHtml(rec.title)}</h4>
        <p class="rec-description">${escapeHtml(rec.description)}</p>
      `;
      fragment.appendChild(card);
    });
    
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  getCategoryLabel(category) {
    return REPORT_CONSTANTS.CATEGORY_LABELS[category] || category;
  }

  getPriorityLabel(priority) {
    return REPORT_CONSTANTS.PRIORITY_LABELS[priority] || priority;
  }

  renderDataSnapshot() {
    const { dataSnapshot } = this.currentReport;
    if (!dataSnapshot) return;
    
    const updateEl = (id, value, suffix = '') => {
      const el = document.getElementById(id);
      if (el) {
        // 安全设置文本内容
        el.textContent = (typeof value === 'number' ? value.toLocaleString() : escapeHtml(value)) + suffix;
      }
    };
    
    updateEl('reportSteps', dataSnapshot.steps);
    updateEl('reportCalories', dataSnapshot.calories);
    updateEl('reportWater', dataSnapshot.water, 'ml');
    updateEl('reportSleep', dataSnapshot.sleep, '小时');
    updateEl('reportExercise', dataSnapshot.exercise, '分钟');
    updateEl('goalCompletion', dataSnapshot.goalCompletion, '%');
  }

  async generateNewReport() {
    const btn = document.getElementById('generateReportBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '生成中...';
    }
    
    try {
      const response = await fetch(`${this.apiBaseUrl}${REPORT_CONSTANTS.API_ENDPOINTS.GENERATE}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to generate report');
      
      const result = await response.json();
      this.currentReport = result.data;
      this.renderReport();
      
      this.showToast('报告已生成！');
    } catch (error) {
      this.showToast('生成失败，请重试', 'error');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '重新生成';
      }
    }
  }

  async viewHistory() {
    try {
      const response = await fetch(`${this.apiBaseUrl}${REPORT_CONSTANTS.API_ENDPOINTS.HISTORY}?limit=7`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to load history');
      
      const result = await response.json();
      this.renderHistoryChart(result.data);
    } catch (error) {
      // 静默处理错误
    }
  }

  renderHistoryChart(history) {
    const ctx = document.getElementById('historyChart')?.getContext('2d');
    if (!ctx || !window.Chart) return;
    
    const labels = (history || []).map(h => {
      const date = new Date(h.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }).reverse();
    
    const scores = (history || []).map(h => h.scores?.overall || 0).reverse();
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '综合评分趋势',
          data: scores,
          borderColor: '#00D4FF',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100 }
        }
      }
    });
  }

  async markAsRead() {
    if (!this.currentReport?._id) return;
    
    try {
      await fetch(`${this.apiBaseUrl}${REPORT_CONSTANTS.API_ENDPOINTS.TODAY}/${this.currentReport._id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      // 静默处理错误
    }
  }

  setupEventListeners() {
    const generateBtn = document.getElementById('generateReportBtn');
    if (generateBtn) {
      generateBtn.addEventListener('click', () => this.generateNewReport());
    }
    
    const historyBtn = document.getElementById('viewHistoryBtn');
    if (historyBtn) {
      historyBtn.addEventListener('click', () => this.viewHistory());
    }
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
    const generateBtn = document.getElementById('generateReportBtn');
    const historyBtn = document.getElementById('viewHistoryBtn');
    
    if (generateBtn) {
      generateBtn.replaceWith(generateBtn.cloneNode(true));
    }
    if (historyBtn) {
      historyBtn.replaceWith(historyBtn.cloneNode(true));
    }
    
    this.currentReport = null;
  }
}

// 导出实例
window.dailyReportManager = new DailyReportManager();
window.DailyReportManager = DailyReportManager;
window.REPORT_CONSTANTS = REPORT_CONSTANTS;
