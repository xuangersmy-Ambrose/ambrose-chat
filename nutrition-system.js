/**
 * AMBROSE Nutrition System v1.0
 * 薄荷健康风格饮食记录系统
 */

class NutritionSystem {
    constructor(ui) {
        this.ui = ui;
        this.data = this.loadData();
        this.initFoodDatabase();
    }

    init() {
        window.addEventListener('nutritionDataUpdated', () => {
            this.data = this.loadData();
        });
    }

    loadData() {
        const defaultData = {
            // 今日饮食记录
            today: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            },
            // 营养统计
            stats: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                targetCalories: 2000
            },
            // 历史记录
            history: []
        };

        try {
            const saved = localStorage.getItem('ambrose_nutrition_data');
            return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
        } catch {
            return defaultData;
        }
    }

    saveData() {
        localStorage.setItem('ambrose_nutrition_data', JSON.stringify(this.data));
        window.dispatchEvent(new Event('nutritionDataUpdated'));
    }

    // 初始化食物数据库 - 扩展
    initFoodDatabase() {
        this.foodDatabase = {
            // 早餐类
            '包子': { calories: 220, protein: 6, carbs: 35, fat: 6, unit: '个' },
            '豆浆': { calories: 45, protein: 3, carbs: 5, fat: 1.5, unit: '杯' },
            '油条': { calories: 380, protein: 6, carbs: 45, fat: 20, unit: '根' },
            '鸡蛋': { calories: 70, protein: 6, carbs: 0.5, fat: 5, unit: '个' },
            '牛奶': { calories: 150, protein: 8, carbs: 12, fat: 8, unit: '杯' },
            '面包': { calories: 260, protein: 8, carbs: 48, fat: 3, unit: '片' },
            '燕麦粥': { calories: 120, protein: 4, carbs: 22, fat: 2, unit: '碗' },
            '煎饼': { calories: 350, protein: 8, carbs: 55, fat: 10, unit: '个' },
            '小笼包': { calories: 80, protein: 4, carbs: 12, fat: 2.5, unit: '个' },
            
            // 主食类
            '米饭': { calories: 200, protein: 4, carbs: 45, fat: 0.5, unit: '碗' },
            '面条': { calories: 280, protein: 10, carbs: 58, fat: 1, unit: '碗' },
            '馒头': { calories: 220, protein: 7, carbs: 46, fat: 0.5, unit: '个' },
            '粥': { calories: 100, protein: 2, carbs: 22, fat: 0.3, unit: '碗' },
            '饺子': { calories: 50, protein: 2, carbs: 8, fat: 1.5, unit: '个' },
            '馄饨': { calories: 60, protein: 3, carbs: 8, fat: 2, unit: '个' },
            
            // 肉类
            '鸡胸肉': { calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
            '牛肉': { calories: 250, protein: 26, carbs: 0, fat: 15, unit: '100g' },
            '猪肉': { calories: 280, protein: 20, carbs: 0, fat: 22, unit: '100g' },
            '鱼肉': { calories: 120, protein: 22, carbs: 0, fat: 3, unit: '100g' },
            '虾': { calories: 90, protein: 20, carbs: 0, fat: 1, unit: '100g' },
            '鸡蛋': { calories: 70, protein: 6, carbs: 0.5, fat: 5, unit: '个' },
            
            // 蔬菜类
            '青菜': { calories: 25, protein: 1.5, carbs: 4, fat: 0.3, unit: '100g' },
            '番茄': { calories: 20, protein: 1, carbs: 4, fat: 0.2, unit: '个' },
            '黄瓜': { calories: 15, protein: 0.7, carbs: 3.5, fat: 0.1, unit: '根' },
            '西兰花': { calories: 35, protein: 2.4, carbs: 7, fat: 0.4, unit: '100g' },
            '胡萝卜': { calories: 40, protein: 1, carbs: 9, fat: 0.2, unit: '根' },
            
            // 水果类
            '苹果': { calories: 95, protein: 0.5, carbs: 25, fat: 0.3, unit: '个' },
            '香蕉': { calories: 105, protein: 1.3, carbs: 27, fat: 0.4, unit: '根' },
            '橙子': { calories: 80, protein: 1.2, carbs: 19, fat: 0.2, unit: '个' },
            '葡萄': { calories: 60, protein: 0.6, carbs: 16, fat: 0.2, unit: '100g' },
            '草莓': { calories: 50, protein: 1, carbs: 12, fat: 0.3, unit: '100g' },
            
            // 饮品类
            '水': { calories: 0, protein: 0, carbs: 0, fat: 0, unit: '杯' },
            '茶': { calories: 2, protein: 0, carbs: 0.5, fat: 0, unit: '杯' },
            '咖啡': { calories: 5, protein: 0.3, carbs: 1, fat: 0, unit: '杯' },
            '可乐': { calories: 140, protein: 0, carbs: 39, fat: 0, unit: '罐' },
            '果汁': { calories: 120, protein: 0.5, carbs: 29, fat: 0.2, unit: '杯' },
            '奶茶': { calories: 300, protein: 3, carbs: 45, fat: 12, unit: '杯' },
            
            // 零食类
            '坚果': { calories: 160, protein: 6, carbs: 6, fat: 14, unit: '把' },
            '巧克力': { calories: 230, protein: 2, carbs: 25, fat: 13, unit: '块' },
            '薯片': { calories: 150, protein: 2, carbs: 15, fat: 10, unit: '小包' },
            '饼干': { calories: 80, protein: 1, carbs: 12, fat: 3, unit: '片' }
        };
    }

    // 显示饮食记录主界面 (薄荷风格)
    showNutritionHub() {
        const meals = this.data.today;
        const stats = this.calculateDailyStats();
        const remaining = this.data.stats.targetCalories - stats.calories;
        
        const html = `
            <div style="width: 100%; max-width: 600px;">
                <!-- 标题 -->
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 40px; margin-bottom: 8px;">🍽️</div>
                    <div style="font-size: 20px; font-weight: 700; color: var(--success);">饮食记录</div>
                    <div style="font-size: 12px; color: var(--text-tertiary);">记录每一餐，管理你的健康</div>
                </div>

                <!-- 热量总览卡片 (薄荷风格) -->
                <div style="background: linear-gradient(135deg, rgba(0,255,157,0.15), rgba(0,255,157,0.05)); 
                            border: 1px solid rgba(0,255,157,0.3); border-radius: 20px; padding: 24px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="text-align: center;">
                            <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px;">摄入</div>
                            <div style="font-size: 32px; font-weight: 800; color: var(--success); font-family: 'JetBrains Mono', monospace;">
                                ${stats.calories}
                            </div>
                            <div style="font-size: 10px; color: var(--text-tertiary);">kcal</div>
                        </div>

                        <div style="flex: 1; padding: 0 20px;">
                            <div style="position: relative; width: 120px; height: 120px; margin: 0 auto;">
                                <svg width="120" height="120" style="transform: rotate(-90deg);">
                                    <circle cx="60" cy="60" r="52" fill="none" 
                                        stroke="rgba(255,255,255,0.1)" stroke-width="10"/>
                                    <circle cx="60" cy="60" r="52" fill="none" 
                                        stroke="var(--success)" stroke-width="10" 
                                        stroke-linecap="round"
                                        stroke-dasharray="${2 * Math.PI * 52}"
                                        stroke-dashoffset="${2 * Math.PI * 52 * (1 - Math.min(stats.calories / this.data.stats.targetCalories, 1))}"
                                        style="transition: stroke-dashoffset 0.6s ease;"
                                        filter="drop-shadow(0 0 6px var(--success))"/>
                                </svg>
                                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                                    <div style="font-size: 12px; color: var(--text-tertiary);">剩余</div>
                                    <div style="font-size: 24px; font-weight: 800; color: ${remaining >= 0 ? 'var(--success)' : 'var(--danger)'};">
                                        ${remaining > 0 ? remaining : 0}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="text-align: center;">
                            <div style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 4px;">目标</div>
                            <div style="font-size: 32px; font-weight: 800; color: var(--text-secondary); font-family: 'JetBrains Mono', monospace;">
                                ${this.data.stats.targetCalories}
                            </div>
                            <div style="font-size: 10px; color: var(--text-tertiary);">kcal</div>
                        </div>
                    </div>

                    <!-- 三大营养素 -->
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <div style="text-align: center;">
                            <div style="font-size: 10px; color: var(--text-tertiary); margin-bottom: 4px;">蛋白质</div>
                            <div style="font-size: 18px; font-weight: 700; color: #ff6b6b;">${stats.protein}g</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 10px; color: var(--text-tertiary); margin-bottom: 4px;">碳水</div>
                            <div style="font-size: 18px; font-weight: 700; color: #ffd93d;">${stats.carbs}g</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 10px; color: var(--text-tertiary); margin-bottom: 4px;">脂肪</div>
                            <div style="font-size: 18px; font-weight: 700; color: #6bcf7f;">${stats.fat}g</div>
                        </div>
                    </div>
                </div>

                <!-- 三餐记录 -->
                <div style="margin-bottom: 20px;">
                    ${this.renderMealSection('早餐', meals.breakfast, '#ff6b6b', '🌅')}
                    ${this.renderMealSection('午餐', meals.lunch, '#ffd93d', '☀️')}
                    ${this.renderMealSection('晚餐', meals.dinner, '#6bcf7f', '🌙')}
                    ${this.renderMealSection('加餐', meals.snack, '#bd00ff', '🍿')}
                </div>

                <!-- 快速添加按钮 -->
                <button onclick="NutritionSystem.showQuickAdd()"
                    style="width: 100%; background: linear-gradient(135deg, var(--success), #00d4a0); border: none; 
                            border-radius: 16px; padding: 16px; color: var(--bg-base); font-weight: 600; 
                            cursor: pointer; font-size: 16px; transition: all 0.2s; box-shadow: 0 4px 15px rgba(0,255,157,0.3);"
                    onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 20px rgba(0,255,157,0.4)';"
                    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(0,255,157,0.3)';"
                >
                    ➕ 记录饮食
                </button>
            </div>
        `;
        
        this.ui.addMessageHTML(html, 'bot');
    }

    // 渲染每餐区域
    renderMealSection(mealName, foods, color, icon) {
        const mealCalories = foods.reduce((sum, f) => sum + (f.calories * f.quantity), 0);
        
        return `
            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); 
                        border-radius: 16px; padding: 16px; margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 24px;">${icon}</span>
                        <span style="font-size: 16px; font-weight: 600; color: var(--text-primary);">${mealName}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px; font-weight: 700; color: ${color}; font-family: 'JetBrains Mono', monospace;">
                            ${mealCalories}
                        </span>
                        <span style="font-size: 10px; color: var(--text-tertiary);">kcal</span>
                        
                        <button onclick="NutritionSystem.addFoodToMeal('${mealName}')"
                            style="background: rgba(255,255,255,0.1); border: none; border-radius: 8px; 
                                    padding: 6px 10px; color: var(--text-secondary); font-size: 12px; cursor: pointer;"
                        >
                            +添加
                        </button>
                    </div>
                </div>

                <div style="min-height: ${foods.length > 0 ? 'auto' : '40px'}; display: flex; flex-wrap: wrap; gap: 8px;"
003e
                    ${foods.length > 0 ? foods.map(f => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 20px; padding: 6px 12px; 
                                    display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 13px; color: var(--text-primary);">${f.name}</span>
                            <span style="font-size: 11px; color: var(--text-tertiary);">${f.quantity}${f.unit}</span>
                            <span style="font-size: 11px; color: ${color};">${f.calories * f.quantity}kcal</span>
                        </div>
                    `).join('') : `
                        <div style="color: var(--text-tertiary); font-size: 13px; font-style: italic;">
                            还没有记录，点击添加
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    // 计算今日营养统计
    calculateDailyStats() {
        let calories = 0, protein = 0, carbs = 0, fat = 0;
        
        Object.values(this.data.today).forEach(mealFoods => {
            mealFoods.forEach(f => {
                const q = f.quantity;
                calories += f.calories * q;
                protein += f.protein * q;
                carbs += f.carbs * q;
                fat += f.fat * q;
            });
        });
        
        return { calories: Math.round(calories), protein: Math.round(protein), carbs: Math.round(carbs), fat: Math.round(fat) };
    }

    // 添加食物到指定餐次
    addFoodToMeal(mealName) {
        const mealKey = mealName === '早餐' ? 'breakfast' : 
                       mealName === '午餐' ? 'lunch' : 
                       mealName === '晚餐' ? 'dinner' : 'snack';
        
        // 显示食物选择界面
        const html = `
            <div style="width: 100%; max-width: 600px;">
                <div style="display: flex; align-items: center; margin-bottom: 16px;">
                    <button onclick="UI.nutritionSystem.showNutritionHub()" 
                        style="background: transparent; border: 1px solid var(--border-subtle); border-radius: 8px; 
                                padding: 8px 12px; color: var(--text-secondary); cursor: pointer; margin-right: 12px;"
                    >
                        ← 返回
                    </button>
                    <div style="font-size: 18px; font-weight: 700;">添加${mealName}</div>
                </div>

                <!-- 搜索框 -->
                <input type="text" placeholder="搜索食物..." 
                    style="width: 100%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); 
                            border-radius: 12px; padding: 12px 16px; color: var(--text-primary); font-size: 14px; 
                            margin-bottom: 16px;"
                    oninput="NutritionSystem.filterFoods(this.value, '${mealKey}')"
                    id="foodSearchInput"
                />

                <!-- 常用食物快捷添加 -->
                <div style="font-size: 12px; color: var(--text-tertiary); margin-bottom: 12px;">常用食物</div>
                
                <div id="foodList" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    ${this.renderFoodList(mealKey)}
                </div>
            </div>
        `;
        
        this.ui.addMessageHTML(html, 'bot');
    }

    // 渲染食物列表
    renderFoodList(mealKey, filter = '') {
        const foods = Object.entries(this.foodDatabase)
            .filter(([name, data]) => !filter || name.includes(filter))
            .slice(0, 12);
        
        return foods.map(([name, data]) => `
            <button onclick="NutritionSystem.addFood('${mealKey}', '${name}', 1)"
                style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; 
                        padding: 12px; text-align: left; cursor: pointer; transition: all 0.2s;"
                onmouseover="this.style.borderColor='var(--success)'; this.style.background='rgba(0,255,157,0.05)';"
                onmouseout="this.style.borderColor='var(--border-subtle)'; this.style.background='var(--bg-card)';"
            >
                <div style="font-size: 14px; font-weight: 500; color: var(--text-primary); margin-bottom: 4px;">${name}</div>
                <div style="font-size: 11px; color: var(--text-tertiary);">
                    ${data.calories}kcal · ${data.protein}g蛋白质
                </div>
            </button>
        `).join('');
    }

    // 添加食物
    addFood(mealKey, foodName, quantity) {
        const food = this.foodDatabase[foodName];
        if (!food) return;

        this.data.today[mealKey].push({
            name: foodName,
            quantity: quantity,
            unit: food.unit,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat
        });

        this.saveData();
        this.showNutritionHub();

        // 提示
        setTimeout(() => {
            UI.addMessage(`✅ 已添加 ${foodName} ${quantity}${food.unit}，+${food.calories * quantity}kcal`, 'bot');
        }, 300);
    }

    // 快速添加界面
    static showQuickAdd() {
        UI.nutritionSystem.showNutritionHub();
        setTimeout(() => {
            UI.nutritionSystem.addFoodToMeal('早餐');
        }, 500);
    }

    // 过滤食物
    static filterFoods(query, mealKey) {
        const list = document.getElementById('foodList');
        if (list) {
            list.innerHTML = UI.nutritionSystem.renderFoodList(mealKey, query);
        }
    }

    // 添加食物静态方法
    static addFood(mealKey, foodName, quantity) {
        UI.nutritionSystem.addFood(mealKey, foodName, quantity);
    }

    // 添加食物到餐次静态方法
    static addFoodToMeal(mealName) {
        UI.nutritionSystem.addFoodToMeal(mealName);
    }
}

// 暴露到全局
window.NutritionSystem = NutritionSystem;
