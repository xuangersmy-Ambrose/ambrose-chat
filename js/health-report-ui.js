/**
 * AMBROSE Health - 健康报告页面渲染
 * 完整的健康报告UI实现
 */

function renderHealthReportPage() {
  var container = document.getElementById('healthReportContainer');
  if (!container) return;
  
  // 获取用户数据
  var userData = JSON.parse(localStorage.getItem('ambroseData') || '{}');
  var currentUser = JSON.parse(localStorage.getItem('ambroseUser') || '{}');
  
  var html = '';
  
  // 标题
  html += '<div style="padding: 24px;">';
  html += '<div style="font-size: 32px; margin-bottom: 8px;">📊</div>';
  html += '<h1 style="font-size: 24px; margin-bottom: 4px;">健康数据中心</h1>';
  html += '<p style="color: var(--text-secondary);">全面了解您的运动表现和健康趋势</p>';
  html += '</div>';
  
  // 报告类型切换
  html += '<div style="padding: 0 24px 24px;">';
  html += '<div style="display: flex; gap: 8px; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px;">';
  html += '<button onclick="switchReportType(\'weekly\', this)" class="report-type-btn active" data-type="weekly" style="flex: 1; padding: 12px; background: var(--primary); border: none; border-radius: 8px; color: #000; font-size: 14px; font-weight: 600; cursor: pointer;">周报</button>';
  html += '<button onclick="switchReportType(\'monthly\', this)" class="report-type-btn" data-type="monthly" style="flex: 1; padding: 12px; background: transparent; border: none; border-radius: 8px; color: var(--text-secondary); font-size: 14px; cursor: pointer;">月报</button>';
  html += '<button onclick="switchReportType(\'profile\', this)" class="report-type-btn" data-type="profile" style="flex: 1; padding: 12px; background: transparent; border: none; border-radius: 8px; color: var(--text-secondary); font-size: 14px; cursor: pointer;">运动档案</button>';
  html += '</div>';
  html += '</div>';
  
  // 报告内容容器
  html += '<div id="reportContent" style="padding: 0 24px 100px;">';
  html += '<!-- 动态生成报告内容 -->';
  html += '</div>';
  
  container.innerHTML = html;
  
  // 默认显示周报
  renderWeeklyReport();
}

// 切换报告类型
function switchReportType(type, btn) {
  // 更新按钮状态
  document.querySelectorAll('.report-type-btn').forEach(function(b) {
    b.style.background = 'transparent';
    b.style.color = 'var(--text-secondary)';
    b.classList.remove('active');
  });
  btn.style.background = 'var(--primary)';
  btn.style.color = '#000';
  btn.classList.add('active');
  
  // 渲染对应报告
  if (type === 'weekly') {
    renderWeeklyReport();
  } else if (type === 'monthly') {
    renderMonthlyReport();
  } else if (type === 'profile') {
    renderSportProfile();
  }
}

