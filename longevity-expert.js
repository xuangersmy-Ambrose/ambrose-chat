/**
 * AMBROSE Longevity Expert v2.0
 * 养生专家模块 - Blue Zones日常仪式与压力管理
 * 
 * 核心理念：长寿不是目标，每一天的生命质量才是
 * 科学依据：Blue Zones研究 + Cell衰老十二标志 + 压力生理学
 */

class LongevityExpert {
  constructor() {
    this.ritualDatabase = this.loadRitualDatabase();
    this.blueZonesPrinciples = this.loadBlueZonesPrinciples();
    this.stressReliefTechniques = this.loadStressReliefTechniques();
  }

  // 加载仪式数据库
  loadRitualDatabase() {
    return {
      morning: {
        name: '晨间仪式',
        purpose: '设定一天的基调，激活身体与心灵',
        duration: '15-30分钟',
        rituals: [
          {
            name: '阳光暴露',
            action: '起床后30分钟内接触自然光',
            duration: '10-15分钟',
            benefit: '重置昼夜节律，抑制褪黑素，提升皮质醇(适度)',
            science: '光线通过视网膜刺激视交叉上核，调节生物钟'
          },
          {
            name: '感恩练习',
            action: '写下或默念3件感恩的事',
            duration: '2-3分钟',
            benefit: '提升积极情绪，降低压力激素',
            science: ' gratitude practice激活前额叶皮层，改善情绪调节'
          },
          {
            name: '轻柔活动',
            action: '伸展、瑜伽或散步',
            duration: '5-10分钟',
            benefit: '唤醒身体，促进血液循环',
            science: '温和运动激活副交感神经，避免早晨皮质醇 spike'
          },
          {
            name: '深呼吸',
            action: '4-7-8呼吸法或盒式呼吸',
            duration: '2-3分钟',
            benefit: '平静神经系统，设定平静基调',
            science: '延长呼气激活副交感神经，降低心率'
          },
          {
            name: '营养早餐',
            action: '蛋白质+健康脂肪+复合碳水',
            duration: '15分钟',
            benefit: '稳定血糖，提供持续能量',
            science: '蛋白质促进酪氨酸，支持多巴胺合成'
          }
        ]
      },

      midday: {
        name: '日间微仪式',
        purpose: '重置能量，管理压力，保持专注',
        duration: '5-10分钟/次',
        rituals: [
          {
            name: '每小时微休息',
            action: '每工作1小时，起身活动5分钟',
            frequency: '每小时',
            benefit: '打破久坐，恢复专注',
            science: '短暂休息恢复前额叶皮层功能，提升认知表现'
          },
          {
            name: '水分补充仪式',
            action: '每小时喝一杯水',
            frequency: '每小时',
            benefit: '维持水分平衡，支持代谢',
            cue: '设置每小时提醒或使用水瓶'
          },
          {
            name: '午间正念',
            action: '午餐后10分钟冥想或散步',
            duration: '10分钟',
            benefit: '消化支持，下午能量管理',
            science: '饭后轻度活动改善血糖反应，冥想降低皮质醇'
          },
          {
            name: '自然接触',
            action: '看窗外绿树或短时间户外活动',
            duration: '5分钟',
            benefit: '注意力恢复，压力降低',
            science: '自然环境激活副交感神经，促进恢复'
          },
          {
            name: '社交连接',
            action: '与同事/朋友简短交流',
            duration: '5分钟',
            benefit: '满足社交需求，情绪支持',
            science: '社交连接激活催产素，降低压力'
          }
        ]
      },

      evening: {
        name: '晚间仪式',
        purpose: '释放一天压力，准备高质量睡眠',
        duration: '30-60分钟',
        rituals: [
          {
            name: '数字排毒',
            action: '睡前1小时停止使用电子设备',
            start_time: '21:30',
            benefit: '减少蓝光暴露，促进褪黑素分泌',
            science: '蓝光抑制褪黑素合成，延迟入睡'
          },
          {
            name: '环境调暗',
            action: '调暗室内灯光，使用暖光',
            start_time: '21:00',
            benefit: '向身体发送睡眠信号',
            science: '暗环境促进褪黑素分泌'
          },
          {
            name: '放松活动',
            action: '阅读、拉伸、冥想、温水澡',
            duration: '20-30分钟',
            benefit: '激活副交感神经，准备入睡',
            science: '核心体温下降促进睡眠，放松降低皮质醇'
          },
          {
            name: '感恩回顾',
            action: '回顾今天3件好事',
            duration: '5分钟',
            benefit: '积极情绪，平静心态入睡',
            science: '积极回顾改善睡眠质量，减少 rumination'
          },
          {
            name: '固定就寝',
            action: '每天同一时间上床',
            target_time: '23:00',
            benefit: '稳定昼夜节律',
            science: '规律性是最强的时间线索'
          }
        ]
      },

      special: {
        name: '特殊时刻仪式',
        rituals: [
          {
            name: '压力时刻暂停',
            trigger: '感到 overwhelm 时',
            action: 'STOP技术：Stop停→Take breath呼吸→Observe观察→Proceed继续',
            duration: '2分钟',
            benefit: '打破自动化反应，恢复理性'
          },
          {
            name: '情绪释放仪式',
            trigger: '强烈情绪积压',
            action: '情绪日记或大声说出来',
            duration: '10-15分钟',
            benefit: '情绪外化，避免内化伤害',
            science: '情绪命名降低杏仁核活动'
          },
          {
            name: '周日重置',
            trigger: '每周日',
            action: '回顾一周，计划下周，完全休息',
            duration: '半天',
            benefit: '心理闭合，恢复能量',
            science: '心理分离恢复 prevents burnout'
          }
        ]
      }
    };
  }

