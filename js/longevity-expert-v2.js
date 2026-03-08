/**
 * AMBROSE Longevity Expert v2.0
 * 养生专家模块 - 生命质量提升与日常仪式
 * 
 * 核心升级：
 * 1. Blue Zones日常仪式设计
 * 2. 衰老科学的温和应用
 * 3. 压力管理系统
 * 4. 生命意义与目的感
 */

class LongevityExpert {
  constructor(companionCore) {
    this.companion = companionCore;
    
    // 日常仪式系统
    this.dailyRituals = {
      morning: {
        name: '晨间仪式',
        purpose: '温柔地唤醒身心，为一天定下基调',
        steps: [
          { action: '醒来不立即看手机', duration: '5分钟', benefit: '让神经系统自然唤醒' },
          { action: '拉开窗帘，让自然光进入', duration: '2分钟', benefit: '调节昼夜节律' },
          { action: '3次深呼吸', duration: '1分钟', benefit: '激活副交感神经' },
          { action: '喝一大杯温水', duration: '2分钟', benefit: '补充夜间流失的水分' },
          { action: '感恩三件事', duration: '2分钟', benefit: '提升积极情绪' }
        ],
        mindset: '早晨的第一小时，决定了一天的能量质量。'
      },
      midday: {
        name: '午间重启',
        purpose: '为下午储备能量，防止 burnout',
        steps: [
          { action: '离开屏幕，看远处', duration: '2分钟', benefit: '眼睛放松' },
          { action: '站起来走动', duration: '5分钟', benefit: '促进血液循环' },
          { action: '简单拉伸', duration: '3分钟', benefit: '缓解肌肉紧张' },
          { action: '补充水分', duration: '1分钟', benefit: '维持代谢' }
        ],
        mindset: '休息不是偷懒，是为了更好地前行。'
      },
      evening: {
        name: '晚间放松',
        purpose: '从活跃模式切换到恢复模式',
        steps: [
          { action: '调暗灯光', duration: '持续', benefit: '促进褪黑素分泌' },
          { action: '放下手机（或开夜间模式）', duration: '睡前1小时', benefit: '减少蓝光干扰' },
          { action: '温水泡脚或淋浴', duration: '15分钟', benefit: '降低核心体温，助眠' },
          { action: '简单拉伸或冥想', duration: '10分钟', benefit: '释放一天的紧张' },
          { action: '回顾一天的三件好事', duration: '3分钟', benefit: '积极情绪收尾' }
        ],
        mindset: '夜晚是身体的修复时间，对它温柔一点。'
      }
    };

    // 衰老标志的温和干预
    this.agingHallmarks = {
      inflammation: {
        name: '慢性炎症 (Inflammaging)',
        daily_practices: [
          '多吃深色蔬菜和浆果（抗氧化）',
          '减少精制糖和加工食品',
          '规律睡眠',
          '适度运动（过度运动反而促炎）'
        ],
        mindset: '抗炎是一生的功课，从每一餐开始。'
      },
      mitochondrial_decline: {
        name: '线粒体功能下降',
        daily_practices: [
          '间歇性禁食或限时进食',
          '有氧运动（促进线粒体生成）',
          '冷暴露（冷水澡结尾）',
          '补充NMN或NR（咨询医生）'
        ],
        mindset: '线粒体是细胞的能量工厂，运动是给它们的投资。'
      },
      autophagy_impairment: {
        name: '自噬功能下降',
        daily_practices: [
          '每周1-2次轻断食（16:8或18:6）',
          '运动（尤其是高强度间歇）',
          '充足睡眠',
          '限制持续进食'
        ],
        mindset: '自噬是细胞的"大扫除"，禁食是启动它的开关。'
      },
      sleep_quality: {
        name: '睡眠质量下降',
        daily_practices: [
          '固定作息时间',
          '睡前1小时数字排毒',
          '卧室温度略低（18-20°C）',
          '避免午后咖啡因'
        ],
        mindset: '睡眠是最强大的抗衰老药，而且是免费的。'
      }
    };

    // Blue Zones九大原则的日常化
    this.blueZonesDaily = {
      natural_movement: '今天能走路就不坐车，能站就不坐',
      purpose: '问问自己：今天做的事情，对我的意义是什么？',
      down_shift: '找到你的"解压开关"：散步、喝茶、冥想、音乐',
      eighty_percent: '吃到八分饱就停，让身体有空间',
      plant_slant: '餐盘里植物性食物占大部分',
      wine_at_five: '如果喝酒，选择红酒，少量，和亲友一起',
      belong: '今天和让你感到归属的人联系',
      loved_ones_first: '把家人和亲密的人放在优先位置',
      right_tribe: '和拥有健康习惯的人相处'
    };

    // 压力管理系统
    this.stressManagement = {
      immediate: [
        { technique: '4-7-8呼吸法', steps: '吸气4秒 → 屏息7秒 → 呼气8秒', repeat: '4次' },
        { technique: '5-4-3-2-1接地技术', steps: '看到5样 → 听到4样 → 摸到3样 → 闻到2样 → 尝到1样' },
        { technique: '冷水冲手腕', steps: '用冷水冲手腕或后颈', effect: '激活潜水反射，降低心率' }
      ],
      short_term: [
        { activity: '10分钟散步', benefit: '降低皮质醇，提升情绪' },
        { activity: '听喜欢的音乐', benefit: '激活奖赏系统' },
        { activity: '给朋友打电话', benefit: '催产素释放，减轻压力' }
      ],
      long_term: [
        { practice: '每日冥想', duration: '10-20分钟', benefit: '改变大脑结构，增强抗压' },
        { practice: '规律运动', frequency: '每周3-5次', benefit: '提升压力耐受阈值' },
        { practice: '睡眠优化', target: '7-9小时', benefit: '恢复神经系统' }
      ]
    };
  }

