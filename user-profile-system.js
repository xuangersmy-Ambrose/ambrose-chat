/**
 * AMBROSE User Profile System v1.0
 * 用户画像与个性化推荐系统
 * 学习：抖音算法 + Lark Health + 精准营销
 */

class UserProfileSystem {
    constructor() {
        this.profile = this.loadProfile();
        this.behaviorLog = [];
        this.preferences = {};
    }

    loadProfile() {
        return JSON.parse(localStorage.getItem('ambrose_user_profile_v2') || '{}');
    }

    saveProfile() {
        localStorage.setItem('ambrose_user_profile_v2', JSON.stringify(this.profile));
    }

    // 构建用户画像 - 学习抖音算法
    buildUserProfile() {
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        const nutritionData = JSON.parse(localStorage.getItem('ambrose_nutrition_data') || '{}');
        const weightData = JSON.parse(localStorage.getItem('ambrose_weight_data') || '{}');

        const profile = {
            // 基础属性
            basic: {
                bmi: this.calculateBMI(weightData),
                age: this.estimateAge(),
                activityLevel: this.calculateActivityLevel(healthData),
                sleepQuality: this.assessSleepQuality(healthData)
            },

            // 行为特征
            behavior: {
                mealPatterns: this.analyzeMealPatterns(nutritionData),
                exerciseHabits: this.analyzeExerciseHabits(healthData),
                waterIntake: this.analyzeWaterHabits(healthData),
                sleepPatterns: this.analyzeSleepPatterns(healthData)
            },

            // 健康目标
            goals: {
                weightGoal: weightData.targetWeight || null,
                healthGoal: this.inferHealthGoal(weightData, healthData),
                priority: this.determinePriority()
            },

            // 偏好标签
            preferences: {
                foodTypes: this.getFoodPreferences(nutritionData),
                exerciseTypes: this.getExercisePreferences(healthData),
                reminderTimes: this.getPreferredReminderTimes()
            },

            // 风险评估
            risks: {
                sleepDeprivation: this.assessSleepRisk(healthData),
                nutritionImbalance: this.assessNutritionRisk(nutritionData),
                sedentaryLifestyle: this.assessSedentaryRisk(healthData)
            }
        };

        this.profile = profile;
        this.saveProfile();
        return profile;
    }

    // 计算BMI
    calculateBMI(weightData) {
        if (!weightData.currentWeight || !weightData.height) return null;
        const h = weightData.height / 100;
        return (weightData.currentWeight / (h * h)).toFixed(1);
    }

    // 估算活跃度
    calculateActivityLevel(healthData) {
        const steps = healthData.exercise?.todaySteps || 0;
        if (steps > 10000) return 'high';
        if (steps > 6000) return 'moderate';
        if (steps > 3000) return 'low';
        return 'sedentary';
    }

    // 评估睡眠质量
    assessSleepQuality(healthData) {
        const sleep = healthData.sleep?.lastNight || 0;
        if (sleep >= 7 && sleep <= 9) return 'good';
        if (sleep >= 6) return 'fair';
        return 'poor';
    }

    // 分析用餐模式
    analyzeMealPatterns(nutritionData) {
        const meals = nutritionData.today || {};
        return {
            breakfast: meals.breakfast?.length > 0,
            lunch: meals.lunch?.length > 0,
            dinner: meals.dinner?.length > 0,
            regularity: this.calculateMealRegularity(meals)
        };
    }

    // 分析运动习惯
    analyzeExerciseHabits(healthData) {
        const history = healthData.exercise?.history || [];
        return {
            frequency: history.length,
            avgSteps: history.length > 0 ? 
                history.reduce((a, b) => a + b.steps, 0) / history.length : 0,
            consistency: this.calculateConsistency(history)
        };
    }

    // 推断健康目标
    inferHealthGoal(weightData, healthData) {
        if (weightData.targetWeight && weightData.currentWeight) {
            const diff = weightData.currentWeight - weightData.targetWeight;
            if (diff > 5) return 'lose_weight';
            if (diff < -5) return 'gain_weight';
            return 'maintain';
        }
        
        const bmi = this.calculateBMI(weightData);
        if (bmi > 24) return 'lose_weight';
        if (bmi < 18.5) return 'gain_weight';
        
        return 'general_health';
    }