  // Blue Zones九大原则
  loadBlueZonesPrinciples() {
    return {
      movement: {
        principle: '自然运动',
        description: '把运动融入日常生活，不依赖健身房',
        practices: [
          '走楼梯而不是电梯',
          '步行或骑车通勤',
          '园艺和家务',
          '与朋友散步而不是坐着喝咖啡'
        ]
      },
      purpose: {
        principle: '目标感',
        description: 'Ikigai - 每天早晨醒来的理由',
        practices: [
          '明确你的"为什么"',
          '将日常任务与更大目标连接',
          '定期反思生命的意义'
        ]
      },
      downshift: {
        principle: '压力释放',
        description: '日常仪式感来释放压力',
        practices: [
          '祷告或冥想',
          '午睡',
          '下午茶时光',
          '日落时分的仪式'
        ]
      },
      eighty_percent: {
        principle: '80%饱',
        description: '停止进食时还有20%的饥饿感',
        practices: [
          '餐前祷告或感恩',
          '用小碗小盘',
          '细嚼慢咽',
          '餐间不进食'
        ]
      },
      plant_slant: {
        principle: '植物为主',
        description: '豆类是长寿人群的基石',
        practices: [
          '每天食用豆类',
          '以蔬菜为中心',
          '限制肉类摄入',
          '坚果作为零食'
        ]
      },
      wine: {
        principle: '适度饮酒',
        description: '每天1-2杯，与食物和亲友共享',
        note: '不饮酒者不需要开始'
      },
      belong: {
        principle: '信仰参与',
        description: '参与宗教或灵性社区',
        practices: [
          '定期参加宗教/灵性聚会',
          '冥想或祷告练习',
          '参与社区服务'
        ]
      },
      loved_ones_first: {
        principle: '家庭优先',
        description: '将家人放在生活的中心',
        practices: [
          '多代同堂或保持密切联系',
          '共度优质时间',
          '支持家庭成员'
        ]
      },
      right_tribe: {
        principle: '正确社交圈',
        description: '与有健康行为的人交往',
        practices: [
          '选择积极的朋友',
          '建立互助小组',
          '远离负面关系'
        ]
      }
    };
  }

  // 压力释放技术
  loadStressReliefTechniques() {
    return {
      physiological: {
        category: '生理层面',
        techniques: [
          {
            name: '4-7-8呼吸法',
            steps: ['吸气4秒', '屏息7秒', '呼气8秒'],
            mechanism: '延长呼气激活副交感神经',
            when: '任何压力时刻'
          },
          {
            name: '盒式呼吸',
            steps: ['吸气4秒', '屏息4秒', '呼气4秒', '屏息4秒'],
            mechanism: '调节自主神经系统平衡',
            when: '需要冷静专注时'
          },
          {
            name: '渐进式肌肉放松',
            steps: ['收紧某肌群5秒', '突然放松', '感受对比'],
            mechanism: '释放身体紧张',
            when: '身体紧绷时'
          },
          {
            name: '冷水刺激',
            steps: ['冷水洗脸', '或冷水冲手腕'],
            mechanism: '激活潜水反射，降低心率',
            when: '急性焦虑或愤怒'
          }
        ]
      },

      psychological: {
        category: '心理层面',
        techniques: [
          {
            name: ' grounding 技术(5-4-3-2-1)',
            steps: ['说出5个看到的', '4个听到的', '3个触到的', '2个闻到的', '1个尝到的'],
            mechanism: '将注意力带回当下',
            when: '焦虑或解离时'
          },
          {
            name: '认知重构',
            steps: ['识别负面想法', '质疑证据', '寻找替代解释', '更平衡的视角'],
            mechanism: '改变压力反应的认知基础',
            when: '灾难化思维时'
          },
          {
            name: '正念冥想',
            steps: ['专注呼吸', '观察思绪不评判', '温柔地带回注意力'],
            mechanism: '培养觉察和接纳',
            when: '日常练习'
          },
          {
            name: '情绪命名',
            steps: ['识别情绪', '用语言表达', '接纳它的存在'],
            mechanism: '降低杏仁核活动',
            when: '强烈情绪时'
          }
        ]
      },

      behavioral: {
        category: '行为层面',
        techniques: [
          {
            name: '运动释放',
            options: ['快走', '跑步', '力量训练', '瑜伽'],
            mechanism: '代谢压力激素，释放内啡肽',
            when: '身体需要释放时'
          },
          {
            name: '自然接触',
            options: ['公园散步', '森林浴', '海边', '园艺'],
            mechanism: '自然环境恢复注意力，降低皮质醇',
            when: '精神疲劳时'
          },
          {
            name: '社交连接',
            options: ['与朋友聊天', '拥抱', '参加聚会'],
            mechanism: '催产素释放，对抗压力激素',
            when: '感到孤独或压力'
          },
          {
            name: '创造性活动',
            options: ['绘画', '音乐', '写作', '手工'],
            mechanism: '进入心流，暂时脱离压力',
            when: '需要转移注意力时'
          }
        ]
      }
    };
  }

