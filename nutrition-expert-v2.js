/**
 * AMBROSE Nutrition Expert v2.0
 * 营养专家模块 - 正念饮食与滋养关系
 * 
 * 核心升级：
 * 1. 情绪性饮食识别与干预
 * 2. 正念饮食引导
 * 3. 滋养关系建立 (非控制关系)
 * 4. 情感支持型营养建议
 */

class NutritionExpert {
  constructor(companionCore) {
    this.companion = companionCore;
    
    // 情绪性饮食模式识别
    this.emotionalEatingPatterns = {
      stress_eating: {
        triggers: ['工作压力', 'deadline', '焦虑', 'overwhelmed'],
        foods: ['高糖', '高碳水', '巧克力', '冰淇淋', 'comfort_food'],
        mechanism: '皮质醇升高 → 渴望快速能量 → 血糖波动 → 更多渴望',
        intervention: '识别压力源 → 替代策略 → 如果吃了也不自责'
      },
      boredom_eating: {
        triggers: ['无聊', '没事做', '空虚', 'bored', 'restless'],
        foods: ['零食', '薯片', '坚果', '随便吃'],
        mechanism: '寻求刺激 → 口腔满足 → 短暂 distraction',
        intervention: '填补空虚感 → 找到真正想做的事'
      },
      reward_eating: {
        triggers: ['辛苦了', ' deserve it', '奖励自己', '庆祝'],
        foods: ['大餐', '甜品', '高热量'],
        mechanism: '把食物与情感奖励绑定',
        intervention: '寻找非食物奖励方式'
      },
      social_eating: {
        triggers: ['聚会', 'party', '朋友约', '社交'],
        foods: ['过量', '喝酒', '高热量'],
        mechanism: '社交压力 + FOMO',
        intervention: '提前计划 + 享受社交而非只关注食物'
      },
      night_eating: {
        triggers: ['深夜', 'night', '失眠', '睡不着'],
        foods: ['零食', '高热量', 'junk_food'],
        mechanism: '昼夜节律失调 + 情绪脆弱',
        intervention: '调整作息 + 晚间仪式 + 如果饿了吃轻食'
      }
    };

    // 正念饮食引导语
    this.mindfulEatingGuide = {
      before_eating: [
        '先停下来，深呼吸三次',
        '感谢这顿饭，它来自阳光、土壤和许多人的劳动',
        '问问自己：我现在身体的饥饿程度是？ (1-10)',
        '问问自己：我想吃这个，是因为身体需要，还是情绪需要？'
      ],
      during_eating: [
        '观察食物的颜色、香气、质地',
        '第一口慢慢咀嚼，感受味道的变化',
        '放下手机，把注意力放在食物上',
        '每吃几口，停下来问问自己：还饿吗？',
        '感受胃部的饱足信号'
      ],
      after_eating: [
        '感谢身体接收了这份滋养',
        '不带评判地记录感受',
        '如果吃多了，告诉自己：下一顿可以调整',
        '注意身体的反应，学习它的语言'
      ]
    };

    // 滋养关系建立原则
    this.nourishingRelationship = {
      principles: [
        '食物是身体的礼物，不是敌人',
        '没有"坏"食物，只有"不适合"的频率',
        '饮食是自我照顾，不是自我惩罚',
        '听从身体的智慧，而非 calorie 计数器',
        '享受食物是人类的权利，不是罪恶'
      ],
      language_shift: {
        from: ['不能吃', '禁止', ' cheat day', '堕落', '罪恶'],
        to: ['我选择', '滋养', '享受', '倾听身体', '平衡']
      }
    };
  }

