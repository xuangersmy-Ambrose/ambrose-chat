/**
 * AMBROSE Health Dashboard v1.0
 * AI 健康教练 - 健康数据面板
 */

class HealthDashboard {
    constructor(ui) {
        this.ui = ui;
        this.data = this.loadData();
        this.init();
    }

    init() {
        // 监听健康数据更新
        window.addEventListener('healthDataUpdated', () => {
            this.data = this.loadData();
        });
    }

    loadData() {
        const defaultData = {
            // 运动数据
            exercise: {
                todaySteps: 0,
                todayCalories: 0,
                todayDuration: 0,
                weeklyGoal: 150, // 分钟/周
                weeklyProgress: 0
            },
            // 饮食数据
            nutrition: {
                todayCalories: 0,
                targetCalories: 2000,
                protein: 0,
                carbs: 0,
                fat: 0,
                water: 0 // 毫升
            },
            // 睡眠数据
            sleep: {
                lastNight: 0, // 小时
                quality: 'unknown', // good/fair/poor
                streak: 0
            },
            // 健康指标
            metrics: {
                weight: null,
                height: null,
                bmi: null,
                lastCheck: null
            },
            // 今日心情
            mood: {
                today: null,
                notes: ''
            }
        };

        try {
            const saved = localStorage.getItem('ambrose_health_data');
            return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
        } catch {
            return defaultData;
        }
    }

    saveData() {
        localStorage.setItem('ambrose_health_data', JSON.stringify(this.data));
        window.dispatchEvent(new Event('healthDataUpdated'));
    }

    // 渲染环形进度条
    renderCircularProgress(value, max, color, icon, label) {
        const percentage = Math.min((value / max) * 100, 100);
        const radius = 26;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
        
        return `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
                <div style="position: relative; width: 60px; height: 60px;">
                    <svg width="60" height="60" style="transform: rotate(-90deg);">
                        <circle cx="30" cy="30" r="${radius}" fill="none" 
                            stroke="rgba(255,255,255,0.08)" stroke-width="5"/>
                        <circle cx="30" cy="30" r="${radius}" fill="none" 
                            stroke="${color}" stroke-width="5" 
                            stroke-linecap="round"
                            stroke-dasharray="${circumference}"
                            stroke-dashoffset="${strokeDashoffset}"
                            style="transition: stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1);"
                            filter="drop-shadow(0 0 3px ${color})"/>
                    </svg>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                                font-size: 18px;">${icon}</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 14px; font-weight: 700; color: ${color}; font-family: 'JetBrains Mono', monospace;">
                        ${value ? value.toLocaleString() : '0'}
                    </div>
                    <div style="font-size: 9px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1px;">
                        ${label}
                    </div>
                </div>
            </div>
        `;
    }

