/**
 * AMBROSE Health v2.0 - Main Controller
 * 双引擎融合主控制器
 * 
 * 整合：
 * - EmotionEngine (情感分析)
 * - CompanionCore (情感陪伴)
 * - FitnessExpert v2 (健身专家)
 * - NutritionExpert v2 (营养专家)
 * - LongevityExpert v2 (养生专家)
 */

// 引入所有模块 (在实际使用时通过script标签引入)
// import EmotionEngine from './emotion-engine.js';
// import CompanionCore from './companion-core.js';
// import FitnessExpert from './fitness-expert-v2.js';
// import NutritionExpert from './nutrition-expert-v2.js';
// import LongevityExpert from './longevity-expert-v2.js';

class AMBROSEHealthV2 {
  constructor() {
    // 初始化所有引擎
    this.emotionEngine = new EmotionEngine();
    this.companion = new CompanionCore(this);
    this.fitnessExpert = new FitnessExpert(this.companion);
    this.nutritionExpert = new NutritionExpert(this.companion);
    this.longevityExpert = new LongevityExpert(this.companion);
    
    // 对话状态
    this.conversationState = {
      currentTopic: null,
      emotionalContext: null,
      lastAdvice: null,
      userIntent: null
    };

    // 记忆系统
    this.memory = this.loadMemory();
  }

  loadMemory() {
    try {
      return JSON.parse(localStorage.getItem('ambrose_v2_memory')) || {
        conversationCount: 0,
        firstInteraction: Date.now(),
        preferences: {},
        emotionalJourney: [],
        healthMilestones: [],
        favoriteTopics: []
      };
    } catch {
      return {
        conversationCount: 0,
        firstInteraction: Date.now(),
        preferences: {},
        emotionalJourney: [],
        healthMilestones: [],
        favoriteTopics: []
      };
    }
  }

  saveMemory() {
    localStorage.setItem('ambrose_v2_memory', JSON.stringify(this.memory));
  }

  /**
   * 主入口：处理用户消息
   */
  async processMessage(userMessage) {
    // 增加对话计数
    this.memory.conversationCount++;
    this.saveMemory();

    // 1. 意图识别
    const intent = this.detectIntent(userMessage);
    this.conversationState.userIntent = intent;

    // 2. 情感分析
    const emotionAnalysis = this.emotionEngine.analyze(userMessage);
    this.conversationState.emotionalContext = emotionAnalysis;

    // 3. 根据意图选择处理路径
    switch (intent.type) {
      case 'emotional_support':
        return this.handleEmotionalSupport(userMessage, emotionAnalysis);
      
      case 'fitness':
        return this.handleFitnessQuery(userMessage, emotionAnalysis);
      
      case 'nutrition':
        return this.handleNutritionQuery(userMessage, emotionAnalysis);
      
      case 'wellness':
        return this.handleWellnessQuery(userMessage, emotionAnalysis);
      
      case 'health_data':
        return this.handleHealthDataQuery(emotionAnalysis);
      
      case 'general_chat':
      default:
        return this.handleGeneralChat(userMessage, emotionAnalysis);
    }
  }

