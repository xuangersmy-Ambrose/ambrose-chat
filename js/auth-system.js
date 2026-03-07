/**
 * AMBROSE Health - 统一登录系统
 * 开发者模式 + 用户登录/注册一体化
 */

const AUTH_CONFIG = {
  DEV_CODE: '0812',
  DEV_NAME: '开发者',
  TEST_VERIFY_CODE: '123456'
};

class AuthManager {
  constructor() {
    this.currentMode = 'dev'; // 'dev' 或 'user'
    this.currentUser = null;
    this.selectedGender = '';
    this.userFormMode = 'login'; // 'login' 或 'register'
  }

  init() {
    // 检查是否已登录
    const saved = localStorage.getItem('ambroseUser');
    if (saved) {
      this.currentUser = JSON.parse(saved);
      this.showHome();
    } else {
      this.showWelcome();
    }
  }

  // 显示欢迎页
  showWelcome() {
    showPage('welcomePage');
  }

  // 显示登录页
  showLogin() {
    showPage('loginPage');
    this.switchMode('dev');
  }

  // 显示主页
  showHome() {
    showPage('homePage');
    if (typeof updateHomePage === 'function') updateHomePage();
    if (typeof updateProfilePage === 'function') updateProfilePage();
  }

  // 切换开发者/用户模式
  switchMode(mode) {
    this.currentMode = mode;
    
    // 更新按钮状态
    document.querySelectorAll('.auth-mode-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(mode + 'ModeBtn')?.classList.add('active');
    
    // 显示对应表单
    document.querySelectorAll('.auth-form').forEach(form => {
      form.classList.remove('active');
    });
    document.getElementById(mode + 'Form')?.classList.add('active');
  }

  // 切换用户登录/注册
  switchUserForm(mode) {
    this.userFormMode = mode;
    
    // 更新选项卡
    document.querySelectorAll('.user-form-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.getElementById('tab' + mode.charAt(0).toUpperCase() + mode.slice(1))?.classList.add('active');
    
    // 显示对应表单
    document.querySelectorAll('.user-form-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(mode + 'Content')?.classList.add('active');
  }

  // 开发者登录
  devLogin() {
    const code = document.getElementById('devCode')?.value;
    
    if (code !== AUTH_CONFIG.DEV_CODE) {
      showToast('开发者专属密钥错误');
      return;
    }
    
    this.currentUser = {
      type: 'dev',
      name: AUTH_CONFIG.DEV_NAME,
      role: 'admin',
      loginTime: new Date().toISOString()
    };
    
    this.saveUser();
    showToast('🚀 欢迎开发者');
    this.showHome();
  }

  // 用户登录
  userLogin() {
    const phone = document.getElementById('loginPhone')?.value;
    const code = document.getElementById('loginCode')?.value;
    
    if (!phone || phone.length !== 11) {
      showToast('请输入正确的手机号');
      return;
    }
    
    if (code !== AUTH_CONFIG.TEST_VERIFY_CODE) {
      showToast('验证码错误');
      return;
    }
    
    // 检查是否已注册
    const savedUser = localStorage.getItem('ambrose_user_' + phone);
    if (!savedUser) {
      showToast('该手机号未注册，请先注册');
      this.switchUserForm('register');
      document.getElementById('regPhone').value = phone;
      return;
    }
    
    this.currentUser = JSON.parse(savedUser);
    this.saveUser();
    showToast('👋 欢迎回来，' + this.currentUser.name);
    this.showHome();
  }

  // 用户注册
  userRegister() {
    const phone = document.getElementById('regPhone')?.value;
    const code = document.getElementById('regCode')?.value;
    const name = document.getElementById('regName')?.value;
    const age = parseInt(document.getElementById('regAge')?.value);
    const height = parseInt(document.getElementById('regHeight')?.value);
    const weight = parseInt(document.getElementById('regWeight')?.value);
    
    if (!phone || phone.length !== 11) {
      showToast('请输入正确的手机号');
      return;
    }
    
    if (code !== AUTH_CONFIG.TEST_VERIFY_CODE) {
      showToast('验证码错误');
      return;
    }
    
    if (!name || !this.selectedGender || !age || !height || !weight) {
      showToast('请完善所有信息');
      return;
    }
    
    // 检查是否已存在
    if (localStorage.getItem('ambrose_user_' + phone)) {
      showToast('该手机号已注册，请直接登录');
      this.switchUserForm('login');
      return;
    }
    
    this.currentUser = {
      type: 'user',
      phone: phone,
      name: name,
      gender: this.selectedGender,
      age: age,
      height: height,
      weight: weight,
      registerTime: new Date().toISOString()
    };
    
    // 保存用户信息
    localStorage.setItem('ambrose_user_' + phone, JSON.stringify(this.currentUser));
    this.saveUser();
    
    showToast('🎉 注册成功，欢迎 ' + name);
    this.showHome();
  }

  // 选择性别
  selectGender(gender) {
    this.selectedGender = gender;
    document.querySelectorAll('.gender-option').forEach(el => {
      el.classList.remove('selected');
    });
    document.getElementById('gender' + gender.charAt(0).toUpperCase() + gender.slice(1))?.classList.add('selected');
  }

  // 发送验证码
  sendVerifyCode(btnId, inputId) {
    const phone = document.getElementById(inputId)?.value;
    
    if (!phone || phone.length !== 11) {
      showToast('请输入正确的手机号');
      return;
    }
    
    showToast('验证码已发送: ' + AUTH_CONFIG.TEST_VERIFY_CODE);
    
    // 倒计时
    const btn = document.getElementById(btnId);
    if (!btn) return;
    
    let count = 60;
    btn.disabled = true;
    btn.textContent = count + 's';
    
    const timer = setInterval(() => {
      count--;
      btn.textContent = count + 's';
      if (count <= 0) {
        clearInterval(timer);
        btn.disabled = false;
        btn.textContent = '获取验证码';
      }
    }, 1000);
  }

  // 保存当前用户
  saveUser() {
    localStorage.setItem('ambroseUser', JSON.stringify(this.currentUser));
  }

  // 退出登录
  logout() {
    localStorage.removeItem('ambroseUser');
    this.currentUser = null;
    this.showWelcome();
    showToast('已退出登录');
  }
}

// 初始化
const authManager = new AuthManager();

// 全局函数供HTML调用
window.authSwitchMode = (mode) => authManager.switchMode(mode);
window.authSwitchUserForm = (mode) => authManager.switchUserForm(mode);
window.authDevLogin = () => authManager.devLogin();
window.authUserLogin = () => authManager.userLogin();
window.authUserRegister = () => authManager.userRegister();
window.authSelectGender = (gender) => authManager.selectGender(gender);
window.authSendCode = (btnId, inputId) => authManager.sendVerifyCode(btnId, inputId);
window.authShowLogin = () => authManager.showLogin();
window.authLogout = () => authManager.logout();

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  authManager.init();
});
