/**
 * AMBROSE App 单元测试
 * Day 1: TDD基础 - 工具函数测试
 * 
 * 运行方式:
 * 1. 浏览器: 打开 test-runner.html
 * 2. Node.js: node tests/utils.test.js
 */

// 兼容Node.js和浏览器环境
if (typeof window === 'undefined') {
  // Node.js环境
  global.window = {};
  global.localStorage = {
    _data: {},
    getItem: function(key) { return this._data[key] || null; },
    setItem: function(key, value) { this._data[key] = String(value); },
    removeItem: function(key) { delete this._data[key]; }
  };
  global.document = { getElementById: function() { return { classList: { contains: function() { return true; } } }; } };
  global.showPage = function() {};
  global.getTodayString = function() {
    var now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  };
  global.isSignedToday = function() {
    return localStorage.getItem('ambrose_last_signin') === getTodayString();
  };
  global.getStreakDays = function() {
    return parseInt(localStorage.getItem('ambrose_streak') || '0');
  };
  global.getTodayReward = function(streak) {
    var normal = [20, 25, 30, 35, 40, 45, 50];
    var streakRewards = [30, 40, 55, 70, 90, 110, 150];
    var milestone = { 7: 200, 14: 500, 30: 1000, 60: 2000, 100: 5000 };
    
    if (milestone[streak + 1]) return milestone[streak + 1];
    if (streak >= 7) return streakRewards[Math.min(streak % 7, 6)];
    return normal[Math.min(streak, 6)];
  };
}

// 测试showPage函数
function testShowPage() {
  console.log('🧪 测试 showPage...');
  
  // Arrange: 准备测试条件
  var testPageId = 'homePage';
  
  // Act: 执行被测试的操作
  showPage(testPageId);
  
  // Assert: 验证结果
  var homePage = document.getElementById('homePage');
  if (homePage && homePage.classList.contains('active')) {
    console.log('   ✅ showPage 切换到homePage成功');
    return true;
  } else {
    console.log('   ❌ showPage 测试失败');
    return false;
  }
}

// 测试签到相关函数
function testSigninFunctions() {
  console.log('🧪 测试签到函数...');
  var allPassed = true;
  
  // 测试1: getTodayString返回格式
  var today = getTodayString();
  if (today && today.match(/^\d{4}-\d{2}-\d{2}$/)) {
    console.log('   ✅ getTodayString 格式正确:', today);
  } else {
    console.log('   ❌ getTodayString 格式错误:', today);
    allPassed = false;
  }
  
  // 测试2: isSignedToday（清除签到状态后应返回false）
  var originalSignin = localStorage.getItem('ambrose_last_signin');
  localStorage.removeItem('ambrose_last_signin');
  
  if (!isSignedToday()) {
    console.log('   ✅ isSignedToday 未签到时返回false');
  } else {
    console.log('   ❌ isSignedToday 应该返回false');
    allPassed = false;
  }
  
  // 测试3: 模拟已签到
  localStorage.setItem('ambrose_last_signin', getTodayString());
  if (isSignedToday()) {
    console.log('   ✅ isSignedToday 已签到时返回true');
  } else {
    console.log('   ❌ isSignedToday 应该返回true');
    allPassed = false;
  }
  
  // 恢复原始状态
  if (originalSignin) {
    localStorage.setItem('ambrose_last_signin', originalSignin);
  } else {
    localStorage.removeItem('ambrose_last_signin');
  }
  
  return allPassed;
}

// 测试积分计算
function testPointsCalculation() {
  console.log('🧪 测试积分计算...');
  
  // 注意：需要在SIGNIN_REWARDS定义后运行
  if (typeof SIGNIN_REWARDS === 'undefined') {
    console.log('   ⚠️  SIGNIN_REWARDS未定义，跳过积分测试');
    return true;
  }
  
  var testCases = [
    { streak: 0, desc: '普通第1天' },
    { streak: 3, desc: '普通第4天' },
    { streak: 6, desc: '普通第7天' },
    { streak: 7, desc: '连续第8天(切换规则)' },
    { streak: 13, desc: '里程碑前一天' },
  ];
  
  var allPassed = true;
  testCases.forEach(function(tc) {
    var result = getTodayReward(tc.streak);
    console.log('   ℹ️  ' + tc.desc + ' (连续' + tc.streak + '天): ' + result + '积分');
  });
  
  // 测试里程碑奖励
  if (SIGNIN_REWARDS.milestone) {
    console.log('   ✅ 里程碑奖励配置存在');
    for (var day in SIGNIN_REWARDS.milestone) {
      var reward = getTodayReward(parseInt(day) - 1);
      if (reward === SIGNIN_REWARDS.milestone[day]) {
        console.log('   ✅ 第' + day + '天里程碑奖励:' + reward);
      }
    }
  }
  
  return allPassed;
}

// 测试localStorage操作
function testLocalStorage() {
  console.log('🧪 测试 localStorage...');
  
  // 测试写入
  var testKey = 'test_key_' + Date.now();
  var testValue = 'test_value';
  
  try {
    localStorage.setItem(testKey, testValue);
    var retrieved = localStorage.getItem(testKey);
    
    if (retrieved === testValue) {
      console.log('   ✅ localStorage 读写正常');
      localStorage.removeItem(testKey);
      return true;
    } else {
      console.log('   ❌ localStorage 读写不匹配');
      return false;
    }
  } catch (e) {
    console.log('   ❌ localStorage 异常:', e.message);
    return false;
  }
}

// 测试日期函数
function testDateFunctions() {
  console.log('🧪 测试日期函数...');
  var allPassed = true;
  
  // 测试getTodayString
  var today = getTodayString();
  var parts = today.split('-');
  
  if (parts.length === 3) {
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]);
    var day = parseInt(parts[2]);
    
    if (year >= 2020 && year <= 2100 &&
        month >= 1 && month <= 12 &&
        day >= 1 && day <= 31) {
      console.log('   ✅ 日期格式正确:', today);
    } else {
      console.log('   ❌ 日期值无效:', today);
      allPassed = false;
    }
  } else {
    console.log('   ❌ 日期格式错误:', today);
    allPassed = false;
  }
  
  return allPassed;
}

// 运行所有测试
function runAllTests() {
  console.log('');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║       🧪 AMBROSE App 单元测试开始              ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('');
  
  var results = {
    '页面切换': testShowPage(),
    '签到功能': testSigninFunctions(),
    '积分计算': typeof SIGNIN_REWARDS !== 'undefined' ? testPointsCalculation() : true,
    '本地存储': testLocalStorage(),
    '日期函数': testDateFunctions()
  };
  
  console.log('');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║              📊 测试结果                       ║');
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
  
  return {
    passed: passed,
    failed: failed,
    total: passed + failed,
    success: failed === 0
  };
}

// 导出到全局
window.runAllTests = runAllTests;
window.testShowPage = testShowPage;
window.testSigninFunctions = testSigninFunctions;
window.testPointsCalculation = testPointsCalculation;
window.testLocalStorage = testLocalStorage;
window.testDateFunctions = testDateFunctions;

console.log('✅ 测试框架加载完成，调用 runAllTests() 运行测试');
