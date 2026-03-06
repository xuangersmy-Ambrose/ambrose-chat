/**
 * AMBROSE Health v1.1 - 智能分析与个性化建议模块
 * 
 * 基于超频学习技能：
 * - Day 18: AI/ML 集成
 * - Day 22: 数据分析
 * - Day 25: 架构设计模式
 */

class HealthAnalyticsEngine {
  constructor() {
    this.db = new HealthDataStorage();
    this.ai = new AIRecommendationEngine();
    this.charts = new ChartManager();
  }

  /**
   * 生成每日健康报告
   * 基于Day 18 LLM集成技能
   */
  async generateDailyReport(userId) {
    const data = await this.db.getLast7DaysData(userId);
    
    // 计算关键指标
    const metrics = this.calculateMetrics(data);
    
    // 生成AI报告
    const report = await this.ai.generateReport({
      sleep: metrics.sleep,
      exercise: metrics.exercise,
      water: metrics.water,
      mood: metrics.mood,
      trends: metrics.trends
    });

    return {
      date: new Date().toISOString(),
      summary: report.summary,
      highlights: report.highlights,
      warnings: report.warnings,
      recommendations: report.recommendations,
      score: metrics.overallScore
    };
  }

  /**
   * 计算健康指标
   * 基于Day 22 数据分析技能
   */
  calculateMetrics(data) {
    const sleep = this.analyzeSleep(data.sleep);
    const exercise = this.analyzeExercise(data.exercise);
    const water = this.analyzeWater(data.water);
    const mood = this.analyzeMood(data.mood);

    // 趋势分析
    const trends = {
      sleep: this.calculateTrend(data.sleep.map(d => d.duration)),
      exercise: this.calculateTrend(data.exercise.map(d => d.duration)),
      water: this.calculateTrend(data.water.map(d => d.amount)),
      mood: this.calculateTrend(data.mood.map(d => d.level))
    };

    // 综合评分 (0-100)
    const overallScore = Math.round(
      (sleep.score + exercise.score + water.score + mood.score) / 4
    );

    return { sleep, exercise, water, mood, trends, overallScore };
  }

  analyzeSleep(sleepData) {
    if (!sleepData || sleepData.length === 0) {
      return { score: 0, avgDuration: 0, quality: '无数据' };
    }

    const avgDuration = sleepData.reduce((sum, d) => sum + d.duration, 0) / sleepData.length;
    const avgQuality = sleepData.reduce((sum, d) => sum + d.quality, 0) / sleepData.length;

    // 评分算法
    let score = 0;
    if (avgDuration >= 7 && avgDuration <= 9) score += 40;
    else if (avgDuration >= 6) score += 25;
    else score += 10;

    if (avgQuality >= 4) score += 40;
    else if (avgQuality >= 3) score += 25;
    else score += 10;

    // 规律性加分
    const consistency = this.calculateConsistency(sleepData.map(d => d.duration));
    score += Math.round(consistency * 20);

    let quality = '良好';
    if (score >= 80) quality = '优秀';
    else if (score >= 60) quality = '良好';
    else if (score >= 40) quality = '一般';
    else quality = '需改善';

    return { score, avgDuration: Math.round(avgDuration * 10) / 10, quality, avgQuality };
  }

  analyzeExercise(exerciseData) {
    if (!exerciseData || exerciseData.length === 0) {
      return { score: 0, totalDuration: 0, frequency: 0 };
    }

    const totalDuration = exerciseData.reduce((sum, d) => sum + d.duration, 0);
    const avgDuration = totalDuration / exerciseData.length;
    const frequency = exerciseData.length;

    // WHO建议：每周150分钟中等强度运动
    const weeklyMinutes = totalDuration;
    let score = Math.min(100, Math.round((weeklyMinutes / 150) * 100));

    return { score, totalDuration, frequency, avgDuration: Math.round(avgDuration) };
  }

