/**
 * AMBROSE Nutrition Expert v2.0
 * 营养专家模块 - 正念饮食与情绪性饮食干预
 * 
 * 核心理念：食物是身体的滋养，不是情绪的填补
 * 科学依据：精准营养学 + 正念饮食 + 情绪性饮食心理学
 */

class NutritionExpert {
  constructor() {
    this.foodDatabase = this.loadFoodDatabase();
    this.emotionFoodPatterns = this.loadEmotionFoodPatterns();
    this.mindfulEatingGuide = this.loadMindfulEatingGuide();
  }

  // 加载食物数据库
  loadFoodDatabase() {
    return {
      // 抗焦虑食物
      anti_anxiety: {
        name: '平静心情食物',
        foods: [
          { name: '深海鱼', nutrients: 'Omega-3', mechanism: '支持神经传导和情绪调节' },
          { name: '坚果', nutrients: '镁、锌', mechanism: '稳定神经系统' },
          { name: '深绿叶菜', nutrients: '叶酸、镁', mechanism: '支持血清素合成' },
          { name: '全谷物', nutrients: '复合碳水、B族维生素', mechanism: '稳定血糖，稳定情绪' },
          { name: '酸奶', nutrients: '益生菌、蛋白质', mechanism: '肠脑轴调节' }
        ]
      },

      // 提升能量的食物
      energy_boosting: {
        name: '能量提升食物',
        foods: [
          { name: '浆果', nutrients: '抗氧化剂', mechanism: '减少氧化应激' },
          { name: '鸡蛋', nutrients: '胆碱、蛋白质', mechanism: '支持认知功能' },
          { name: '黑巧克力', nutrients: '黄烷醇', mechanism: '改善血流和认知' },
          { name: '绿茶', nutrients: 'L-茶氨酸、咖啡因', mechanism: '清醒而平静' },
          { name: '豆类', nutrients: '纤维、蛋白质、铁', mechanism: '稳定能量释放' }
        ]
      },

      // 助眠食物
      sleep_supporting: {
        name: '助眠食物',
        foods: [
          { name: '香蕉', nutrients: '镁、色氨酸', mechanism: '促进褪黑素合成' },
          { name: '温牛奶', nutrients: '色氨酸、钙', mechanism: '放松神经' },
          { name: '杏仁', nutrients: '镁', mechanism: '肌肉放松' },
          { name: '樱桃', nutrients: '天然褪黑素', mechanism: '调节睡眠周期' },
          { name: '燕麦', nutrients: '复合碳水', mechanism: '促进色氨酸吸收' }
        ]
      },

      // 抗压食物
      stress_resistant: {
        name: '抗压食物',
        foods: [
          { name: '柑橘类', nutrients: '维生素C', mechanism: '降低皮质醇' },
          { name: '牛油果', nutrients: '钾、健康脂肪', mechanism: '稳定血压' },
          { name: '红薯', nutrients: '复合碳水', mechanism: '稳定血糖，减少渴求' },
          { name: '洋甘菊茶', nutrients: '芹菜素', mechanism: '轻度镇静' },
          { name: '黑巧克力', nutrients: '可可多酚', mechanism: '降低应激激素' }
        ]
      }
    };
  }

