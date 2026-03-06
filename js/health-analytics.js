/**
 * AMBROSE Health Analytics Module v1.1
 * 健康数据趋势分析图表模块
 * 使用 Chart.js 进行数据可视化
 */

class HealthAnalytics {
  constructor() {
    this.apiBaseUrl = window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api';
    this.currentPeriod = '7d';
    this.charts = {};
    this.data = null;
  }

  // 初始化模块
  async init() {
    await this.loadChartJS();
    await this.loadTrendData();
    this.renderCharts();
    this.setupEventListeners();
  }

  // 动态加载 Chart.js
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

  // 获取认证Token
  getAuthToken() {
    return localStorage.getItem('ambrose_token') || '';
  }

  // 加载趋势数据
  async loadTrendData(period = '7d') {
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
      console.error('Load trend data error:', error);
      this.showError('加载数据失败，请稍后重试');
      // 使用模拟数据
      this.loadMockData();
    }
  }

  // 加载模拟数据 (用于演示)
  loadMockData() {
    const days = this.currentPeriod === '30d' ? 30 : 7;
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

  // 渲染图表
  renderCharts() {
    if (!this.data) return;
    
    this.renderStepsChart();
    this.renderSleepChart();
    this.renderWaterChart();
    this.renderCaloriesChart();
  }

  // 步数趋势图
  renderStepsChart() {
    const ctx = document.getElementById('stepsChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.steps) this.charts.steps.destroy();
    
    this.charts.steps = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.chartData.labels,
        datasets: [{
          label: '步数',
          data: this.data.chartData.steps,
          borderColor: '#00D4FF',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00D4FF',
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

  // 睡眠趋势图
  renderSleepChart() {
    const ctx = document.getElementById('sleepChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.sleep) this.charts.sleep.destroy();
    
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

  // 饮水趋势图
  renderWaterChart() {
    const ctx = document.getElementById('waterChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.water) this.charts.water.destroy();
    
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

  // 热量趋势图
  renderCaloriesChart() {
    const ctx = document.getElementById('caloriesChart')?.getContext('2d');
    if (!ctx) return;
    
    if (this.charts.calories) this.charts.calories.destroy();
    
    this.charts.calories = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.chartData.labels,
        datasets: [{
          label: '摄入热量 (千卡)',
          data: this.data.chartData.calories,
          borderColor: '#FF2D92',
          backgroundColor: 'rgba(255, 45, 146, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#FF2D92',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: this.getChartOptions('摄入热量')
    });
  }

  // 图表通用配置
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

  // 更新统计UI
  updateStatsUI() {
    if (!this.data?.averages) return;
    
    const { averages } = this.data;
    
    const updateEl = (id, value, suffix = '') => {
      const el = document.getElementById(id);
      if (el) el.textContent = value + suffix;
    };
    
    updateEl('avgSteps', averages.steps.toLocaleString());
    updateEl('avgCalories', averages.calories.toLocaleString());
    updateEl('avgWater', averages.water.toLocaleString(), 'ml');
    updateEl('avgSleep', averages.sleep, '小时');
    
    // 更新与目标的对比
    const stepGoalPercent = Math.round((averages.steps / 10000) * 100);
    updateEl('stepGoalPercent', stepGoalPercent, '%');
    
    const waterGoalPercent = Math.round((averages.water / 2000) * 100);
    updateEl('waterGoalPercent', waterGoalPercent, '%');
  }

  // 更新洞察UI
  updateInsightsUI() {
    const container = document.getElementById('insightsContainer');
    if (!container || !this.data?.insights) return;
    
    if (this.data.insights.length === 0) {
      container.innerHTML = '<div class="insight-item neutral">📊 数据正在积累中，继续记录以获得个性化分析</div>';
      return;
    }
    
    container.innerHTML = this.data.insights.map(insight => `
      <div class="insight-item ${insight.type}">
        <span class="insight-icon">${insight.type === 'positive' ? '✅' : insight.type === 'warning' ? '⚠️' : '💡'}</span>
        <span class="insight-text">${insight.message}</span>
      </div>
    `).join('');
  }

  // 切换时间周期
  async switchPeriod(period) {
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.period === period);
    });
    
    await this.loadTrendData(period);
    this.renderCharts();
  }

  // 设置事件监听
  setupEventListeners() {
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', () => this.switchPeriod(btn.dataset.period));
    });
  }

  // 显示错误
  showError(message) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show', 'error');
      setTimeout(() => toast.classList.remove('show', 'error'), 3000);
    }
  }
}

// 导出实例
window.healthAnalytics = new HealthAnalytics();
