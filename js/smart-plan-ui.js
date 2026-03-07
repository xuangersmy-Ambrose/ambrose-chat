/**
 * AMBROSE Health - 智能计划页面渲染
 * 完整的智能计划UI实现
 */

function renderSmartPlanPage() {
  var container = document.getElementById('smartPlanContainer');
  if (!container) return;
  
  // 检查用户是否已有计划
  var currentPlan = JSON.parse(localStorage.getItem('ambrose_current_plan') || 'null');
  
  if (currentPlan) {
    renderActivePlan(container, currentPlan);
  } else {
    renderPlanGenerator(container);
  }
}

// 渲染计划生成器
function renderPlanGenerator(container) {
  var html = '';
  
  // 标题
  html += '<div style="padding: 24px; text-align: center;">';
  html += '<div style="font-size: 48px; margin-bottom: 16px;">🎯</div>';
  html += '<h1 style="font-size: 24px; margin-bottom: 8px;">制定您的专属训练计划</h1>';
  html += '<p style="color: var(--text-secondary);">回答几个问题，AI为您生成个性化方案</p>';
  html += '</div>';
  
  // 步骤1: 选择目标
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">1. 您的健身目标是什么？</div>';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">';
  
  var goals = [
    { id: 'fatLoss', icon: '🔥', title: '减脂瘦身', desc: '燃烧脂肪，科学减重' },
    { id: 'muscle', icon: '💪', title: '增肌塑形', desc: '增加肌肉，打造身材' },
    { id: 'maintain', icon: '⚖️', title: '健康维持', desc: '保持状态，养成习惯' },
    { id: 'beginner', icon: '🌱', title: '新手入门', desc: '零基础，循序渐进' }
  ];
  
  goals.forEach(function(goal) {
    html += `
      <div class="goal-card" onclick="selectPlanGoal('${goal.id}', this)" data-goal="${goal.id}"
           style="background: var(--bg-card); border: 2px solid var(--border); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;">
        <div style="font-size: 32px; margin-bottom: 8px;">${goal.icon}</div>
        <div style="font-weight: 600; margin-bottom: 4px;">${goal.title}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${goal.desc}</div>
      </div>
    `;
  });
  
  html += '</div>';
  html += '</div>';
  
  // 步骤2: 训练频率
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">2. 每周可以训练几天？</div>';
  html += '<div style="display: flex; gap: 8px; flex-wrap: wrap;">';
  
  [2, 3, 4, 5, 6, 7].forEach(function(days) {
    html += `
      <button class="day-btn" onclick="selectPlanDays(${days}, this)" data-days="${days}"
              style="flex: 1; min-width: 60px; padding: 16px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; color: #fff; font-size: 16px; cursor: pointer;">
        ${days}天
      </button>
    `;
  });
  
  html += '</div>';
  html += '</div>';
  
  // 步骤3: 每次时长
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">3. 每次训练多长时间？</div>';
  html += '<div style="display: flex; gap: 8px; flex-wrap: wrap;">';
  
  var durations = [
    { value: 15, label: '15分钟' },
    { value: 30, label: '30分钟' },
    { value: 45, label: '45分钟' },
    { value: 60, label: '60分钟' }
  ];
  
  durations.forEach(function(dur) {
    html += `
      <button class="duration-btn" onclick="selectPlanDuration(${dur.value}, this)" data-duration="${dur.value}"
              style="flex: 1; min-width: 80px; padding: 16px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; color: #fff; font-size: 16px; cursor: pointer;">
        ${dur.label}
      </button>
    `;
  });
  
  html += '</div>';
  html += '</div>';
  
  // 生成按钮
  html += '<div style="padding: 0 24px 100px;">';
  html += '<button onclick="generatePlan()" class="btn-primary" style="width: 100%; padding: 18px; font-size: 17px;">';
  html += '🚀 AI生成专属计划';
  html += '</button>';
  html += '</div>';
  
  container.innerHTML = html;
}

