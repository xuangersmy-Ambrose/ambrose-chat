/**
 * AMBROSE Health - 智能计划生成器
 * 学习Keep智能计划，基于用户数据生成个性化训练计划
 */

class SmartPlanGenerator {
  constructor() {
    this.planTemplates = {
      beginner: {
        name: '新手入门计划',
        description: '适合零基础，循序渐进建立运动习惯',
        duration: 4, // 周
        sessionsPerWeek: 3,
        intensity: '低',
        focus: ['全身适应性', '基础动作学习']
      },
      fatLoss: {
        name: '燃脂瘦身计划',
        description: '高效燃脂，科学减重',
        duration: 8,
        sessionsPerWeek: 4,
        intensity: '中-高',
        focus: ['有氧运动', 'HIIT', '核心训练']
      },
      muscle: {
        name: '增肌塑形计划',
        description: '科学增肌，打造理想身材',
        duration: 12,
        sessionsPerWeek: 4,
        intensity: '中-高',
        focus: ['力量训练', '渐进超负荷', '营养配合']
      },
      maintain: {
        name: '健康维持计划',
        description: '保持状态，养成健康生活方式',
        duration: 4,
        sessionsPerWeek: 3,
        intensity: '中',
        focus: ['全身训练', '柔韧性', '心肺功能']
      }
    };
  }

  // 评估用户水平
  assessUserLevel(userData) {
    const { totalWorkouts, streak, lastWorkoutDate } = userData;
    
    if (totalWorkouts === 0) return 'beginner';
    if (totalWorkouts < 10) return 'beginner';
    if (totalWorkouts < 50) return 'intermediate';
    return 'advanced';
  }

  // 生成智能计划
  generatePlan(userProfile) {
    const {
      goal,           // 'fatLoss', 'muscle', 'maintain', 'beginner'
      level,          // 'beginner', 'intermediate', 'advanced'
      availableTime,  // 每次训练可用时间（分钟）
      daysPerWeek,    // 每周可训练天数
      restrictions,   // 身体限制（如膝盖问题）
      equipment       // 可用器械（'none', 'basic', 'full'）
    } = userProfile;

    const template = this.planTemplates[goal] || this.planTemplates.beginner;
    const plan = {
      id: 'plan_' + Date.now(),
      name: template.name,
      description: template.description,
      createdAt: new Date().toISOString(),
      duration: template.duration,
      currentWeek: 1,
      completedSessions: 0,
      totalSessions: template.duration * daysPerWeek,
      weeklySchedule: this.generateWeeklySchedule(goal, level, daysPerWeek, availableTime, equipment),
      nutrition: this.generateNutritionAdvice(goal),
      milestones: this.generateMilestones(template.duration)
    };

    return plan;
  }

  // 生成每周训练安排
  generateWeeklySchedule(goal, level, daysPerWeek, duration, equipment) {
    const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const schedule = [];
    
    // 根据目标选择训练类型
    const workoutTypes = this.getWorkoutTypes(goal, level);
    
    // 分配训练日
    const trainingDays = this.distributeTrainingDays(daysPerWeek);
    
    trainingDays.forEach((dayIndex, i) => {
      schedule.push({
        day: weekDays[dayIndex],
        dayIndex: dayIndex,
        type: workoutTypes[i % workoutTypes.length],
        duration: duration,
        completed: false,
        exercises: this.generateExercisesForDay(goal, level, equipment, duration)
      });
    });

    return schedule;
  }

  // 获取训练类型
  getWorkoutTypes(goal, level) {
    const types = {
      beginner: ['全身适应', '核心基础', '有氧入门'],
      fatLoss: ['HIIT燃脂', '有氧耐力', '全身循环', '核心强化'],
      muscle: ['胸部+三头', '背部+二头', '腿部+肩部', '核心+全身'],
      maintain: ['全身训练', '柔韧放松', '心肺提升']
    };
    return types[goal] || types.beginner;
  }

  // 分配训练日（均匀分布）
  distributeTrainingDays(daysPerWeek) {
    const patterns = {
      1: [2],           // 周三
      2: [1, 4],        // 周二、周五
      3: [0, 2, 4],     // 周一、周三、周五
      4: [0, 2, 4, 6],  // 周一、周三、周五、周日
      5: [0, 1, 3, 4, 6],
      6: [0, 1, 2, 3, 4, 5],
      7: [0, 1, 2, 3, 4, 5, 6]
    };
    return patterns[daysPerWeek] || patterns[3];
  }