        const today = new Date();
        const dateStr = today.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
        const weekdayStr = today.toLocaleDateString('zh-CN', { weekday: 'long' });
        const html = `
            <div style="width: 100%; max-width: 600px;">
                <!-- 健康中心标题 -->
                <div style="text-align: center; margin-bottom: 28px;">
                    <div style="font-size: 44px; margin-bottom: 10px; animation: pulse-glow 2s infinite;">🏥</div>
                    <div style="font-size: 22px; font-weight: 800; color: var(--primary-500); letter-spacing: 2px;">HEALTH CENTER</div>
                    <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 6px;">${dateStr} · ${weekdayStr} · 你的个人健康数据中心</div>
                </div>

                <!-- 今日摘要环形进度 -->
                ${this.renderStreakAndAchievements()}
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; 
                            background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 20px;">
                    ${this.renderCircularProgress(
                        this.data.exercise.todaySteps, 10000, '#00f3ff', '👟', '步数'
                    )}
                    ${this.renderCircularProgress(
                        this.data.exercise.todayCalories, 500, '#ff00ff', '🔥', '热量'
                    )}
                    ${this.renderCircularProgress(
                        Math.round((this.data.sleep.lastNight || 0) * 100), 800, '#bd00ff', '😴', '睡眠'
                    )}
                    ${this.renderCircularProgress(
                        this.data.nutrition.water, 2500, '#00ff88', '💧', '饮水'
                    )}
                </div>

                <!-- 功能入口 -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
                    ${this.renderFeatureCard('💪 运动计划', '制定今日训练', 'exercise', '#00ff88')}
                    ${this.renderFeatureCard('🥗 饮食记录', '记录一餐', 'nutrition', '#ffaa00')}
                    ${this.renderFeatureCard('😴 睡眠追踪', '记录睡眠', 'sleep', '#b829dd')}
                    ${this.renderFeatureCard('📊 健康档案', '查看趋势', 'metrics', '#00f3ff')}
                </div>

                <!-- 心情记录 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px;">
                    <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">今日心情</div>
                    <div style="display: flex; justify-content: space-around; margin-bottom: 12px;">
                        ${['😊', '😄', '😐', '😔', '😰'].map(emoji => `
                            <button onclick="HealthDashboard.recordMood('${emoji}')" 
                                style="font-size: 28px; background: ${this.data.mood.today === emoji ? 'rgba(0,243,255,0.2)' : 'transparent'}; 
                                    border: 2px solid ${this.data.mood.today === emoji ? 'var(--primary-500)' : 'transparent'}; 
                                    border-radius: 12px; padding: 8px; cursor: pointer; transition: all 0.2s;"
                                onmouseover="this.style.transform='scale(1.1)'"
                                onmouseout="this.style.transform='scale(1)'">
                                ${emoji}
                            </button>
                        `).join('')}
                    </div>
                    <textarea id="moodNote" placeholder="记录一下今天的心情..." 
                        style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); border-radius: 12px; 
                            padding: 12px; color: var(--text-primary); font-size: 14px; resize: none; height: 60px;"
                        onchange="HealthDashboard.saveMoodNote(this.value)"
                    >${this.data.mood.notes || ''}</textarea>
                </div>

                <!-- 快捷操作 -->
                <div style="margin-top: 20px; text-align: center;">
                    <button onclick="UI.addMessage('BOSS Shao 今天身体状态如何？需要我推荐什么运动或饮食建议吗？', 'user'); setTimeout(() => UI.addMessage('我来分析一下今天的健康数据，然后给你个性化建议。', 'bot'), 500);"
                        style="background: linear-gradient(135deg, var(--primary-500), var(--accent-500)); border: none; 
                            border-radius: 24px; padding: 12px 32px; color: var(--bg-base); font-weight: 600; 
                            cursor: pointer; font-size: 14px; transition: all 0.2s;"
                        onmouseover="this.style.transform='scale(1.05)'"
                        onmouseout="this.style.transform='scale(1)'">
                        🧠 让 AI 分析今日健康状况
                    </button>
                </div>
            </div>
        `;

