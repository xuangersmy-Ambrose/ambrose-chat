/**
 * AMBROSE Health v1.2 - 课程系统数据
 */

const COURSES_DATA = {
  fitness: [
    {
      id: 'fit-001',
      title: '7分钟燃脂HIIT',
      category: 'HIIT训练',
      difficulty: 'beginner',
      duration: 7,
      calories: 120,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      videoUrl: 'https://www.youtube.com/embed/1f1zN3f2x6E',
      description: '无需器械，7分钟高效燃脂，适合忙碌人群',
      steps: [
        '开合跳 30秒',
        '深蹲 30秒',
        '俯卧撑 30秒',
        '平板支撑 30秒',
        '高抬腿 30秒',
        '休息 30秒',
        '重复2轮'
      ],
      tags: ['燃脂', '无器械', '快速'],
      isPremium: false
    },
    {
      id: 'fit-002',
      title: '15分钟全身塑形',
      category: '居家健身',
      difficulty: 'intermediate',
      duration: 15,
      calories: 180,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
      videoUrl: 'https://www.youtube.com/embed/2MoGxae-zyo',
      description: '针对全身肌群的塑形训练',
      steps: [
        '热身 2分钟',
        '哑铃推举 3组x12次',
        '弓步蹲 3组x10次',
        '俯卧撑 3组x10次',
        '平板支撑 3组x30秒',
        '拉伸放松 2分钟'
      ],
      tags: ['塑形', '增肌', '全身'],
      isPremium: true
    },
    {
      id: 'fit-003',
      title: '办公室肩颈放松',
      category: '办公室拉伸',
      difficulty: 'beginner',
      duration: 5,
      calories: 20,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      videoUrl: 'https://www.youtube.com/embed/3q6x3y8y6z0',
      description: '久坐族的救星，缓解肩颈酸痛',
      steps: [
        '颈部左右转动',
        '肩部上下起伏',
        '手臂拉伸',
        '背部伸展',
        '坐姿扭转'
      ],
      tags: ['放松', '办公室', '拉伸'],
      isPremium: false
    },
    {
      id: 'fit-004',
      title: '瑜伽入门：晨间唤醒',
      category: '瑜伽入门',
      difficulty: 'beginner',
      duration: 20,
      calories: 80,
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400',
      videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw',
      description: '温和的晨间瑜伽，唤醒身体能量',
      steps: [
        '冥想调息 3分钟',
        '猫牛式 5次',
        '下犬式 保持5次呼吸',
        '婴儿式 放松',
        '脊柱扭转',
        '摊尸式 3分钟'
      ],
      tags: ['瑜伽', '晨间', '放松'],
      isPremium: false
    },
    {
      id: 'fit-005',
      title: '30分钟有氧燃脂',
      category: '有氧运动',
      difficulty: 'intermediate',
      duration: 30,
      calories: 350,
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400',
      videoUrl: 'https://www.youtube.com/embed/5iL0z2a8-00',
      description: '高效有氧训练，快速提升心肺功能',
      steps: [
        '热身 5分钟',
        '快走/慢跑 10分钟',
        '开合跳 5分钟',
        '高抬腿 5分钟',
        '放松拉伸 5分钟'
      ],
      tags: ['有氧', '燃脂', '心肺'],
      isPremium: true
    },
    {
      id: 'fit-006',
      title: '核心力量训练',
      category: '居家健身',
      difficulty: 'advanced',
      duration: 25,
      calories: 200,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      videoUrl: 'https://www.youtube.com/embed/8PwoytUU06g',
      description: '强化核心肌群，提升身体稳定性',
      steps: [
        '平板支撑 3组x45秒',
        '卷腹 3组x20次',
        '俄罗斯转体 3组x30次',
        '死虫式 3组x10次',
        '臀桥 3组x15次'
      ],
      tags: ['核心', '力量', '进阶'],
      isPremium: true
    }
  ],
  
  recipes: [
    {
      id: 'recipe-001',
      title: '牛油果鸡蛋沙拉',
      category: '减脂餐',
      calories: 320,
      time: 10,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      ingredients: [
        '牛油果 1个',
        '鸡蛋 2个',
        '生菜 适量',
        '橄榄油 1勺',
        '柠檬汁 适量',
        '黑胡椒 少许'
      ],
      steps: [
        '鸡蛋煮熟切块',
        '牛油果切片',
        '生菜洗净撕小块',
        '混合所有食材',
        '淋上橄榄油和柠檬汁',
        '撒上黑胡椒即可'
      ],
      nutrition: {
        protein: 18,
        carbs: 12,
        fat: 22,
        fiber: 8
      },
      tags: ['减脂', '高蛋白', '快手'],
      isPremium: false
    },
    {
      id: 'recipe-002',
      title: '鸡胸肉藜麦饭',
      category: '增肌餐',
      calories: 480,
      time: 25,
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400',
      ingredients: [
        '鸡胸肉 150g',
        '藜麦 50g',
        '西兰花 100g',
        '胡萝卜 50g',
        '橄榄油 1勺',
        '生抽 1勺'
      ],
      steps: [
        '藜麦淘洗后煮15分钟',
        '鸡胸肉切块腌制10分钟',
        '蔬菜焯水备用',
        '鸡胸肉煎熟',
        '所有食材混合装盘'
      ],
      nutrition: {
        protein: 42,
        carbs: 38,
        fat: 16,
        fiber: 6
      },
      tags: ['增肌', '高蛋白', '均衡'],
      isPremium: true
    },
    {
      id: 'recipe-003',
      title: '隔夜燕麦杯',
      category: '快手早餐',
      calories: 280,
      time: 5,
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400',
      ingredients: [
        '燕麦片 40g',
        '牛奶/酸奶 200ml',
        '蓝莓 适量',
        '坚果 10g',
        '蜂蜜 1勺'
      ],
      steps: [
        '燕麦片放入密封罐',
        '加入牛奶/酸奶',
        '搅拌均匀',
        '放入冰箱冷藏过夜',
        '早上加水果坚果即可'
      ],
      nutrition: {
        protein: 12,
        carbs: 42,
        fat: 8,
        fiber: 6
      },
      tags: ['早餐', '快手', '高纤维'],
      isPremium: false
    },
    {
      id: 'recipe-004',
      title: '三文鱼糙米饭',
      category: '增肌餐',
      calories: 520,
      time: 30,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      ingredients: [
        '三文鱼 150g',
        '糙米 60g',
        '芦笋 100g',
        '柠檬 1片',
        '橄榄油 1勺'
      ],
      steps: [
        '糙米提前浸泡2小时',
        '煮糙米30分钟',
        '三文鱼用盐和黑胡椒腌制',
        '煎三文鱼至两面金黄',
        '芦笋焯水',
        '装盘淋柠檬汁'
      ],
      nutrition: {
        protein: 38,
        carbs: 45,
        fat: 24,
        fiber: 5
      },
      tags: ['增肌', '优质蛋白', '健康脂肪'],
      isPremium: true
    },
    {
      id: 'recipe-005',
      title: '地中海沙拉',
      category: '营养配搭',
      calories: 350,
      time: 15,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      ingredients: [
        '番茄 2个',
        '黄瓜 1根',
        '紫洋葱 半个',
        '橄榄 10颗',
        '菲达奶酪 30g',
        '橄榄油 2勺'
      ],
      steps: [
        '蔬菜切块',
        '洋葱切细丝',
        '所有食材混合',
        '撒上奶酪碎',
        '淋上橄榄油和柠檬汁'
      ],
      nutrition: {
        protein: 10,
        carbs: 18,
        fat: 28,
        fiber: 5
      },
      tags: ['地中海饮食', '健康', '抗氧化'],
      isPremium: false
    },
    {
      id: 'recipe-006',
      title: '低卡魔芋面',
      category: '减脂餐',
      calories: 150,
      time: 15,
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400',
      ingredients: [
        '魔芋面 200g',
        '黄瓜丝 适量',
        '胡萝卜丝 适量',
        '鸡胸肉丝 50g',
        '生抽 2勺',
        '醋 1勺',
        '辣椒油 少许'
      ],
      steps: [
        '魔芋面焯水去碱味',
        '鸡胸肉煮熟撕丝',
        '蔬菜切丝',
        '混合所有食材',
        '调酱汁淋上拌匀'
      ],
      nutrition: {
        protein: 15,
        carbs: 8,
        fat: 6,
        fiber: 4
      },
      tags: ['超低卡', '饱腹感', '代餐'],
      isPremium: false
    }
  ],

  articles: [
    {
      id: 'article-001',
      title: '如何建立健康的睡眠习惯',
      category: '睡眠改善',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
      content: `
        ## 为什么睡眠如此重要
        
        充足的睡眠是健康的基石。成年人每天需要7-9小时的睡眠。
        
        ## 5个改善睡眠的技巧
        
        1. **固定作息时间** - 每天同一时间睡觉和起床
        2. **睡前远离蓝光** - 睡前1小时不使用电子设备
        3. **控制咖啡因摄入** - 下午2点后不喝咖啡
        4. **营造睡眠环境** - 保持卧室凉爽、黑暗、安静
        5. **建立睡前仪式** - 冥想、阅读或温水澡
        
        ## 快速入睡小技巧
        
        - 4-7-8呼吸法
        - 渐进式肌肉放松
        - 白噪音助眠
      `,
      tags: ['睡眠', '习惯', '健康'],
      isPremium: false
    },
    {
      id: 'article-002',
      title: '春季养生：养肝护肝',
      category: '中医养生',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
      content: `
        ## 春季养生的重要性
        
        春属木，与肝相应。春季是养肝的最佳时节。
        
        ## 养肝要点
        
        1. **情志调养** - 保持心情舒畅，避免暴怒
        2. **饮食调理** - 多吃绿色蔬菜，少酸多甘
        3. **作息规律** - 早睡早起，顺应阳气生发
        4. **适度运动** - 散步、太极拳、瑜伽
        
        ## 推荐食物
        
        - 菠菜、芹菜、韭菜
        - 枸杞、菊花
        - 山药、红枣
      `,
      tags: ['中医', '春季', '养肝'],
      isPremium: true
    },
    {
      id: 'article-003',
      title: '职场压力管理指南',
      category: '压力管理',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400',
      content: `
        ## 识别压力信号
        
        - 身体：头痛、肌肉紧绷、疲劳
        - 情绪：易怒、焦虑、沮丧
        - 行为：失眠、暴饮暴食、社交退缩
        
        ## 5分钟快速减压法
        
        1. **深呼吸** - 腹式呼吸，缓慢吸气和呼气
        2. **身体扫描** - 从头到脚放松每个部位
        3. **正念冥想** - 专注于当下，不评判想法
        4. **短暂离开** - 站起来走动，换个环境
        5. **喝水休息** - 喝一杯水，给自己暂停
        
        ## 长期压力管理
        
        - 建立工作边界
        - 培养兴趣爱好
        - 保持社交联系
        - 定期运动
      `,
      tags: ['压力', '职场', '心理健康'],
      isPremium: false
    },
    {
      id: 'article-004',
      title: '初学者健身完全指南',
      category: '中医养生',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      content: `
        ## 制定健身计划
        
        1. **明确目标** - 减脂、增肌还是健康
        2. **评估现状** - 体能水平和运动经验
        3. **循序渐进** - 从低强度开始
        4. **保持规律** - 每周至少3次
        
        ## 新手训练原则
        
        - **动作标准** > 重量/速度
        - 充分热身和拉伸
        - 给肌肉恢复时间
        - 记录训练数据
        
        ## 常见误区
        
        ❌ 一上来就高强度
        ❌ 忽视饮食
        ❌ 训练过度
        ❌ 没有休息
      `,
      tags: ['健身', '新手', '入门'],
      isPremium: false
    },
    {
      id: 'article-005',
      title: '冥想入门：从5分钟开始',
      category: '压力管理',
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      content: `
        ## 什么是冥想
        
        冥想不是清空思绪，而是觉察当下。
        
        ## 5分钟冥想步骤
        
        1. **找安静的地方** - 坐下或躺下
        2. **设定计时器** - 5分钟即可
        3. **关注呼吸** - 感受气息进出
        4. **接纳思绪** - 不抗拒，温柔带回
        5. **结束感恩** - 感谢这段时间
        
        ## 初学者常见问题
        
        Q: 思绪太多怎么办？
        A: 完全正常，觉察到就是进步
        
        Q: 什么时候冥想最好？
        A: 早晨或睡前，找固定时间
      `,
      tags: ['冥想', '正念', '放松'],
      isPremium: true
    }
  ]
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COURSES_DATA;
}
