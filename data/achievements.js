/**
 * AMBROSE Health - 成就徽章系统
 * 游戏化激励用户坚持健康习惯
 */

const ACHIEVEMENTS_DATABASE = {
  // ========== 运动类成就 ==========
  workout: [
    {
      id: 'workout_001',
      title: '初次尝试',
      description: '完成第一次训练',
      emoji: '🌟',
      icon: 'star',
      color: '#FFD700',
      points: 50,
      condition: { type: 'workout_count', value: 1 },
      rarity: 'common'
    },
    {
      id: 'workout_002',
      title: '坚持一周',
      description: '连续7天完成训练',
      emoji: '🔥',
      icon: 'fire',
      color: '#FF6B6B',
      points: 150,
      condition: { type: 'streak_days', value: 7 },
      rarity: 'uncommon'
    },
    {
      id: 'workout_003',
      title: '月度挑战者',
      description: '连续30天完成训练',
      emoji: '📅',
      icon: 'calendar',
      color: '#4ECDC4',
      points: 500,
      condition: { type: 'streak_days', value: 30 },
      rarity: 'rare'
    },
    {
      id: 'workout_004',
      title: '百日战神',
      description: '连续100天完成训练',
      emoji: '💯',
      icon: '100',
      color: '#FF2D92',
      points: 2000,
      condition: { type: 'streak_days', value: 100 },
      rarity: 'legendary'
    },
    {
      id: 'workout_005',
      title: '训练达人',
      description: '累计完成50次训练',
      emoji: '🏋️',
      icon: 'dumbbell',
      color: '#00D4FF',
      points: 300,
      condition: { type: 'total_workouts', value: 50 },
      rarity: 'uncommon'
    },
    {
      id: 'workout_006',
      title: '健身大师',
      description: '累计完成200次训练',
      emoji: '👑',
      icon: 'crown',
      color: '#FFD700',
      points: 1000,
      condition: { type: 'total_workouts', value: 200 },
      rarity: 'epic'
    },
    {
      id: 'workout_007',
      title: '卡路里杀手',
      description: '单次训练消耗超过500卡路里',
      emoji: '💀',
      icon: 'skull',
      color: '#FF6B6B',
      points: 200,
      condition: { type: 'single_calories', value: 500 },
      rarity: 'rare'
    },
    {
      id: 'workout_008',
      title: '马拉松选手',
      description: '累计运动时间超过24小时',
      emoji: '🏃',
      icon: 'runner',
      color: '#4ECDC4',
      points: 400,
      condition: { type: 'total_duration', value: 1440 },
      rarity: 'rare'
    },
    {
      id: 'workout_009',
      title: '早起鸟',
      description: '在早上6点前完成训练',
      emoji: '🐦',
      icon: 'bird',
      color: '#FFD93D',
      points: 100,
      condition: { type: 'early_workout', value: 6 },
      rarity: 'uncommon'
    },
    {
      id: 'workout_010',
      title: '深夜战士',
      description: '在晚上10点后完成训练',
      emoji: '🌙',
      icon: 'moon',
      color: '#6C5CE7',
      points: 100,
      condition: { type: 'late_workout', value: 22 },
      rarity: 'uncommon'
    },
  ],
  
  // ========== 饮食类成就 ==========
  diet: [
    {
      id: 'diet_001',
      title: '健康饮食',
      description: '连续7天记录饮食',
      emoji: '🥗',
      icon: 'salad',
      color: '#55E6C1',
      points: 100,
      condition: { type: 'diet_streak', value: 7 },
      rarity: 'common'
    },
    {
      id: 'diet_002',
      title: '营养专家',
      description: '连续30天记录饮食',
      emoji: '📊',
      icon: 'chart',
      color: '#00D4FF',
      points: 400,
      condition: { type: 'diet_streak', value: 30 },
      rarity: 'rare'
    },
    {
      id: 'diet_003',
      title: '水牛',
      description: '单日饮水超过3000ml',
      emoji: '💧',
      icon: 'water',
      color: '#74B9FF',
      points: 80,
      condition: { type: 'water_single', value: 3000 },
      rarity: 'common'
    },
    {
      id: 'diet_004',
      title: '低卡达人',
      description: '单日摄入低于1200卡路里',
      emoji: '📉',
      icon: 'arrow-down',
      color: '#A8E6CF',
      points: 100,
      condition: { type: 'calorie_low', value: 1200 },
      rarity: 'uncommon'
    },
    {
      id: 'diet_005',
      title: '蛋白质狂魔',
      description: '单日蛋白质摄入超过100g',
      emoji: '🥩',
      icon: 'meat',
      color: '#FF6B6B',
      points: 150,
      condition: { type: 'protein_high', value: 100 },
      rarity: 'uncommon'
    },
    {
      id: 'diet_006',
      title: '素食主义者',
      description: '完成3天无肉饮食',
      emoji: '🥬',
      icon: 'leaf',
      color: '#55E6C1',
      points: 150,
      condition: { type: 'vegetarian_days', value: 3 },
      rarity: 'uncommon'
    },
    {
      id: 'diet_007',
      title: '断糖勇士',
      description: '连续7天不摄入添加糖',
      emoji: '🚫',
      icon: 'no-sugar',
      color: '#FD79A8',
      points: 300,
      condition: { type: 'no_sugar_days', value: 7 },
      rarity: 'rare'
    },
    {
      id: 'diet_008',
      title: '彩虹饮食',
      description: '一天内摄入5种颜色蔬果',
      emoji: '🌈',
      icon: 'rainbow',
      color: '#FDCB6E',
      points: 120,
      condition: { type: 'colorful_diet', value: 5 },
      rarity: 'uncommon'
    },
  ],
  
  // ========== 睡眠类成就 ==========
  sleep: [
    {
      id: 'sleep_001',
      title: '早睡早起',
      description: '连续3天在23点前入睡',
      emoji: '😴',
      icon: 'sleep',
      color: '#A29BFE',
      points: 100,
      condition: { type: 'early_sleep_streak', value: 3 },
      rarity: 'common'
    },
    {
      id: 'sleep_002',
      title: '睡美人',
      description: '单日睡眠超过8小时',
      emoji: '👸',
      icon: 'princess',
      color: '#FD79A8',
      points: 80,
      condition: { type: 'sleep_duration', value: 8 },
      rarity: 'common'
    },
    {
      id: 'sleep_003',
      title: '规律作息',
      description: '连续7天睡眠超过7小时',
      emoji: '⏰',
      icon: 'clock',
      color: '#FDCB6E',
      points: 200,
      condition: { type: 'good_sleep_streak', value: 7 },
      rarity: 'uncommon'
    },
  ],
  
  // ========== 社交类成就 ==========
  social: [
    {
      id: 'social_001',
      title: '分享者',
      description: '发布第一条动态',
      emoji: '📢',
      icon: 'megaphone',
      color: '#00D4FF',
      points: 50,
      condition: { type: 'first_post', value: 1 },
      rarity: 'common'
    },
    {
      id: 'social_002',
      title: '人气王',
      description: '单条动态获得50个赞',
      emoji: '❤️',
      icon: 'heart',
      color: '#FF6B6B',
      points: 200,
      condition: { type: 'post_likes', value: 50 },
      rarity: 'rare'
    },
    {
      id: 'social_003',
      title: '活跃分子',
      description: '在社区评论10次',
      emoji: '💬',
      icon: 'comment',
      color: '#74B9FF',
      points: 100,
      condition: { type: 'total_comments', value: 10 },
      rarity: 'common'
    },
    {
      id: 'social_004',
      title: '挑战发起人',
      description: '参与3次挑战活动',
      emoji: '🏆',
      icon: 'trophy',
      color: '#FFD700',
      points: 150,
      condition: { type: 'challenges_joined', value: 3 },
      rarity: 'uncommon'
    },
  ],
  
  // ========== 特殊成就 ==========
  special: [
    {
      id: 'special_001',
      title: '新年决心',
      description: '在1月1日开始训练',
      emoji: '🎆',
      icon: 'firework',
      color: '#FFD700',
      points: 100,
      condition: { type: 'new_year', value: '01-01' },
      rarity: 'rare'
    },
    {
      id: 'special_002',
      title: '生日特惠',
      description: '在生日当天训练',
      emoji: '🎂',
      icon: 'cake',
      color: '#FF6B6B',
      points: 200,
      condition: { type: 'birthday_workout', value: true },
      rarity: 'epic'
    },
    {
      id: 'special_003',
      title: '全勤奖',
      description: '一个月内无缺席',
      emoji: '💯',
      icon: '100',
      color: '#00D4FF',
      points: 500,
      condition: { type: 'perfect_month', value: 30 },
      rarity: 'legendary'
    },
    {
      id: 'special_004',
      title: '开天辟地',
      description: '成为前100名用户',
      emoji: '🚀',
      icon: 'rocket',
      color: '#9B59B6',
      points: 300,
      condition: { type: 'early_adopter', value: 100 },
      rarity: 'legendary'
    },
    {
      id: 'special_005',
      title: 'BUG猎手',
      description: '发现并反馈一个问题',
      emoji: '🐛',
      icon: 'bug',
      color: '#E74C3C',
      points: 100,
      condition: { type: 'bug_report', value: 1 },
      rarity: 'uncommon'
    },
  ],
  
  // ========== 等级系统 ==========
  levels: [
    { level: 1, title: '健身新手', minPoints: 0, emoji: '🥉', color: '#CD7F32' },
    { level: 2, title: '初级学员', minPoints: 100, emoji: '🥉', color: '#CD7F32' },
    { level: 3, title: '进阶学员', minPoints: 300, emoji: '🥉', color: '#CD7F32' },
    { level: 4, title: '健身达人', minPoints: 600, emoji: '🥈', color: '#C0C0C0' },
    { level: 5, title: '训练高手', minPoints: 1000, emoji: '🥈', color: '#C0C0C0' },
    { level: 6, title: '健身专家', minPoints: 1500, emoji: '🥈', color: '#C0C0C0' },
    { level: 7, title: '健身大师', minPoints: 2200, emoji: '🥇', color: '#FFD700' },
    { level: 8, title: '传奇健身者', minPoints: 3000, emoji: '🥇', color: '#FFD700' },
    { level: 9, title: '健身传奇', minPoints: 4000, emoji: '👑', color: '#E74C3C' },
    { level: 10, title: '健身之神', minPoints: 5500, emoji: '👑', color: '#9B59B6' },
  ]
};

