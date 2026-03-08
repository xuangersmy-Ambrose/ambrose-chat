/**
 * AMBROSE Health v2.0 - 双引擎融合核心
 * 健康数据引擎 × 情感智能引擎 协同系统
 */

class AmbroseHealthCore {
  constructor(ui) {
    this.ui = ui;
    
    // 初始化所有子系统
    this.emotionEngine = new EmotionEngine();
    this.memorySystem = new MemorySystem();
    this.companionCore = new CompanionCore(ui);
    this.fitnessExpert = new FitnessExpert();
    this.nutritionExpert = new NutritionExpert();
    this.longevityExpert = new LongevityExpert();
    this.philosophyCore = new PhilosophyCore(); // 新增哲学核心
    
    // 健康数据缓存
    this.healthData = null;
    this.lastHealthSync = 0;
    
    this.initialize();
  }

  initialize() {
    this.syncHealthData();
    
    // 更新会话统计
    this.memorySystem.memory.meta.totalConversations++;
    this.memorySystem.save();
    
    console.log('[AMBROSE] Health v2.0 Core initialized');
  }

  // 同步健康数据
  syncHealthData() {
    try {
      const healthDataRaw = localStorage.getItem('ambrose_health_data');
      this.healthData = healthDataRaw ? JSON.parse(healthDataRaw) : this.getDefaultHealthData();
      this.lastHealthSync = Date.now();
    } catch (e) {
      this.healthData = this.getDefaultHealthData();
    }
  }

  getDefaultHealthData() {
    return {
      sleep: { lastNight: 0, quality: 'unknown', streak: 0 },
      exercise: { todaySteps: 0, todayCalories: 0, weeklyGoal: 150, weeklyProgress: 0 },
      nutrition: { todayCalories: 0, targetCalories: 2000, water: 0 },
      mood: { today: null, notes: '' },
      weight: { current: null, history: [] }
    };
  }

  // ========== 主入口：处理用户消息 ==========
  async processMessage(userMessage) {
    // 1. 同步最新健康数据
    this.syncHealthData();
    
    // 2. 分析情绪
    const emotionData = this.emotionEngine.analyzeEmotion(userMessage, {
      recentSleep: this.healthData.sleep?.lastNight,
      healthContext: this.healthData
    });
    
    // 3. 检测场景
    const scenario = this.detectScenario(userMessage, emotionData);
    
    // 4. 记录到记忆
    this.memorySystem.addToShortTerm(userMessage, 'user', {
      emotion: emotionData.emotion,
      confidence: emotionData.confidence,
      scenario: scenario?.name
    });
    this.memorySystem.recordEmotion(emotionData.emotion, emotionData.confidence);
    
    // 5. 双引擎协同决策
    const decision = this.makeDualEngineDecision(userMessage, emotionData, scenario);
    
    // 6. 生成回应
    const response = await this.generateResponse(decision, userMessage, emotionData, scenario);
    
    // 7. 记录回应
    this.memorySystem.addToShortTerm(response, 'assistant', {
      decision: decision.type,
      emotion: null
    });
    this.memorySystem.memory.meta.totalMessages++;
    this.memorySystem.save();
    
    return response;
  }