// 渲染周报
function renderWeeklyReport() {
  var container = document.getElementById('reportContent');
  if (!container) return;
  
  // 模拟数据
  var weeklyData = {
    totalWorkouts: 4,
    totalDuration: 135,
    totalCalories: 1200,
    avgDuration: 34,
    completionRate: 80
  };
  
  var html = '';
  
  // 数据概览
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px;">';
  html += createStatCard('本周训练', weeklyData.totalWorkouts + '次', '💪', 'var(--primary)');
  html += createStatCard('运动时长', weeklyData.totalDuration + '分钟', '⏱️', '#FFD93D');
  html += createStatCard('消耗热量', weeklyData.totalCalories + '千卡', '🔥', '#FF6B6B');
  html += createStatCard('完成率', weeklyData.completionRate + '%', '📈', '#55E6C1');
  html += '</div>';
  
  // 周活动图表
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">📅 本周活动</div>';
  
  // 简化的条形图
  var days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var values = [30, 45, 0, 60, 0, 90, 45]; // 分钟数
  var maxVal = Math.max.apply(null, values);
  
  html += '<div style="display: flex; align-items: flex-end; justify-content: space-between; height: 150px; padding: 0 8px;">';
  days.forEach(function(day, i) {
    var val = values[i];
    var height = maxVal > 0 ? (val / maxVal * 100) : 0;
    var hasData = val > 0;
    
    html += '<div style="flex: 1; text-align: center;">';
    html += '<div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">' + (val > 0 ? val : '') + '</div>';
    html += '<div style="width: 24px; height: ' + height + 'px; background: ' + (hasData ? 'linear-gradient(to top, var(--primary), var(--secondary))' : 'rgba(255,255,255,0.05)') + '; border-radius: 4px; margin: 0 auto; transition: height 0.5s;"></div>';
    html += '<div style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;">' + day.substring(1) + '</div>';
    html += '</div>';
  });
  html += '</div>';
  html += '</div>';
  
  // 成就徽章
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">🏆 本周成就</div>';
  html += '<div style="display: flex; gap: 16px; flex-wrap: wrap;">';
  
  var badges = [
    { icon: '🔥', name: '燃烧者', desc: '消耗1000+千卡' },
    { icon: '⏱️', name: '坚持者', desc: '训练120+分钟' },
    { icon: '📅', name: '规律者', desc: '完成4次训练' }
  ];
  
  badges.forEach(function(badge) {
    html += '<div style="display: flex; align-items: center; gap: 12px; background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); border-radius: 12px; padding: 12px 16px;">';
    html += '<div style="font-size: 24px;">' + badge.icon + '</div>';
    html += '<div>';
    html += '<div style="font-weight: 600; font-size: 14px;">' + badge.name + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-secondary);">' + badge.desc + '</div>';
    html += '</div>';
    html += '</div>';
  });
  
  html += '</div>';
  html += '</div>';
  
  // 分析与建议
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">💡 分析与建议</div>';
  
  var suggestions = [
    '本周训练频率良好，保持了规律的运动习惯',
    '建议增加一次力量训练，提升肌肉量',
    '可以尝试提高训练强度，挑战更高目标'
  ];
  
  suggestions.forEach(function(suggestion, i) {
    html += '<div style="display: flex; gap: 12px; padding: 12px 0; ' + (i < suggestions.length - 1 ? 'border-bottom: 1px solid var(--border);' : '') + '">';
    html += '<div style="width: 24px; height: 24px; background: rgba(0,212,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--primary); flex-shrink: 0;">' + (i + 1) + '</div>';
    html += '<div style="font-size: 14px; line-height: 1.5;">' + suggestion + '</div>';
    html += '</div>';
  });
  
  html += '</div>';
  
  container.innerHTML = html;
}

// 渲染月报
function renderMonthlyReport() {
  var container = document.getElementById('reportContent');
  if (!container) return;
  
  var html = '';
  
  // 月度数据概览
  html += '<div style="background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(255,45,146,0.1)); border: 1px solid rgba(0,212,255,0.3); border-radius: 20px; padding: 24px; margin-bottom: 24px;">';
  html += '<div style="text-align: center; margin-bottom: 24px;">';
  html += '<div style="font-size: 16px; color: var(--text-secondary); margin-bottom: 8px;">3月总消耗</div>';
  html += '<div style="font-size: 48px; font-weight: 700; color: var(--primary);">5,680</div>';
  html += '<div style="font-size: 14px; color: var(--text-secondary);">千卡</div>';
  html += '</div>';
  
  html += '<div style="display: flex; justify-content: space-around;">';
  html += '<div style="text-align: center;"><div style="font-size: 24px; font-weight: 700;">18</div><div style="font-size: 12px; color: var(--text-secondary);">训练次数</div></div>';
  html += '<div style="text-align: center;"><div style="font-size: 24px; font-weight: 700;">12</div><div style="font-size: 12px; color: var(--text-secondary);">连续打卡</div></div>';
  html += '<div style="text-align: center;"><div style="font-size: 24px; font-weight: 700;">540</div><div style="font-size: 12px; color: var(--text-secondary);">训练分钟</div></div>';
  html += '</div>';
  html += '</div>';
  
  // 体重变化（如果有数据）
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">📉 体重变化</div>';
  html += '<div style="display: flex; align-items: center; justify-content: space-between;">';
  html += '<div style="text-align: center;"><div style="font-size: 12px; color: var(--text-secondary);">月初</div><div style="font-size: 20px; font-weight: 700;">70.5</div><div style="font-size: 12px; color: var(--text-secondary);">kg</div></div>';
  html += '<div style="flex: 1; padding: 0 24px;">';
  html += '<div style="display: flex; align-items: center; gap: 8px;">';
  html += '<div style="flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;"></div>';
  html += '<div style="color: #30D158; font-weight: 600;">↓2.3kg</div>';
  html += '</div>';
  html += '</div>';
  html += '<div style="text-align: center;"><div style="font-size: 12px; color: var(--text-secondary);">月末</div><div style="font-size: 20px; font-weight: 700; color: var(--primary);">68.2</div><div style="font-size: 12px; color: var(--text-secondary);">kg</div></div>';
  html += '</div>';
  html += '</div>';
  
  // 训练类型分布
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">🎯 训练类型分布</div>';
  
  var types = [
    { name: '力量训练', percent: 45, color: 'var(--primary)' },
    { name: '有氧运动', percent: 30, color: '#FF2D92' },
    { name: '瑜伽拉伸', percent: 15, color: '#55E6C1' },
    { name: 'HIIT', percent: 10, color: '#FFD93D' }
  ];
  
  types.forEach(function(type) {
    html += '<div style="margin-bottom: 12px;">';
    html += '<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">';
    html += '<span style="font-size: 14px;">' + type.name + '</span>';
    html += '<span style="font-size: 14px; color: var(--text-secondary);">' + type.percent + '%</span>';
    html += '</div>';
    html += '<div style="height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">';
    html += '<div style="height: 100%; width: ' + type.percent + '%; background: ' + type.color + '; border-radius: 4px;"></div>';
    html += '</div>';
    html += '</div>';
  });
  
  html += '</div>';
  
  container.innerHTML = html;
}