  analyzeWater(waterData) {
    if (!waterData || waterData.length === 0) {
      return { score: 0, avgAmount: 0 };
    }

    const avgAmount = waterData.reduce((sum, d) => sum + d.amount, 0) / waterData.length;
    
    // 建议每天2000ml
    let score = Math.min(100, Math.round((avgAmount / 2000) * 100));

    return { score, avgAmount: Math.round(avgAmount) };
  }

  analyzeMood(moodData) {
    if (!moodData || moodData.length === 0) {
      return { score: 0, avgLevel: 0, stability: 0 };
    }

    const avgLevel = moodData.reduce((sum, d) => sum + d.level, 0) / moodData.length;
    const stability = this.calculateConsistency(moodData.map(d => d.level));

    // 心情评分 (5分制映射到100分)
    let score = Math.round((avgLevel / 5) * 80 + stability * 20);

    return { score, avgLevel: Math.round(avgLevel * 10) / 10, stability };
  }

  /**
   * 计算趋势 (-1 下降, 0 平稳, 1 上升)
   */
  calculateTrend(values) {
    if (values.length < 3) return 0;

    const n = values.length;
    const firstHalf = values.slice(0, Math.floor(n / 2));
    const secondHalf = values.slice(Math.floor(n / 2));

    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

    const threshold = firstAvg * 0.1; // 10%阈值

    if (secondAvg > firstAvg + threshold) return 1;
    if (secondAvg < firstAvg - threshold) return -1;
    return 0;
  }

  /**
   * 计算稳定性 (0-1)
   */
  calculateConsistency(values) {
    if (values.length < 2) return 1;

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    // 变异系数 (CV) 越小越稳定
    const cv = mean > 0 ? stdDev / mean : 0;
    return Math.max(0, 1 - cv);
  }

  /**
   * 获取图表数据
   * 基于Day 22 数据可视化技能
   */
  getChartData(type, days = 7) {
    const data = this.db.getHistoricalData(type, days);
    
    return {
      labels: data.map(d => this.formatDate(d.date)),
      datasets: [{
        label: this.getLabel(type),
        data: data.map(d => d.value),
        borderColor: this.getColor(type),
        backgroundColor: this.getColor(type, 0.1),
        tension: 0.4,
        fill: true
      }]
    };
  }

  formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  getLabel(type) {
    const labels = {
      sleep: '睡眠时长 (小时)',
      exercise: '运动时长 (分钟)',
      water: '饮水量 (ml)',
      mood: '心情指数',
      weight: '体重 (kg)'
    };
    return labels[type] || type;
  }

  getColor(type, alpha = 1) {
    const colors = {
      sleep: `rgba(138, 43, 226, ${alpha})`,
      exercise: `rgba(0, 212, 255, ${alpha})`,
      water: `rgba(0, 150, 255, ${alpha})`,
      mood: `rgba(255, 45, 146, ${alpha})`,
      weight: `rgba(255, 193, 7, ${alpha})`
    };
    return colors[type] || `rgba(128, 128, 128, ${alpha})`;
  }
}

/**
 * AI建议引擎
 * 基于Day 18 AI/ML集成技能
 */
class AIRecommendationEngine {
  constructor() {
    this.rules = this.loadRules();
  }

  loadRules() {
    return [
      {
        id: 'sleep_insufficient',
        condition: (data) => data.sleep.avgDuration < 6,
        priority: 'high',
        message: '近7天平均睡眠不足6小时，建议今晚11点前入睡，睡前1小时避免使用电子设备。'
      },
      {
        id: 'sleep_quality_low',
        condition: (data) => data.sleep.avgQuality < 3,
        priority: 'medium',
        message: '睡眠质量有待提升，可以尝试睡前冥想、保持卧室温度在20-22°C。'
      },
      {
        id: 'exercise_low',
        condition: (data) => data.exercise.score < 50,
        priority: 'high',
        message: '运动量不足，建议每天进行30分钟快走或居家健身。'
      },
      {
        id: 'water_low',
        condition: (data) => data.water.avgAmount < 1500,
        priority: 'medium',
        message: '饮水量偏低，建议设置每小时喝水提醒，目标每日2000ml。'
      },
      {
        id: 'mood_low',
        condition: (data) => data.mood.avgLevel < 3,
        priority: 'high',
        message: '近期心情指数较低，建议多与朋友交流，或尝试5分钟深呼吸练习。'
      },
      {
        id: 'sleep_trend_down',
        condition: (data) => data.trends.sleep === -1,
        priority: 'medium',
        message: '睡眠时长呈下降趋势，注意调整作息，避免熬夜。'
      },
      {
        id: 'exercise_good',
        condition: (data) => data.exercise.score >= 80,
        priority: 'low',
        message: '运动量达标！继续保持，可以尝试增加运动强度或尝试新的运动方式。'
      },
      {
        id: 'mood_good',
        condition: (data) => data.mood.avgLevel >= 4,
        priority: 'low',
        message: '心情状态很好！这种积极的状态有助于整体健康。'
      }
    ];
  }

