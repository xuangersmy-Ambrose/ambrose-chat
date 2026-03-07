/**
 * AMBROSE Health v2.0 - Core Application
 * 顶尖级别前端架构
 */

// ==================== 设计系统配置 ====================
const DesignSystem = {
  colors: {
    primary: '#00f3ff',
    secondary: '#ff00ff',
    accent: '#ff2d92',
    success: '#00ff88',
    warning: '#ffcc00',
    danger: '#ff3366',
    background: '#0a0a0f',
    surface: 'rgba(26, 26, 37, 0.8)'
  },
  fonts: {
    display: "'Orbitron', sans-serif",
    body: "'Rajdhani', 'Noto Sans SC', sans-serif",
    mono: "'JetBrains Mono', monospace"
  }
};

// ==================== 状态管理 ====================
const Store = {
  state: {
    user: null,
    currentPage: 'loginPage',
    healthData: {
      steps: 0,
      calories: 0,
      sleep: 0,
      water: 0
    },
    settings: {
      theme: 'dark',
      notifications: true
    }
  },
  
  get(key) {
    return this.state[key];
  },
  
  set(key, value) {
    this.state[key] = value;
    this.notify(key, value);
  },
  
  listeners: {},
  
  subscribe(key, callback) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(callback);
  },
  
  notify(key, value) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(cb => cb(value));
    }
  }
};

// ==================== 粒子系统 ====================
class ParticleSystem {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      count: options.count || 50,
      color: options.color || DesignSystem.colors.primary,
      speed: options.speed || 1
    };
    this.particles = [];
    this.init();
  }
  
  init() {
    for (let i = 0; i < this.options.count; i++) {
      this.createParticle();
    }
  }
  
  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    this.container.appendChild(particle);
    this.particles.push(particle);
  }
}

// ==================== 页面路由 ====================
const Router = {
  routes: {},
  
  register(path, handler) {
    this.routes[path] = handler;
  },
  
  navigate(pageId, params = {}) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active');
      Store.set('currentPage', pageId);
      
      // 执行页面进入动画
      targetPage.style.animation = 'slideIn 0.3s ease';
      
      // 更新底部导航
      this.updateNav(pageId);
      
      // 触发页面初始化
      if (this.routes[pageId]) {
        this.routes[pageId](params);
      }
    }
    
    window.scrollTo(0, 0);
  },
  
  updateNav(pageId) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const navMap = {
      'homePage': 'navHome',
      'workoutPage': 'navWorkout',
      'dietPage': 'navDiet',
      'profilePage': 'navProfile'
    };
    
    const navId = navMap[pageId];
    if (navId) {
      const navItem = document.getElementById(navId);
      if (navItem) navItem.classList.add('active');
    }
  }
};

// ==================== 用户认证 ====================
const Auth = {
  currentUser: null,
  
  loginBoss(code) {
    if (code === '0812') {
      this.currentUser = {
        type: 'boss',
        name: 'BOSS Shao',
        role: 'master',
        avatar: '👑'
      };
      Store.set('user', this.currentUser);
      return { success: true, message: '欢迎BOSS' };
    }
    return { success: false, message: '识别码错误' };
  },
  
  loginUser(phone, code, userInfo) {
    if (code === '123456') {
      this.currentUser = {
        type: 'user',
        ...userInfo,
        avatar: userInfo.gender === 'male' ? '👨' : '👩'
      };
      Store.set('user', this.currentUser);
      return { success: true, message: `欢迎，${userInfo.name}` };
    }
    return { success: false, message: '验证码错误' };
  },
  
  logout() {
    this.currentUser = null;
    Store.set('user', null);
    Router.navigate('loginPage');
  },
  
  isAuthenticated() {
    return !!this.currentUser;
  }
};

// ==================== 健康数据管理 ====================
const HealthManager = {
  data: {
    steps: { current: 8432, goal: 10000, unit: '步' },
    calories: { current: 368, goal: 500, unit: '千卡' },
    sleep: { current: 7.5, goal: 8, unit: '小时' },
    water: { current: 1200, goal: 2000, unit: 'ml' }
  },
  
  getProgress(type) {
    const item = this.data[type];
    if (!item) return 0;
    return Math.min((item.current / item.goal) * 100, 100);
  },
  
  update(type, value) {
    if (this.data[type]) {
      this.data[type].current = value;
      Store.set('healthData', this.data);
      this.renderStats();
    }
  },
  
  renderStats() {
    Object.keys(this.data).forEach(type => {
      const element = document.getElementById(`${type}Value`);
      const progressElement = document.getElementById(`${type}Progress`);
      
      if (element) {
        element.textContent = this.data[type].current;
      }
      
      if (progressElement) {
        progressElement.style.width = this.getProgress(type) + '%';
      }
    });
  }
};

