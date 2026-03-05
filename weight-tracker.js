/**
 * AMBROSE Weight Tracker v1.0
 * MyFitnessPal + Apple Health 风格体重管理系统
 */

class WeightTracker {
    constructor(ui) {
        this.ui = ui;
        this.data = this.loadData();
    }

    loadData() {
        const defaultData = {
            currentWeight: null,
            targetWeight: null,
            height: null,
            history: [],
            lastRecord: null
        };

        try {
            const saved = localStorage.getItem('ambrose_weight_data');
            return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
        } catch {
            return defaultData;
        }
    }

    saveData() {
        localStorage.setItem('ambrose_weight_data', JSON.stringify(this.data));
    }

    // 显示体重管理主界面
    showWeightHub() {
        const bmi = this.calculateBMI();
        const trend = this.calculateTrend();
        const daysToGoal = this.estimateDaysToGoal();
        
        const html = `
            <div style="width: 100%; max-width: 600px;">
                <!-- 标题 -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 40px; margin-bottom: 8px;">⚖️</div>
                    <div style="font-size: 20px; font-weight: 700; color: var(--primary-500);">体重管理</div>
                    <div style="font-size: 12px; color: var(--text-tertiary);">记录体重变化，追踪健康趋势</div>
                </div>

                <!-- 当前体重卡片 (Apple Health风格) -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); 
                            border-radius: 20px; padding: 24px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">当前体重</div>
                            <div style="font-size: 48px; font-weight: 800; color: var(--text-primary); font-family: 'JetBrains Mono', monospace; line-height: 1;">
                                ${this.data.currentWeight ? this.data.currentWeight.toFixed(1) : '--'}
                                <span style="font-size: 20px; color: var(--text-tertiary);">kg</span>
                            </div>
                            
                            ${trend ? `
                                <div style="margin-top: 8px; display: flex; align-items: center; gap: 6px;">
                                    <span style="font-size: 20px;">${trend.direction === 'down' ? '📉' : trend.direction === 'up' ? '📈' : '➡️'}</span>
                                    <span style="font-size: 14px; color: ${trend.direction === 'down' ? 'var(--success)' : trend.direction === 'up' ? 'var(--danger)' : 'var(--text-tertiary)'};">
                                        ${trend.direction === 'down' ? '↓' : trend.direction === 'up' ? '↑' : ''} ${Math.abs(trend.change).toFixed(1)} kg ${trend.period}
                                    </span>
                                </div>
                            ` : ''}
                        </div>

                        <div style="text-align: right;">
                            <button onclick="WeightTracker.showRecordModal()"
                                style="background: linear-gradient(135deg, var(--primary-500), var(--accent-500)); border: none; 
                                        border-radius: 12px; padding: 10px 16px; color: var(--bg-base); font-weight: 600; 
                                        cursor: pointer; font-size: 13px;"
                            >
                                ➕ 记录体重
                            </button>                        
                        </div>
                    </div>

                    <!-- BMI指示器 -->
                    ${bmi ? `
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <span style="font-size: 13px; color: var(--text-secondary);">BMI指数</span>
                                <span style="font-size: 18px; font-weight: 700; color: ${bmi.color};">${bmi.value.toFixed(1)} · ${bmi.label}</span>
                            </div>
                            <div style="height: 8px; background: linear-gradient(90deg, #3498db, #2ecc71, #f39c12, #e74c3c); border-radius: 4px; position: relative;">
                                <div style="position: absolute; top: -4px; left: ${Math.min((bmi.value / 40) * 100, 98)}%; 
                                            width: 16px; height: 16px; background: white; border-radius: 50%; 
                                            box-shadow: 0 2px 8px rgba(0,0,0,0.3); transform: translateX(-50%);"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-tertiary); margin-top: 4px;">
                                <span>偏瘦</span>
                                <span>正常</span>
                                <span>超重</span>
                                <span>肥胖</span>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- 目标进度 (MyFitnessPal风格) -->
                ${this.data.targetWeight && this.data.currentWeight ? `
                    <div style="background: linear-gradient(135deg, rgba(0,243,255,0.1), rgba(189,0,255,0.05)); 
                                border: 1px solid rgba(0,243,255,0.2); border-radius: 16px; padding: 20px; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <div>
                                <div style="font-size: 11px; color: var(--text-tertiary);">目标体重</div>
                                <div style="font-size: 20px; font-weight: 700; color: var(--text-primary);">${this.data.targetWeight} kg</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 11px; color: var(--text-tertiary);">还需减重</div>
                                <div style="font-size: 20px; font-weight: 700; color: var(--primary-500);">${(this.data.currentWeight - this.data.targetWeight).toFixed(1)} kg</div>
                            </div>
                            
                            <div style="text-align: right;">
                                <div style="font-size: 11px; color: var(--text-tertiary);">预计达成</div>
                                <div style="font-size: 14px; font-weight: 600; color: var(--success);">${daysToGoal}天</div>
                            </div>
                        </div>

                        <div style="height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden;">
                            <div style="width: ${this.calculateProgress()}%; height: 100%; background: linear-gradient(90deg, var(--primary-500), var(--accent-500)); 
                                        border-radius: 5px; transition: width 0.5s ease;"></div>
                        </div>
                    </div>
                ` : ''}

                <!-- 趋势图表 (Apple Health风格) -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); 
                            border-radius: 16px; padding: 20px; margin-bottom: 20px;"
003e
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <div style="font-size: 16px; font-weight: 600;">体重趋势</div>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="WeightTracker.switchTimeRange('week')" 
                                style="background: ${this.currentRange === 'week' ? 'rgba(0,243,255,0.2)' : 'transparent'}; 
                                        border: 1px solid ${this.currentRange === 'week' ? 'var(--primary-500)' : 'var(--border-subtle)'}; 
                                        border-radius: 8px; padding: 6px 12px; color: ${this.currentRange === 'week' ? 'var(--primary-500)' : 'var(--text-secondary)'}; 
                                        font-size: 12px; cursor: pointer;"
                            >周</button>
                            <button onclick="WeightTracker.switchTimeRange('month')" 
                                style="background: ${this.currentRange === 'month' ? 'rgba(0,243,255,0.2)' : 'transparent'}; 
                                        border: 1px solid ${this.currentRange === 'month' ? 'var(--primary-500)' : 'var(--border-subtle)'}; 
                                        border-radius: 8px; padding: 6px 12px; color: ${this.currentRange === 'month' ? 'var(--primary-500)' : 'var(--text-secondary)'}; 
                                        font-size: 12px; cursor: pointer;"
                            >月</button>
                            <button onclick="WeightTracker.switchTimeRange('year')" 
                                style="background: ${this.currentRange === 'year' ? 'rgba(0,243,255,0.2)' : 'transparent'}; 
                                        border: 1px solid ${this.currentRange === 'year' ? 'var(--primary-500)' : 'var(--border-subtle)'}; 
                                        border-radius: 8px; padding: 6px 12px; color: ${this.currentRange === 'year' ? 'var(--primary-500)' : 'var(--text-secondary)'}; 
                                        font-size: 12px; cursor: pointer;"
                            >年</button>
                        </div>
                    </div>

