/**
 * AMBROSE Chat v4.0 - 主控制器
 * 集成情感引擎、健康系统、所有专家模块
 */

// 全局UI控制器
const UI = {
  messages: null,
  input: null,
  isMaster: false,
  healthCore: null,
  isProcessing: false,

  init() {
    this.messages = document.getElementById('messages');
    this.input = document.getElementById('messageInput');
    
    // 初始化健康核心系统
    this.healthCore = new AmbroseHealthCore(this);
    
    // 检查身份
    const userRelation = localStorage.getItem('ambrose_user_relation');
    this.isMaster = userRelation === 'self';

    this.bindEvents();
    this.startClock();
    this.addWelcomeMessage();
    
    console.log('[AMBROSE] v4.0 initialized - Health Core ready');
  },

  bindEvents() {
    // 发送按钮
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
      sendBtn.onclick = () => this.handleSend();
    }

    // 输入框事件
    if (this.input) {
      this.input.onkeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      };
      
      // 自动调整高度
      this.input.oninput = () => {
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
      };
    }
  },

  async handleSend() {
    const text = this.input?.value?.trim();
    if (!text || this.isProcessing) return;

    // 添加用户消息
    this.addMessage(text, 'user');
    this.input.value = '';
    this.input.style.height = 'auto';
    
    // 显示加载状态
    this.isProcessing = true;
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.disabled = true;
    
    const loadingEl = this.addLoading();

    try {
      let reply;
      
      // 检查是否是哲学相关查询
      if (this.isPhilosophyQuery(text)) {
        reply = this.healthCore.philosophyCore.generateDailyPhilosophy();
      } else {
        // 使用新的健康核心系统处理消息
        reply = await this.healthCore.processMessage(text);
      }
      
      loadingEl.remove();
      this.addMessage(reply, 'bot');
    } catch (err) {
      console.error('Error:', err);
      loadingEl.remove();
      this.addMessage('抱歉，我遇到了一点问题，请稍后再试。', 'bot');
    } finally {
      this.isProcessing = false;
      if (sendBtn) sendBtn.disabled = false;
    }
  },

  // 检查是否是哲学相关查询
  isPhilosophyQuery(text) {
    const lowerText = text.toLowerCase();
    const philosophyKeywords = [
      '哲学', '智慧', '哲理', '名言', 'quote', 'philosophy', 'wisdom',
      '人生', '意义', 'meaning', 'purpose', '存在', 'existential',
      '斯多葛', 'stoic', '道家', 'tao', '佛', 'buddha', '儒', 'confucius'
    ];
    return philosophyKeywords.some(keyword => lowerText.includes(keyword));
  },

  addMessage(text, sender) {
    if (!this.messages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // 解析markdown风格格式
    const formattedText = this.formatMessage(text);
    
    messageDiv.innerHTML = formattedText;
    this.messages.appendChild(messageDiv);
    this.messages.scrollTop = this.messages.scrollHeight;
  },

  formatMessage(text) {
    // 简单的markdown风格解析
    let formatted = text
      // 粗体 **text**
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // 斜体 *text*
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // 换行
      .replace(/\n/g, '<br>');
    
    return formatted;
  },

  addLoading() {
    if (!this.messages) return document.createElement('div');
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot loading';
    loadingDiv.innerHTML = '<span class="loading-dots">...</span>';
    this.messages.appendChild(loadingDiv);
    this.messages.scrollTop = this.messages.scrollHeight;
    
    return loadingDiv;
  },

  addWelcomeMessage() {
    if (this.healthCore) {
      const welcomeMessage = this.healthCore.generateWelcomeMessage();
      this.addMessage(welcomeMessage, 'bot');
    }
  },

  startClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const dateString = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      clockEl.textContent = `${timeString} ${dateString}`;
    };
    
    updateClock();
    setInterval(updateClock, 1000);
  }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