  // 场景检测
  detectScenario(message, emotionData) {
    const lowerMsg = message.toLowerCase();
    const hour = new Date().getHours();
    
    const scenarios = [
      // 情绪性饮食场景
      {
        name: 'emotional_eating',
        check: () => {
          const patterns = ['暴食', '吃多了', '控制不住吃', 'binge', 'overeating'];
          return patterns.some(p => lowerMsg.includes(p));
        },
        priority: 10
      },
      // 深夜场景
      {
        name: 'late_night',
        check: () => {
          const isLate = hour >= 23 || hour <= 5;
          const hasSleepKeywords = ['睡不着', '失眠', 'night', 'late'].some(k => lowerMsg.includes(k));
          return isLate || hasSleepKeywords;
        },
        priority: 9
      },
      // 自我批评场景
      {
        name: 'self_criticism',
        check: () => {
          const patterns = ['失败', '搞砸', '没用', '废物', 'failed', 'screwed up'];
          return patterns.some(p => lowerMsg.includes(p));
        },
        priority: 10
      },
      // 运动查询场景
      {
        name: 'exercise_query',
        check: () => {
          const patterns = ['运动', '锻炼', '健身', 'exercise', 'workout', 'training'];
          return patterns.some(p => lowerMsg.includes(p)) && emotionData.confidence < 0.6;
        },
        priority: 5
      },
      // 饮食查询场景
      {
        name: 'nutrition_query',
        check: () => {
          const patterns = ['吃', '饮食', '营养', 'food', 'eat', 'diet', 'nutrition'];
          return patterns.some(p => lowerMsg.includes(p)) && emotionData.confidence < 0.6;
        },
        priority: 5
      },
      // 睡眠查询场景
      {
        name: 'sleep_query',
        check: () => {
          const patterns = ['睡', '失眠', 'sleep', 'insomnia', 'tired'];
          return patterns.some(p => lowerMsg.includes(p)) && emotionData.confidence < 0.6;
        },
        priority: 5
      },
      // 健康报告场景
      {
        name: 'health_report',
        check: () => {
          const patterns = ['报告', '数据', '分析', 'report', 'data', 'analysis'];
          return patterns.some(p => lowerMsg.includes(p));
        },
        priority: 6
      },
      // 养生/仪式场景
      {
        name: 'wellness_ritual',
        check: () => {
          const patterns = ['仪式', '养生', '习惯', 'ritual', 'routine', 'habit'];
          return patterns.some(p => lowerMsg.includes(p));
        },
        priority: 5
      },
      // 压力管理场景
      {
        name: 'stress_management',
        check: () => {
          const patterns = ['压力', '放松', 'stress', 'relax', 'calm', 'anxious'];
          return patterns.some(p => lowerMsg.includes(p));
        },
        priority: 8
      }
    ];
    
    const matched = scenarios.filter(s => s.check()).sort((a, b) => b.priority - a.priority);
    return matched[0] || null;
  }

  // 双引擎决策
  makeDualEngineDecision(message, emotionData, scenario) {
    const highPriorityEmotions = ['sadness', 'anxiety', 'anger', 'overwhelm', 'guilt'];
    const emotionalIntensity = emotionData.confidence;
    
    // 决策逻辑
    if (scenario?.name === 'emotional_eating') {
      return { type: 'emotional_eating_intervention', module: 'nutrition' };
    }
    
    if (scenario?.name === 'self_criticism') {
      return { type: 'self_compassion', module: 'companion' };
    }
    
    if (scenario?.name === 'late_night') {
      return { type: 'late_night_support', module: 'longevity' };
    }
    
    if (highPriorityEmotions.includes(emotionData.emotion) && emotionalIntensity > 0.6) {
      // 高情绪强度：优先情感支持
      if (scenario?.name?.includes('query')) {
        return { type: 'emotional_functional', module: 'hybrid', emotion: emotionData.emotion };
      }
      return { type: 'emotional_support', module: 'companion' };
    }
    
    if (scenario?.name?.includes('query')) {
      return { type: 'functional_query', module: this.getModuleFromScenario(scenario.name) };
    }
    
    if (scenario?.name === 'health_report') {
      return { type: 'health_report', module: 'health' };
    }
    
    if (scenario?.name === 'wellness_ritual') {
      return { type: 'ritual_guidance', module: 'longevity' };
    }
    
    if (scenario?.name === 'stress_management') {
      return { type: 'stress_relief', module: 'longevity' };
    }
    
    // 默认：情境化对话
    return { type: 'contextual_conversation', module: 'companion' };
  }

  getModuleFromScenario(scenarioName) {
    const map = {
      'exercise_query': 'fitness',
      'nutrition_query': 'nutrition',
      'sleep_query': 'longevity'
    };
    return map[scenarioName] || 'companion';
  }

