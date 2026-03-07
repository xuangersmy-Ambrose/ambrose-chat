/**
 * AMBROSE Health - Bug修复补丁
 * 修复饮食、打卡、搜索等功能
 */

// ========== 1. 修复食物搜索功能 ==========
function initFoodSearch() {
  // 检查DOM元素是否存在
  var searchInput = document.getElementById('foodSearchInput');
  var foodList = document.getElementById('foodList');
  
  if (!searchInput || !foodList) {
    console.log('[BugFix] Food search elements not found on this page');
    return;
  }
  
  // 绑定搜索事件
  searchInput.addEventListener('input', function(e) {
    var keyword = e.target.value.trim();
    searchFoods(keyword);
  });
  
  console.log('[BugFix] Food search initialized');
}

// 统一的食物搜索函数
function searchFoods(keyword) {
  var foodList = document.getElementById('foodList');
  if (!foodList) return;
  
  var allFoods = [];
  
  // 从FOOD_DATABASE收集所有食物
  if (typeof FOOD_DATABASE !== 'undefined') {
    Object.keys(FOOD_DATABASE).forEach(function(category) {
      FOOD_DATABASE[category].forEach(function(food) {
        allFoods.push(Object.assign({}, food, { category: category }));
      });
    });
  }
  
  var filtered = allFoods;
  
  if (keyword) {
    var lowerKeyword = keyword.toLowerCase();
    filtered = allFoods.filter(function(food) {
      return food.name.toLowerCase().includes(lowerKeyword) ||
             (food.tags && food.tags.some(function(tag) { return tag.toLowerCase().includes(lowerKeyword); }));
    });
  }
  
  renderFoodResults(filtered, foodList);
}

// 渲染食物搜索结果
function renderFoodResults(foods, container) {
  if (foods.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--text-secondary);">未找到相关食物</div>';
    return;
  }
  
  container.innerHTML = foods.map(function(food) {
    return `
      <div class="food-item" onclick="showFoodDetailModal('${food.id}')" style="display: flex; align-items: center; gap: 16px; background: var(--bg-card); padding: 16px; border-radius: 16px; margin-bottom: 12px; cursor: pointer; transition: all 0.3s;">
        <div style="font-size: 40px;">${food.emoji || '🍽️'}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px;">${food.name}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">${food.unit} · 蛋白质${food.protein}g</div>
        </div>
        <div style="text-align: right;">
          <div style="color: var(--primary); font-weight: 700; font-size: 18px;">${food.calories}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">千卡</div>
        </div>
      </div>
    `;
  }).join('');
}

// 显示食物详情弹窗
function showFoodDetailModal(foodId) {
  var allFoods = [];
  if (typeof FOOD_DATABASE !== 'undefined') {
    Object.keys(FOOD_DATABASE).forEach(function(category) {
      FOOD_DATABASE[category].forEach(function(food) {
        if (food.id === foodId) {
          allFoods.push(Object.assign({}, food, { category: category }));
        }
      });
    });
  }
  
  var food = allFoods[0];
  if (!food) return;
  
  var modal = document.getElementById('foodDetailModal');
  if (!modal) return;
  
  // 更新弹窗内容
  document.getElementById('foodDetailName').textContent = food.name;
  document.getElementById('foodDetailCalories').textContent = food.calories + ' 千卡/' + food.unit;
  document.getElementById('foodDetailProtein').textContent = food.protein + 'g';
  document.getElementById('foodDetailFat').textContent = food.fat + 'g';
  document.getElementById('foodDetailCarbs').textContent = food.carbs + 'g';
  document.getElementById('foodDetailFiber').textContent = (food.fiber || 0) + 'g';
  
  var emojiEl = document.querySelector('.food-detail-header .food-emoji');
  if (emojiEl) emojiEl.textContent = food.emoji || '🍽️';
  
  var tagsContainer = document.getElementById('foodDetailTags');
  if (tagsContainer) {
    var tags = food.tags || [];
    if (food.gi) tags.push('GI:' + food.gi);
    tagsContainer.innerHTML = tags.map(function(tag) {
      return `<span style="background: rgba(0,212,255,0.1); color: var(--primary); padding: 4px 12px; border-radius: 12px; font-size: 12px;">${tag}</span>`;
    }).join('');
  }
  
  modal.style.display = 'flex';
}

