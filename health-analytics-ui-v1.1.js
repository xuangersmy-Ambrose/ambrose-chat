/**
 * AMBROSE Health v1.1 - 健康分析仪表板 UI
 * 
 * 赛博朋克风格数据可视化组件
 */

class HealthAnalyticsUI {
  constructor() {
    this.analytics = new HealthAnalyticsEngine();
    this.pushManager = new PushNotificationManager();
    this.currentPeriod = 7; // 默认7天
  }

  async init() {
    // 初始化推送通知
    await this.pushManager.init();
    
    // 渲染仪表盘
    this.renderDashboard();
    
    // 加载数据
    await this.loadData();
  }

  renderDashboard() {
    const container = document.getElementById('analytics-dashboard');
    if (!container) return;

    container.innerHTML = `
      <div class="analytics-container">
        <!-- 报告头部 -->
        <div class="report-header">
          <h2 class="report-title">📊 健康分析报告</h2>
          <div class="period-selector">
            <button class="period-btn ${this.currentPeriod === 7 ? 'active' : ''}" data-period="7">7天</button>
            <button class="period-btn ${this.currentPeriod === 30 ? 'active' : ''}" data-period="30">30天</button>
          </div>
        </div>

        <!-- 综合评分卡 -->
        <div class="score-card">
          <div class="score-ring">
            <svg viewBox="0 0 100 100">
              <circle class="score-ring-bg" cx="50" cy="50" r="45"/>
              <circle class="score-ring-progress" cx="50" cy="50" r="45" id="overall-score-ring"/>
            </svg>
            <div class="score-value" id="overall-score">--</div>
          </div>
          <div class="score-label">健康综合评分</div>
          <div class="score-trend" id="score-trend"></div>
        </div>

        <!-- 指标卡片网格 -->
        <div class="metrics-grid">
          <div class="metric-card sleep">
            <div class="metric-icon">🌙</div>
            <div class="metric-name">睡眠</div>
            <div class="metric-value" id="sleep-score">--</div>
            <div class="metric-sub" id="sleep-detail">--</div>
            <div class="metric-trend" id="sleep-trend"></div>
          </div>
          <div class="metric-card exercise">
            <div class="metric-icon">🏃</div>
            <div class="metric-name">运动</div>
            <div class="metric-value" id="exercise-score">--</div>
            <div class="metric-sub" id="exercise-detail">--</div>
            <div class="metric-trend" id="exercise-trend"></div>
          </div>
          <div class="metric-card water">
            <div class="metric-icon">💧</div>
            <div class="metric-name">饮水</div>
            <div class="metric-value" id="water-score">--</div>
            <div class="metric-sub" id="water-detail">--</div>
            <div class="metric-trend" id="water-trend"></div>
          </div>
          <div class="metric-card mood">
            <div class="metric-icon">😊</div>
            <div class="metric-name">心情</div>
            <div class="metric-value" id="mood-score">--</div>
            <div class="metric-sub" id="mood-detail">--</div>
            <div class="metric-trend" id="mood-trend"></div>
          </div>
        </div>

        <!-- AI每日报告 -->
        <div class="ai-report-card">
          <div class="ai-report-header">
            <span class="ai-icon">🤖</span>
            <span class="ai-title">AI 每日健康报告</span>
            <span class="ai-date" id="report-date">--</span>
          </div>
          <div class="ai-summary" id="ai-summary">加载中...</div>
          
          <div class="ai-sections">
            <div class="ai-section warnings" id="warnings-section" style="display:none;">
              <div class="section-title">⚠️ 需要关注</div>
              <ul id="warnings-list"></ul>
            </div>
            <div class="ai-section recommendations" id="recommendations-section" style="display:none;">
              <div class="section-title">💡 个性化建议</div>
              <ul id="recommendations-list"></ul>
            </div>
            <div class="ai-section highlights" id="highlights-section" style="display:none;">
              <div class="section-title">✨ 亮点</div>
              <ul id="highlights-list"></ul>
            </div>
          </div>
        </div>

        <!-- 趋势图表 -->
        <div class="charts-section">
          <h3 class="section-title">📈 趋势分析</h3>
          <div class="charts-tabs">
            <button class="chart-tab active" data-chart="sleep">睡眠</button>
            <button class="chart-tab" data-chart="exercise">运动</button>
            <button class="chart-tab" data-chart="water">饮水</button>
            <button class="chart-tab" data-chart="mood">心情</button>
          </div>
          <div class="chart-container">
            <canvas id="trend-chart" width="350" height="200"></canvas>
          </div>
        </div>

        <!-- 提醒设置 -->
        <div class="reminders-card">
          <h3 class="section-title">🔔 健康提醒</h3>
          <div class="reminder-items">
            <div class="reminder-item">
              <div class="reminder-info">
                <span class="reminder-icon">💧</span>
                <span class="reminder-name">喝水提醒</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="water-reminder" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="reminder-item">
              <div class="reminder-info">
                <span class="reminder-icon">🏃</span>
                <span class="reminder-name">运动提醒 (18:00)</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="exercise-reminder" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="reminder-item">
              <div class="reminder-info">
                <span class="reminder-icon">🌙</span>
                <span class="reminder-name">睡眠提醒 (22:30)</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="sleep-reminder" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          <button class="btn-enable-notifications" id="enable-notifications">
            开启推送通知
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('analytics-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'analytics-styles';
    styles.textContent = `
      .analytics-container {
        padding: 20px;
        max-width: 100%;
      }

      .report-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .report-title {
        font-size: 22px;
        font-weight: 700;
        color: #fff;
        margin: 0;
      }

      .period-selector {
        display: flex;
        gap: 8px;
        background: rgba(255,255,255,0.05);
        padding: 4px;
        border-radius: 12px;
      }

      .period-btn {
        padding: 8px 16px;
        background: transparent;
        border: none;
        border-radius: 8px;
        color: rgba(255,255,255,0.6);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .period-btn.active {
        background: linear-gradient(135deg, #00D4FF, #FF2D92);
        color: #000;
        font-weight: 600;
      }

      /* 评分卡 */
      .score-card {
        background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,45,146,0.1));
        border: 1px solid rgba(0,212,255,0.3);
        border-radius: 24px;
        padding: 30px;
        text-align: center;
        margin-bottom: 24px;
      }

      .score-ring {
        position: relative;
        width: 140px;
        height: 140px;
        margin: 0 auto 16px;
      }

      .score-ring svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }

      .score-ring-bg {
        fill: none;
        stroke: rgba(255,255,255,0.1);
        stroke-width: 8;
      }

      .score-ring-progress {
        fill: none;
        stroke: url(#scoreGradient);
        stroke-width: 8;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 283;
        transition: stroke-dashoffset 1s ease;
      }

      .score-value {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
        font-weight: 800;
        background: linear-gradient(135deg, #00D4FF, #FF2D92);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .score-label {
        font-size: 16px;
        color: rgba(255,255,255,0.6);
      }

      .score-trend {
        margin-top: 8px;
        font-size: 14px;
      }

      .trend-up { color: #4CAF50; }
      .trend-down { color: #FF5252; }
      .trend-flat { color: #FFC107; }

      /* 指标网格 */
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 24px;
      }

      .metric-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 16px;
        text-align: center;
        transition: all 0.3s;
      }

      .metric-card:hover {
        border-color: rgba(0,212,255,0.3);
        transform: translateY(-2px);
      }

      .metric-card.sleep { border-left: 3px solid #8A2BE2; }
      .metric-card.exercise { border-left: 3px solid #00D4FF; }
      .metric-card.water { border-left: 3px solid #0096FF; }
      .metric-card.mood { border-left: 3px solid #FF2D92; }

      .metric-icon {
        font-size: 28px;
        margin-bottom: 8px;
      }

      .metric-name {
        font-size: 12px;
        color: rgba(255,255,255,0.6);
        margin-bottom: 4px;
      }

      .metric-value {
        font-size: 28px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 4px;
      }

      .metric-sub {
        font-size: 11px;
        color: rgba(255,255,255,0.4);
      }

      .metric-trend {
        font-size: 12px;
        margin-top: 4px;
      }

      /* AI报告卡 */
      .ai-report-card {
        background: linear-gradient(135deg, rgba(0,212,255,0.05), rgba(255,45,146,0.05));
        border: 1px solid rgba(0,212,255,0.2);
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 24px;
      }

      .ai-report-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
      }

      .ai-icon {
        font-size: 20px;
      }

      .ai-title {
        font-size: 16px;
        font-weight: 600;
        color: #00D4FF;
        flex: 1;
      }

      .ai-date {
        font-size: 12px;
        color: rgba(255,255,255,0.4);
      }

      .ai-summary {
        font-size: 15px;
        line-height: 1.6;
        color: rgba(255,255,255,0.9);
        padding: 16px;
        background: rgba(0,0,0,0.2);
        border-radius: 12px;
        margin-bottom: 16px;
      }

      .ai-section {
        margin-bottom: 16px;
      }

      .ai-section:last-child {
        margin-bottom: 0;
      }

      .ai-section .section-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #fff;
      }

      .ai-section.warnings .section-title { color: #FF5252; }
      .ai-section.recommendations .section-title { color: #00D4FF; }
      .ai-section.highlights .section-title { color: #4CAF50; }

      .ai-section ul {
        margin: 0;
        padding-left: 20px;
      }

      .ai-section li {
        font-size: 13px;
        color: rgba(255,255,255,0.8);
        margin-bottom: 6px;
        line-height: 1.5;
      }

      /* 图表区域 */
      .charts-section {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 24px;
      }

      .charts-section .section-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #fff;
      }

      .charts-tabs {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }

      .chart-tab {
        padding: 8px 16px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        color: rgba(255,255,255,0.6);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .chart-tab.active {
        background: linear-gradient(135deg, #00D4FF, #FF2D92);
        border-color: transparent;
        color: #000;
        font-weight: 600;
      }

      .chart-container {
        background: rgba(0,0,0,0.3);
        border-radius: 12px;
        padding: 10px;
      }

      .chart-container canvas {
        width: 100%;
        height: auto;
      }

      /* 提醒设置 */
      .reminders-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        padding: 20px;
      }

      .reminder-items {
        margin-bottom: 20px;
      }

      .reminder-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      .reminder-item:last-child {
        border-bottom: none;
      }

      .reminder-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .reminder-icon {
        font-size: 20px;
      }

      .reminder-name {
        font-size: 14px;
        color: rgba(255,255,255,0.8);
      }

      /* 开关样式 */
      .toggle-switch {
        position: relative;
        width: 48px;
        height: 26px;
        cursor: pointer;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.1);
        border-radius: 26px;
        transition: 0.3s;
      }

      .toggle-slider:before {
        content: "";
        position: absolute;
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background: #fff;
        border-radius: 50%;
        transition: 0.3s;
      }

      .toggle-switch input:checked + .toggle-slider {
        background: linear-gradient(135deg, #00D4FF, #FF2D92);
      }

      .toggle-switch input:checked + .toggle-slider:before {
        transform: translateX(22px);
      }

      .btn-enable-notifications {
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, #00D4FF, #FF2D92);
        border: none;
        border-radius: 12px;
        color: #000;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .btn-enable-notifications:active {
        transform: scale(0.98);
        opacity: 0.9;
      }

      /* SVG渐变定义 */
      .analytics-container svg defs {
        display: none;
      }
    `;
    document.head.appendChild(styles);

    // 添加SVG渐变
    this.addSvgGradient();
  }

  addSvgGradient() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.innerHTML = `
      <defs>
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#00D4FF"/>
          <stop offset="100%" style="stop-color:#FF2D92"/>
        </linearGradient>
      </defs>
    `;
    document.body.appendChild(svg);
  }

  bindEvents() {
    // 周期切换
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentPeriod = parseInt(e.target.dataset.period);
        this.loadData();
      });
    });

    // 图表切换
    document.querySelectorAll('.chart-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.renderChart(e.target.dataset.chart);
      });
    });

    // 通知按钮
    const notifyBtn = document.getElementById('enable-notifications');
    if (notifyBtn) {
      notifyBtn.addEventListener('click', () => this.enableNotifications());
    }

    // 提醒开关
    ['water', 'exercise', 'sleep'].forEach(type => {
      const toggle = document.getElementById(`${type}-reminder`);
      if (toggle) {
        toggle.addEventListener('change', (e) => {
          this.toggleReminder(type, e.target.checked);
        });
      }
    });
  }

  async loadData() {
    // 获取数据
    const report = await this.analytics.generateDailyReport('current_user');
    const metrics = await this.analytics.calculateMetrics(
      await this.analytics.db.getLast7DaysData('current_user')
    );

    // 更新UI
    this.updateScoreCard(metrics);
    this.updateMetricCards(metrics);
    this.updateAIReport(report);
    this.renderChart('sleep');
  }

  updateScoreCard(metrics) {
    const scoreEl = document.getElementById('overall-score');
    const ringEl = document.getElementById('overall-score-ring');
    const trendEl = document.getElementById('score-trend');

    if (scoreEl) {
      scoreEl.textContent = metrics.overallScore;
    }

    if (ringEl) {
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (metrics.overallScore / 100) * circumference;
      ringEl.style.strokeDashoffset = offset;
    }

    if (trendEl) {
      const trend = this.getTrendIcon(metrics.overallScore);
      trendEl.innerHTML = trend;
    }
  }

  updateMetricCards(metrics) {
    const data = [
      { type: 'sleep', score: metrics.sleep.score, detail: `${metrics.sleep.avgDuration}小时`, trend: metrics.trends.sleep },
      { type: 'exercise', score: metrics.exercise.score, detail: `${metrics.exercise.totalDuration}分钟`, trend: metrics.trends.exercise },
      { type: 'water', score: metrics.water.score, detail: `${metrics.water.avgAmount}ml`, trend: metrics.trends.water },
      { type: 'mood', score: metrics.mood.score, detail: `${metrics.mood.avgLevel}分`, trend: metrics.trends.mood }
    ];

    data.forEach(item => {
      const scoreEl = document.getElementById(`${item.type}-score`);
      const detailEl = document.getElementById(`${item.type}-detail`);
      const trendEl = document.getElementById(`${item.type}-trend`);

      if (scoreEl) scoreEl.textContent = item.score;
      if (detailEl) detailEl.textContent = item.detail;
      if (trendEl) trendEl.innerHTML = this.getTrendIcon(item.trend);
    });
  }

  updateAIReport(report) {
    // 日期
    const dateEl = document.getElementById('report-date');
    if (dateEl) {
      dateEl.textContent = new Date(report.date).toLocaleDateString('zh-CN');
    }

    // 摘要
    const summaryEl = document.getElementById('ai-summary');
    if (summaryEl) {
      summaryEl.textContent = report.summary;
    }

    // 警告
    if (report.warnings && report.warnings.length > 0) {
      const section = document.getElementById('warnings-section');
      const list = document.getElementById('warnings-list');
      if (section && list) {
        section.style.display = 'block';
        list.innerHTML = report.warnings.map(w => `<li>${w}</li>`).join('');
      }
    }

    // 建议
    if (report.recommendations && report.recommendations.length > 0) {
      const section = document.getElementById('recommendations-section');
      const list = document.getElementById('recommendations-list');
      if (section && list) {
        section.style.display = 'block';
        list.innerHTML = report.recommendations.map(r => `<li>${r}</li>`).join('');
      }
    }

    // 亮点
    if (report.highlights && report.highlights.length > 0) {
      const section = document.getElementById('highlights-section');
      const list = document.getElementById('highlights-list');
      if (section && list) {
        section.style.display = 'block';
        list.innerHTML = report.highlights.map(h => `<li>${h}</li>`).join('');
      }
    }
  }

  renderChart(type) {
    const canvas = document.getElementById('trend-chart');
    if (!canvas) return;

    const data = this.analytics.getChartData(type, this.currentPeriod);
    this.analytics.charts.render(canvas.id, type, data);
  }

  getTrendIcon(trend) {
    if (typeof trend === 'number') {
      if (trend >= 80) return '<span class="trend-up">↑ 优秀</span>';
      if (trend >= 60) return '<span class="trend-flat">→ 良好</span>';
      return '<span class="trend-down">↓ 需改善</span>';
    }
    
    if (trend === 1) return '<span class="trend-up">↑ 上升</span>';
    if (trend === -1) return '<span class="trend-down">↓ 下降</span>';
    return '<span class="trend-flat">→ 平稳</span>';
  }

  async enableNotifications() {
    const granted = await this.pushManager.requestPermission();
    if (granted) {
      await this.pushManager.subscribe();
      this.pushManager.scheduleReminders();
      alert('推送通知已开启！');
    } else {
      alert('请允许通知权限以接收健康提醒');
    }
  }

  toggleReminder(type, enabled) {
    console.log(`${type} reminder ${enabled ? 'enabled' : 'disabled'}`);
    // 保存设置到本地存储
    const settings = JSON.parse(localStorage.getItem('reminder_settings') || '{}');
    settings[type] = enabled;
    localStorage.setItem('reminder_settings', JSON.stringify(settings));
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HealthAnalyticsUI;
}