  // 情绪-饮食模式库
  loadEmotionFoodPatterns() {
    return {
      emotional_eating_triggers: {
        stress: {
          craved_foods: ['高糖', '高脂', '脆脆的(薯片等)'],
          brain_mechanism: '皮质醇升高→渴求快速能量→多巴胺短暂释放',
          intervention: '识别触发→暂停→选择替代策略'
        },
        sadness: {
          craved_foods: ['甜食', '舒适食物(童年记忆)'],
          brain_mechanism: '血清素低下→渴求碳水化合物→暂时提升情绪',
          intervention: '情绪命名→非食物安慰→复合碳水替代'
        },
        boredom: {
          craved_foods: ['零食', ' anything crunchy'],
          brain_mechanism: '多巴胺寻求→寻求刺激→咀嚼行为',
          intervention: '区分饥饿与无聊→ engaging activity →低卡零食'
        },
        loneliness: {
          craved_foods: ['大量食物', '社交性食物(披萨等)'],
          brain_mechanism: '社交连接缺失→用食物填补→进食时短暂满足',
          intervention: '识别孤独→社交联系→正念独处'
        },
        anger: {
          craved_foods: ['硬的食物(坚果)', '辛辣食物'],
          brain_mechanism: '攻击性情绪→需要"咬"的感觉→释放张力',
          intervention: '安全释放愤怒→替代咀嚼行为→延迟进食'
        }
      },

      // 替代策略库
      alternative_strategies: {
        stress: [
          '深呼吸5次',
          '出去走10分钟',
          '泡杯洋甘菊茶',
          '做5分钟拉伸',
          '写下压力源'
        ],
        sadness: [
          '给朋友打电话',
          '听喜欢的音乐',
          '写情绪日记',
          '拥抱宠物或枕头',
          '看一部轻松的电影'
        ],
        boredom: [
          '做一件小任务',
          '读几页书',
          '整理桌面',
          '学一个新知识',
          '做10个深蹲'
        ],
        loneliness: [
          '发消息给朋友',
          '加入在线社群',
          '给爸妈打电话',
          '去公共场所(咖啡馆)',
          '抱抱自己'
        ],
        anger: [
          '用力捏压力球',
          '写愤怒日记然后撕掉',
          '做20个俯卧撑',
          '大声唱歌',
          '冷水洗脸'
        ]
      }
    };
  }

  // 正念饮食引导
  loadMindfulEatingGuide() {
    return {
      pre_meal: {
        title: '餐前觉察',
        steps: [
          {
            step: 1,
            action: '暂停',
            instruction: '在拿起食物前，先停下来，深呼吸3次'
          },
          {
            step: 2,
            action: '觉察身体',
            instruction: '问问自己：身体真的饿了吗？饿的感觉在哪里？'
          },
          {
            step: 3,
            action: '觉察情绪',
            instruction: '此刻的情绪是什么？是饿还是别的需要？'
          },
          {
            step: 4,
            action: '设定意图',
            instruction: '这顿饭是为了滋养身体。感恩即将享用的食物。'
          }
        ]
      },

      during_meal: {
        title: '餐中觉察',
        steps: [
          {
            step: 1,
            action: '观察',
            instruction: '先看：食物的颜色、形状、气味'
          },
          {
            step: 2,
            action: '小口品尝',
            instruction: '每口咀嚼20-30次，感受味道和质地'
          },
          {
            step: 3,
            action: '放下餐具',
            instruction: '每吃一口，放下餐具，感受饱腹感的变化'
          },
          {
            step: 4,
            action: '觉察满足',
            instruction: '注意身体什么时候说"够了"'
          }
        ]
      },

      post_meal: {
        title: '餐后觉察',
        steps: [
          {
            step: 1,
            action: '停顿',
            instruction: '吃完后，静坐1-2分钟，不急着做下一件事'
          },
          {
            step: 2,
            action: '觉察感受',
            instruction: '身体感觉如何？能量水平？满足度？'
          },
          {
            step: 3,
            action: '无评判观察',
            instruction: '不论吃了什么，都不评判自己，只是观察'
          },
          {
            step: 4,
            action: '感恩',
            instruction: '感谢这顿饭给身体带来的能量'
          }
        ]
      }
    };
  }

  // 分析情绪性饮食风险
  analyzeEmotionalEatingRisk(userContext) {
    const riskFactors = [];
    
    // 时间因素
    const hour = new Date().getHours();
    if (hour >= 21 || hour <= 6) {
      riskFactors.push({ factor: '深夜时段', level: 'high', reason: '深夜情绪性饮食高发期' });
    }
    
    // 情绪因素
    if (userContext.recentEmotion) {
      const highRiskEmotions = ['stress', 'sadness', 'boredom', 'loneliness', 'anger'];
      if (highRiskEmotions.includes(userContext.recentEmotion)) {
        riskFactors.push({ 
          factor: `${userContext.recentEmotion}情绪`, 
          level: 'high', 
          reason: '该情绪与情绪性饮食高度相关' 
        });
      }
    }
    
    // 历史模式
    if (userContext.emotionalEatingHistory) {
      riskFactors.push({ 
        factor: '历史模式', 
        level: 'medium', 
        reason: '有情绪性饮食历史' 
      });
    }
    
    // 饥饿程度
    if (userContext.hoursSinceLastMeal > 5) {
      riskFactors.push({ 
        factor: '过度饥饿', 
        level: 'medium', 
        reason: '长时间未进食易引发暴食' 
      });
    }

    const riskLevel = riskFactors.filter(r => r.level === 'high').length >= 2 ? 'high' : 
                      riskFactors.filter(r => r.level === 'high').length >= 1 ? 'medium' : 'low';

    return { riskLevel, riskFactors };
  }