        this.ui.addMessageHTML(html, 'bot');
    }

    renderSummaryCard(iconLabel, value, unit, color) {
        const [icon, label] = iconLabel.split(' ');
        return `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px;
                        background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)); position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; right: 0; width: 60px; height: 60px; 
                            background: ${color}10; border-radius: 0 0 0 60px;"></div>
                <div style="font-size: 20px; margin-bottom: 4px;">${icon}</div>
                <div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">${label}</div>
                <div style="font-size: 24px; font-weight: 700; color: ${color}; font-family: 'JetBrains Mono', monospace;">
                    ${value}<span style="font-size: 12px; color: var(--text-tertiary);">${unit}</span>
                </div>
            </div>
        `;
    }

    renderFeatureCard(title, desc, action, color) {
        const [icon, ...titleText] = title.split(' ');
        return `
            <button onclick="HealthDashboard.openFeature('${action}')"
                style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px; 
                        text-align: left; cursor: pointer; transition: all 0.2s; width: 100%; position: relative; overflow: hidden;">
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: ${color};"></div>
                <div style="font-size: 24px; margin-bottom: 8px;">${icon}</div>
                <div style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${titleText.join(' ')}</div>
                <div style="font-size: 11px; color: var(--text-tertiary);">${desc}</div>
            </button>
        `;
    }

    formatSleep(hours) {
        if (!hours || hours === 0) return '--';
        return hours.toFixed(1);
    }

    // 显示连续打卡/成就区域
    renderStreakAndAchievements() {
        const streakDays = this.calculateStreak();
        const achievements = this.getAchievements();
        const fireIntensity = streakDays > 7 ? '🔥' : streakDays > 3 ? '🔥' : '✨';
        
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
                <!-- 连续打卡 -->
                <div style="background: linear-gradient(135deg, rgba(255,170,0,0.2), rgba(255,170,0,0.08)); 
                            border: 1px solid rgba(255,170,0,0.35); border-radius: 18px; padding: 18px;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="font-size: 40px; animation: ${streakDays > 0 ? 'pulse-glow 1.5s infinite' : 'none'};">${fireIntensity}</div>
                        <div>
                            <div style="font-size: 28px; font-weight: 800; color: #ffb800; font-family: 'JetBrains Mono', monospace;"
003e
                                ${streakDays}
                            </div>
                            <div style="font-size: 12px; color: var(--text-tertiary);">连续打卡天数</div>
                        </div>
                    </div>
                </div>

                <!-- 成就徽章 -->
                <div style="background: linear-gradient(135deg, rgba(0,243,255,0.2), rgba(0,243,255,0.08)); 
                            border: 1px solid rgba(0,243,255,0.35); border-radius: 18px; padding: 18px;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <div style="font-size: 40px;">🏆</div>
                        <div>
                            <div style="font-size: 28px; font-weight: 800; color: var(--primary-500); font-family: 'JetBrains Mono', monospace;">
                                ${achievements.length}
                            </div>
                            <div style="font-size: 12px; color: var(--text-tertiary);">获得徽章</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    calculateStreak() {
        return this.data.sleep.streak || 0;
    }

    getAchievements() {
        const achievements = [];
        if (this.data.exercise.todaySteps >= 10000) achievements.push({ icon: '👟', name: '万步达人' });
        if (this.data.nutrition.water >= 2000) achievements.push({ icon: '💧', name: '水润达人' });
        if (this.data.sleep.lastNight >= 7) achievements.push({ icon: '😴', name: '睡眠大师' });
        return achievements;
    }

    // 打开功能模块
    static openFeature(feature) {
        const dashboard = UI.healthDashboard;
        switch(feature) {
            case 'exercise':
                dashboard.showExercisePlanner();
                break;
            case 'nutrition':
                dashboard.showNutritionTracker();
                break;
            case 'sleep':
                dashboard.showSleepTracker();
                break;
            case 'metrics':
                dashboard.showHealthMetrics();
                break;
        }
    }

    // 显示运动计划器
    showExercisePlanner() {
        const html = `
            <div style="width: 100%; max-width: 600px; animation: slide-up 0.4s ease;">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <button onclick="UI.healthDashboard.showHealthHub()" 
                        style="background: transparent; border: 1px solid var(--border-subtle); border-radius: 8px; 
                                padding: 8px 12px; color: var(--text-secondary); cursor: pointer; margin-right: 12px;">
                        ← 返回
                    </button>
                    <div style="font-size: 18px; font-weight: 700;">运动计划</div>
                </div>

                <!-- 运动类型选择 -->
                <div style="margin-bottom: 20px;">
                    <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">选择运动类型</div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                        ${[
                            { icon: '🏃', name: '跑步', color: '#00ff88' },
                            { icon: '🏋️', name: '力量', color: '#ff00a0' },
                            { icon: '🧘', name: '瑜伽', color: '#b829dd' },
                            { icon: '🏊', name: '游泳', color: '#00f3ff' },
                            { icon: '🚴', name: '骑行', color: '#ffaa00' },
                            { icon: '💪', name: 'HIIT', color: '#ff0040' }
                        ].map(t => `
                            <button onclick="HealthDashboard.startExercise('${t.name}')"
                                style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; 
                                        padding: 16px 8px; text-align: center; cursor: pointer; transition: all 0.2s;">
                                <div style="font-size: 28px; margin-bottom: 8px;">${t.icon}</div>
                                <div style="font-size: 12px; color: var(--text-secondary);">${t.name}</div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- 快速添加 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px;">
                    <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">快速记录运动</div>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${['30分钟慢跑', '20分钟瑜伽', '45分钟力量训练', '15分钟HIIT'].map(a => `
                            <button onclick="HealthDashboard.quickLog('${a}')"
                                style="background: rgba(0,243,255,0.1); border: 1px solid rgba(0,243,255,0.3); border-radius: 20px; 
                                        padding: 8px 16px; color: var(--primary-500); font-size: 12px; cursor: pointer;">
                                + ${a}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        this.ui.addMessageHTML(html, 'bot');
    }

    // 显示饮食追踪器
    showNutritionTracker() {
        const remaining = Math.max(0, this.data.nutrition.targetCalories - (this.data.nutrition.todayCalories || 0));
        const progress = Math.min(((this.data.nutrition.todayCalories || 0) / this.data.nutrition.targetCalories) * 100, 100);
        const html = `
            <div style="width: 100%; max-width: 600px;">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <button onclick="UI.healthDashboard.showHealthHub()" 
                        style="background: transparent; border: 1px solid var(--border-subtle); border-radius: 8px; 
                                padding: 8px 12px; color: var(--text-secondary); cursor: pointer; margin-right: 12px;">
                        ← 返回
                    </button>
                    <div style="font-size: 18px; font-weight: 700;">饮食记录</div>
                </div>

                <!-- 热量环 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 20px; margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                        <div>
                            <div style="font-size: 32px; font-weight: 700; color: var(--warning);">${this.data.nutrition.todayCalories}</div>
                            <div style="font-size: 12px; color: var(--text-tertiary);">今日摄入 / ${this.data.nutrition.targetCalories} kcal</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 24px; font-weight: 700; color: ${remaining > 0 ? 'var(--success)' : 'var(--danger)'}">${remaining}</div>
                            <div style="font-size: 11px; color: var(--text-tertiary);">${remaining > 0 ? '剩余' : '超出'}</div>
                        </div>
                    </div>
                    <!-- 进度条 -->
                    <div style="height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden; box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);">
                        <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, var(--warning), var(--danger)); 
                                    border-radius: 5px; transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 10px rgba(255, 170, 0, 0.3);"></div>
                    </div>
                </div>

                <!-- 快速添加食物 -->
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">快速添加</div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                        ${[
                            { name: '早餐', icon: '🍳', cals: 400 },
                            { name: '午餐', icon: '🍱', cals: 600 },
                            { name: '晚餐', icon: '🥗', cals: 500 },
                            { name: '零食', icon: '🍎', cals: 150 },
                            { name: '饮品', icon: '☕', cals: 50 },
                            { name: '自定义', icon: '➕', cals: 0 }
                        ].map(f => `
                            <button onclick="HealthDashboard.addFood('${f.name}', ${f.cals})"
                                style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; 
                                        padding: 12px; display: flex; align-items: center; gap: 10px; cursor: pointer;">
                                <span style="font-size: 24px;">${f.icon}</span>
                                <div style="text-align: left;">
                                    <div style="font-size: 13px; font-weight: 500;">${f.name}</div>
                                    <div style="font-size: 11px; color: var(--text-tertiary);">${f.cals > 0 ? f.cals + ' kcal' : '手动输入'}</div>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- 饮水记录 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 16px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 20px;">💧</span>
                            <span style="font-size: 14px; font-weight: 500;">今日饮水</span>
                        </div>
                        <span style="font-size: 18px; font-weight: 700; color: #00f3ff;">${this.data.nutrition.water} / 2500 ml</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        ${[200, 250, 500].map(ml => `
                            <button onclick="HealthDashboard.addWater(${ml})"
                                style="flex: 1; background: rgba(0,243,255,0.1); border: 1px solid rgba(0,243,255,0.3); 
                                        border-radius: 8px; padding: 10px; color: var(--primary-500); font-size: 12px; cursor: pointer;">
                                +${ml}ml
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        this.ui.addMessageHTML(html, 'bot');
    }

    // 显示睡眠追踪器
    showSleepTracker() {
        const sleepTips = [
            '成年人建议每晚睡眠 7-9 小时',
            '晚上 11 点前入睡有助于身体修复',
            '睡眠前 1 小时避免蓝光屏幕',
            '保持卧室温度在 18-22°C 最佳',
            '睡前泡脚有助于提高睡眠质量',
            '避免睡前 3 小时进食过多'
        ];
        const randomTip = sleepTips[Math.floor(Math.random() * sleepTips.length)];
        const html = `
            <div style="width: 100%; max-width: 600px;">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <button onclick="UI.healthDashboard.showHealthHub()" 
                        style="background: transparent; border: 1px solid var(--border-subtle); border-radius: 8px; 
                                padding: 8px 12px; color: var(--text-secondary); cursor: pointer; margin-right: 12px;">
                        ← 返回
                    </button>
                    <div style="font-size: 18px; font-weight: 700;">睡眠追踪</div>
                </div>

                <!-- 昨晚睡眠 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 20px; margin-bottom: 16px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 8px;">🌙</div>
                    <div style="font-size: 14px; color: var(--text-tertiary); margin-bottom: 8px;">昨晚睡眠时长</div>
                    <div style="font-size: 36px; font-weight: 700; color: var(--accent-500); font-family: 'JetBrains Mono', monospace;">
                        ${this.data.sleep.lastNight > 0 ? this.data.sleep.lastNight.toFixed(1) : '--'} 小时
                    </div>
                    <div style="margin-top: 12px;">
                        ${this.data.sleep.quality !== 'unknown' ? `
                            <span style="display: inline-block; background: ${this.getSleepQualityColor(this.data.sleep.quality)}20; 
                                        color: ${this.getSleepQualityColor(this.data.sleep.quality)}; padding: 6px 16px; 
                                        border-radius: 20px; font-size: 12px; font-weight: 500;">
                                ${this.getSleepQualityText(this.data.sleep.quality)}
                            </span>
                        ` : ''}
                    </div>
                </div>

                <!-- 记录睡眠 -->
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">记录睡眠时长</div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                        ${[
                            { hours: 6, label: '6小时', quality: 'poor' },
                            { hours: 7, label: '7小时', quality: 'fair' },
                            { hours: 8, label: '8小时', quality: 'good' },
                            { hours: 9, label: '9小时', quality: 'good' },
                            { hours: 5, label: '<6小时', quality: 'poor' },
                            { hours: 0, label: '自定义', quality: 'unknown' }
                        ].map(s => `
                            <button onclick="HealthDashboard.recordSleep(${s.hours}, '${s.quality}')"
                                style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; 
                                        padding: 16px; text-align: center; cursor: pointer;">
                                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary);">${s.label}</div>
                                <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">
                                    ${s.quality === 'good' ? '推荐' : s.quality === 'fair' ? '还行' : s.quality === 'poor' ? '不足' : '自定义'}
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <!-- 睡眠建议 -->
                <div style="background: linear-gradient(135deg, rgba(184,41,221,0.1), rgba(0,0,0,0.2)); border: 1px solid rgba(184,41,221,0.3); border-radius: 16px; padding: 16px;">
                    <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: var(--accent-500);">💤 睡眠小贴士</div>
                    <ul style="font-size: 13px; color: var(--text-secondary); line-height: 1.8; margin: 0; padding-left: 16px;">
                        <li>${randomTip}</li>
                        <li>晚上 11 点前入睡有助于身体修复</li>
                        <li>睡眠前 1 小时避免蓝光屏幕</li>
                        <li>保持卧室温度在 18-22°C 最佳</li>
                    </ul>
                </div>
            </div>
        `;
        this.ui.addMessageHTML(html, 'bot');
    }

    // 显示健康指标
    showHealthMetrics() {
        const bmi = this.data.metrics.bmi;
        const bmiStatus = bmi ? this.getBMIStatus(bmi) : null;
        
        const html = `
            <div style="width: 100%; max-width: 600px;">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <button onclick="UI.healthDashboard.showHealthHub()" 
                        style="background: transparent; border: 1px solid var(--border-subtle); border-radius: 8px; 
                                padding: 8px 12px; color: var(--text-secondary); cursor: pointer; margin-right: 12px;">
                        ← 返回
                    </button>
                    <div style="font-size: 18px; font-weight: 700;">健康档案</div>
                </div>

                <!-- BMI 卡片 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 20px; margin-bottom: 16px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50%; right: -20%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(0,243,255,0.1) 0%, transparent 70%); pointer-events: none;"></div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <div>
                            <div style="font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 1px;">体质指数 (BMI)</div>
                            <div style="font-size: 36px; font-weight: 700; color: ${bmiStatus ? bmiStatus.color : 'var(--text-primary)'}; margin-top: 4px;">
                                ${bmi ? bmi.toFixed(1) : '--'}
                            </div>
                            ${bmiStatus ? `<div style="font-size: 12px; color: ${bmiStatus.color}; margin-top: 4px;">${bmiStatus.text}</div>` : ''}
                        </div>
                        <button onclick="HealthDashboard.updateBodyMetrics()"
                            style="background: rgba(0,243,255,0.1); border: 1px solid rgba(0,243,255,0.3); border-radius: 8px; 
                                    padding: 8px 12px; color: var(--primary-500); font-size: 12px; cursor: pointer;">
                            编辑数据
                        </button>
                    </div>
                    <!-- BMI 比例条 -->
                    <div style="height: 8px; background: linear-gradient(90deg, #3498db, #2ecc71, #f39c12, #e74c3c); border-radius: 4px; position: relative; margin-bottom: 8px;">
                        ${bmi ? `<div style="position: absolute; top: -4px; left: ${Math.min((bmi / 40) * 100, 100)}%; 
                                    width: 16px; height: 16px; background: white; border-radius: 50%; 
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.3); transform: translateX(-50%);"></div>` : ''}
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-tertiary);">
                        <span>偏瘦</span>
                        <span>正常</span>
                        <span>超重</span>
                        <span>肥胖</span>
                    </div>
                </div>

                <!-- 基础数据 -->
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px;">
                    <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px;">
                        <div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase;">身高</div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
                            ${this.data.metrics.height ? this.data.metrics.height : '--'} <span style="font-size: 12px; color: var(--text-tertiary);">cm</span>
                        </div>
                    </div>
                    <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px;">
                        <div style="font-size: 11px; color: var(--text-tertiary); text-transform: uppercase;">体重</div>
                        <div style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
                            ${this.data.metrics.weight ? this.data.metrics.weight : '--'} <span style="font-size: 12px; color: var(--text-tertiary);">kg</span>
                        </div>
                    </div>
                </div>

                <!-- 健康趋势按钮 -->
                <button onclick="UI.addMessage('请展示我近期的健康数据趋势分析', 'user'); setTimeout(() => UI.addMessage('根据你近7天的记录，我来分析一下你的健康趋势...', 'bot'), 500);"
                    style="width: 100%; background: linear-gradient(135deg, rgba(0,243,255,0.1), rgba(184,41,221,0.1)); 
                            border: 1px solid var(--border-subtle); border-radius: 12px; padding: 16px; 
                            color: var(--text-primary); cursor: pointer; text-align: left;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <div style="font-size: 14px; font-weight: 600;">查看健康趋势分析</div>
                            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">基于迁7天数据的AI分析</div>
                        </div>
                        <span style="font-size: 20px;">📈</span>
                    </div>
                </button>
            </div>
        `;
        this.ui.addMessageHTML(html, 'bot');
    }

    // 记录心情
    static recordMood(emoji) {
        const dashboard = UI.healthDashboard;
        dashboard.data.mood.today = emoji;
        dashboard.saveData();
        dashboard.showHealthHub(); // 刷新显示
    }

    static saveMoodNote(note) {
        const dashboard = UI.healthDashboard;
        dashboard.data.mood.notes = note;
        dashboard.saveData();
    }

    // 添加饮水
    static addWater(ml) {
        const dashboard = UI.healthDashboard;
        dashboard.data.nutrition.water += ml;
        dashboard.saveData();
        dashboard.showNutritionTracker(); // 刷新
    }

    // 添加食物
    static addFood(name, calories) {
        if (calories === 0) {
            // 自定义输入
            const customCals = prompt(`输入 ${name} 的热量（kcal）:`);
            if (customCals) {
                calories = parseInt(customCals) || 0;
            }
        }
        const dashboard = UI.healthDashboard;
        dashboard.data.nutrition.todayCalories += calories;
        dashboard.saveData();
        dashboard.showNutritionTracker();
        
        // 提示
        setTimeout(() => {
            UI.addMessage(`已记录${name}：+${calories} kcal`, 'bot');
        }, 300);
    }

    // 记录睡眠
    static recordSleep(hours, quality) {
        const dashboard = UI.healthDashboard;
        if (hours === 0) {
            const customHours = prompt('输入睡眠时长（小时）:');
            if (customHours) {
                hours = parseFloat(customHours) || 0;
            }
        }
        dashboard.data.sleep.lastNight = hours;
        dashboard.data.sleep.quality = quality;
        dashboard.saveData();
        dashboard.showSleepTracker();
    }

    // 快速记录运动
    static quickLog(activity) {
        const dashboard = UI.healthDashboard;
        const duration = parseInt(activity);
        dashboard.data.exercise.todayDuration += duration;
        dashboard.data.exercise.todayCalories += Math.floor(duration * 8); // 粗略估算
        dashboard.saveData();
        dashboard.showExercisePlanner();
        
        setTimeout(() => {
            UI.addMessage(`🏋️ 运动已记录：${activity}，消耗约 ${Math.floor(duration * 8)} kcal`, 'bot');
        }, 300);
    }

    static startExercise(type) {
        UI.addMessage(`我想开始${type}训练，给我制定一个${type}计划`, 'user');
        setTimeout(() => {
            UI.addMessage(`好的，为你制定${type}训练计划...`, 'bot');
        }, 500);
    }

    // 更新体型数据
    static updateBodyMetrics() {
        const height = prompt('输入身高（cm）:');
        const weight = prompt('输入体重（kg）:');
        
        if (height && weight) {
            const dashboard = UI.healthDashboard;
            dashboard.data.metrics.height = parseFloat(height);
            dashboard.data.metrics.weight = parseFloat(weight);
            dashboard.data.metrics.bmi = dashboard.data.metrics.weight / Math.pow(dashboard.data.metrics.height / 100, 2);
            dashboard.data.metrics.lastCheck = new Date().toISOString();
            dashboard.saveData();
            dashboard.showHealthMetrics();
        }
    }

    getBMIStatus(bmi) {
        if (bmi < 18.5) return { text: '偏瘦', color: '#3498db' };
        if (bmi < 24) return { text: '正常', color: '#2ecc71' };
        if (bmi < 28) return { text: '超重', color: '#f39c12' };
        return { text: '肥胖', color: '#e74c3c' };
    }

    getSleepQualityColor(quality) {
        const colors = {
            good: '#00ff88',
            fair: '#ffaa00',
            poor: '#ff0040'
        };
        return colors[quality] || '#636366';
    }

    getSleepQualityText(quality) {
        const texts = {
            good: '睡得很好',
            fair: '还行',
            poor: '不太好'
        };
        return texts[quality] || '未知';
    }
}

// 暴露到全局
window.HealthDashboard = HealthDashboard;