  // 生成每日训练动作
  generateExercisesForDay(goal, level, equipment, duration) {
    const exercises = [];
    const warmUpDuration = 5;
    const mainDuration = duration - warmUpDuration - 5; // 减去热身和拉伸
    
    // 热身动作
    exercises.push({
      name: '动态热身',
      type: 'warmup',
      duration: warmUpDuration * 60,
      exercises: ['开合跳', '高抬腿', '肩部环绕']
    });

    // 主训练
    const mainExercises = this.selectExercises(goal, level, equipment);
    mainExercises.forEach(ex => {
      exercises.push({
        ...ex,
        sets: level === 'beginner' ? 2 : 3,
        rest: level === 'beginner' ? 60 : 45
      });
    });

    // 拉伸
    exercises.push({
      name: '拉伸放松',
      type: 'cooldown',
      duration: 5 * 60,
      exercises: ['全身拉伸', '深呼吸']
    });

    return exercises;
  }

  // 选择具体动作
  selectExercises(goal, level, equipment) {
    const exerciseDB = {
      beginner: {
        none: [
          { name: '跪姿俯卧撑', reps: '8-10次' },
          { name: '徒手深蹲', reps: '10-12次' },
          { name: '平板支撑', reps: '20-30秒' },
          { name: '臀桥', reps: '12-15次' }
        ],
        basic: [
          { name: '哑铃深蹲', reps: '10-12次' },
          { name: '俯卧撑', reps: '8-12次' },
          { name: '哑铃划船', reps: '10-12次' },
          { name: '卷腹', reps: '12-15次' }
        ]
      },
      fatLoss: {
        none: [
          { name: '波比跳', reps: '8-10次' },
          { name: '开合跳', reps: '30秒' },
          { name: '登山者', reps: '20次' },
          { name: '深蹲跳', reps: '10-12次' }
        ]
      },
      muscle: {
        basic: [
          { name: '哑铃卧推', reps: '8-12次' },
          { name: '哑铃划船', reps: '8-12次' },
          { name: '哑铃肩推', reps: '8-12次' },
          { name: '哑铃深蹲', reps: '10-12次' }
        ]
      }
    };

    return exerciseDB[goal]?.[equipment] || exerciseDB.beginner.none;
  }

  // 生成营养建议
  generateNutritionAdvice(goal) {
    const advice = {
      fatLoss: {
        calories: '每日摄入控制在基础代谢+200千卡',
        protein: '每公斤体重1.2-1.5g蛋白质',
        carbs: '减少精制碳水，增加粗粮',
        tips: ['多喝水', '少食多餐', '晚餐清淡']
      },
      muscle: {
        calories: '每日摄入基础代谢+300-500千卡',
        protein: '每公斤体重1.6-2g蛋白质',
        carbs: '训练前后补充碳水',
        tips: ['训练后30分钟内补充蛋白', '保证睡眠', '少食多餐']
      },
      maintain: {
        calories: '维持基础代谢水平',
        protein: '每公斤体重1-1.2g蛋白质',
        tips: ['均衡饮食', '规律作息', '多喝水']
      }
    };
    return advice[goal] || advice.maintain;
  }

  // 生成里程碑
  generateMilestones(duration) {
    const milestones = [];
    for (let i = 1; i <= duration; i++) {
      milestones.push({
        week: i,
        title: `第${i}周目标`,
        description: this.getMilestoneDescription(i, duration),
        completed: false
      });
    }
    return milestones;
  }

  getMilestoneDescription(week, total) {
    if (week === 1) return '适应期：完成所有训练，建立习惯';
    if (week === Math.floor(total / 2)) return '强化期：提升强度，突破瓶颈';
    if (week === total) return '冲刺期：完成计划，验收成果';
    return `持续训练，保持节奏（第${week}周）`;
  }
}

// 创建全局实例
const planGenerator = new SmartPlanGenerator();

// 导出函数
window.generateSmartPlan = function(userProfile) {
  return planGenerator.generatePlan(userProfile);
};

window.assessUserLevel = function(userData) {
  return planGenerator.assessUserLevel(userData);
};

console.log('[AMBROSE] Smart Plan Generator loaded');