  /**
   * 意图识别
   */
  detectIntent(message) {
    const lowerMsg = message.toLowerCase();
    
    // 情感支持类
    const emotionalKeywords = ['难过', '伤心', '焦虑', '压力', '累', '烦', '孤独', '迷茫', 'sad', 'anxious', 'stressed', 'tired', 'lonely'];
    if (emotionalKeywords.some(k => lowerMsg.includes(k))) {
      return { type: 'emotional_support', confidence: 0.9 };
    }

    // 健身类
    const fitnessKeywords = ['运动', '锻炼', '健身', '跑步', '减肥', '体重', 'workout', 'exercise', 'gym', 'run', 'fitness'];
    if (fitnessKeywords.some(k => lowerMsg.includes(k))) {
      return { type: 'fitness', confidence: 0.9 };
    }

    // 营养类
    const nutritionKeywords = ['吃', '饮食', '热量', '减肥', '营养', 'food', 'eat', 'diet', 'calorie', 'nutrition'];
    if (nutritionKeywords.some(k => lowerMsg.includes(k))) {
      return { type: 'nutrition', confidence: 0.85 };
    }

    // 养生类
    const wellnessKeywords = ['养生', '睡眠', '休息', '压力', '冥想', 'wellness', 'sleep', 'meditation', 'stress', 'relax'];
    if (wellnessKeywords.some(k => lowerMsg.includes(k))) {
      return { type: 'wellness', confidence: 0.85 };
    }

    // 健康数据查询
    const dataKeywords = ['数据', '记录', '分析', '报告', '今天', 'data', 'record', 'analysis', 'report'];
    if (dataKeywords.some(k => lowerMsg.includes(k))) {
      return { type: 'health_data', confidence: 0.8 };
    }

    return { type: 'general_chat', confidence: 0.6 };
  }

  /**
   * 处理情感支持请求
   */
  async handleEmotionalSupport(message, emotionAnalysis) {
    // 使用CompanionCore生成情感回应
    const emotionalResponse = await this.companion.generateResponse(message, {
      emotionAnalysis,
      intent: 'emotional_support'
    });

    // 如果情绪与身体状态相关，添加健康建议
    if (this.shouldAddHealthAdvice(emotionAnalysis)) {
      const healthAdvice = this.getEmotionRelatedHealthAdvice(emotionAnalysis);
      return `${emotionalResponse}\n\n---\n\n${healthAdvice}`;
    }

    return emotionalResponse;
  }

  /**
   * 判断是否应添加健康建议
   */
  shouldAddHealthAdvice(emotionAnalysis) {
    // 高负面情绪时，先处理情绪，不加建议
    if (emotionAnalysis.primary.intensity > 0.8) return false;
    if (emotionAnalysis.detectedCrisis) return false;
    
    // 某些情绪可以结合健康建议
    const suitableEmotions = ['tired', 'anxious', 'stressed'];
    return suitableEmotions.includes(emotionAnalysis.primary.name);
  }

  /**
   * 获取与情绪相关的健康建议
   */
  getEmotionRelatedHealthAdvice(emotionAnalysis) {
    const emotion = emotionAnalysis.primary.name;
    
    const advice = {
      tired: '💡 **身体角度**：你的疲劳可能是真实的身体需要。今晚试试11点前睡，明天醒来会不一样。',
      anxious: '💡 **身体角度**：焦虑时身体往往紧绷。试试4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒。',
      stressed: '💡 **身体角度**：压力会影响睡眠和消化。今晚泡个热水澡，让身体从交感神经模式切换到副交感神经。'
    };

    return advice[emotion] || '';
  }

  /**
   * 处理健身相关查询
   */
  handleFitnessQuery(message, emotionAnalysis) {
    const emotion = emotionAnalysis.primary.name;
    
    // 根据情绪状态推荐运动
    const exerciseAdvice = this.fitnessExpert.recommendExercise(emotion);
    
    // 生成支持性建议
    const supportiveAdvice = this.fitnessExpert.generateSupportiveExerciseAdvice(emotion);

    return `${supportiveAdvice}

---

🎯 **具体建议**：
• 推荐：${exerciseAdvice.primary}
• 时长：${exerciseAdvice.duration}
• 原因：${exerciseAdvice.rationale}

💭 ${exerciseAdvice.mindset}`;
  }

  /**
   * 处理营养相关查询
   */
  handleNutritionQuery(message, emotionAnalysis) {
    const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
    
    // 检测情绪性饮食
    const eatingPatterns = this.nutritionExpert.detectEmotionalEating({
      time: Date.now(),
      food: message,
      mood: emotionAnalysis.primary
    }, {});

    // 如果有情绪性饮食模式，先处理情绪
    if (eatingPatterns.length > 0) {
      return this.nutritionExpert.generateEmotionalEatingIntervention(eatingPatterns[0], {});
    }

    // 否则生成滋养型建议
    const nutritionData = healthData.nutrition || {};
    const advice = this.nutritionExpert.generateNourishingAdvice(nutritionData, emotionAnalysis.primary);
    
    return advice;
  }