  async generateReport(metrics) {
    // 基于规则的推荐
    const ruleBasedRecs = this.rules
      .filter(rule => rule.condition(metrics))
      .sort((a, b) => this.priorityWeight(b.priority) - this.priorityWeight(a.priority))
      .slice(0, 5);

    // 构建报告
    const warnings = ruleBasedRecs.filter(r => r.priority === 'high');
    const highlights = ruleBasedRecs.filter(r => r.priority === 'low');
    const recommendations = ruleBasedRecs.filter(r => r.priority !== 'low');

    // 生成摘要
    const summary = this.generateSummary(metrics, warnings);

    return {
      summary,
      highlights: highlights.map(r => r.message),
      warnings: warnings.map(r => r.message),
      recommendations: recommendations.map(r => r.message)
    };
  }

  priorityWeight(priority) {
    const weights = { high: 3, medium: 2, low: 1 };
    return weights[priority] || 0;
  }

  generateSummary(metrics, warnings) {
    const score = metrics.overallScore;
    let summary = '';

    if (score >= 80) {
      summary = `本周健康评分${score}分，表现优秀！`;
    } else if (score >= 60) {
      summary = `本周健康评分${score}分，整体良好，还有提升空间。`;
    } else {
      summary = `本周健康评分${score}分，需要关注健康状况。`;
    }

    if (warnings.length > 0) {
      summary += ` 发现${warnings.length}项需要关注的问题。`;
    }

    return summary;
  }
}

/**
 * 数据存储管理
 * 基于Day 6-7 后端技能
 */
class HealthDataStorage {
  constructor() {
    this.storageKey = 'ambrose_health_data';
    this.apiEndpoint = '/api/health';
  }

  async getLast7DaysData(userId) {
    // 优先从本地获取
    const localData = this.getLocalData(userId);
    
    // 如果后端可用，同步获取
    try {
      const serverData = await this.fetchFromServer(userId, 7);
      return serverData || localData;
    } catch (e) {
      return localData;
    }
  }

  getLocalData(userId) {
    const data = localStorage.getItem(`${this.storageKey}_${userId}`);
    if (!data) {
      return this.generateMockData();
    }
    return JSON.parse(data);
  }

