/**
 * AMBROSE Chat v3.0 - 顶级App体验
 * 参考 Telegram、Discord、Linear 设计
 */

const API_URL = window.location.origin + '/api/chat';

// 主UI控制器
const UI = {
    messages: null,
    input: null,
    clockElement: null,
    isMaster: false,
    fitnessPro: null,
    components: null,
    isProcessing: false,

    init() {
        this.messages = document.getElementById('messages');
        this.input = document.getElementById('messageInput');
        this.clockElement = document.getElementById('clock');
        
        // 初始化组件库
        this.components = new UIComponents();
        
        // 初始化健身系统
        this.fitnessPro = new FitnessPro(this);
        
        // 初始化健康数据中心
        this.healthDashboard = new HealthDashboard(this);
        
        // 检查身份
        const userRelation = localStorage.getItem('ambrose_user_relation');
        this.isMaster = userRelation === 'self';

        this.bindEvents();
        this.startClock();
        this.addWelcomeMessage();
        
        // 显示健康中心按钮
        const fitnessBtn = document.getElementById('fitnessBtn');
        if (fitnessBtn) {
            fitnessBtn.onclick = () => this.healthDashboard.showHealthHub();
        }
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

        // 滚动监听
        if (this.messages) {
            this.messages.onscroll = () => this.handleScroll();
        }
    },

    handleScroll() {
        const scrollBtn = document.getElementById('scrollToBottom');
        if (!scrollBtn) return;
        
        const isNearBottom = this.messages.scrollHeight - this.messages.scrollTop - this.messages.clientHeight < 200;
        scrollBtn.classList.toggle('visible', !isNearBottom);
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
            const reply = await this.callAPI(text);
            loadingEl.remove();
            this.addMessage(reply, 'bot');
        } catch (err) {
            console.error('API Error:', err);
            loadingEl.remove();
            this.addMessage('抱歉，服务暂时不可用，请稍后重试。', 'bot');
        } finally {
            this.isProcessing = false;
            if (sendBtn) sendBtn.disabled = false;
        }
    },

    async callAPI(message) {
        const userRelation = localStorage.getItem('ambrose_user_relation') || 'unknown';
        const userName = localStorage.getItem('ambrose_user_name') || 'User';
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message,
                userRelation,
                userName,
                isMaster: this.isMaster
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.reply || '抱歉，没有获取到回复。';
    },

    addMessage(text, sender) {
        if (!this.messages) return;

        const group = document.createElement('div');
        group.className = `message-group ${sender}`;

        // 头像
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🧰';

        // 内容区域
        const content = document.createElement('div');
        content.className = 'message-content';

        // 作者名
        const author = document.createElement('div');
        author.className = 'message-author';
        author.textContent = sender === 'user' ? 'You' : 'AMBROSE';

        // 气泡
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        // 处理Markdown样式
        bubble.innerHTML = this.formatMessage(text);

        // 元信息
        const meta = document.createElement('div');
        meta.className = 'message-meta';
        meta.innerHTML = `
            <span>${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
            ${sender === 'user' ? '<span class="message-status">✓✓</span>' : ''}
        `;

        content.appendChild(author);
        content.appendChild(bubble);
        content.appendChild(meta);

        group.appendChild(avatar);
        group.appendChild(content);

        this.messages.appendChild(group);
        this.scrollToBottom();
        
        return group;
    },

    addMessageHTML(html, sender) {
        if (!this.messages) return;

        const wrapper = document.createElement('div');
        wrapper.className = `message-group ${sender}`;
        wrapper.style.animation = 'slide-up 0.4s ease';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🧰';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.style.maxWidth = '90%';
        content.innerHTML = html;

        wrapper.appendChild(avatar);
        wrapper.appendChild(content);

        this.messages.appendChild(wrapper);
        this.scrollToBottom();
    },

    formatMessage(text) {
        // 简单的Markdown格式化
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code style="background: rgba(0,243,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace;">$1</code>')
            .replace(/\n/g, '<br>');
    },

    addLoading() {
        const group = document.createElement('div');
        group.className = 'message-group bot';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🧰';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.style.padding = '20px';
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        bubble.appendChild(indicator);
        content.appendChild(bubble);
        group.appendChild(avatar);
        group.appendChild(content);

        this.messages.appendChild(group);
        this.scrollToBottom();

        return group;
    },

    async handleSendWithPrompt(prompt) {
        // 添加用户消息提示
        const loadingEl = this.addLoading();
        
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) sendBtn.disabled = true;
        this.isProcessing = true;

        try {
            const reply = await this.callAPI(prompt);
            loadingEl.remove();
            this.addMessage(reply, 'bot');
        } catch (err) {
            console.error('API Error:', err);
            loadingEl.remove();
            this.addMessage('抱歉，服务暂时不可用，请稍后重试。', 'bot');
        } finally {
            this.isProcessing = false;
            if (sendBtn) sendBtn.disabled = false;
        }
    },

    scrollToBottom() {
        if (this.messages) {
            this.messages.scrollTo({
                top: this.messages.scrollHeight,
                behavior: 'smooth'
            });
        }
    },

    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    },

    updateClock() {
        if (!this.clockElement) return;
        
        const now = new Date();
        const beijingTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }));
        
        const timeStr = beijingTime.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const dateStr = beijingTime.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        this.clockElement.textContent = timeStr;
        
        const dateEl = document.getElementById('date');
        if (dateEl) dateEl.textContent = dateStr;
    },

    addWelcomeMessage() {
        const hour = new Date().getHours();
        let greeting = '你好';
        let healthTip = '';
        let icon = '👋';
        
        if (hour < 6) {
            greeting = '夜深了';
            healthTip = '💤 熬夜伤身，记得补充水分';
            icon = '🌙';
        } else if (hour < 9) {
            greeting = '早上好';
            healthTip = '🌅 新的一天，从一杯温水开始';
            icon = '☀️';
        } else if (hour < 12) {
            greeting = '上午好';
            healthTip = '💪 上午是运动的最佳时间';
            icon = '🏃';
        } else if (hour < 14) {
            greeting = '中午好';
            healthTip = '🥗 午餐记得营养均衡';
            icon = '🍱';
        } else if (hour < 18) {
            greeting = '下午好';
            healthTip = '💧 下午茶时间，记得补水';
            icon = '☕';
        } else {
            greeting = '晚上好';
            healthTip = '🌙 晚上少食，有助于睡眠';
            icon = '🌆';
        }

        const userName = localStorage.getItem('ambrose_user_name') || '朋友';
        
        if (this.isMaster) {
            this.addMessage(`${icon} ${greeting}，BOSS Shao。我是 AMBROSE，你的 AI 健康教练。${healthTip ? '\n\n' + healthTip : ''}\n\n今天想聊点什么？\n• 💪 制定今日运动计划\n• 🥗 记录饮食 & 营养分析\n• 😴 昨晚睡眠质量如何\n• 🧘 情绪压力需要疏导\n• 💊 健康症状咨询\n\n点击下方的 ❤️ 按钮可以打开健康中心，或者直接在输入框和我聊聊。`, 'bot');
        } else {
            this.addMessage(`${icon} ${greeting}，${userName}。我是 AMBROSE，BOSS Shao 的 AI 健康助手。${healthTip ? '\n\n' + healthTip : ''}\n\n我可以帮你：\n• 解答健康养生问题\n• 提供运动建议\n• 饮食营养指导\n• 情绪陪伴支持\n\n有什么想聊的吗？`, 'bot');
        }
    }
};

// 全局健身接口
window.Fitness = {
    showFitnessHub() {
        if (UI.fitnessPro) {
            UI.fitnessPro.showFitnessHub();
        }
    },
    
    showCategory(category) {
        if (UI.fitnessPro) {
            UI.fitnessPro.showCategory(category);
        }
    },
    
    playVideo(id, title, subtitle, duration, level, views, desc, color) {
        if (UI.fitnessPro) {
            UI.fitnessPro.playVideo(id, title, subtitle, duration, level, views, desc, color);
        }
    },
    
    showNutrition() {
        if (UI.fitnessPro) {
            UI.fitnessPro.showNutrition();
        }
    },
    
    showBodyMetrics() {
        if (UI.fitnessPro) {
            UI.fitnessPro.showBodyMetrics();
        }
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