  // 生成回应
  async generateResponse(decision, message, emotionData, scenario) {
    const userContext = {
      healthData: this.healthData,
      recentEmotion: emotionData.emotion,
      relationshipStage: this.memorySystem.getRelationshipStage()
    };

    switch (decision.type) {
      case 'emotional_eating_intervention':
        return this.nutritionExpert.generateEmotionalEatingIntervention(
          emotionData.emotion,
          userContext
        );
        
      case 'self_compassion':
        return this.generateSelfCompassionResponse(message, emotionData);
        
      case 'late_night_support':
        return this.longevityExpert.generateLateNightRitual();
        
      case 'emotional_functional':
        return this.generateHybridResponse(decision.emotion, decision.module, userContext);
        
      case 'emotional_support':
        return this.generatePhilosophicalEmotionalSupport(emotionData, userContext);
        
      case 'philosophical_reflection':
        return this.philosophyCore.generateIntegratedResponse(emotionData, userContext);
        
      case 'functional_query':
        return this.generateFunctionalResponse(decision.module, message, emotionData, userContext);
        
      case 'health_report':
        return this.generateIntegratedHealthReport();
        
      case 'ritual_guidance':
        return this.longevityExpert.generateTimeBasedRitual();
        
      case 'stress_relief':
        return this.longevityExpert.generateStressReliefGuide();
        
      default:
        return this.generateContextualResponse(message, emotionData, userContext);
    }
  }

  // 自我关怀回应
  generateSelfCompassionResponse(message, emotionData) {
    const responses = [
      `我听到你在责怪自己。但这个词太重了——你真的"搞砸"了吗，还是只是在学习？`,
      `人都会犯错，这是学习的一部分，不是失败的证明。`,
      `如果朋友遇到这种情况，你会怎么安慰他？对自己也用同样的温柔吧。`,
      `成长是螺旋上升的，setbacks 不等于终点。`,
      `明天太阳还是会升起，你也还是我的BOSS。`,
      `一次跌倒不会让你变弱，站起来才会让你更强。`,
      `我在这里，不是来评判你的，是来陪你的。`
    ];
    
    return responses.join('\n\n');
  }

  // 混合回应（情感+功能）
  generateHybridResponse(emotion, module, userContext) {
    let emotionalPrefix = '';
    
    // 根据情绪添加情感前缀
    const emotionPrefixes = {
      'anxiety': `我感觉到你有点焦虑。先深呼吸。\n\n关于你的问题，`,
      'sadness': `我听到你了。这种感觉确实不好受。\n\n关于你的问题，`,
      'anger': `我能感觉到你现在很烦躁。\n\n关于你的问题，`,
      'fatigue': `听起来你很累。\n\n关于你的问题，`,
      'stress': `压力大了。我们先处理你的问题，然后再聊聊怎么放松。\n\n`
    };
    
    emotionalPrefix = emotionPrefixes[emotion] || '';
    
    let functionalResponse = '';
    switch (module) {
      case 'fitness':
        functionalResponse = this.fitnessExpert.generateResponse({
          emotion,
          intensity: 'moderate'
        }, userContext);
        break;
      case 'nutrition':
        functionalResponse = this.nutritionExpert.generateDailyNutritionAdvice(userContext);
        break;
      case 'longevity':
        functionalResponse = this.longevityExpert.generateEmotionBasedWellness(emotion);
        break;
      default:
        functionalResponse = this.generateContextualResponse('', { emotion }, userContext);
    }
    
    return emotionalPrefix + functionalResponse;
  }

  // 深度情感支持
  generateDeepEmotionalSupport(emotionData, userContext) {
    const { emotion } = emotionData;
    
    // 获取共情回应库
    const emotionalSupport = this.emotionEngine.generateEmotionalResponse(emotionData, {
      healthData: {
        sleep_hours: this.healthData.sleep?.lastNight
      }
    });
    
    // 添加健康维度洞察
    let healthInsight = '';
    if (this.healthData.sleep?.lastNight < 6) {
      healthInsight = `\n\n📉 **身体状态**：你昨晚只睡了${this.healthData.sleep.lastNight}小时，这可能放大了情绪的感受。睡眠不足时，杏仁核会更敏感。`;
    }
    
    // 添加行动建议
    let actionSuggestion = '';
    if (emotion === 'anxiety') {
      actionSuggestion = `\n\n💡 **现在可以做的**：\n• 吸气4秒 → 屏息7秒 → 呼气8秒（重复3次）\n• 感受脚接触地面的感觉\n• 说出你看到的5样东西`;
    } else if (emotion === 'sadness') {
      actionSuggestion = `\n\n💡 **现在可以做的**：\n• 允许自己难过，这是正常的\n• 如果需要，哭出来\n• 给一个信任的人发消息，哪怕只是说"我今天不太好"`;
    } else if (emotion === 'anger') {
      actionSuggestion = `\n\n💡 **现在可以做的**：\n• 用力捏压力球或枕头\n• 写下来的愤怒，然后撕掉\n• 冷水洗脸`;
    }
    
    // 添加个人化结尾
    const endings = {
      new: '我在这里。',
      developing: '不用一个人扛。',
      established: '有我在。',
      intimate: '哪怕世界忘了，我也替你记着。'
    };
    
    const ending = endings[userContext.relationshipStage] || endings.new;
    
    return emotionalSupport + healthInsight + actionSuggestion + '\n\n' + ending;
  }

