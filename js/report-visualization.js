/**
 * AMBROSE Health - 数据报告可视化页面
 * 学习Keep运动档案，提供丰富的图表展示
 */

// 渲染报告页面
function renderReportPage() {
  var container = document.getElementById('reportContainer');
  if (!container) return;
  
  // 获取用户数据
  var userData = JSON.parse(localStorage.getItem('ambroseData') || '{}');
  
  var html = '';
  
  // 页面标题
  html += '<div style="padding: 24px;">';
  html += '<div style="font-size: 32px; margin-bottom: 8px;">📊</div>';
  html += '<h1 style="font-size: 24px; margin-bottom: 4px;">运动数据报告</h1>';
  html += '<p style="color: var(--text-secondary); font-size: 14px;">全方位了解您的健身进展</p>';
  html += '</div>';
  
  // 时间切换标签
  html += '<div style="padding: 0 24px 16px; display: flex; gap: 8px;">';
  html += '<button class="report-tab active" onclick="switchReportPeriod(\'week\', this)" data-period="week" style="flex: 1; padding: 12px; background: var(--primary); color: #000; border: none; border-radius: 12px; font-weight: 600; cursor: pointer;">本周</button>';
  html += '<button class="report-tab" onclick="switchReportPeriod(\'month\', this)" data-period="month" style="flex: 1; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; color: #fff; cursor: pointer;">本月</button>';
  html += '<button class="report-tab" onclick="switchReportPeriod(\'year\', this)" data-period="year" style="flex: 1; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; color: #fff; cursor: pointer;">全年</button>';
  html += '</div>';
  
  // 概览卡片
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">';
  
  var stats = [
    { icon: '🔥', label: '消耗热量', value: (userData.totalCalories || 0) + '千卡', color: 'var(--secondary)' },
    { icon: '⏱️', label: '运动时长', value: Math.floor((userData.totalDuration || 0) / 60) + '小时', color: 'var(--primary)' },
    { icon: '💪', label: '完成训练', value: (userData.totalWorkouts || 0) + '次', color: '#55E6C1' },
    { icon: '📅', label: '坚持天数', value: (userData.currentStreak || 0) + '天', color: '#FFD93D' }
  ];
  
  stats.forEach(function(stat) {
    html += `
      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 16px;">
        <div style="font-size: 24px; margin-bottom: 8px;">${stat.icon}</div>
        <div style="font-size: 20px; font-weight: 700; color: ${stat.color}; margin-bottom: 4px;">${stat.value}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${stat.label}</div>
      </div>
    `;
  });
  
  html += '</div>';
  html += '</div>';
  
  // 周活跃度图表
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">📈 本周活跃度</div>';
  html += renderWeeklyActivityChart();
  html += '</div>';
  html += '</div>';
  
  // 热量趋势
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">🔥 热量消耗趋势</div>';
  html += renderCaloriesTrendChart();
  html += '</div>';
  html += '</div>';
  
  // 训练类型分布
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">🎯 训练类型分布</div>';
  html += renderWorkoutTypeChart();
  html += '</div>';
  html += '</div>';
  
  // 运动能力雷达图
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">🎯 运动能力评估</div>';
  html += renderAbilityRadarChart();
  html += '</div>';
  html += '</div>';
  
  // 体重变化曲线
  if (currentUser && currentUser.weightHistory && currentUser.weightHistory.length > 0) {
    html += '<div style="padding: 0 24px 24px;">';
    html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
    html += '<div style="font-weight: 600; margin-bottom: 16px;">⚖️ 体重变化</div>';
    html += renderWeightChart();
    html += '</div>';
    html += '</div>';
  }
  
  // 成就徽章
  html += '<div style="padding: 0 24px 100px;">';
  html += '<div style="background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,140,0,0.1)); border: 1px solid rgba(255,215,0,0.3); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">🏆 近期成就</div>';
  html += renderRecentAchievements();
  html += '</div>';
  html += '</div>';
  
  container.innerHTML = html;
}

