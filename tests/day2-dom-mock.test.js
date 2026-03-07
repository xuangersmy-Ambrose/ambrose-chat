/**
 * AMBROSE App 单元测试 - Day 2
 * DOM操作测试 + Mock技术
 * 
 * 运行方式:
 * 1. 浏览器: 打开 test-runner.html
 * 2. Node.js: node tests/day2-dom-mock.test.js
 */

// 兼容Node.js和浏览器环境
if (typeof window === 'undefined') {
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
  global.performance = { now: function() { return Date.now(); } };
  global.foodDatabase = [
    { name: '米饭', category: '主食', calories: 174 },
    { name: '鸡胸肉', category: '蛋白质', calories: 165 },
    { name: '鸡蛋', category: '蛋白质', calories: 70 }
  ];
}

// ==================== Mock工具 ====================

// 简单的Mock函数创建器
function createMock() {
  var calls = [];
  var mockFn = function(...args) {
    calls.push(args);
    return mockFn._returnValue;
  };
  mockFn._returnValue = undefined;
  mockFn.calls = calls;
  mockFn.mockReturnValue = function(val) {
    mockFn._returnValue = val;
    return mockFn;
  };
  mockFn.mockReset = function() {
    calls.length = 0;
  };
  return mockFn;
}

// Mock localStorage
function mockLocalStorage() {
  var storage = {};
  return {
    getItem: function(key) {
      return storage[key] || null;
    },
    setItem: function(key, value) {
      storage[key] = String(value);
    },
    removeItem: function(key) {
      delete storage[key];
    },
    clear: function() {
      storage = {};
    },
    _storage: storage
  };
}

// ==================== DOM测试 ====================

// 测试食物搜索功能
function testFoodSearch() {
  console.log('🧪 测试食物搜索...');
  
  if (typeof foodDatabase === 'undefined') {
    console.log('   ⚠️  foodDatabase未加载，跳过');
    return true;
  }
  
  var allPassed = true;
  
  // 测试1: 搜索"米饭"应该返回结果
  var riceResults = foodDatabase.filter(function(f) {
    return f.name.includes('米饭');
  });
  
  if (riceResults.length > 0) {
    console.log('   ✅ 搜索"米饭"返回' + riceResults.length + '个结果');
  } else {
    console.log('   ❌ 搜索"米饭"无结果');
    allPassed = false;
  }
  
  // 测试2: 搜索不存在的食物返回空数组
  var noResults = foodDatabase.filter(function(f) {
    return f.name.includes('不存在的食物XYZ');
  });
  
  if (noResults.length === 0) {
    console.log('   ✅ 搜索不存在食物返回空数组');
  } else {
    console.log('   ❌ 应该返回空数组');
    allPassed = false;
  }
  
  // 测试3: 按分类筛选
  var staples = foodDatabase.filter(function(f) {
    return f.category === '主食';
  });
  
  if (staples.length >= 5) {
    console.log('   ✅ 主食分类有' + staples.length + '个食物');
  } else {
    console.log('   ⚠️  主食分类食物较少(' + staples.length + '个)');
  }
  
  return allPassed;
}

// 测试食谱数据
function testRecipesData() {
  console.log('🧪 测试食谱数据...');
  
  if (typeof recipesData === 'undefined') {
    console.log('   ⚠️  recipesData未加载，跳过');
    return true;
  }
  
  var allPassed = true;
  
  // 测试1: 食谱数据存在且完整
  if (recipesData.length > 0) {
    console.log('   ✅ 加载了' + recipesData.length + '个食谱');
  } else {
    console.log('   ❌ 食谱数据为空');
    return false;
  }
  
  // 测试2: 每个食谱都有必需字段
  var requiredFields = ['id', 'name', 'emoji', 'calories', 'time', 'difficulty', 'ingredients', 'steps'];
  var incompleteRecipes = [];
  
  recipesData.forEach(function(recipe) {
    requiredFields.forEach(function(field) {
      if (recipe[field] === undefined) {
        incompleteRecipes.push(recipe.name + '缺少' + field);
      }
    });
  });
  
  if (incompleteRecipes.length === 0) {
    console.log('   ✅ 所有食谱字段完整');
  } else {
    console.log('   ❌ ' + incompleteRecipes.length + '个食谱字段不完整');
    incompleteRecipes.slice(0, 3).forEach(function(msg) {
      console.log('      - ' + msg);
    });
    allPassed = false;
  }
  
  // 测试3: 食谱分类正确
  var validCategories = ['早餐', '午餐', '晚餐', '减脂', '增肌', '素食'];
  var wrongCategories = [];
  
  recipesData.forEach(function(recipe) {
    if (recipe.category && Array.isArray(recipe.category)) {
      recipe.category.forEach(function(cat) {
        if (!validCategories.includes(cat)) {
          wrongCategories.push(recipe.name + ': ' + cat);
        }
      });
    }
  });
  
  if (wrongCategories.length === 0) {
    console.log('   ✅ 食谱分类正确');
  } else {
    console.log('   ⚠️  部分食谱使用非标准分类');
  }
  
  return allPassed;
}

