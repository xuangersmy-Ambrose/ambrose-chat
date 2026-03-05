/**
 * AMBROSE Smart Notification System v1.0
 * 智能提醒系统
 * 学习：精准营销 + 行为触发 + 最佳时机算法
 */

class SmartNotificationSystem {
    constructor() {
        this.preferences = this.loadPreferences();
        this.notificationHistory = [];
        this.optimalTimes = this.calculateOptimalTimes();
    }

    loadPreferences() {
        return JSON.parse(localStorage.getItem('ambrose_notification_prefs') || JSON.stringify({
            enabled: true,
            quietHours: { start: 22, end: 8 },
            types: {
                water: { enabled: true, frequency: 60 }, // 分钟
                meal: { enabled: true, times: [8, 12, 18] },
                sleep: { enabled: true, time: 22 },
                exercise: { enabled: true, time: 18 },
                weight: { enabled: true, frequency: 'daily', time: 8 }
            }
        }));
    }

    // 计算最佳提醒时间 - 基于用户行为数据
    calculateOptimalTimes() {
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        
        // 分析用户活跃时间
        const activityPattern = this.analyzeActivityPattern(healthData);
        
        return {
            water: this.findOptimalWaterTimes(activityPattern),
            exercise: this.findOptimalExerciseTimes(activityPattern),
            meal: this.findOptimalMealTimes(activityPattern),
            sleep: this.findOptimalSleepTime(activityPattern)
        };
    }

    // 分析用户活动模式
    analyzeActivityPattern(healthData) {
        // 简化版 - 实际应该分析历史数据
        return {
            mostActiveHour: 18,
            leastActiveHour: 2,
            mealTimes: [8, 12, 19],
            sleepTime: 23,
            wakeTime: 7
        };
    }

    // 智能生成提醒
    generateSmartReminders() {
        const reminders = [];
        const now = new Date();
        const currentHour = now.getHours();
        
        // 检查是否在静音时段
        if (this.isQuietHours(currentHour)) {
            return reminders;
        }

        // 健康数据
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        const nutritionData = JSON.parse(localStorage.getItem('ambrose_nutrition_data') || '{}');
        const weightData = JSON.parse(localStorage.getItem('ambrose_weight_data') || '{}');

        // 1. 饮水提醒 - 基于目标进度
        if (this.shouldRemindWater(healthData, currentHour)) {
            reminders.push({
                type: 'water',
                priority: 'high',
                title: '💧 该喝水了',
                message: this.getWaterMessage(healthData),
                action: '记录饮水',
                sound: 'gentle'
            });
        }

        // 2. 用餐提醒 - 基于记录时间
        if (this.shouldRemindMeal(nutritionData, currentHour)) {
            reminders.push({
                type: 'meal',
                priority: 'medium',
                title: '🍽️ 用餐时间',
                message: this.getMealMessage(currentHour),
                action: '记录饮食',
                sound: 'soft'
            });
        }

        // 3. 运动提醒 - 基于步数目标
        if (this.shouldRemindExercise(healthData, currentHour)) {
            reminders.push({
                type: 'exercise',
                priority: 'medium',
                title: '🏃 动起来',
                message: this.getExerciseMessage(healthData),
                action: '记录运动',
                sound: 'energetic'
            });
        }

        // 4. 睡眠提醒 - 基于睡眠时间
        if (this.shouldRemindSleep(currentHour)) {
            reminders.push({
                type: 'sleep',
                priority: 'high',
                title: '🌙 准备睡觉',
                message: '为了明天的活力，现在该准备休息了',
                action: '记录睡眠',
                sound: 'calm'
            });
        }

        // 5. 体重记录提醒
        if (this.shouldRemindWeight(weightData, currentHour)) {
            reminders.push({
                type: 'weight',
                priority: 'low',
                title: '⚖️ 记录体重',
                message: '早上空腹体重是最准确的，记得记录哦',
                action: '记录体重',
                sound: 'gentle'
            });
        }

        // 6. 久坐提醒
        if (this.shouldRemindSedentary(healthData)) {
            reminders.push({
                type: 'sedentary',
                priority: 'medium',
                title: '🪑 久坐提醒',
                message: '你已经坐了很久了，起来活动5分钟吧',
                action: '我知道了',
                sound: 'gentle'
            });
        }

        return reminders;
    }

    // 判断是否该提醒饮水
    shouldRemindWater(healthData, currentHour) {
        const water = healthData.nutrition?.water || 0;
        const target = 2500;
        const progress = water / target;
        
        // 如果进度落后时间进度，提醒
        const hourProgress = currentHour / 22; // 假设22点前喝完
        if (progress < hourProgress - 0.1) {
            return true;
        }
        
        // 如果超过2小时没记录
        const lastLog = healthData.nutrition?.lastWaterLog;
        if (lastLog) {
            const hoursSince = (Date.now() - new Date(lastLog)) / (1000 * 60 * 60);
            return hoursSince >= 2;
        }
        
        return false;
    }