// 渲染进行中的计划
function renderActivePlan(container, plan) {
  var html = '';
  
  // 计划标题
  html += '<div style="padding: 24px;">';
  html += '<div style="background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(255,45,146,0.1)); border: 1px solid rgba(0,212,255,0.3); border-radius: 20px; padding: 24px;">';
  html += '<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">';
  html += '<div style="font-size: 48px;">📋</div>';
  html += '<div>';
  html += '<div style="font-size: 20px; font-weight: 700;">' + plan.name + '</div>';
  html += '<div style="color: var(--text-secondary); font-size: 14px;">第 ' + plan.currentWeek + '/' + plan.duration + ' 周</div>';
  html += '</div>';
  html += '</div>';
  
  // 进度条
  var progress = (plan.completedSessions / plan.totalSessions * 100).toFixed(0);
  html += '<div style="margin-bottom: 8px;">';
  html += '<div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px;">';
  html += '<span>完成进度</span>';
  html += '<span style="color: var(--primary);">' + progress + '%</span>';
  html += '</div>';
  html += '<div style="height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">';
  html += '<div style="height: 100%; width: ' + progress + '%; background: linear-gradient(90deg, var(--primary), var(--secondary)); border-radius: 4px; transition: width 0.5s;"></div>';
  html += '</div>';
  html += '</div>';
  
  html += '<div style="display: flex; gap: 16px; text-align: center;">';
  html += '<div style="flex: 1;"><div style="font-size: 24px; font-weight: 700; color: var(--primary);">' + plan.completedSessions + '</div><div style="font-size: 12px; color: var(--text-secondary);">已完成</div></div>';
  html += '<div style="flex: 1;"><div style="font-size: 24px; font-weight: 700; color: var(--secondary);">' + (plan.totalSessions - plan.completedSessions) + '</div><div style="font-size: 12px; color: var(--text-secondary);">剩余</div></div>';
  html += '<div style="flex: 1;"><div style="font-size: 24px; font-weight: 700;">🔥</div><div style="font-size: 12px; color: var(--text-secondary);">连续' + (JSON.parse(localStorage.getItem('ambrose_streak') || '0')) + '天</div></div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  
  // 今日训练
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">📅 今日训练</div>';
  
  // 找到今天的训练
  var today = new Date();
  var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  var todayName = dayNames[today.getDay()];
  
  var todayWorkout = null;
  if (plan.weeklySchedule) {
    todayWorkout = plan.weeklySchedule.find(function(s) { return s.day === todayName; });
  }
  
  if (todayWorkout) {
    html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
    html += '<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">';
    html += '<div style="width: 56px; height: 56px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 28px;">💪</div>';
    html += '<div style="flex: 1;">';
    html += '<div style="font-weight: 600; font-size: 16px;">' + todayWorkout.type + '</div>';
    html += '<div style="color: var(--text-secondary); font-size: 14px;">' + todayWorkout.duration + '分钟 · ' + todayWorkout.exercises.length + '个动作</div>';
    html += '</div>';
    html += '</div>';
    
    // 动作列表
    html += '<div style="margin-bottom: 16px;">';
    todayWorkout.exercises.slice(0, 3).forEach(function(ex, i) {
      html += '<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; ' + (i < 2 ? 'border-bottom: 1px solid var(--border);' : '') + '">';
      html += '<div style="width: 32px; height: 32px; background: rgba(0,212,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--primary);">' + (i + 1) + '</div>';
      html += '<div style="flex: 1;">' + ex.name + '</div>';
      html += '<div style="color: var(--text-secondary); font-size: 14px;">' + (ex.sets ? ex.sets + '组x' + ex.reps : ex.duration) + '</div>';
      html += '</div>';
    });
    if (todayWorkout.exercises.length > 3) {
      html += '<div style="text-align: center; padding: 12px; color: var(--text-secondary); font-size: 14px;">还有 ' + (todayWorkout.exercises.length - 3) + ' 个动作...</div>';
    }
    html += '</div>';
    
    html += '<button onclick="startTodayWorkout()" class="btn-primary" style="width: 100%;">开始训练</button>';
    html += '</div>';
  } else {
    html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 32px; text-align: center;">';
    html += '<div style="font-size: 48px; margin-bottom: 12px;">😌</div>';
    html += '<div style="font-weight: 600; margin-bottom: 4px;">今日休息日</div>';
    html += '<div style="color: var(--text-secondary); font-size: 14px;">好好休息，明天继续加油！</div>';
    html += '</div>';
  }
  
  html += '</div>';
  
  // 本周计划
  html += '<div style="padding: 0 24px 100px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">📆 本周计划</div>';
  
  if (plan.weeklySchedule) {
    html += '<div style="display: grid; gap: 12px;">';
    plan.weeklySchedule.forEach(function(day) {
      var isCompleted = day.completed;
      var isToday = day.day === todayName;
      
      html += '<div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--bg-card); border: 1px solid ' + (isToday ? 'var(--primary)' : 'var(--border)') + '; border-radius: 12px; ' + (isToday ? 'border-width: 2px;' : '') + '">';
      html += '<div style="width: 48px; text-align: center;">';
      html += '<div style="font-size: 12px; color: var(--text-secondary);">' + day.day.substring(0, 2) + '</div>';
      html += '<div style="font-size: 20px;">' + (isCompleted ? '✅' : isToday ? '🔥' : '⭕') + '</div>';
      html += '</div>';
      html += '<div style="flex: 1;">';
      html += '<div style="font-weight: 600;">' + day.type + '</div>';
      html += '<div style="font-size: 13px; color: var(--text-secondary);">' + day.duration + '分钟</div>';
      html += '</div>';
      html += '<div style="color: var(--text-secondary);">' + (isCompleted ? '已完成' : isToday ? '待完成' : '') + '</div>';
      html += '</div>';
    });
    html += '</div>';
  }
  
  // 重置计划按钮
  html += '<button onclick="resetPlan()" class="btn-secondary" style="width: 100%; margin-top: 24px;">重新制定计划</button>';
  
  html += '</div>';
  
  container.innerHTML = html;
}