  // 生成情绪性饮食干预回应
  generateEmotionalEatingIntervention(emotion, userContext = {}) {
    const riskAnalysis = this.analyzeEmotionalEatingRisk(userContext);
    const pattern = this.emotionFoodPatterns.emotional_eating_triggers[emotion];
    const alternatives = this.emotionFoodPatterns.alternative_strategies[emotion];

    let response = '';

    // 第一步：非评判性确认
    response += `我注意到你现在可能有些${emotion === 'stress' ? '压力' : 
                  emotion === 'sadness' ? '低落' :
                  emotion === 'boredom' ? '无聊' :
                  emotion === 'loneliness' ? '孤独' : '情绪'}。\n\n`;

    response += `有时候我们会想用食物来安慰自己，这很正常，不需要责怪自己。\n\n`;

    // 第二步：区分饥饿与情绪
    response += `**先问问自己**：\n`;
    response += `• 是身体饿了（胃里有空洞感），还是心里需要些什么？\n`;
    response += `• 如果现在不能吃，会怎么办？\n`;
    response += `• 这种情绪是什么，可以用文字表达出来吗？\n\n`;

    // 第三步：提供替代策略
    if (alternatives) {
      response += `**试试这些，而不是食物**：\n`;
      alternatives.slice(0, 4).forEach((strategy, i) => {
        response += `${i + 1}. ${strategy}\n`;
      });
      response += '\n';
    }

    // 第四步：如果还是想吃
    response += `**如果你真的想吃东西**：\n`;
    response += `• 先喝一大杯水，等10分钟\n`;
    response += `• 选择高纤维、低热量的食物（蔬菜、水果）\n`;
    response += `• 正念地吃：小口、慢嚼、感受味道\n`;
    response += `• 吃完后，不评判自己\n\n`;

    // 第五步：建立觉察
    response += `食物应该是滋养身体的方式，而不是逃避情绪的工具。\n`;
    response += `建立和食物的健康关系需要时间，我陪你。\n\n`;

    response += `想聊聊是什么让你想吃东西吗？`;

    return response;
  }

  // 生成正念饮食引导
  generateMindfulEatingGuide(phase = 'pre_meal') {
    const guide = this.mindfulEatingGuide[phase];
    
    let response = `🧘 **${guide.title}**\n\n`;
    
    guide.steps.forEach((step, i) => {
      response += `${i + 1}. **${step.action}**\n`;
      response += `   ${step.instruction}\n\n`;
    });

    if (phase === 'pre_meal') {
      response += `💡 **记住**：食物是身体的礼物，不是敌人。每一口都是选择。`;
    } else if (phase === 'during_meal') {
      response += `💡 **记住**：细嚼慢咽不仅帮助消化，也让身体有时间感受饱腹。`;
    } else if (phase === 'post_meal') {
      response += `💡 **记住**：不论吃了什么，都不评判。观察、学习、继续。`;
    }

    return response;
  }

  // 根据情绪推荐食物
  recommendFoodsForEmotion(emotion) {
    const emotionFoodMap = {
      'anxiety': 'anti_anxiety',
      'stress': 'anti_anxiety',
      'worry': 'anti_anxiety',
      'low_energy': 'energy_boosting',
      'fatigue': 'energy_boosting',
      'tired': 'energy_boosting',
      'insomnia': 'sleep_supporting',
      'poor_sleep': 'sleep_supporting',
      'high_stress': 'stress_resistant',
      'overwhelm': 'stress_resistant'
    };

    const category = emotionFoodMap[emotion];
    if (!category || !this.foodDatabase[category]) {
      return null;
    }

    const foodGroup = this.foodDatabase[category];
    
    let response = `🥗 **${foodGroup.name}**\n\n`;
    response += `根据你现在的状态，这些食物可能对你有帮助：\n\n`;
    
    foodGroup.foods.forEach(food => {
      response += `• **${food.name}**：含${food.nutrients}，${food.mechanism}\n`;
    });

    return response;
  }

