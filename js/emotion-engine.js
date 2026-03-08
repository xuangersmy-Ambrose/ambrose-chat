/**
 * AMBROSE Emotion Engine v1.0
 * 情感分析引擎 - 理解用户情绪，提供共情回应
 * 
 * 核心能力：
 * 1. 多维度情绪识别 (文本 + 上下文)
 * 2. 情绪强度评估
 * 3. 潜在需求推测
 * 4. 回应策略推荐
 */

class EmotionEngine {
  constructor() {
    // 情绪词典
    this.emotionLexicon = {
      // 负面情绪
      sad: {
        keywords: ['难过', '伤心', '失落', '沮丧', '抑郁', '想哭', '不开心', '痛苦', '绝望', '无助', 'sad', 'upset', 'depressed', 'down'],
        intensity: 0.7,
        valence: -0.6,
        needs: ['comfort', 'validation', 'connection'],
        approach: 'gentle_support'
      },
      anxious: {
        keywords: ['焦虑', '紧张', '担心', '害怕', '不安', '烦躁', '压力', 'panic', 'worried', 'nervous', 'stressed'],
        intensity: 0.8,
        valence: -0.7,
        needs: ['reassurance', 'calm', 'control'],
        approach: 'grounding'
      },
      angry: {
        keywords: ['生气', '愤怒', '恼火', '烦', '火大', '不爽', 'angry', 'mad', 'frustrated', 'annoyed', 'pissed'],
        intensity: 0.8,
        valence: -0.8,
        needs: ['validation', 'space', 'understanding'],
        approach: 'acknowledge'
      },
      tired: {
        keywords: ['累', '疲惫', '困', '没劲', '乏力', ' exhausted', 'tired', 'fatigue', 'burnout', 'drained'],
        intensity: 0.6,
        valence: -0.4,
        needs: ['rest', 'permission', 'care'],
        approach: 'gentle_care'
      },
      lonely: {
        keywords: ['孤独', '寂寞', '没人懂', '空虚', 'alone', 'lonely', 'isolated', 'empty'],
        intensity: 0.7,
        valence: -0.5,
        needs: ['connection', 'presence', 'belonging'],
        approach: 'companionship'
      },
      // 正面情绪
      happy: {
        keywords: ['开心', '高兴', '兴奋', '棒', '太好了', 'happy', 'excited', 'joy', 'great', 'awesome'],
        intensity: 0.8,
        valence: 0.8,
        needs: ['celebration', 'sharing'],
        approach: 'celebrate'
      },
      grateful: {
        keywords: ['感谢', '感恩', '幸运', 'thank', 'grateful', 'blessed', 'appreciate'],
        intensity: 0.7,
        valence: 0.7,
        needs: ['acknowledgment'],
        approach: 'warmth'
      },
      // 复杂情绪
      guilty: {
        keywords: ['内疚', '自责', '后悔', '对不起', 'guilty', 'regret', 'ashamed', 'bad'],
        intensity: 0.7,
        valence: -0.5,
        needs: ['forgiveness', 'perspective', 'compassion'],
        approach: 'reframe'
      },
      confused: {
        keywords: ['迷茫', '困惑', '不知道', '不确定', 'confused', 'lost', 'uncertain', 'dont know'],
        intensity: 0.5,
        valence: -0.3,
        needs: ['clarity', 'guidance', 'space'],
        approach: 'explore'
      },
      disappointed: {
        keywords: ['失望', '期望', '落空', '白忙', 'disappointed', 'let down', 'expected'],
        intensity: 0.6,
        valence: -0.5,
        needs: ['validation', 'perspective', 'hope'],
        approach: 'acknowledge_growth'
      }
    };

    // 自我贬低的表达 (需要特别关注的信号)
    this.selfDeprecationPatterns = [
      '没用', '废物', '失败', ' loser', 'worthless', 'failure', '不行', '做不到',
      'fat', '丑', 'ugly', 'stupid', '笨', '傻'
    ];

    // 危机信号词
    this.crisisSignals = [
      '不想活', '死了算了', 'kill myself', 'suicide', '结束生命', '没意义', ' hopeless'
    ];
  }

  /**
   * 分析用户输入的情绪
   * @param {string} text - 用户输入
   * @param {object} context - 上下文信息 (时间、历史等)
   * @returns {object} 情绪分析结果
   */
  analyze(text, context = {}) {
    const lowerText = text.toLowerCase();
    const emotions = [];
    let detectedCrisis = false;
    let selfDeprecation = false;

    // 检测危机信号
    for (const signal of this.crisisSignals) {
      if (lowerText.includes(signal)) {
        detectedCrisis = true;
        break;
      }
    }

    // 检测自我贬低
    for (const pattern of this.selfDeprecationPatterns) {
      if (lowerText.includes(pattern)) {
        selfDeprecation = true;
        break;
      }
    }

    // 检测情绪
    for (const [emotionName, data] of Object.entries(this.emotionLexicon)) {
      let matched = false;
      let matchCount = 0;
      
      for (const keyword of data.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          matched = true;
          matchCount++;
        }
      }

      if (matched) {
        emotions.push({
          name: emotionName,
          intensity: Math.min(data.intensity + (matchCount * 0.1), 1.0),
          valence: data.valence,
          needs: data.needs,
          approach: data.approach,
          matchCount
        });
      }
    }

    // 按匹配度和强度排序
    emotions.sort((a, b) => (b.matchCount + b.intensity) - (a.matchCount + a.intensity));

    // 如果没有检测到明确情绪，进行模糊推断
    if (emotions.length === 0) {
      const inferred = this.inferEmotion(text, context);
      if (inferred) emotions.push(inferred);
    }

