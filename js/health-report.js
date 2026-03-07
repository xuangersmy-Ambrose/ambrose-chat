/**
 * AMBROSE Health - 运动数据报告系统
 * 学习Keep运动档案，生成详细的健康数据分析报告
 */

class HealthReportSystem {
  constructor() {
    this.metrics = {
      workout: {
        totalWorkouts: 0,
        totalDuration: 0,      // 分钟
        totalCalories: 0,
        currentStreak: 0,
        longestStreak: 0,
        weeklyFrequency: 0,    // 每周训练次数
        favoriteType: ''
      },
      body: {
        weight: [],            // 体重变化数组
        bmi: 0,
        bodyFat: 0,
        muscle: 0
      },
      sleep: {
        avgDuration: 0,        // 平均睡眠时长
        avgQuality: 0,         // 平均睡眠质量
        bedTime: '',           // 平均入睡时间
        wakeTime: ''           // 平均起床时间
      },
      diet: {
        avgCalories: 0,
        avgProtein: 0,
        avgCarbs: 0,
        avgFat: 0,
        waterIntake: 0         // 平均饮水量
      }
    };
  }

  // 生成周报
  generateWeeklyReport(userData) {
    const weekData = this.getWeekData(userData);
    const analysis = this.analyzeWeek(weekData);
    
    return {
      period: '周报',
      dateRange: weekData.dateRange,
      summary: {
        totalWorkouts: weekData.workouts.length,
        totalDuration: weekData.totalDuration,
        totalCalories: weekData.totalCalories,
        avgDuration: weekData.avgDuration,
        completionRate: analysis.completionRate
      },
      analysis: {
        strengths: analysis.strengths,
        improvements: analysis.improvements,
        trend: analysis.trend,
        comparison: analysis.comparison  // 与上周对比
      },
      recommendations: this.generateRecommendations(analysis),
      nextWeekPlan: this.generateNextWeekPlan(analysis)
    };
  }

  // 生成月报
  generateMonthlyReport(userData) {
    const monthData = this.getMonthData(userData);
    const analysis = this.analyzeMonth(monthData);
    
    return {
      period: '月报',
      dateRange: monthData.dateRange,
      summary: {
        totalWorkouts: monthData.workouts.length,
        totalDuration: monthData.totalDuration,
        totalCalories: monthData.totalCalories,
        avgWeeklyWorkouts: analysis.avgWeeklyWorkouts,
        consistency: analysis.consistency
      },
      achievements: this.checkAchievements(monthData),
      bodyChanges: this.analyzeBodyChanges(monthData),
      progress: {
        level: analysis.level,
        points: analysis.points,
        badges: analysis.badges
      },
      recommendations: this.generateMonthlyRecommendations(analysis)
    };
  }

  // 生成运动档案（学习Keep）
  generateSportProfile(userData) {
    const allData = this.getAllData(userData);
    
    return {
      overview: {
        joinDate: userData.joinDate,
        totalDays: this.calculateDays(userData.joinDate),
        totalWorkouts: allData.totalWorkouts,
        totalDuration: allData.totalDuration,
        totalCalories: allData.totalCalories
      },
      capabilities: {
        aerobic: this.assessAerobic(allData),      // 有氧能力
        strength: this.assessStrength(allData),    // 力量水平
        flexibility: this.assessFlexibility(allData), // 柔韧性
        endurance: this.assessEndurance(allData)    // 耐力水平
      },
      preferences: {
        favoriteWorkouts: this.getFavoriteWorkouts(allData),
        activeHours: this.getActiveHours(allData),
        weeklyPattern: this.getWeeklyPattern(allData)
      },
      milestones: this.getMilestones(allData),
      comparison: {
        percentile: this.calculatePercentile(allData), // 超过多少用户
        level: this.determineLevel(allData)
      }
    };
  }

  // 分析一周数据
  analyzeWeek(weekData) {
    const strengths = [];
    const improvements = [];
    
    // 分析强项
    if (weekData.totalWorkouts >= 4) {
      strengths.push('本周训练频率优秀，保持了良好的运动习惯');
    }
    if (weekData.avgDuration >= 30) {
      strengths.push('单次训练时长充足，训练效果有保障');
    }
    if (weekData.currentStreak >= 3) {
      strengths.push('连续打卡表现优异，自律性值得称赞');
    }
    
    // 分析改进点
    if (weekData.totalWorkouts < 3) {
      improvements.push('训练频率偏低，建议每周至少3次训练');
    }
    if (weekData.avgDuration < 20) {
      improvements.push('单次训练时长偏短，建议延长至30分钟以上');
    }
    if (!weekData.hasVariety) {
      improvements.push('训练类型较为单一，建议增加多样性');
    }

    // 趋势分析
    const trend = weekData.totalWorkouts >= weekData.lastWeekWorkouts ? 'up' : 'down';
    
    return {
      strengths,
      improvements,
      trend,
      completionRate: (weekData.completedWorkouts / weekData.plannedWorkouts * 100).toFixed(1)
    };
  }