// 选择计划目标
var selectedPlanGoal = null;
function selectPlanGoal(goal, el) {
  selectedPlanGoal = goal;
  
  // 移除其他选中状态
  document.querySelectorAll('.goal-card').forEach(function(card) {
    card.style.borderColor = 'var(--border)';
    card.style.background = 'var(--bg-card)';
  });
  
  // 添加选中状态
  el.style.borderColor = 'var(--primary)';
  el.style.background = 'rgba(0,212,255,0.1)';
}

// 选择训练天数
var selectedPlanDays = null;
function selectPlanDays(days, el) {
  selectedPlanDays = days;
  
  document.querySelectorAll('.day-btn').forEach(function(btn) {
    btn.style.background = 'rgba(255,255,255,0.05)';
    btn.style.borderColor = 'var(--border)';
  });
  
  el.style.background = 'var(--primary)';
  el.style.borderColor = 'var(--primary)';
  el.style.color = '#000';
}

// 选择训练时长
var selectedPlanDuration = null;
function selectPlanDuration(duration, el) {
  selectedPlanDuration = duration;
  
  document.querySelectorAll('.duration-btn').forEach(function(btn) {
    btn.style.background = 'rgba(255,255,255,0.05)';
    btn.style.borderColor = 'var(--border)';
    btn.style.color = '#fff';
  });
  
  el.style.background = 'var(--primary)';
  el.style.borderColor = 'var(--primary)';
  el.style.color = '#000';
}

// 生成计划
function generatePlan() {
  if (!selectedPlanGoal) {
    showToast('请选择健身目标');
    return;
  }
  if (!selectedPlanDays) {
    showToast('请选择每周训练天数');
    return;
  }
  if (!selectedPlanDuration) {
    showToast('请选择每次训练时长');
    return;
  }
  
  // 使用SmartPlanGenerator生成计划
  if (typeof planGenerator !== 'undefined') {
    var plan = planGenerator.generatePlan({
      goal: selectedPlanGoal,
      level: 'beginner',
      availableTime: selectedPlanDuration,
      daysPerWeek: selectedPlanDays,
      restrictions: [],
      equipment: 'none'
    });
    
    // 保存计划
    localStorage.setItem('ambrose_current_plan', JSON.stringify(plan));
    
    showToast('🎉 计划生成成功！');
    
    // 刷新页面显示计划
    renderSmartPlanPage();
  } else {
    showToast('计划生成器加载中，请稍后再试');
  }
}

// 开始今日训练
function startTodayWorkout() {
  showToast('开始训练！');
  // 这里可以跳转到训练页面或计时器
}

// 重置计划
function resetPlan() {
  if (confirm('确定要重新开始制定计划吗？当前进度将丢失。')) {
    localStorage.removeItem('ambrose_current_plan');
    renderSmartPlanPage();
  }
}

// 导出函数
window.renderSmartPlanPage = renderSmartPlanPage;
window.selectPlanGoal = selectPlanGoal;
window.selectPlanDays = selectPlanDays;
window.selectPlanDuration = selectPlanDuration;
window.generatePlan = generatePlan;
window.startTodayWorkout = startTodayWorkout;
window.resetPlan = resetPlan;

console.log('[AMBROSE] Smart Plan UI loaded');