// 获取所有成就
function getAllAchievements() {
  const all = [];
  Object.keys(ACHIEVEMENTS_DATABASE).forEach(category => {
    if (category !== 'levels') {
      ACHIEVEMENTS_DATABASE[category].forEach(ach => {
        all.push({ ...ach, category });
      });
    }
  });
  return all;
}

// 按分类获取
function getAchievementsByCategory(category) {
  return ACHIEVEMENTS_DATABASE[category] || [];
}

// 获取等级信息
function getLevelInfo(points) {
  const levels = ACHIEVEMENTS_DATABASE.levels;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].minPoints) {
      return {
        current: levels[i],
        next: levels[i + 1] || null,
        progress: levels[i + 1] 
          ? (points - levels[i].minPoints) / (levels[i + 1].minPoints - levels[i].minPoints)
          : 1
      };
    }
  }
  return { current: levels[0], next: levels[1], progress: 0 };
}

// 检查成就解锁
function checkAchievementUnlock(userData, achievementId) {
  const achievement = getAllAchievements().find(a => a.id === achievementId);
  if (!achievement) return false;
  
  const condition = achievement.condition;
  switch (condition.type) {
    case 'workout_count':
      return userData.totalWorkouts >= condition.value;
    case 'streak_days':
      return userData.currentStreak >= condition.value;
    case 'total_workouts':
      return userData.totalWorkouts >= condition.value;
    case 'total_duration':
      return userData.totalDuration >= condition.value;
    case 'single_calories':
      return userData.maxSingleCalories >= condition.value;
    default:
      return false;
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ACHIEVEMENTS_DATABASE, getAllAchievements, getAchievementsByCategory, getLevelInfo, checkAchievementUnlock };
}
