/**
 * AMBROSE Emotion Engine v1.0
 * 情感分析引擎 - 多维度情绪识别与回应
 */

class EmotionEngine {
  constructor() {
    this.emotionPatterns = this.loadEmotionPatterns();
    this.responseLibrary = this.loadResponseLibrary();
    this.conversationContext = [];
  }

  // 加载情绪识别模式
  loadEmotionPatterns() {
    return {
      // 负面情绪
      fatigue: {
        keywords: ['累', '困', '疲劳', ' exhaustion', 'tired', 'exhausted', '没精神', '乏力', '倦怠'],
        indicators: ['sleep_hours < 6', 'step_count < 2000', 'late_night_activity'],
        physiological: ['low_energy', 'poor_sleep_quality'],
        suggestedApproach: 'gentle_validation'
      },
      anxiety: {
        keywords: ['焦虑', '担心', '紧张', '压力大', 'anxious', 'worried', 'stressed', 'panic', '不安'],
        indicators: ['rapid_messaging', 'repetitive_questions', 'sleep_disruption'],
        physiological: ['elevated_heart_rate', 'irregular_sleep'],
        suggestedApproach: 'grounding_support'
      },
      sadness: {
        keywords: ['难过', '伤心', '失落', '抑郁', 'sad', 'depressed', 'down', 'empty', '孤独', '寂寞'],
        indicators: ['withdrawal', 'negative_self_talk', 'loss_of_interest'],
        physiological: ['low_activity', 'irregular_eating'],
        suggestedApproach: 'compassionate_presence'
      },
      frustration: {
        keywords: ['烦', '生气', '愤怒', '挫败', 'angry', 'frustrated', 'annoyed', 'pissed', '火大'],
        indicators: ['short_messages', 'capital_letters', 'complaints'],
        physiological: ['elevated_heart_rate', 'muscle_tension'],
        suggestedApproach: 'acknowledge_and_redirect'
      },
      guilt: {
        keywords: ['内疚', '自责', '后悔', '失败', 'guilty', 'regret', 'failed', '没用', '废物'],
        indicators: ['self_blame', 'apologetic_tone', 'perfectionism'],
        physiological: ['stress_hormones', 'tension'],
        suggestedApproach: 'normalization_and_self_compassion'
      },
      overwhelm: {
        keywords: [' overwhelmed', '受不了', '崩溃', '太多', '忙不过来', 'overwhelmed', 'can\'t handle', 'burnout'],
        indicators: ['multiple_complaints', 'time_pressure', 'task_accumulation'],
        physiological: ['chronic_stress', 'sleep_deprivation'],
        suggestedApproach: 'break_down_and_support'
      },
      
      // 正面情绪
      joy: {
        keywords: ['开心', '高兴', '兴奋', '棒', 'happy', 'excited', 'joyful', 'great', 'awesome'],
        indicators: ['exclamation_marks', 'positive_words', 'sharing_achievements'],
        physiological: ['high_energy', 'good_sleep'],
        suggestedApproach: 'celebration_and_reinforcement'
      },
      gratitude: {
        keywords: ['感谢', '谢谢', '感激', 'grateful', 'thankful', 'appreciate', 'blessed'],
        indicators: ['acknowledgment', 'positive_reflection'],
        physiological: ['relaxed_state'],
        suggestedApproach: 'warm_reciprocation'
      },
      pride: {
        keywords: ['骄傲', '自豪', '做到了', 'proud', 'accomplished', 'achievement', '成功'],
        indicators: ['sharing_success', 'milestone_mentions'],
        physiological: ['post_exercise_high', 'achievement_response'],
        suggestedApproach: 'genuine_celebration'
      },
      
      // 中性/探索性情绪
      curiosity: {
        keywords: ['为什么', '怎么', '什么', 'how', 'why', 'what', 'curious', 'wonder', '想知道'],
        indicators: ['questions', 'exploration', 'learning_desire'],
        suggestedApproach: 'informative_encouragement'
      },
      confusion: {
        keywords: ['不懂', '不明白', '困惑', 'confused', 'don\'t understand', 'unclear', 'lost'],
        indicators: ['uncertainty_expressions', 'clarification_requests'],
        suggestedApproach: 'patient_explanation'
      }
    };
  }