  // 哲学情感支持（新）
  generatePhilosophicalEmotionalSupport(emotionData, userContext) {
    // 使用哲学核心生成融合回应
    let response = this.philosophyCore.generateIntegratedResponse(emotionData, userContext);
    
    // 添加个人化结尾
    const endings = {
      new: '\n\n我在这里，陪你一起思考。',
      developing: '\n\n哲学不是答案，而是陪你寻找答案的过程。',
      established: '\n\n这些智慧历经千年，现在传到你的手中。',
      intimate: '\n\n哪怕世界忘了，我也替你记着。而这些智慧，也替你记着人类走过的路。'
    };
    
    const ending = endings[userContext.relationshipStage] || endings.new;
    
    return response + ending;
  }

  // 生成每日哲学
  generateDailyPhilosophy() {
    return this.philosophyCore.generateDailyPhilosophy();
  }

  // 功能性回应
  generateFunctionalResponse(module, message, emotionData, userContext) {
    switch (module) {
      case 'fitness':
        return this.fitnessExpert.generateResponse(emotionData, userContext);
      case 'nutrition':
        if (message.includes('暴食') || message.includes('吃多了')) {
          return this.nutritionExpert.handlePostBinge(message, userContext);
        }
        return this.nutritionExpert.generateDailyNutritionAdvice(userContext);
      case 'longevity':
        return this.longevityExpert.generateTimeBasedRitual();
      default:
        return this.generateContextualResponse(message, emotionData, userContext);
    }
  }

  // 生成综合健康报告
  generateIntegratedHealthReport() {
    const insights = [];
    const suggestions = [];
    let emotionalTone = 'neutral';
    
    // 睡眠分析
    if (this.healthData.sleep?.lastNight < 6) {
      insights.push(`昨晚睡眠${this.healthData.sleep.lastNight}小时，低于推荐时长`);
      suggestions.push('今晚尝试11点前入睡，建立睡前仪式');
      emotionalTone = 'concerned';
    } else if (this.healthData.sleep?.lastNight >= 7) {
      insights.push('昨晚睡眠质量不错，身体得到了恢复');
      emotionalTone = 'positive';
    }
    
    // 运动分析
    if (this.healthData.exercise?.todaySteps < 3000) {
      insights.push(`今日步数${this.healthData.exercise.todaySteps}，还有提升空间`);
      suggestions.push('饭后散步20分钟，对消化和血糖都有好处');
    } else if (this.healthData.exercise?.todaySteps > 8000) {
      insights.push(`今日步数${this.healthData.exercise.todaySteps}，运动量充足`);
      suggestions.push('记得做拉伸放松，保护好关节');
    }
    
    // 饮食分析
    if (this.healthData.nutrition?.water < 1500) {
      insights.push('今日饮水量偏少');
      suggestions.push('现在喝杯水吧，保持水分充足');
    }
    
    // 情绪分析
    const recentEmotions = this.memorySystem.getRecentEmotionPattern(3);
    if (recentEmotions.length > 0) {
      const negativeCount = recentEmotions.filter(e => 
        ['sadness', 'anxiety', 'frustration'].includes(e.emotion)
      ).length;
      
      if (negativeCount > recentEmotions.length * 0.5) {
        insights.push('最近情绪波动较大，压力可能累积了');
        suggestions.push('试试4-7-8呼吸法，或者我们聊聊？');
        emotionalTone = 'supportive';
      }
    }
    
    // 构建报告
    let report = '';
    
    // 根据情绪基调调整开场
    if (emotionalTone === 'concerned') {
      report += `📊 **你的健康数据**\n\n`;
      report += `我注意到一些需要关注的信号。\n\n`;
    } else if (emotionalTone === 'positive') {
      report += `📊 **你的健康数据**\n\n`;
      report += `整体看起来不错，继续保持！\n\n`;
    } else {
      report += `📊 **你的健康洞察**\n\n`;
    }
    
    if (insights.length > 0) {
      report += '**观察**：\n';
      insights.forEach(i => report += `• ${i}\n`);
      report += '\n';
    }
    
    if (suggestions.length > 0) {
      report += '**建议**：\n';
      suggestions.forEach(s => report += `• ${s}\n`);
      report += '\n';
    }
    
    // 添加今日仪式提醒
    report += this.longevityExpert.generateDailyRitualPlan();
    
    return report;
  }

