/**
 * AMBROSE Chat - 简化版（纯文字对话）
 */

const API_URL = window.location.origin + '/api/chat';

// UI控制
const UI = {
    messages: null,
    input: null,
    
    init() {
        this.messages = document.getElementById('messages');
        this.input = document.getElementById('messageInput');
        this.bindEvents();
        this.addMessage('你好，我是 AMBROSE。\n\n有什么可以帮你的？', 'bot');
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
    },
    
    async send() {
        const text = this.input?.value?.trim();
        if (!text) return;
        
        // 显示用户消息
        this.addMessage(text, 'user');
        this.input.value = '';
        
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
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.reply || '抱歉，没有获取到回复';
    },
    
    addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        
        const avatar = sender === 'user' ? '👤' : '🧰';
        const time = new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
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
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
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