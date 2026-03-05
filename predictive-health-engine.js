/**
 * AMBROSE Predictive Health Engine v1.0
 * 预测性健康风险引擎
 * 学习：Google DeepMind + 机器学习健康预测
 */

class PredictiveHealthEngine {
    constructor() {
        this.riskModels = this.initializeRiskModels();
        this.predictionHistory = [];
    }

    // 初始化风险预测模型
    initializeRiskModels() {
        return {
            // 代谢综合征风险模型
            metabolicSyndrome: {
                factors: ['bmi', 'waist', 'bloodPressure', 'glucose', 'triglycerides'],
                weights: { bmi: 0.3, waist: 0.2, bp: 0.2, glucose: 0.15, tg: 0.15 },
                threshold: 0.6
            },
            
            // 心血管疾病风险模型 (简化版Framingham)
            cardiovascular: {
                factors: ['age', 'gender', 'totalCholesterol', 'hdl', 'smoking', 'systolicBP', 'treatment'],
                calculate: (data) => {
                    let risk = 0;
                    // 年龄因子
                    if (data.age > 45) risk += 0.15;
                    if (data.age > 55) risk += 0.1;
                    
                    // 胆固醇因子
                    if (data.cholesterol > 240) risk += 0.2;
                    else if (data.cholesterol > 200) risk += 0.1;
                    
                    // 吸烟因子
                    if (data.smoking) risk += 0.15;
                    
                    // 血压因子
                    if (data.systolicBP > 140) risk += 0.2;
                    else if (data.systolicBP > 120) risk += 0.1;
                    
                    return Math.min(risk, 1.0);
                }
            },

            // 糖尿病风险模型
            diabetes: {
                factors: ['bmi', 'age', 'familyHistory', 'physicalActivity', 'gestational'],
                calculate: (data) => {
                    let score = 0;
                    
                    // BMI评分
                    if (data.bmi >= 30) score += 10;
                    else if (data.bmi >= 25) score += 5;
                    
                    // 年龄评分
                    if (data.age >= 65) score += 9;
                    else if (data.age >= 55) score += 5;
                    else if (data.age >= 45) score += 3;
                    
                    // 家族史
                    if (data.familyHistory) score += 5;
                    
                    // 运动不足
                    if (data.sedentary) score += 5;
                    
                    // 妊娠期糖尿病史
                    if (data.gestational) score += 5;
                    
                    // 转换为风险概率 (简化版)
                    return Math.min(score / 26, 1.0);
                }
            },

            // 睡眠障碍风险模型
            sleepDisorder: {
                factors: ['avgSleepDuration', 'sleepConsistency', 'snoring', 'daytimeFatigue'],
                calculate: (data) => {
                    let risk = 0;
                    
                    // 睡眠时长异常
                    if (data.avgSleep < 6 || data.avgSleep > 9) risk += 0.3;
                    
                    // 睡眠不规律
                    if (data.consistency < 0.7) risk += 0.2;
                    
                    // 打鼾
                    if (data.snoring) risk += 0.25;
                    
                    // 日间疲劳
                    if (data.fatigue) risk += 0.25;
                    
                    return Math.min(risk, 1.0);
                }
            },

            // 心理健康风险模型 (抑郁/焦虑)
            mentalHealth: {
                factors: ['moodTrend', 'sleepQuality', 'socialActivity', 'stressLevel'],
                calculate: (data) => {
                    let risk = 0;
                    
                    // 情绪趋势下降
                    if (data.moodTrend === 'declining') risk += 0.3;
                    
                    // 睡眠质量差
                    if (data.poorSleep) risk += 0.25;
                    
                    // 社交活动减少
                    if (data.socialWithdrawal) risk += 0.25;
                    
                    // 高压力
                    if (data.highStress) risk += 0.2;
                    
                    return Math.min(risk, 1.0);
                }
            }
        };
    }

    // 收集用户健康数据
    collectHealthData() {
        const healthData = JSON.parse(localStorage.getItem('ambrose_health_data') || '{}');
        const weightData = JSON.parse(localStorage.getItem('ambrose_weight_data') || '{}');
        const nutritionData = JSON.parse(localStorage.getItem('ambrose_nutrition_data') || '{}');

        return {
            // 基础数据
            bmi: weightData.currentWeight && weightData.height ? 
                (weightData.currentWeight / Math.pow(weightData.height/100, 2)).toFixed(1) : null,
            weight: weightData.currentWeight,
            targetWeight: weightData.targetWeight,
            
            // 运动数据
            steps: healthData.exercise?.todaySteps || 0,
            avgSteps: this.calculateAvgSteps(healthData),
            
            // 睡眠数据
            sleep: healthData.sleep?.lastNight || 0,
            sleepQuality: healthData.sleep?.quality || 'unknown',
            sleepHistory: healthData.sleep?.history || [],
            
            // 饮食数据
            calories: nutritionData.stats?.calories || 0,
            protein: nutritionData.stats?.protein || 0,
            carbs: nutritionData.stats?.carbs || 0,
            fat: nutritionData.stats?.fat || 0,
            
            // 情绪数据
            mood: healthData.mood?.today || null,
            moodHistory: healthData.mood?.history || []
        };
    }

