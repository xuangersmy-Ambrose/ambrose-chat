/**
 * AMBROSE Chat - 终极赛博朋克版
 * 高精度报时 + 科幻界面 + 用户统计 + 管理员功能
 */

const API_URL = window.location.origin + '/api/chat';
const STATS_URL = window.location.origin + '/api/stats';
const ADMIN_URL = window.location.origin + '/api/admin';

// 高精度时间工具
const TimeUtil = {
    getBeijingTime() {
        const now = new Date();
        const beijingTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Shanghai"}));
        return beijingTime;
    },
    
    formatTime(date) {
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Shanghai'
        });
    },
    
    formatDate(date) {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Shanghai'
        });
    },
    
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
    isMaster: false,
    
    init() {
        this.messages = document.getElementById('messages');
        this.input = document.getElementById('messageInput');
        this.clockElement = document.getElementById('clock');
        
        // 检查是否是主人
        const userRelation = localStorage.getItem('ambrose_user_relation');
        this.isMaster = userRelation === 'self';
        
        this.bindEvents();
        this.startClock();
        this.recordUserVisit();
        this.addWelcomeMessage();
    },
    
    // 记录用户访问统计
    async recordUserVisit() {
        try {
            const userName = localStorage.getItem('ambrose_user_name') || '未知用户';
            const userRelation = localStorage.getItem('ambrose_user_relation') || 'unknown';
            const gender = localStorage.getItem('ambrose_user_gender') || 'male';
            
            await fetch(STATS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'record',
                    userName,
                    userRelation,
                    gender
                })
            });
        } catch (e) {
            console.error('Record visit failed:', e);
        }
    },
    
    // 查询统计信息（仅本人可用）
    async showStats() {
        if (!this.isMaster) {
            this.addMessage('抱歉，只有 BOSS Shao 本人可以查看使用统计。', 'bot');
            return;
        }
        
        try {
            // 携带身份验证参数
            const response = await fetch(`${STATS_URL}?isMaster=true&userRelation=self`);
            
            if (response.status === 403) {
                this.addMessage('权限验证失败，无法查看统计信息。', 'bot');
                return;
            }
            
            const stats = await response.json();
            
            if (stats.error) {
                this.addMessage(`获取统计失败：${stats.message}`, 'bot');
                return;
            }
            
            const related = stats.relatedUsers;
            const breakdown = related.breakdown;
            
            let statsText = `📊 AMBROSE 使用统计\n\n`;
            statsText += `━━━━━━━━━━━━━━━━\n`;
            statsText += `👥 总用户数: ${stats.totalUsers}\n`;
            statsText += `🔄 总访问次数: ${stats.totalVisits}\n`;
            statsText += `⏰ 更新时间: ${stats.timestamp}\n\n`;
            
            statsText += `👤 与你有关的人 (${related.count}人)\n`;
            statsText += `━━━━━━━━━━━━━━━━\n`;
            if (breakdown['本人'] > 0) statsText += `  🎯 本人: ${breakdown['本人']}\n`;
            if (breakdown['朋友'] > 0) statsText += `  👫 朋友: ${breakdown['朋友']}\n`;
            if (breakdown['恋人'] > 0) statsText += `  💕 恋人: ${breakdown['恋人']}\n`;
            if (breakdown['爱人配偶'] > 0) statsText += `  💑 爱人/配偶: ${breakdown['爱人配偶']}\n`;
            if (breakdown['家人'] > 0) statsText += `  👨‍👩‍👧‍👦 家人: ${breakdown['家人']}\n`;
            if (breakdown['客户'] > 0) statsText += `  💼 客户: ${breakdown['客户']}\n`;
            
            if (related.users.length > 0) {
                statsText += `\n📋 详细名单:\n`;
                related.users.forEach((u, i) => {
                    const relationIcon = {
                        'self': '🎯',
                        'friend': '👫',
                        'lover': '💕',
                        'spouse': '💑',
                        'family': '👨‍👩‍👧‍👦',
                        'client': '💼'
                    }[u.relation] || '👤';
                    statsText += `  ${i+1}. ${relationIcon} ${u.name} (${u.gender}) - ${u.visits}次访问\n`;
                });
            }
            
            if (stats.strangers.count > 0) {
                statsText += `\n🚫 无关访客: ${stats.strangers.count}人\n`;
            }
            
            this.addMessage(statsText, 'bot');
            
        } catch (err) {
            console.error('Stats error:', err);
            this.addMessage('获取统计信息失败，请稍后重试。', 'bot');
        }
    },
    
    // 提交设计更改请求（仅本人可用）
    async requestDesignChange(description) {
        if (!this.isMaster) {
            this.addMessage('抱歉，只有 BOSS Shao 本人可以请求更改设计。', 'bot');
            return;
        }
        
        try {
            const response = await fetch(ADMIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'designChange',
                    userRelation: 'self',
                    isMaster: true,
                    masterCode: '0812',
                    description: description
                })
            });
            
            const data = await response.json();
            
            if (response.status === 403) {
                this.addMessage('权限验证失败，无法提交设计更改请求。', 'bot');
                return;
            }
            
            if (data.success) {
                this.addMessage(`✅ 设计更改请求已提交\n\n${data.note}\n\n请求内容：${description}`, 'bot');
            } else {
                this.addMessage(`提交失败：${data.message || '未知错误'}`, 'bot');
            }
            
        } catch (err) {
            console.error('Design change error:', err);
            this.addMessage('提交设计更改请求失败，请稍后重试。', 'bot');
        }
    },
    
    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    },
    
    updateClock() {
        if (this.clockElement) {
            this.clockElement.textContent = TimeUtil.formatTime(TimeUtil.getBeijingTime());
        }
        const dateElement = document.getElementById('date');
        if (dateElement) {
            dateElement.textContent = TimeUtil.formatDate(TimeUtil.getBeijingTime());
        }
    },
    
    addWelcomeMessage() {
        const hour = TimeUtil.getBeijingTime().getHours();
        let greeting = '你好';
        
        if (hour < 6) greeting = '夜深了';
        else if (hour < 9) greeting = '早上好';
        else if (hour < 12) greeting = '上午好';
        else if (hour < 14) greeting = '中午好';
        else if (hour < 18) greeting = '下午好';
        else greeting = '晚上好';
        
        let hints = '';
        if (this.isMaster) {
            hints = '\n\n💡 可用指令：\n• 发送"统计"查看使用情况\n• 发送"改设计:描述"请求界面更改';
        }
        
        this.addMessage(`${greeting}，我是 AMBROSE。\n\n当前时间：${TimeUtil.getFullTimestamp()}${hints}\n\n有什么可以帮你的？`, 'bot');
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
        
        this.input?.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
        });
    },
    
    async send() {
        const text = this.input?.value?.trim();
        if (!text) return;
        
        // 检查是否是统计命令
        if (text === '/stats' || text === '统计' || text === '使用情况') {
            this.addMessage(text, 'user');
            this.input.value = '';
            this.input.style.height = 'auto';
            await this.showStats();
            return;
        }
        
        // 检查是否是设计更改请求（仅主人可用）
        if (text.startsWith('改设计:') || text.startsWith('改设计：')) {
            this.addMessage(text, 'user');
            this.input.value = '';
            this.input.style.height = 'auto';
            const description = text.replace(/^改设计[：:]/, '').trim();
            if (description) {
                await this.requestDesignChange(description);
            } else {
                this.addMessage('请描述需要更改的设计内容，例如：\n改设计:把按钮改成红色', 'bot');
            }
            return;
        }
        
        this.addMessage(text, 'user');
        this.input.value = '';
        this.input.style.height = 'auto';
        
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
            
            // 获取客户端本地时间和时区
            const now = new Date();
            const clientTime = now.toLocaleString('zh-CN');
            const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message,
                    userName,
                    userRelation,
                    isMaster: userRelation === 'self',
                    gender,
                    clientTime,
                    clientTimezone,
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
        
        let avatar = '🧰';
        if (sender === 'user') {
            const gender = localStorage.getItem('ambrose_user_gender');
            avatar = gender === 'female' ? '👩' : '👨';
        }
        
        const time = TimeUtil.formatTime(TimeUtil.getBeijingTime());
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