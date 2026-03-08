/**
 * AMBROSE Fitness Expert v2.0
 * 健身专家模块 - 情绪感知运动处方系统
 * 
 * 核心理念：运动不仅是身体的训练，更是情绪的调节
 * 科学依据：ACSM运动处方 + Blue Zones运动哲学 + 运动心理学
 */

class FitnessExpert {
  constructor() {
    this.exerciseDatabase = this.loadExerciseDatabase();
    this.emotionExerciseMap = this.createEmotionExerciseMap();
    this.userFitnessProfile = this.loadUserProfile();
  }

  // 加载运动数据库
  loadExerciseDatabase() {
    return {
      // 节奏性有氧 - 适合焦虑、高压
      rhythmic_cardio: {
        name: '节奏性有氧',
        description: '规律、重复的身体运动，帮助神经系统恢复平衡',
        exercises: [
          { name: '慢跑', intensity: 'moderate', duration: '20-30min', calories: 200-300 },
          { name: '游泳', intensity: 'moderate', duration: '20-30min', calories: 250-350 },
          { name: '骑行', intensity: 'moderate', duration: '30-45min', calories: 250-400 },
          { name: '跳绳', intensity: 'moderate-high', duration: '15-20min', calories: 200-300 },
          { name: '快走', intensity: 'low-moderate', duration: '30-45min', calories: 150-250 }
        ],
        benefits: [
          '降低皮质醇水平，缓解焦虑',
          '提升脑源性神经营养因子(BDNF)',
          '改善心率变异性(HRV)',
          '产生冥想般的专注状态(flow)'
        ],
        best_for: ['anxiety', 'stress', 'overwhelm', 'restlessness']
      },

      // 力量训练 - 适合低落、无力感
      strength_training: {
        name: '力量训练',
        description: '对抗阻力的训练，释放内啡肽，建立掌控感',
        exercises: [
          { name: '哑铃训练', intensity: 'moderate', duration: '30-40min', focus: '全身' },
          { name: '自重训练', intensity: 'moderate', duration: '20-30min', focus: '核心+上肢' },
          { name: '阻力带训练', intensity: 'low-moderate', duration: '25-35min', focus: '全身' },
          { name: '壶铃训练', intensity: 'moderate-high', duration: '20-25min', focus: '爆发力' },
          { name: '健身房器械', intensity: 'customizable', duration: '40-50min', focus: '分部位' }
        ],
        benefits: [
          '刺激内啡肽和内源性大麻素释放',
          '提升睾酮水平，改善情绪',
          '建立身体掌控感和力量感',
          '长期改善自尊和身体形象'
        ],
        best_for: ['sadness', 'low_energy', 'powerlessness', 'depression']
      },

      // 身心运动 - 适合高压、紧绷、疲惫
      mind_body: {
        name: '身心运动',
        description: '结合呼吸、觉察和轻柔动作，激活副交感神经系统',
        exercises: [
          { name: '瑜伽', intensity: 'low', duration: '30-60min', style: 'Hatha/Restorative' },
          { name: '太极', intensity: 'low', duration: '20-40min', style: '传统/简化' },
          { name: '普拉提', intensity: 'low-moderate', duration: '30-45min', focus: '核心控制' },
          { name: '拉伸放松', intensity: 'very_low', duration: '15-20min', focus: '全身放松' },
          { name: '呼吸冥想', intensity: 'minimal', duration: '10-20min', focus: '正念' }
        ],
        benefits: [
          '激活副交感神经，降低应激反应',
          '改善身体觉察和本体感觉',
          '降低肌肉紧张度',
          '培养当下的专注和平静'
        ],
        best_for: ['high_stress', 'physical_tension', 'burnout', 'exhaustion', 'insomnia']
      },

      // 高强度间歇 - 适合愤怒、挫败、需要释放
      hiit: {
        name: '高强度间歇训练(HIIT)',
        description: '短时间高强度爆发，释放积压能量',
        exercises: [
          { name: '搏击操', intensity: 'high', duration: '20-30min', style: 'Boxing/Kickboxing' },
          { name: 'Tabata', intensity: 'very_high', duration: '4-20min', intervals: '20s on/10s off' },
          { name: '冲刺间歇', intensity: 'high', duration: '15-25min', style: '跑步/单车' },
          { name: '功能性训练', intensity: 'high', duration: '25-35min', style: 'CrossFit风格' }
        ],
        benefits: [
          '快速释放肾上腺素和积压情绪',
          '产生显著的\'跑者高潮\'',
          '短时间内高效燃脂',
          '建立心理韧性和抗压能力'
        ],
        best_for: ['anger', 'frustration', 'irritation', 'pent_up_energy']
      },

      // 轻度活动 - 适合疲劳、恢复、Blue Zones风格
      light_activity: {
        name: '轻度活动',
        description: 'Blue Zones式的日常活动，融入生活',
        exercises: [
          { name: '散步', intensity: 'very_low', duration: '20-40min', style: '户外/自然' },
          { name: '园艺', intensity: 'low', duration: '30-60min', style: '轻松劳作' },
          { name: '轻度家务', intensity: 'low', duration: '20-30min', style: '整理/清洁' },
          { name: '站立工作', intensity: 'minimal', duration: 'continuous', style: '中断久坐' },
          { name: '走动电话', intensity: 'minimal', duration: 'variable', style: '边打电话边走' }
        ],
        benefits: [
          '避免久坐危害，促进代谢',
          '自然融入日常生活',
          '适合恢复期和低能量日',
          '社交性活动(结伴散步)'
        ],
        best_for: ['fatigue', 'recovery', 'low_motivation', 'beginner', 'maintenance']
      },

      // 社交性运动 - 适合孤独、需要连接
      social_exercise: {
        name: '社交性运动',
        description: '与他人一起进行的运动，满足社交需求',
        exercises: [
          { name: '团体课程', intensity: 'variable', duration: '45-60min', style: 'Zumba/瑜伽课' },
          { name: '球类运动', intensity: 'moderate-high', duration: '60-90min', style: '篮球/羽毛球' },
          { name: '徒步小组', intensity: 'low-moderate', duration: '2-4hours', style: '自然探索' },
          { name: '跑步俱乐部', intensity: 'moderate', duration: '30-60min', style: '结伴跑步' },
          { name: '舞蹈课', intensity: 'moderate', duration: '45-60min', style: '社交舞/街舞' }
        ],
        benefits: [
          '满足社交连接需求',
          '互相激励，提高依从性',
          '增加运动乐趣',
          '建立支持性社群'
        ],
        best_for: ['loneliness', 'lack_of_motivation', 'boredom', 'accountability']
      }
    };
  }