  // 根据当前时间生成建议
  generateTimeBasedRitual() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 9) {
      return this.generateMorningRitual();
    } else if (hour >= 9 && hour < 17) {
      return this.generateMiddayRitual();
    } else if (hour >= 17 && hour < 22) {
      return this.generateEveningRitual();
    } else {
      return this.generateLateNightRitual();
    }
  }

  // 生成晨间仪式
  generateMorningRitual() {
    const morning = this.ritualDatabase.morning;
    
    let response = `🌅 **晨间仪式**\n\n`;
    response += `${morning.purpose}\n\n`;
    response += `**今日建议**（选择2-3项）：\n\n`;
    
    morning.rituals.forEach((ritual, i) => {
      response += `${i + 1}. **${ritual.name}** (${ritual.duration})\n`;
      response += `   ${ritual.action}\n`;
      response += `   💡 ${ritual.benefit}\n\n`;
    });

    response += `**小贴士**：不需要全部做，选择2-3个对你有意义的。\n`;
    response += `一致性比完美更重要。`;

    return response;
  }

  // 生成日间仪式
  generateMiddayRitual() {
    const midday = this.ritualDatabase.midday;
    
    let response = `☀️ **日间微仪式**\n\n`;
    response += `${midday.purpose}\n\n`;
    response += `**现在可以做的**：\n\n`;
    
    midday.rituals.forEach((ritual, i) => {
      response += `${i + 1}. **${ritual.name}**\n`;
      response += `   ${ritual.action} (${ritual.duration || ritual.frequency})\n`;
      response += `   💡 ${ritual.benefit}\n\n`;
    });

    return response;
  }

  // 生成晚间仪式
  generateEveningRitual() {
    const evening = this.ritualDatabase.evening;
    
    let response = `🌙 **晚间仪式**\n\n`;
    response += `${evening.purpose}\n\n`;
    response += `**今晚建议**：\n\n`;
    
    evening.rituals.forEach((ritual, i) => {
      response += `${i + 1}. **${ritual.name}**`;
      if (ritual.start_time) {
        response += ` (${ritual.start_time}开始)`;
      } else if (ritual.duration) {
        response += ` (${ritual.duration})`;
      }
      response += '\n';
      response += `   ${ritual.action}\n`;
      response += `   💡 ${ritual.benefit}\n\n`;
    });

    response += `**关键**：固定的就寝时间是最强的健康信号。\n`;
    response += `今晚打算几点睡？`;

    return response;
  }

  // 深夜/凌晨建议
  generateLateNightRitual() {
    return `🌙 **深夜时刻**\n\n` +
           `这么晚了，是睡不着还是不想睡？\n\n` +
           `**如果是睡不着**：\n` +
           `• 试试4-7-8呼吸法\n` +
           `• 写下脑中盘旋的想法，告诉大脑"明天再处理"\n` +
           `• 如果20分钟还没睡着，起床做点放松的事，有睡意再回床\n\n` +
           `**如果是不想睡**：\n` +
           `• 白天是不是属于自己的时间太少了？\n` +
           `• 熬夜是在补偿白天的缺失吗？\n` +
           `• 今晚先睡，明天我们聊聊怎么调整\n\n` +
           `无论如何，闭上眼睛休息也是好的。`;
  }

  // 生成Blue Zones指南
  generateBlueZonesGuide() {
    let response = `🌍 **Blue Zones 长寿秘诀**\n\n`;
    response += `全球最长寿的五个区域（Blue Zones）的人，\n`;
    response += `他们不刻意"养生"，但共享这些生活方式：\n\n`;

    Object.entries(this.blueZonesPrinciples).forEach(([key, principle], i) => {
      response += `${i + 1}. **${principle.principle}**\n`;
      response += `   ${principle.description}\n`;
      if (principle.practices) {
        response += `   💡 试试：${principle.practices[0]}\n`;
      }
      response += '\n';
    });

    response += `**今日选择一个实践**：\n`;
    response += `不需要全部做到，选一个开始。\n`;
    response += `一致性比强度更重要。`;

    return response;
  }

  // 生成压力释放指南
  generateStressReliefGuide(stressLevel = 'moderate') {
    let response = `🧘 **压力释放指南**\n\n`;
    
    // 生理技术
    response += `**生理层面** - 快速见效：\n`;
    this.stressReliefTechniques.physiological.techniques.forEach((tech, i) => {
      response += `${i + 1}. **${tech.name}**\n`;
      response += `   ${tech.steps.join(' → ')}\n`;
      response += `   💡 适合：${tech.when}\n\n`;
    });

    // 心理技术
    response += `**心理层面** - 长期建设：\n`;
    this.stressReliefTechniques.psychological.techniques.slice(0, 2).forEach((tech, i) => {
      response += `${i + 1}. **${tech.name}**\n`;
      response += `   ${tech.steps.join(' → ')}\n\n`;
    });

    // 行为技术
    response += `**行为层面** - 生活方式：\n`;
    this.stressReliefTechniques.behavioral.techniques.slice(0, 2).forEach((tech, i) => {
      response += `${i + 1}. **${tech.name}**：${tech.options.join('/')} \n`;
    });

    return response;
  }

  // 针对特定情绪生成养生建议
  generateEmotionBasedWellness(emotion) {
    const emotionRitualMap = {
      'anxiety': {
        ritual: '呼吸练习 + grounding技术',
        principle: 'downshift - 压力释放',
        food: '洋甘菊茶、香蕉',
        activity: '瑜伽、散步'
      },
      'sadness': {
        ritual: '感恩练习 + 社交连接',
        principle: 'right_tribe - 正确社交圈',
        food: '深色巧克力、坚果',
        activity: '户外散步、与朋友聊天'
      },
      'anger': {
        ritual: '冷水刺激 + 运动释放',
        principle: 'movement - 自然运动',
        food: '绿茶、柑橘',
        activity: '高强度运动、拳击'
      },
      'fatigue': {
        ritual: '充足睡眠 + 小憩',
        principle: 'eighty_percent - 适度',
        food: '复合碳水、蛋白质',
        activity: '轻度活动、恢复'
      },
      'stress': {
        ritual: '正念冥想 + 自然接触',
        principle: 'downshift - 压力释放',
        food: '绿茶、黑巧克力',
        activity: '森林浴、冥想'
      }
    };

    const ritual = emotionRitualMap[emotion];
    if (!ritual) return null;

    return `🌿 **针对${emotion}的养生建议**\n\n` +
           `**仪式**：${ritual.ritual}\n` +
           `**原则**：${ritual.principle}\n` +
           `**食物**：${ritual.food}\n` +
           `**活动**：${ritual.activity}\n\n` +
           `记住：情绪是信号，不是命令。你可以选择如何回应它。`;
  }

  // 生成今日仪式计划
  generateDailyRitualPlan() {
    const hour = new Date().getHours();
    
    let response = `📅 **今日仪式计划**\n\n`;
    
    if (hour < 9) {
      response += `**已完成**：\n`;
      response += `□ 晨间仪式\n\n`;
      response += `**接下来**：\n`;
      response += `☐ 日间微仪式（每小时）\n`;
      response += `☐ 晚间仪式（21:30开始）\n`;
    } else if (hour < 17) {
      response += `**已完成**：\n`;
      response += `✓ 晨间仪式\n\n`;
      response += `**现在**：\n`;
      response += `☐ 每小时微休息\n`;
      response += `☐ 水分补充\n\n`;
      response += `**今晚**：\n`;
      response += `☐ 数字排毒（21:30）\n`;
      response += `☐ 固定就寝（23:00）\n`;
    } else {
      response += `**已完成**：\n`;
      response += `✓ 晨间仪式\n`;
      response += `✓ 日间微仪式\n\n`;
      response += `**现在/今晚**：\n`;
      response += `☐ 数字排毒（21:30开始）\n`;
      response += `☐ 放松活动\n`;
      response += `☐ 感恩回顾\n`;
      response += `☐ 固定就寝（23:00）\n`;
    }

    response += '\n**记住**：仪式不是为了增加负担，\n';
    response += '而是为了创造属于你的节奏。';

    return response;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LongevityExpert;
}
