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

    // 健身智能助手菜单
    showFitnessMenu() {
        const menuText = `🏋️ **健身智能助手**\n\n请选择功能模块：`;
        this.addMessage(menuText, 'bot');

        setTimeout(() => {
            this.addFitnessMenuButtons();
        }, 300);
    },

    addFitnessMenuButtons() {
        const menuDiv = document.createElement('div');
        menuDiv.className = 'fitness-menu';
        menuDiv.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin: 12px 0;
            padding: 0 20px;
        `;

        const buttons = [
            { icon: '🏋️', text: '健身训练教学', color: '#00f3ff', action: 'training' },
            { icon: '🥗', text: '科学饮食推荐', color: '#00ff88', action: 'diet' },
            { icon: '📊', text: '健身数据测算', color: '#ff00ff', action: 'data' }
        ];

        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.style.cssText = `
                background: linear-gradient(135deg, rgba(10,12,20,0.9), rgba(10,12,20,0.7));
                border: 1px solid ${btn.color};
                border-radius: 12px;
                padding: 16px 20px;
                color: white;
                font-family: 'Noto Sans SC', sans-serif;
                font-size: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 0 15px ${btn.color}20;
                transition: all 0.3s ease;
            `;
            button.innerHTML = `<span style="font-size: 24px;">${btn.icon}</span><span style="color: ${btn.color}; font-weight: 600;">${btn.text}</span>`;
            button.onmouseover = () => {
                button.style.boxShadow = `0 0 25px ${btn.color}40`;
                button.style.transform = 'translateY(-2px)';
            };
            button.onmouseout = () => {
                button.style.boxShadow = `0 0 15px ${btn.color}20`;
                button.style.transform = 'translateY(0)';
            };
            button.onclick = () => this.showFitnessSubMenu(btn.action);
            menuDiv.appendChild(button);
        });

        this.messages.appendChild(menuDiv);
        this.scrollToBottom();
    },

    showFitnessSubMenu(category) {
        const oldMenu = document.querySelector('.fitness-menu');
        if (oldMenu) oldMenu.remove();

        const subMenus = {
            training: {
                title: '🏋️ 健身训练教学',
                options: [
                    { icon: '🌱', text: '新手零基础训练', prompt: '我是健身新手，请给我一套零基础入门训练计划' },
                    { icon: '💪', text: '增肌训练计划 & 动作教学', prompt: '我想增肌，请提供增肌训练计划和动作教学' },
                    { icon: '🔥', text: '减脂训练计划 & 动作教学', prompt: '我想减脂，请提供减脂训练计划和动作教学' },
                    { icon: '🧘', text: '拉伸与放松指导', prompt: '请给我一套运动后的拉伸放松指导' }
                ]
            },
            diet: {
                title: '🥗 科学饮食推荐',
                options: [
                    { icon: '🥩', text: '增肌饮食方案', prompt: '我正在增肌，请给我科学饮食方案和食谱推荐' },
                    { icon: '🥗', text: '减脂饮食方案', prompt: '我正在减脂，请给我低热量饮食方案和食谱' },
                    { icon: '🍎', text: '日常健康饮食原则', prompt: '请给我日常健康饮食的基本原则和建议' }
                ]
            },
            data: {
                title: '📊 健身数据测算',
                options: [
                    { icon: '⚖️', text: 'BMI 计算', prompt: '请帮我计算BMI并解释结果含义' },
                    { icon: '🔥', text: '基础代谢率 (BMR) 测算', prompt: '请帮我计算基础代谢率(BMR)并解释' },
                    { icon: '📈', text: '每日热量需求计算', prompt: '请帮我计算每日热量需求并提供建议' }
                ]
            }
        };

        const menu = subMenus[category];
        if (!menu) return;

        this.addMessage(`**${menu.title}**\n\n请选择具体功能：`, 'bot');

        setTimeout(() => {
            const subMenuDiv = document.createElement('div');
            subMenuDiv.className = 'fitness-submenu';
            subMenuDiv.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin: 12px 0;
                padding: 0 20px 0 40px;
            `;

            menu.options.forEach(opt => {
                const button = document.createElement('button');
                button.style.cssText = `
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 12px 16px;
                    color: #e0e0e0;
                    font-family: 'Noto Sans SC', sans-serif;
                    font-size: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-align: left;
                    transition: all 0.2s ease;
                `;
                button.innerHTML = `<span>${opt.icon}</span><span>${opt.text}</span>`;
                button.onmouseover = () => {
                    button.style.background = 'rgba(255,255,255,0.1)';
                    button.style.borderColor = 'rgba(0,243,255,0.3)';
                };
                button.onmouseout = () => {
                    button.style.background = 'rgba(255,255,255,0.05)';
                    button.style.borderColor = 'rgba(255,255,255,0.1)';
                };
                button.onclick = () => {
                    subMenuDiv.remove();
                    this.addMessage(`${opt.icon} ${opt.text}`, 'user');
                    this.sendFitnessQuery(opt.prompt);
                };
                subMenuDiv.appendChild(button);
            });

            const backBtn = document.createElement('button');
            backBtn.style.cssText = `
                background: transparent;
                border: 1px dashed rgba(255,255,255,0.2);
                border-radius: 8px;
                padding: 10px 16px;
                color: #888;
                font-family: 'Noto Sans SC', sans-serif;
                font-size: 13px;
                cursor: pointer;
                margin-top: 8px;
                transition: all 0.2s ease;
            `;
            backBtn.innerHTML = '← 返回主菜单';
            backBtn.onmouseover = () => {
                backBtn.style.borderColor = 'rgba(255,255,255,0.4)';
                backBtn.style.color = '#aaa';
            };
            backBtn.onmouseout = () => {
                backBtn.style.borderColor = 'rgba(255,255,255,0.2)';
                backBtn.style.color = '#888';
            };
            backBtn.onclick = () => {
                subMenuDiv.remove();
                this.showFitnessMenu();
            };
            subMenuDiv.appendChild(backBtn);

            this.messages.appendChild(subMenuDiv);
            this.scrollToBottom();
        }, 300);
    },

    async sendFitnessQuery(prompt) {
        const loading = this.addLoading();

        try {
            const reply = await this.callAPI(prompt);
            loading.remove();
            this.addMessage(reply, 'bot');

            setTimeout(() => {
                this.addContinueOptions();
            }, 500);
        } catch (err) {
            loading.remove();
            this.addMessage('抱歉，获取健身建议失败，请稍后重试。', 'bot');
        }
    },

    addContinueOptions() {
        const optionsDiv = document.createElement('div');
        optionsDiv.style.cssText = `
            display: flex;
            gap: 12px;
            margin: 12px 0 0 60px;
            flex-wrap: wrap;
        `;

        const options = [
            { text: '继续问健身', action: 'fitness' },
            { text: '返回健身菜单', action: 'menu' }
        ];

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                background: rgba(0,243,255,0.1);
                border: 1px solid rgba(0,243,255,0.3);
                border-radius: 16px;
                padding: 8px 16px;
                color: #00f3ff;
                font-size: 13px;
                cursor: pointer;
                transition: all 0.2s ease;
            `;
            btn.textContent = opt.text;
            btn.onmouseover = () => {
                btn.style.background = 'rgba(0,243,255,0.2)';
            };
            btn.onmouseout = () => {
                btn.style.background = 'rgba(0,243,255,0.1)';
            };
            btn.onclick = () => {
                optionsDiv.remove();
                this.showFitnessMenu();
            };
            optionsDiv.appendChild(btn);
        });

        this.messages.appendChild(optionsDiv);
        this.scrollToBottom();
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
        hints += '\n• 发送"健身"开启健身智能助手';
        
        this.addMessage(`${greeting}，我是 AMBROSE。${hints}\n\n有什么可以帮你的？`, 'bot');
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

        // 检查是否是健身助手
        if (text === '健身' || text === '/fitness' || text === '🏋️') {
            this.addMessage(text, 'user');
            this.input.value = '';
            this.input.style.height = 'auto';
            this.showFitnessMenu();
            return;
        }

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
                <div class="typing-indicator">
                    <div class="typing-bar"></div>
                    <div class="typing-bar"></div>
                    <div class="typing-bar"></div>
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