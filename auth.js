/**
 * 身份验证模块 - 赛博朋克版（含性别选择）
 * 修复：XSS漏洞、添加输入验证、常量提取
 */

// 常量定义
const AUTH_CONSTANTS = {
  STORAGE_KEYS: {
    AUTHED: 'ambrose_authed',
    USER_GENDER: 'ambrose_user_gender',
    USER_NAME: 'ambrose_user_name',
    USER_RELATION: 'ambrose_user_relation'
  },
  INVITE_CODE: '8888',
  MASTER_CODE: '0812',
  ALLOWED_RELATIONS: ['self', 'friend', 'lover', 'spouse', 'family', 'client'],
  RELATION_TEXTS: {
    'self': '本人',
    'friend': '朋友',
    'lover': '恋人',
    'spouse': '爱人',
    'family': '家人',
    'client': '客户'
  }
};

// 安全转义函数
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

// 输入验证函数
function validateInput(value, type = 'string', options = {}) {
  if (!value || typeof value !== 'string') {
    return { valid: false, msg: '输入不能为空' };
  }
  
  const trimmed = value.trim();
  
  if (type === 'name') {
    if (trimmed.length < 1 || trimmed.length > 20) {
      return { valid: false, msg: '代号长度必须在1-20个字符之间' };
    }
    // 防止特殊字符
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9\-_]+$/.test(trimmed)) {
      return { valid: false, msg: '代号只能包含中文、字母、数字、下划线和横线' };
    }
  }
  
  if (type === 'inviteCode') {
    if (!/^\d{4}$/.test(trimmed)) {
      return { valid: false, msg: '邀请码必须是4位数字' };
    }
  }
  
  return { valid: true, value: trimmed };
}

