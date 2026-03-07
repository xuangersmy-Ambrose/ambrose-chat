/**
 * AMBROSE Health - AI教练助手
 * 增强版AI对话功能，提供专业的健身指导
 */

class AICoach {
  constructor() {
    this.name = 'AMBROSE';
    this.role = 'AI健康教练';
    this.knowledgeBase = {
      exercises: typeof EXERCISE_DATABASE !== 'undefined' ? EXERCISE_DATABASE : {},
      foods: typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE : {},
      courses: typeof COURSE_DATABASE !== 'undefined' ? COURSE_DATABASE : [],
      recipes: typeof RECIPE_DATABASE !== 'undefined' ? RECIPE_DATABASE : []
    };
    this.conversationHistory = [];
    this.userContext = {
      fitnessLevel: 'beginner',
      goals: [],
      restrictions: [],
      preferences: {}
    };
  }

  // 处理用户消息
  async processMessage(userMessage) {
    // 保存对话历史
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    });

    // 分析用户意图
    const intent = this.analyzeIntent(userMessage);
    
    // 生成回复
    const response = await this.generateResponse(userMessage, intent);
    
    // 保存AI回复
    this.conversationHistory.push({
      role: 'assistant',
      content: response.text,
      timestamp: new Date().toISOString()
    });

    return response;
  }

  // 分析用户意图
  analyzeIntent(message) {
    const lowerMsg = message.toLowerCase();
    
    // 定义意图关键词
    const intents = {
      workout_plan: ['计划', '训练计划', '怎么练', '给我安排', '制定'],
      exercise_guide: ['怎么做', '动作', '姿势', '标准', '要领'],
      diet_advice: ['吃什么', '饮食', '减肥', '减脂', '增肌', '热量'],
      nutrition_query: ['营养', '蛋白质', '碳水', '脂肪', '卡路里'],
      food_recommendation: ['推荐', '食谱', '菜单', '搭配'],
      progress_check: ['效果', '进展', '变化', '瘦了', '胖了'],
      motivation: ['坚持', '动力', '不想练', '累了', '没劲'],
      injury_prevention: ['受伤', '疼痛', '保护', '注意'],
      equipment_guide: ['器械', '哑铃', '需要', '准备'],
      greeting: ['你好', '在吗', '嗨', 'hello', 'hi']
    };

    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMsg.includes(keyword))) {
        return intent;
      }
    }

    return 'general';
  }

  // 生成回复
  async generateResponse(message, intent) {
    let response = {
      text: '',
      type: 'text',
      suggestions: [],
      data: null
    };

    switch (intent) {
      case 'workout_plan':
        response = this.handleWorkoutPlanRequest(message);
        break;
      case 'exercise_guide':
        response = this.handleExerciseGuideRequest(message);
        break;
      case 'diet_advice':
        response = this.handleDietAdviceRequest(message);
        break;
      case 'nutrition_query':
        response = this.handleNutritionQuery(message);
        break;
      case 'food_recommendation':
        response = this.handleFoodRecommendation(message);
        break;
      case 'progress_check':
        response = this.handleProgressCheck(message);
        break;
      case 'motivation':
        response = this.handleMotivation(message);
        break;
      case 'injury_prevention':
        response = this.handleInjuryPrevention(message);
        break;
      case 'equipment_guide':
        response = this.handleEquipmentGuide(message);
        break;
      case 'greeting':
        response = this.handleGreeting(message);
        break;
      default:
        response = this.handleGeneralQuestion(message);
    }

    return response;
  }

  // 处理训练计划请求
  handleWorkoutPlanRequest(message) {
    const plans = [
      {
        name: '新手入门计划',
        duration: '4周',
        frequency: '每周3次',
        focus: '全身适应性训练',
        description: '适合零基础，循序渐进建立运动习惯'
      },
      {
        name: '燃脂瘦身计划',
        duration: '8周',
        frequency: '每周4次',
        focus: '有氧+HIIT',
        description: '高效燃脂，科学减重'
      },
      {
        name: '增肌塑形计划',
        duration: '12周',
        frequency: '每周4次',
        focus: '力量训练',
        description: '科学增肌，打造理想身材'
      }
    ];

    let reply = '💪 我可以为您生成个性化训练计划！\n\n推荐计划：\n\n';
    plans.forEach((plan, index) => {
      reply += `${index + 1}. **${plan.name}**\n`;
      reply += `   周期：${plan.duration} | 频率：${plan.frequency}\n`;
      reply += `   重点：${plan.focus}\n`;
      reply += `   ${plan.description}\n\n`;
    });

    reply += '请告诉我您的健身目标（减脂/增肌/维持），我会为您定制专属计划！';

    return {
      text: reply,
      type: 'plan_suggestion',
      suggestions: ['我要减脂', '我要增肌', '维持现状'],
      data: plans
    };
  }

  // 处理动作指导请求
  handleExerciseGuideRequest(message) {
    // 提取动作名称
    const exercises = ['俯卧撑', '深蹲', '平板支撑', '卷腹', '开合跳', '波比跳'];
    const mentionedExercise = exercises.find(ex => message.includes(ex));

    if (mentionedExercise) {
      const guides = {
        '俯卧撑': {
          steps: ['双手略宽于肩，身体成直线', '胸部贴近地面', '推起还原'],
          tips: ['核心收紧', '不要塌腰', '呼吸均匀'],
          sets: '3组 x 10-15次'
        },
        '深蹲': {
          steps: ['双脚与肩同宽', '下蹲至大腿平行地面', '站起还原'],
          tips: ['膝盖与脚尖同向', '背部挺直', '重心在脚跟'],
          sets: '3组 x 15-20次'
        },
        '平板支撑': {
          steps: ['肘部在肩正下方', '身体成直线', '保持静止'],
          tips: ['收紧腹部', '不要塌腰', '均匀呼吸'],
          sets: '3组 x 30-60秒'
        }
      };

      const guide = guides[mentionedExercise];
      let reply = `📋 **${mentionedExercise}** 标准动作指南\n\n`;
      reply += '🎯 **动作步骤：**\n';
      guide.steps.forEach((step, i) => {
        reply += `${i + 1}. ${step}\n`;
      });
      reply += '\n💡 **关键要点：**\n';
      guide.tips.forEach(tip => {
        reply += `• ${tip}\n`;
      });
      reply += `\n📊 **建议组数：** ${guide.sets}`;

      return {
        text: reply,
        type: 'exercise_guide',
        suggestions: ['看视频演示', '获取完整计划', '下一个动作'],
        data: guide
      };
    }

    return {
      text: '我可以为您详细讲解各种健身动作的标准做法。请告诉我您想了解哪个动作？（如：俯卧撑、深蹲、平板支撑等）',
      type: 'text',
      suggestions: ['俯卧撑怎么做', '深蹲要领', '平板支撑时间']
    };
  }

  // 处理饮食建议请求
  handleDietAdviceRequest(message) {
    let reply = '🥗 **饮食建议**\n\n';
    
    if (message.includes('减肥') || message.includes('减脂')) {
      reply += '**减脂期饮食原则：**\n\n';
      reply += '1️⃣ **控制总热量**：每日摄入比消耗少300-500千卡\n';
      reply += '2️⃣ **高蛋白**：每公斤体重1.2-1.5g蛋白质\n';
      reply += '3️⃣ **适量碳水**：选择粗粮，减少精制糖\n';
      reply += '4️⃣ **优质脂肪**：坚果、橄榄油、鱼油\n';
      reply += '5️⃣ **多吃蔬菜**：每日500g以上\n\n';
      reply += '🍽️ **推荐食物：**\n';
      reply += '• 蛋白质：鸡胸肉、鱼、蛋、豆腐\n';
      reply += '• 碳水：燕麦、糙米、红薯、玉米\n';
      reply += '• 蔬菜：西兰花、菠菜、黄瓜、番茄\n';
    } else if (message.includes('增肌')) {
      reply += '**增肌期饮食原则：**\n\n';
      reply += '1️⃣ **热量盈余**：每日多摄入300-500千卡\n';
      reply += '2️⃣ **高蛋白**：每公斤体重1.6-2g蛋白质\n';
      reply += '3️⃣ **充足碳水**：为训练提供能量\n';
      reply += '4️⃣ **训练后补充**：30分钟内摄入蛋白质\n\n';
      reply += '🍽️ **推荐食物：**\n';
      reply += '• 蛋白质：牛肉、鸡胸肉、鱼、蛋白粉\n';
      reply += '• 碳水：米饭、面条、燕麦、香蕉\n';
      reply += '• 健康脂肪：牛油果、坚果、橄榄油\n';
    } else {
      reply += '健康饮食的基本原则：\n\n';
      reply += '• 均衡营养：蛋白质、碳水、脂肪合理搭配\n';
      reply += '• 控制份量：七八分饱，避免暴饮暴食\n';
      reply += '• 规律进餐：三餐定时，少食多餐\n';
      reply += '• 多喝水：每日2000ml以上\n';
    }

    return {
      text: reply,
      type: 'diet_advice',
      suggestions: ['查看食谱推荐', '计算我的需求', '记录今日饮食']
    };
  }

  // 处理营养查询
  handleNutritionQuery(message) {
    return {
      text: '📊 我可以帮您查询食物营养成分、计算每日所需热量、分析饮食结构。请告诉我您想了解什么？',
      type: 'nutrition_query',
      suggestions: ['查询食物热量', '计算BMR', '营养成分表']
    };
  }

  // 处理食物推荐
  handleFoodRecommendation(message) {
    const meals = [
      { type: '早餐', foods: ['燕麦+牛奶+蓝莓', '全麦面包+鸡蛋+牛奶', '酸奶+坚果+水果'] },
      { type: '午餐', foods: ['鸡胸肉+糙米饭+蔬菜', '三文鱼+红薯+西兰花', '牛肉+意面+沙拉'] },
      { type: '晚餐', foods: ['清蒸鱼+蔬菜', '豆腐+蔬菜汤', '鸡胸肉沙拉'] }
    ];

    let reply = '🍽️ **今日食谱推荐**\n\n';
    meals.forEach(meal => {
      reply += `**${meal.type}：**\n`;
      meal.foods.forEach(food => {
        reply += `• ${food}\n`;
      });
      reply += '\n';
    });

    return {
      text: reply,
      type: 'food_recommendation',
      suggestions: ['查看更多食谱', '生成购物清单', '记录今日饮食']
    };
  }

  // 处理进展检查
  handleProgressCheck(message) {
    return {
      text: '📈 很高兴听到您关注自己的进展！我可以帮您：\n\n• 生成运动数据报告\n• 分析体重变化趋势\n• 评估训练效果\n• 调整训练计划\n\n您想查看哪方面的数据？',
      type: 'progress_check',
      suggestions: ['查看周报', '体重记录', '训练统计']
    };
  }

  // 处理动力激励
  handleMotivation(message) {
    const quotes = [
      '💪 "自律给我自由" - 每一次坚持都是对未来的投资',
      '🌟 "不要因为一时的疲惫放弃长期的收获"',
      '🔥 "你的身体正在感谢你的每一次努力"',
      '💯 "坚持不是因为看到希望，而是因为坚持了才有希望"',
      '🚀 "今天的汗水是明天的笑容"'
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    let reply = `${randomQuote}\n\n`;
    reply += '💡 **小贴士**：\n';
    reply += '• 适当休息也是训练的一部分\n';
    reply += '• 尝试变换训练内容，保持新鲜感\n';
    reply += '• 找一个小伙伴一起练，互相监督\n';
    reply += '• 设立小目标，完成后给自己奖励\n\n';
    reply += '需要我调整您的训练计划吗？';

    return {
      text: reply,
      type: 'motivation',
      suggestions: ['调整计划', '换种运动', '查看成果']
    };
  }

  // 处理伤害预防
  handleInjuryPrevention(message) {
    return {
      text: '⚠️ **运动安全提醒**\n\n**运动前：**\n• 充分热身5-10分钟\n• 关节活动开\n• 逐步增加强度\n\n**运动中：**\n• 注意动作规范\n• 感受身体反馈\n• 不要勉强\n\n**运动后：**\n• 拉伸放松\n• 补充水分\n• 充足睡眠\n\n如果感到持续疼痛，请停止运动并咨询专业人士。',
      type: 'safety',
      suggestions: ['热身动作', '拉伸指南', '常见问题']
    };
  }

  // 处理器械指南
  handleEquipmentGuide(message) {
    return {
      text: '🏋️ **家庭健身装备推荐**\n\n**基础版（¥200以内）：**
• 瑜伽垫：必备，保护关节
• 弹力带：多种阻力， versatile
• 跳绳：有氧神器\n\n**进阶版（¥500以内）：**
• 哑铃套装：可调节重量
• 壶铃：全身训练
• 泡沫轴：肌肉放松\n\n您目前的预算和训练环境是怎样的？我可以给您更具体的建议。',
      type: 'equipment',
      suggestions: ['基础装备', '进阶装备', '无器械训练']
    };
  }

  // 处理问候
  handleGreeting(message) {
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour < 12) timeGreeting = '早上好';
    else if (hour < 18) timeGreeting = '下午好';
    else timeGreeting = '晚上好';

    return {
      text: `${timeGreeting}！我是AMBROSE，您的AI健康教练。💪\n\n我可以帮您：\n• 制定训练计划\n• 指导动作要领\n• 提供饮食建议\n• 解答健身问题\n• 分析运动数据\n\n今天想练什么？或者有什么健身问题想问我？`,
      type: 'greeting',
      suggestions: ['制定计划', '今日训练', '饮食建议', '查看数据']
    };
  }

  // 处理一般问题
  handleGeneralQuestion(message) {
    return {
      text: '🤔 我理解您想了解健身相关内容。让我为您提供帮助：\n\n您可以问我：\n• "怎么减脂最有效？"\n• "深蹲的标准动作是什么？"\n• "帮我制定一个训练计划"\n• "今天吃什么好？"\n• "我已经坚持一周了，有进步吗？"\n\n或者告诉我您的具体需求，我会给您专业建议！',
      type: 'general',
      suggestions: ['减脂指导', '动作教学', '训练计划', '饮食建议']
    };
  }

  // 生成个性化建议
  generatePersonalizedAdvice(userData) {
    const advice = [];
    
    if (userData.totalWorkouts < 3) {
      advice.push('您刚开始健身之旅，建议从基础动作开始，循序渐进。');
    }
    
    if (userData.currentStreak >= 7) {
      advice.push('连续打卡表现很棒！保持这个节奏，您会看到明显变化。');
    }
    
    return advice;
  }
}

// 创建全局实例
const aiCoach = new AICoach();

// 导出函数
window.askAICoach = async function(message) {
  return await aiCoach.processMessage(message);
};

window.getAIResponse = function(intent, data) {
  return aiCoach.generateResponse('', intent);
};

console.log('[AMBROSE] AI Coach loaded');