  // 创建情绪-运动映射表
  createEmotionExerciseMap() {
    return {
      // 焦虑谱系
      'anxiety': { category: 'rhythmic_cardio', reason: '规律运动帮助神经系统恢复平衡' },
      'worried': { category: 'rhythmic_cardio', reason: '重复性动作有冥想效果' },
      'stressed': { category: 'mind_body', reason: '需要激活副交感神经' },
      'restless': { category: 'rhythmic_cardio', reason: '释放多余能量，获得平静' },
      
      // 低落谱系
      'sadness': { category: 'strength_training', reason: '内啡肽释放提升情绪' },
      'depressed': { category: 'strength_training', reason: '建立身体掌控感' },
      'low_energy': { category: 'light_activity', reason: '温和活动唤醒身体' },
      'powerless': { category: 'strength_training', reason: '力量训练重建掌控感' },
      
      // 高压谱系
      'overwhelmed': { category: 'mind_body', reason: '需要暂停和恢复' },
      'burnout': { category: 'light_activity', reason: '避免进一步消耗' },
      'exhausted': { category: 'mind_body', reason: '身心都需要修复' },
      'tension': { category: 'mind_body', reason: '释放身体紧绷' },
      
      // 愤怒谱系
      'anger': { category: 'hiit', reason: '安全释放攻击性' },
      'frustration': { category: 'hiit', reason: '转化挫折感为能量' },
      'irritation': { category: 'hiit', reason: '快速释放积压情绪' },
      
      // 孤独谱系
      'loneliness': { category: 'social_exercise', reason: '满足社交连接需求' },
      'isolation': { category: 'social_exercise', reason: '与他人建立联系' },
      
      // 疲劳谱系
      'fatigue': { category: 'light_activity', reason: '恢复性活动' },
      'tired': { category: 'light_activity', reason: '避免过度训练' },
      
      // 积极状态
      'joy': { category: 'social_exercise', reason: '分享快乐，增强连接' },
      'energy': { category: 'strength_training', reason: '利用高能量提升力量' },
      'motivated': { category: 'hiit', reason: '利用动力挑战高强度' }
    };
  }

