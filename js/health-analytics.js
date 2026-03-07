/**
 * AMBROSE Health Analytics Module v1.1
 * 健康数据趋势分析图表模块
 * 修复：XSS漏洞、内存泄漏、常量提取
 */

// 常量定义
const ANALYTICS_CONSTANTS = {
  PERIODS: {
    WEEK: '7d',
    MONTH: '30d'
  },
  COLORS: {
    PRIMARY: '#00D4FF',
    SECONDARY: '#FF2D92',
    SUCCESS: '#30D158',
    WARNING: '#FFD93D',
    DANGER: '#FF6B6B'
  }
};

// 安全转义函数
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

class HealthAnalytics {
  constructor() {
    this.apiBaseUrl = window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api';
    this.currentPeriod = ANALYTICS_CONSTANTS.PERIODS.WEEK;
    this.charts = {};
    this.data = null;
    this.isDestroyed = false;
  }

  async init() {
    if (this.isDestroyed) return;
    await this.loadChartJS();
    await this.loadTrendData();
    this.renderCharts();
    this.setupEventListeners();
  }

  loadChartJS() {
    return new Promise((resolve, reject) => {
      if (window.Chart) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  getAuthToken() {
    return localStorage.getItem('ambrose_token') || '';
  }

  async loadTrendData(period = ANALYTICS_CONSTANTS.PERIODS.WEEK) {
    if (this.isDestroyed) return;
    
    try {
      this.currentPeriod = period;
      const response = await fetch(`${this.apiBaseUrl}/analytics/trends/${period}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to load trend data');
      
      const result = await response.json();
      this.data = result.data;
      
      this.updateStatsUI();
      this.updateInsightsUI();
      
      return this.data;
    } catch (error) {
      this.loadMockData();
    }
  }

  loadMockData() {
    const days = this.currentPeriod === ANALYTICS_CONSTANTS.PERIODS.MONTH ? 30 : 7;
    const labels = [];
    const steps = [];
    const calories = [];
    const water = [];
    const sleep = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      steps.push(Math.floor(6000 + Math.random() * 8000));
      calories.push(Math.floor(1800 + Math.random() * 600));
      water.push(Math.floor(1500 + Math.random() * 1000));
      sleep.push(parseFloat((5.5 + Math.random() * 3).toFixed(1)));
    }
    
    this.data = {
      chartData: { labels, steps, calories, water, sleep },
      averages: {
        steps: Math.round(steps.reduce((a, b) => a + b, 0) / steps.length),
        calories: Math.round(calories.reduce((a, b) => a + b, 0) / calories.length),
        water: Math.round(water.reduce((a, b) => a + b, 0) / water.length),
        sleep: parseFloat((sleep.reduce((a, b) => a + b, 0) / sleep.length).toFixed(1))
      },
      insights: [
        { type: 'positive', metric: 'steps', message: '步数呈上升趋势，继续保持！' }
      ]
    };
    
    this.updateStatsUI();
  }

  renderCharts() {
    if (!this.data || this.isDestroyed) return;
    
    this.renderStepsChart();
    this.renderSleepChart();
    this.renderWaterChart();
    this.renderCaloriesChart();
  }

  renderStepsChart() {
    const ctx = document.getElementById('stepsChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.steps) {
      this.charts.steps.destroy();
    }
    
    this.charts.steps = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.chartData.labels,
        datasets: [{
          label: '步数',
          data: this.data.chartData.steps,
          borderColor: ANALYTICS_CONSTANTS.COLORS.PRIMARY,
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: ANALYTICS_CONSTANTS.COLORS.PRIMARY,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }, {
          label: '目标 (10000)',
          data: this.data.chartData.labels.map(() => 10000),
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0
        }]
      },
      options: this.getChartOptions('步数')
    });
  }

  renderSleepChart() {
    const ctx = document.getElementById('sleepChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.sleep) {
      this.charts.sleep.destroy();
    }
    
    this.charts.sleep = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.chartData.labels,
        datasets: [{
          label: '睡眠时长 (小时)',
          data: this.data.chartData.sleep,
          backgroundColor: this.data.chartData.sleep.map(v => 
            v >= 7 ? 'rgba(155, 89, 182, 0.8)' : 'rgba(231, 76, 60, 0.6)'
          ),
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: this.getChartOptions('睡眠时长')
    });
  }

  renderWaterChart() {
    const ctx = document.getElementById('waterChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.water) {
      this.charts.water.destroy();
    }
    
    this.charts.water = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.chartData.labels,
        datasets: [{
          label: '饮水量 (ml)',
          data: this.data.chartData.water,
          backgroundColor: 'rgba(52, 152, 219, 0.8)',
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: this.getChartOptions('饮水量')
    });
  }

  renderCaloriesChart() {
    const ctx = document.getElementById('caloriesChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.calories) {
      this.charts.calories.destroy();
    }
    
    this.charts.calories = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.chartData.labels,
        datasets: [{
          label: '摄入热量 (千卡)',
          data: this.data.chartData.calories,
          borderColor: ANALYTICS_CONSTANTS.COLORS.SECONDARY,
          backgroundColor: 'rgba(255, 45, 146, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: ANALYTICS_CONSTANTS.COLORS.SECONDARY,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: this.getChartOptions('摄入热量')
    });
  }

  getChartOptions(yAxisLabel) {
    const isDark = document.body.classList.contains('dark-theme') || true;
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: isDark ? 'rgba(255,255,255,0.7)' : '#333',
            font: { size: 12 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12
        }
      },
      scales: {
        x: {
          grid: {
            color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            drawBorder: false
          },
          ticks: {
            color: isDark ? 'rgba(255,255,255,0.5)' : '#666',
            font: { size: 11 }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            drawBorder: false
          },
          ticks: {
            color: isDark ? 'rgba(255,255,255,0.5)' : '#666',
            font: { size: 11 }
          },
          title: {
            display: true,
            text: yAxisLabel,
            color: isDark ? 'rgba(255,255,255,0.5)' : '#666',
            font: { size: 11 }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    };
  }

  updateStatsUI() {
    if (!this.data?.averages) return;
    
    const { averages } = this.data;
    
    const updateEl = (id, value, suffix = '') => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = (typeof value === 'number' ? value.toLocaleString() : escapeHtml(value)) + suffix;
      }
    };
    
    updateEl('avgSteps', averages.steps);
    updateEl('avgCalories', averages.calories);
    updateEl('avgWater', averages.water, 'ml');
    updateEl('avgSleep', averages.sleep, '小时');
    
    // 更新与目标的对比
    const stepGoalPercent = Math.round((averages.steps / 10000) * 100);
    updateEl('stepGoalPercent', stepGoalPercent, '%');
    
    const waterGoalPercent = Math.round((averages.water / 2000) * 100);
    updateEl('waterGoalPercent', waterGoalPercent, '%');
  }

  updateInsightsUI() {
    const container = document.getElementById('insightsContainer');
    if (!container || !this.data?.insights) return;
    
    if (this.data.insights.length === 0) {
      container.innerHTML = '<div class="insight-item neutral">📊 数据正在积累中，继续记录以获得个性化分析</div>';
      return;
    }
    
    const fragment = document.createDocumentFragment();
    
    this.data.insights.forEach(insight => {
      const item = document.createElement('div');
      item.className = `insight-item ${escapeHtml(insight.type)}`;
      
      const icon = insight.type === 'positive' ? '✅' : 
                   insight.type === 'warning' ? '⚠️' : '💡';
      
      item.innerHTML = `
        <span class="insight-icon">${icon}</span>
        <span class="insight-text">${escapeHtml(insight.message)}</span>
      `;
      fragment.appendChild(item);
    });
    
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  async switchPeriod(period) {
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.period === period);
    });
    
    await this.loadTrendData(period);
    this.renderCharts();
  }

  setupEventListeners() {
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchPeriod(btn.dataset.period));
    });
  }

  showError(message) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = escapeHtml(message);
      toast.classList.add('show', 'error');
      setTimeout(() => toast.classList.remove('show', 'error'), 3000);
    }
  }

  // 销毁方法 - 清理资源
  destroy() {
    this.isDestroyed = true;
    
    // 销毁所有Chart实例
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy();
    });
    this.charts = {};
    
    // 清理数据引用
    this.data = null;
  }
}

// 导出实例
window.healthAnalytics = new HealthAnalytics();
window.HealthAnalytics = HealthAnalytics;
window.ANALYTICS_CONSTANTS = ANALYTICS_CONSTANTS;
