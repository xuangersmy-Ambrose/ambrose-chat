/**
 * AMBROSE Fitness Expert v2.0
 * 健身专家模块 - 情绪感知的智能运动指导
 * 
 * 核心升级：
 * 1. 情绪-运动匹配算法
 * 2. Blue Zones运动哲学整合
 * 3. 身心周期化训练
 * 4. 情感支持型反馈
 */

class FitnessExpert {
  constructor(companionCore) {
    this.companion = companionCore;
    
    // 情绪-运动匹配矩阵
    this.emotionExerciseMatrix = {
      anxious: {
        recommended: ['rhythmic_cardio', 'swimming', 'cycling', 'running'],
        avoid: ['high_intensity', 'competitive'],
        mechanism: '节奏性有氧激活副交感神经，降低皮质醇',
        duration: '20-30分钟中等强度',
        note: '专注于呼吸节奏，让思绪随动作流动'
      },
      sad: {
        recommended: ['strength_training', 'weightlifting', 'resistance'],
        avoid: ['isolated_cardio', 'long_duration'],
        mechanism: '力量训练促进内啡肽和多巴胺释放',
        duration: '30-40分钟，组间充分休息',
        note: '感受肌肉收缩，用身体的力量感对抗低落'
      },
      angry: {
        recommended: ['boxing', 'hiit', 'sprinting', 'heavy_lifting'],
        avoid: ['slow_yoga', 'meditation'],
        mechanism: '高强度运动释放肾上腺素，转化愤怒为能量',
        duration: '20-30分钟高强度',
        note: '把愤怒转化为每一次出拳、每一次冲刺'
      },
      tired: {
        recommended: ['walking', 'stretching', 'tai_chi', 'gentle_yoga'],
        avoid: ['high_intensity', 'long_duration', 'competitive'],
        mechanism: '轻度活动促进血液循环，比静止更能恢复精力',
        duration: '10-20分钟轻度活动',
        note: '这不是训练，是给身体的温柔问候'
      },
      lonely: {
        recommended: ['group_class', 'team_sport', 'partner_workout', 'running_club'],
        avoid: ['solo_gym', 'isolated_cardio'],
        mechanism: '社交性运动满足归属感需求',
        duration: '根据活动类型',
        note: '在人群中感受连接，哪怕只是微笑点头'
      },
      stressed: {
        recommended: ['yoga', 'pilates', 'nature_walk', 'swimming'],
        avoid: ['competitive_sport', 'high_pressure'],
        mechanism: '身心整合运动降低交感神经兴奋',
        duration: '30-45分钟',
        note: '把注意力放在呼吸和身体感受上'
      },
      happy: {
        recommended: ['any', 'dance', 'outdoor_activity', 'try_new'],
        avoid: [],
        mechanism: '好心情时尝试新运动，建立积极关联',
        duration: '随心所欲',
        note: '享受运动本身，不为数据而做'
      }
    };

    // Blue Zones运动哲学
    this.blueZonesPrinciples = {
      natural_movement: '将运动融入日常生活，而非"专门锻炼"',
      social_exercise: '优先选择社交性运动',
      purpose_driven: '为健康而运动，而非惩罚',
      enjoyment_first: '享受过程比结果重要',
      outdoor_priority: '户外活动优先于室内',
      low_intensity_sustainable: '低强度可持续 > 高强度不可持续'
    };

    // 身心周期化模型
    this.holisticPeriodization = {
      high_energy: {
        physical: '力量训练 / 高强度有氧',
        mental: '专注当下，享受挑战',
        emotional: '庆祝身体的能力'
      },
      medium_energy: {
        physical: '中等强度有氧 / 功能性训练',
        mental: '保持节奏，不强迫自己',
        emotional: '接纳今天的状态'
      },
      low_energy: {
        physical: '散步 / 拉伸 / 休息',
        mental: '放下"应该"，允许休息',
        emotional: '对自己温柔'
      },
      recovery: {
        physical: '主动恢复 / 睡眠优先',
        mental: '感谢身体的付出',
        emotional: '恢复也是训练的一部分'
      }
    };
  }