  /**
   * 生成今日仪式建议
   */
  generateDailyRitual(timeOfDay = 'morning') {
    const ritual = this.dailyRituals[timeOfDay];
    if (!ritual) return '';

    let guide = `🌅 **${ritual.name}**\n\n`;
    guide += `${ritual.purpose}\n\n`;
    
    guide += '**建议步骤**：\n';
    ritual.steps.forEach((step, i) => {
      guide += `${i + 1}. ${step.action} (${step.duration})\n   💡 ${step.benefit}\n`;
    });
    
    guide += `\n💭 ${ritual.mindset}`;
    
    return guide;
  }

  /**
   * 根据用户情况生成个性化抗衰老建议
   */
  generatePersonalizedAgingStrategy(userProfile) {
    const { age, concerns, lifestyle } = userProfile;
    const priorities = [];

    // 根据年龄和关注点确定优先级
    if (age >= 30 || concerns.includes('energy')) {
      priorities.push(this.agingHallmarks.mitochondrial_decline);
    }
    if (lifestyle.stressLevel > 5 || concerns.includes('inflammation')) {
      priorities.push(this.agingHallmarks.inflammation);
    }
    if (lifestyle.sleepQuality < 6) {
      priorities.push(this.agingHallmarks.sleep_quality);
    }
    if (lifestyle.eatingPattern === 'frequent') {
      priorities.push(this.agingHallmarks.autophagy_impairment);
    }

    return priorities;
  }

  /**
   * 生成Blue Zones日常实践建议
   */
  generateBlueZonesDailyPractice() {
    const practices = Object.entries(this.blueZonesDaily);
    const today = new Date().getDay();
    const selected = practices[today % practices.length];
    
    return `🌍 **Blue Zones 今日实践**

${selected[0]}: ${selected[1]}

这是来自世界上最长寿地区的智慧，不是规则，而是邀请。`;
  }

  /**
   * 生成压力管理即时工具
   */
  generateStressReliefTool(stressLevel) {
    if (stressLevel >= 8) {
      // 高压力 - 即时干预
      const technique = this.stressManagement.immediate[0];
      return `🆘 **压力紧急释放**

你现在需要立即降低应激反应：

**${technique.technique}**
${technique.steps}
重复 ${technique.repeat}

做完后告诉我感觉如何。`;
    } else if (stressLevel >= 5) {
      // 中等压力 - 短期活动
      const activity = this.stressManagement.short_term[0];
      return `💆 **压力缓解建议**

${activity.activity}
💡 ${activity.benefit}

现在能做到吗？哪怕只是开始。`;
    } else {
      // 预防性建议
      const practice = this.stressManagement.long_term[0];
      return `🧘 **长期抗压建设**

考虑建立${practice.practice}的习惯：
• 时长：${practice.duration}
• 益处：${practice.benefit}

从小开始，哪怕每天5分钟。`;
    }
  }

