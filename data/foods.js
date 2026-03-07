/**
 * AMBROSE Health - 食物营养数据库
 * 参考薄荷健康，收录常见食物热量和营养信息
 */

const FOOD_DATABASE = {
  // ========== 主食类 ==========
  staples: [
    { id: 'rice_001', name: '米饭', emoji: '🍚', calories: 116, unit: '100g', protein: 2.6, fat: 0.3, carbs: 25.9, gi: '高' },
    { id: 'rice_002', name: '糙米饭', emoji: '🍙', calories: 111, unit: '100g', protein: 2.6, fat: 0.9, carbs: 23, gi: '中' },
    { id: 'noodle_001', name: '面条(煮)', emoji: '🍜', calories: 110, unit: '100g', protein: 4.4, fat: 0.2, carbs: 22.8, gi: '中' },
    { id: 'bread_001', name: '白面包', emoji: '🍞', calories: 265, unit: '100g', protein: 9, fat: 3.2, carbs: 49, gi: '高' },
    { id: 'bread_002', name: '全麦面包', emoji: '🥖', calories: 247, unit: '100g', protein: 13, fat: 3.4, carbs: 41, gi: '中' },
    { id: 'porridge_001', name: '白粥', emoji: '🥣', calories: 46, unit: '100g', protein: 1.1, fat: 0.1, carbs: 9.9, gi: '高' },
    { id: 'oat_001', name: '燕麦片', emoji: '🌾', calories: 389, unit: '100g', protein: 16.9, fat: 6.9, carbs: 66.9, gi: '低' },
    { id: 'corn_001', name: '玉米', emoji: '🌽', calories: 86, unit: '100g', protein: 3.2, fat: 1.2, carbs: 19, gi: '中' },
    { id: 'potato_001', name: '土豆(煮)', emoji: '🥔', calories: 87, unit: '100g', protein: 1.9, fat: 0.1, carbs: 20.1, gi: '中' },
    { id: 'sweetpotato_001', name: '红薯', emoji: '🍠', calories: 86, unit: '100g', protein: 1.6, fat: 0.1, carbs: 20.1, gi: '中' },
    { id: 'dumpling_001', name: '水饺', emoji: '🥟', calories: 220, unit: '100g', protein: 7, fat: 8, carbs: 30, gi: '中' },
    { id: 'baozi_001', name: '肉包子', emoji: '🥟', calories: 230, unit: '100g', protein: 7, fat: 9, carbs: 31, gi: '中' },
    { id: 'steamedbun_001', name: '馒头', emoji: '🥟', calories: 221, unit: '100g', protein: 7, fat: 1.1, carbs: 47, gi: '高' },
    { id: 'pancake_001', name: '煎饼', emoji: '🥞', calories: 290, unit: '100g', protein: 6, fat: 8, carbs: 48, gi: '高' },
    { id: 'congee_001', name: '皮蛋瘦肉粥', emoji: '🥣', calories: 55, unit: '100g', protein: 3, fat: 1.5, carbs: 8, gi: '中' },
  ],
  
  // ========== 肉类 ==========
  meat: [
    { id: 'chicken_001', name: '鸡胸肉', emoji: '🍗', calories: 165, unit: '100g', protein: 31, fat: 3.6, carbs: 0, tags: ['高蛋白', '低脂'] },
    { id: 'chicken_002', name: '鸡腿肉', emoji: '🍗', calories: 215, unit: '100g', protein: 26, fat: 11, carbs: 0, tags: ['高蛋白'] },
    { id: 'chicken_003', name: '鸡翅', emoji: '🍗', calories: 290, unit: '100g', protein: 27, fat: 19, carbs: 0, tags: [] },
    { id: 'beef_001', name: '牛肉(瘦)', emoji: '🥩', calories: 250, unit: '100g', protein: 26, fat: 15, carbs: 0, tags: ['高蛋白', '高铁'] },
    { id: 'beef_002', name: '牛排', emoji: '🥩', calories: 271, unit: '100g', protein: 26, fat: 19, carbs: 0, tags: ['高蛋白'] },
    { id: 'pork_001', name: '猪肉(瘦)', emoji: '🥓', calories: 143, unit: '100g', protein: 26, fat: 3.5, carbs: 0, tags: ['高蛋白'] },
    { id: 'pork_002', name: '五花肉', emoji: '🥓', calories: 349, unit: '100g', protein: 13, fat: 35, carbs: 0, tags: [] },
    { id: 'lamb_001', name: '羊肉', emoji: '🍖', calories: 294, unit: '100g', protein: 25, fat: 21, carbs: 0, tags: ['高蛋白'] },
    { id: 'fish_001', name: '三文鱼', emoji: '🐟', calories: 208, unit: '100g', protein: 20, fat: 13, carbs: 0, tags: ['高蛋白', 'Omega-3'] },
    { id: 'fish_002', name: '鳕鱼', emoji: '🐟', calories: 82, unit: '100g', protein: 18, fat: 0.7, carbs: 0, tags: ['高蛋白', '低脂'] },
    { id: 'fish_003', name: '金枪鱼', emoji: '🐟', calories: 132, unit: '100g', protein: 28, fat: 1, carbs: 0, tags: ['高蛋白', '低脂'] },
    { id: 'shrimp_001', name: '虾', emoji: '🦐', calories: 106, unit: '100g', protein: 24, fat: 0.5, carbs: 0, tags: ['高蛋白', '低脂'] },
    { id: 'egg_001', name: '鸡蛋(煮)', emoji: '🥚', calories: 155, unit: '100g', protein: 13, fat: 11, carbs: 1.1, tags: ['高蛋白'] },
    { id: 'egg_002', name: '鸡蛋白', emoji: '🥚', calories: 52, unit: '100g', protein: 11, fat: 0.2, carbs: 0.7, tags: ['高蛋白', '低脂'] },
    { id: 'egg_003', name: '鸡蛋黄', emoji: '🥚', calories: 322, unit: '100g', protein: 16, fat: 27, carbs: 3.6, tags: [] },
    { id: 'duck_001', name: '鸭肉', emoji: '🦆', calories: 337, unit: '100g', protein: 19, fat: 28, carbs: 0, tags: [] },
    { id: 'bacon_001', name: '培根', emoji: '🥓', calories: 541, unit: '100g', protein: 37, fat: 42, carbs: 1.4, tags: ['高蛋白'] },
    { id: 'sausage_001', name: '香肠', emoji: '🌭', calories: 346, unit: '100g', protein: 14, fat: 31, carbs: 2, tags: [] },
    { id: 'ham_001', name: '火腿', emoji: '🍖', calories: 163, unit: '100g', protein: 16, fat: 9, carbs: 3, tags: ['高蛋白'] },
  ],
  
  // ========== 蔬菜类 ==========
  vegetables: [
    { id: 'broccoli_001', name: '西兰花', emoji: '🥦', calories: 34, unit: '100g', protein: 2.8, fat: 0.4, carbs: 7, fiber: 2.6, tags: ['高纤维', '维生素C'] },
    { id: 'spinach_001', name: '菠菜', emoji: '🥬', calories: 23, unit: '100g', protein: 2.9, fat: 0.4, carbs: 3.6, fiber: 2.2, tags: ['高铁', '高纤维'] },
    { id: 'carrot_001', name: '胡萝卜', emoji: '🥕', calories: 41, unit: '100g', protein: 0.9, fat: 0.2, carbs: 9.6, fiber: 2.8, tags: ['维生素A'] },
    { id: 'tomato_001', name: '番茄', emoji: '🍅', calories: 18, unit: '100g', protein: 0.9, fat: 0.2, carbs: 3.9, fiber: 1.2, tags: ['维生素C', '番茄红素'] },
    { id: 'cucumber_001', name: '黄瓜', emoji: '🥒', calories: 15, unit: '100g', protein: 0.7, fat: 0.1, carbs: 3.6, fiber: 0.5, tags: ['低卡', '补水'] },
    { id: 'lettuce_001', name: '生菜', emoji: '🥬', calories: 15, unit: '100g', protein: 1.4, fat: 0.2, carbs: 2.9, fiber: 1.3, tags: ['低卡'] },
    { id: 'cabbage_001', name: '卷心菜', emoji: '🥬', calories: 25, unit: '100g', protein: 1.3, fat: 0.1, carbs: 6, fiber: 2.5, tags: ['高纤维'] },
    { id: 'celery_001', name: '芹菜', emoji: '🥬', calories: 14, unit: '100g', protein: 0.7, fat: 0.2, carbs: 3, fiber: 2.1, tags: ['低卡', '高纤维'] },
    { id: 'mushroom_001', name: '蘑菇', emoji: '🍄', calories: 22, unit: '100g', protein: 3.1, fat: 0.3, carbs: 3.3, fiber: 1, tags: ['高蛋白(蔬菜中)'] },
    { id: 'onion_001', name: '洋葱', emoji: '🧅', calories: 40, unit: '100g', protein: 1.1, fat: 0.1, carbs: 9, fiber: 1.7, tags: [] },
    { id: 'pepper_001', name: '青椒', emoji: '🫑', calories: 20, unit: '100g', protein: 0.9, fat: 0.2, carbs: 4.6, fiber: 1.7, tags: ['维生素C'] },
    { id: 'eggplant_001', name: '茄子', emoji: '🍆', calories: 25, unit: '100g', protein: 1, fat: 0.2, carbs: 6, fiber: 3, tags: ['高纤维'] },
    { id: 'pumpkin_001', name: '南瓜', emoji: '🎃', calories: 26, unit: '100g', protein: 1, fat: 0.1, carbs: 6.5, fiber: 0.5, tags: ['维生素A'] },
    { id: 'cornveg_001', name: '甜玉米', emoji: '🌽', calories: 86, unit: '100g', protein: 3.2, fat: 1.2, carbs: 19, fiber: 2.7, tags: [] },
    { id: 'peas_001', name: '豌豆', emoji: '🫛', calories: 81, unit: '100g', protein: 5.4, fat: 0.4, carbs: 14, fiber: 5.1, tags: ['高蛋白', '高纤维'] },
    { id: 'bean_001', name: '四季豆', emoji: '🫘', calories: 31, unit: '100g', protein: 1.8, fat: 0.1, carbs: 7, fiber: 2.7, tags: ['高纤维'] },
    { id: 'asparagus_001', name: '芦笋', emoji: '🥬', calories: 20, unit: '100g', protein: 2.2, fat: 0.1, carbs: 3.9, fiber: 2.1, tags: ['低卡'] },
    { id: 'cauliflower_001', name: '花椰菜', emoji: '🥦', calories: 25, unit: '100g', protein: 1.9, fat: 0.3, carbs: 5, fiber: 2, tags: ['高纤维'] },
    { id: 'kale_001', name: '羽衣甘蓝', emoji: '🥬', calories: 49, unit: '100g', protein: 4.3, fat: 0.9, carbs: 9, fiber: 3.6, tags: ['超级食物'] },
  ],
  
  // ========== 水果类 ==========
  fruits: [
    { id: 'apple_001', name: '苹果', emoji: '🍎', calories: 52, unit: '100g', protein: 0.3, fat: 0.2, carbs: 14, sugar: 10, fiber: 2.4, gi: '低', tags: [] },
    { id: 'banana_001', name: '香蕉', emoji: '🍌', calories: 89, unit: '100g', protein: 1.1, fat: 0.3, carbs: 23, sugar: 12, fiber: 2.6, gi: '中', tags: ['高钾'] },
    { id: 'orange_001', name: '橙子', emoji: '🍊', calories: 47, unit: '100g', protein: 0.9, fat: 0.1, carbs: 12, sugar: 9, fiber: 2.4, gi: '低', tags: ['维生素C'] },
    { id: 'grape_001', name: '葡萄', emoji: '🍇', calories: 62, unit: '100g', protein: 0.6, fat: 0.2, carbs: 16, sugar: 15, fiber: 0.9, gi: '中', tags: ['抗氧化'] },
    { id: 'strawberry_001', name: '草莓', emoji: '🍓', calories: 32, unit: '100g', protein: 0.7, fat: 0.3, carbs: 7.7, sugar: 4.9, fiber: 2, gi: '低', tags: ['低卡', '维生素C'] },
    { id: 'blueberry_001', name: '蓝莓', emoji: '🫐', calories: 57, unit: '100g', protein: 0.7, fat: 0.3, carbs: 14, sugar: 10, fiber: 2.4, gi: '低', tags: ['抗氧化', '护眼'] },
    { id: 'watermelon_001', name: '西瓜', emoji: '🍉', calories: 30, unit: '100g', protein: 0.6, fat: 0.2, carbs: 8, sugar: 6, fiber: 0.4, gi: '高', tags: ['补水', '低卡'] },
    { id: 'mango_001', name: '芒果', emoji: '🥭', calories: 60, unit: '100g', protein: 0.8, fat: 0.4, carbs: 15, sugar: 14, fiber: 1.6, gi: '中', tags: ['维生素A'] },
    { id: 'pineapple_001', name: '菠萝', emoji: '🍍', calories: 50, unit: '100g', protein: 0.5, fat: 0.1, carbs: 13, sugar: 10, fiber: 1.4, gi: '中', tags: ['助消化'] },
    { id: 'peach_001', name: '桃子', emoji: '🍑', calories: 39, unit: '100g', protein: 0.9, fat: 0.3, carbs: 10, sugar: 8, fiber: 1.5, gi: '低', tags: [] },
    { id: 'pear_001', name: '梨', emoji: '🍐', calories: 57, unit: '100g', protein: 0.4, fat: 0.1, carbs: 15, sugar: 10, fiber: 3.1, gi: '低', tags: ['高纤维'] },
    { id: 'kiwi_001', name: '猕猴桃', emoji: '🥝', calories: 61, unit: '100g', protein: 1.1, fat: 0.5, carbs: 15, sugar: 9, fiber: 3, gi: '低', tags: ['维生素C'] },
    { id: 'cherry_001', name: '樱桃', emoji: '🍒', calories: 50, unit: '100g', protein: 1.1, fat: 0.2, carbs: 12, sugar: 8, fiber: 1.6, gi: '低', tags: ['抗氧化'] },
    { id: 'lemon_001', name: '柠檬', emoji: '🍋', calories: 29, unit: '100g', protein: 1.1, fat: 0.3, carbs: 9, sugar: 2.5, fiber: 2.8, gi: '低', tags: ['维生素C'] },
    { id: 'avocado_001', name: '牛油果', emoji: '🥑', calories: 160, unit: '100g', protein: 2, fat: 15, carbs: 9, sugar: 0.7, fiber: 7, gi: '低', tags: ['健康脂肪'] },
    { id: 'coconut_001', name: '椰子肉', emoji: '🥥', calories: 354, unit: '100g', protein: 3.3, fat: 33, carbs: 15, sugar: 6, fiber: 9, gi: '低', tags: ['高纤维'] },
    { id: 'dragonfruit_001', name: '火龙果', emoji: '🐉', calories: 57, unit: '100g', protein: 1.1, fat: 0.4, carbs: 13, sugar: 10, fiber: 3, gi: '低', tags: ['高纤维'] },
    { id: 'pomegranate_001', name: '石榴', emoji: '🍎', calories: 83, unit: '100g', protein: 1.7, fat: 1.2, carbs: 19, sugar: 14, fiber: 4, gi: '低', tags: ['抗氧化'] },
    { id: 'papaya_001', name: '木瓜', emoji: '🥭', calories: 43, unit: '100g', protein: 0.5, fat: 0.3, carbs: 11, sugar: 8, fiber: 1.7, gi: '中', tags: ['助消化'] },
  ],
  
  // ========== 豆制品 ==========
  soy: [
    { id: 'tofu_001', name: '豆腐(北)', emoji: '🧊', calories: 98, unit: '100g', protein: 12, fat: 5, carbs: 1.9, tags: ['高蛋白', '植物蛋白'] },
    { id: 'tofu_002', name: '豆腐(南)', emoji: '🧊', calories: 57, unit: '100g', protein: 6, fat: 3, carbs: 2.7, tags: ['植物蛋白'] },
    { id: 'tofu_003', name: '豆腐干', emoji: '🧊', calories: 140, unit: '100g', protein: 16, fat: 7, carbs: 4, tags: ['高蛋白'] },
    { id: 'tofu_004', name: '油豆腐', emoji: '🧊', calories: 245, unit: '100g', protein: 17, fat: 17, carbs: 5, tags: ['高蛋白'] },
    { id: 'soymilk_001', name: '豆浆(无糖)', emoji: '🥛', calories: 31, unit: '100ml', protein: 3, fat: 1.6, carbs: 1.8, tags: ['植物蛋白'] },
    { id: 'soymilk_002', name: '豆浆(甜)', emoji: '🥛', calories: 45, unit: '100ml', protein: 2.9, fat: 1.5, carbs: 5, tags: ['植物蛋白'] },
    { id: 'yuba_001', name: '腐竹', emoji: '🧈', calories: 460, unit: '100g', protein: 44, fat: 21, carbs: 22, tags: ['高蛋白'] },
    { id: 'natto_001', name: '纳豆', emoji: '🫘', calories: 212, unit: '100g', protein: 17, fat: 11, carbs: 14, tags: ['益生菌', '高蛋白'] },
    { id: 'tempeh_001', name: '天贝', emoji: '🫘', calories: 193, unit: '100g', protein: 19, fat: 11, carbs: 9, tags: ['植物蛋白', '益生菌'] },
    { id: 'edamame_001', name: '毛豆', emoji: '🫛', calories: 131, unit: '100g', protein: 11, fat: 5, carbs: 10, tags: ['植物蛋白'] },
  ],
  
  // ========== 乳制品 ==========
  dairy: [
    { id: 'milk_001', name: '牛奶(全脂)', emoji: '🥛', calories: 61, unit: '100ml', protein: 3.2, fat: 3.3, carbs: 4.8, tags: ['高蛋白', '高钙'] },
    { id: 'milk_002', name: '牛奶(低脂)', emoji: '🥛', calories: 42, unit: '100ml', protein: 3.4, fat: 1, carbs: 5, tags: ['高蛋白', '高钙'] },
    { id: 'milk_003', name: '牛奶(脱脂)', emoji: '🥛', calories: 34, unit: '100ml', protein: 3.4, fat: 0.1, carbs: 5, tags: ['高蛋白', '高钙'] },
    { id: 'yogurt_001', name: '酸奶(原味)', emoji: '🥣', calories: 59, unit: '100g', protein: 10, fat: 0.4, carbs: 3.6, tags: ['高蛋白', '益生菌'] },
    { id: 'yogurt_002', name: '酸奶(风味)', emoji: '🥣', calories: 97, unit: '100g', protein: 3.5, fat: 3, carbs: 14, tags: ['益生菌'] },
    { id: 'cheese_001', name: '奶酪片', emoji: '🧀', calories: 350, unit: '100g', protein: 25, fat: 26, carbs: 2, tags: ['高蛋白', '高钙'] },
    { id: 'cheese_002', name: '奶油奶酪', emoji: '🧀', calories: 342, unit: '100g', protein: 6, fat: 34, carbs: 4, tags: [] },
    { id: 'butter_001', name: '黄油', emoji: '🧈', calories: 717, unit: '100g', protein: 0.9, fat: 81, carbs: 0.1, tags: [] },
    { id: 'cream_001', name: '淡奶油', emoji: '🥛', calories: 345, unit: '100ml', protein: 2, fat: 37, carbs: 3, tags: [] },
    { id: 'icecream_001', name: '冰淇淋', emoji: '🍦', calories: 207, unit: '100g', protein: 3.5, fat: 11, carbs: 24, tags: [] },
  ],
  
  // ========== 坚果种子 ==========
  nuts: [
    { id: 'almond_001', name: '杏仁', emoji: '🥜', calories: 579, unit: '100g', protein: 21, fat: 50, carbs: 22, fiber: 12.5, tags: ['高蛋白', '健康脂肪'] },
    { id: 'walnut_001', name: '核桃', emoji: '🥜', calories: 654, unit: '100g', protein: 15, fat: 65, carbs: 14, fiber: 6.7, tags: ['Omega-3', '健脑'] },
    { id: 'cashew_001', name: '腰果', emoji: '🥜', calories: 553, unit: '100g', protein: 18, fat: 44, carbs: 30, fiber: 3.3, tags: ['高蛋白'] },
    { id: 'peanut_001', name: '花生', emoji: '🥜', calories: 567, unit: '100g', protein: 26, fat: 49, carbs: 16, fiber: 8.5, tags: ['高蛋白'] },
    { id: 'pistachio_001', name: '开心果', emoji: '🥜', calories: 560, unit: '100g', protein: 20, fat: 45, carbs: 28, fiber: 10, tags: ['高蛋白'] },
    { id: 'pumpkinseed_001', name: '南瓜子', emoji: '🎃', calories: 559, unit: '100g', protein: 30, fat: 49, carbs: 11, fiber: 6, tags: ['高蛋白', '高锌'] },
    { id: 'sunflowerseed_001', name: '葵花籽', emoji: '🌻', calories: 584, unit: '100g', protein: 21, fat: 51, carbs: 20, fiber: 8.6, tags: ['高蛋白'] },
    { id: 'chia_001', name: '奇亚籽', emoji: '🌱', calories: 486, unit: '100g', protein: 17, fat: 31, carbs: 42, fiber: 34, tags: ['超级食物', '高纤维'] },
    { id: 'flaxseed_001', name: '亚麻籽', emoji: '🌱', calories: 534, unit: '100g', protein: 18, fat: 42, carbs: 29, fiber: 27, tags: ['Omega-3', '高纤维'] },
    { id: 'sesame_001', name: '芝麻', emoji: '🫘', calories: 573, unit: '100g', protein: 18, fat: 50, carbs: 23, fiber: 12, tags: ['高钙'] },
  ],
  
  // ========== 饮品类 ==========
  drinks: [
    { id: 'water_001', name: '水', emoji: '💧', calories: 0, unit: '100ml', protein: 0, fat: 0, carbs: 0, tags: ['零卡'] },
    { id: 'tea_001', name: '绿茶', emoji: '🍵', calories: 1, unit: '100ml', protein: 0, fat: 0, carbs: 0.2, tags: ['零卡', '抗氧化'] },
    { id: 'tea_002', name: '红茶', emoji: '🍵', calories: 1, unit: '100ml', protein: 0, fat: 0, carbs: 0.3, tags: ['零卡'] },
    { id: 'coffee_001', name: '黑咖啡', emoji: '☕', calories: 2, unit: '100ml', protein: 0.1, fat: 0, carbs: 0, tags: ['零卡', '提神'] },
    { id: 'coffee_002', name: '拿铁', emoji: '☕', calories: 44, unit: '100ml', protein: 2.3, fat: 2, carbs: 4, tags: [] },
    { id: 'cola_001', name: '可乐', emoji: '🥤', calories: 42, unit: '100ml', protein: 0, fat: 0, carbs: 10.6, sugar: 10.6, tags: [] },
    { id: 'cola_002', name: '零度可乐', emoji: '🥤', calories: 0, unit: '100ml', protein: 0, fat: 0, carbs: 0, tags: ['零卡'] },
    { id: 'juice_001', name: '橙汁', emoji: '🧃', calories: 45, unit: '100ml', protein: 0.7, fat: 0.2, carbs: 10, sugar: 8, tags: ['维生素C'] },
    { id: 'juice_002', name: '苹果汁', emoji: '🧃', calories: 46, unit: '100ml', protein: 0.1, fat: 0.1, carbs: 11, sugar: 10, tags: [] },
    { id: 'beer_001', name: '啤酒', emoji: '🍺', calories: 43, unit: '100ml', protein: 0.5, fat: 0, carbs: 3.6, tags: [] },
    { id: 'wine_001', name: '红酒', emoji: '🍷', calories: 85, unit: '100ml', protein: 0.1, fat: 0, carbs: 2.6, tags: ['抗氧化'] },
    { id: 'smoothie_001', name: '奶昔', emoji: '🥤', calories: 80, unit: '100ml', protein: 3, fat: 2, carbs: 13, tags: [] },
    { id: 'coconutwater_001', name: '椰子水', emoji: '🥥', calories: 19, unit: '100ml', protein: 0.7, fat: 0.2, carbs: 3.7, tags: ['补水', '低卡'] },
    { id: 'energy_001', name: '运动饮料', emoji: '🥤', calories: 26, unit: '100ml', protein: 0, fat: 0, carbs: 6.5, tags: ['电解质'] },
    { id: 'kombucha_001', name: '康普茶', emoji: '🍵', calories: 16, unit: '100ml', protein: 0, fat: 0, carbs: 4, tags: ['益生菌'] },
  ],
  
  // ========== 零食/加工食品 ==========
  snacks: [
    { id: 'chocolate_001', name: '黑巧克力(70%)', emoji: '🍫', calories: 598, unit: '100g', protein: 7.8, fat: 43, carbs: 46, sugar: 24, tags: ['抗氧化'] },
    { id: 'chocolate_002', name: '牛奶巧克力', emoji: '🍫', calories: 535, unit: '100g', protein: 7.7, fat: 30, carbs: 59, sugar: 52, tags: [] },
    { id: 'cookie_001', name: '曲奇饼干', emoji: '🍪', calories: 502, unit: '100g', protein: 7, fat: 25, carbs: 64, sugar: 30, tags: [] },
    { id: 'chip_001', name: '薯片', emoji: '🥔', calories: 536, unit: '100g', protein: 7, fat: 35, carbs: 53, sugar: 0.3, tags: [] },
    { id: 'popcorn_001', name: '爆米花(原味)', emoji: '🍿', calories: 387, unit: '100g', protein: 13, fat: 4.5, carbs: 78, fiber: 15, tags: ['高纤维'] },
    { id: 'popcorn_002', name: '爆米花(黄油)', emoji: '🍿', calories: 500, unit: '100g', protein: 9, fat: 28, carbs: 58, tags: [] },
    { id: 'cracker_001', name: '苏打饼干', emoji: '🍘', calories: 418, unit: '100g', protein: 9, fat: 11, carbs: 70, tags: [] },
    { id: 'jerky_001', name: '牛肉干', emoji: '🥩', calories: 410, unit: '100g', protein: 33, fat: 26, carbs: 11, tags: ['高蛋白'] },
    { id: 'seaweed_001', name: '海苔', emoji: '🍘', calories: 35, unit: '100g', protein: 5.8, fat: 0.3, carbs: 5.1, tags: ['低卡', '高碘'] },
    { id: 'raisin_001', name: '葡萄干', emoji: '🍇', calories: 299, unit: '100g', protein: 3.1, fat: 0.5, carbs: 79, sugar: 59, fiber: 3.7, tags: ['高能量'] },
    { id: 'proteinbar_001', name: '蛋白棒', emoji: '🍫', calories: 350, unit: '100g', protein: 25, fat: 12, carbs: 35, sugar: 15, tags: ['高蛋白', '便携'] },
    { id: 'energybar_001', name: '能量棒', emoji: '🍫', calories: 450, unit: '100g', protein: 10, fat: 15, carbs: 70, sugar: 30, tags: ['高能量'] },
    { id: 'candy_001', name: '糖果', emoji: '🍬', calories: 400, unit: '100g', protein: 0, fat: 0, carbs: 100, sugar: 80, tags: [] },
    { id: 'cake_001', name: '蛋糕', emoji: '🍰', calories: 371, unit: '100g', protein: 3.5, fat: 15, carbs: 53, sugar: 36, tags: [] },
    { id: 'donut_001', name: '甜甜圈', emoji: '🍩', calories: 452, unit: '100g', protein: 4.9, fat: 25, carbs: 51, sugar: 27, tags: [] },
  ],
  
  // ========== 调味品 ==========
  condiments: [
    { id: 'sugar_001', name: '白砂糖', emoji: '🍬', calories: 387, unit: '100g', protein: 0, fat: 0, carbs: 100, sugar: 100, tags: [] },
    { id: 'honey_001', name: '蜂蜜', emoji: '🍯', calories: 304, unit: '100g', protein: 0.3, fat: 0, carbs: 82, sugar: 82, tags: ['天然'] },
    { id: 'syrup_001', name: '枫糖浆', emoji: '🍁', calories: 260, unit: '100g', protein: 0, fat: 0.1, carbs: 67, sugar: 60, tags: ['天然'] },
    { id: 'salt_001', name: '盐', emoji: '🧂', calories: 0, unit: '100g', protein: 0, fat: 0, carbs: 0, tags: ['钠'] },
    { id: 'soysauce_001', name: '酱油', emoji: '🍶', calories: 53, unit: '100ml', protein: 3.5, fat: 0, carbs: 5, tags: ['钠'] },
    { id: 'vinegar_001', name: '醋', emoji: '🍶', calories: 21, unit: '100ml', protein: 0, fat: 0, carbs: 0.9, tags: [] },
    { id: 'oil_001', name: '橄榄油', emoji: '🫒', calories: 884, unit: '100ml', protein: 0, fat: 100, carbs: 0, tags: ['健康脂肪'] },
    { id: 'oil_002', name: '菜籽油', emoji: '🌻', calories: 884, unit: '100ml', protein: 0, fat: 100, carbs: 0, tags: [] },
    { id: 'ketchup_001', name: '番茄酱', emoji: '🍅', calories: 112, unit: '100g', protein: 1.5, fat: 0.2, carbs: 26, sugar: 22, tags: ['番茄红素'] },
    { id: 'mustard_001', name: '芥末酱', emoji: '🌭', calories: 66, unit: '100g', protein: 4.3, fat: 4, carbs: 5, tags: [] },
    { id: 'mayo_001', name: '蛋黄酱', emoji: '🥚', calories: 680, unit: '100g', protein: 1, fat: 75, carbs: 1, tags: [] },
    { id: 'jam_001', name: '果酱', emoji: '🍓', calories: 278, unit: '100g', protein: 0.4, fat: 0.1, carbs: 69, sugar: 48, tags: [] },
    { id: 'peanutbutter_001', name: '花生酱', emoji: '🥜', calories: 588, unit: '100g', protein: 25, fat: 50, carbs: 20, fiber: 6, tags: ['高蛋白'] },
    { id: 'salsa_001', name: '莎莎酱', emoji: '🌶️', calories: 36, unit: '100g', protein: 1.5, fat: 0.2, carbs: 7, tags: ['低卡'] },
    { id: 'wasabi_001', name: '芥末', emoji: '🌿', calories: 109, unit: '100g', protein: 2.2, fat: 2.2, carbs: 23, tags: [] },
  ],
  
  // ========== 海鲜类 ==========
  seafood: [
    { id: 'crab_001', name: '螃蟹', emoji: '🦀', calories: 97, unit: '100g', protein: 19, fat: 1.5, carbs: 0, tags: ['高蛋白', '低脂'] },
    { id: 'lobster_001', name: '龙虾', emoji: '🦞', calories: 89, unit: '100g', protein: 19, fat: 0.9, carbs: 0, tags: ['高蛋白', '低脂'] },
    { id: 'oyster_001', name: '生蚝', emoji: '🦪', calories: 81, unit: '100g', protein: 9.5, fat: 3, carbs: 4.2, tags: ['高锌'] },
    { id: 'scallop_001', name: '扇贝', emoji: '🐚', calories: 111, unit: '100g', protein: 20, fat: 1.1, carbs: 2.4, tags: ['高蛋白', '低脂'] },
    { id: 'squid_001', name: '鱿鱼', emoji: '🦑', calories: 92, unit: '100g', protein: 15.6, fat: 1.4, carbs: 3.1, tags: ['高蛋白'] },
    { id: 'octopus_001', name: '章鱼', emoji: '🐙', calories: 82, unit: '100g', protein: 15, fat: 1, carbs: 2.2, tags: ['高蛋白'] },
    { id: 'mussel_001', name: '青口贝', emoji: '🦪', calories: 172, unit: '100g', protein: 24, fat: 4.5, carbs: 7.4, tags: ['高蛋白'] },
    { id: 'clam_001', name: '蛤蜊', emoji: '🐚', calories: 74, unit: '100g', protein: 12.8, fat: 0.8, carbs: 2.6, tags: ['高蛋白'] },
    { id: 'crayfish_001', name: '小龙虾', emoji: '🦞', calories: 90, unit: '100g', protein: 16, fat: 1.5, carbs: 0, tags: ['高蛋白'] },
    { id: 'eel_001', name: '鳗鱼', emoji: '🐍', calories: 236, unit: '100g', protein: 23, fat: 15, carbs: 0, tags: ['高蛋白'] },
    { id: 'sardine_001', name: '沙丁鱼', emoji: '🐟', calories: 208, unit: '100g', protein: 25, fat: 11, carbs: 0, tags: ['高蛋白', '高钙'] },
    { id: 'anchovy_001', name: '凤尾鱼', emoji: '🐟', calories: 210, unit: '100g', protein: 29, fat: 9.7, carbs: 0, tags: ['高蛋白'] },
    { id: 'mackerel_001', name: '鲭鱼', emoji: '🐟', calories: 305, unit: '100g', protein: 19, fat: 26, carbs: 0, tags: ['Omega-3'] },
    { id: 'herring_001', name: '鲱鱼', emoji: '🐟', calories: 158, unit: '100g', protein: 18, fat: 9, carbs: 0, tags: ['Omega-3'] },
    { id: 'trout_001', name: '鳟鱼', emoji: '🐟', calories: 148, unit: '100g', protein: 21, fat: 6.6, carbs: 0, tags: ['高蛋白'] },
  ],
};

// 搜索食物函数
function searchFoods(query, category = null) {
  const results = [];
  const categories = category ? [category] : Object.keys(FOOD_DATABASE);
  
  categories.forEach(cat => {
    if (FOOD_DATABASE[cat]) {
      FOOD_DATABASE[cat].forEach(food => {
        if (food.name.toLowerCase().includes(query.toLowerCase()) ||
            food.id.toLowerCase().includes(query.toLowerCase())) {
          results.push({ ...food, category: cat });
        }
      });
    }
  });
  
  return results;
}

// 按分类获取食物
function getFoodsByCategory(category) {
  return FOOD_DATABASE[category] || [];
}

// 获取所有食物
function getAllFoods() {
  const all = [];
  Object.keys(FOOD_DATABASE).forEach(cat => {
    FOOD_DATABASE[cat].forEach(food => {
      all.push({ ...food, category: cat });
    });
  });
  return all;
}

// 计算食物热量
function calculateCalories(foodId, amount) {
  const food = getAllFoods().find(f => f.id === foodId);
  if (!food) return 0;
  return Math.round((food.calories * amount) / 100);
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FOOD_DATABASE, searchFoods, getFoodsByCategory, getAllFoods, calculateCalories };
}