    // 选择主导情绪
    const dominantEmotion = emotions[0] || {
      name: 'neutral',
      intensity: 0.3,
      valence: 0,
      needs: ['presence'],
      approach: 'casual'
    };

    return {
      primary: dominantEmotion,
      allEmotions: emotions,
      detectedCrisis,
      selfDeprecation,
      textLength: text.length,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * 模糊情绪推断 (当没有关键词匹配时)
   */
  inferEmotion(text, context) {
    // 短句 + 问号 = 困惑/好奇
    if (text.length < 10 && text.includes('?')) {
      return {
        name: 'curious',
        intensity: 0.5,
        valence: 0.2,
        needs: ['information'],
        approach: 'informative'
      };
    }

    // 很长的倾诉 = 可能压抑已久
    if (text.length > 100) {
      return {
        name: 'heavy',
        intensity: 0.6,
        valence: -0.4,
        needs: ['listening', 'validation'],
        approach: 'deep_listening'
      };
    }

    // 根据时间推断
    const hour = new Date().getHours();
    if (hour >= 0 && hour <= 5) {
      // 深夜通常情绪波动
      return {
        name: 'vulnerable',
        intensity: 0.5,
        valence: -0.2,
        needs: ['presence', 'comfort'],
        approach: 'gentle_presence'
      };
    }

    return null;
  }

  /**
   * 根据情绪生成共情回应策略
   */
  generateEmpathyStrategy(emotionAnalysis) {
    const { primary, detectedCrisis, selfDeprecation } = emotionAnalysis;

    // 危机干预优先
    if (detectedCrisis) {
      return {
        priority: 'crisis',
        strategy: 'crisis_intervention',
        response: this.getCrisisResponse()
      };
    }

    // 自我贬低需要特别关注
    if (selfDeprecation) {
      return {
        priority: 'high',
        strategy: 'self_compassion',
        approach: 'reframe_self_criticism',
        response: this.getSelfCompassionResponse(primary)
      };
    }

    // 根据情绪类型选择策略
    const strategies = {
      sad: {
        steps: ['validate', 'name_emotion', 'offer_presence', 'gentle_exploration'],
        tone: 'warm_supportive',
        avoid: ['fix_it', 'minimize', 'comparison']
      },
      anxious: {
        steps: ['grounding', 'validate', 'offer_control', 'breathing'],
        tone: 'calm_steady',
        avoid: ['dont_worry', 'calm_down', 'over_reassurance']
      },
      angry: {
        steps: ['acknowledge', 'validate', 'space_offer', 'explore_when_ready'],
        tone: 'steady_nonjudgmental',
        avoid: ['calm_down', 'reasoning', 'defensiveness']
      },
      tired: {
        steps: ['acknowledge', 'permission', 'care_offer', 'rest_encouragement'],
        tone: 'gentle_caring',
        avoid: ['push', 'guilt', 'minimize']
      },
      lonely: {
        steps: ['acknowledge', 'presence', 'connection', 'meaningful_activity'],
        tone: 'warm_present',
        avoid: ['you_have_people', 'distraction', 'minimize']
      },
      guilty: {
        steps: ['normalize', 'self_compassion', 'perspective', 'action_if_needed'],
        tone: 'compassionate',
        avoid: ['dont_feel_guilty', 'its_not_bad', 'minimize']
      },
      happy: {
        steps: ['celebrate', 'amplify', 'share_joy', 'anchor_positive'],
        tone: 'enthusiastic_warm',
        avoid: ['minimize', 'but', 'reality_check']
      },
      confused: {
        steps: ['validate', 'clarify', 'explore', 'support'],
        tone: 'patient_supportive',
        avoid: ['its_obvious', 'you_should_know', 'rush']
      }
    };

    return strategies[primary.name] || strategies['sad'];
  }

  /**
   * 危机干预回应
   */
  getCrisisResponse() {
    return {
      immediate: '我听到你说这些，我很担心你。',
      validation: '你现在一定承受着很大的痛苦。',
      resources: '请联系专业帮助：\n• 心理援助热线：400-161-9995\n• 北京24小时热线：010-82951332\n• 紧急情况请拨打120或110',
      presence: '我在这里陪着你，不要一个人扛着。',
      followUp: '你愿意告诉我发生了什么吗？我听着。'
    };
  }

  /**
   * 自我同情回应
   */
  getSelfCompassionResponse(emotion) {
    const responses = {
      validate: '我注意到你在用很重的词形容自己。',
      reframe: '如果是我最好的朋友遇到这种情况，你会这样说他吗？',
      normalize: '每个人都有状态不好的时候，这很正常。',
      compassion: '对自己温柔一点，你已经很努力了。',
      explore: '是什么让你对自己这么严格？'
    };
    return responses;
  }

  /**
   * 生成情绪命名建议 (帮用户说出感受)
   */
  suggestEmotionLabel(emotionAnalysis) {
    const labels = {
      sad: ['有点低落', '心里空空的', '提不起劲', '莫名伤感'],
      anxious: ['心里不踏实', '七上八下的', '静不下来', '有很多担心'],
      angry: ['憋着一股火', '不爽', '心里有气', '觉得不公平'],
      tired: ['被掏空了', '只想躺着', '没力气', '身心俱疲'],
      lonely: ['没人懂', '被世界遗忘', '心里空落落', '想要被看见'],
      guilty: ['过不去这个坎', '自责', '觉得亏欠', '心里有个结'],
      disappointed: ['期望落空', '白期待了', '有点泄气', '不是想要的结果']
    };

    const emotionName = emotionAnalysis.primary.name;
    const suggestions = labels[emotionName] || ['有些复杂'];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmotionEngine;
}