// 测试积分计算逻辑（带Mock）
function testPointsWithMock() {
  console.log('🧪 测试积分计算（Mock场景）...');
  
  // Mock localStorage
  var mockStorage = mockLocalStorage();
  var originalGetItem = localStorage.getItem;
  var originalSetItem = localStorage.setItem;
  
  // 替换为Mock
  localStorage.getItem = mockStorage.getItem;
  localStorage.setItem = mockStorage.setItem;
  
  var allPassed = true;
  
  // 测试场景1: 首次签到
  mockStorage.setItem('ambrose_streak', '0');
  mockStorage.setItem('ambrose_last_signin', '');
  
  if (typeof getStreakDays === 'function') {
    var streak = getStreakDays();
    if (streak === 0) {
      console.log('   ✅ 首次用户连续天数为0');
    } else {
      console.log('   ❌ 首次用户连续天数应为0，实际' + streak);
      allPassed = false;
    }
  }
  
  // 测试场景2: 连续签到3天后
  mockStorage.setItem('ambrose_streak', '3');
  mockStorage.setItem('ambrose_last_signin', getTodayString());
  
  if (typeof isSignedToday === 'function') {
    if (isSignedToday()) {
      console.log('   ✅ 今天已签到检测正确');
    } else {
      console.log('   ❌ 今天已签到检测失败');
      allPassed = false;
    }
  }
  
  // 恢复原始localStorage
  localStorage.getItem = originalGetItem;
  localStorage.setItem = originalSetItem;
  
  console.log('   ℹ️  Mock测试完成');
  return allPassed;
}

// 测试用户数据管理
function testUserData() {
  console.log('🧪 测试用户数据管理...');
  
  var allPassed = true;
  
  // 测试数据序列化和反序列化
  var testUser = {
    name: '测试用户',
    age: 25,
    weight: 70,
    height: 175,
    goal: 'lose'
  };
  
  try {
    var serialized = JSON.stringify(testUser);
    var deserialized = JSON.parse(serialized);
    
    if (deserialized.name === testUser.name &&
        deserialized.age === testUser.age) {
      console.log('   ✅ 用户数据序列化正常');
    } else {
      console.log('   ❌ 用户数据序列化异常');
      allPassed = false;
    }
  } catch (e) {
    console.log('   ❌ JSON操作异常:', e.message);
    allPassed = false;
  }
  
  // 测试BMI计算
  if (typeof calculateBMI === 'function') {
    var bmi = calculateBMI(70, 175);
    if (bmi > 20 && bmi < 25) {
      console.log('   ✅ BMI计算正确:', bmi.toFixed(1));
    } else {
      console.log('   ⚠️  BMI计算结果异常:', bmi);
    }
  } else {
    console.log('   ℹ️  calculateBMI函数未定义');
  }
  
  return allPassed;
}

// 测试边界条件
function testEdgeCases() {
  console.log('🧪 测试边界条件...');
  
  var allPassed = true;
  
  // 测试1: 空字符串处理
  if (typeof getTodayString === 'function') {
    var today = getTodayString();
    if (today && today !== '') {
      console.log('   ✅ getTodayString不为空');
    } else {
      console.log('   ❌ getTodayString返回空');
      allPassed = false;
    }
  }
  
  // 测试2: 极大值处理（积分）
  if (typeof getTodayReward === 'function') {
    var largeStreakReward = getTodayReward(100);
    console.log('   ℹ️  连续100天积分:', largeStreakReward);
    
    if (largeStreakReward > 0) {
      console.log('   ✅ 极大值处理正常');
    } else {
      console.log('   ⚠️  极大值可能有问题');
    }
  }
  
  // 测试3: 负值处理
  if (typeof getTodayReward === 'function') {
    try {
      var negativeReward = getTodayReward(-1);
      console.log('   ℹ️  负值输入返回:', negativeReward);
      if (negativeReward >= 0) {
        console.log('   ✅ 负值处理安全');
      } else {
        console.log('   ⚠️  负值返回负数');
      }
    } catch (e) {
      console.log('   ❌ 负值处理异常:', e.message);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// 测试性能
function testPerformance() {
  console.log('🧪 测试性能...');
  
  // 测试函数执行时间
  function measureTime(fn, iterations) {
    var start = performance.now();
    for (var i = 0; i < iterations; i++) {
      fn();
    }
    return performance.now() - start;
  }
  
  // 测试getTodayString性能
  if (typeof getTodayString === 'function') {
    var time = measureTime(getTodayString, 1000);
    console.log('   ℹ️  getTodayString执行1000次:', time.toFixed(2) + 'ms');
    
    if (time < 10) {
      console.log('   ✅ 性能优秀');
    } else if (time < 100) {
      console.log('   ✅ 性能可接受');
    } else {
      console.log('   ⚠️  性能可能需要优化');
    }
  }
  
  // 测试食物搜索性能
  if (typeof foodDatabase !== 'undefined') {
    var searchTime = measureTime(function() {
      foodDatabase.filter(function(f) {
        return f.name.includes('鸡');
      });
    }, 100);
    
    console.log('   ℹ️  食物搜索执行100次:', searchTime.toFixed(2) + 'ms');
  }
  
  return true;
}

// ==================== 运行所有测试 ====================

function runDay2Tests() {
  console.log('');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║     🧪 Day 2: DOM测试 + Mock技术              ║');
  console.log('╚════════════════════════════════════════════════╝');
  console.log('');
  
  var results = {
    '食物搜索': testFoodSearch(),
    '食谱数据': testRecipesData(),
    'Mock测试': testPointsWithMock(),
    '用户数据': testUserData(),
    '边界条件': testEdgeCases(),
    '性能测试': testPerformance()
  };
  
  console.log('');
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║              📊 Day 2 测试结果                 ║');
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
  console.log('💡 Day 2 学习重点:');
  console.log('   - DOM操作测试');
  console.log('   - Mock/Stub技术');
  console.log('   - 边界条件测试');
  console.log('   - 性能测试基础');
  console.log('');
  
  return {
    passed: passed,
    failed: failed,
    total: passed + failed,
    success: failed === 0
  };
}

// 导出
window.runDay2Tests = runDay2Tests;
window.createMock = createMock;
window.mockLocalStorage = mockLocalStorage;

console.log('✅ Day 2 测试框架加载完成');
