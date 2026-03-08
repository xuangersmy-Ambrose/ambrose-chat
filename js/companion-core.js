/**
 * AMBROSE Companion Core v1.0
 * 情感陪伴核心 - 双引擎融合，生成有温度的回应
 * 
 * 核心能力：
 * 1. 健康数据 + 情绪感知的双维度洞察
 * 2. 科学建议 + 情感陪伴的融合表达
 * 3. 个性化语调随关系深化
 * 4. 长期记忆驱动的深度陪伴
 */

class CompanionCore {
  constructor(ui) {
    this.ui = ui;
    this.emotionEngine = new EmotionEngine();
    this.memory = this.loadMemory();
    this.conversationHistory = [];
    this.relationshipStage = this.calculateRelationshipStage();
  }

  loadMemory() {
    try {
      return JSON.parse(localStorage.getItem('ambrose_companion_memory')) || {
        importantEvents: [],
        preferences: {},
        emotionalPatterns: [],
        growthMoments: [],
        lastDeepConversation: null
      };
    } catch {
      return {
        importantEvents: [],
        preferences: {},
        emotionalPatterns: [],
        growthMoments: [],
        lastDeepConversation: null
      };
    }
  }

  saveMemory() {
    localStorage.setItem('ambrose_companion_memory', JSON.stringify(this.memory));
  }

  /**
   * 计算关系阶段 (影响语调和亲密度)
   */
  calculateRelationshipStage() {
    const daysSinceFirst = this.getDaysSinceFirstInteraction();
    const conversationCount = this.memory.conversationCount || 0;
    
    if (daysSinceFirst < 7 || conversationCount < 10) return 'getting_to_know';
    if (daysSinceFirst < 30 || conversationCount < 50) return 'building_trust';
    if (daysSinceFirst < 90 || conversationCount < 100) return 'established';
    return 'deep_bond';
  }

  getDaysSinceFirstInteraction() {
    const first = localStorage.getItem('ambrose_first_interaction');
    if (!first) {
      localStorage.setItem('ambrose_first_interaction', Date.now().toString());
      return 0;
    }
    return Math.floor((Date.now() - parseInt(first)) / (1000 * 60 * 60 * 24));
  }

  /**
   * 主入口：生成智能回应
   */
  async generateResponse(userMessage, context = {}) {
    // 1. 情感分析
    const emotionAnalysis = this.emotionEngine.analyze(userMessage, context);
    
    // 2. 健康数据洞察
    const healthInsights = this.analyzeHealthData();
    
    // 3. 生成情境感知
    const situation = this.generateSituation(emotionAnalysis, healthInsights);
    
    // 4. 选择回应策略
    const strategy = this.selectResponseStrategy(emotionAnalysis, situation);
    
    // 5. 生成回应
    const response = this.composeResponse(userMessage, emotionAnalysis, healthInsights, strategy);
    
    // 6. 记录对话
    this.recordInteraction(userMessage, response, emotionAnalysis);
    
    return response;
  }

  /**
   * 分析健康数据，寻找与情绪的关联
   */
  analyzeHealthData() {
    const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
    const nutritionData = JSON.parse(localStorage.getItem('ambrose_nutrition_data') || '{}');
    const insights = [];
    const concerns = [];

    // 睡眠分析
    if (healthData.sleep) {
      if (healthData.sleep.lastNight < 5) {
        insights.push({
          type: 'sleep',
          severity: 'high',
          message: '昨晚睡眠不足5小时',
          likelyImpact: '情绪波动、疲惫感、判断力下降'
        });
      } else if (healthData.sleep.lastNight < 6) {
        insights.push({
          type: 'sleep',
          severity: 'medium',
          message: '昨晚睡眠略少',
          likelyImpact: '可能感到疲倦'
        });
      }

      // 睡眠质量趋势
      if (healthData.sleep.streak >= 3 && healthData.sleep.quality === 'good') {
        insights.push({
          type: 'sleep',
          severity: 'positive',
          message: '连续3天睡眠质量很好',
          likelyImpact: '身体恢复良好，精力应该不错'
        });
      }
    }

    // 运动分析
    if (healthData.exercise) {
      const daysSinceWorkout = this.getDaysSinceLastWorkout();
      if (daysSinceWorkout > 5) {
        concerns.push({
          type: 'exercise',
          message: '已经5天没有记录了',
          gentleNote: '最近是不是太忙了？'
        });
      }

      if (healthData.exercise.todaySteps < 2000) {
        insights.push({
          type: 'activity',
          severity: 'low',
          message: '今天活动量较少',
          likelyImpact: '身体可能感到僵硬'
        });
      }
    }

    // 饮食分析
    if (nutritionData.stats) {
      if (nutritionData.stats.calories > 2500) {
        insights.push({
          type: 'nutrition',
          severity: 'notice',
          message: '今天摄入热量较高',
          context: '可能是情绪性进食或聚餐'
        });
      }

      if (nutritionData.water < 1000) {
        concerns.push({
          type: 'hydration',
          message: '今天喝水比较少',
          suggestion: '脱水会影响情绪和专注力'
        });
      }
    }

    // 综合分析
    const mood = healthData.mood?.today;
    
    return {
      insights,
      concerns,
      mood,
      hasSignificantPattern: insights.length > 0 || concerns.length > 0
    };
  }