  async fetchFromServer(userId, days) {
    // 基于Day 5-7 后端API技能
    const response = await fetch(`${this.apiEndpoint}/data?userId=${userId}&days=${days}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  }

  getHistoricalData(type, days) {
    const data = this.getLocalData('current_user');
    const typeData = data[type] || [];
    
    return typeData.slice(-days).map(d => ({
      date: d.date,
      value: d.value || d.duration || d.amount || d.level
    }));
  }

  generateMockData() {
    // 生成模拟数据用于演示
    const data = {
      sleep: [],
      exercise: [],
      water: [],
      mood: []
    };

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      data.sleep.push({
        date: dateStr,
        duration: 6 + Math.random() * 3,
        quality: Math.floor(2 + Math.random() * 3)
      });

      data.exercise.push({
        date: dateStr,
        duration: Math.floor(20 + Math.random() * 60),
        type: ['跑步', '健身', '瑜伽', '游泳'][Math.floor(Math.random() * 4)]
      });

      data.water.push({
        date: dateStr,
        amount: Math.floor(1200 + Math.random() * 1000)
      });

      data.mood.push({
        date: dateStr,
        level: Math.floor(2 + Math.random() * 3),
        note: ''
      });
    }

    return data;
  }
}

/**
 * 图表管理器
 * 基于Day 22 数据可视化技能
 */
class ChartManager {
  constructor() {
    this.charts = {};
  }

  render(canvasId, type, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // 简化的图表渲染（实际使用Chart.js）
    this.renderSimpleChart(ctx, canvas.width, canvas.height, data, options);
  }

  renderSimpleChart(ctx, width, height, data, options) {
    // 清除画布
    ctx.clearRect(0, 0, width, height);

    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // 绘制背景
    ctx.fillStyle = 'rgba(0, 212, 255, 0.05)';
    ctx.fillRect(padding, padding, chartWidth, chartHeight);

    // 绘制数据点
    const values = data.datasets[0].data;
    const max = Math.max(...values) * 1.1;
    const min = 0;
    const range = max - min;

    ctx.strokeStyle = data.datasets[0].borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    values.forEach((value, index) => {
      const x = padding + (index / (values.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / range) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // 绘制数据点
      ctx.fillStyle = data.datasets[0].borderColor;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.stroke();

    // 绘制标签
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';

    data.labels.forEach((label, index) => {
      const x = padding + (index / (data.labels.length - 1)) * chartWidth;
      ctx.fillText(label, x, height - 5);
    });
  }
}

/**
 * 推送通知管理器
 * 基于Day 1-2 Push API技能
 */
class PushNotificationManager {
  constructor() {
    this.swRegistration = null;
    this.isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
  }

  async init() {
    if (!this.isSupported) {
      console.log('Push notifications not supported');
      return false;
    }

    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered');
      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  async requestPermission() {
    if (!this.isSupported) return false;

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async subscribe() {
    if (!this.swRegistration) return null;

    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'BLhL9S1C_8q5Vf8gT8kLmN3pQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbC'
        )
      });

      // 发送订阅信息到服务器
      await this.saveSubscription(subscription);
      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  async saveSubscription(subscription) {
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });
  }

  scheduleReminders() {
    // 喝水提醒 - 每2小时
    this.scheduleReminder('water', 2 * 60 * 60 * 1000, {
      title: '💧 喝水提醒',
      body: '该喝水了！保持充足水分有助于新陈代谢。',
      icon: '/icon-192.png',
      tag: 'water-reminder'
    });

    // 运动提醒 - 每天下午6点
    this.scheduleDailyReminder('exercise', 18, 0, {
      title: '🏃 运动时间',
      body: '今天的运动完成了吗？哪怕10分钟也好！',
      icon: '/icon-192.png',
      tag: 'exercise-reminder'
    });

    // 睡眠提醒 - 每天晚上10:30
    this.scheduleDailyReminder('sleep', 22, 30, {
      title: '🌙 准备睡觉',
      body: '距离理想入睡时间还有30分钟，开始放松吧。',
      icon: '/icon-192.png',
      tag: 'sleep-reminder'
    });
  }

  scheduleReminder(type, interval, notification) {
    setInterval(() => {
      this.showNotification(notification);
    }, interval);
  }

  scheduleDailyReminder(type, hour, minute, notification) {
    const now = new Date();
    const scheduled = new Date();
    scheduled.setHours(hour, minute, 0, 0);

    if (scheduled <= now) {
      scheduled.setDate(scheduled.getDate() + 1);
    }

    const delay = scheduled - now;

    setTimeout(() => {
      this.showNotification(notification);
      // 重复每天
      setInterval(() => {
        this.showNotification(notification);
      }, 24 * 60 * 60 * 1000);
    }, delay);
  }

  showNotification(notification) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(notification.title, {
          body: notification.body,
          icon: notification.icon,
          tag: notification.tag,
          requireInteraction: true,
          actions: [
            { action: 'complete', title: '已完成' },
            { action: 'later', title: '稍后' }
          ]
        });
      });
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
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HealthAnalyticsEngine, PushNotificationManager };
}