    // 获取个性化饮水提醒消息
    getWaterMessage(healthData) {
        const water = healthData.nutrition?.water || 0;
        const target = 2500;
        const remaining = target - water;
        
        const messages = [
            `今日已饮水 ${water}ml，还剩 ${remaining}ml 目标`,
            '喝水是最好的美容，来一杯吧',
            '身体需要水分，现在喝一口',
            '水是生命之源，别忘了补充'
        ];
        
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // 判断是否该提醒用餐
    shouldRemindMeal(nutritionData, currentHour) {
        const meals = nutritionData.today || {};
        
        // 早餐 8点
        if (currentHour === 8 && !meals.breakfast?.length) return true;
        // 午餐 12点
        if (currentHour === 12 && !meals.lunch?.length) return true;
        // 晚餐 18点
        if (currentHour === 18 && !meals.dinner?.length) return true;
        
        return false;
    }

    // 获取用餐提醒消息
    getMealMessage(hour) {
        const messages = {
            8: ['早餐是一天中最重要的一餐', '记得吃早餐，开启活力一天'],
            12: ['午餐时间到，营养均衡很重要', '该吃午饭了，别饿着自己'],
            18: ['晚餐要清淡，七分饱就好', '晚餐时间，记得记录哦']
        };
        
        const hourMessages = messages[hour] || ['用餐时间'];
        return hourMessages[Math.floor(Math.random() * hourMessages.length)];
    }

    // 判断是否该提醒运动
    shouldRemindExercise(healthData, currentHour) {
        const steps = healthData.exercise?.todaySteps || 0;
        
        // 如果18点后步数不足6000，提醒
        if (currentHour >= 18 && steps < 6000) {
            return true;
        }
        
        // 如果20点后步数不足8000，紧急提醒
        if (currentHour >= 20 && steps < 8000) {
            return true;
        }
        
        return false;
    }

    // 获取运动提醒消息
    getExerciseMessage(healthData) {
        const steps = healthData.exercise?.todaySteps || 0;
        const remaining = 10000 - steps;
        
        if (remaining > 5000) {
            return `今日步数 ${steps}，还差 ${remaining} 步达标，出去走走吧`;
        } else if (remaining > 0) {
            return `就差 ${remaining} 步了，再坚持一下！`;
        }
        
        return '步数达标！继续保持';
    }

    // 判断是否该提醒睡觉
    shouldRemindSleep(currentHour) {
        return currentHour === 22 || currentHour === 23;
    }

    // 判断是否该提醒记录体重
    shouldRemindWeight(weightData, currentHour) {
        // 只在早上8-10点提醒
        if (currentHour < 8 || currentHour > 10) return false;
        
        // 检查今天是否已记录
        const lastRecord = weightData.history?.[weightData.history.length - 1];
        if (lastRecord) {
            const lastDate = new Date(lastRecord.date).toDateString();
            const today = new Date().toDateString();
            return lastDate !== today;
        }
        
        return true;
    }

    // 判断是否该提醒久坐
    shouldRemindSedentary(healthData) {
        // 简化版 - 实际需要更复杂逻辑
        const steps = healthData.exercise?.todaySteps || 0;
        const currentHour = new Date().getHours();
        
        // 如果工作时间段步数很少
        if (currentHour >= 9 && currentHour <= 17 && steps < 2000) {
            return true;
        }
        
        return false;
    }

    // 检查是否在静音时段
    isQuietHours(hour) {
        const { start, end } = this.preferences.quietHours;
        if (start < end) {
            return hour >= start && hour < end;
        }
        // 跨午夜情况
        return hour >= start || hour < end;
    }

    // 发送通知 (模拟)
    sendNotification(reminder) {
        console.log(`[通知] ${reminder.title}: ${reminder.message}`);
        
        // 记录发送历史
        this.notificationHistory.push({
            ...reminder,
            sentAt: new Date().toISOString(),
            acknowledged: false
        });
        
        // 限制历史长度
        if (this.notificationHistory.length > 100) {
            this.notificationHistory = this.notificationHistory.slice(-50);
        }
    }

    // 用户确认通知
    acknowledgeNotification(index) {
        if (this.notificationHistory[index]) {
            this.notificationHistory[index].acknowledged = true;
        }
    }

    // 获取通知统计
    getNotificationStats() {
        const total = this.notificationHistory.length;
        const acknowledged = this.notificationHistory.filter(n => n.acknowledged).length;
        
        return {
            total,
            acknowledged,
            responseRate: total > 0 ? (acknowledged / total * 100).toFixed(1) : 0
        };
    }
}

// 暴露到全局
window.SmartNotificationSystem = SmartNotificationSystem;