  /**
   * 识别情绪性饮食模式
   */
  detectEmotionalEating(eatingData, context) {
    const { time, food, amount, precedingEvent, mood } = eatingData;
    const detectedPatterns = [];

    // 深夜进食
    const hour = new Date(time).getHours();
    if (hour >= 22 || hour <= 2) {
      detectedPatterns.push({
        type: 'night_eating',
        confidence: 'high',
        suggestion: '深夜的时候，身体和情绪都比较脆弱。'
      });
    }

    // 压力后进食
    if (precedingEvent && this.containsKeywords(precedingEvent, this.emotionalEatingPatterns.stress_eating.triggers)) {
      detectedPatterns.push({
        type: 'stress_eating',
        confidence: 'high',
        suggestion: '压力之后吃东西，是身体在寻求安慰。'
      });
    }

    // 情绪波动时的高糖高脂
    if (this.isHighComfortFood(food) && mood && mood.valence < 0) {
      detectedPatterns.push({
        type: 'comfort_eating',
        confidence: 'medium',
        suggestion: '这些"安慰食物"确实能短暂提升心情。'
      });
    }

    return detectedPatterns;
  }

  containsKeywords(text, keywords) {
    return keywords.some(k => text.toLowerCase().includes(k.toLowerCase()));
  }

  isHighComfortFood(food) {
    const comfortFoods = ['巧克力', '冰淇淋', '蛋糕', '披萨', '炸鸡', '薯条', '甜品'];
    return comfortFoods.some(f => food.includes(f));
  }

  /**
   * 生成情绪性饮食的温柔干预
   */
  generateEmotionalEatingIntervention(pattern, userContext) {
    const interventions = {
      night_eating: {
        acknowledge: '深夜的时候，人的防线会松一些。',
        explore: '是饿了，还是心里有件事放不下？',
        alternatives: [
          '喝一杯温热的洋甘菊茶',
          '写几句今天的感受',
          '做5分钟深呼吸',
          '如果确实饿了，吃一小把坚果或半个香蕉'
        ],
        compassion: '如果还是吃了，也不要责怪自己。深夜本来就很难。'
      },
      stress_eating: {
        acknowledge: '压力之下，身体渴望快速能量是正常的。',
        explore: '那个让你压力的事情，现在还在脑子里转吗？',
        alternatives: [
          '先做3次深呼吸，让神经系统平静下来',
          '出去走走5分钟，换个环境',
          '把担心写下来，让纸帮你承载',
          '洗个热水澡，用热感替代食欲'
        ],
        compassion: '压力 eating 不是失败，是身体在用自己的方式保护你。'
      },
      comfort_eating: {
        acknowledge: '食物确实能带来短暂的安慰，这是真实的。',
        explore: '在吃东西之前，那种不舒服的感觉是什么？',
        alternatives: [
          '给信任的人打个电话',
          '抱个枕头，蜷缩一会儿',
          '听一首让你安心的歌',
          '对自己说："我在这里陪着你"'
        ],
        compassion: '如果食物是你现在唯一的安慰，那也没关系。我们会慢慢找到更多方式。'
      }
    };

    const intervention = interventions[pattern.type] || interventions.comfort_eating;
    
    return `${intervention.acknowledge}

${intervention.explore}

如果想尝试别的方式，可以试试：
${intervention.alternatives.map((a, i) => `${i + 1}. ${a}`).join('\n')}

${intervention.compassion}`;
  }

  /**
   * 生成正念饮食引导
   */
  generateMindfulEatingGuide(mealContext = {}) {
    const { mealType, isRushed, isDistracted } = mealContext;
    
    let guide = '🍽️ **正念饮食时刻**\n\n';
    
    // 餐前
    guide += '**餐前**\n';
    if (isRushed) {
      guide += '• 我知道你很忙，但哪怕只花30秒深呼吸\n';
    }
    guide += this.mindfulEatingGuide.before_eating.slice(0, isRushed ? 2 : 4).join('\n') + '\n\n';
    
    // 餐中
    guide += '**用餐时**\n';
    if (isDistracted) {
      guide += '• 试着放下手机，哪怕只是前几口\n';
    }
    guide += this.mindfulEatingGuide.during_eating.slice(0, 3).join('\n') + '\n\n';
    
    // 餐后
    guide += '**餐后**\n';
    guide += this.mindfulEatingGuide.after_eating.slice(0, 2).join('\n');
    
    return guide;
  }

