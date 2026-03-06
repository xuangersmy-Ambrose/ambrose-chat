/**
 * AMBROSE Health Daily Report Module v1.1
 * AI每日健康报告生成模块
 */

class DailyReportManager {
  constructor() {
    this.apiBaseUrl = window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api';
    this.currentReport = null;
  }

  // 初始化
  async init() {
    await this.loadTodayReport();
    this.setupEventListeners();
  }

  // 获取认证Token
  getAuthToken() {
    return localStorage.getItem('ambrose_token') || '';
  }

  // 加载今日报告
  async loadTodayReport() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/reports/today`, {
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
      console.error('Load report error:', error);
      this.loadMockReport();
    }
  }

  // 模拟报告数据
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

  // 渲染报告
  renderReport() {
    if (!this.currentReport) return;
    
    this.renderSummary();
    this.renderScores();
    this.renderHighlights();
    this.renderConcerns();
    this.renderRecommendations();
    this.renderDataSnapshot();
  }

  // 渲染总结
  renderSummary() {
    const el = document.getElementById('reportSummary');
    if (el) {
      el.textContent = this.currentReport.content.summary;
    }
  }

  // 渲染评分
  renderScores() {
    const { scores } = this.currentReport;
    
    const updateScore = (id, value, label) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const circle = el.querySelector('.score-circle');
      const text = el.querySelector('.score-value');
      const labelEl = el.querySelector('.score-label');
      
      if (text) text.textContent = value;
      if (labelEl) labelEl.textContent = label;
      
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

  // 获取评分颜色
  getScoreColor(score) {
    if (score >= 80) return '#30D158';
    if (score >= 60) return '#FFD93D';
    return '#FF6B6B';
  }

  // 渲染亮点
  renderHighlights() {
    const container = document.getElementById('reportHighlights');
    if (!container) return;
    
    const highlights = this.currentReport.content.highlights || [];
    
    if (highlights.length === 0) {
      container.innerHTML = '<div class="empty-state">今日暂无亮点数据</div>';
      return;
    }
    
    container.innerHTML = highlights.map(h => `
      <div class="highlight-item">
        <span class="highlight-icon">🌟</span>
        <span class="highlight-text">${h}</span>
      </div>
    `).join('');
  }

  // 渲染关注点
  renderConcerns() {
    const container = document.getElementById('reportConcerns');
    if (!container) return;
    
    const concerns = this.currentReport.content.concerns || [];
    
    if (concerns.length === 0) {
      container.innerHTML = '<div class="empty-state">🎉 今日没有需要关注的问题</div>';
      return;
    }
    
    container.innerHTML = concerns.map(c => `
      <div class="concern-item">
        <span class="concern-icon">⚠️</span>
        <span class="concern-text">${c}</span>
      </div>
    `).join('');
  }

  // 渲染建议
  renderRecommendations() {
    const container = document.getElementById('reportRecommendations');
    if (!container) return;
    
    const recs = this.currentReport.content.recommendations || [];
    
    container.innerHTML = recs.map(rec => `
      <div class="recommendation-card priority-${rec.priority}">
        <div class="rec-header">
          <span class="rec-category">${this.getCategoryLabel(rec.category)}</span>
          <span class="rec-priority">${this.getPriorityLabel(rec.priority)}</span>
        </div>
        <h4 class="rec-title">${rec.title}</h4>
        <p class="rec-description">${rec.description}</p>
      </div>
    `).join('');
  }

  // 获取分类标签
  getCategoryLabel(category) {
    const labels = {
      exercise: '💪 运动',
      nutrition: '🥗 营养',
      sleep: '😴 睡眠',
      hydration: '💧 饮水',
      lifestyle: '🌱 生活方式'
    };
    return labels[category] || category;
  }

  // 获取优先级标签
  getPriorityLabel(priority) {
    const labels = {
      high: '高优先级',
      medium: '中优先级',
      low: '低优先级'
    };
    return labels[priority] || priority;
  }

  // 渲染数据快照
  renderDataSnapshot() {
    const { dataSnapshot } = this.currentReport;
    
    const updateEl = (id, value, suffix = '') => {
      const el = document.getElementById(id);
      if (el) el.textContent = value + suffix;
    };
    
    updateEl('reportSteps', dataSnapshot.steps.toLocaleString());
    updateEl('reportCalories', dataSnapshot.calories.toLocaleString());
    updateEl('reportWater', dataSnapshot.water.toLocaleString(), 'ml');
    updateEl('reportSleep', dataSnapshot.sleep, '小时');
    updateEl('reportExercise', dataSnapshot.exercise, '分钟');
    updateEl('goalCompletion', dataSnapshot.goalCompletion, '%');
  }

  // 生成新报告
  async generateNewReport() {
    const btn = document.getElementById('generateReportBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '生成中...';
    }
    
    try {
      const response = await fetch(`${this.apiBaseUrl}/reports/generate`, {
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
      console.error('Generate report error:', error);
      this.showToast('生成失败，请重试', 'error');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '重新生成';
      }
    }
  }

  // 查看历史报告
  async viewHistory() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/reports/history?limit=7`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to load history');
      
      const result = await response.json();
      this.renderHistoryChart(result.data);
    } catch (error) {
      console.error('Load history error:', error);
    }
  }

  // 渲染历史趋势图
  renderHistoryChart(history) {
    const ctx = document.getElementById('historyChart')?.getContext('2d');
    if (!ctx || !window.Chart) return;
    
    const labels = history.map(h => {
      const date = new Date(h.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }).reverse();
    
    const scores = history.map(h => h.scores?.overall || 0).reverse();
    
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

  // 标记为已读
  async markAsRead() {
    if (!this.currentReport?._id) return;
    
    try {
      await fetch(`${this.apiBaseUrl}/reports/${this.currentReport._id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  }

  // 设置事件监听
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
window.dailyReportManager = new DailyReportManager();