  // 生成建议
  generateRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.improvements.length > 0) {
      recommendations.push(...analysis.improvements);
    }
    
    if (analysis.trend === 'down') {
      recommendations.push('本周运动量较上周有所下降，建议调整状态，下周加油！');
    }
    
    if (analysis.completionRate >= 80) {
      recommendations.push('完成情况良好，可以尝试增加训练强度或时长');
    }
    
    return recommendations;
  }

  // 检查成就
  checkAchievements(data) {
    const achievements = [];
    
    if (data.totalWorkouts >= 10) {
      achievements.push({ name: '训练达人', icon: '🏋️', desc: '累计完成10次训练' });
    }
    if (data.totalCalories >= 5000) {
      achievements.push({ name: '卡路里杀手', icon: '🔥', desc: '累计消耗5000千卡' });
    }
    if (data.currentStreak >= 7) {
      achievements.push({ name: '周连续打卡', icon: '📅', desc: '连续打卡7天' });
    }
    if (data.totalDuration >= 600) {
      achievements.push({ name: '持之以恒', icon: '⏱️', desc: '累计运动10小时' });
    }
    
    return achievements;
  }

  // 计算超过多少用户
  calculatePercentile(data) {
    // 基于用户数据的排名计算
    const score = data.totalWorkouts * 10 + data.totalDuration / 60;
    if (score >= 500) return 95;
    if (score >= 300) return 80;
    if (score >= 150) return 60;
    if (score >= 50) return 40;
    return 20;
  }

  // 确定用户等级
  determineLevel(data) {
    const score = data.totalWorkouts * 10 + data.totalDuration / 60;
    if (score >= 1000) return { name: '健身大师', color: '#FFD700' };
    if (score >= 500) return { name: '健身达人', color: '#C0C0C0' };
    if (score >= 200) return { name: '健身进阶', color: '#CD7F32' };
    return { name: '健身新手', color: '#8B4513' };
  }

  // 获取周数据（模拟）
  getWeekData(userData) {
    const today = new Date();
    const weekAgo = new Date(today - 7 * 24 * 60 * 60 * 1000);
    
    return {
      dateRange: `${weekAgo.toLocaleDateString()} - ${today.toLocaleDateString()}`,
      workouts: userData.workouts?.slice(-7) || [],
      totalDuration: userData.totalDuration || 0,
      totalCalories: userData.totalCalories || 0,
      avgDuration: userData.avgDuration || 0,
      currentStreak: userData.currentStreak || 0,
      completedWorkouts: userData.completedWorkouts || 0,
      plannedWorkouts: userData.plannedWorkouts || 3,
      hasVariety: true,
      lastWeekWorkouts: userData.lastWeekWorkouts || 0
    };
  }

  // 生成可视化图表数据
  generateChartData(userData) {
    const workouts = userData.workouts || [];
    
    return {
      weeklyActivity: this.generateWeeklyActivityData(workouts),
      caloriesTrend: this.generateCaloriesTrend(workouts),
      workoutTypes: this.generateWorkoutTypesPie(workouts),
      durationDistribution: this.generateDurationDistribution(workouts)
    };
  }

  generateWeeklyActivityData(workouts) {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return days.map(day => ({
      day,
      count: Math.floor(Math.random() * 3), // 模拟数据
      duration: Math.floor(Math.random() * 60)
    }));
  }

  generateCaloriesTrend(workouts) {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `第${i + 1}天`,
      calories: 200 + Math.floor(Math.random() * 400)
    }));
  }

  generateWorkoutTypesPie(workouts) {
    return [
      { type: '力量训练', value: 40, color: '#00D4FF' },
      { type: '有氧运动', value: 30, color: '#FF2D92' },
      { type: '瑜伽拉伸', value: 20, color: '#55E6C1' },
      { type: '其他', value: 10, color: '#FFD93D' }
    ];
  }

  generateDurationDistribution(workouts) {
    return [
      { range: '0-15分钟', count: 2 },
      { range: '15-30分钟', count: 5 },
      { range: '30-45分钟', count: 8 },
      { range: '45分钟以上', count: 3 }
    ];
  }
}

// 创建全局实例
const healthReport = new HealthReportSystem();

// 导出函数
window.generateWeeklyReport = function(userData) {
  return healthReport.generateWeeklyReport(userData);
};

window.generateMonthlyReport = function(userData) {
  return healthReport.generateMonthlyReport(userData);
};

window.generateSportProfile = function(userData) {
  return healthReport.generateSportProfile(userData);
};

window.generateChartData = function(userData) {
  return healthReport.generateChartData(userData);
};

console.log('[AMBROSE] Health Report System loaded');