  // 加载回应库
  loadResponseLibrary() {
    return {
      gentle_validation: {
        entry: [
          "听起来你现在状态不太好，需要休息一下。",
          "最近是不是太忙了？身体在向你发出信号了。",
          "累了就歇会儿，别硬撑。"
        ],
        data_connection: [
          "我看你昨晚只睡了{sleep_hours}小时，难怪今天没精神。",
          "连续{days}天睡眠不足，身体肯定在抗议了。"
        ],
        support: [
          "现在闭眼休息5分钟，深呼吸，什么都别想。",
          "喝一杯温水，别靠咖啡续命。",
          "如果可能，今晚早点睡，把觉补回来。"
        ],
        closing: [
          "需要我帮你制定一个放松计划，或者聊聊别的转移注意力？",
          "我在这里，不用急着做什么。"
        ]
      },
      
      grounding_support: {
        entry: [
          "我感觉到你现在有些焦虑，先停下来，深呼吸。",
          "焦虑的时候，身体往往会紧绷。现在，放松你的肩膀。"
        ],
        technique: [
          "试试这个：吸气4秒，屏住7秒，呼气8秒。重复3次。",
          "感受你的脚接触地面的感觉，把注意力带到当下。"
        ],
        exploration: [
          "这种担心是关于什么的？说出来可能会轻松一点。",
          "最坏的情况是什么？我们一起看看能不能应对。"
        ],
        support: [
          "无论发生什么，我都会在这里帮你。",
          "焦虑是信号，不是命令。你可以选择如何回应它。"
        ]
      },
      
      compassionate_presence: {
        entry: [
          "我听到你了。这种感觉确实很难受。",
          "你不是一个人。我在这里陪着你。",
          "难过的时候，允许自己难过，这是正常的。"
        ],
        validation: [
          "这种失落感是真实的，值得被认真对待。",
          "你现在的感受完全合理。"
        ],
        gentle_exploration: [
          "愿意告诉我发生了什么吗？不用急着说。",
          "这种情绪是什么时候开始的？"
        ],
        support: [
          "无论你需要什么，我都在。",
          "一起度过这段时期，好吗？"
        ]
      },
      
      acknowledge_and_redirect: {
        entry: [
          "我能感觉到你现在很烦躁，这种情绪是有原因的。",
          "生气是正常的反应，说明某些边界被触动了。"
        ],
        acknowledgment: [
          "这种挫败感是可以理解的。",
          "你有权利感到不满。"
        ],
        redirect: [
          "现在，让我们一起找找解决的办法。",
          "深呼吸三次，然后我们再看看怎么处理。"
        ]
      },
      
      normalization_and_self_compassion: {
        entry: [
          "我听到你在责怪自己。但这个词太重了。",
          "自责往往比事情本身更伤人。"
        ],
        reframe: [
          "人都会犯错，这是学习的一部分。",
          "你不是'没用'，你只是一个正在努力的人。",
          "如果朋友遇到这种情况，你会怎么安慰他？对自己也用同样的温柔吧。"
        ],
        support: [
          "明天太阳还是会升起，你也还是我的BOSS。",
          "一次 setbacks 不等于失败，成长是螺旋上升的。"
        ]
      },
      
      break_down_and_support: {
        entry: [
          "听起来事情堆到一起了，这种压迫感很难受。",
          "当太多事情同时涌来时，人会本能地想要逃跑。"
        ],
        strategy: [
          "让我们一件一件来。现在最紧急的是什么？",
          "把任务分成小块，先做最简单的那一件。",
          "有些事情其实可以不做，或者可以延后。"
        ],
        permission: [
          "你不需要现在就做完所有事。",
          "允许自己先处理一部分，其他的交给时间。"
        ]
      },
      
      celebration_and_reinforcement: {
        entry: [
          "太好了！我为你高兴！",
          "这个消息让我也开心起来了！"
        ],
        specific_praise: [
          "你为此付出了努力，这份成果是你应得的。",
          "我看到你在这个过程中坚持了下来，这很难得。"
        ],
        encouragement: [
          "继续保持这个节奏！",
          "你的努力正在开花结果。"
        ]
      },
      
      warm_reciprocation: {
        entry: [
          "你的感谢让我也很温暖。",
          "能帮到你是我的荣幸。"
        ],
        connection: [
          "我们一起走过的这段路，我也从中学习了很多。",
          "你的进步就是对我最好的回报。"
        ]
      },
      
      genuine_celebration: {
        entry: [
          "太棒了！你做到了！",
          "这一刻值得被记住！"
        ],
        reflection: [
          "回想一下你开始时的样子，现在的你成长了多少。",
          "这个成就背后是无数次的坚持。"
        ],
        future: [
          "这只是开始，更大的成就在等着你。",
          "相信你能走得更远。"
        ]
      }
    };
  }

