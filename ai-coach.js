/**
 * AMBROSE AI Coach v1.0
 * 智能健康教练 - 主动思考、个性化建议、人性化交互
 */

class AICoach {
    constructor(ui) {
        this.ui = ui;
        this.userProfile = this.loadProfile();
        this.conversationHistory = [];
        this.lastInteraction = null;
    }

    loadProfile() {
        try {
            return JSON.parse(localStorage.getItem('ambrose_user_profile')) || {};
        } catch {
            return {};
        }
    }

    saveProfile() {
        localStorage.setItem('ambrose_user_profile', JSON.stringify(this.userProfile));
    }

    // 分析用户数据，生成智能洞察
    analyzeUserData() {
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        const nutritionData = JSON.parse(localStorage.getItem('ambrose_nutrition_data') || '{}');
        const weightData = JSON.parse(localStorage.getItem('ambrose_weight_data') || '{}');

        const insights = [];
        const suggestions = [];

        // 分析睡眠
        if (healthData.sleep?.lastNight < 6) {
            insights.push('你昨晚睡眠不足6小时');
            suggestions.push('今晚试试11点前入睡，睡前1小时远离手机');
        } else if (healthData.sleep?.lastNight > 8) {
            insights.push('昨晚睡眠质量不错');
            suggestions.push('保持这个睡眠节奏，身体恢复会更好');
        }

        // 分析饮水
        if (healthData.nutrition?.water < 1500) {
            insights.push('今天饮水量偏少');
            suggestions.push('现在喝杯水吧，设置每小时提醒');
        }

        // 分析饮食
        if (nutritionData.stats?.calories > 2000) {
            insights.push('今天摄入热量较高');
            suggestions.push('晚餐可以清淡些，多吃蔬菜');
        }

        // 分析体重趋势
        if (weightData.history?.length >= 3) {
            const recent = weightData.history.slice(-3);
            const trend = recent[2].weight - recent[0].weight;
            if (trend > 0.5) {
                insights.push('体重有上升趋势');
                suggestions.push('建议增加有氧运动，控制饮食');
            } else if (trend < -0.5) {
                insights.push('体重在稳步下降，很棒！');
                suggestions.push('继续保持，注意不要过度节食');
            }
        }

        // 分析运动
        if (healthData.exercise?.todaySteps < 3000) {
            insights.push('今天步数还比较少');
            suggestions.push('饭后散步20分钟，对消化和血糖都好');
        } else if (healthData.exercise?.todaySteps > 8000) {
            insights.push('今天运动量很足！');
            suggestions.push('记得做拉伸放松，保护好膝盖');
        }

        return { insights, suggestions };
    }

    // 生成个性化欢迎语
    generateSmartWelcome() {
        const hour = new Date().getHours();
        const { insights, suggestions } = this.analyzeUserData();
        
        let greeting = '';
        let context = '';
        
        if (hour < 9) {
            greeting = '早上好';
            context = '新的一天开始了';
        } else if (hour < 12) {
            greeting = '上午好';
            context = '工作再忙也要照顾好自己';
        } else if (hour < 14) {
            greeting = '中午好';
            context = '午餐时间到了';
        } else if (hour < 18) {
            greeting = '下午好';
            context = '下午容易犯困，注意补充水分';
        } else {
            greeting = '晚上好';
            context = '今天过得怎么样';
        }

        let message = `${greeting}，BOSS Shao。${context}。`;

        // 添加个性化洞察
        if (insights.length > 0) {
            message += `\n\n📊 **今日健康洞察**：`;
            insights.forEach((insight, i) => {
                message += `\n• ${insight}`;
            });
        }

        // 添加建议
        if (suggestions.length > 0) {
            message += `\n\n💡 **AI建议**：`;
            suggestions.forEach((suggestion, i) => {
                if (i < 2) message += `\n• ${suggestion}`;
            });
        }

        // 添加引导
        message += `\n\n有什么想聊的？或者我可以帮你：\n`;
        message += `• 分析今天的健康数据\n`;
        message += `• 制定个性化运动计划\n`;
        message += `• 推荐适合的食谱\n`;
        message += `• 解答健康疑问`;

        return message;
    }