// ========== 2. 修复打卡功能 ==========
function initSigninSystem() {
  console.log('[BugFix] Initializing signin system');
  
  // 确保所有必要的函数都已定义
  if (typeof showSigninModal !== 'function') {
    window.showSigninModal = function() {
      var modal = document.getElementById('signinModal');
      if (modal) {
        modal.style.display = 'flex';
        renderSigninGridFixed();
      }
    };
  }
  
  if (typeof closeSignin !== 'function') {
    window.closeSignin = function() {
      var modal = document.getElementById('signinModal');
      if (modal) modal.style.display = 'none';
    };
  }
  
  if (typeof doSignin !== 'function') {
    window.doSignin = function() {
      var today = getTodayString();
      var lastSignin = localStorage.getItem('ambrose_last_signin');
      
      if (lastSignin === today) {
        showToast('今日已签到，明天再来吧！');
        updateSigninButtonState();
        return;
      }
      
      localStorage.setItem('ambrose_last_signin', today);
      
      var streak = parseInt(localStorage.getItem('ambrose_streak') || '0');
      localStorage.setItem('ambrose_streak', String(streak + 1));
      
      var rewards = [20, 30, 40, 50, 60, 80, 100];
      var points = rewards[streak] || 50;
      
      if (typeof addPoints === 'function') {
        addPoints(points);
      }
      
      showToast('🎉 签到成功！+' + points + '积分');
      
      renderSigninGridFixed();
      updateSigninButtonState();
      
      setTimeout(function() {
        closeSignin();
      }, 1500);
    };
  }
}

// 修复后的渲染打卡网格
function renderSigninGridFixed() {
  var grid = document.getElementById('signinGrid');
  if (!grid) return;
  
  var rewards = [20, 30, 40, 50, 60, 80, 100];
  var days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  
  // 获取今天是一周的第几天 (0=周日, 1=周一...)
  var today = new Date();
  var dayOfWeek = today.getDay(); // 0-6
  var adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 转换为0=周一, 6=周日
  
  var streak = parseInt(localStorage.getItem('ambrose_streak') || '0');
  var lastSignin = localStorage.getItem('ambrose_last_signin');
  var todayStr = getTodayString();
  var signedToday = lastSignin === todayStr;
  
  var html = '';
  for (var i = 0; i < 7; i++) {
    var isToday = i === adjustedDay;
    var isCompleted = i < adjustedDay || (i === adjustedDay && signedToday);
    
    var cls = '';
    if (isCompleted) cls = 'completed';
    else if (isToday) cls = 'active';
    
    var icon = isCompleted ? '✅' : (isToday && signedToday ? '✅' : '🎁');
    
    html += `
      <div class="signin-day ${cls}" style="${isToday ? 'border: 2px solid var(--primary);' : ''}">
        <div class="day-label">${days[i]}</div>
        <div class="day-icon">${icon}</div>
        <div class="day-points">+${rewards[i]}</div>
      </div>
    `;
  }
  
  grid.innerHTML = html;
  
  // 更新连续打卡显示
  var streakEl = document.getElementById('streakCount');
  if (streakEl) streakEl.textContent = streak;
}

// 更新签到按钮状态
function updateSigninButtonState() {
  var rewardDiv = document.getElementById('todayReward');
  if (!rewardDiv) return;
  
  var today = getTodayString();
  var lastSignin = localStorage.getItem('ambrose_last_signin');
  var signedToday = lastSignin === today;
  var streak = parseInt(localStorage.getItem('ambrose_streak') || '0');
  var rewards = [20, 30, 40, 50, 60, 80, 100];
  var todayReward = rewards[streak] || 50;
  
  if (signedToday) {
    rewardDiv.innerHTML = `
      <div class="signin-reward-icon">✅</div>
      <div class="signin-reward-text">今日已签到</div>
      <div style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">连续打卡 ${streak} 天，明天见！</div>
      <button class="btn-secondary" disabled style="margin-top: 16px; opacity: 0.5; cursor: not-allowed;">已签到</button>
    `;
  } else {
    rewardDiv.innerHTML = `
      <div class="signin-reward-icon">🎁</div>
      <div class="signin-reward-text">今日奖励: +${todayReward} 积分</div>
      <div style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">连续签到可获得更多奖励</div>
      <button class="btn-primary" onclick="doSignin()" style="margin-top: 16px;">立即签到</button>
    `;
  }
}

// 获取今天的日期字符串
function getTodayString() {
  var now = new Date();
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, '0');
  var day = String(now.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

// ========== 3. 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('[BugFix] DOM Content Loaded - Initializing fixes');
  
  // 初始化食物搜索
  initFoodSearch();
  
  // 初始化打卡系统
  initSigninSystem();
  
  console.log('[BugFix] All fixes initialized');
});

console.log('[AMBROSE] Bug Fix Module loaded');