  // 根据情绪生成运动建议
  generateEmotionBasedRecommendation(emotion, intensity = 'moderate', userContext = {}) {
    const mapping = this.emotionExerciseMap[emotion.toLowerCase()];
    
    if (!mapping) {
      return this.generateDefaultRecommendation(userContext);
    }

    const category = this.exerciseDatabase[mapping.category];
    const suitableExercises = category.exercises.filter(ex => {
      // 根据用户体能水平筛选
      if (userContext.fitnessLevel === 'beginner') {
        return ex.intensity.includes('low') || ex.intensity === 'minimal';
      }
      if (userContext.fitnessLevel === 'advanced') {
        return true;
      }
      return ex.intensity !== 'very_high'; // 默认排除极高强度
    });

    const selectedExercise = suitableExercises[Math.floor(Math.random() * suitableExercises.length)];
    
    return {
      category: category.name,
      exercise: selectedExercise,
      reason: mapping.reason,
      benefits: category.benefits,
      approach: this.generateGentleApproach(emotion, selectedExercise),
      alternatives: suitableExercises.filter(ex => ex.name !== selectedExercise.name).slice(0, 2)
    };
  }

  // 生成温和的建议方式
  generateGentleApproach(emotion, exercise) {
    const approaches = {
      anxiety: [
        `现在不想动也没关系，可以先从深呼吸开始。`,
        `不用强迫自己，等身体准备好。`,
        `哪怕只是5分钟，也比不开始好。`
      ],
      sadness: [
        `力量训练可能帮你找回一些掌控感，但如果今天不想，也没关系。`,
        `身体动起来，心情往往也会跟着动起来。`,
        `哪怕只做一组，也是胜利。`
      ],
      anger: [
        `把情绪转化为能量，会感觉好一些。`,
        `用力挥洒，然后放下。`,
        `安全地释放，然后恢复平静。`
      ],
      fatigue: [
        `今天就只是散步，也很好。`,
        `听听身体需要什么，不是每天都得全力以赴。`,
        `恢复也是一种训练。`
      ],
      stress: [
        `瑜伽会教你呼吸，呼吸会带你平静。`,
        `给自己这个暂停的时间。`,
        `拉伸的时候，把紧绷的也一起释放。`
      ]
    };

    const defaultApproaches = [
      `想动的时候，${exercise.name}是个不错的选择。`,
      `不用急着做决定，先感受一下身体。`,
      `无论做什么，记得这是为了照顾好自己。`
    ];

    const emotionApproaches = approaches[emotion.toLowerCase()] || defaultApproaches;
    return emotionApproaches[Math.floor(Math.random() * emotionApproaches.length)];
  }

  // 生成默认推荐
  generateDefaultRecommendation(userContext) {
    const defaults = this.exerciseDatabase.light_activity;
    return {
      category: defaults.name,
      exercise: defaults.exercises[0],
      reason: '日常活动是健康的基础',
      benefits: defaults.benefits,
      approach: '今天想动一动吗？哪怕只是散步也很好。',
      alternatives: defaults.exercises.slice(1, 3)
    };
  }

  // 生成完整的运动建议回复
  generateResponse(emotionData, userContext = {}) {
    const recommendation = this.generateEmotionBasedRecommendation(
      emotionData.emotion,
      emotionData.intensity,
      userContext
    );

    let response = `根据你现在的状态，我建议尝试**${recommendation.category}**，具体是**${recommendation.exercise.name}**。\n\n`;
    
    response += `${recommendation.approach}\n\n`;
    response += `**为什么推荐这个**：${recommendation.reason}\n\n`;
    
    response += `**你可以期待的好处**：\n`;
    recommendation.benefits.slice(0, 3).forEach(benefit => {
      response += `• ${benefit}\n`;
    });
    response += '\n';

    if (recommendation.alternatives.length > 0) {
      response += `**其他选择**：${recommendation.alternatives.map(a => a.name).join('、')}\n\n`;
    }

    response += `**今日计划**：\n`;
    response += `• 运动：${recommendation.exercise.name}\n`;
    response += `• 时长：${recommendation.exercise.duration}\n`;
    response += `• 强度：${recommendation.exercise.intensity}\n\n`;

    response += `现在感觉怎么样，想动一动吗？还是只是聊聊也行。`;

    return response;
  }

