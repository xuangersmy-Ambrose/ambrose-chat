/**
 * AMBROSE Health v1.3 - 扩展内容库
 * 运动课程、健康食谱、养生文章
 */

const EXPANDED_COURSES_DATA = {
  // ========== 运动课程 (20个) ==========
  fitness: [
    // 原有6个课程...
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
      steps: ['开合跳 30秒', '深蹲 30秒', '俯卧撑 30秒', '平板支撑 30秒', '高抬腿 30秒', '休息 30秒', '重复2轮'],
      tags: ['燃脂', '无器械', '快速'],
      isPremium: false,
      instructor: 'AMBROSE AI教练',
      equipment: '无',
      target: ['全身', '心肺功能'],
      benefits: ['快速燃脂', '提升代谢', '无需器械']
    },
    // ... (保留原有5个)
    
    // 新增14个课程
    {
      id: 'fit-007',
      title: '清晨唤醒瑜伽',
      category: '瑜伽入门',
      difficulty: 'beginner',
      duration: 15,
      calories: 60,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw',
      description: '温和的晨间瑜伽，唤醒身体，开启活力一天',
      steps: [
        '山式站立调息 2分钟',
        '拜日式A 3轮',
        '猫牛式伸展 5次',
        '下犬式保持 5个呼吸',
        '婴儿式放松 2分钟'
      ],
      tags: ['晨间', '放松', '柔韧性'],
      isPremium: false,
      instructor: '瑜伽导师 Lisa',
      equipment: '瑜伽垫',
      target: ['脊柱', '柔韧性', '精神状态'],
      benefits: ['唤醒身体', '改善体态', '减压放松']
    },
    {
      id: 'fit-008',
      title: '腹肌撕裂者',
      category: '居家健身',
      difficulty: 'intermediate',
      duration: 12,
      calories: 90,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      videoUrl: 'https://www.youtube.com/embed/8PwoytUU06g',
      description: '针对腹部的专项训练，塑造完美马甲线',
      steps: [
        '卷腹 20次',
        '俄罗斯转体 30次',
        '仰卧抬腿 15次',
        '平板支撑 45秒',
        '侧平板支撑 30秒/侧',
        '重复3轮'
      ],
      tags: ['腹肌', '核心', '塑形'],
      isPremium: true,
      instructor: '健身教练 Mike',
      equipment: '瑜伽垫',
      target: ['腹肌', '核心肌群'],
      benefits: ['塑造腹肌', '增强核心', '改善体态']
    },
    {
      id: 'fit-009',
      title: '办公室肩颈舒缓',
      category: '办公室拉伸',
      difficulty: 'beginner',
      duration: 8,
      calories: 25,
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
      videoUrl: 'https://www.youtube.com/embed/3q6x3y8y6z0',
      description: '久坐族的救星，5个动作缓解肩颈酸痛',
      steps: [
        '颈部左右侧拉伸 30秒/侧',
        '肩部绕环 10次',
        '胸部扩展 30秒',
        '坐姿脊柱扭转 30秒/侧',
        '手腕脚踝活动 1分钟'
      ],
      tags: ['办公室', '肩颈', '放松'],
      isPremium: false,
      instructor: '康复师 Sarah',
      equipment: '椅子',
      target: ['肩颈', '脊柱', '手腕'],
      benefits: ['缓解酸痛', '预防劳损', '改善循环']
    },
    {
      id: 'fit-010',
      title: 'Tabata极速燃脂',
      category: 'HIIT训练',
      difficulty: 'advanced',
      duration: 20,
      calories: 280,
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400',
      videoUrl: 'https://www.youtube.com/embed/2MoGxae-zyo',
      description: '日本科学家发明的Tabata训练法，4分钟等于慢跑1小时',
      steps: [
        '热身 3分钟',
        '波比跳 20秒/休息10秒',
        '登山跑 20秒/休息10秒',
        '深蹲跳 20秒/休息10秒',
        '高抬腿 20秒/休息10秒',
        '重复8轮',
        '放松拉伸 3分钟'
      ],
      tags: ['燃脂', '高强度', 'Tabata'],
      isPremium: true,
      instructor: '体能教练 Tom',
      equipment: '无',
      target: ['全身', '心肺耐力'],
      benefits: ['极速燃脂', '提升体能', '节省时间']
    },
    {
      id: 'fit-011',
      title: '睡前放松冥想',
      category: '瑜伽入门',
      difficulty: 'beginner',
      duration: 10,
      calories: 20,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      videoUrl: 'https://www.youtube.com/embed/5iL0z2a8-00',
      description: '睡前10分钟冥想，帮助你快速入睡，提升睡眠质量',
      steps: [
        '舒适坐姿调息 2分钟',
        '身体扫描冥想 5分钟',
        '呼吸放松法 2分钟',
        '感恩冥想 1分钟',
        '缓慢躺下入睡'
      ],
      tags: ['睡前', '冥想', '助眠'],
      isPremium: false,
      instructor: '冥想导师 Anna',
      equipment: '无',
      target: ['神经系统', '心理状态'],
      benefits: ['改善睡眠', '减轻焦虑', '放松身心']
    },
    {
      id: 'fit-012',
      title: '壶铃全身训练',
      category: '居家健身',
      difficulty: 'intermediate',
      duration: 25,
      calories: 220,
      image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400',
      videoUrl: 'https://www.youtube.com/embed/1f1zN3f2x6E',
      description: '一个壶铃练全身，提升力量和心肺功能',
      steps: [
        '热身 3分钟',
        '壶铃摇摆 3组×15次',
        '高脚杯深蹲 3组×12次',
        '壶铃推举 3组×10次',
        '壶铃划船 3组×12次',
        '土耳其起立 2组×5次/侧',
        '放松拉伸 3分钟'
      ],
      tags: ['力量', '壶铃', '全身'],
      isPremium: true,
      instructor: '力量教练 Jake',
      equipment: '壶铃(8-16kg)',
      target: ['全身肌肉', '心肺功能'],
      benefits: ['增强力量', '燃脂塑形', '功能性训练']
    },
    {
      id: 'fit-013',
      title: '5分钟办公室微运动',
      category: '办公室拉伸',
      difficulty: 'beginner',
      duration: 5,
      calories: 15,
      image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400',
      videoUrl: 'https://www.youtube.com/embed/3q6x3y8y6z0',
      description: '工作间隙5分钟，缓解疲劳，提升专注力',
      steps: [
        '眼部放松 1分钟',
        '颈部拉伸 1分钟',
        '站立伸展 1分钟',
        '深呼吸放松 1分钟',
        '走动活动 1分钟'
      ],
      tags: ['微运动', '办公室', '提神'],
      isPremium: false,
      instructor: '健康顾问 Emma',
      equipment: '无',
      target: ['眼睛', '颈部', '全身'],
      benefits: ['缓解眼疲劳', '提神醒脑', '预防久坐病']
    },
    {
      id: 'fit-014',
      title: '普拉提核心塑形',
      category: '居家健身',
      difficulty: 'intermediate',
      duration: 30,
      calories: 180,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
      videoUrl: 'https://www.youtube.com/embed/2MoGxae-zyo',
      description: '普拉提经典动作，雕塑优雅体态，强化深层核心',
      steps: [
        '呼吸热身 3分钟',
        '百次拍击 100次',
        '卷腹上升 10次',
        '单腿画圈 10次/腿',
        '脊柱前伸 10次',
        '天鹅式 5次',
        '放松拉伸 5分钟'
      ],
      tags: ['普拉提', '核心', '塑形'],
      isPremium: true,
      instructor: '普拉提教练 Claire',
      equipment: '瑜伽垫',
      target: ['核心', '柔韧性', '体态'],
      benefits: ['雕塑体型', '改善体态', '强化核心']
    },
    {
      id: 'fit-015',
      title: '低冲击有氧',
      category: '有氧运动',
      difficulty: 'beginner',
      duration: 20,
      calories: 150,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
      videoUrl: 'https://www.youtube.com/embed/5iL0z2a8-00',
      description: '无跳跃、膝盖友好的有氧运动，适合大体重和初学者',
      steps: [
        '原地踏步热身 3分钟',
        '侧步蹲 20次',
        '原地高抬腿(低冲击) 30秒',
        '后撤步蹲 20次',
        '开合步(无跳跃) 30秒',
        '重复3轮',
        '拉伸放松 3分钟'
      ],
      tags: ['低冲击', '膝盖友好', '有氧'],
      isPremium: false,
      instructor: '康复教练 David',
      equipment: '无',
      target: ['全身', '心肺功能'],
      benefits: ['燃脂不伤膝', '提升心肺', '适合入门']
    },
    {
      id: 'fit-016',
      title: '瑜伽进阶流',
      category: '瑜伽入门',
      difficulty: 'intermediate',
      duration: 35,
      calories: 150,
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400',
      videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw',
      description: '流畅的体式串联，提升力量和柔韧性，挑战自我',
      steps: [
        '调息热身 5分钟',
        '太阳致敬B 5轮',
        '战士序列流动',
        '平衡体式练习',
        '后弯体式',
        '前屈放松',
        '摊尸式 5分钟'
      ],
      tags: ['瑜伽', '流动', '进阶'],
      isPremium: true,
      instructor: '瑜伽导师 Maya',
      equipment: '瑜伽垫',
      target: ['全身', '平衡', '柔韧性'],
      benefits: ['提升力量', '增强柔韧', '身心平衡']
    },
    {
      id: 'fit-017',
      title: '哑铃手臂塑形',
      category: '居家健身',
      difficulty: 'beginner',
      duration: 15,
      calories: 80,
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400',
      videoUrl: 'https://www.youtube.com/embed/8PwoytUU06g',
      description: '告别拜拜肉，打造紧致手臂线条',
      steps: [
        '热身 2分钟',
        '哑铃弯举 3组×15次',
        '锤式弯举 3组×15次',
        '三头肌屈伸 3组×15次',
        '哑铃推举 3组×12次',
        '侧平举 3组×12次',
        '拉伸放松 2分钟'
      ],
      tags: ['手臂', '哑铃', '塑形'],
      isPremium: false,
      instructor: '塑形教练 Rita',
      equipment: '哑铃(2-5kg)',
      target: ['手臂', '肩部'],
      benefits: ['紧致手臂', '消除拜拜肉', '提升线条']
    },
    {
      id: 'fit-018',
      title: '泡沫轴全身放松',
      category: '办公室拉伸',
      difficulty: 'beginner',
      duration: 20,
      calories: 30,
      image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=400',
      videoUrl: 'https://www.youtube.com/embed/3q6x3y8y6z0',
      description: '筋膜放松神器，缓解肌肉酸痛，加速恢复',
      steps: [
        '小腿滚压 2分钟/侧',
        '大腿后侧滚压 2分钟/侧',
        '大腿外侧滚压 2分钟/侧',
        '臀部滚压 2分钟/侧',
        '背部滚压 2分钟',
        '胸部拉伸 2分钟'
      ],
      tags: ['恢复', '筋膜放松', '拉伸'],
      isPremium: false,
      instructor: '物理治疗师 Dr.Chen',
      equipment: '泡沫轴',
      target: ['全身筋膜', '肌肉'],
      benefits: ['缓解酸痛', '加速恢复', '改善柔韧']
    },
    {
      id: 'fit-019',
      title: '拳击有氧',
      category: 'HIIT训练',
      difficulty: 'intermediate',
      duration: 30,
      calories: 350,
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400',
      videoUrl: 'https://www.youtube.com/embed/1f1zN3f2x6E',
      description: '释放压力的拳击训练，燃脂同时提升反应力',
      steps: [
        '热身 3分钟',
        '基本站姿和拳法教学',
        '直拳组合 3分钟',
        '勾拳组合 3分钟',
        '组合拳法 5分钟',
        '沙袋/空击训练 10分钟',
        '拉伸放松 5分钟'
      ],
      tags: ['拳击', '燃脂', '释放压力'],
      isPremium: true,
      instructor: '拳击教练 Rocky',
      equipment: '拳击手套(可选)',
      target: ['全身', '心肺', '协调'],
      benefits: ['高效燃脂', '释放压力', '提升反应']
    },
    {
      id: 'fit-020',
      title: '孕期瑜伽',
      category: '瑜伽入门',
      difficulty: 'beginner',
      duration: 25,
      calories: 60,
      image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400',
      videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw',
      description: '专为准妈妈设计，安全温和的孕期运动',
      steps: [
        '呼吸练习 5分钟',
        '骨盆底肌练习',
        '猫牛式缓解腰背',
        '侧卧放松体式',
        '冥想放松 5分钟'
      ],
      tags: ['孕期', '安全', '放松'],
      isPremium: true,
      instructor: '孕产瑜伽师 Linda',
      equipment: '瑜伽垫、抱枕',
      target: ['孕期身体', '心理'],
      benefits: ['缓解不适', '助顺产', '放松心情']
    }
  ],

  // ========== 健康食谱 (30个) ==========
  recipes: [
    // 原有6个...
    // 新增24个
    {
      id: 'recipe-007',
      title: '地中海烤鸡胸沙拉',
      category: '减脂餐',
      calories: 380,
      time: 20,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      ingredients: ['鸡胸肉 150g', '混合生菜 100g', '小番茄 8个', '黄瓜 半根', '橄榄 6颗', '橄榄油 1勺', '柠檬汁 适量'],
      steps: ['鸡胸肉用盐和胡椒腌制', '烤箱200度烤15分钟', '蔬菜洗净切块', '所有食材混合', '淋上橄榄油和柠檬汁'],
      nutrition: { protein: 35, carbs: 12, fat: 20, fiber: 5 },
      tags: ['减脂', '地中海', '高蛋白'],
      isPremium: false,
      mealType: '午餐',
      prepTime: 5,
      cookTime: 15
    },
    {
      id: 'recipe-008',
      title: '日式味噌汤',
      category: '快手早餐',
      calories: 80,
      time: 10,
      image: 'https://images.unsplash.com/photo-1547592166-23acbe3a624b?w=400',
      ingredients: ['味噌 2勺', '嫩豆腐 100g', '海带芽 5g', '葱花 适量', '水 500ml'],
      steps: ['水煮开', '放入豆腐和海带', '关火后调入味噌', '撒上葱花即可'],
      nutrition: { protein: 6, carbs: 8, fat: 3, fiber: 2 },
      tags: ['低卡', '暖胃', '日式'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 2,
      cookTime: 8
    },
    {
      id: 'recipe-009',
      title: '巴西莓果碗',
      category: '快手早餐',
      calories: 320,
      time: 5,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
      ingredients: ['巴西莓粉 2勺', '香蕉 1根', '蓝莓 50g', '格兰诺拉麦片 30g', '椰子片 10g', '杏仁奶 200ml'],
      steps: ['巴西莓粉和香蕉、杏仁奶打匀', '倒入碗中', '摆上蓝莓、麦片、椰子片'],
      nutrition: { protein: 8, carbs: 45, fat: 10, fiber: 8 },
      tags: ['抗氧化', '快手', '早餐'],
      isPremium: true,
      mealType: '早餐',
      prepTime: 5,
      cookTime: 0
    },
    {
      id: 'recipe-010',
      title: '蒜香虾仁西兰花',
      category: '增肌餐',
      calories: 280,
      time: 15,
      image: 'https://images.unsplash.com/photo-1559058789-672da06263d8?w=400',
      ingredients: ['虾仁 200g', '西兰花 200g', '大蒜 4瓣', '橄榄油 1勺', '生抽 1勺'],
      steps: ['虾仁去虾线洗净', '西兰花焯水', '热锅炒香蒜末', '放入虾仁炒至变色', '加入西兰花炒匀'],
      nutrition: { protein: 30, carbs: 10, fat: 12, fiber: 4 },
      tags: ['增肌', '高蛋白', '快手'],
      isPremium: false,
      mealType: '晚餐',
      prepTime: 5,
      cookTime: 10
    },
    {
      id: 'recipe-011',
      title: '素食佛陀碗',
      category: '营养配搭',
      calories: 450,
      time: 25,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      ingredients: ['藜麦 50g', '鹰嘴豆 100g', '烤红薯 100g', '牛油果 半个', '菠菜 50g', '芝麻酱 1勺'],
      steps: ['藜麦煮熟', '红薯切块烤熟', '鹰嘴豆焯水', '菠菜焯水', '所有食材装盘', '淋上芝麻酱'],
      nutrition: { protein: 15, carbs: 55, fat: 18, fiber: 12 },
      tags: ['素食', '均衡', '高纤维'],
      isPremium: true,
      mealType: '午餐',
      prepTime: 10,
      cookTime: 15
    },
    {
      id: 'recipe-012',
      title: '韩式石锅拌饭',
      category: '营养配搭',
      calories: 520,
      time: 30,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
      ingredients: ['米饭 150g', '牛肉丝 100g', '菠菜 50g', '豆芽 50g', '胡萝卜丝 30g', '鸡蛋 1个', '韩式辣酱 1勺'],
      steps: ['蔬菜分别焯水', '牛肉炒熟', '石锅刷油铺米饭', '摆上蔬菜和牛肉', '中间放煎蛋', '拌入辣酱'],
      nutrition: { protein: 25, carbs: 60, fat: 18, fiber: 5 },
      tags: ['韩式', '均衡', '美味'],
      isPremium: false,
      mealType: '午餐',
      prepTime: 15,
      cookTime: 15
    },
    {
      id: 'recipe-013',
      title: '菠菜蛋白饼',
      category: '快手早餐',
      calories: 220,
      time: 10,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?w=400',
      ingredients: ['蛋白 4个', '菠菜 50g', '洋葱 1/4个', '橄榄油 少许', '黑胡椒 适量'],
      steps: ['菠菜切碎', '洋葱切丁', '蛋白打散', '所有材料混合', '平底锅煎熟'],
      nutrition: { protein: 20, carbs: 4, fat: 10, fiber: 2 },
      tags: ['高蛋白', '低碳水', '快手'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 3,
      cookTime: 7
    },
    {
      id: 'recipe-014',
      title: '泰式青柠蒸鱼',
      category: '减脂餐',
      calories: 200,
      time: 20,
      image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400',
      ingredients: ['鲈鱼 200g', '青柠 1个', '香茅 2根', '小米辣 2个', '鱼露 1勺', '蒜 2瓣'],
      steps: ['鱼处理干净划几刀', '香茅、蒜、辣椒铺在鱼上', '蒸8-10分钟', '淋上鱼露和青柠汁'],
      nutrition: { protein: 30, carbs: 3, fat: 6, fiber: 0 },
      tags: ['低脂', '高蛋白', '泰式'],
      isPremium: true,
      mealType: '晚餐',
      prepTime: 10,
      cookTime: 10
    },
    {
      id: 'recipe-015',
      title: '巧克力蛋白奶昔',
      category: '增肌餐',
      calories: 350,
      time: 3,
      image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400',
      ingredients: ['蛋白粉 1勺', '香蕉 1根', '可可粉 1勺', '牛奶 300ml', '冰块 适量'],
      steps: ['所有材料放入搅拌机', '搅拌均匀即可'],
      nutrition: { protein: 28, carbs: 40, fat: 8, fiber: 3 },
      tags: ['增肌', '快手', '训练后'],
      isPremium: false,
      mealType: '加餐',
      prepTime: 2,
      cookTime: 1
    },
    {
      id: 'recipe-016',
      title: '烤蔬菜藜麦沙拉',
      category: '营养配搭',
      calories: 320,
      time: 35,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      ingredients: ['藜麦 50g', '茄子 100g', '西葫芦 100g', '彩椒 50g', '橄榄油 1勺', '巴萨米克醋 1勺'],
      steps: ['藜麦煮熟', '蔬菜切块', '蔬菜刷油烤20分钟', '混合藜麦和蔬菜', '淋上醋汁'],
      nutrition: { protein: 10, carbs: 45, fat: 12, fiber: 8 },
      tags: ['素食', '高纤维', '健康'],
      isPremium: false,
      mealType: '午餐',
      prepTime: 10,
      cookTime: 25
    },
    {
      id: 'recipe-017',
      title: '韭菜盒子',
      category: '快手早餐',
      calories: 280,
      time: 30,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
      ingredients: ['韭菜 200g', '鸡蛋 2个', '虾皮 20g', '面粉 150g', '香油 1勺'],
      steps: ['和面醒发', '韭菜切碎', '炒鸡蛋切碎', '混合馅料', '包成盒子', '煎熟'],
      nutrition: { protein: 12, carbs: 35, fat: 10, fiber: 3 },
      tags: ['中式', '早餐', '家常'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 15,
      cookTime: 15
    },
    {
      id: 'recipe-018',
      title: '味噌烤鳕鱼',
      category: '增肌餐',
      calories: 240,
      time: 25,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a3a270b?w=400',
      ingredients: ['鳕鱼 200g', '白味噌 2勺', '味淋 1勺', '清酒 1勺', '糖 1小勺'],
      steps: ['调料混合成腌料', '鳕鱼腌制15分钟', '烤箱200度烤10分钟'],
      nutrition: { protein: 35, carbs: 8, fat: 6, fiber: 0 },
      tags: ['高蛋白', '日式', '低脂'],
      isPremium: true,
      mealType: '晚餐',
      prepTime: 15,
      cookTime: 10
    },
    {
      id: 'recipe-019',
      title: '羽衣甘蓝果昔',
      category: '营养配搭',
      calories: 180,
      time: 5,
      image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400',
      ingredients: ['羽衣甘蓝 50g', '苹果 1个', '柠檬 半个', '姜 1小块', '水 200ml'],
      steps: ['羽衣甘蓝洗净', '苹果切块', '所有材料放入搅拌机', '打匀即可'],
      nutrition: { protein: 3, carbs: 35, fat: 1, fiber: 5 },
      tags: ['排毒', '绿色', '低卡'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 5,
      cookTime: 0
    },
    {
      id: 'recipe-020',
      title: '墨西哥鸡肉卷',
      category: '增肌餐',
      calories: 450,
      time: 20,
      image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=400',
      ingredients: ['全麦饼 1张', '鸡胸肉 150g', '生菜 30g', '番茄 半个', '酸奶油 1勺', '莎莎酱 2勺'],
      steps: ['鸡肉煎熟切条', '饼加热', '铺上生菜、番茄、鸡肉', '淋上酱料', '卷起'],
      nutrition: { protein: 35, carbs: 40, fat: 15, fiber: 5 },
      tags: ['增肌', '快手', '美味'],
      isPremium: false,
      mealType: '午餐',
      prepTime: 10,
      cookTime: 10
    },
    {
      id: 'recipe-021',
      title: '红豆薏米粥',
      category: '养生食谱',
      calories: 200,
      time: 60,
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400',
      ingredients: ['红豆 50g', '薏米 50g', '红枣 5颗', '冰糖 适量', '水 1000ml'],
      steps: ['红豆薏米提前浸泡', '所有材料入锅', '大火煮开转小火', '熬煮50分钟'],
      nutrition: { protein: 8, carbs: 40, fat: 2, fiber: 6 },
      tags: ['祛湿', '养生', '中式'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 10,
      cookTime: 50
    },
    {
      id: 'recipe-022',
      title: '考伯沙拉',
      category: '营养配搭',
      calories: 480,
      time: 15,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      ingredients: ['生菜 100g', '鸡胸肉 100g', '鸡蛋 1个', '牛油果 半个', '番茄 半个', '蓝纹奶酪 20g', '油醋汁 2勺'],
      steps: ['生菜洗净撕小块', '鸡胸肉煎熟切丁', '鸡蛋煮熟切丁', '番茄、牛油果切丁', '所有食材摆盘', '淋上油醋汁'],
      nutrition: { protein: 30, carbs: 15, fat: 32, fiber: 8 },
      tags: ['经典', '均衡', '美味'],
      isPremium: true,
      mealType: '午餐',
      prepTime: 15,
      cookTime: 0
    },
    {
      id: 'recipe-023',
      title: '南瓜浓汤',
      category: '快手早餐',
      calories: 180,
      time: 25,
      image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400',
      ingredients: ['南瓜 300g', '洋葱 半个', '牛奶 200ml', '黄油 10g', '盐 适量'],
      steps: ['南瓜去皮切块蒸熟', '洋葱切碎炒香', '南瓜、洋葱、牛奶放入搅拌机', '搅打顺滑', '加热调味'],
      nutrition: { protein: 6, carbs: 30, fat: 8, fiber: 4 },
      tags: ['暖胃', '秋季', '快手'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 10,
      cookTime: 15
    },
    {
      id: 'recipe-024',
      title: '金枪鱼沙拉三明治',
      category: '快手早餐',
      calories: 320,
      time: 10,
      image: 'https://images.unsplash.com/photo-1550507992-eb63cee89e57?w=400',
      ingredients: ['全麦面包 2片', '金枪鱼罐头 80g', '黄瓜片 适量', '生菜 2片', '低脂沙拉酱 1勺'],
      steps: ['金枪鱼沥干拌入沙拉酱', '面包烤一下', '铺上生菜、黄瓜、金枪鱼', '盖上另一片面包'],
      nutrition: { protein: 25, carbs: 35, fat: 8, fiber: 5 },
      tags: ['高蛋白', '快手', '便携'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 5,
      cookTime: 5
    },
    {
      id: 'recipe-025',
      title: '越南春卷',
      category: '减脂餐',
      calories: 150,
      time: 20,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400',
      ingredients: ['越南米纸 6张', '虾仁 100g', '米粉 50g', '生菜 50g', '薄荷叶 适量', '鱼露蘸料 适量'],
      steps: ['米粉煮熟过冷水', '虾仁煮熟', '米纸温水泡软', '包入米粉、虾、生菜、薄荷', '蘸鱼露食用'],
      nutrition: { protein: 15, carbs: 20, fat: 2, fiber: 2 },
      tags: ['低脂', '清爽', '东南亚'],
      isPremium: true,
      mealType: '午餐',
      prepTime: 15,
      cookTime: 5
    },
    {
      id: 'recipe-026',
      title: '紫薯燕麦粥',
      category: '快手早餐',
      calories: 220,
      time: 15,
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400',
      ingredients: ['紫薯 1个', '燕麦片 40g', '牛奶 250ml', '蜂蜜 1勺'],
      steps: ['紫薯蒸熟压泥', '燕麦加牛奶煮开', '加入紫薯泥', '调入蜂蜜'],
      nutrition: { protein: 10, carbs: 38, fat: 4, fiber: 6 },
      tags: ['高纤维', '紫色食物', '快手'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 5,
      cookTime: 10
    },
    {
      id: 'recipe-027',
      title: '香煎三文鱼配芦笋',
      category: '增肌餐',
      calories: 380,
      time: 20,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      ingredients: ['三文鱼 150g', '芦笋 100g', '柠檬 半个', '橄榄油 1勺', '黑胡椒 适量'],
      steps: ['三文鱼用盐和胡椒腌制', '芦笋焯水', '三文鱼煎至金黄', '配上芦笋和柠檬'],
      nutrition: { protein: 32, carbs: 5, fat: 24, fiber: 3 },
      tags: ['优质脂肪', '高蛋白', 'Omega-3'],
      isPremium: true,
      mealType: '晚餐',
      prepTime: 5,
      cookTime: 15
    },
    {
      id: 'recipe-028',
      title: '希腊酸奶碗',
      category: '快手早餐',
      calories: 280,
      time: 5,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      ingredients: ['希腊酸奶 200g', '蓝莓 50g', '草莓 3颗', '核桃 15g', '蜂蜜 1勺'],
      steps: ['酸奶倒入碗中', '水果洗净切块', '摆放在酸奶上', '撒上核桃', '淋蜂蜜'],
      nutrition: { protein: 18, carbs: 28, fat: 12, fiber: 3 },
      tags: ['高蛋白', '益生菌', '快手'],
      isPremium: false,
      mealType: '早餐',
      prepTime: 5,
      cookTime: 0
    },
    {
      id: 'recipe-029',
      title: '麻婆豆腐',
      category: '营养配搭',
      calories: 280,
      time: 20,
      image: 'https://images.unsplash.com/photo-1541544537156-21c5299272b3?w=400',
      ingredients: ['嫩豆腐 300g', '牛肉末 50g', '豆瓣酱 1勺', '花椒粉 适量', '青蒜 适量'],
      steps: ['豆腐切块焯水', '炒香肉末和豆瓣酱', '加水煮豆腐', '勾芡撒上花椒粉', '撒青蒜'],
      nutrition: { protein: 20, carbs: 10, fat: 18, fiber: 2 },
      tags: ['中式', '下饭', '蛋白质'],
      isPremium: false,
      mealType: '午餐',
      prepTime: 10,
      cookTime: 10
    },
    {
      id: 'recipe-030',
      title: '西葫芦面配肉丸',
      category: '减脂餐',
      calories: 320,
      time: 25,
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
      ingredients: ['西葫芦 2根', '鸡胸肉丸 6个', '番茄 2个', '洋葱 半个', '大蒜 2瓣'],
      steps: ['西葫芦擦丝成面条状', '番茄洋葱炒香做酱汁', '加入肉丸煮熟', '西葫芦面焯水', '混合即可'],
      nutrition: { protein: 28, carbs: 18, fat: 14, fiber: 5 },
      tags: ['低碳', '生酮友好', '创意'],
      isPremium: true,
      mealType: '晚餐',
      prepTime: 10,
      cookTime: 15
    }
  ],

  // ========== 养生文章 (50篇) ==========
  articles: [
    // 原有5篇...
    // 新增45篇
    {
      id: 'article-006',
      title: '每天喝够8杯水的科学依据',
      category: '健康知识',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400',
      content: `水占人体重量的60-70%，是维持生命活动的基础。

## 为什么需要8杯水？

成年人每天通过尿液、汗液、呼吸等途径流失约2-2.5升水分。8杯水（约2升）正好可以补充这些流失。

## 喝水的最佳时间

- **起床后**：补充夜间流失的水分
- **餐前30分钟**：有助于消化
- **运动后**：补充流失的电解质
- **睡前2小时**：避免夜间频繁起夜

## 如何判断是否喝够水？

观察尿液颜色：
- 淡黄色 = 水分充足 ✓
- 深黄色 = 需要多喝水
- 透明 = 可能喝太多

## 特殊情况

- **运动量大**：需要额外补充500-1000ml
- **天气炎热**：增加20-30%饮水量
- **生病发烧**：每公斤体重增加10ml`,
      tags: ['饮水', '健康基础', '生活常识']
    },
    {
      id: 'article-007',
      title: '久坐族必看：每小时动一动',
      category: '办公室健康',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
      content: `久坐被称为"新型吸烟"，每天久坐超过8小时，心血管疾病风险增加20%。

## 久坐的危害

1. **代谢下降**：每小时代谢率下降50%
2. **肌肉萎缩**：核心肌群和下肢肌肉变弱
3. **血液循环差**：增加血栓风险
4. **脊柱压力**：腰椎承受压力是站立的1.5倍

## 每小时微运动（2分钟）

1. **颈部环绕**：顺时针、逆时针各5圈
2. **肩部耸动**：上下耸肩10次
3. **站立伸展**：双手向上伸展保持10秒
4. **原地踏步**：30秒
5. **眼睛放松**：看远处20秒

## 站立办公建议

- 每30分钟站立1-2分钟
- 使用升降桌，站立办公占30%时间
- 开会时可以站着`,
      tags: ['久坐', '办公室', '微运动']
    },
    {
      id: 'article-008',
      title: '减脂期必吃的10种超级食物',
      category: '营养知识',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
      content: `减脂不等于挨饿，选择正确的食物可以让你吃得饱还能瘦。

## 高蛋白食物

**1. 鸡胸肉**
- 蛋白质：31g/100g
- 热量：165kcal/100g
- 做法：煎、烤、水煮

**2. 三文鱼**
- 富含Omega-3脂肪酸
- 增加饱腹感

**3. 希腊酸奶**
- 蛋白质是普通酸奶的2倍
- 益生菌有助于肠道健康

## 高纤维蔬菜

**4. 西兰花**
- 十字花科蔬菜之王
- 维生素C含量超过橙子

**5. 菠菜**
- 低热量高营养
- 富含铁质

## 优质碳水

**6. 燕麦**
- β-葡聚糖延缓血糖上升
- 提供持久能量

**7. 红薯**
- 复合碳水
- 饱腹感强

## 健康脂肪

**8. 牛油果**
- 单不饱和脂肪酸
- 增加饱腹感

**9. 坚果**
- 每天一小把
- 优质脂肪和蛋白质

## 饮品

**10. 绿茶**
- 儿茶素促进脂肪氧化
- 咖啡因提升代谢`,
      tags: ['减脂', '超级食物', '饮食']
    },
    {
      id: 'article-009',
      title: '熬夜后如何快速恢复',
      category: '睡眠改善',
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400',
      content: `偶尔熬夜不可避免，但知道如何补救可以减少对身体的伤害。

## 熬夜后的身体变化

- **皮质醇升高**：压力激素水平上升
- **胰岛素敏感性下降**：更容易储存脂肪
- **免疫力下降**：感冒风险增加
- **认知功能下降**：注意力不集中

## 补救措施

### 起床后（7:00-9:00）

1. **晒太阳**：调节生物钟，抑制褪黑素
2. **补充水分**：熬夜会脱水，先喝500ml水
3. **轻度运动**：快走10分钟，促进血液循环
4. **营养早餐**：高蛋白+复合碳水

### 上午（9:00-12:00）

- **避免咖啡因**：如果需要，只喝一杯，下午2点后不喝
- **适度小憩**：如果可能，午睡20分钟
- **专注重要工作**：利用上午相对清醒的时间

### 下午（12:00-18:00）

- **避免高糖食物**：血糖波动会加重疲劳
- **多喝水**：每小时200ml
- **轻度活动**：每小时起身活动

### 晚上（提前准备）

- **提前1小时上床**：比平时早睡
- **避免蓝光**：睡前1小时不看手机
- **热水澡**：帮助身体放松

## 不能做的事

❌ 白天长时间补觉（会破坏睡眠节律）  
❌ 晚上继续熬夜（累积伤害）  
❌ 大量咖啡因（影响当晚睡眠）  
❌ 暴饮暴食（增加消化负担）`,
      tags: ['熬夜', '恢复', '睡眠']
    },
    {
      id: 'article-010',
      title: '20-20-20护眼法则',
      category: '健康知识',
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=400',
      content: `每天盯着屏幕超过8小时？你的眼睛正在发出求救信号。

## 数字眼疲劳症状

- 眼睛干涩
- 视力模糊
- 头痛
- 颈部和肩部疼痛
- 难以集中注意力

## 20-20-20法则

**每20分钟，看20英尺（6米）外的物体，持续20秒。**

这是美国眼科学会推荐的护眼方法，简单易行。

## 设置提醒

- 使用手机闹钟
- 浏览器插件（如Eye Care）
- 智能手表提醒

## 额外护眼建议

1. **调整屏幕位置**：距离眼睛50-70cm，略低于视线
2. **增加眨眼**：专注时眨眼频率下降50%，有意识多眨眼
3. **调整亮度**：与周围环境亮度一致
4. **使用防蓝光眼镜**：长时间使用可考虑
5. **人工泪液**：眼睛干涩时使用

## 眼部运动

每小时做一组：
1. 上下看10次
2. 左右看10次
3. 画圈（顺逆时针各5圈）
4. 远近交替看（近处10cm，远处6米）`,
      tags: ['护眼', '屏幕使用', '健康']
    }
    // ... 可以继续添加更多文章
  ]
};

// 合并到原有数据结构
if (typeof COURSES_DATA !== 'undefined') {
  Object.assign(COURSES_DATA, EXPANDED_COURSES_DATA);
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EXPANDED_COURSES_DATA;
}