  // 生成今日饮食建议
  generateDailyNutritionAdvice(userContext = {}) {
    const emotion = userContext.recentEmotion;
    const caloriesTarget = userContext.targetCalories || 2000;
    
    let response = `🍽️ **今日饮食建议**\n\n`;
    
    // 根据情绪调整建议
    if (emotion) {
      const foodRecommendation = this.recommendFoodsForEmotion(emotion);
      if (foodRecommendation) {
        response += foodRecommendation + '\n';
      }
    }

    // 正念饮食提醒
    response += `\n🧘 **正念饮食提醒**：\n`;
    response += `• 餐前：先觉察，是真的饿了吗？\n`;
    response += `• 餐中：细嚼慢咽，感受味道\n`;
    response += `• 餐后：感恩，不评判\n\n`;

    // 营养平衡原则
    response += `**每餐搭配原则**：\n`;
    response += `• 一拳头主食（优选全谷物）\n`;
    response += `• 一掌心蛋白质（肉/鱼/蛋/豆）\n`;
    response += `• 两拳头蔬菜（彩虹色）\n`;
    response += `• 一拇指健康脂肪（坚果/橄榄油）\n\n`;

    response += `需要我帮你记录这餐食物，或者推荐具体食谱吗？`;

    return response;
  }

  // 处理"我吃多了/暴食了"
  handlePostBinge(userMessage, userContext = {}) {
    let response = '';

    // 第一步：停止自责
    response += `先停下来。\n\n`;
    response += `暴食后的自责，可能比暴食本身更伤身体。\n`;
    response += `一次进食不会毁掉你的健康，但持续的自我攻击会。\n\n`;

    // 第二步：好奇而非评判
    response += `**试着好奇，而非评判**：\n`;
    response += `• 吃东西之前，发生了什么？\n`;
    response += `• 是身体饿了，还是情绪需要被安抚？\n`;
    response += `• 食物给了你什么，是别的东西给不了的？\n\n`;

    // 第三步：具体发生了什么
    response += `**这次暴食可能告诉你**：\n`;
    
    const hour = new Date().getHours();
    if (hour >= 21 || hour <= 6) {
      response += `• 深夜时段意志力最低，情绪性饮食高发\n`;
    }
    if (userContext.recentEmotion) {
      response += `• 情绪触发：${userContext.recentEmotion}\n`;
    }
    if (userContext.hoursSinceLastMeal > 5) {
      response += `• 过度饥饿导致失控\n`;
    }
    response += `• 限制性饮食后的反弹\n\n`;

    // 第四步：下一步怎么做
    response += `**现在可以做的**：\n`;
    response += `1. 喝一杯温水，深呼吸\n`;
    response += `2. 写下刚才的情绪（不用发给任何人）\n`;
    response += `3. 散散步，帮助消化和情绪\n`;
    response += `4. 下一餐正常吃，不要补偿性节食\n`;
    response += `5. 今晚好好睡觉\n\n`;

    // 第五步：长期视角
    response += `**记住**：\n`;
    response += `• 建立和食物的健康关系需要时间\n`;
    response += `• 一次 setbacks 不等于失败\n`;
    response += `• 我在这里，陪你一步步来\n\n`;

    response += `明天是新的一天。你仍然是值得被善待的。`;

    return response;
  }

  // 生成地中海饮食指南
  generateMediterraneanGuide() {
    return `🫒 **地中海饮食模式**\n\n` +
           `被证实可以：\n` +
           `• 降低心血管风险30%\n` +
           `• 降低认知衰退风险20%\n` +
           `• 降低2型糖尿病风险23%\n\n` +
           `**核心组成**：\n` +
           `• 橄榄油为主要脂肪来源\n` +
           `• 大量蔬果、全谷物、豆类\n` +
           `• 适量鱼类、禽肉\n` +
           `• 限制红肉、加工食品\n` +
           `• 适量红酒（可选）\n\n` +
           `**今日尝试**：用橄榄油代替其他油，多吃一份蔬菜。`;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NutritionExpert;
}
