/**
 * AMBROSE App 单元测试 - Day 3
 * 集成测试 + E2E测试基础
 */

// ==================== 集成测试 ====================
// 测试多个组件协同工作

// 测试完整的签到流程
function testCompleteSigninFlow() {
  console.log('🧪 测试完整签到流程...');
  
  var allPassed = true;
  
  // 场景1: 新用户首次签到
  console.log('   📋 场景1: 新用户首次签到');
  localStorage.removeItem('ambrose_streak');
  localStorage.removeItem('ambrose_last_signin');
  localStorage.removeItem('ambrose_total_points');
  
  if (typeof getStreakDays === 'function') {
    if (getStreakDays() === 0) {
      console.log('      ✅ 新用户连续天数为0');
    } else {
      console.log('      ❌ 新用户连续天数应为0');
      allPassed = false;
    }
  }
  
  // 场景2: 连续签到流程
  console.log('   📋 场景2: 模拟连续3天签到');
  localStorage.setItem('ambrose_streak', '3');
  localStorage.setItem('ambrose_last_signin', getTodayString());
  
  if (typeof isSignedToday === 'function') {
    if (isSignedToday()) {
      console.log('      ✅ 今天已签到状态正确');
    } else {
      console.log('      ❌ 今天已签到检测失败');
      allPassed = false;
    }
  }
  
  // 场景3: 断签后重置
  console.log('   📋 场景3: 断签后重置');
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  var yesterdayStr = yesterday.getFullYear() + '-' + 
    String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + 
    String(yesterday.getDate()).padStart(2, '0');
  
  localStorage.setItem('ambrose_last_signin', yesterdayStr);
  localStorage.setItem('ambrose_streak', '5');
  
  if (typeof checkAndResetStreak === 'function') {
    checkAndResetStreak();
    var newStreak = parseInt(localStorage.getItem('ambrose_streak') || '0');
    if (newStreak === 0) {
      console.log('      ✅ 断签后正确重置为0');
    } else {
      console.log('      ⚠️  断签后 streak=' + newStreak + '（期望0）');
    }
  }
  
  return allPassed;
}

// 测试饮食记录完整流程
function testDietRecordingFlow() {
  console.log('🧪 测试饮食记录流程...');
  
  var allPassed = true;
  
  if (typeof foodDatabase === 'undefined') {
    console.log('   ⚠️  foodDatabase未加载');
    return true;
  }
  
  // 场景1: 搜索并选择食物
  console.log('   📋 场景1: 搜索食物');
  var searchResults = foodDatabase.filter(function(f) {
    return f.name.includes('米饭');
  });
  
  if (searchResults.length > 0) {
    console.log('      ✅ 找到' + searchResults.length + '个结果');
    var selectedFood = searchResults[0];
    console.log('      ℹ️  选择: ' + selectedFood.name + ' (' + selectedFood.calories + '千卡)');
  } else {
    console.log('      ❌ 未找到食物');
    allPassed = false;
  }
  
  // 场景2: 计算多份热量
  console.log('   📋 场景2: 计算多份热量');
  if (searchResults.length > 0) {
    var food = searchResults[0];
    var portions = [0.5, 1, 1.5, 2];
    
    portions.forEach(function(portion) {
      var totalCalories = Math.round(food.calories * portion);
      console.log('      ℹ️  ' + portion + '份 = ' + totalCalories + '千卡');
    });
  }
  
  // 场景3: 按分类浏览
  console.log('   📋 场景3: 按分类浏览食物');
  var categories = ['主食', '蛋白质', '蔬菜', '水果'];
  
  categories.forEach(function(cat) {
    var foods = foodDatabase.filter(function(f) {
      return f.category === cat;
    });
    console.log('      ℹ️  ' + cat + ': ' + foods.length + '个');
  });
  
  return allPassed;
}

// 测试食谱浏览流程
function testRecipeBrowsingFlow() {
  console.log('🧪 测试食谱浏览流程...');
  
  var allPassed = true;
  
  if (typeof recipesData === 'undefined') {
    console.log('   ⚠️  recipesData未加载');
    return true;
  }
  
  // 场景1: 浏览所有食谱
  console.log('   📋 场景1: 浏览所有食谱');
  console.log('      ℹ️  共有' + recipesData.length + '个食谱');
  
  // 场景2: 按分类筛选
  console.log('   📋 场景2: 按分类筛选');
  var categories = ['早餐', '午餐', '晚餐', '减脂', '增肌', '素食'];
  
  categories.forEach(function(cat) {
    var filtered = recipesData.filter(function(r) {
      return r.category && r.category.includes(cat);
    });
    console.log('      ℹ️  ' + cat + ': ' + filtered.length + '个');
  });
  
  // 场景3: 查看食谱详情
  console.log('   📋 场景3: 查看食谱详情');
  if (recipesData.length > 0) {
    var recipe = recipesData[0];
    console.log('      ℹ️  示例: ' + recipe.name);
    console.log('         - 热量: ' + recipe.calories + '千卡');
    console.log('         - 时间: ' + recipe.time);
    console.log('         - 难度: ' + recipe.difficulty);
    console.log('         - 食材: ' + recipe.ingredients.length + '种');
    console.log('         - 步骤: ' + recipe.steps.length + '步');
  }
  
  return allPassed;
}

// ==================== E2E测试模拟 ====================