  /**
   * 根据情绪状态推荐运动
   */
  recommendExercise(emotionState, userContext = {}) {
    const matrix = this.emotionExerciseMatrix[emotionState] || this.emotionExerciseMatrix.tired;
    
    // 考虑用户偏好和历史
    const personalized = this.personalizeRecommendation(matrix, userContext);
    
    return {
      primary: personalized.recommended[0],
      alternatives: personalized.recommended.slice(1, 3),
      avoid: personalized.avoid,
      rationale: personalized.mechanism,
      duration: personalized.duration,
      mindset: personalized.note,
      blueZonesAlignment: this.alignWithBlueZones(personalized)
    };
  }

  personalizeRecommendation(matrix, userContext) {
    // 简化的个性化逻辑
    return matrix;
  }

  alignWithBlueZones(recommendation) {
    const alignments = [];
    
    if (recommendation.recommended.some(r => r.includes('outdoor') || r.includes('nature'))) {
      alignments.push(this.blueZonesPrinciples.outdoor_priority);
    }
    
    if (recommendation.recommended.some(r => r.includes('group') || r.includes('team'))) {
      alignments.push(this.blueZonesPrinciples.social_exercise);
    }
    
    return alignments;
  }

  /**
   * 生成情感支持型运动建议
   */
  generateSupportiveExerciseAdvice(emotionState, exerciseData = {}) {
    const advice = this.recommendExercise(emotionState);
    
    const templates = {
      anxious: {
        opening: '焦虑的时候，身体往往紧绷着。',
        recommendation: `${advice.rationale}\n\n试试${advice.primary}，${advice.duration}。`,
        mindset: advice.mindset,
        closing: '不用追求速度和距离，让呼吸带你进入节奏。'
      },
      sad: {
        opening: '低落的时候，动一动身体往往比躺着舒服。',
        recommendation: `${advice.rationale}\n\n推荐${advice.primary}，${advice.duration}。`,
        mindset: advice.mindset,
        closing: '不需要打破纪录，只需要感受身体的力量。'
      },
      angry: {
        opening: '愤怒是有能量的，与其压抑，不如转化。',
        recommendation: `${advice.rationale}\n\n去${advice.primary}，${advice.duration}。`,
        mindset: advice.mindset,
        closing: '让汗水带走怒火，剩下平静。'
      },
      tired: {
        opening: '累了就承认，今天不逼自己。',
        recommendation: '如果还有一点点力气，出去走10分钟。',
        mindset: '散步比躺着更能恢复精神。',
        closing: '这不是训练，是给身体的温柔。'
      },
      stressed: {
        opening: '压力堆积在身体里，需要释放。',
        recommendation: `${advice.rationale}\n\n试试${advice.primary}，${advice.duration}。`,
        mindset: advice.mindset,
        closing: '把注意力从脑子里移到身体上。'
      }
    };

    const template = templates[emotionState] || templates.tired;
    
    return `${template.opening}

${template.recommendation}

💭 ${template.mindset}

${template.closing}`;
  }

  /**
   * 生成周期化训练计划 (整合身心状态)
   */
  generateHolisticPlan(userData, emotionalTrend) {
    const { energyLevel, stressLevel, sleepQuality } = userData;
    
    // 确定当前周期阶段
    let phase = 'medium_energy';
    if (energyLevel >= 8 && stressLevel <= 3) phase = 'high_energy';
    else if (energyLevel >= 5 && stressLevel <= 5) phase = 'medium_energy';
    else if (energyLevel >= 3) phase = 'low_energy';
    else phase = 'recovery';

    const plan = this.holisticPeriodization[phase];
    
    return {
      phase,
      physicalFocus: plan.physical,
      mentalFocus: plan.mental,
      emotionalFocus: plan.emotional,
      weeklyStructure: this.generateWeeklyStructure(phase),
      mindset: '这一周，身体需要什么，就给它什么。'
    };
  }

