/**
 * AMBROSE Companion Core v1.0
 * 情感陪伴核心 - 融合健康数据与情感智能的对话系统
 */

class CompanionCore {
  constructor(ui) {
    this.ui = ui;
    this.emotionEngine = new EmotionEngine();
    this.memory = new MemorySystem();
    this.healthData = null;
    
    this.initialize();
  }

  initialize() {
    // 加载健康数据
    this.loadHealthData();
    
    // 记录会话开始
    this.memory.memory.meta.totalConversations++;
    this.memory.save();
  }

  loadHealthData() {
    try {
      this.healthData = {
        sleep: JSON.parse(localStorage.getItem('ambrose_health_data') || '{}').sleep || {},
        exercise: JSON.parse(localStorage.getItem('ambrose_health_data') || '{}').exercise || {},
        nutrition: JSON.parse(localStorage.getItem('ambrose_health_data') || '{}').nutrition || {},
        mood: JSON.parse(localStorage.getItem('ambrose_health_data') || '{}').mood || {}
      };
    } catch {
      this.healthData = {};
    }
  }

  // 主入口：处理用户消息
  async processMessage(userMessage) {
    // 1. 分析情绪
    const emotionData = this.emotionEngine.analyzeEmotion(userMessage, {
      recentSleep: this.healthData.sleep?.lastNight,
      healthContext: this.healthData
    });
    
    // 2. 记录到记忆
    this.memory.addToShortTerm(userMessage, 'user', {
      emotion: emotionData.emotion,
      confidence: emotionData.confidence
    });
    this.memory.recordEmotion(emotionData.emotion, emotionData.confidence);
    
    // 3. 检测是否需要情感回应
    const needsEmotionalSupport = this.detectEmotionalNeed(emotionData);
    
    // 4. 生成回应
    let response;
    if (needsEmotionalSupport) {
      response = this.generateEmotionalResponse(emotionData);
    } else {
      response = this.generateFunctionalResponse(userMessage, emotionData);
    }
    
    // 5. 记录回应
    this.memory.addToShortTerm(response, 'assistant', {
      emotion: null,
      topic: 'response'
    });
    this.memory.memory.meta.totalMessages++;
    this.memory.save();
    
    return response;
  }

  // 检测是否需要情感支持
  detectEmotionalNeed(emotionData) {
    const highPriorityEmotions = [
      'sadness', 'anxiety', 'overwhelm', 'guilt', 'frustration'
    ];
    
    // 高优先级情绪
    if (highPriorityEmotions.includes(emotionData.emotion) && emotionData.confidence > 0.6) {
      return true;
    }
    
    // 情绪趋势检测
    const trend = this.emotionEngine.getEmotionTrend();
    if (trend && trend.isPersistent && trend.frequency > 0.6) {
      return true;
    }
    
    // 关系阶段影响 (亲密关系更关注情感)
    const stage = this.memory.getRelationshipStage();
    if (stage === 'intimate' && emotionData.confidence > 0.5) {
      return true;
    }
    
    return false;
  }

  // 生成情感回应
  generateEmotionalResponse(emotionData) {
    const baseResponse = this.emotionEngine.generateEmotionalResponse(emotionData, {
      healthData: {
        sleep_hours: this.healthData.sleep?.lastNight,
        days: this.calculateConsecutiveDays('poor_sleep')
      }
    });
    
    // 添加个人化修饰
    const personalizedEnding = this.getPersonalizedEnding();
    
    return baseResponse + '\n\n' + personalizedEnding;
  }

  // 生成功能性回应
  generateFunctionalResponse(userMessage, emotionData) {
    const lowerMsg = userMessage.toLowerCase();
    
    // 健康数据查询
    if (lowerMsg.includes('数据') || lowerMsg.includes('报告') || lowerMsg.includes('分析')) {
      return this.generateHealthReport();
    }
    
    // 运动相关
    if (lowerMsg.includes('运动') || lowerMsg.includes('锻炼') || lowerMsg.includes('健身')) {
      return this.generateExerciseResponse(emotionData);
    }
    
    // 饮食相关
    if (lowerMsg.includes('吃') || lowerMsg.includes('饮食') || lowerMsg.includes('营养')) {
      return this.generateNutritionResponse(emotionData);
    }
    
    // 睡眠相关
    if (lowerMsg.includes('睡') || lowerMsg.includes('失眠')) {
      return this.generateSleepResponse(emotionData);
    }
    
    // 体重相关
    if (lowerMsg.includes('体重') || lowerMsg.includes('减肥') || lowerMsg.includes('胖')) {
      return this.generateWeightResponse(emotionData);
    }
    
    // 默认回应
    return this.generateContextualResponse(userMessage, emotionData);
  }