  // Blue Zones风格运动建议
  generateBlueZonesRecommendation() {
    const blueZonesPrinciples = [
      '将运动融入日常生活，不依赖健身房',
      '选择你享受的、能长期坚持的活动',
      '与亲友一起运动，增加社交性',
      '在自然环境中运动，获得额外益处',
      '建立规律，但也要灵活调整'
    ];

    const dailyActivities = [
      '每工作1小时起身走动5分钟',
      '走楼梯而不是电梯',
      '饭后散步15-20分钟',
      '站着打电话，走动思考',
      '周末安排户外活动'
    ];

    let response = '🌿 **Blue Zones运动哲学**\n\n';
    response += '长寿区域的人不"健身"，他们把运动融入生活：\n\n';
    
    blueZonesPrinciples.forEach((principle, i) => {
      response += `${i + 1}. ${principle}\n`;
    });
    
    response += '\n**今天的微运动**：\n';
    dailyActivities.forEach(activity => {
      response += `• ${activity}\n`;
    });

    return response;
  }

  // 生成周期化训练计划
  generatePeriodizedPlan(phase = 'general', userContext = {}) {
    const phases = {
      foundation: {
        name: '基础期',
        duration: '4-8周',
        focus: '动作模式、恢复能力',
        frequency: '3-4次/周',
        intensity: '60-70% 最大心率'
      },
      development: {
        name: '发展期',
        duration: '4-6周',
        focus: '力量/耐力提升',
        frequency: '4-5次/周',
        intensity: '70-80% 最大心率'
      },
      peak: {
        name: '巅峰期',
        duration: '2-4周',
        focus: '强度表达',
        frequency: '3-4次/周',
        intensity: '80-90% 最大心率'
      },
      recovery: {
        name: '恢复期',
        duration: '1-2周',
        focus: '主动恢复',
        frequency: '2-3次/周',
        intensity: '<50% 最大心率'
      }
    };

    const selectedPhase = phases[phase] || phases.foundation;
    
    return {
      ...selectedPhase,
      weeklyStructure: this.generateWeeklyStructure(selectedPhase),
      emotionConsiderations: '根据每日情绪状态调整，疲劳时减量，精力充沛时挑战'
    };
  }

  generateWeeklyStructure(phase) {
    return [
      { day: '周一', focus: '全身力量', type: 'strength' },
      { day: '周二', focus: '有氧+柔韧', type: 'cardio_flexibility' },
      { day: '周三', focus: '休息/轻度活动', type: 'recovery' },
      { day: '周四', focus: '上肢力量', type: 'strength' },
      { day: '周五', focus: '有氧间歇', type: 'hiit' },
      { day: '周六', focus: '户外活动', type: 'outdoor' },
      { day: '周日', focus: '完全休息/瑜伽', type: 'rest' }
    ];
  }

  // 加载用户健身档案
  loadUserProfile() {
    try {
      return JSON.parse(localStorage.getItem('ambrose_fitness_profile')) || {
        fitnessLevel: 'beginner',
        preferredActivities: [],
        limitations: [],
        goals: [],
        weeklySchedule: {}
      };
    } catch {
      return {
        fitnessLevel: 'beginner',
        preferredActivities: [],
        limitations: [],
        goals: [],
        weeklySchedule: {}
      };
    }
  }

  // 保存用户档案
  saveUserProfile(profile) {
    localStorage.setItem('ambrose_fitness_profile', JSON.stringify(profile));
  }

  // 更新用户偏好
  updatePreference(key, value) {
    this.userFitnessProfile[key] = value;
    this.saveUserProfile(this.userFitnessProfile);
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FitnessExpert;
}