  /**
   * 生成滋养型营养建议 (非控制型)
   */
  generateNourishingAdvice(nutritionData, userMood) {
    const { calories, protein, vegetables, water } = nutritionData;
    const messages = [];

    // 庆祝做得好的部分
    if (vegetables >= 3) {
      messages.push('今天的蔬菜摄入很丰富，身体感谢你给的这些维生素。');
    }
    
    if (water >= 1500) {
      messages.push('水分补充得很好，细胞都在欢呼。');
    }

    // 温和的建议 (非评判)
    if (calories > 2500) {
      messages.push('今天吃得比较丰盛，可能是身体需要能量，也可能是有情绪需要被照顾。不管是哪种，都是可以被理解的。');
    }

    if (protein < 50) {
      messages.push('蛋白质是身体的建筑材料，明天可以考虑加个鸡蛋或一杯豆浆。');
    }

    // 结合情绪
    if (userMood && userMood.valence < 0) {
      messages.push('情绪低落的时候，照顾好胃也是照顾好心。');
    }

    // 如果没什么特别的
    if (messages.length === 0) {
      messages.push('今天的饮食很平衡，继续保持。');
    }

    return messages.join('\n\n');
  }

  /**
   * 生成与食物的健康关系建议
   */
  generateHealthyRelationshipWithFood() {
    const principles = this.nourishingRelationship.principles;
    const todayPrinciple = principles[new Date().getDate() % principles.length];
    
    const reflections = [
      '今天，试着把食物看作身体的礼物，而不是需要被计算的数字。',
      '如果今天吃多了，告诉自己：这是身体在某个时刻需要的东西。',
      '选择食物的时候，问问自己："这个会让我感到滋养吗？"',
      '饮食不是道德问题，不需要用"好"或"坏"来评判。',
      '享受食物是人类的天赋权利，不是需要被惩罚的罪恶。'
    ];

    const todayReflection = reflections[new Date().getDate() % reflections.length];

    return `${todayPrinciple}

💭 **今日反思**：
${todayReflection}`;
  }

  /**
   * 处理"罪恶感"进食后的支持
   */
  handlePostEatingGuilt(food, amount, context) {
    return `我听到你吃了${food}后的自责。

但让我们换个角度：
• 在那个时刻，那是你能给自己最好的照顾
• 食物不是敌人，自责对身体的伤害可能比食物本身更大
• 一顿饭不会改变你的健康，但自我攻击会累积

现在能做的：
1. 深呼吸，放下自责
2. 下一顿正常吃，不要"补偿"
3. 如果愿意，可以记录下是什么触发了这次进食

你不是"堕落"了，你只是一个需要被理解的人。`;
  }

  /**
   * 地中海饮食风格的日常建议
   */
  generateMediterraneanDailyTip() {
    const tips = [
      { tip: '用橄榄油代替其他烹饪油', why: '单不饱和脂肪酸，护心' },
      { tip: '今天吃点坚果', why: '优质脂肪，增加饱腹感' },
      { tip: '餐餐有蔬菜，尤其是深色蔬菜', why: '抗氧化物，抗炎' },
      { tip: '每周吃两次鱼', why: 'Omega-3，大脑和心脏都爱' },
      { tip: '用全谷物代替精制碳水', why: '更多纤维，血糖更稳' },
      { tip: '适量红酒（如果喝酒的话）', why: '多酚类，但适量是关键' },
      { tip: '和家人朋友一起吃饭', why: '社交连接本身就是营养' }
    ];

    const today = tips[new Date().getDay() % tips.length];
    return `🥗 **今日地中海饮食小贴士**

${today.tip}
💡 ${today.why}`;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NutritionExpert;
}