// ==================== AI教练 ====================
const AICoach = {
  messages: [
    "早安！今天天气不错，适合晨跑。我已经为你准备好了训练计划！",
    "昨晚睡眠质量不错，今天精力充沛，建议进行高强度训练。",
    "你已连续打卡3天，保持这个节奏！",
    "根据你的进度，建议今天增加蛋白质摄入。"
  ],
  
  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "早安";
    if (hour < 18) return "午安";
    return "晚安";
  },
  
  getPersonalizedMessage() {
    const user = Store.get('user');
    const greeting = this.getGreeting();
    
    if (user?.type === 'boss') {
      return `${greeting}，BOSS！今天想做什么？我随时待命。`;
    }
    
    return `${greeting}，${user?.name || '朋友'}！${this.messages[Math.floor(Math.random() * this.messages.length)]}`;
  },
  
  render() {
    const coachMessageEl = document.getElementById('coachMessage');
    if (coachMessageEl) {
      coachMessageEl.textContent = this.getPersonalizedMessage();
    }
  }
};

// ==================== 时间显示 ====================
const TimeDisplay = {
  init() {
    this.update();
    setInterval(() => this.update(), 1000);
  },
  
  update() {
    const now = new Date();
    const timeEl = document.getElementById('timeDisplay');
    const dateEl = document.getElementById('dateDisplay');
    
    if (timeEl) {
      timeEl.textContent = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }
    
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'long'
      });
    }
  }
};

// ==================== 通知系统 ====================
const Notification = {
  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 动画进入
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    });
    
    // 自动消失
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  
  success(message) { this.show(message, 'success'); },
  error(message) { this.show(message, 'error'); },
  warning(message) { this.show(message, 'warning'); },
  info(message) { this.show(message, 'info'); }
};

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
  // 初始化粒子系统
  const particlesContainer = document.getElementById('particlesContainer');
  if (particlesContainer) {
    new ParticleSystem('particlesContainer', { count: 30 });
  }
  
  // 初始化时间显示
  TimeDisplay.init();
  
  // 初始化健康数据
  HealthManager.renderStats();
  
  // 初始化AI教练
  AICoach.render();
  
  // 绑定事件
  bindEvents();
  
  console.log('🚀 AMBROSE Health v2.0 初始化完成');
});

// ==================== 事件绑定 ====================
function bindEvents() {
  // 登录标签切换
  window.switchLoginTab = (mode) => {
    document.querySelectorAll('.login-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.login-form').forEach(form => form.classList.remove('active'));
    
    document.getElementById(`${mode}Tab`).classList.add('active');
    document.getElementById(`${mode}Form`).classList.add('active');
  };
  
  // BOSS登录
  window.loginBoss = () => {
    const code = document.getElementById('bossCode').value;
    const result = Auth.loginBoss(code);
    
    if (result.success) {
      Notification.success(result.message);
      setTimeout(() => Router.navigate('homePage'), 500);
    } else {
      Notification.error(result.message);
    }
  };
  
  // 用户登录
  window.loginUser = () => {
    const phone = document.getElementById('userPhone').value;
    const code = document.getElementById('verifyCode').value;
    const name = document.getElementById('userName').value;
    
    if (!phone || !code || !name) {
      Notification.warning('请完善信息');
      return;
    }
    
    const result = Auth.loginUser(phone, code, { name });
    
    if (result.success) {
      Notification.success(result.message);
      setTimeout(() => Router.navigate('homePage'), 500);
    } else {
      Notification.error(result.message);
    }
  };
  
  // 性别选择
  window.selectGender = (gender) => {
    document.querySelectorAll('.gender-option').forEach(el => el.classList.remove('selected'));
    document.getElementById(`gender${gender === 'male' ? 'Male' : 'Female'}`).classList.add('selected');
  };
  
  // 发送验证码
  window.sendVerifyCode = () => {
    const btn = document.getElementById('sendCodeBtn');
    let count = 60;
    
    btn.disabled = true;
    btn.textContent = `${count}s`;
    
    const timer = setInterval(() => {
      count--;
      btn.textContent = `${count}s`;
      
      if (count <= 0) {
        clearInterval(timer);
        btn.disabled = false;
        btn.textContent = '获取验证码';
      }
    }, 1000);
    
    Notification.info('验证码已发送: 123456');
  };
  
  // 页面导航
  window.showPage = (pageId) => Router.navigate(pageId);
  
  // 底部导航
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const pageMap = {
        'navHome': 'homePage',
        'navWorkout': 'workoutPage',
        'navDiet': 'dietPage',
        'navProfile': 'profilePage'
      };
      
      const pageId = pageMap[item.id];
      if (pageId) Router.navigate(pageId);
    });
  });
}

// 全局函数
window.showToast = (message) => Notification.info(message);
