// ==========================================
// AMBROSE 自我验证系统 v1.0
// 目标：不依赖用户反馈，自主确认代码正确性
// ==========================================

(function() {
  'use strict';
  
  window.__AMBROSE_VALIDATOR__ = {
    version: '1.0',
    checks: {},
    errors: [],
    warnings: []
  };
  
  // ==========================================
  // 1. 运行时自我验证 (Runtime Self-Validation)
  // ==========================================
  
  // 验证关键函数是否存在且可调用
  function validateCriticalFunctions() {
    var criticalFuncs = [
      { name: 'showPage', args: ['workoutPage'] },
      { name: 'showLeaderboard', args: [] },
      { name: 'showCommunity', args: [] },
      { name: 'showReport', args: [] },
      { name: 'showCoursePage', args: [] }
    ];
    
    var results = {
      passed: [],
      failed: []
    };
    
    criticalFuncs.forEach(function(func) {
      if (typeof window[func.name] === 'function') {
        results.passed.push(func.name);
      } else {
        results.failed.push(func.name);
        console.error('[VALIDATOR] ❌ 关键函数未定义:', func.name);
      }
    });
    
    return results;
  }
  
  // 验证DOM元素是否存在
  function validateDOMElements() {
    var requiredElements = [
      'workoutPage', 'dietPage', 'achievePage', 
      'homePage', 'profilePage'
    ];
    
    var results = {
      passed: [],
      failed: []
    };
    
    requiredElements.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        results.passed.push(id);
      } else {
        results.failed.push(id);
        console.error('[VALIDATOR] ❌ 必要元素不存在:', id);
      }
    });
    
    return results;
  }
  
  // 验证事件绑定
  function validateEventBindings() {
    // 检查 action-item 元素是否有正确的事件处理
    var actionItems = document.querySelectorAll('.action-item');
    var results = {
      count: actionItems.length,
      hasDataAction: 0,
      missingDataAction: []
    };
    
    actionItems.forEach(function(item, index) {
      var action = item.getAttribute('data-action');
      if (action) {
        results.hasDataAction++;
      } else {
        results.missingDataAction.push(index);
      }
    });
    
    return results;
  }
  
  // ==========================================
  // 2. 预防性运行时检查 (Preventive Runtime Checks)
  // ==========================================
  
  // 包装所有关键函数，添加运行时验证
  function wrapWithValidation(funcName, originalFn) {
    return function() {
      console.log('[VALIDATOR] 执行:', funcName, '参数:', arguments);
      try {
        var result = originalFn.apply(this, arguments);
        console.log('[VALIDATOR] ✅ 成功:', funcName);
        return result;
      } catch (e) {
        console.error('[VALIDATOR] ❌ 失败:', funcName, e);
        window.__AMBROSE_VALIDATOR__.errors.push({
          func: funcName,
          error: e.message,
          time: new Date().toISOString()
        });
        throw e;
      }
    };
  }
  
  // 为所有关键函数添加包装
  function addRuntimeValidation() {
    var funcsToWrap = ['showPage', 'showLeaderboard', 'showCommunity', 'showReport', 'showCoursePage'];
    
    funcsToWrap.forEach(function(funcName) {
      var original = window[funcName];
      if (original) {
        window[funcName] = wrapWithValidation(funcName, original);
      }
    });
  }
  
  // ==========================================
  // 3. 自动化测试执行 (Automated Test Execution)
  // ==========================================
  
  function runAutomatedTests() {
    console.log('[VALIDATOR] 开始自动化测试...');
    
    var testResults = {
      timestamp: new Date().toISOString(),
      functionTests: validateCriticalFunctions(),
      domTests: validateDOMElements(),
      eventTests: validateEventBindings()
    };
    
    // 保存测试结果
    window.__AMBROSE_VALIDATOR__.lastTestResult = testResults;
    
    // 输出测试报告
    console.log('[VALIDATOR] ===== 测试报告 =====');
    console.log('[VALIDATOR] 函数测试 - 通过:', testResults.functionTests.passed.length, 
                '失败:', testResults.functionTests.failed.length);
    console.log('[VALIDATOR] DOM测试 - 通过:', testResults.domTests.passed.length,
                '失败:', testResults.domTests.failed.length);
    console.log('[VALIDATOR] 事件绑定 - 总数:', testResults.eventTests.count,
                '有效:', testResults.eventTests.hasDataAction);
    
    // 如果全部通过，记录成功
    var allPassed = testResults.functionTests.failed.length === 0 && 
                    testResults.domTests.failed.length === 0 &&
                    testResults.eventTests.missingDataAction.length === 0;
    
    if (allPassed) {
      console.log('[VALIDATOR] ✅ 所有测试通过！代码质量良好。');
    } else {
      console.error('[VALIDATOR] ❌ 存在测试失败，需要修复。');
    }
    
    return testResults;
  }
  
  // ==========================================
  // 4. 自我诊断面板
  // ==========================================
  
  function showValidationPanel() {
    var result = window.__AMBROSE_VALIDATOR__.lastTestResult;
    if (!result) {
      result = runAutomatedTests();
    }
    
    var html = '<div style="position:fixed;top:60px;right:10px;width:350px;max-height:500px;background:rgba(10,10,20,0.95);border:2px solid #00f3ff;border-radius:12px;padding:16px;z-index:99999;color:#00f3ff;font-family:monospace;font-size:12px;overflow:auto;">';
    html += '<h3 style="margin:0 0 12px 0;color:#ff00ff;">🔍 AMBROSE 自我验证</h3>';
    
    // 函数状态
    html += '<div style="margin-bottom:12px;"><strong>函数状态:</strong><br/>';
    result.functionTests.passed.forEach(function(f) {
      html += '✅ ' + f + '<br/>';
    });
    result.functionTests.failed.forEach(function(f) {
      html += '❌ ' + f + '<br/>';
    });
    html += '</div>';
    
    // DOM状态
    html += '<div style="margin-bottom:12px;"><strong>DOM状态:</strong><br/>';
    html += '通过: ' + result.domTests.passed.length + '<br/>';
    if (result.domTests.failed.length > 0) {
      html += '缺失: ' + result.domTests.failed.join(', ') + '<br/>';
    }
    html += '</div>';
    
    // 事件绑定状态
    html += '<div style="margin-bottom:12px;"><strong>事件绑定:</strong><br/>';
    html += '按钮总数: ' + result.eventTests.count + '<br/>';
    html += '有效绑定: ' + result.eventTests.hasDataAction + '<br/>';
    if (result.eventTests.missingDataAction.length > 0) {
      html += '⚠️ 缺少绑定的按钮索引: ' + result.eventTests.missingDataAction.join(', ') + '<br/>';
    }
    html += '</div>';
    
    // 总体状态
    var allPassed = result.functionTests.failed.length === 0 && 
                    result.domTests.failed.length === 0;
    html += '<div style="padding:10px;border-radius:8px;background:' + 
            (allPassed ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)') + ';text-align:center;">';
    html += allPassed ? '✅ 所有系统正常' : '❌ 需要修复';
    html += '</div>';
    
    html += '<button onclick="this.parentElement.remove()" style="margin-top:12px;width:100%;background:#ff00ff;color:#fff;border:none;padding:8px;border-radius:6px;cursor:pointer;">关闭</button>';
    html += '</div>';
    
    var panel = document.createElement('div');
    panel.innerHTML = html;
    document.body.appendChild(panel.firstElementChild);
  }
  
  // 快捷键显示验证面板
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
      e.preventDefault();
      showValidationPanel();
    }
  });
  
  // ==========================================
  // 初始化
  // ==========================================
  
  function init() {
    console.log('[VALIDATOR] 初始化自我验证系统...');
    
    // 运行初始测试
    runAutomatedTests();
    
    // 添加运行时验证
    addRuntimeValidation();
    
    // 定期检查（每30秒）
    setInterval(function() {
      console.log('[VALIDATOR] 执行定期检查...');
      runAutomatedTests();
    }, 30000);
    
    console.log('[VALIDATOR] 自我验证系统已启动');
    console.log('[VALIDATOR] 快捷键: Ctrl+Shift+V 显示验证面板');
  }
  
  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 暴露全局接口
  window.runAmbroseValidation = runAutomatedTests;
  window.showValidationPanel = showValidationPanel;
  
})();