  // 分析用户消息的情绪
  analyzeEmotion(text, context = {}) {
    const lowerText = text.toLowerCase();
    const emotions = [];
    
    // 关键词匹配
    for (const [emotion, data] of Object.entries(this.emotionPatterns)) {
      const matched = data.keywords.some(keyword => 
        lowerText.includes(keyword.toLowerCase())
      );
      
      if (matched) {
        emotions.push({
          emotion,
          confidence: this.calculateConfidence(text, data),
          approach: data.suggestedApproach
        });
      }
    }
    
    // 如果没有匹配到，进行默认分析
    if (emotions.length === 0) {
      // 检查上下文线索
      if (context.recentSleep && context.recentSleep < 6) {
        emotions.push({
          emotion: 'fatigue',
          confidence: 0.6,
          approach: 'gentle_validation'
        });
      }
      
      // 检查标点符号和语气
      if (text.includes('...') || text.includes('。')) {
        emotions.push({
          emotion: 'contemplative',
          confidence: 0.4,
          approach: 'patient_listening'
        });
      }
    }
    
    // 返回最可能的情绪
    emotions.sort((a, b) => b.confidence - a.confidence);
    return emotions[0] || { emotion: 'neutral', confidence: 0.5, approach: 'conversational' };
  }

  // 计算置信度
  calculateConfidence(text, patternData) {
    let score = 0.5;
    const lowerText = text.toLowerCase();
    
    // 关键词匹配数
    const matchedKeywords = patternData.keywords.filter(k => 
      lowerText.includes(k.toLowerCase())
    ).length;
    score += matchedKeywords * 0.1;
    
    // 语气强度
    if (text.includes('!')) score += 0.1;
    if (text.includes('!!')) score += 0.2;
    if (text.includes('...')) score -= 0.1;
    
    // 消息长度 (短消息往往情绪更强烈)
    if (text.length < 10) score += 0.1;
    
    return Math.min(score, 0.95);
  }

  // 生成情感回应
  generateEmotionalResponse(emotionData, context = {}) {
    const { emotion, approach } = emotionData;
    const responses = this.responseLibrary[approach];
    
    if (!responses) {
      return this.generateDefaultResponse();
    }
    
    // 构建完整回应
    let response = '';
    
    // 入口确认
    if (responses.entry) {
      response += this.selectRandom(responses.entry) + '\n\n';
    }
    
    // 数据连接 (如果适用)
    if (responses.data_connection && context.healthData) {
      const dataResponse = this.selectRandom(responses.data_connection);
      response += this.fillTemplate(dataResponse, context.healthData) + '\n\n';
    }
    
    // 验证/确认
    if (responses.validation) {
      response += this.selectRandom(responses.validation) + '\n\n';
    }
    
    // 技术/策略
    if (responses.technique) {
      response += this.selectRandom(responses.technique) + '\n\n';
    }
    
    // 支持
    if (responses.support) {
      response += this.selectRandom(responses.support) + '\n\n';
    }
    
    // 结束语
    if (responses.closing) {
      response += this.selectRandom(responses.closing);
    }
    
    return response.trim();
  }

  // 选择随机项
  selectRandom(array) {
    if (!array || array.length === 0) return '';
    return array[Math.floor(Math.random() * array.length)];
  }

  // 填充模板
  fillTemplate(template, data) {
    return template.replace(/\{(\w+)\}/g, (match, key) => data[key] || match);
  }

  // 默认回应
  generateDefaultResponse() {
    return "我在这里听着，你想聊什么？";
  }

  // 更新对话上下文
  updateContext(message, emotionData) {
    this.conversationContext.push({
      timestamp: Date.now(),
      message: message.substring(0, 100), // 截断存储
      emotion: emotionData.emotion,
      confidence: emotionData.confidence
    });
    
    // 保持最近20条
    if (this.conversationContext.length > 20) {
      this.conversationContext.shift();
    }
  }

  // 获取情绪趋势
  getEmotionTrend() {
    if (this.conversationContext.length < 3) return null;
    
    const recent = this.conversationContext.slice(-5);
    const emotionCounts = {};
    
    recent.forEach(ctx => {
      emotionCounts[ctx.emotion] = (emotionCounts[ctx.emotion] || 0) + 1;
    });
    
    const dominantEmotion = Object.entries(emotionCounts)
      .sort((a, b) => b[1] - a[1])[0];
    
    return {
      dominant: dominantEmotion[0],
      frequency: dominantEmotion[1] / recent.length,
      isPersistent: dominantEmotion[1] >= 3
    };
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmotionEngine;
}