                    ${this.renderTrendChart()}
                </div>

                <!-- 历史记录 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 20px;">
                    <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">最近记录</div>
                    
                    ${this.data.history.slice(-7).reverse().map((record, i) => `
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                                    padding: 12px 0; ${i < this.data.history.slice(-7).length - 1 ? 'border-bottom: 1px solid var(--border-subtle);' : ''}">
                            <div>
                                <div style="font-size: 14px; color: var(--text-primary);">${new Date(record.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</div>
                                <div style="font-size: 11px; color: var(--text-tertiary);">${new Date(record.date).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                            <div style="font-size: 20px; font-weight: 700; color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">
                                ${record.weight.toFixed(1)} kg
                            </div>
                        </div>
                    `).join('') || '<div style="color: var(--text-tertiary); text-align: center; padding: 20px;">还没有记录，点击上方按钮开始记录</div>'}
                </div>
            </div>
        `;
        
        this.ui.addMessageHTML(html, 'bot');
        this.currentRange = 'month';
    }

    // 渲染趋势图表 (简化版SVG)
    renderTrendChart() {
        if (this.data.history.length < 2) {
            return '<div style="height: 200px; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary);">记录更多数据以查看趋势</div>';
        }

        const data = this.getChartData();
        const width = 400;
        const height = 200;
        const padding = 20;

        const maxWeight = Math.max(...data.map(d => d.weight)) + 2;
        const minWeight = Math.min(...data.map(d => d.weight)) - 2;
        const range = maxWeight - minWeight;

        // 生成路径
        let path = '';
        data.forEach((point, i) => {
            const x = padding + (i / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((point.weight - minWeight) / range) * (height - padding * 2);
            path += (i === 0 ? 'M' : 'L') + `${x},${y} `;
        });

        // 生成区域填充路径
        let areaPath = path + `L${width - padding},${height - padding} L${padding},${height - padding} Z`;

        return `
            <div style="height: 200px; position: relative;">
                <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:rgba(0,243,255,0.3)"/>
                            <stop offset="100%" style="stop-color:rgba(0,243,255,0)"/>
                        </linearGradient>
                    </defs>
                    
                    <path d="${areaPath}" fill="url(#areaGradient)"/>
                    <path d="${path}" fill="none" stroke="var(--primary-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    
                    ${data.map((point, i) => {
                        const x = padding + (i / (data.length - 1)) * (width - padding * 2);
                        const y = height - padding - ((point.weight - minWeight) / range) * (height - padding * 2);
                        return `<circle cx="${x}" cy="${y}" r="4" fill="var(--primary-500)" stroke="white" stroke-width="2"/>`;
                    }).join('')}
                </svg>
                
