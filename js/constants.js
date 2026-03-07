/**
 * AMBROSE Health - 常量定义
 * 统一管理所有配置和魔法数字
 */

const CONSTANTS = {
  // ========== 积分系统 ==========
  POINTS: {
    WORKOUT_COMPLETE: 50,
    DAILY_CHECKIN: 10,
    WATER_GOAL: 20,
    STEP_MILESTONE: 10,
    FIRST_LOGIN: 100,
    PROFILE_COMPLETE: 50,
    ACHIEVEMENT_UNLOCK: 30,
    STREAK_7_DAYS: 100,
    STREAK_30_DAYS: 500
  },

  // ========== 时间相关 ==========
  TIME: {
    MILLISECONDS_PER_SECOND: 1000,
    MILLISECONDS_PER_MINUTE: 60000,
    MILLISECONDS_PER_HOUR: 3600000,
    MILLISECONDS_PER_DAY: 86400000,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    DAYS_PER_WEEK: 7,
    DAYS_PER_MONTH: 30
  },

  // ========== 时间段 ==========
  TIME_OF_DAY: {
    MORNING_START: 5,
    MORNING_END: 12,
    AFTERNOON_END: 18,
    EVENING_END: 22,
    NIGHT_END: 24
  },

  // ========== 健康目标 ==========
  HEALTH_GOALS: {
    DAILY_STEPS: 10000,
    DAILY_WATER: 2000, // ml
    DAILY_SLEEP: 8, // hours
    WEEKLY_EXERCISE: 150, // minutes
    DAILY_CALORIES: 2000
  },

  // ========== 动画时间 ==========
  ANIMATION: {
    TOAST_DURATION: 3000,
    MODAL_TRANSITION: 300,
    PAGE_TRANSITION: 300,
    PROGRESS_ANIMATION: 800,
    LOADER_MIN_TIME: 500
  },

  // ========== 存储键名 ==========
  STORAGE_KEYS: {
    USER: 'ambrose_user',
    TOKEN: 'ambrose_token',
    HEALTH_DATA: 'ambrose_health_data',
    FAVORITES: 'ambrose_favorites',
    LEARNING_PLAN: 'ambrose_learning_plan',
    SETTINGS: 'ambrose_settings',
    REMINDER_SETTINGS: 'ambrose_reminder_settings',
    PUSH_SUBSCRIPTION: 'push_subscription',
    THEME: 'ambrose_theme',
    LANGUAGE: 'ambrose_language'
  },

  // ========== API配置 ==========
  API: {
    TIMEOUT: 30000,
    RETRY_COUNT: 3,
    RETRY_DELAY: 1000,
    RATE_LIMIT_WINDOW: 60000,
    RATE_LIMIT_MAX: 100
  },

  // ========== 推送提醒配置 ==========
  REMINDERS: {
    WATER: {
      DEFAULT_INTERVAL: 120, // minutes
      MIN_INTERVAL: 30,
      MAX_INTERVAL: 240
    },
    EXERCISE: {
      DEFAULT_HOUR: 18,
      DEFAULT_MINUTE: 0
    },
    SLEEP: {
      DEFAULT_HOUR: 22,
      DEFAULT_MINUTE: 30
    }
  },

  // ========== 课程系统 ==========
  COURSES: {
    PAGE_SIZE: 10,
    MAX_FAVORITES: 100,
    DIFFICULTY: {
      BEGINNER: 'beginner',
      INTERMEDIATE: 'intermediate',
      ADVANCED: 'advanced'
    }
  },

  // ========== 徽章等级 ==========
  BADGE_LEVELS: {
    BRONZE: { name: '青铜', color: '#CD7F32', minPoints: 0 },
    SILVER: { name: '白银', color: '#C0C0C0', minPoints: 1000 },
    GOLD: { name: '黄金', color: '#FFD700', minPoints: 5000 },
    PLATINUM: { name: '铂金', color: '#E5E4E2', minPoints: 10000 },
    DIAMOND: { name: '钻石', color: '#B9F2FF', minPoints: 20000 }
  },

  // ========== 验证规则 ==========
  VALIDATION: {
    MAX_WEIGHT: 300, // kg
    MIN_WEIGHT: 20,
    MAX_HEIGHT: 250, // cm
    MIN_HEIGHT: 50,
    MAX_AGE: 120,
    MIN_AGE: 10,
    MAX_NAME_LENGTH: 50,
    MAX_NOTE_LENGTH: 500
  },

  // ========== UI配置 ==========
  UI: {
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
    SCROLL_THRESHOLD: 100,
    TOUCH_THRESHOLD: 50
  },

  // ========== 错误码 ==========
  ERROR_CODES: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    AUTH_ERROR: 'AUTH_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR',
    TIMEOUT: 'TIMEOUT'
  },

  // ========== 心情等级 ==========
  MOOD_LEVELS: {
    1: { label: '很差', emoji: '😢', color: '#FF5252' },
    2: { label: '不佳', emoji: '😕', color: '#FFB74D' },
    3: { label: '一般', emoji: '😐', color: '#FFD54F' },
    4: { label: '不错', emoji: '🙂', color: '#81C784' },
    5: { label: '很好', emoji: '😄', color: '#4CAF50' }
  },

  // ========== 睡眠等级 ==========
  SLEEP_QUALITY: {
    1: { label: '很差', color: '#FF5252' },
    2: { label: '不佳', color: '#FFB74D' },
    3: { label: '一般', color: '#FFD54F' },
    4: { label: '良好', color: '#81C784' },
    5: { label: '优秀', color: '#4CAF50' }
  }
};

// 冻结常量防止修改
Object.freeze(CONSTANTS);
Object.freeze(CONSTANTS.POINTS);
Object.freeze(CONSTANTS.TIME);
Object.freeze(CONSTANTS.TIME_OF_DAY);
Object.freeze(CONSTANTS.HEALTH_GOALS);
Object.freeze(CONSTANTS.ANIMATION);
Object.freeze(CONSTANTS.STORAGE_KEYS);
Object.freeze(CONSTANTS.API);
Object.freeze(CONSTANTS.REMINDERS);
Object.freeze(CONSTANTS.COURSES);
Object.freeze(CONSTANTS.BADGE_LEVELS);
Object.freeze(CONSTANTS.VALIDATION);
Object.freeze(CONSTANTS.UI);
Object.freeze(CONSTANTS.ERROR_CODES);
Object.freeze(CONSTANTS.MOOD_LEVELS);
Object.freeze(CONSTANTS.SLEEP_QUALITY);

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONSTANTS;
}