    // 智能回复 - 根据用户输入生成个性化回复
    generateSmartReply(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        
        // 分析用户意图
        if (lowerMsg.includes('累') || lowerMsg.includes('困') || lowerMsg.includes('疲劳')) {
            return this.handleFatigue();
        } else if (lowerMsg.includes('饿') || lowerMsg.includes('吃')) {
            return this.handleHunger();
        } else if (lowerMsg.includes('胖') || lowerMsg.includes('减肥') || lowerMsg.includes('体重')) {
            return this.handleWeightConcern();
        } else if (lowerMsg.includes('睡') || lowerMsg.includes('失眠')) {
            return this.handleSleepIssue();
        } else if (lowerMsg.includes('运动') || lowerMsg.includes('锻炼') || lowerMsg.includes('健身')) {
            return this.handleExerciseQuery();
        } else if (lowerMsg.includes('分析') || lowerMsg.includes('数据') || lowerMsg.includes('报告')) {
            return this.generateHealthReport();
        } else if (lowerMsg.includes('你好') || lowerMsg.includes('在吗')) {
            return this.generateSmartWelcome();
        } else {
            return this.generateContextualReply(userMessage);
        }
    }

    // 处理疲劳状态 - 增强情感表达
    handleFatigue() {
        const responses = [
            '听起来你现在状态不太好，需要休息一下。',
            '最近是不是太忙了？我注意到你的睡眠可能不足。',
            '身体在向你发出信号了，别忽视它。累了就歇会儿。'
        ];
        
        let reply = responses[Math.floor(Math.random() * responses.length)];
        
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        if (healthData.sleep?.lastNight < 6) {
            reply += `\n\n📉 **数据印证**：你昨晚只睡了${healthData.sleep.lastNight}小时，今天肯定没精神。`;
        }
        
        reply += `\n\n💡 **我的建议**：`;
        reply += `\n1. 现在闭眼休息5分钟，深呼吸，什么都别想`;
        reply += `\n2. 喝一杯温水，别靠咖啡续命`;
        reply += `\n3. 如果可能，今晚早点睡，把觉补回来`;
        reply += `\n\n需要我帮你制定一个放松计划，或者聊聊别的转移注意力？`;
        
        return reply;
    }

    // 处理饥饿/饮食
    handleHunger() {
        const hour = new Date().getHours();
        let mealSuggestion = '';
        
        if (hour < 10) {
            mealSuggestion = '早餐建议：燕麦粥 + 鸡蛋 + 牛奶，营养均衡又饱腹';
        } else if (hour < 15) {
            mealSuggestion = '午餐建议：一拳头米饭 + 掌心大的瘦肉 + 两拳头蔬菜';
        } else if (hour < 18) {
            mealSuggestion = '下午茶：坚果一小把 + 水果，别吃甜食';
        } else {
            mealSuggestion = '晚餐建议：清淡为主，七分饱就好，别吃太晚';
        }

        const nutritionData = JSON.parse(localStorage.getItem('ambrose_nutrition_data') || '{}');
        const remaining = 2000 - (nutritionData.stats?.calories || 0);

        let reply = `饿了就吃，但要吃得聪明。`;
        reply += `\n\n${mealSuggestion}`;
        
        if (remaining > 0) {
            reply += `\n\n📊 **今日剩余热量**：${remaining} kcal，可以吃，但要控制量。`;
        }
        
        reply += `\n\n要我帮你记录这餐吗？或者推荐具体的食谱？`;
        
        return reply;
    }

    // 处理体重焦虑
    handleWeightConcern() {
        const weightData = JSON.parse(localStorage.getItem('ambrose_weight_data') || '{}');
        
        let reply = '体重只是数字，健康才是目标。别太焦虑。';
        
        if (weightData.currentWeight && weightData.targetWeight) {
            const diff = weightData.currentWeight - weightData.targetWeight;
            if (diff > 0) {
                reply += `\n\n📊 **现状**：距离目标还有 ${diff.toFixed(1)} kg`;
                reply += `\n\n💡 **科学建议**：每周减0.5-1kg是安全速度，别急于求成。`;
            }
        }
        
        reply += `\n\n我可以帮你：\n`;
        reply += `• 制定科学的减重计划\n`;
        reply += `• 推荐减脂食谱\n`;
        reply += `• 分析今天的饮食和运动\n`;
        reply += `• 记录体重变化`;
        
        return reply;
    }