const Auth = {
  isAuthenticated: localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.AUTHED) === 'true',
  
  init() {
    if (!this.isAuthenticated) {
      this.showAuthModal();
    } else {
      if (typeof UI !== 'undefined') {
        UI.init();
      }
    }
  },
  
  showAuthModal() {
    // 移除已存在的模态框
    const existingModal = document.getElementById('authModal');
    if (existingModal) {
      existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'authModal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #0a0a0f 0%, #1a0a1f 100%);
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      font-family: 'Noto Sans SC', sans-serif;
    `;
    
    // 使用textContent安全地设置内容
    const content = document.createElement('div');
    content.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
      "></div>
      
      <div style="
        background: rgba(10, 10, 15, 0.95);
        width: 100%;
        max-width: 380px;
        border: 2px solid #00f3ff;
        border-radius: 8px;
        padding: 40px 30px;
        text-align: center;
        position: relative;
        box-shadow: 
          0 0 40px rgba(0, 243, 255, 0.3),
          inset 0 0 60px rgba(0, 243, 255, 0.05);
        backdrop-filter: blur(10px);
        max-height: 90vh;
        overflow-y: auto;
      ">
        <div class="corner-decoration"></div>
        
        <div style="
          font-size: 56px;
          margin-bottom: 20px;
          text-shadow: 0 0 30px rgba(0, 243, 255, 0.8);
          animation: pulse-icon 2s ease-in-out infinite;
        ">🧰</div>
        
        <div style="
          font-family: 'Orbitron', monospace;
          font-size: 28px;
          font-weight: 900;
          color: #00f3ff;
          letter-spacing: 6px;
          margin-bottom: 8px;
          text-shadow: 
            0 0 10px #00f3ff,
            0 0 20px #00f3ff,
            0 0 40px #00f3ff;
          text-transform: uppercase;
        ">AMBROSE</div>
        
        <div style="
          font-family: 'Orbitron', monospace;
          font-size: 11px;
          color: #ff00ff;
          letter-spacing: 3px;
          margin-bottom: 24px;
          text-transform: uppercase;
        ">CYBERPUNK EDITION // 2088</div>
        
        <div style="
          color: #888;
          font-size: 13px;
          margin-bottom: 24px;
          line-height: 1.6;
        ">
          全知全能的精神体投射<br>
          <span style="color: #00f3ff;">专属于 BOSS Shao</span>
        </div>
        
        <div style="
          border-top: 1px solid rgba(0, 243, 255, 0.3);
          padding-top: 20px;
          margin-bottom: 20px;
        ">
          <div style="
            font-family: 'Orbitron', monospace;
            color: #ff00ff;
            font-size: 12px;
            letter-spacing: 2px;
            margin-bottom: 16px;
            text-transform: uppercase;
          ">身份验证 // IDENTITY_VERIFY</div>
          
          <div style="margin-bottom: 16px; text-align: left;">
            <label style="
              display: block;
              font-size: 12px;
              color: #00f3ff;
              margin-bottom: 8px;
              font-family: 'Orbitron', monospace;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">
              性别 // GENDER
            </label>
            <div style="display: flex; gap: 12px;">
              <div id="genderMale" data-gender="male" style="
                flex: 1;
                padding: 12px;
                background: rgba(0, 243, 255, 0.1);
                border: 2px solid rgba(0, 243, 255, 0.3);
                border-radius: 8px;
                cursor: pointer;
                text-align: center;
                transition: all 0.3s;
              ">
                <div style="font-size: 28px; margin-bottom: 4px;">👨</div>
                <div style="font-size: 11px; color: #00f3ff;">男 // MALE</div>
              </div>
              <div id="genderFemale" data-gender="female" style="
                flex: 1;
                padding: 12px;
                background: rgba(255, 0, 160, 0.1);
                border: 2px solid rgba(255, 0, 160, 0.3);
                border-radius: 8px;
                cursor: pointer;
                text-align: center;
                transition: all 0.3s;
              ">
                <div style="font-size: 28px; margin-bottom: 4px;">👩</div>
                <div style="font-size: 11px; color: #ff00a0;">女 // FEMALE</div>
              </div>
            </div>
            <input type="hidden" id="authGender" value="">
          </div>
          
          <div style="margin-bottom: 16px; text-align: left;">
            <label style="
              display: block;
              font-size: 12px;
              color: #00f3ff;
              margin-bottom: 8px;
              font-family: 'Orbitron', monospace;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">
              你是谁？ // WHO_ARE_YOU
            </label>
            <input type="text" id="authName" placeholder="输入你的代号" maxlength="20" style="
              width: 100%;
              padding: 14px;
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid #00f3ff;
              border-radius: 4px;
              font-size: 15px;
              color: #fff;
              outline: none;
              box-shadow: inset 0 0 10px rgba(0, 243, 255, 0.1);
              transition: all 0.3s;
            ">
          </div>
          
          <div style="margin-bottom: 16px; text-align: left;">
            <label style="
              display: block;
              font-size: 12px;
              color: #00f3ff;
              margin-bottom: 8px;
              font-family: 'Orbitron', monospace;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">
              关系 // RELATION
            </label>
            <select id="authRelation" style="
              width: 100%;
              padding: 14px;
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid #ff00ff;
              border-radius: 4px;
              font-size: 15px;
              color: #fff;
              outline: none;
              cursor: pointer;
              box-shadow: inset 0 0 10px rgba(255, 0, 255, 0.1);
            ">
              <option value="" style="background: #0a0a0f;">选择关系 // SELECT</option>
              <option value="self" style="background: #0a0a0f;">本人 // SELF</option>
              <option value="friend" style="background: #0a0a0f;">朋友 // FRIEND</option>
              <option value="lover" style="background: #0a0a0f;">恋人 // LOVER</option>
              <option value="spouse" style="background: #0a0a0f;">爱人/配偶 // SPOUSE</option>
              <option value="family" style="background: #0a0a0f;">家人 // FAMILY</option>
              <option value="client" style="background: #0a0a0f;">客户 // CLIENT</option>
            </select>
          </div>
          
          <div style="margin-bottom: 16px; text-align: left;">
            <label style="
              display: block;
              font-size: 12px;
              color: #ffaa00;
              margin-bottom: 8px;
              font-family: 'Orbitron', monospace;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">
              邀请码 // INVITE_CODE
            </label>
            <input type="password" id="authInviteCode" placeholder="****" maxlength="4" style="
              width: 100%;
              padding: 14px;
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid #ffaa00;
              border-radius: 4px;
              font-size: 15px;
              color: #fff;
              outline: none;
              letter-spacing: 4px;
              box-shadow: inset 0 0 10px rgba(255, 170, 0, 0.1);
              transition: all 0.3s;
            ">
            <div style="
              font-size: 10px;
              color: #ffaa00;
              margin-top: 8px;
              font-family: 'Orbitron', monospace;
              letter-spacing: 1px;
            ">
              ⚠ 请输入邀请码，或向 BOSS Shao 本人索取
            </div>
          </div>
          
          <div id="idCardVerify" style="margin-bottom: 16px; text-align: left; display: none;">
            <label style="
              display: block;
              font-size: 12px;
              color: #ff0040;
              margin-bottom: 8px;
              font-family: 'Orbitron', monospace;
              letter-spacing: 1px;
              text-transform: uppercase;
            ">
              专属验证码 // MASTER_CODE
            </label>
            <input type="password" id="authMasterCode" placeholder="****" maxlength="4" style="
              width: 100%;
              padding: 14px;
              background: rgba(0, 0, 0, 0.5);
              border: 1px solid #ff0040;
              border-radius: 4px;
              font-size: 15px;
              color: #fff;
              outline: none;
              letter-spacing: 4px;
              box-shadow: inset 0 0 10px rgba(255, 0, 64, 0.1);
              transition: all 0.3s;
            ">
            <div style="
              font-size: 10px;
              color: #ff0040;
              margin-top: 8px;
              font-family: 'Orbitron', monospace;
              letter-spacing: 1px;
            ">
              ⚠ 本人身份需要输入专属验证码
            </div>
          </div>
          
          <div style="
            font-size: 11px;
            color: #666;
            margin-top: 12px;
            font-family: 'Orbitron', monospace;
            letter-spacing: 1px;
            text-transform: uppercase;
            border-left: 2px solid #ff00ff;
            padding-left: 12px;
          ">
            ONLY AUTHORIZED RELATIONS CAN CONNECT
          </div>
        </div>
        
        <button id="verifyBtn" style="
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #ff00ff 0%, #b829dd 100%);
          color: white;
          border: none;
          border-radius: 4px;
          font-family: 'Orbitron', monospace;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 
            0 0 20px rgba(255, 0, 255, 0.4),
            inset 0 0 10px rgba(255, 255, 255, 0.2);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        ">
          验证身份 // VERIFY
        </button>
      </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-icon {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .gender-selected-male {
        background: rgba(0, 243, 255, 0.3) !important;
        border-color: #00f3ff !important;
        box-shadow: 0 0 20px rgba(0, 243, 255, 0.4) !important;
      }
      .gender-selected-female {
        background: rgba(255, 0, 160, 0.3) !important;
        border-color: #ff00a0 !important;
        box-shadow: 0 0 20px rgba(255, 0, 160, 0.4) !important;
      }
    `;
    document.head.appendChild(style);
    
    // 绑定事件
    this.bindModalEvents();
  },
  
  bindModalEvents() {
    // 性别选择
    const maleDiv = document.getElementById('genderMale');
    const femaleDiv = document.getElementById('genderFemale');
    
    if (maleDiv) {
      maleDiv.addEventListener('click', () => this.selectGender('male'));
    }
    if (femaleDiv) {
      femaleDiv.addEventListener('click', () => this.selectGender('female'));
    }
    
    // 关系选择
    const relationSelect = document.getElementById('authRelation');
    if (relationSelect) {
      relationSelect.addEventListener('change', () => this.onRelationChange());
    }
    
    // 验证按钮
    const verifyBtn = document.getElementById('verifyBtn');
    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => this.verify());
    }
  },
  
  selectGender(gender) {
    const maleDiv = document.getElementById('genderMale');
    const femaleDiv = document.getElementById('genderFemale');
    const genderInput = document.getElementById('authGender');
    
    if (!maleDiv || !femaleDiv || !genderInput) return;
    
    if (gender === 'male') {
      maleDiv.classList.add('gender-selected-male');
      femaleDiv.classList.remove('gender-selected-female');
    } else {
      maleDiv.classList.remove('gender-selected-male');
      femaleDiv.classList.add('gender-selected-female');
    }
    
    genderInput.value = gender;
  },
  
  onRelationChange() {
    const relation = document.getElementById('authRelation')?.value;
    const masterCodeDiv = document.getElementById('idCardVerify');
    
    if (relation === 'self' && masterCodeDiv) {
      masterCodeDiv.style.display = 'block';
    } else if (masterCodeDiv) {
      masterCodeDiv.style.display = 'none';
      const masterCodeInput = document.getElementById('authMasterCode');
      if (masterCodeInput) {
        masterCodeInput.value = '';
      }
    }
  },
  
  verify() {
    const gender = document.getElementById('authGender')?.value;
    const nameInput = document.getElementById('authName')?.value?.trim();
    const relation = document.getElementById('authRelation')?.value;
    const inviteCode = document.getElementById('authInviteCode')?.value?.trim();
    const masterCode = document.getElementById('authMasterCode')?.value?.trim();
    
    // 验证性别
    if (!gender) {
      alert('请选择性别');
      return;
    }
    
    // 验证代号
    const nameValidation = validateInput(nameInput, 'name');
    if (!nameValidation.valid) {
      alert(nameValidation.msg);
      return;
    }
    
    // 验证关系
    if (!relation) {
      alert('请选择你和邵名远的关系');
      return;
    }
    
    // 验证邀请码
    const codeValidation = validateInput(inviteCode, 'inviteCode');
    if (!codeValidation.valid) {
      alert(codeValidation.msg);
      return;
    }
    
    // 从配置文件获取验证码（如果存在）
    const configInviteCode = window.AMBROSE_CONFIG?.inviteCode || AUTH_CONSTANTS.INVITE_CODE;
    if (inviteCode !== configInviteCode) {
      alert('邀请码错误，请向邵名远本人索取正确的邀请码');
      return;
    }
    
    // 本人身份需要额外验证专属验证码
    if (relation === 'self') {
      if (!masterCode) {
        alert('本人身份需要输入专属验证码');
        return;
      }
      
      // 从配置文件获取验证码（如果存在）
      const configMasterCode = window.AMBROSE_CONFIG?.masterCode || AUTH_CONSTANTS.MASTER_CODE;
      if (masterCode !== configMasterCode) {
        alert('专属验证码错误，无法以本人身份登录');
        return;
      }
    }
    
    // 保存验证信息 - 使用安全的存储
    try {
      localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.AUTHED, 'true');
      localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USER_GENDER, gender);
      localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USER_NAME, nameValidation.value);
      localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USER_RELATION, relation);
    } catch (e) {
      alert('保存登录信息失败');
      return;
    }
    
    // 移除验证弹窗
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.remove();
    }
    
    // 初始化UI
    if (typeof UI !== 'undefined') {
      UI.init();
    }
    
    // 欢迎消息
    const relationText = AUTH_CONSTANTS.RELATION_TEXTS[relation] || relation;
    const genderText = gender === 'male' ? '男' : '女';
    
    setTimeout(() => {
      if (typeof UI !== 'undefined' && UI.addMessage) {
        UI.addMessage(
          `验证通过。\n\n你好，${escapeHtml(nameValidation.value)}。\n你是 BOSS Shao 的${escapeHtml(relationText)}（${escapeHtml(genderText)}），可以使用我。\n\n我是 AMBROSE，很高兴为你服务。`,
          'bot'
        );
      }
    }, 300);
  },
  
  checkAccess() {
    if (!this.isAuthenticated) {
      return false;
    }
    
    const relation = localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USER_RELATION);
    
    if (!AUTH_CONSTANTS.ALLOWED_RELATIONS.includes(relation)) {
      localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.AUTHED);
      this.isAuthenticated = false;
      this.showAuthModal();
      return false;
    }
    
    return true;
  },
  
  logout() {
    // 清除登录状态
    Object.values(AUTH_CONSTANTS.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // 重置认证状态
    this.isAuthenticated = false;
    
    // 隐藏当前聊天界面
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.display = 'none';
    }
    
    // 移除可能存在的旧登录弹窗
    const oldModal = document.getElementById('authModal');
    if (oldModal) {
      oldModal.remove();
    }
    
    // 显示登录界面（不刷新页面）
    this.showAuthModal();
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Auth, AUTH_CONSTANTS };
} else {
  window.Auth = Auth;
  window.AUTH_CONSTANTS = AUTH_CONSTANTS;
}