    // 个性化推荐 - 学习Lark Health
    generatePersonalizedRecommendations() {
        const profile = this.buildUserProfile();
        const recommendations = [];

        // 基于目标的推荐
        switch (profile.goals.healthGoal) {
            case 'lose_weight':
                recommendations.push({
                    type: 'diet',
                    title: '减脂餐推荐',
                    content: '基于你的目标，建议午餐减少碳水化合物摄入，增加蛋白质比例。',
                    action: '查看减脂食谱'
                });
                recommendations.push({
                    type: 'exercise',
                    title: '有氧运动计划',
                    content: '每天30分钟快走或慢跑，有助于燃烧脂肪。',
                    action: '开始运动'
                });
                break;
            
            case 'gain_weight':
                recommendations.push({
                    type: 'diet',
                    title: '增肌餐推荐',
                    content: '增加优质蛋白质和健康脂肪摄入。',
                    action: '查看增肌食谱'
                });
                break;
            
            case 'maintain':
                recommendations.push({
                    type: 'general',
                    title: '保持当前状态',
                    content: '你的体重很健康，继续保持良好的生活习惯！',
                    action: '记录今日数据'
                });
                break;
        }

        // 基于风险的干预
        if (profile.risks.sleepDeprivation) {
            recommendations.push({
                type: 'sleep',
                priority: 'high',
                title: '⚠️ 睡眠警报',
                content: '你最近睡眠不足，这会影响代谢和免疫力。',
                action: '制定睡眠改善计划'
            });
        }

        if (profile.risks.sedentaryLifestyle) {
            recommendations.push({
                type: 'exercise',
                priority: 'high',
                title: '🚨 久坐提醒',
                content: '你今天的活动量偏低，建议每1小时起身活动5分钟。',
                action: '设置活动提醒'
            });
        }

        // 基于偏好的推荐
        if (profile.preferences.foodTypes?.includes('chinese')) {
            recommendations.push({
                type: 'diet',
                title: '中式健康食谱',
                content: '推荐3道适合你的中式低卡菜品。',
                action: '查看食谱'
            });
        }

        return recommendations;
    }

    // 生成个性化健康日报
    generateDailyReport() {
        const profile = this.buildUserProfile();
        const recommendations = this.generatePersonalizedRecommendations();

        return {
            profile,
            recommendations,
            summary: this.generateSummary(profile),
            actions: this.generateActionItems(profile, recommendations)
        };
    }

    // 生成总结
    generateSummary(profile) {
        const summaries = [];
        
        if (profile.basic.sleepQuality === 'good') {
            summaries.push('睡眠充足 ✓');
        } else {
            summaries.push('需要改善睡眠 ⚠️');
        }

        if (profile.behavior.exerciseHabits.avgSteps > 6000) {
            summaries.push('运动量达标 ✓');
        } else {
            summaries.push('可以增加运动量 📈');
        }

        return summaries;
    }

    // 生成行动项
    generateActionItems(profile, recommendations) {
        return recommendations
            .filter(r => r.priority === 'high')
            .map(r => ({
                title: r.title,
                action: r.action,
                type: r.type
            }));
    }

    // 辅助方法
    estimateAge() {
        return 30; // 默认或从数据推断
    }

    calculateMealRegularity(meals) {
        const count = ['breakfast', 'lunch', 'dinner'].filter(m => meals[m]?.length > 0).length;
        return count / 3;
    }

    calculateConsistency(history) {
        if (history.length < 7) return 0;
        const recent = history.slice(-7);
        const activeDays = recent.filter(h => h.steps > 3000).length;
        return activeDays / 7;
    }

    analyzeWaterHabits(healthData) {
        return {
            avg: healthData.nutrition?.water || 0,
            target: 2500,
            percentage: Math.min((healthData.nutrition?.water || 0) / 2500 * 100, 100)
        };
    }

    analyzeSleepPatterns(healthData) {
        return {
            avgDuration: healthData.sleep?.lastNight || 0,
            quality: this.assessSleepQuality(healthData)
        };
    }

    getFoodPreferences(nutritionData) {
        return ['chinese', 'balanced']; // 简化版
    }

    getExercisePreferences(healthData) {
        return ['walking', 'cardio']; // 简化版
    }

    getPreferredReminderTimes() {
        return ['09:00', '12:00', '15:00', '18:00', '22:00'];
    }

    determinePriority() {
        return 'health';
    }

    assessSleepRisk(healthData) {
        return healthData.sleep?.lastNight < 6;
    }

    assessNutritionRisk(nutritionData) {
        const stats = nutritionData.stats || {};
        return stats.calories > 2500 || stats.calories < 1200;
    }

    assessSedentaryRisk(healthData) {
        return (healthData.exercise?.todaySteps || 0) < 3000;
    }
}

// 暴露到全局
window.UserProfileSystem = UserProfileSystem;
