/**
 * AMBROSE Health - 健身课程库
 * 参考Keep，收录完整训练课程
 */

const COURSE_DATABASE = [
  // ========== 入门课程 ==========
  {
    id: 'course_001',
    title: '零基础适应性训练',
    subtitle: '唤醒身体，建立运动习惯',
    category: '入门',
    level: 'K1',
    duration: 15,
    calories: 80,
    image: '🌅',
    tags: ['零基础', '全身', '低强度'],
    description: '适合从未运动过的人群，低强度动作帮助你逐渐适应运动节奏',
    exercises: [
      { name: '颈部环绕', duration: 30 },
      { name: '肩部环绕', duration: 30 },
      { name: '开合跳', duration: 45 },
      { name: '原地慢跑', duration: 60 },
      { name: '标准俯卧撑', reps: 5 },
      { name: '深蹲', reps: 10 },
      { name: '婴儿式', duration: 30 },
    ],
    schedule: '每天1次，连续7天'
  },
  {
    id: 'course_002',
    title: '7天减脂入门',
    subtitle: '科学燃脂，健康瘦身',
    category: '入门',
    level: 'K1',
    duration: 20,
    calories: 120,
    image: '🔥',
    tags: ['减脂', '有氧', '全身'],
    description: '低强度有氧运动组合，适合体重基数较大或运动新手',
    exercises: [
      { name: '热身-开合跳', duration: 60 },
      { name: '高抬腿', duration: 45 },
      { name: '原地快跑', duration: 60 },
      { name: '休息', duration: 30 },
      { name: '踢臀跑', duration: 45 },
      { name: '深蹲', reps: 15 },
      { name: '平板支撑', duration: 20 },
      { name: '拉伸-婴儿式', duration: 60 },
    ],
    schedule: '每天1次，连续7天'
  },
  {
    id: 'course_003',
    title: '晨间唤醒瑜伽',
    subtitle: '开启活力满满的一天',
    category: '入门',
    level: 'K1',
    duration: 12,
    calories: 50,
    image: '🧘',
    tags: ['瑜伽', '拉伸', '放松'],
    description: '温和的瑜伽动作，唤醒沉睡的身体，提升一天的精神状态',
    exercises: [
      { name: '猫牛式', duration: 60 },
      { name: '下犬式', duration: 45 },
      { name: '战士一式', duration: 30 },
      { name: '战士二式', duration: 30 },
      { name: '三角式', duration: 30 },
      { name: '树式', duration: 30 },
      { name: '婴儿式', duration: 60 },
    ],
    schedule: '每天早晨'
  },
  
  // ========== 减脂课程 ==========
  {
    id: 'course_004',
    title: 'HIIT燃脂挑战',
    subtitle: '20分钟极速燃脂',
    category: '减脂',
    level: 'K3',
    duration: 20,
    calories: 280,
    image: '💪',
    tags: ['HIIT', '高强度', '燃脂'],
    description: '高强度间歇训练，持续燃脂24小时，极速减脂效果',
    exercises: [
      { name: '开合跳', duration: 30 },
      { name: '休息', duration: 10 },
      { name: '波比跳', reps: 10 },
      { name: '休息', duration: 10 },
      { name: '登山者', duration: 30 },
      { name: '休息', duration: 10 },
      { name: '深蹲跳', reps: 15 },
      { name: '休息', duration: 10 },
      { name: '高抬腿', duration: 30 },
      { name: '休息', duration: 10 },
    ],
    schedule: '隔天1次，每周3-4次'
  },
  {
    id: 'course_005',
    title: 'Tabata极速燃脂',
    subtitle: '4分钟高效燃脂',
    category: '减脂',
    level: 'K3',
    duration: 4,
    calories: 60,
    image: '⏱️',
    tags: ['Tabata', '极速', '燃脂'],
    description: '20秒运动+10秒休息，循环8组，持续燃脂',
    exercises: [
      { name: '波比跳', duration: 20 },
      { name: '休息', duration: 10 },
      { name: '深蹲跳', duration: 20 },
      { name: '休息', duration: 10 },
      { name: '登山者', duration: 20 },
      { name: '休息', duration: 10 },
      { name: '开合跳', duration: 20 },
      { name: '休息', duration: 10 },
      { name: '波比跳', duration: 20 },
      { name: '休息', duration: 10 },
      { name: '深蹲跳', duration: 20 },
      { name: '休息', duration: 10 },
      { name: '登山者', duration: 20 },
      { name: '休息', duration: 10 },
      { name: '开合跳', duration: 20 },
      { name: '休息', duration: 10 },
    ],
    schedule: '每天2-3组'
  },
  {
    id: 'course_006',
    title: '30天减脂特训',
    subtitle: '系统性减脂方案',
    category: '减脂',
    level: 'K2',
    duration: 25,
    calories: 200,
    image: '📅',
    tags: ['系统课程', '全身', '减脂'],
    description: '30天科学减脂计划，循序渐进，可持续的减脂方案',
    exercises: [
      { name: '热身组合', duration: 180 },
      { name: '有氧循环', duration: 600 },
      { name: '力量训练', duration: 300 },
      { name: '核心训练', duration: 180 },
      { name: '拉伸放松', duration: 120 },
    ],
    schedule: '每天1次，连续30天'
  },
  
  // ========== 增肌课程 ==========
  {
    id: 'course_007',
    title: '胸肌塑形入门',
    subtitle: '打造完美胸型',
    category: '增肌',
    level: 'K2',
    duration: 18,
    calories: 100,
    image: '🏋️',
    tags: ['胸肌', '力量', '塑形'],
    description: '针对胸部的基础训练，改善胸型，增强上肢力量',
    exercises: [
      { name: '热身-手臂画圈', duration: 30 },
      { name: '标准俯卧撑', reps: 12, sets: 3 },
      { name: '休息', duration: 60 },
      { name: '宽距俯卧撑', reps: 10, sets: 3 },
      { name: '休息', duration: 60 },
      { name: '窄距俯卧撑', reps: 8, sets: 3 },
      { name: '休息', duration: 60 },
      { name: '下斜俯卧撑', reps: 10, sets: 2 },
      { name: '拉伸-门框拉伸', duration: 60 },
    ],
    schedule: '隔天1次，每周3次'
  },
  {
    id: 'course_008',
    title: '腹肌撕裂者',
    subtitle: '雕刻完美腹肌',
    category: '增肌',
    level: 'K3',
    duration: 15,
    calories: 90,
    image: '🍫',
    tags: ['腹肌', '核心', '塑形'],
    description: '高强度腹肌训练，打造清晰可见的腹肌线条',
    exercises: [
      { name: '卷腹', reps: 25 },
      { name: '仰卧举腿', reps: 20 },
      { name: '俄罗斯转体', reps: 30 },
      { name: '平板支撑', duration: 45 },
      { name: '自行车卷腹', reps: 30 },
      { name: 'V字卷腹', reps: 15 },
      { name: '侧平板支撑', duration: 30 },
      { name: '死虫式', reps: 20 },
    ],
    schedule: '隔天1次'
  },
  {
    id: 'course_009',
    title: '手臂塑形训练',
    subtitle: '告别拜拜肉',
    category: '增肌',
    level: 'K2',
    duration: 12,
    calories: 70,
    image: '💪',
    tags: ['手臂', '塑形', '力量'],
    description: '针对二头肌和三头肌的专项训练，紧致手臂线条',
    exercises: [
      { name: '三头肌撑体', reps: 12, sets: 3 },
      { name: '二头弯举', reps: 12, sets: 3 },
      { name: '锤式弯举', reps: 12, sets: 3 },
      { name: '俯身臂屈伸', reps: 12, sets: 3 },
      { name: '窄距俯卧撑', reps: 10 },
    ],
    schedule: '隔天1次'
  },
  {
    id: 'course_010',
    title: '臀腿塑形',
    subtitle: '打造蜜桃臀',
    category: '增肌',
    level: 'K2',
    duration: 20,
    calories: 130,
    image: '🍑',
    tags: ['臀部', '腿部', '塑形'],
    description: '针对臀部和大腿的塑形训练，改善腿型，提升臀线',
    exercises: [
      { name: '深蹲', reps: 20, sets: 3 },
      { name: '臀桥', reps: 20, sets: 3 },
      { name: '弓步蹲', reps: 20, sets: 3 },
      { name: '单腿臀桥', reps: 15, sets: 2 },
      { name: '相扑深蹲', reps: 15, sets: 2 },
      { name: '提踵', reps: 25, sets: 2 },
    ],
    schedule: '隔天1次'
  },
  {
    id: 'course_011',
    title: '背部塑形训练',
    subtitle: '改善体态，挺拔身姿',
    category: '增肌',
    level: 'K2',
    duration: 18,
    calories: 100,
    image: '🔙',
    tags: ['背部', '体态', '塑形'],
    description: '针对背部肌肉的训练，改善驼背，塑造优美背部线条',
    exercises: [
      { name: '超人式', reps: 15, sets: 3 },
      { name: 'Y字举', reps: 12, sets: 3 },
      { name: 'T字举', reps: 12, sets: 3 },
      { name: 'W字举', reps: 12, sets: 3 },
      { name: '反向划船', reps: 12, sets: 3 },
      { name: '门框拉伸', duration: 60 },
    ],
    schedule: '隔天1次'
  },
  
  // ========== 瑜伽课程 ==========
  {
    id: 'course_012',
    title: '基础瑜伽入门',
    subtitle: '感受瑜伽的魅力',
    category: '瑜伽',
    level: 'K1',
    duration: 25,
    calories: 80,
    image: '🧘‍♀️',
    tags: ['瑜伽', '基础', '放松'],
    description: '瑜伽基础体式学习，适合零基础学员',
    exercises: [
      { name: '猫牛式', duration: 60 },
      { name: '下犬式', duration: 45 },
      { name: '战士一式', duration: 30 },
      { name: '战士二式', duration: 30 },
      { name: '三角式', duration: 30 },
      { name: '树式', duration: 30 },
      { name: '桥式', duration: 30 },
      { name: '眼镜蛇式', duration: 30 },
      { name: '婴儿式', duration: 60 },
    ],
    schedule: '每天1次'
  },
  {
    id: 'course_013',
    title: '睡前瑜伽',
    subtitle: '助眠放松，安然入梦',
    category: '瑜伽',
    level: 'K1',
    duration: 15,
    calories: 40,
    image: '🌙',
    tags: ['瑜伽', '助眠', '放松'],
    description: '温和的瑜伽动作，帮助放松身心，改善睡眠质量',
    exercises: [
      { name: '猫牛式', duration: 60 },
      { name: '坐角式', duration: 60 },
      { name: '蝴蝶式', duration: 60 },
      { name: '快乐婴儿式', duration: 60 },
      { name: '仰卧扭转', duration: 60 },
      { name: '摊尸式', duration: 180 },
    ],
    schedule: '每晚睡前'
  },
  {
    id: 'course_014',
    title: '流瑜伽进阶',
    subtitle: '行云流水，身心合一',
    category: '瑜伽',
    level: 'K3',
    duration: 40,
    calories: 150,
    image: '🌊',
    tags: ['瑜伽', '流瑜伽', '进阶'],
    description: '动态的瑜伽练习，动作连贯流畅，提升身体柔韧性',
    exercises: [
      { name: '拜日式A', duration: 300 },
      { name: '拜日式B', duration: 300 },
      { name: '战士序列', duration: 600 },
      { name: '平衡序列', duration: 300 },
      { name: '放松序列', duration: 300 },
    ],
    schedule: '每天1次'
  },
  {
    id: 'course_015',
    title: '办公室瑜伽',
    subtitle: '缓解久坐疲劳',
    category: '瑜伽',
    level: 'K1',
    duration: 10,
    calories: 30,
    image: '💼',
    tags: ['瑜伽', '办公', '放松'],
    description: '适合在办公室进行的瑜伽动作，缓解久坐带来的不适',
    exercises: [
      { name: '颈部环绕', duration: 30 },
      { name: '肩部环绕', duration: 30 },
      { name: '坐姿扭转', duration: 30 },
      { name: '坐姿前屈', duration: 30 },
      { name: '猫牛式(坐姿)', duration: 60 },
      { name: '手腕拉伸', duration: 30 },
    ],
    schedule: '工作间隙'
  },
  
  // ========== 拉伸课程 ==========
  {
    id: 'course_016',
    title: '全身拉伸放松',
    subtitle: '缓解肌肉紧张',
    category: '拉伸',
    level: 'K1',
    duration: 15,
    calories: 35,
    image: '🧘',
    tags: ['拉伸', '放松', '恢复'],
    description: '运动后或日常全身拉伸，缓解肌肉紧张，预防损伤',
    exercises: [
      { name: '颈部拉伸', duration: 30 },
      { name: '肩部拉伸', duration: 30 },
      { name: '手臂拉伸', duration: 30 },
      { name: '胸部拉伸', duration: 30 },
      { name: '腰部拉伸', duration: 30 },
      { name: '髋部拉伸', duration: 30 },
      { name: '大腿前侧拉伸', duration: 30 },
      { name: '大腿后侧拉伸', duration: 30 },
      { name: '小腿拉伸', duration: 30 },
    ],
    schedule: '运动后或每天'
  },
  {
    id: 'course_017',
    title: '运动后拉伸',
    subtitle: '加速恢复，预防酸痛',
    category: '拉伸',
    level: 'K1',
    duration: 10,
    calories: 25,
    image: '😌',
    tags: ['拉伸', '恢复', '运动后'],
    description: '针对主要肌群的拉伸，加速运动后恢复',
    exercises: [
      { name: '股四头肌拉伸', duration: 30 },
      { name: '腘绳肌拉伸', duration: 30 },
      { name: '髋屈肌拉伸', duration: 30 },
      { name: '小腿拉伸', duration: 30 },
      { name: '胸部拉伸', duration: 30 },
      { name: '肩部拉伸', duration: 30 },
    ],
    schedule: '运动后必做'
  },
  
  // ========== 专项课程 ==========
  {
    id: 'course_018',
    title: '蜜桃臀专项训练',
    subtitle: '30天臀型改造',
    category: '专项',
    level: 'K2',
    duration: 25,
    calories: 150,
    image: '🍑',
    tags: ['臀部', '专项', '塑形'],
    description: '针对臀部的专项训练，改善扁平臀，提升臀线',
    exercises: [
      { name: '激活-臀桥', reps: 20 },
      { name: '深蹲', reps: 20, sets: 3 },
      { name: '臀桥', reps: 20, sets: 3 },
      { name: '保加利亚深蹲', reps: 12, sets: 3 },
      { name: '单腿臀桥', reps: 15, sets: 2 },
      { name: '髋部拉伸', duration: 60 },
    ],
    schedule: '隔天1次'
  },
  {
    id: 'course_019',
    title: '马甲线养成计划',
    subtitle: '21天练出马甲线',
    category: '专项',
    level: 'K3',
    duration: 20,
    calories: 110,
    image: '📏',
    tags: ['腹肌', '马甲线', '塑形'],
    description: '针对性的腹肌训练，21天见证马甲线',
    exercises: [
      { name: '卷腹', reps: 25, sets: 3 },
      { name: '仰卧举腿', reps: 20, sets: 3 },
      { name: '俄罗斯转体', reps: 30, sets: 3 },
      { name: '平板支撑', duration: 45 },
      { name: '自行车卷腹', reps: 30, sets: 2 },
      { name: 'V字卷腹', reps: 15, sets: 2 },
    ],
    schedule: '隔天1次'
  },
  {
    id: 'course_020',
    title: '体态改善训练',
    subtitle: '改善圆肩驼背',
    category: '专项',
    level: 'K1',
    duration: 15,
    calories: 45,
    image: '✨',
    tags: ['体态', '矫正', '日常'],
    description: '针对圆肩驼背的体态矫正训练，挺拔身姿',
    exercises: [
      { name: '颈部拉伸', duration: 30 },
      { name: '肩部环绕', duration: 30 },
      { name: 'YTWL', reps: 10 },
      { name: '超人式', reps: 15, sets: 2 },
      { name: '门框拉伸', duration: 60 },
      { name: '猫牛式', duration: 60 },
    ],
    schedule: '每天1次'
  },
  {
    id: 'course_021',
    title: '产后恢复训练',
    subtitle: '安全温和，重塑身材',
    category: '专项',
    level: 'K1',
    duration: 20,
    calories: 60,
    image: '👶',
    tags: ['产后', '恢复', '温和'],
    description: '专为产后妈妈设计，温和安全的恢复训练',
    exercises: [
      { name: '凯格尔运动', duration: 60 },
      { name: '腹式呼吸', duration: 60 },
      { name: '真空腹', duration: 30 },
      { name: '臀桥', reps: 15, sets: 2 },
      { name: '死虫式', reps: 15, sets: 2 },
      { name: '婴儿式', duration: 60 },
    ],
    schedule: '每天1次，产后6周开始'
  },
  
  // ========== 跑步课程 ==========
  {
    id: 'course_022',
    title: '零基础跑步入门',
    subtitle: '从走开始，爱上跑步',
    category: '跑步',
    level: 'K1',
    duration: 30,
    calories: 200,
    image: '🏃',
    tags: ['跑步', '入门', '有氧'],
    description: '跑走结合的训练方式，帮助零基础者爱上跑步',
    description_detail: '1. 快走5分钟热身\n2. 慢跑1分钟+快走2分钟，循环5组\n3. 快走5分钟放松',
    schedule: '隔天1次'
  },
  {
    id: 'course_023',
    title: '5公里跑训练计划',
    subtitle: '8周完成首个5公里',
    category: '跑步',
    level: 'K2',
    duration: 45,
    calories: 350,
    image: '🏃‍♂️',
    tags: ['跑步', '5公里', '进阶'],
    description: '8周系统训练，完成你的首个5公里跑',
    schedule: '每周3-4次'
  },
  {
    id: 'course_024',
    title: '间歇跑训练',
    subtitle: '提升跑步速度',
    category: '跑步',
    level: 'K3',
    duration: 35,
    calories: 400,
    image: '⚡',
    tags: ['跑步', '间歇', '速度'],
    description: '快慢交替的间歇跑训练，提升心肺和速度',
    schedule: '每周1-2次'
  },
];

// 获取课程
function getAllCourses() {
  return COURSE_DATABASE;
}

// 按分类筛选
function getCoursesByCategory(category) {
  return COURSE_DATABASE.filter(c => c.category === category);
}

// 按难度筛选
function getCoursesByLevel(level) {
  return COURSE_DATABASE.filter(c => c.level === level);
}

// 搜索课程
function searchCourses(query) {
  return COURSE_DATABASE.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    c.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
}

// 按标签筛选
function getCoursesByTag(tag) {
  return COURSE_DATABASE.filter(c => c.tags.includes(tag));
}

// 获取推荐课程
function getRecommendedCourses() {
  return COURSE_DATABASE.filter(c => 
    ['course_001', 'course_004', 'course_012', 'course_016'].includes(c.id)
  );
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COURSE_DATABASE, getAllCourses, getCoursesByCategory, getCoursesByLevel, searchCourses, getCoursesByTag, getRecommendedCourses };
}