    // 计算平均步数
    calculateAvgSteps(healthData) {
        const history = healthData.exercise?.history || [];
        if (history.length === 0) return 0;
        return history.reduce((a, b) => a + (b.steps || 0), 0) / history.length;
    }

    // 预测代谢综合征风险
    predictMetabolicSyndrome(data) {
        let riskScore = 0;
        let factors = [];

        // BMI风险
        if (data.bmi >= 30) {
            riskScore += 0.4;
            factors.push('肥胖 (BMI≥30)');
        } else if (data.bmi >= 25) {
            riskScore += 0.2;
            factors.push('超重 (BMI≥25)');
        }

        // 运动不足
        if (data.avgSteps < 5000) {
            riskScore += 0.2;
            factors.push('久坐生活方式');
        }

        // 睡眠不足
        if (data.sleep < 6) {
            riskScore += 0.15;
            factors.push('睡眠不足');
        }

        // 饮食不均衡
        if (data.calories > 2500) {
            riskScore += 0.15;
            factors.push('热量摄入过高');
        }

        return {
            riskLevel: this.getRiskLevel(riskScore),
            probability: Math.min(riskScore, 1.0),
            factors: factors,
            recommendation: this.getMetabolicRecommendation(riskScore)
        };
    }

    // 预测糖尿病风险
    predictDiabetesRisk(data) {
        const model = this.riskModels.diabetes;
        
        const diabetesData = {
            bmi: data.bmi || 22,
            age: 30, // 默认或从profile获取
            familyHistory: false, // 需要用户输入
            sedentary: data.avgSteps < 4000,
            gestational: false
        };

        const probability = model.calculate(diabetesData);

        return {
            riskLevel: this.getRiskLevel(probability),
            probability: probability,
            factors: this.getDiabetesFactors(diabetesData),
            recommendation: this.getDiabetesRecommendation(probability)
        };
    }

    // 预测心血管疾病风险
    predictCardiovascularRisk(data) {
        const model = this.riskModels.cardiovascular;
        
        const cvData = {
            age: 30,
            gender: 'male',
            cholesterol: 200, // 需要真实数据
            smoking: false,
            systolicBP: 120, // 需要真实数据
            treatment: false
        };

        const probability = model.calculate(cvData);

        return {
            riskLevel: this.getRiskLevel(probability),
            probability: probability,
            recommendation: this.getCardiovascularRecommendation(probability)
        };
    }

    // 预测睡眠障碍风险
    predictSleepDisorderRisk(data) {
        const model = this.riskModels.sleepDisorder;
        
        const sleepData = {
            avgSleep: data.sleep,
            consistency: this.calculateSleepConsistency(data.sleepHistory),
            snoring: false, // 需要用户报告
            fatigue: data.avgSteps < 3000 // 假设低活动度 correlates with fatigue
        };

        const probability = model.calculate(sleepData);

        return {
            riskLevel: this.getRiskLevel(probability),
            probability: probability,
            factors: this.getSleepFactors(sleepData),
            recommendation: this.getSleepRecommendation(probability)
        };
    }

    // 预测心理健康风险
    predictMentalHealthRisk(data) {
        const model = this.riskModels.mentalHealth;
        
        const mentalData = {
            moodTrend: this.analyzeMoodTrend(data.moodHistory),
            poorSleep: data.sleep < 6,
            socialWithdrawal: data.avgSteps < 2000, // 假设低活动可能 correlates
            highStress: data.mood === '😰' || data.mood === '😔'
        };

        const probability = model.calculate(mentalData);

        return {
            riskLevel: this.getRiskLevel(probability),
            probability: probability,
            recommendation: this.getMentalHealthRecommendation(probability)
        };
    }