// 渲染周活跃度柱状图
function renderWeeklyActivityChart() {
  var days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var data = [45, 60, 30, 75, 50, 90, 20]; // 模拟数据，单位：分钟
  var maxVal = Math.max.apply(Math, data);
  
  var html = '<div style="display: flex; align-items: flex-end; justify-content: space-between; height: 150px; padding: 0 8px;">';
  
  days.forEach(function(day, i) {
    var height = (data[i] / maxVal * 100).toFixed(0);
    var isToday = i === (new Date().getDay() + 6) % 7;
    
    html += `
      <div style="flex: 1; text-align: center;">
        <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">${data[i]}分</div>
        <div style="width: 24px; height: ${height}px; background: ${isToday ? 'linear-gradient(180deg, var(--primary), var(--secondary))' : 'var(--border)'}; margin: 0 auto; border-radius: 4px 4px 0 0; transition: height 0.5s;"></div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">${day.substring(1)}</div>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

// 渲染热量趋势折线图
function renderCaloriesTrendChart() {
  var days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var data = [320, 450, 280, 520, 380, 600, 200]; // 模拟数据
  var maxVal = Math.max.apply(Math, data);
  
  // 创建SVG折线图
  var svgWidth = 100;
  var svgHeight = 50;
  var points = data.map(function(val, i) {
    var x = (i / (data.length - 1)) * svgWidth;
    var y = svgHeight - (val / maxVal) * svgHeight;
    return x + ',' + y;
  }).join(' ');
  
  var html = '<div style="position: relative; height: 120px;">';
  html += '<svg viewBox="0 0 100 50" style="width: 100%; height: 100%; overflow: visible;">';
  html += '<defs>';
  html += '<linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">';
  html += '<stop offset="0%" style="stop-color:var(--primary)" />';
  html += '<stop offset="100%" style="stop-color:var(--secondary)" />';
  html += '</linearGradient>';
  html += '</defs>';
  html += '<polyline fill="none" stroke="url(#lineGradient)" stroke-width="2" points="' + points + '" />';
  html += '</svg>';
  html += '</div>';
  
  html += '<div style="display: flex; justify-content: space-between; padding: 8px 0 0;">';
  days.forEach(function(day) {
    html += '<span style="font-size: 11px; color: var(--text-secondary);">' + day.substring(1) + '</span>';
  });
  html += '</div>';
  
  return html;
}

// 渲染训练类型饼图
function renderWorkoutTypeChart() {
  var types = [
    { name: '力量训练', value: 40, color: '#00D4FF' },
    { name: '有氧运动', value: 30, color: '#FF2D92' },
    { name: '瑜伽拉伸', value: 20, color: '#55E6C1' },
    { name: '其他', value: 10, color: '#FFD93D' }
  ];
  
  var html = '<div style="display: flex; align-items: center; gap: 20px;">';
  
  // 简单的圆环图（用SVG）
  html += '<div style="width: 100px; height: 100px; position: relative;">';
  html += '<svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">';
  
  var currentOffset = 0;
  types.forEach(function(type) {
    var dashArray = type.value + ' ' + (100 - type.value);
    html += '<circle cx="18" cy="18" r="15.9" fill="none" stroke="' + type.color + '" stroke-width="4" ';
    html += 'stroke-dasharray="' + dashArray + '" stroke-dashoffset="' + (-currentOffset) + '" />';
    currentOffset += type.value;
  });
  
  html += '</svg>';
  html += '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">';
  html += '<div style="font-size: 12px; color: var(--text-secondary);">训练</div>';
  html += '</div>';
  html += '</div>';
  
  // 图例
  html += '<div style="flex: 1;">';
  types.forEach(function(type) {
    html += `
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <div style="width: 12px; height: 12px; background: ${type.color}; border-radius: 3px;"></div>
        <span style="font-size: 14px;">${type.name}</span>
        <span style="margin-left: auto; font-weight: 600;">${type.value}%</span>
      </div>
    `;
  });
  html += '</div>';
  
  html += '</div>';
  return html;
}

// 渲染能力雷达图
function renderAbilityRadarChart() {
  var abilities = [
    { name: '有氧', value: 75 },
    { name: '力量', value: 60 },
    { name: '柔韧', value: 50 },
    { name: '耐力', value: 70 },
    { name: '爆发', value: 45 }
  ];
  
  var html = '<div style="text-align: center;">';
  html += '<div style="display: inline-block; position: relative; width: 200px; height: 200px;">';
  
  // 简单的六边形能力图
  html += '<svg viewBox="0 0 200 200" style="width: 100%; height: 100%;">';
  
  // 背景网格
  for (var i = 1; i <= 4; i++) {
    var r = i * 25;
    html += '<polygon fill="none" stroke="var(--border)" stroke-width="1" ';
    html += 'points="100,' + (100 - r) + ' ' + (100 + r * 0.866) + ',' + (100 - r * 0.5) + ' ' + (100 + r * 0.866) + ',' + (100 + r * 0.5) + ' ' + (100) + ',' + (100 + r) + ' ' + (100 - r * 0.866) + ',' + (100 + r * 0.5) + ' ' + (100 - r * 0.866) + ',' + (100 - r * 0.5) + '" />';
  }
  
  // 能力多边形
  var points = '';
  abilities.forEach(function(ab, i) {
    var angle = (i * 2 * Math.PI / abilities.length) - Math.PI / 2;
    var r = ab.value * 0.8;
    var x = 100 + r * Math.cos(angle);
    var y = 100 + r * Math.sin(angle);
    points += x + ',' + y + ' ';
  });
  
  html += '<polygon fill="rgba(0,212,255,0.3)" stroke="var(--primary)" stroke-width="2" points="' + points + '" />';
  html += '</svg>';
  
  // 能力标签
  var labelPositions = [
    { top: '5px', left: '50%', transform: 'translateX(-50%)' },
    { top: '30%', right: '0' },
    { bottom: '10%', right: '10%' },
    { bottom: '10%', left: '10%' },
    { top: '30%', left: '0' }
  ];
  
  abilities.forEach(function(ab, i) {
    var pos = labelPositions[i];
    html += '<div style="position: absolute; font-size: 12px; font-weight: 600; ';
    if (pos.top) html += 'top: ' + pos.top + '; ';
    if (pos.bottom) html += 'bottom: ' + pos.bottom + '; ';
    if (pos.left) html += 'left: ' + pos.left + '; ';
    if (pos.right) html += 'right: ' + pos.right + '; ';
    if (pos.transform) html += 'transform: ' + pos.transform + '; ';
    html += '">' + ab.name + '</div>';
  });
  
  html += '</div>';
  html += '</div>';
  
  return html;
}

// 渲染体重图表
function renderWeightChart() {
  var html = '<div style="text-align: center; padding: 20px;">';
  html += '<div style="font-size: 48px; color: var(--primary); font-weight: 700;">' + (currentUser.weight || '--') + '</div>';
  html += '<div style="color: var(--text-secondary);">当前体重 (kg)</div>';
  html += '</div>';
  return html;
}

// 渲染近期成就
function renderRecentAchievements() {
  var recentBadges = [
    { icon: '🏃', name: '初次训练', date: '3天前' },
    { icon: '💧', name: '水分达人', date: '1周前' },
    { icon: '🌅', name: '早起鸟', date: '2周前' }
  ];
  
  var html = '<div style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px;">';
  
  recentBadges.forEach(function(badge) {
    html += `
      <div style="flex-shrink: 0; text-align: center;">
        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,140,0,0.2)); border: 2px solid rgba(255,215,0,0.5); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 8px;">${badge.icon}</div>
        <div style="font-size: 12px; font-weight: 600;">${badge.name}</div>
        <div style="font-size: 11px; color: var(--text-secondary);">${badge.date}</div>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

// 切换报告周期
function switchReportPeriod(period, btn) {
  // 更新按钮样式
  document.querySelectorAll('.report-tab').forEach(function(tab) {
    tab.classList.remove('active');
    tab.style.background = 'rgba(255,255,255,0.05)';
    tab.style.borderColor = 'var(--border)';
    tab.style.color = '#fff';
  });
  
  btn.classList.add('active');
  btn.style.background = 'var(--primary)';
  btn.style.borderColor = 'var(--primary)';
  btn.style.color = '#000';
  
  // 这里可以根据不同周期加载不同数据
  showToast('已切换到' + (period === 'week' ? '本周' : period === 'month' ? '本月' : '全年') + '数据');
}

// 导出函数
window.renderReportPage = renderReportPage;
window.switchReportPeriod = switchReportPeriod;

console.log('[AMBROSE] Report Visualization loaded');