  /**
   * 生成生命意义与目的感探索
   */
  generatePurposeExploration() {
    const ikigaiPrompts = [
      '什么是你早上愿意醒来的原因？',
      '什么事情让你忘记时间？',
      '你擅长什么，同时也喜欢做？',
      '世界需要什么，而你又能提供？',
      '想象10年后的你，会为现在的什么决定感到骄傲？'
    ];

    const todayPrompt = ikigaiPrompts[new Date().getDate() % ikigaiPrompts.length];

    return `🎯 **Ikigai 探索时刻**

Ikigai是日语"生存的意义"，是Blue Zones长寿的核心秘密之一。

今日问题：
**${todayPrompt}**

不需要完美答案，只是开始思考。
有目的感的人，活得更长、更健康、更满足。`;
  }

  /**
   * 生成睡眠优化建议
   */
  generateSleepOptimization(context = {}) {
    const { sleepQuality, bedtime, wakeTime } = context;
    
    let advice = '🌙 **睡眠优化方案**\n\n';
    
    // 基础建议
    advice += '** tonight 可以尝试：**\n';
    advice += '1. 睡前1小时放下手机\n';
    advice += '2. 调暗卧室灯光\n';
    advice += '3. 室温调至18-20°C\n';
    advice += '4. 如果脑子里转个不停，写下来\n\n';

    // 根据睡眠问题添加
    if (sleepQuality === 'poor') {
      advice += '**针对你的情况：**\n';
      advice += '• 考虑今晚尝试4-7-8呼吸法\n';
      advice += '• 如果20分钟睡不着，起来做些放松的事\n';
      advice += '• 避免看时间，减少焦虑\n\n';
    }

    advice += '睡眠是最好的抗衰老药，也是免费的。对自己温柔一点。';
    
    return advice;
  }

  /**
   * 生成一周养生日历
   */
  generateWeeklyWellnessCalendar() {
    const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const themes = [
      { focus: '启动', practice: '设定本周意图 + 晨间仪式', mindset: '新的开始，新的可能' },
      { focus: '运动', practice: 'Blue Zones自然运动 + 社交运动', mindset: '身体喜欢活动' },
      { focus: '滋养', practice: '地中海饮食 + 正念饮食', mindset: '食物是身体的礼物' },
      { focus: '平衡', practice: '工作-休息节奏 + 午间重启', mindset: '休息也是生产力' },
      { focus: '连接', practice: '和爱的人相处 + 归属感建设', mindset: '关系是长寿的基石' },
      { focus: '恢复', practice: '主动恢复 + 轻度活动', mindset: '身体在修复中成长' },
      { focus: '反思', practice: '回顾一周 + 感恩 + 准备下周', mindset: '成长来自反思' }
    ];

    let calendar = '📅 **本周养生日历**\n\n';
    week.forEach((day, i) => {
      calendar += `${day}: ${themes[i].focus}\n`;
      calendar += `  ${themes[i].practice}\n`;
      calendar += `  💭 ${themes[i].mindset}\n\n`;
    });

    return calendar;
  }

  /**
   * 生成"今天对自己好一点"的建议
   */
  generateSelfCareSuggestion() {
    const suggestions = [
      { action: '早点睡，不管有什么事', reason: '明天会感谢今天的自己' },
      { action: '吃一份真正喜欢的食物，不计算热量', reason: '滋养不仅是营养，也是快乐' },
      { action: '出去走走，不看手机', reason: '大自然是最好的疗愈师' },
      { action: '和一个让你感到安全的人聊聊', reason: '连接是人类的底层需求' },
      { action: '放下"应该"，只做"想要"', reason: '自由感是最好的减压药' },
      { action: '做5分钟什么都不做，只是呼吸', reason: '静止也是一种滋养' }
    ];

    const suggestion = suggestions[new Date().getDay() % suggestions.length];
    
    return `💝 **今日自我照顾**

${suggestion.action}

${suggestion.reason}

你值得被温柔对待，尤其是被自己。`;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LongevityExpert;
}