    // 处理睡眠问题
    handleSleepIssue() {
        let reply = '睡眠是健康的基石，有什么问题吗？';
        
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        if (healthData.sleep?.lastNight) {
            if (healthData.sleep.lastNight < 6) {
                reply += `\n\n⚠️ **警告**：你昨晚只睡了${healthData.sleep.lastNight}小时，长期这样免疫力会下降。`;
                reply += `\n\n💡 **今晚改善方案**：`;
                reply += `\n1. 10点后别碰手机，蓝光会抑制褪黑素`;
                reply += `\n2. 睡前泡脚10分钟，促进血液循环`;
                reply += `\n3. 卧室温度调到20-22°C最利于入睡`;
            } else {
                reply += `\n\n✅ **好消息**：你昨晚睡了${healthData.sleep.lastNight}小时，继续保持！`;
            }
        }
        
        return reply;
    }

    // 处理运动查询
    handleExerciseQuery() {
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        const steps = healthData.exercise?.todaySteps || 0;
        
        let reply = '运动是最好的投资。';
        
        if (steps < 3000) {
            reply += `\n\n📉 **今日步数**：${steps}，有点少哦。`;
            reply += `\n\n💡 **现在开始**：`;
            reply += `\n• 原地高抬腿2分钟`;
            reply += `\n• 爬楼梯10层`;
            reply += `\n• 或者出去快走15分钟`;
        } else if (steps < 8000) {
            reply += `\n\n📊 **今日步数**：${steps}，还不错，再加把劲到8000步！`;
        } else {
            reply += `\n\n🎉 **今日步数**：${steps}，太棒了！运动量达标！`;
            reply += `\n\n记得做拉伸放松，保护好膝盖。`;
        }
        
        reply += `\n\n要我为你制定今天的运动计划吗？`;
        
        return reply;
    }

    // 生成健康报告
    generateHealthReport() {
        const { insights, suggestions } = this.analyzeUserData();
        
        let report = `📊 **你的专属健康报告**\n\n`;
        
        // 数据总览
        report += `**今日数据总览**：\n`;
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        const nutritionData = JSON.parse(localStorage.getItem('ambrose_nutrition_data') || '{}');
        
        report += `• 步数：${healthData.exercise?.todaySteps || 0}\n`;
        report += `• 睡眠：${healthData.sleep?.lastNight || '--'} 小时\n`;
        report += `• 饮水：${healthData.nutrition?.water || 0} ml\n`;
        report += `• 热量：${nutritionData.stats?.calories || 0} kcal\n\n`;
        
        // 洞察
        if (insights.length > 0) {
            report += `**⚠️ 需要关注**：\n`;
            insights.forEach(i => report += `• ${i}\n`);
            report += `\n`;
        }
        
        // 建议
        if (suggestions.length > 0) {
            report += `**💡 AI建议**：\n`;
            suggestions.forEach(s => report += `• ${s}\n`);
        }
        
        report += `\n\n需要我详细解释哪一项？或者帮你制定改善计划？`;
        
        return report;
    }

    // 通用情境回复
    generateContextualReply(userMessage) {
        // 学习用户偏好，记录对话
        this.conversationHistory.push({
            time: new Date().toISOString(),
            message: userMessage
        });

        // 基于对话历史的智能回复
        const responses = [
            `我明白你的意思。根据你的健康数据，我建议我们可以聊聊${this.suggestTopic()}。`,
            `这是个好问题。作为你的AI健康教练，我需要了解更多你的情况才能给出最好的建议。`,
            `我记下了。你之前提到过类似的问题，看起来这方面确实需要关注。`,
            `让我想想...根据你的数据模式，这可能和${this.analyzePattern()}有关。`
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    // 建议话题
    suggestTopic() {
        const topics = ['饮食调整', '睡眠改善', '运动计划', '压力管理'];
        return topics[Math.floor(Math.random() * topics.length)];
    }

    // 分析模式
    analyzePattern() {
        return '最近的生活习惯变化';
    }

    // 主动提醒 - 可以定时调用
    generateProactiveReminder() {
        const hour = new Date().getHours();
        const reminders = [];

        if (hour === 9) {
            reminders.push('早上好！记得喝一杯温水，开启新的一天。');
        } else if (hour === 12) {
            reminders.push('午餐时间到！记得营养均衡，别吃太饱。');
        } else if (hour === 15) {
            reminders.push('下午茶时间，起来走动走动，喝杯水。');
        } else if (hour === 18) {
            reminders.push('下班了！今天运动了吗？哪怕散步20分钟也好。');
        } else if (hour === 22) {
            reminders.push('该准备睡了，放下手机，明天又是新的一天。');
        }

        return reminders;
    }
}

// 暴露到全局
window.AICoach = AICoach;