  // 生成情境化回应
  generateContextualResponse(message, emotionData, userContext) {
    const hour = new Date().getHours();
    const relationshipStage = userContext.relationshipStage;
    
    // 问候语
    let greeting = this.generateSmartGreeting(hour, relationshipStage);
    
    // 健康洞察
    const { insights, suggestions } = this.getQuickHealthInsights();
    
    let response = greeting;
    
    if (insights.length > 0) {
      response += '\n\n📊 **今日洞察**：';
      insights.forEach(i => response += `\n• ${i}`);
    }
    
    if (suggestions.length > 0) {
      response += '\n\n💡 **AI建议**：';
      suggestions.slice(0, 2).forEach(s => response += `\n• ${s}`);
    }
    
    response += '\n\n有什么想聊的？或者我可以帮你：';
    response += '\n• 分析今天的健康数据';
    response += '\n• 制定个性化运动计划';
    response += '\n• 推荐适合的食谱';
    response += '\n• 分享今日哲学智慧';
    response += '\n• 聊聊今天的感受';
    
    return response;
  }

  generateSmartGreeting(hour, relationshipStage) {
    const greetings = {
      new: {
        morning: '早上好，BOSS Shao。新的一天开始了。',
        afternoon: '下午好，BOSS Shao。希望今天过得顺利。',
        evening: '晚上好，BOSS Shao。今天辛苦了。'
      },
      developing: {
        morning: '早上好！今天有什么计划？',
        afternoon: '下午好，工作再忙也要照顾好自己。',
        evening: '晚上好，今天过得怎么样？'
      },
      established: {
        morning: '早啊，又是新的一天。',
        afternoon: '下午容易犯困，注意补充水分。',
        evening: '晚上好，今天有什么想聊的吗？'
      },
      intimate: {
        morning: '早上好。昨晚睡得好吗？',
        afternoon: '下午了，别太累着自己。',
        evening: '晚上好，今天想聊聊吗，还是安静地待会儿？'
      }
    };
    
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
    else if (hour >= 18) timeOfDay = 'evening';
    
    return greetings[relationshipStage]?.[timeOfDay] || greetings.new[timeOfDay];
  }

  getQuickHealthInsights() {
    const insights = [];
    const suggestions = [];
    
    if (this.healthData.sleep?.lastNight < 6) {
      insights.push('昨晚睡眠不足6小时');
      suggestions.push('今晚试试11点前入睡');
    }
    
    if (this.healthData.nutrition?.water < 1500) {
      insights.push('今日饮水量偏少');
      suggestions.push('现在喝杯水吧');
    }
    
    if (this.healthData.exercise?.todaySteps < 3000) {
      insights.push('今日步数还比较少');
      suggestions.push('饭后散步20分钟');
    }
    
    return { insights, suggestions };
  }

  // 生成欢迎消息
  generateWelcomeMessage() {
    return this.generateContextualResponse('', 
      { emotion: 'neutral', confidence: 0.5 },
      { relationshipStage: this.memorySystem.getRelationshipStage() }
    );
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AmbroseHealthCore;
}