                <div style="position: absolute; top: 0; left: 0; font-size: 10px; color: var(--text-tertiary);">${maxWeight.toFixed(1)}</div>
                <div style="position: absolute; bottom: 0; left: 0; font-size: 10px; color: var(--text-tertiary);">${minWeight.toFixed(1)}</div>
            </div>
        `;
    }

    getChartData() {
        const days = this.currentRange === 'week' ? 7 : this.currentRange === 'month' ? 30 : 365;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        
        return this.data.history.filter(h => new Date(h.date) >= cutoff);
    }

    calculateBMI() {
        if (!this.data.currentWeight || !this.data.height) return null;
        
        const heightInM = this.data.height / 100;
        const bmi = this.data.currentWeight / (heightInM * heightInM);
        
        let label, color;
        if (bmi < 18.5) { label = '偏瘦'; color = '#3498db'; }
        else if (bmi < 24) { label = '正常'; color = '#2ecc71'; }
        else if (bmi < 28) { label = '超重'; color = '#f39c12'; }
        else { label = '肥胖'; color = '#e74c3c'; }
        
        return { value: bmi, label, color };
    }

    calculateTrend() {
        if (this.data.history.length < 2) return null;
        
        const recent = this.data.history.slice(-7);
        const first = recent[0].weight;
        const last = recent[recent.length - 1].weight;
        
        return {
            change: last - first,
            direction: last < first ? 'down' : last > first ? 'up' : 'same',
            period: '近7天'
        };
    }

    calculateProgress() {
        if (!this.data.currentWeight || !this.data.targetWeight || !this.data.history.length) return 0;
        
        const startWeight = this.data.history[0].weight;
        const current = this.data.currentWeight;
        const target = this.data.targetWeight;
        
        const total = Math.abs(startWeight - target);
        const lost = Math.abs(startWeight - current);
        
        return Math.min((lost / total) * 100, 100);
    }

    estimateDaysToGoal() {
        if (!this.data.currentWeight || !this.data.targetWeight || this.data.history.length < 2) return '--';
        
        const trend = this.calculateTrend();
        if (!trend || trend.change >= 0) return '--';
        
        const remaining = this.data.currentWeight - this.data.targetWeight;
        const dailyRate = Math.abs(trend.change) / 7;
        
        if (dailyRate === 0) return '--';
        
        const days = Math.ceil(remaining / dailyRate);
        return days;
    }

    // 显示记录体重弹窗
    static showRecordModal() {
        const html = `
            <div style="width: 100%; max-width: 400px; background: var(--bg-card); border: 1px solid var(--border-subtle); 
                        border-radius: 20px; padding: 24px;">
                <div style="font-size: 18px; font-weight: 700; margin-bottom: 20px; text-align: center;">记录体重</div>
                
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 12px; color: var(--text-tertiary); margin-bottom: 6px;">今日体重 (kg)</label>
                    <input type="number" step="0.1" id="weightInput" placeholder="例如: 65.5"
                        style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); 
                                border-radius: 12px; padding: 14px; color: var(--text-primary); font-size: 18px; font-family: 'JetBrains Mono', monospace;"
                    />
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="display: block; font-size: 12px; color: var(--text-tertiary); margin-bottom: 6px;">目标体重 (kg) - 可选</label>
                    <input type="number" step="0.1" id="targetWeightInput" placeholder="例如: 60"
                        style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); 
                                border-radius: 12px; padding: 14px; color: var(--text-primary); font-size: 18px; font-family: 'JetBrains Mono', monospace;"
                    />
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <button onclick="UI.weightTracker.showWeightHub()" 
                        style="background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); border-radius: 12px; 
                                padding: 14px; color: var(--text-secondary); font-weight: 600; cursor: pointer;"
                    >
                        取消
                    </button>
                    
                    <button onclick="WeightTracker.saveRecord()" 
                        style="background: linear-gradient(135deg, var(--primary-500), var(--accent-500)); border: none; 
                                border-radius: 12px; padding: 14px; color: var(--bg-base); font-weight: 600; cursor: pointer;"
                    >
                        保存记录
                    </button>
                </div>
            </div>
        `;
        
        UI.addMessageHTML(html, 'bot');
    }

    // 保存体重记录
    static saveRecord() {
        const weightInput = document.getElementById('weightInput');
        const targetInput = document.getElementById('targetWeightInput');
        
        const weight = parseFloat(weightInput?.value);
        const targetWeight = parseFloat(targetInput?.value);
        
        if (!weight || weight <= 0) {
            UI.addMessage('请输入有效的体重数值', 'bot');
            return;
        }

        const tracker = UI.weightTracker;
        tracker.data.currentWeight = weight;
        if (targetWeight > 0) tracker.data.targetWeight = targetWeight;
        
        tracker.data.history.push({
            weight: weight,
            date: new Date().toISOString()
        });
        
        tracker.saveData();
        tracker.showWeightHub();
        
        setTimeout(() => {
            UI.addMessage(`✅ 体重记录成功！${weight}kg ${targetWeight > 0 ? `，目标体重${targetWeight}kg` : ''}`, 'bot');
        }, 300);
    }

    // 切换时间范围
    static switchTimeRange(range) {
        UI.weightTracker.currentRange = range;
        UI.weightTracker.showWeightHub();
    }
}

// 暴露到全局
window.WeightTracker = WeightTracker;
