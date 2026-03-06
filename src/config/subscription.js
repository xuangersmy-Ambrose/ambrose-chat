// AMBROSE Health v6.0 - 商业化配置
// 会员等级与定价

const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: '免费版',
    price: 0,
    features: [
      '基础训练课程 (30节)',
      '健康数据记录',
      '社区浏览',
      '基础统计报告'
    ],
    limits: {
      dailyWorkouts: 1,
      aiChats: 3,
      courses: 30,
      dataRetention: '7天'
    }
  },
  
  pro: {
    id: 'pro',
    name: 'Pro会员',
    price: 19.9,
    period: 'month',
    stripePriceId: 'price_pro_monthly', // 待配置
    features: [
      '全部训练课程 (100+)',
      'AI智能教练',
      '高级数据分析',
      '云端数据同步',
      '无广告体验',
      '专属客服',
      '饮食智能推荐'
    ],
    popular: true,
    limits: {
      dailyWorkouts: 999,
      aiChats: 999,
      courses: 'unlimited',
      dataRetention: '永久'
    }
  },
  
  premium: {
    id: 'premium',
    name: 'Premium会员',
    price: 39.9,
    period: 'month',
    stripePriceId: 'price_premium_monthly', // 待配置
    features: [
      'Pro全部功能',
      '1对1专家咨询 (每月1次)',
      '定制化训练计划',
      '优先体验新功能',
      '线下活动特权',
      '专属社群'
    ],
    limits: {
      dailyWorkouts: 'unlimited',
      aiChats: 'unlimited',
      courses: 'unlimited',
      dataRetention: '永久',
      expertConsult: 1
    }
  }
};

// 功能权限矩阵
const FEATURE_MATRIX = {
  // 训练模块
  'basic-courses': ['free', 'pro', 'premium'],
  'advanced-courses': ['pro', 'premium'],
  'ai-coach': ['pro', 'premium'],
  'custom-plan': ['premium'],
  
  // 数据模块
  'basic-stats': ['free', 'pro', 'premium'],
  'advanced-analytics': ['pro', 'premium'],
  'cloud-sync': ['pro', 'premium'],
  'data-export': ['pro', 'premium'],
  
  // 社交模块
  'community-view': ['free', 'pro', 'premium'],
  'community-post': ['pro', 'premium'],
  'challenges': ['pro', 'premium'],
  'leaderboard': ['free', 'pro', 'premium'],
  
  // AI功能
  'ai-chat-basic': ['free'],
  'ai-chat-unlimited': ['pro', 'premium'],
  'ai-diet-plan': ['pro', 'premium'],
  'ai-health-prediction': ['premium']
};

// 检查用户是否有权限使用某功能
function hasFeatureAccess(feature, userPlan = 'free') {
  const allowedPlans = FEATURE_MATRIX[feature] || [];
  return allowedPlans.includes(userPlan);
}

// 获取用户当前计划
function getUserPlan() {
  return localStorage.getItem('userPlan') || 'free';
}

// 设置用户计划
function setUserPlan(planId) {
  localStorage.setItem('userPlan', planId);
  localStorage.setItem('planUpdatedAt', Date.now().toString());
}

// 显示升级提示
function showUpgradePrompt(feature) {
  const plan = getUserPlan();
  if (plan === 'free') {
    showModal({
      title: '升级Pro会员',
      content: '此功能需要Pro会员才能使用',
      primaryAction: '立即升级',
      primaryCallback: () => showPricingPage()
    });
  } else if (plan === 'pro') {
    showModal({
      title: '升级Premium',
      content: '此功能需要Premium会员',
      primaryAction: '升级Premium',
      primaryCallback: () => showPricingPage()
    });
  }
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUBSCRIPTION_PLANS, FEATURE_MATRIX, hasFeatureAccess };
}