  generateWeeklyStructure(phase) {
    const structures = {
      high_energy: [
        { day: '周一', focus: '力量训练', emotion: '启动一周的能量' },
        { day: '周二', focus: '有氧', emotion: '享受心率提升' },
        { day: '周三', focus: '主动恢复', emotion: '感谢身体' },
        { day: '周四', focus: '力量训练', emotion: '挑战自己' },
        { day: '周五', focus: '有氧/趣味运动', emotion: '庆祝一周' },
        { day: '周末', focus: '户外活动', emotion: '享受自然' }
      ],
      medium_energy: [
        { day: '周一', focus: '中等强度训练', emotion: '温和启动' },
        { day: '周二', focus: '散步/瑜伽', emotion: '保持流动' },
        { day: '周三', focus: '休息', emotion: '允许停顿' },
        { day: '周四', focus: '中等强度训练', emotion: '找回节奏' },
        { day: '周五', focus: '轻松活动', emotion: '减压' },
        { day: '周末', focus: '随意', emotion: '跟随感觉' }
      ],
      low_energy: [
        { day: '周一', focus: '10分钟散步', emotion: '最小的开始' },
        { day: '周二', focus: '拉伸', emotion: '温柔对待' },
        { day: '周三', focus: '休息', emotion: '完全接纳' },
        { day: '周四', focus: '散步', emotion: '如果有力气' },
        { day: '周五', focus: '休息或轻微活动', emotion: '不强迫' },
        { day: '周末', focus: '自然光', emotion: '只是出门走走' }
      ],
      recovery: [
        { day: '每天', focus: '睡眠优先', emotion: '恢复是训练' },
        { day: '可选', focus: '散步/拉伸', emotion: '如果有余力' }
      ]
    };

    return structures[phase];
  }

  /**
   * 生成运动后的情感反馈
   */
  generatePostWorkoutFeedback(workoutData, emotionBefore, emotionAfter) {
    const improvements = {
      anxious: '焦虑感减轻了，身体帮你释放了压力',
      sad: '多巴胺在流动，心情有没有好一点？',
      angry: '怒火转化成了能量，现在感觉如何？',
      tired: '动起来反而有精神了，对吧？',
      stressed: '交感神经平静下来了，呼吸更顺畅了'
    };

    const celebrations = [
      '你做到了，哪怕只是开始。',
      '身体感谢你的付出。',
      '这一刻，你在投资未来的自己。',
      '运动的回报，不只是身体上的。'
    ];

    let feedback = '';

    // 如果情绪改善
    if (emotionAfter && emotionBefore && emotionAfter.valence > emotionBefore.valence) {
      feedback += improvements[emotionBefore.name] || '运动后的你，感觉不一样了吧？';
      feedback += '\n\n';
    }

    // 庆祝完成
    feedback += celebrations[Math.floor(Math.random() * celebrations.length)];

    // 根据关系阶段添加
    if (this.companion && this.companion.relationshipStage === 'deep_bond') {
      feedback += '\n\n我为你骄傲。❤️‍🔥';
    }

    return feedback;
  }

  /**
   * 生成Blue Zones风格的日常活动建议
   */
  generateBlueZonesDailyMovement() {
    const suggestions = [
      { activity: '每30分钟起身走动', context: '久坐是健康杀手，不需要剧烈运动，只需要移动' },
      { activity: '走楼梯而不是电梯', context: '自然的阻力训练，融入生活' },
      { activity: '午饭后散步10分钟', context: '帮助血糖稳定，消化更好' },
      { activity: '站着打电话', context: '微小的改变，累积成大不同' },
      { activity: '周末去公园', context: '户外活动 + 自然光 + 绿色疗愈' },
      { activity: '和朋友一起运动', context: '社交连接是Blue Zones的长寿秘诀' }
    ];

    const today = new Date().getDay();
    return suggestions[today % suggestions.length];
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FitnessExpert;
}