  getDaysSinceLastWorkout() {
    // 简化实现，实际应该从历史记录中计算
    return 0;
  }

  /**
   * 生成当前情境 (情绪 + 健康 + 时间)
   */
  generateSituation(emotionAnalysis, healthInsights) {
    const hour = new Date().getHours();
    
    return {
      timeOfDay: this.getTimeOfDay(hour),
      energyLevel: this.inferEnergyLevel(emotionAnalysis, healthInsights),
      stressLevel: this.inferStressLevel(emotionAnalysis, healthInsights),
      relationshipContext: this.relationshipStage,
      recentPattern: this.detectRecentPattern()
    };
  }

  getTimeOfDay(hour) {
    if (hour >= 5 && hour < 9) return 'early_morning';
    if (hour >= 9 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 14) return 'lunch';
    if (hour >= 14 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  }

  inferEnergyLevel(emotionAnalysis, healthInsights) {
    if (emotionAnalysis.primary.name === 'tired') return 'low';
    if (healthInsights.insights.some(i => i.type === 'sleep' && i.severity === 'high')) return 'low';
    if (emotionAnalysis.primary.name === 'happy') return 'high';
    return 'medium';
  }

  inferStressLevel(emotionAnalysis, healthInsights) {
    if (emotionAnalysis.primary.name === 'anxious') return 'high';
    if (emotionAnalysis.primary.name === 'angry') return 'high';
    if (healthInsights.concerns.length > 2) return 'elevated';
    return 'normal';
  }

  detectRecentPattern() {
    // 检测最近的情绪模式
    const recentEmotions = this.memory.emotionalPatterns.slice(-7);
    if (recentEmotions.every(e => e.valence < 0)) return 'negative_streak';
    if (recentEmotions.every(e => e.valence > 0)) return 'positive_streak';
    return 'mixed';
  }

  /**
   * 选择回应策略
   */
  selectResponseStrategy(emotionAnalysis, situation) {
    // 优先处理危机
    if (emotionAnalysis.detectedCrisis) {
      return 'crisis_intervention';
    }

    // 自我贬低需要特别关注
    if (emotionAnalysis.selfDeprecation) {
      return 'self_compassion';
    }

    // 根据情绪和情境选择
    const strategies = {
      tired: {
        low_energy: 'gentle_care_no_pressure',
        evening: 'rest_encouragement',
        default: 'acknowledge_tiredness'
      },
      sad: {
        negative_streak: 'hope_injection',
        night: 'vulnerable_support',
        default: 'validate_explore'
      },
      anxious: {
        high_stress: 'grounding_priority',
        default: 'calm_reassurance'
      },
      angry: {
        default: 'acknowledge_space'
      },
      happy: {
        positive_streak: 'momentum_building',
        default: 'celebrate_anchor'
      }
    };

    const emotionStrategies = strategies[emotionAnalysis.primary.name] || strategies.sad;
    
    if (situation.energyLevel === 'low' && emotionStrategies.low_energy) {
      return emotionStrategies.low_energy;
    }
    
    if (situation.recentPattern === 'negative_streak' && emotionStrategies.negative_streak) {
      return emotionStrategies.negative_streak;
    }

    return emotionStrategies.default || 'general_support';
  }

  /**
   * 组合生成最终回应
   */
  composeResponse(userMessage, emotionAnalysis, healthInsights, strategy) {
    const parts = [];
    
    // 1. 开场：情感连接
    parts.push(this.generateOpening(emotionAnalysis, strategy));
    
    // 2. 数据洞察 (如果有且合适)
    if (healthInsights.hasSignificantPattern && this.shouldIncludeData(emotionAnalysis)) {
      parts.push(this.generateDataInsight(healthInsights, emotionAnalysis));
    }
    
    // 3. 深度回应：根据策略
    parts.push(this.generateDepthResponse(userMessage, emotionAnalysis, strategy));
    
    // 4. 结尾：温暖收束
    parts.push(this.generateClosing(emotionAnalysis, strategy));
    
    // 组合并清理
    return parts.filter(p => p).join('\n\n');
  }

  /**
   * 生成开场
   */
  generateOpening(emotionAnalysis, strategy) {
    const emotion = emotionAnalysis.primary;
    const relationshipModifier = this.getRelationshipModifier();

    const openings = {
      crisis_intervention: '我听到你说的这些，我很担心你。',
      
      self_compassion: `我注意到你在用很重的词说自己。${relationshipModifier}对自己温柔一点，好吗？`,
      
      gentle_care_no_pressure: '感觉到你今天没什么力气。不急，慢慢来。',
      
      rest_encouragement: '今天过得不容易吧？身体在告诉你它需要休息了。',
      
      acknowledge_tiredness: '累了就承认，不丢人。',
      
      hope_injection: '这几天感觉你都有点低。我想让你知道，这种状态会过去的。',
      
      vulnerable_support: '深夜的时候，人的防线会松一些。我在这里。',
      
      validate_explore: `听起来你${this.emotionEngine.suggestEmotionLabel(emotionAnalysis)}。`,
      
      grounding_priority: '先深呼吸三次，跟着我做。吸气...呼气...',
      
      calm_reassurance: '感觉到你的焦虑了。先停一下，我在这里陪着你。',
      
      acknowledge_space: '看起来你心里憋着一股火。想说就说，不想说我陪你沉默。',
      
      celebrate_anchor: `${relationshipModifier}看到你这个消息，我也跟着高兴了！`,
      
      momentum_building: '连续几天状态都不错，这个势头很好！',
      
      general_support: '我在听，你想说多少说多少。'
    };

    return openings[strategy] || openings.general_support;
  }

  getRelationshipModifier() {
    const modifiers = {
      getting_to_know: '',
      building_trust: '',
      established: '作为一直陪着你的人，我想说：',
      deep_bond: '陪伴你这么久，我知道你不是轻易放弃的人。'
    };
    return modifiers[this.relationshipStage] || '';
  }

  /**
   * 判断是否该包含数据
   */
  shouldIncludeData(emotionAnalysis) {
    // 高负面情绪时不加数据，先处理情绪
    if (emotionAnalysis.primary.valence < -0.6) return false;
    // 危机情况不加数据
    if (emotionAnalysis.detectedCrisis) return false;
    return true;
  }

  /**
   * 生成数据洞察 (温柔地)
   */
  generateDataInsight(healthInsights, emotionAnalysis) {
    const insights = [];
    
    for (const insight of healthInsights.insights) {
      if (insight.severity === 'positive') {
        insights.push(`对了，${insight.message}，${insight.likelyImpact}。`);
      } else if (insight.severity === 'high') {
        insights.push(`还有，我注意到${insight.message}，这可能是你${this.mapEmotionToPhysical(emotionAnalysis.primary.name)}的原因之一。`);
      }
    }

    for (const concern of healthInsights.concerns) {
      insights.push(`${concern.gentleNote || ''} ${concern.suggestion || ''}`.trim());
    }

    return insights.length > 0 ? insights.join('\n') : '';
  }

  mapEmotionToPhysical(emotionName) {
    const mapping = {
      tired: '感到疲惫',
      sad: '情绪低落',
      anxious: '焦虑不安',
      angry: '容易烦躁'
    };
    return mapping[emotionName] || '状态不好';
  }

  /**
   * 生成深度回应
   */
  generateDepthResponse(userMessage, emotionAnalysis, strategy) {
    const emotion = emotionAnalysis.primary;

    const depthResponses = {
      validate_explore: `这种感觉${emotion.valence < 0 ? '不好受' : '很难得'}。愿意多说一点吗？是什么让你${this.emotionEngine.suggestEmotionLabel(emotionAnalysis)}？`,
      
      gentle_care_no_pressure: '今天对自己宽容一点，不做也没关系。你已经够努力了。',
      
      rest_encouragement: '今晚早点睡，不逼自己做任何事。恢复是最重要的。',
      
      hope_injection: '我知道现在说什么都可能显得轻飘飘的。但真的，这不是永恒的。你之前也走过低谷，这次也可以。',
      
      vulnerable_support: '有时候夜晚会把情绪放大。但这些情绪是真实的，值得被听见。你愿意分享发生了什么吗？',
      
      calm_reassurance: '焦虑的时候，脑子会像跑马灯一样转。试试把这个担心写下来，或者告诉我。说出来往往会轻一点。',
      
      acknowledge_space: '愤怒是有原因的。它可能是边界被侵犯的信号，或是长期压抑的爆发。不急着找答案，先让自己喘口气。',
      
      celebrate_anchor: '这种时刻要记下来。以后低谷的时候，可以回来看看——你也有这样闪亮的时候。',
      
      general_support: '无论是什么，我都在。想继续聊就聊，想静一静我也陪着你。'
    };

    return depthResponses[strategy] || depthResponses.general_support;
  }

  /**
   * 生成结尾
   */
  generateClosing(emotionAnalysis, strategy) {
    const closings = {
      crisis_intervention: '请记住，你并不孤单。我在这里，专业帮助也在那里。',
      self_compassion: '对自己好一点，就像你对重要的人那样。',
      rest_encouragement: '去休息吧，其他的明天再说。',
      vulnerable_support: '不管多晚，我都在这里。',
      celebrate_anchor: '继续闪耀，我为你骄傲。',
      general_support: '随时找我，我一直在。'
    };

    // 根据关系阶段调整
    const relationshipClosings = {
      getting_to_know: closings.general_support,
      building_trust: closings.general_support,
      established: closings[strategy] || closings.general_support,
      deep_bond: `❤️‍🔥 ${closings[strategy] || closings.general_support}`
    };

    return relationshipClosings[this.relationshipStage];
  }

  /**
   * 记录交互到记忆
   */
  recordInteraction(userMessage, response, emotionAnalysis) {
    this.conversationHistory.push({
      timestamp: Date.now(),
      userMessage,
      emotion: emotionAnalysis.primary,
      hasCrisis: emotionAnalysis.detectedCrisis
    });

    // 记录情绪模式
    this.memory.emotionalPatterns.push({
      date: new Date().toISOString(),
      emotion: emotionAnalysis.primary.name,
      valence: emotionAnalysis.primary.valence,
      intensity: emotionAnalysis.primary.intensity
    });

    // 保持最近30条
    if (this.memory.emotionalPatterns.length > 30) {
      this.memory.emotionalPatterns.shift();
    }

    // 检测重要时刻
    if (emotionAnalysis.primary.intensity > 0.8 || emotionAnalysis.detectedCrisis) {
      this.memory.importantEvents.push({
        date: new Date().toISOString(),
        type: emotionAnalysis.detectedCrisis ? 'crisis' : 'deep_emotion',
        emotion: emotionAnalysis.primary.name
      });
    }

    this.saveMemory();
  }

  /**
   * 生成智能欢迎语 (结合情绪和健康状况)
   */
  generateSmartWelcome() {
    const healthInsights = this.analyzeHealthData();
    const hour = new Date().getHours();
    
    let greeting = '';
    let context = '';
    
    // 时间问候
    if (hour < 9) {
      greeting = '早上好';
      context = '新的一天开始了';
    } else if (hour < 12) {
      greeting = '上午好';
    } else if (hour < 14) {
      greeting = '中午好';
      context = '午餐时间到了';
    } else if (hour < 18) {
      greeting = '下午好';
    } else {
      greeting = '晚上好';
      context = '今天过得怎么样';
    }

    let message = `${greeting}，BOSS Shao。${context ? context + '。' : ''}`;

    // 根据健康数据调整
    if (healthInsights.hasSignificantPattern) {
      const importantInsight = healthInsights.insights.find(i => i.severity === 'positive') 
        || healthInsights.insights[0];
      
      if (importantInsight) {
        if (importantInsight.severity === 'positive') {
          message += `\n\n📈 看到${importantInsight.message}，保持得不错。`;
        } else {
          message += `\n\n💭 注意到${importantInsight.message}，今天对自己好一点。`;
        }
      }
    }

    // 根据关系阶段添加个性化
    if (this.relationshipStage === 'deep_bond') {
      const days = this.getDaysSinceFirstInteraction();
      message += `\n\n这是我们相识的第${days}天。`;
    }

    message += `\n\n想聊点什么？或者说说今天感觉如何？`;

    return message;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CompanionCore;
}
