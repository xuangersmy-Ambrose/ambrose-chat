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

    // 健身智能助手 - 高端卡片式界面
    showFitnessMenu() {
        // 创建主容器
        const container = document.createElement('div');
        container.className = 'fitness-hub';
        container.style.cssText = `
            background: linear-gradient(180deg, rgba(10,12,20,0.95) 0%, rgba(5,5,8,0.98) 100%);
            border-radius: 20px;
            padding: 24px;
            margin: 16px 0;
            border: 1px solid rgba(0,243,255,0.2);
            box-shadow: 0 0 40px rgba(0,243,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
        `;

        // 标题区域
        const header = document.createElement('div');
        header.style.cssText = `
            text-align: center;
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        `;
        header.innerHTML = `
            <div style="font-size: 40px; margin-bottom: 12px;">🏋️</div>
            <div style="font-family: 'Orbitron', monospace; font-size: 22px; font-weight: 700; color: #00f3ff; letter-spacing: 3px; text-transform: uppercase; text-shadow: 0 0 20px rgba(0,243,255,0.5);">FITNESS PRO</div>
            <div style="font-size: 12px; color: #888; margin-top: 8px; letter-spacing: 2px;">AI 智能健身助手</div>
        `;
        container.appendChild(header);

        // 三大功能模块卡片
        const modulesGrid = document.createElement('div');
        modulesGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 20px;
        `;

        const modules = [
            { 
                icon: '💪', 
                title: '训练', 
                subtitle: 'Training',
                desc: '增肌·减脂·塑形',
                color: '#00f3ff',
                gradient: 'linear-gradient(135deg, rgba(0,243,255,0.15), rgba(0,243,255,0.05))',
                action: 'training'
            },
            { 
                icon: '🥗', 
                title: '饮食', 
                subtitle: 'Nutrition',
                desc: '科学饮食方案',
                color: '#00ff88',
                gradient: 'linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05))',
                action: 'diet'
            },
            { 
                icon: '📊', 
                title: '数据', 
                subtitle: 'Metrics',
                desc: 'BMI·代谢·热量',
                color: '#ff00ff',
                gradient: 'linear-gradient(135deg, rgba(255,0,255,0.15), rgba(255,0,255,0.05))',
                action: 'data'
            }
        ];

        modules.forEach(mod => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: ${mod.gradient};
                border: 1px solid ${mod.color}40;
                border-radius: 16px;
                padding: 20px 12px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            `;
            card.innerHTML = `
                <div style="font-size: 32px; margin-bottom: 8px; filter: drop-shadow(0 0 10px ${mod.color});">${mod.icon}</div>
                <div style="font-family: 'Orbitron', monospace; font-size: 14px; font-weight: 700; color: ${mod.color}; letter-spacing: 2px;">${mod.title}</div>
                <div style="font-size: 10px; color: ${mod.color}80; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px;">${mod.subtitle}</div>
                <div style="font-size: 11px; color: #888; margin-top: 8px;">${mod.desc}</div>
            `;
            card.onmouseover = () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
                card.style.boxShadow = `0 10px 30px ${mod.color}30, 0 0 0 1px ${mod.color}60`;
                card.style.borderColor = mod.color;
            };
            card.onmouseout = () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
                card.style.borderColor = `${mod.color}40`;
            };
            card.onclick = () => {
                container.remove();
                this.showFitnessDetail(mod.action);
            };
            modulesGrid.appendChild(card);
        });
        container.appendChild(modulesGrid);

        // 快速入口
        const quickAccess = document.createElement('div');
        quickAccess.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
        `;

        const quickItems = [
            { icon: '🎯', label: '新手入门', prompt: '我是健身新手，请给我一套完整的入门指南' },
            { icon: '🔥', label: '今日计划', prompt: '给我今天的健身计划建议' },
            { icon: '⚡', label: '快速测算', prompt: '帮我计算BMI和每日热量需求' },
            { icon: '🍎', label: '饮食建议', prompt: '给我今天的饮食建议' }
        ];

        quickItems.forEach(item => {
            const btn = document.createElement('div');
            btn.style.cssText = `
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 12px;
                padding: 14px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
            `;
            btn.innerHTML = `
                <span style="font-size: 24px;">${item.icon}</span>
                <span style="font-size: 14px; color: #e0e0e0; font-weight: 500;">${item.label}</span>
            `;
            btn.onmouseover = () => {
                btn.style.background = 'rgba(0,243,255,0.1)';
                btn.style.borderColor = 'rgba(0,243,255,0.3)';
            };
            btn.onmouseout = () => {
                btn.style.background = 'rgba(255,255,255,0.03)';
                btn.style.borderColor = 'rgba(255,255,255,0.1)';
            };
            btn.onclick = () => {
                container.remove();
                this.addMessage(`${item.icon} ${item.label}`, 'user');
                this.sendFitnessQuery(item.prompt);
            };
            quickAccess.appendChild(btn);
        });
        container.appendChild(quickAccess);

        this.messages.appendChild(container);
        this.scrollToBottom();
    },

    // 健身详情页
    showFitnessDetail(category) {
        const detailData = {
            training: {
                title: '训练教学',
                subtitle: 'TRAINING CENTER',
                color: '#00f3ff',
                items: [
                    { icon: '🌱', title: '新手入门', desc: '零基础起步指南', prompt: '我是健身新手，请给我一套零基础入门训练计划，包括动作教学和注意事项' },
                    { icon: '💪', title: '增肌训练', desc: '力量训练计划', prompt: '我想增肌，请提供详细的增肌训练计划和每个动作的教学' },
                    { icon: '🔥', title: '减脂训练', desc: '燃脂塑形方案', prompt: '我想减脂，请提供高效的减脂训练计划和动作教学' },
                    { icon: '🧘', title: '拉伸放松', desc: '恢复与柔韧性', prompt: '请给我一套完整的拉伸放松指导，包括运动前后的拉伸动作' },
                    { icon: '📅', title: '周期计划', desc: '周/月训练安排', prompt: '请给我一周的健身训练计划安排' },
                    { icon: '🏃', title: '有氧运动', desc: '跑步·骑行·游泳', prompt: '请给我有氧运动的训练建议和计划' }
                ]
            },
            diet: {
                title: '饮食管理',
                subtitle: 'NUTRITION HUB',
                color: '#00ff88',
                items: [
                    { icon: '🥩', title: '增肌饮食', desc: '高蛋白饮食方案', prompt: '我正在增肌，请给我详细的增肌饮食方案和食谱推荐，包括每日营养配比' },
                    { icon: '🥗', title: '减脂饮食', desc: '低热量饮食计划', prompt: '我正在减脂，请给我低热量饮食方案和食谱，包括每日热量控制建议' },
                    { icon: '⚖️', title: '饮食原则', desc: '营养搭配基础', prompt: '请给我日常健康饮食的基本原则和营养搭配建议' },
                    { icon: '🥤', title: '补剂指南', desc: '蛋白粉·肌酸等', prompt: '请给我健身补剂的使用指南和建议' },
                    { icon: '🍽️', title: '一日食谱', desc: '完整饮食安排', prompt: '请给我今天的完整饮食安排，包括三餐和加餐' },
                    { icon: '📊', title: '宏量计算', desc: '蛋白质·碳水·脂肪', prompt: '请帮我计算每日需要的蛋白质、碳水和脂肪摄入量' }
                ]
            },
            data: {
                title: '数据测算',
                subtitle: 'BODY METRICS',
                color: '#ff00ff',
                items: [
                    { icon: '⚖️', title: 'BMI 计算', desc: '身体质量指数', prompt: '请帮我计算BMI并详细解释结果含义和健康建议' },
                    { icon: '🔥', title: '基础代谢', desc: 'BMR 测算', prompt: '请帮我计算基础代谢率(BMR)并解释影响因素' },
                    { icon: '📈', title: '热量需求', desc: 'TDEE 每日总消耗', prompt: '请帮我计算每日总热量需求(TDEE)并提供饮食建议' },
                    { icon: '💧', title: '水分计算', desc: '每日饮水建议', prompt: '请帮我计算每日建议饮水量' },
                    { icon: '🎯', title: '目标设定', desc: '科学目标规划', prompt: '请帮我制定科学的健身目标和时间规划' },
                    { icon: '📉', title: '进度追踪', desc: '记录与分析', prompt: '请给我健身进度追踪的方法和建议' }
                ]
            }
        };

        const data = detailData[category];
        if (!data) return;

        // 创建详情容器
        const container = document.createElement('div');
        container.className = 'fitness-detail';
        container.style.cssText = `
            background: linear-gradient(180deg, rgba(10,12,20,0.95) 0%, rgba(5,5,8,0.98) 100%);
            border-radius: 20px;
            padding: 24px;
            margin: 16px 0;
            border: 1px solid ${data.color}40;
            box-shadow: 0 0 40px ${data.color}15, inset 0 1px 0 rgba(255,255,255,0.05);
        `;

        // 头部
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        `;
        header.innerHTML = `
            <div>
                <div style="font-family: 'Orbitron', monospace; font-size: 20px; font-weight: 700; color: ${data.color}; letter-spacing: 2px;">${data.title}</div>
                <div style="font-size: 11px; color: ${data.color}80; letter-spacing: 3px; margin-top: 4px;">${data.subtitle}</div>
            </div>
            <button class="back-btn" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 8px 16px; color: #888; font-size: 13px; cursor: pointer; transition: all 0.2s;">← 返回</button>
        `;
        header.querySelector('.back-btn').onclick = () => {
            container.remove();
            this.showFitnessMenu();
        };
        container.appendChild(header);

        // 功能卡片网格
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        `;

        data.items.forEach(item => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: linear-gradient(135deg, rgba(15,18,30,0.8), rgba(10,12,20,0.9));
                border: 1px solid ${data.color}30;
                border-radius: 16px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            `;
            card.innerHTML = `
                <div style="display: flex; align-items: flex-start; gap: 16px;">
                    <div style="font-size: 36px; filter: drop-shadow(0 0 8px ${data.color});">${item.icon}</div>
                    <div style="flex: 1;">
                        <div style="font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 6px;">${item.title}</div>
                        <div style="font-size: 12px; color: #888; line-height: 1.5;">${item.desc}</div>
                    </div>
                    <div style="color: ${data.color}; font-size: 20px;">→</div>
                </div>
            `;
            card.onmouseover = () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = `0 8px 25px ${data.color}20`;
                card.style.borderColor = `${data.color}60`;
            };
            card.onmouseout = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
                card.style.borderColor = `${data.color}30`;
            };
            card.onclick = () => {
                container.remove();
                this.addMessage(`${item.icon} ${item.title}`, 'user');
                this.sendFitnessQuery(item.prompt);
            };
            grid.appendChild(card);
        });
        container.appendChild(grid);

        this.messages.appendChild(container);
        this.scrollToBottom();
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

    // 健身视频库
    fitnessVideos: {
        training: [
            { id: 1, title: '胸肌训练基础', duration: '12:30', level: '入门', views: '12.5K', thumbnail: '💪', color: '#00f3ff' },
            { id: 2, title: '背部力量塑造', duration: '15:45', level: '中级', views: '8.3K', thumbnail: '🏋️', color: '#00f3ff' },
            { id: 3, title: '腿部爆发力', duration: '18:20', level: '进阶', views: '15.2K', thumbnail: '🦵', color: '#00f3ff' },
            { id: 4, title: '核心稳定性', duration: '10:15', level: '入门', views: '22.1K', thumbnail: '🎯', color: '#00f3ff' }
        ],
        cardio: [
            { id: 5, title: 'HIIT燃脂训练', duration: '20:00', level: '进阶', views: '35.2K', thumbnail: '🔥', color: '#ff6b35' },
            { id: 6, title: '有氧舞蹈', duration: '25:30', level: '入门', views: '28.7K', thumbnail: '💃', color: '#ff6b35' },
            { id: 7, title: '跳绳减脂', duration: '15:00', level: '中级', views: '19.3K', thumbnail: '⚡', color: '#ff6b35' }
        ],
        yoga: [
            { id: 8, title: '晨间唤醒瑜伽', duration: '20:00', level: '入门', views: '42.1K', thumbnail: '🌅', color: '#9d4edd' },
            { id: 9, title: '睡前放松', duration: '15:30', level: '入门', views: '38.9K', thumbnail: '🌙', color: '#9d4edd' },
            { id: 10, title: '拉伸恢复', duration: '12:00', level: '入门', views: '25.7K', thumbnail: '🌿', color: '#9d4edd' }
        ]
    },

    // 视频版健身菜单
    showFitnessMenu() {
        const container = document.createElement('div');
        container.style.cssText = `
            background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%);
            border-radius: 24px;
            padding: 28px;
            margin: 16px 0;
            border: 1px solid rgba(0,243,255,0.25);
            box-shadow: 0 0 60px rgba(0,243,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08);
        `;

        // 顶部渐变条
        container.innerHTML = `
            <div style="height: 3px; background: linear-gradient(90deg, #00f3ff, #00ff88, #ff00ff); margin: -28px -28px 24px -28px; border-radius: 24px 24px 0 0;"></div>
            
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 48px; margin-bottom: 12px; filter: drop-shadow(0 0 20px rgba(0,243,255,0.6));">🏋️</div>
                <div style="font-family: 'Orbitron', monospace; font-size: 26px; font-weight: 800; color: #fff; letter-spacing: 4px; text-shadow: 0 0 30px rgba(0,243,255,0.6);">FITNESS PRO</div>
                <div style="font-size: 13px; color: #00f3ff; margin-top: 8px; letter-spacing: 2px;">AI 智能健身助手 · 视频教学版</div>
                <div style="margin-top: 12px; display: flex; justify-content: center; gap: 8px;">
                    <span style="background: rgba(0,243,255,0.15); padding: 4px 10px; border-radius: 12px; font-size: 10px; color: #00f3ff; border: 1px solid rgba(0,243,255,0.3);">📹 视频教学</span>
                    <span style="background: rgba(0,255,136,0.15); padding: 4px 10px; border-radius: 12px; font-size: 10px; color: #00ff88; border: 1px solid rgba(0,255,136,0.3);">🤖 AI指导</span>
                </div>
            </div>

            <div style="display: flex; justify-content: space-around; padding: 16px; background: rgba(0,0,0,0.3); border-radius: 12px; margin-bottom: 20px;">
                <div style="text-align: center;"><div style="font-family: 'Orbitron'; font-size: 22px; font-weight: 700; color: #00f3ff;">10+</div><div style="font-size: 10px; color: #888;">专业视频</div></div>
                <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
                <div style="text-align: center;"><div style="font-family: 'Orbitron'; font-size: 22px; font-weight: 700; color: #00ff88;">3</div><div style="font-size: 10px; color: #888;">分类</div></div>
                <div style="width: 1px; background: rgba(255,255,255,0.1);"></div>
                <div style="text-align: center;"><div style="font-family: 'Orbitron'; font-size: 22px; font-weight: 700; color: #ff00ff;">4K</div><div style="font-size: 10px; color: #888;">画质</div></div>
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 16px; overflow-x: auto;" id="fitnessTabs">
                <button onclick="UI.switchFitnessTab('all', this)" style="background: rgba(0,243,255,0.2); border: 1px solid rgba(0,243,255,0.5); border-radius: 20px; padding: 8px 16px; color: #00f3ff; font-size: 12px; cursor: pointer;">🔥 全部</button>
                <button onclick="UI.switchFitnessTab('training', this)" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 16px; color: #888; font-size: 12px; cursor: pointer;">💪 力量</button>
                <button onclick="UI.switchFitnessTab('cardio', this)" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 16px; color: #888; font-size: 12px; cursor: pointer;">🔥 有氧</button>
                <button onclick="UI.switchFitnessTab('yoga', this)" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 16px; color: #888; font-size: 12px; cursor: pointer;">🧘 瑜伽</button>
            </div>

            <div id="videoGrid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px;"></div>

            <div style="display: flex; gap: 10px; margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
                <button onclick="UI.showFitnessNutrition()" style="flex: 1; background: linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05)); border: 1px solid rgba(0,255,136,0.4); border-radius: 10px; padding: 12px; color: #00ff88; font-size: 13px; cursor: pointer;">🥗 饮食方案</button>
                <button onclick="UI.showFitnessCalculator()" style="flex: 1; background: linear-gradient(135deg, rgba(255,0,255,0.15), rgba(255,0,255,0.05)); border: 1px solid rgba(255,0,255,0.4); border-radius: 10px; padding: 12px; color: #ff00ff; font-size: 13px; cursor: pointer;">📊 身体数据</button>
            </div>
        `;

        this.messages.appendChild(container);
        this.renderVideoGrid('all');
        this.scrollToBottom();
    },

    switchFitnessTab(category, btn) {
        // 更新按钮样式
        const tabs = document.getElementById('fitnessTabs').querySelectorAll('button');
        tabs.forEach(tab => {
            tab.style.background = 'rgba(255,255,255,0.05)';
            tab.style.borderColor = 'rgba(255,255,255,0.1)';
            tab.style.color = '#888';
        });
        btn.style.background = 'rgba(0,243,255,0.2)';
        btn.style.borderColor = 'rgba(0,243,255,0.5)';
        btn.style.color = '#00f3ff';
        
        this.renderVideoGrid(category);
    },

    renderVideoGrid(category) {
        const grid = document.getElementById('videoGrid');
        if (!grid) return;
        
        let videos = [];
        if (category === 'all') {
            videos = [...this.fitnessVideos.training, ...this.fitnessVideos.cardio, ...this.fitnessVideos.yoga];
        } else {
            videos = this.fitnessVideos[category] || [];
        }

        grid.innerHTML = videos.map(v => `
            <div onclick="UI.openVideoPlayer(${v.id}, '${v.title}', '${v.duration}', '${v.level}', '${v.views}', '${v.thumbnail}', '${v.color}')" 
                 style="background: linear-gradient(145deg, rgba(15,18,30,0.9), rgba(8,10,15,0.95)); border-radius: 12px; overflow: hidden; border: 1px solid ${v.color}30; cursor: pointer; transition: all 0.3s;">
                <div style="position: relative; aspect-ratio: 16/10; background: linear-gradient(135deg, ${v.color}20, ${v.color}05); display: flex; align-items: center; justify-content: center;">
                    <div style="font-size: 40px; filter: drop-shadow(0 0 10px ${v.color});">${v.thumbnail}</div>
                    <div style="position: absolute; bottom: 6px; right: 6px; background: rgba(0,0,0,0.8); padding: 2px 6px; border-radius: 4px; font-size: 10px; color: #fff; font-family: 'Orbitron';">${v.duration}</div>
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0">
                        <div style="width: 44px; height: 44px; background: ${v.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px ${v.color};">▶</div>
                    </div>
                </div>
                <div style="padding: 10px;">
                    <div style="font-size: 13px; font-weight: 600; color: #fff; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${v.title}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; color: ${v.color}; background: ${v.color}15; padding: 2px 6px; border-radius: 4px;">${v.level}</span>
                        <span style="font-size: 10px; color: #666;">▶ ${v.views}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    openVideoPlayer(id, title, duration, level, views, thumbnail, color) {
        const player = document.createElement('div');
        player.style.cssText = `
            background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%);
            border-radius: 20px;
            padding: 20px;
            margin: 12px 0;
            border: 1px solid ${color}40;
            box-shadow: 0 0 40px ${color}15;
        `;
        player.innerHTML = `
            <div style="position: relative; aspect-ratio: 16/9; background: linear-gradient(135deg, ${color}30, #000); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <div style="font-size: 64px;">${thumbnail}</div>
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 16px;">
                    <div style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 6px;">${title}</div>
                    <div style="display: flex; gap: 12px; font-size: 12px; color: #aaa;">
                        <span style="color: ${color};">⏱ ${duration}</span>
                        <span>👁 ${views}</span>
                        <span>📊 ${level}</span>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button onclick="UI.sendFitnessQuery('请给我详细的${title}训练指导，包括动作要领、组数次数建议和注意事项')" style="flex: 1; background: ${color}; border: none; border-radius: 10px; padding: 12px; color: #000; font-size: 14px; font-weight: 600; cursor: pointer;">▶ 开始训练</button>
                <button onclick="this.closest('.video-player').remove()" style="width: 44px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: #fff; font-size: 18px; cursor: pointer;">✕</button>
            </div>
        `;
        player.className = 'video-player';
        this.messages.appendChild(player);
        this.scrollToBottom();
    },

    showFitnessNutrition() {
        this.addMessage('🥗 科学饮食方案\n\n点击下方获取专属饮食建议：', 'bot');
        setTimeout(() => {
            this.messages.insertAdjacentHTML('beforeend', `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 12px 0; padding: 0 16px;">
                    <div onclick="UI.sendFitnessQuery('我正在增肌，请给我详细的增肌饮食方案，包括每日热量、蛋白质摄入和具体食谱')" style="background: linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,255,136,0.02)); border: 1px solid rgba(0,255,136,0.3); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer;">
                        <div style="font-size: 32px; margin-bottom: 8px;">🥩</div>
                        <div style="font-size: 14px; font-weight: 600; color: #00ff88;">增肌饮食</div>
                        <div style="font-size: 10px; color: #888; margin-top: 4px;">高蛋白·高热量</div>
                    </div>
                    <div onclick="UI.sendFitnessQuery('我正在减脂，请给我低热量饮食方案，包括每日热量控制和减脂食谱')" style="background: linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,255,136,0.02)); border: 1px solid rgba(0,255,136,0.3); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer;">
                        <div style="font-size: 32px; margin-bottom: 8px;">🥗</div>
                        <div style="font-size: 14px; font-weight: 600; color: #00ff88;">减脂饮食</div>
                        <div style="font-size: 10px; color: #888; margin-top: 4px;">低热量·高纤维</div>
                    </div>
                </div>
            `);
            this.scrollToBottom();
        }, 200);
    },

    showFitnessCalculator() {
        this.addMessage('📊 身体数据测算\n\n选择需要计算的项目：', 'bot');
        setTimeout(() => {
            this.messages.insertAdjacentHTML('beforeend', `
                <div style="display: grid; gap: 8px; margin: 12px 0; padding: 0 16px;">
                    <div onclick="UI.sendFitnessQuery('请帮我计算BMI并解释结果含义和健康建议')" style="background: rgba(255,0,255,0.05); border: 1px solid rgba(255,0,255,0.2); border-radius: 10px; padding: 14px; display: flex; align-items: center; gap: 12px; cursor: pointer;">
                        <div style="font-size: 28px;">⚖️</div>
                        <div style="flex: 1;"><div style="font-size: 14px; font-weight: 600; color: #fff;">BMI 计算</div><div style="font-size: 11px; color: #888;">身体质量指数</div></div>
                        <div style="color: #ff00ff;">→</div>
                    </div>
                    <div onclick="UI.sendFitnessQuery('请帮我计算基础代谢率(BMR)并解释影响因素')" style="background: rgba(255,0,255,0.05); border: 1px solid rgba(255,0,255,0.2); border-radius: 10px; padding: 14px; display: flex; align-items: center; gap: 12px; cursor: pointer;">
                        <div style="font-size: 28px;">🔥</div>
                        <div style="flex: 1;"><div style="font-size: 14px; font-weight: 600; color: #fff;">基础代谢率</div><div style="font-size: 11px; color: #888;">BMR 测算</div></div>
                        <div style="color: #ff00ff;">→</div>
                    </div>
                    <div onclick="UI.sendFitnessQuery('请帮我计算每日总热量需求(TDEE)并提供饮食建议')" style="background: rgba(255,0,255,0.05); border: 1px solid rgba(255,0,255,0.2); border-radius: 10px; padding: 14px; display: flex; align-items: center; gap: 12px; cursor: pointer;">
                        <div style="font-size: 28px;">📈</div>
                        <div style="flex: 1;"><div style="font-size: 14px; font-weight: 600; color: #fff;">热量需求</div><div style="font-size: 11px; color: #888;">TDEE 计算</div></div>
                        <div style="color: #ff00ff;">→</div>
                    </div>
                </div>
            `);
            this.scrollToBottom();
        }, 200);
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

        this.addMessage(`${greeting}，我是 AMBROSE。${hints}\n\n点击左下角 🏋️ 按钮开启健身智能助手，或直接输入消息与我对话。`, 'bot');
    },

    bindEvents() {
        const sendBtn = document.getElementById('sendBtn');
        const fitnessBtn = document.getElementById('fitnessBtn');

        sendBtn?.addEventListener('click', () => this.send());
        fitnessBtn?.addEventListener('click', () => this.showFitnessMenu());

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