/**
 * AMBROSE Chat - 终极赛博朋克版
 * 高精度报时 + 科幻界面
 */

const API_URL = window.location.origin + '/api/chat';

// 高精度时间工具
const TimeUtil = {
    // 获取准确的北京时间
    getBeijingTime() {
        const now = new Date();
        // 强制使用东八区时间
        const beijingTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Shanghai"}));
        return beijingTime;
    },
    
    // 格式化时间
    formatTime(date) {
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Shanghai'
        });
    },
    
    // 格式化日期
    formatDate(date) {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Shanghai'
        });
    },
    
    // 获取完整时间戳
    getFullTimestamp() {
        const now = this.getBeijingTime();
        return `${this.formatDate(now)} ${this.formatTime(now)}`;
    }
};

// UI控制
const UI = {
    messages: null,
    input: null,
    clockElement: null,
    
    init() {
        this.messages = document.getElementById('messages');
        this.input = document.getElementById('messageInput');
        this.clockElement = document.getElementById('clock');
        
        this.bindEvents();
        this.startClock();
        this.addWelcomeMessage();
    },
    
    // 启动高精度时钟
    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    },
    
    // 更新时钟显示
    updateClock() {
        if (this.clockElement) {
            this.clockElement.textContent = TimeUtil.formatTime(TimeUtil.getBeijingTime());
        }
        const dateElement = document.getElementById('date');
        if (dateElement) {
            dateElement.textContent = TimeUtil.formatDate(TimeUtil.getBeijingTime());
        }
    },
    
    // 添加欢迎消息
    addWelcomeMessage() {
        const hour = TimeUtil.getBeijingTime().getHours();
        let greeting = '你好';
        
        if (hour < 6) greeting = '夜深了';
        else if (hour < 9) greeting = '早上好';
        else if (hour < 12) greeting = '上午好';
        else if (hour < 14) greeting = '中午好';
        else if (hour < 18) greeting = '下午好';
        else greeting = '晚上好';
        
        this.addMessage(`${greeting}，我是 AMBROSE。\n\n当前时间：${TimeUtil.getFullTimestamp()}\n\n有什么可以帮你的？`, 'bot');
    },
    
    bindEvents() {
        const sendBtn = document.getElementById('sendBtn');
        
        sendBtn?.addEventListener('click', () => this.send());
        
        this.input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.send();
            }
        });
        
        // 自动调整输入框高度
        this.input?.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
        });
    },
    
    async send() {
        const text = this.input?.value?.trim();
        if (!text) return;
        
        // 显示用户消息（带准确时间）
        this.addMessage(text, 'user');
        this.input.value = '';
        this.input.style.height = 'auto';
        
        // 显示加载中
        const loading = this.addLoading();
        
        try {
            const reply = await this.callAPI(text);
            loading.remove();
            this.addMessage(reply, 'bot');
        } catch (err) {
            loading.remove();
            this.addMessage('抱歉，服务暂时不可用，请稍后重试', 'bot');
            console.error(err);
        }
    },
    
    async callAPI(message) {
        try {
            const userName = localStorage.getItem('ambrose_user_name') || '未知用户';
            const userRelation = localStorage.getItem('ambrose_user_relation') || 'unknown';
            const gender = localStorage.getItem('ambrose_user_gender') || 'male';
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message,
                    userName,
                    userRelation,
                    isMaster: userRelation === 'self',
                    gender,
                    timestamp: TimeUtil.getFullTimestamp()
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                console.error('API错误:', data);
                throw new Error(data.details || data.error || '请求失败');
            }
            
            return data.reply || '抱歉，没有获取到回复';
        } catch (err) {
            console.error('请求异常:', err);
            throw err;
        }
    },
    
    addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        
        // 获取头像
        let avatar = '🧰';
        if (sender === 'user') {
            const gender = localStorage.getItem('ambrose_user_gender');
            avatar = gender === 'female' ? '👩' : '👨';
        }
        
        const time = TimeUtil.formatTime(TimeUtil.getBeijingTime());
        
        // 处理换行
        const formattedText = text.replace(/\n/g, '<br>');
        
        div.innerHTML = `
            <div class="avatar">${avatar}</div>
            <div class="bubble">
                <div class="text">${formattedText}</div>
                <div class="time">${time}</div>
            </div>
        `;
        
        this.messages.appendChild(div);
        this.scrollToBottom();
    },
    
    addLoading() {
        const div = document.createElement('div');
        div.className = 'message bot loading-msg';
        div.innerHTML = `
            <div class="avatar">🧰</div>
            <div class="bubble">
                <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messages.appendChild(div);
        this.scrollToBottom();
        return div;
    },
    
    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
});