  /**
   * 处理养生相关查询
   */
  handleWellnessQuery(message, emotionAnalysis) {
    const hour = new Date().getHours();
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 18) timeOfDay = 'midday';
    else if (hour >= 18) timeOfDay = 'evening';

    // 根据时间提供相应的仪式建议
    const ritual = this.longevityExpert.generateDailyRitual(timeOfDay);

    // 如果用户压力大，添加压力管理
    if (emotionAnalysis.primary.name === 'anxious' || emotionAnalysis.primary.name === 'stressed') {
      const stressLevel = Math.round(emotionAnalysis.primary.intensity * 10);
      const stressRelief = this.longevityExpert.generateStressReliefTool(stressLevel);
      
      return `${stressRelief}\n\n---\n\n${ritual}`;
    }

    return ritual;
  }

  /**
   * 处理健康数据查询
   */
  handleHealthDataQuery(emotionAnalysis) {
    const healthInsights = this.companion.analyzeHealthData();
    
    let response = '📊 **今日健康概览**\n\n';

    if (healthInsights.insights.length > 0) {
      response += '**亮点**：\n';
      healthInsights.insights.forEach(insight => {
        response += `• ${insight.message}\n`;
      });
      response += '\n';
    }

    if (healthInsights.concerns.length > 0) {
      response += '**关注**：\n';
      healthInsights.concerns.forEach(concern => {
        response += `• ${concern.message}\n`;
      });
      response += '\n';
    }

    // 根据情绪添加支持性话语
    if (emotionAnalysis.primary.valence < 0) {
      response += '\n💝 不管数据如何，你都在努力。这本身就值得被看见。';
    }

    return response;
  }

  /**
   * 处理一般聊天
   */
  async handleGeneralChat(message, emotionAnalysis) {
    return this.companion.generateResponse(message, {
      emotionAnalysis,
      intent: 'general_chat'
    });
  }

  /**
   * 生成智能欢迎语
   */
  generateWelcomeMessage() {
    return this.companion.generateSmartWelcome();
  }

  /**
   * 生成日常提醒
   */
  generateDailyReminder() {
    const reminders = [
      () => this.longevityExpert.generateBlueZonesDailyPractice(),
      () => this.nutritionExpert.generateMediterraneanDailyTip(),
      () => this.fitnessExpert.generateBlueZonesDailyMovement(),
      () => this.longevityExpert.generateSelfCareSuggestion()
    ];

    const reminder = reminders[new Date().getDate() % reminders.length];
    return reminder();
  }

  /**
   * 主动关怀检测
   */
  shouldCheckIn() {
    const lastCheckIn = localStorage.getItem('ambrose_last_checkin');
    const now = Date.now();
    
    // 如果超过24小时没有交互
    if (!lastCheckIn || (now - parseInt(lastCheckIn)) > 24 * 60 * 60 * 1000) {
      return true;
    }

    // 检测负面情绪 streak
    const recentEmotions = this.companion.memory.emotionalPatterns.slice(-3);
    if (recentEmotions.every(e => e.valence < 0)) {
      return true;
    }

    return false;
  }

  /**
   * 生成主动关怀消息
   */
  generateCheckInMessage() {
    localStorage.setItem('ambrose_last_checkin', Date.now().toString());
    
    const checkIns = [
      '嘿，有一段时间没聊了。想问问你最近怎么样？',
      '刚刚想到你，来打个招呼。今天身体感觉如何？',
      '注意到你最近可能有些低落。我在这里，想聊聊吗？',
      '随机关怀时间到！今天有没有好好照顾自己？'
    ];

    return checkIns[Math.floor(Math.random() * checkIns.length)];
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AMBROSEHealthV2;
}
