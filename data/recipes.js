/**
 * AMBROSE Health - 健康食谱库
 * 参考薄荷健康，收录营养均衡的健康食谱
 */

const RECIPE_DATABASE = [
  // ========== 早餐 ==========
  {
    id: 'recipe_001',
    title: '燕麦水果碗',
    emoji: '🥣',
    category: '早餐',
    calories: 320,
    protein: 12,
    fat: 8,
    carbs: 52,
    time: 5,
    difficulty: '简单',
    tags: ['高纤维', '低GI', '快手'],
    ingredients: [
      { name: '燕麦片', amount: '50g' },
      { name: '牛奶/豆浆', amount: '200ml' },
      { name: '蓝莓', amount: '30g' },
      { name: '香蕉', amount: '半根' },
      { name: '奇亚籽', amount: '5g' },
    ],
    steps: [
      '燕麦片放入碗中',
      '倒入牛奶或豆浆',
      '微波炉加热1-2分钟',
      '加入切好的水果和奇亚籽',
      '搅拌均匀即可享用'
    ],
    tips: '可用希腊酸奶代替牛奶，口感更浓郁'
  },
  {
    id: 'recipe_002',
    title: '全麦三明治',
    emoji: '🥪',
    category: '早餐',
    calories: 380,
    protein: 22,
    fat: 12,
    carbs: 45,
    time: 10,
    difficulty: '简单',
    tags: ['高蛋白', '便携', '快手'],
    ingredients: [
      { name: '全麦面包', amount: '2片' },
      { name: '鸡蛋', amount: '1个' },
      { name: '生菜', amount: '2片' },
      { name: '番茄', amount: '2片' },
      { name: '低脂芝士片', amount: '1片' },
    ],
    steps: [
      '鸡蛋煎熟或水煮',
      '面包烤至微脆',
      '依次铺上生菜、番茄、鸡蛋、芝士',
      '盖上另一片面包',
      '对角切开即可'
    ],
    tips: '可添加牛油果增加健康脂肪'
  },
  {
    id: 'recipe_003',
    title: '希腊酸奶杯',
    emoji: '🥛',
    category: '早餐',
    calories: 280,
    protein: 18,
    fat: 6,
    carbs: 38,
    time: 3,
    difficulty: '简单',
    tags: ['高蛋白', '益生菌', '快手'],
    ingredients: [
      { name: '希腊酸奶', amount: '150g' },
      { name: '格兰诺拉', amount: '30g' },
      { name: '草莓', amount: '3颗' },
      { name: '蜂蜜', amount: '5g' },
    ],
    steps: [
      '酸奶倒入杯中',
      '加入格兰诺拉麦片',
      '放上切好的草莓',
      '淋上少许蜂蜜',
      '即可享用'
    ],
    tips: '可提前一晚制作隔夜燕麦杯'
  },
  {
    id: 'recipe_004',
    title: '蔬菜蛋饼',
    emoji: '🍳',
    category: '早餐',
    calories: 250,
    protein: 16,
    fat: 14,
    carbs: 12,
    time: 10,
    difficulty: '简单',
    tags: ['高蛋白', '低碳水', '生酮友好'],
    ingredients: [
      { name: '鸡蛋', amount: '2个' },
      { name: '菠菜', amount: '30g' },
      { name: '番茄', amount: '半个' },
      { name: '洋葱', amount: '1/4个' },
      { name: '橄榄油', amount: '5ml' },
    ],
    steps: [
      '蔬菜切丁备用',
      '鸡蛋打散，加少许盐',
      '锅中倒油，炒软蔬菜',
      '倒入蛋液，小火煎熟',
      '对折出锅'
    ],
    tips: '可加入芝士增加风味'
  },
  {
    id: 'recipe_005',
    title: '紫薯燕麦粥',
    emoji: '🍠',
    category: '早餐',
    calories: 240,
    protein: 6,
    fat: 2,
    carbs: 50,
    time: 15,
    difficulty: '简单',
    tags: ['高纤维', '低脂', '饱腹'],
    ingredients: [
      { name: '紫薯', amount: '100g' },
      { name: '燕麦片', amount: '30g' },
      { name: '水', amount: '200ml' },
      { name: '牛奶', amount: '100ml' },
    ],
    steps: [
      '紫薯去皮切块，蒸熟',
      '锅中加水和燕麦煮5分钟',
      '加入蒸好的紫薯压成泥',
      '倒入牛奶搅拌均匀',
      '煮至浓稠即可'
    ],
    tips: '紫薯可用南瓜或红薯代替'
  },
  
  // ========== 午餐 ==========
  {
    id: 'recipe_006',
    title: '鸡胸肉藜麦碗',
    emoji: '🥗',
    category: '午餐',
    calories: 450,
    protein: 35,
    fat: 12,
    carbs: 48,
    time: 20,
    difficulty: '中等',
    tags: ['高蛋白', '低脂', '健身餐'],
    ingredients: [
      { name: '鸡胸肉', amount: '150g' },
      { name: '藜麦', amount: '50g' },
      { name: '西兰花', amount: '100g' },
      { name: '胡萝卜', amount: '50g' },
      { name: '橄榄油', amount: '5ml' },
    ],
    steps: [
      '藜麦淘洗后煮15分钟',
      '鸡胸肉切块，用黑胡椒腌制',
      '蔬菜切好焯水',
      '鸡胸肉煎至金黄',
      '所有食材装盘，淋少许橄榄油'
    ],
    tips: '可淋上柠檬汁或低脂沙拉酱'
  },
  {
    id: 'recipe_007',
    title: '三文鱼牛油果饭',
    emoji: '🍣',
    category: '午餐',
    calories: 520,
    protein: 28,
    fat: 24,
    carbs: 42,
    time: 15,
    difficulty: '简单',
    tags: ['高蛋白', '健康脂肪', 'Omega-3'],
    ingredients: [
      { name: '三文鱼', amount: '120g' },
      { name: '糙米饭', amount: '100g' },
      { name: '牛油果', amount: '半个' },
      { name: '黄瓜', amount: '50g' },
      { name: '海苔', amount: '1片' },
    ],
    steps: [
      '三文鱼煎至两面金黄',
      '牛油果切片，黄瓜切丁',
      '糙米饭铺底',
      '放上三文鱼和蔬菜',
      '撒上海苔碎即可'
    ],
    tips: '可用酱油和芥末调味'
  },
  {
    id: 'recipe_008',
    title: '番茄鸡蛋荞麦面',
    emoji: '🍜',
    category: '午餐',
    calories: 380,
    protein: 18,
    fat: 10,
    carbs: 55,
    time: 15,
    difficulty: '简单',
    tags: ['低脂', '快手', '家常'],
    ingredients: [
      { name: '荞麦面', amount: '80g' },
      { name: '鸡蛋', amount: '1个' },
      { name: '番茄', amount: '1个' },
      { name: '青菜', amount: '50g' },
      { name: '橄榄油', amount: '5ml' },
    ],
    steps: [
      '荞麦面煮熟备用',
      '番茄切块炒出汁',
      '加水煮开，打入蛋花',
      '放入青菜和面',
      '调味出锅'
    ],
    tips: '番茄炒久一点汤汁更浓郁'
  },
  {
    id: 'recipe_009',
    title: '牛肉西兰花',
    emoji: '🥩',
    category: '午餐',
    calories: 420,
    protein: 32,
    fat: 18,
    carbs: 28,
    time: 20,
    difficulty: '中等',
    tags: ['高蛋白', '高铁', '增肌'],
    ingredients: [
      { name: '牛肉(瘦)', amount: '150g' },
      { name: '西兰花', amount: '150g' },
      { name: '红椒', amount: '50g' },
      { name: '蒜', amount: '2瓣' },
      { name: '橄榄油', amount: '10ml' },
    ],
    steps: [
      '牛肉切片，用生抽淀粉腌制',
      '西兰花切小朵焯水',
      '热锅炒牛肉至变色盛出',
      '爆香蒜末，炒蔬菜',
      '加入牛肉炒匀调味'
    ],
    tips: '牛肉逆纹切更嫩'
  },
  {
    id: 'recipe_010',
    title: '金枪鱼沙拉',
    emoji: '🐟',
    category: '午餐',
    calories: 350,
    protein: 25,
    fat: 15,
    carbs: 25,
    time: 10,
    difficulty: '简单',
    tags: ['高蛋白', '低脂', '快手'],
    ingredients: [
      { name: '水浸金枪鱼', amount: '100g' },
      { name: '生菜', amount: '100g' },
      { name: '小番茄', amount: '8个' },
      { name: '黄瓜', amount: '50g' },
      { name: '玉米粒', amount: '30g' },
    ],
    steps: [
      '生菜洗净撕成小块',
      '蔬菜切好备用',
      '金枪鱼沥干水分',
      '所有食材混合',
      '淋上油醋汁拌匀'
    ],
    tips: '可用希腊酸奶代替沙拉酱'
  },
  
  // ========== 晚餐 ==========
  {
    id: 'recipe_011',
    title: '蒜蓉蒸虾',
    emoji: '🦐',
    category: '晚餐',
    calories: 280,
    protein: 30,
    fat: 8,
    carbs: 15,
    time: 15,
    difficulty: '简单',
    tags: ['高蛋白', '低脂', '快手'],
    ingredients: [
      { name: '鲜虾', amount: '200g' },
      { name: '粉丝', amount: '30g' },
      { name: '蒜蓉', amount: '15g' },
      { name: '葱花', amount: '适量' },
      { name: '蒸鱼豉油', amount: '10ml' },
    ],
    steps: [
      '粉丝泡软铺在盘底',
      '虾去虾线摆在粉丝上',
      '铺上蒜蓉',
      '蒸8-10分钟',
      '淋豉油撒葱花'
    ],
    tips: '可淋热油激香'
  },
  {
    id: 'recipe_012',
    title: '清蒸鲈鱼',
    emoji: '🐟',
    category: '晚餐',
    calories: 220,
    protein: 26,
    fat: 10,
    carbs: 5,
    time: 20,
    difficulty: '中等',
    tags: ['高蛋白', '低脂', '清蒸'],
    ingredients: [
      { name: '鲈鱼', amount: '300g' },
      { name: '姜丝', amount: '10g' },
      { name: '葱丝', amount: '适量' },
      { name: '料酒', amount: '10ml' },
      { name: '蒸鱼豉油', amount: '15ml' },
    ],
    steps: [
      '鱼处理干净，划几刀',
      '抹料酒和少许盐腌制',
      '铺上姜丝蒸10分钟',
      '倒掉多余汤汁',
      '铺葱丝淋豉油，浇热油'
    ],
    tips: '水开后上锅蒸，肉质更嫩'
  },
  {
    id: 'recipe_013',
    title: '白灼菜心',
    emoji: '🥬',
    category: '晚餐',
    calories: 80,
    protein: 4,
    fat: 3,
    carbs: 12,
    time: 5,
    difficulty: '简单',
    tags: ['高纤维', '低脂', '快手'],
    ingredients: [
      { name: '菜心', amount: '200g' },
      { name: '蒜蓉', amount: '10g' },
      { name: '生抽', amount: '10ml' },
      { name: '蚝油', amount: '5ml' },
    ],
    steps: [
      '菜心洗净',
      '水开加少许油盐',
      '菜心焯水1分钟',
      '捞出摆盘',
      '淋上调好的酱汁'
    ],
    tips: '焯水时加油盐保持翠绿'
  },
  {
    id: 'recipe_014',
    title: '冬瓜虾仁汤',
    emoji: '🍲',
    category: '晚餐',
    calories: 120,
    protein: 15,
    fat: 3,
    carbs: 10,
    time: 15,
    difficulty: '简单',
    tags: ['低脂', '清淡', '饱腹'],
    ingredients: [
      { name: '冬瓜', amount: '200g' },
      { name: '虾仁', amount: '100g' },
      { name: '姜片', amount: '3片' },
      { name: '葱花', amount: '适量' },
    ],
    steps: [
      '冬瓜去皮切块',
      '锅中加水煮开',
      '放入冬瓜煮10分钟',
      '加入虾仁煮3分钟',
      '调味撒葱花出锅'
    ],
    tips: '冬瓜利尿消肿，适合晚餐'
  },
  {
    id: 'recipe_015',
    title: '凉拌黄瓜鸡丝',
    emoji: '🥒',
    category: '晚餐',
    calories: 200,
    protein: 22,
    fat: 8,
    carbs: 8,
    time: 15,
    difficulty: '简单',
    tags: ['高蛋白', '低脂', '凉拌'],
    ingredients: [
      { name: '鸡胸肉', amount: '120g' },
      { name: '黄瓜', amount: '1根' },
      { name: '胡萝卜', amount: '30g' },
      { name: '蒜末', amount: '10g' },
      { name: '香油', amount: '5ml' },
    ],
    steps: [
      '鸡胸肉煮熟撕成丝',
      '黄瓜切丝，胡萝卜切丝焯水',
      '所有食材放入碗中',
      '加入调料拌匀',
      '冷藏后更爽口'
    ],
    tips: '可加少许辣椒油提味'
  },
  
  // ========== 加餐/零食 ==========
  {
    id: 'recipe_016',
    title: '蛋白质能量球',
    emoji: '🟤',
    category: '加餐',
    calories: 120,
    protein: 8,
    fat: 6,
    carbs: 12,
    time: 15,
    difficulty: '简单',
    tags: ['高蛋白', '便携', '无糖'],
    ingredients: [
      { name: '燕麦片', amount: '50g' },
      { name: '蛋白粉', amount: '20g' },
      { name: '花生酱', amount: '20g' },
      { name: '蜂蜜', amount: '10g' },
    ],
    steps: [
      '所有材料混合',
      '揉成小球',
      '冷藏30分钟定型',
      '可保存一周'
    ],
    tips: '可加入可可粉做成巧克力味'
  },
  {
    id: 'recipe_017',
    title: '希腊酸奶冻',
    emoji: '🍦',
    category: '加餐',
    calories: 150,
    protein: 12,
    fat: 4,
    carbs: 18,
    time: 180,
    difficulty: '简单',
    tags: ['高蛋白', '低糖', '甜品'],
    ingredients: [
      { name: '希腊酸奶', amount: '200g' },
      { name: '蓝莓', amount: '50g' },
      { name: '蜂蜜', amount: '10g' },
    ],
    steps: [
      '酸奶加入蜂蜜拌匀',
      '放入容器',
      '加入蓝莓',
      '冷冻3小时',
      '稍微回温后食用'
    ],
    tips: '可用香蕉泥代替蜂蜜'
  },
  {
    id: 'recipe_018',
    title: '自制坚果棒',
    emoji: '🥜',
    category: '加餐',
    calories: 180,
    protein: 6,
    fat: 12,
    carbs: 14,
    time: 30,
    difficulty: '中等',
    tags: ['健康脂肪', '高纤维', '便携'],
    ingredients: [
      { name: '燕麦片', amount: '60g' },
      { name: '混合坚果', amount: '40g' },
      { name: '蜂蜜', amount: '30g' },
      { name: '椰子油', amount: '15g' },
    ],
    steps: [
      '坚果切碎',
      '与燕麦混合',
      '加入蜂蜜和椰子油拌匀',
      '压入烤盘',
      '180°C烤15分钟'
    ],
    tips: '可加入蔓越莓干增加风味'
  },
  
  // ========== 减脂餐 ==========
  {
    id: 'recipe_019',
    title: '低卡魔芋面',
    emoji: '🍜',
    category: '减脂',
    calories: 80,
    protein: 5,
    fat: 2,
    carbs: 12,
    time: 10,
    difficulty: '简单',
    tags: ['超低卡', '高饱腹', '代餐'],
    ingredients: [
      { name: '魔芋面', amount: '200g' },
      { name: '黄瓜', amount: '50g' },
      { name: '胡萝卜', amount: '30g' },
      { name: '醋', amount: '10ml' },
      { name: '生抽', amount: '5ml' },
    ],
    steps: [
      '魔芋面冲洗去碱味',
      '焯水2分钟',
      '蔬菜切丝',
      '所有食材混合',
      '加调料拌匀即可'
    ],
    tips: '可加入鸡丝增加蛋白质'
  },
  {
    id: 'recipe_020',
    title: '无米寿司卷',
    emoji: '🍣',
    category: '减脂',
    calories: 150,
    protein: 12,
    fat: 8,
    carbs: 8,
    time: 20,
    difficulty: '中等',
    tags: ['低碳', '高蛋白', '创意'],
    ingredients: [
      { name: '花椰菜', amount: '150g' },
      { name: '鸡蛋', amount: '2个' },
      { name: '黄瓜', amount: '1根' },
      { name: '胡萝卜', amount: '1根' },
      { name: '海苔', amount: '2片' },
    ],
    steps: [
      '花椰菜打碎炒熟做"米饭"',
      '鸡蛋摊成蛋皮切丝',
      '蔬菜切条',
      '海苔上铺花椰菜',
      '放配料卷起来切段'
    ],
    tips: '可用烟熏三文鱼代替鸡蛋'
  },
  
  // ========== 增肌餐 ==========
  {
    id: 'recipe_021',
    title: '牛肉土豆泥',
    emoji: '🥩',
    category: '增肌',
    calories: 550,
    protein: 35,
    fat: 22,
    carbs: 48,
    time: 30,
    difficulty: '中等',
    tags: ['高蛋白', '高热量', '增肌'],
    ingredients: [
      { name: '牛肉末', amount: '150g' },
      { name: '土豆', amount: '200g' },
      { name: '洋葱', amount: '50g' },
      { name: '牛奶', amount: '50ml' },
      { name: '黄油', amount: '15g' },
    ],
    steps: [
      '土豆蒸熟压成泥',
      '加入牛奶黄油拌匀',
      '牛肉末炒香',
      '洋葱炒软',
      '所有食材混合即可'
    ],
    tips: '可加入芝士增加热量'
  },
  {
    id: 'recipe_022',
    title: '蛋白质松饼',
    emoji: '🥞',
    category: '增肌',
    calories: 400,
    protein: 30,
    fat: 12,
    carbs: 42,
    time: 15,
    difficulty: '简单',
    tags: ['高蛋白', '早餐', '增肌'],
    ingredients: [
      { name: '蛋白粉', amount: '30g' },
      { name: '燕麦粉', amount: '40g' },
      { name: '鸡蛋', amount: '1个' },
      { name: '牛奶', amount: '100ml' },
      { name: '香蕉', amount: '半根' },
    ],
    steps: [
      '所有材料放入搅拌机',
      '打成顺滑面糊',
      '平底锅抹油',
      '倒入面糊煎至两面金黄',
      '可淋上蜂蜜'
    ],
    tips: '可用花生酱代替蜂蜜'
  },
  
  // ========== 素食 ==========
  {
    id: 'recipe_023',
    title: '麻婆豆腐',
    emoji: '🧊',
    category: '素食',
    calories: 280,
    protein: 18,
    fat: 16,
    carbs: 15,
    time: 15,
    difficulty: '简单',
    tags: ['高蛋白', '植物蛋白', '下饭'],
    ingredients: [
      { name: '嫩豆腐', amount: '300g' },
      { name: '香菇', amount: '50g' },
      { name: '豆瓣酱', amount: '15g' },
      { name: '花椒粉', amount: '2g' },
      { name: '蒜末', amount: '10g' },
    ],
    steps: [
      '豆腐切块焯水',
      '香菇切丁',
      '爆香蒜末和豆瓣酱',
      '加入香菇炒香',
      '加入豆腐轻煮入味'
    ],
    tips: '可用素肉末代替香菇'
  },
  {
    id: 'recipe_024',
    title: '彩虹蔬菜碗',
    emoji: '🥗',
    category: '素食',
    calories: 350,
    protein: 12,
    fat: 18,
    carbs: 42,
    time: 20,
    difficulty: '简单',
    tags: ['高纤维', '抗氧化', '彩虹饮食'],
    ingredients: [
      { name: '藜麦', amount: '50g' },
      { name: '红薯', amount: '100g' },
      { name: '西兰花', amount: '50g' },
      { name: '紫甘蓝', amount: '30g' },
      { name: '鹰嘴豆', amount: '50g' },
    ],
    steps: [
      '藜麦煮熟',
      '红薯蒸熟切块',
      '西兰花焯水',
      '所有食材装碗',
      '淋油醋汁'
    ],
    tips: '食材颜色越丰富越好'
  },
  
  // ========== 饮品 ==========
  {
    id: 'recipe_025',
    title: '绿色排毒果昔',
    emoji: '🥤',
    category: '饮品',
    calories: 180,
    protein: 6,
    fat: 3,
    carbs: 32,
    time: 5,
    difficulty: '简单',
    tags: ['排毒', '高纤维', '早餐'],
    ingredients: [
      { name: '菠菜', amount: '30g' },
      { name: '香蕉', amount: '1根' },
      { name: '苹果', amount: '半个' },
      { name: '杏仁奶', amount: '200ml' },
    ],
    steps: [
      '所有食材洗净',
      '放入搅拌机',
      '打至顺滑',
      '立即饮用'
    ],
    tips: '可加生姜增加代谢'
  },
  {
    id: 'recipe_026',
    title: '蛋白质奶昔',
    emoji: '🥤',
    category: '饮品',
    calories: 250,
    protein: 25,
    fat: 6,
    carbs: 25,
    time: 3,
    difficulty: '简单',
    tags: ['高蛋白', '运动后', '快手'],
    ingredients: [
      { name: '蛋白粉', amount: '30g' },
      { name: '香蕉', amount: '1根' },
      { name: '牛奶', amount: '250ml' },
      { name: '冰块', amount: '适量' },
    ],
    steps: [
      '所有材料放入摇杯',
      '摇匀或搅拌',
      '加入冰块',
      '即可饮用'
    ],
    tips: '运动后30分钟内饮用最佳'
  },
];

// 获取食谱
function getAllRecipes() {
  return RECIPE_DATABASE;
}

// 按分类筛选
function getRecipesByCategory(category) {
  return RECIPE_DATABASE.filter(r => r.category === category);
}

// 搜索食谱
function searchRecipes(query) {
  return RECIPE_DATABASE.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
}

// 按标签筛选
function getRecipesByTag(tag) {
  return RECIPE_DATABASE.filter(r => r.tags.includes(tag));
}

// 按热量筛选
function getRecipesByCalories(maxCalories) {
  return RECIPE_DATABASE.filter(r => r.calories <= maxCalories);
}

// 获取推荐食谱
function getRecommendedRecipes() {
  return RECIPE_DATABASE.filter(r => 
    ['recipe_001', 'recipe_006', 'recipe_011', 'recipe_016'].includes(r.id)
  );
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RECIPE_DATABASE, getAllRecipes, getRecipesByCategory, searchRecipes, getRecipesByTag, getRecipesByCalories, getRecommendedRecipes };
}