// 渲染运动档案
function renderSportProfile() {
  var container = document.getElementById('reportContent');
  if (!container) return;
  
  var html = '';
  
  // 综合评分
  html += '<div style="background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(255,45,146,0.1)); border: 1px solid rgba(0,212,255,0.3); border-radius: 20px; padding: 24px; margin-bottom: 24px; text-align: center;">';
  html += '<div style="font-size: 16px; color: var(--text-secondary); margin-bottom: 8px;">运动能力综合评分</div>';
  html += '<div style="font-size: 72px; font-weight: 800; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">78</div>';
  html += '<div style="font-size: 14px; color: var(--text-secondary);">超过了 65% 的用户</div>';
  html += '</div>';
  
  // 能力雷达图（简化显示）
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">📊 运动能力分析</div>';
  
  var abilities = [
    { name: '有氧耐力', score: 82, color: 'var(--primary)' },
    { name: '肌肉力量', score: 75, color: '#FF2D92' },
    { name: '柔韧性', score: 68, color: '#55E6C1' },
    { name: '核心稳定', score: 85, color: '#FFD93D' }
  ];
  
  abilities.forEach(function(ability) {
    html += '<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">';
    html += '<div style="width: 80px; font-size: 14px;">' + ability.name + '</div>';
    html += '<div style="flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden;">';
    html += '<div style="height: 100%; width: ' + ability.score + '%; background: ' + ability.color + '; border-radius: 4px;"></div>';
    html += '</div>';
    html += '<div style="width: 40px; text-align: right; font-weight: 600;">' + ability.score + '</div>';
    html += '</div>';
  });
  
  html += '</div>';
  
  // 训练偏好
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; margin-bottom: 24px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">❤️ 训练偏好</div>';
  
  html += '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">';
  html += '<div><div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">最爱训练类型</div><div style="font-weight: 600;">力量训练</div></div>';
  html += '<div><div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">训练时段</div><div style="font-weight: 600;">晚上 19:00-21:00</div></div>';
  html += '<div><div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">平均时长</div><div style="font-weight: 600;">35分钟</div></div>';
  html += '<div><div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">周频率</div><div style="font-weight: 600;">4次/周</div></div>';
  html += '</div>';
  
  html += '</div>';
  
  // 里程碑
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px;">';
  html += '<div style="font-weight: 600; margin-bottom: 16px;">🏆 里程碑</div>';
  
  var milestones = [
    { icon: '🏃', name: '初次训练', date: '2026-01-15' },
    { icon: '🔥', name: '消耗10,000千卡', date: '2026-02-01' },
    { icon: '⏱️', name: '训练1000分钟', date: '2026-02-20' },
    { icon: '📅', name: '连续打卡7天', date: '2026-03-01' }
  ];
  
  milestones.forEach(function(milestone) {
    html += '<div style="display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--border);">';
    html += '<div style="width: 48px; height: 48px; background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">' + milestone.icon + '</div>';
    html += '<div style="flex: 1;">';
    html += '<div style="font-weight: 600;">' + milestone.name + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-secondary);">' + milestone.date + '</div>';
    html += '</div>';
    html += '</div>';
  });
  
  html += '</div>';
  
  container.innerHTML = html;
}

// 创建统计卡片
function createStatCard(title, value, icon, color) {
  return `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">${icon}</div>
      <div style="font-size: 24px; font-weight: 700; color: ${color}; margin-bottom: 4px;">${value}</div>
      <div style="font-size: 12px; color: var(--text-secondary);">${title}</div>
    </div>
  `;
}

// 导出函数
window.renderHealthReportPage = renderHealthReportPage;
window.switchReportType = switchReportType;
window.renderWeeklyReport = renderWeeklyReport;
window.renderMonthlyReport = renderMonthlyReport;
window.renderSportProfile = renderSportProfile;

console.log('[AMBROSE] Health Report UI loaded');