    // 生成完整健康风险报告
    generateHealthRiskReport() {
        const data = this.collectHealthData();
        
        if (!data.bmi) {
            return {
                error: '数据不足',
                message: '请先记录体重和身高数据以生成风险报告'
            };
        }

        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                overallRisk: 'calculating',
                urgentIssues: []
            },
            predictions: {
                metabolic: this.predictMetabolicSyndrome(data),
                diabetes: this.predictDiabetesRisk(data),
                cardiovascular: this.predictCardiovascularRisk(data),
                sleep: this.predictSleepDisorderRisk(data),
                mental: this.predictMentalHealthRisk(data)
            },
            trends: this.analyzeTrends(data),
            recommendations: []
        };

        // 计算总体风险
        const risks = Object.values(report.predictions).map(p => p.probability);
        report.summary.overallRisk = Math.max(...risks);

        // 识别紧急问题
        Object.entries(report.predictions).forEach(([type, prediction]) => {
            if (prediction.riskLevel === 'high') {
                report.summary.urgentIssues.push({
                    type: type,
                    probability: prediction.probability,
                    message: this.getUrgentMessage(type)
                });
            }
        });

        // 生成综合建议
        report.recommendations = this.generateComprehensiveRecommendations(report);

        return report;
    }

    // 辅助方法
    getRiskLevel(probability) {
        if (probability >= 0.7) return 'high';
        if (probability >= 0.4) return 'moderate';
        return 'low';
    }

    calculateSleepConsistency(history) {
        if (!history || history.length < 3) return 1;
        const avg = history.reduce((a, b) => a + b.duration, 0) / history.length;
        const variance = history.reduce((a, b) => a + Math.pow(b.duration - avg, 2), 0) / history.length;
        return Math.max(0, 1 - variance / 10);
    }

    analyzeMoodTrend(history) {
        if (!history || history.length < 3) return 'stable';
        const recent = history.slice(-5);
        const scores = recent.map(h => this.moodToScore(h.mood));
        const trend = scores[scores.length - 1] - scores[0];
        if (trend < -2) return 'declining';
        if (trend > 2) return 'improving';
        return 'stable';
    }

    moodToScore(mood) {
        const scores = { '😊': 5, '😄': 5, '😐': 3, '😔': 2, '😰': 1 };
        return scores[mood] || 3;
    }

    analyzeTrends(data) {
        return {
            weight: this.calculateWeightTrend(data),
            sleep: this.calculateSleepTrend(data),
            activity: this.calculateActivityTrend(data)
        };
    }

    calculateWeightTrend(data) {
        // 简化版
        return 'stable';
    }

    calculateSleepTrend(data) {
        // 简化版
        return 'stable';
    }

    calculateActivityTrend(data) {
        // 简化版
        return 'stable';
    }

    // 获取各类建议
    getMetabolicRecommendation(risk) {
        if (risk >= 0.7) return '建议立即咨询医生，制定减重和生活方式干预计划';
        if (risk >= 0.4) return '建议调整饮食结构，增加运动量，定期监测指标';
        return '保持良好的生活习惯，定期体检';
    }

    getDiabetesFactors(data) {
        const factors = [];
        if (data.bmi >= 25) factors.push('超重/肥胖');
        if (data.sedentary) factors.push('缺乏运动');
        if (data.familyHistory) factors.push('糖尿病家族史');
        return factors;
    }

    getDiabetesRecommendation(risk) {
        if (risk >= 0.5) return '建议进行糖耐量测试，咨询内分泌科医生';
        if (risk >= 0.3) return '建议控制饮食，增加运动，定期监测血糖';
        return '保持健康饮食和运动习惯';
    }

    getCardiovascularRecommendation(risk) {
        if (risk >= 0.2) return '建议定期检查血压和血脂';
        return '保持健康生活方式';
    }

    getSleepFactors(data) {
        const factors = [];
        if (data.avgSleep < 6) factors.push('睡眠不足');
        if (data.consistency < 0.7) factors.push('作息不规律');
        if (data.snoring) factors.push('打鼾');
        return factors;
    }

    getSleepRecommendation(risk) {
        if (risk >= 0.6) return '建议进行睡眠监测，咨询睡眠专科医生';
        if (risk >= 0.3) return '建议改善睡眠环境和习惯';
        return '保持规律作息';
    }

    getMentalHealthRecommendation(risk) {
        if (risk >= 0.6) return '建议寻求专业心理咨询';
        if (risk >= 0.3) return '建议增加社交活动，尝试放松技巧';
        return '保持积极心态';
    }

    getUrgentMessage(type) {
        const messages = {
            metabolic: '代谢综合征风险较高，需要立即干预',
            diabetes: '糖尿病风险较高，建议尽快就医检查',
            cardiovascular: '心血管风险较高，需要关注',
            sleep: '睡眠障碍风险较高，影响健康',
            mental: '心理健康需要关注，建议寻求支持'
        };
        return messages[type] || '健康风险需要关注';
    }

    generateComprehensiveRecommendations(report) {
        const recommendations = [];

        // 基于最高风险的推荐
        const highestRisk = Object.entries(report.predictions)
            .sort((a, b) => b[1].probability - a[1].probability)[0];

        if (highestRisk[1].probability > 0.5) {
            recommendations.push({
                priority: 'urgent',
                type: highestRisk[0],
                action: highestRisk[1].recommendation
            });
        }

        // 通用推荐
        recommendations.push({
            priority: 'normal',
            type: 'general',
            action: '保持规律作息，均衡饮食，适量运动'
        });

        return recommendations;
    }
}

// 暴露到全局
window.PredictiveHealthEngine = PredictiveHealthEngine;