  // 生成健康报告
  generateHealthReport() {
    const insights = [];
    const suggestions = [];
    
    // 睡眠分析
    if (this.healthData.sleep?.lastNight < 6) {
      insights.push(`昨晚睡眠${this.healthData.sleep.lastNight}小时，低于推荐时长`);
      suggestions.push('今晚尝试11点前入睡，睡前1小时远离屏幕');
    } else if (this.healthData.sleep?.lastNight >= 7) {
      insights.push('昨晚睡眠质量不错');
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
    const recentEmotions = this.memory.getRecentEmotionPattern(3);
    if (recentEmotions.length > 0) {
      const negativeCount = recentEmotions.filter(e => 
        ['sadness', 'anxiety', 'frustration'].includes(e.emotion)
      ).length;
      
      if (negativeCount > recentEmotions.length * 0.5) {
        insights.push('最近情绪波动较大');
        suggestions.push('需要我陪你聊聊，或者试试深呼吸放松？');
      }
    }
    
    // 构建报告
    let report = '📊 **你的健康洞察**\n\n';
    
    if (insights.length > 0) {
      report += '**观察**：\n';
      insights.forEach(i => report += `• ${i}\n`);
      report += '\n';
    }
    
    if (suggestions.length > 0) {
      report += '**建议**：\n';
      suggestions.forEach(s => report += `• ${s}\n`);
    }
    
    report += '\n' + this.getPersonalizedEnding();
    
    return report;
  }

  // 生成运动回应 (带情感考量)
  generateExerciseResponse(emotionData) {
    // 根据情绪推荐不同类型的运动
    const emotionExerciseMap = {
      'anxiety': {
        type: '节奏性有氧',
        examples: '跑步、游泳、骑行',
        reason: '规律的身体运动能帮助神经系统恢复平衡'
      },
      'sadness': {
        type: '力量训练',
        examples: '举重、阻力带训练',
        reason: '肌肉收缩能刺激内啡肽释放，提升情绪'
      },
      'fatigue': {
        type: '轻度活动',
        examples: '散步、太极、瑜伽',
        reason: '温和的活动能帮助恢复，而不是消耗更多'
      },
      'frustration': {
        type: '高强度间歇',
        examples: 'HIIT、搏击操',
        reason: '释放积压的能量和情绪'
      }
    };
    
    const recommendation = emotionExerciseMap[emotionData.emotion];
    
    if (recommendation) {
      return `根据你现在的状态，我建议尝试**${recommendation.type}**，比如${recommendation.examples}。

${recommendation.reason}。

现在不想动也没关系，可以先从深呼吸开始，等身体准备好。`;
    }
    
    // 默认运动建议
    return `运动是身体最好的朋友。你今天想做什么样的运动？

我可以帮你：
• 制定今日运动计划
• 记录运动数据
• 根据你的状态调整强度

现在感觉怎么样，想动一动吗？`;
  }

  // 生成营养回应
  generateNutritionResponse(emotionData) {
    // 检测情绪性饮食
    if (emotionData.emotion === 'sadness' || emotionData.emotion === 'anxiety') {
      return `我注意到你现在可能有些情绪。有时候我们会想用食物来安慰自己，这很正常。

但食物应该是滋养身体的方式，而不是逃避情绪的工具。

如果你现在想吃东西，可以先问问自己：
• 是身体饿了，还是心里需要些什么？
• 这种情绪是什么？可以用文字表达出来吗？

我在这里，愿意听你聊聊。`;
    }
    
    const remaining = 2000 - (this.healthData.nutrition?.todayCalories || 0);
    
    return `今天还可以摄入约${remaining}卡路里。

记住，饮食不是计算，而是与身体建立滋养的关系。

需要我：
• 推荐今日食谱
• 分析营养搭配
• 记录这餐食物`;
  }

  // 生成睡眠回应
  generateSleepResponse(emotionData) {
    const lastNight = this.healthData.sleep?.lastNight || 0;
    
    if (lastNight < 6) {
      return `你昨晚只睡了${lastNight}小时，今天肯定不好受。

睡眠不足不只是身体累，还会影响情绪和判断力。

今晚我们可以一起建立睡前仪式：
1. 22:30 放下手机
2. 调暗灯光，听点轻音乐
3. 做几分钟深呼吸
4. 23:00 准时躺下

你现在最需要的是原谅自己今天的状态，然后给今晚一个机会。`;
    }
    
    return `睡眠是身体最好的修复时间。

昨晚睡了${lastNight}小时。要改善睡眠质量，可以试试：
• 固定作息时间
• 睡前避免蓝光
• 保持卧室凉爽黑暗

今晚打算几点睡？`;
  }

  // 生成体重回应
  generateWeightResponse(emotionData) {
    // 处理情绪化体重焦虑
    if (emotionData.emotion === 'guilt' || emotionData.emotion === 'frustration') {
      return `我听到你在责怪自己。但数字只是一个数据点，不是定义你的标签。

体重波动是正常的——水分、食物、激素都会影响它。

重要的是趋势，不是某一天的数据。

如果你愿意，我们可以一起：
• 看看长期的体重趋势
• 调整生活方式，而不是追求快速变化
• 建立与身体的健康关系

无论数字是多少，你都是一个值得被善待的人。`;
    }
    
    return `体重管理是一场马拉松，不是冲刺。

我可以帮你：
• 追踪体重趋势 (不只是数字)
• 分析影响因素
• 制定可持续的计划

记住，目标是健康，不是某个数字。`;
  }

  // 生成情境化回应
  generateContextualResponse(userMessage, emotionData) {
    const hour = new Date().getHours();
    const relationshipStage = this.memory.getRelationshipStage();
    
    // 根据时间和关系阶段个性化
    let greeting = '';
    if (hour < 9) greeting = '早上好';
    else if (hour < 12) greeting = '上午好';
    else if (hour < 14) greeting = '中午好';
    else if (hour < 18) greeting = '下午好';
    else greeting = '晚上好';
    
    // 搜索相关记忆
    const relevantMemories = this.memory.searchRelevantMemories(userMessage, 2);
    let memoryReference = '';
    
    if (relevantMemories.length > 0 && relationshipStage !== 'new') {
      const memory = relevantMemories[0];
      if (memory.source === 'inside_joke') {
        memoryReference = ` (${memory.trigger})`;
      }
    }
    
    return `${greeting}，BOSS Shao${memoryReference}。

我在这里，有什么想聊的吗？或者我可以帮你看看今天的健康数据。

• 分析今日健康状况
• 制定运动/饮食计划
• 聊聊今天的感受`;
  }

  // 获取个性化结尾
  getPersonalizedEnding() {
    const endings = {
      new: [
        '有什么我可以帮你的吗？',
        '需要我做什么尽管说。'
      ],
      developing: [
        '我在听着。',
        '随时找我聊。'
      ],
      established: [
        '别忘了，我一直都在。',
        '照顾好自己，这是今天的任务。'
      ],
      intimate: [
        '哪怕世界忘了，我也替你记着。',
        '有我在，不用逞强。',
        '记得，你不是一个人在扛。'
      ]
    };
    
    const stage = this.memory.getRelationshipStage();
    const stageEndings = endings[stage] || endings.new;
    
    return stageEndings[Math.floor(Math.random() * stageEndings.length)];
  }

  // 计算连续天数
  calculateConsecutiveDays(metric) {
    // 简化版实现，实际需要遍历历史数据
    return 3; // 占位
  }

  // 生成欢迎语
  generateWelcomeMessage() {
    const { insights, suggestions } = this.analyzeHealthWithEmotion();
    
    let message = this.generateSmartGreeting();
    
    if (insights.length > 0) {
      message += '\n\n📊 **今日洞察**：';
      insights.forEach(i => message += `\n• ${i}`);
    }
    
    if (suggestions.length > 0) {
      message += '\n\n💡 **AI建议**：';
      suggestions.slice(0, 2).forEach(s => message += `\n• ${s}`);
    }
    
    message += '\n\n有什么想聊的？或者我可以帮你：';
    message += '\n• 分析今天的健康数据';
    message += '\n• 制定个性化运动计划';
    message += '\n• 推荐适合的食谱';
    message += '\n• 解答健康疑问';
    
    return message;
  }

  // 生成智能问候
  generateSmartGreeting() {
    const hour = new Date().getHours();
    const relationshipStage = this.memory.getRelationshipStage();
    
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
    
    const stage = relationshipStage;
    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
    else if (hour >= 18) timeOfDay = 'evening';
    
    return greetings[stage]?.[timeOfDay] || greetings.new[timeOfDay];
  }

  // 分析健康数据 (带情感维度)
  analyzeHealthWithEmotion() {
    const insights = [];
    const suggestions = [];
    
    // 睡眠
    if (this.healthData.sleep?.lastNight < 6) {
      insights.push('昨晚睡眠不足6小时');
      suggestions.push('今晚试试11点前入睡，睡前1小时远离手机');
    }
    
    // 饮水
    if (this.healthData.nutrition?.water < 1500) {
      insights.push('今天饮水量偏少');
      suggestions.push('现在喝杯水吧，设置每小时提醒');
    }
    
    // 运动
    if (this.healthData.exercise?.todaySteps < 3000) {
      insights.push('今天步数还比较少');
      suggestions.push('饭后散步20分钟，对消化和血糖都好');
    }
    
    // 情绪趋势
    const emotionTrend = this.emotionEngine.getEmotionTrend();
    if (emotionTrend && emotionTrend.isPersistent) {
      insights.push(`最近${emotionTrend.dominant === 'sadness' ? '情绪低落' : '情绪波动较大'}`);
      suggestions.push('需要我陪你聊聊吗？');
    }
    
    return { insights, suggestions };
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CompanionCore;
}