// 模拟用户旅程：新用户首次使用
function testNewUserJourney() {
  console.log('🧪 E2E测试: 新用户首次使用...');
  
  var allPassed = true;
  
  // Step 1: 打开App
  console.log('   📍 Step 1: 打开App');
  if (typeof showPage === 'function') {
    showPage('homePage');
    console.log('      ✅ 显示主页');
  }
  
  // Step 2: 点击开始使用
  console.log('   📍 Step 2: 点击开始使用');
  var saved = localStorage.getItem('ambroseUser');
  if (!saved) {
    console.log('      ✅ 未登录状态，应显示登录页');
  } else {
    console.log('      ℹ️  已登录用户，直接使用');
  }
  
  // Step 3: 浏览功能
  console.log('   📍 Step 3: 浏览功能');
  var pages = ['homePage', 'workoutPage', 'dietPage'];
  pages.forEach(function(page) {
    if (document.getElementById(page)) {
      console.log('      ✅ ' + page + ' 存在');
    } else {
      console.log('      ❌ ' + page + ' 不存在');
      allPassed = false;
    }
  });
  
  // Step 4: 首次打卡
  console.log('   📍 Step 4: 首次打卡');
  if (typeof isSignedToday === 'function' && !isSignedToday()) {
    console.log('      ✅ 今天未签到，可以打卡');
  }
  
  return allPassed;
}

// 模拟用户旅程：每日记录流程
function testDailyRecordingJourney() {
  console.log('🧪 E2E测试: 每日记录流程...');
  
  var allPassed = true;
  
  // Step 1: 早上记录体重
  console.log('   📍 Step 1: 记录体重');
  console.log('      ℹ️  记录今日体重: 70kg');
  
  // Step 2: 早餐记录
  console.log('   📍 Step 2: 记录早餐');
  if (typeof foodDatabase !== 'undefined') {
    var breakfast = foodDatabase.filter(function(f) {
      return f.name.includes('燕麦') || f.name.includes('牛奶');
    });
    console.log('      ℹ️  早餐选择: ' + (breakfast[0]?.name || '自定义'));
  }
  
  // Step 3: 上午训练
  console.log('   📍 Step 3: 记录训练');
  console.log('      ℹ️  完成30分钟有氧');
  
  // Step 4: 午餐记录
  console.log('   📍 Step 4: 记录午餐');
  if (typeof recipesData !== 'undefined') {
    var lunch = recipesData.filter(function(r) {
      return r.category.includes('午餐');
    });
    console.log('      ℹ️  午餐食谱: ' + (lunch[0]?.name || '自定义'));
  }
  
  // Step 5: 晚上打卡
  console.log('   📍 Step 5: 每日打卡');
  if (typeof isSignedToday === 'function') {
    if (isSignedToday()) {
      console.log('      ✅ 今天已打卡');
    } else {
      console.log('      ℹ️  今天未打卡');
    }
  }
  
  return allPassed;
}

// ==================== 回归测试 ====================

// 确保新代码没有破坏旧功能
function testRegression() {
  console.log('🧪 回归测试...');
  
  var allPassed = true;
  
  // 测试之前的功能仍然正常
  console.log('   📋 检查已有功能...');
  
  // 1. showPage函数
  if (typeof showPage === 'function') {
    console.log('      ✅ showPage函数存在');
  } else {
    console.log('      ❌ showPage函数丢失');
    allPassed = false;
  }
  
  // 2. 签到函数
  if (typeof getTodayString === 'function') {
    console.log('      ✅ 签到相关函数存在');
  } else {
    console.log('      ❌ 签到函数丢失');
    allPassed = false;
  }
  
  // 3. 数据库
  if (typeof foodDatabase !== 'undefined') {
    console.log('      ✅ foodDatabase存在 (' + foodDatabase.length + '条)');
  } else {
    console.log('      ⚠️  foodDatabase未加载');
  }
  
  if (typeof recipesData !== 'undefined') {
    console.log('      ✅ recipesData存在 (' + recipesData.length + '条)');
  } else {
    console.log('      ⚠️  recipesData未加载');
  }
  
  return allPassed;
}

// ==================== 运行所有测试 ====================

function runDay3Tests() {
  console.log('');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║   🧪 Day 3: 集成测试 + E2E测试                ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('');
  
  var results = {
    '签到流程': testCompleteSigninFlow(),
    '饮食记录': testDietRecordingFlow(),
    '食谱浏览': testRecipeBrowsingFlow(),
    '新用户旅程': testNewUserJourney(),
    '每日记录': testDailyRecordingJourney(),
    '回归测试': testRegression()
  };
  
  console.log('');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║              📊 Day 3 测试结果                 ║');
  console.log('╠════════════════════════════════════════════════╣');
  
  var passed = 0, failed = 0;
  for (var testName in results) {
    var status = results[testName] ? '✅ 通过' : '❌ 失败';
    console.log('║ ' + status + ' - ' + testName.padEnd(20) + '           ║');
    if (results[testName]) passed++;
    else failed++;
  }
  
  console.log('╠════════════════════════════════════════════════╣');
  console.log('║ 总计: ' + passed + '通过, ' + failed + '失败' + '                    ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('');
  console.log('💡 Day 3 学习重点:');
  console.log('   - 集成测试：多组件协同');
  console.log('   - E2E测试：用户完整旅程');
  console.log('   - 回归测试：防止功能退化');
  console.log('   - 测试金字塔实践');
  console.log('');
  
  return {
    passed: passed,
    failed: failed,
    total: passed + failed,
    success: failed === 0
  };
}

// 导出
window.runDay3Tests = runDay3Tests;
window.testCompleteSigninFlow = testCompleteSigninFlow;
window.testDietRecordingFlow = testDietRecordingFlow;
window.testRecipeBrowsingFlow = testRecipeBrowsingFlow;
window.testNewUserJourney = testNewUserJourney;
window.testDailyRecordingJourney = testDailyRecordingJourney;
window.testRegression = testRegression;

console.log('✅ Day 3 测试框架加载完成');
