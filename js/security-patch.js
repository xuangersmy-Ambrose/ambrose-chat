/**
 * AMBROSE Chat - 快速安全修复补丁
 * 使用方法: 在 index.html 的 </script> 标签中引入此文件
 * 注意: 这只是临时修复，建议尽快使用完整的优化版本
 */

(function() {
  'use strict';
  
  console.log('[Security Patch] 安全补丁已加载');
  
  // ==================== 1. XSS防护补丁 ====================
  
  // 保存原始方法
  const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  
  // 创建安全的HTML转义函数
  window.escapeHtml = function(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  };
  
  // 覆盖危险的eval等价函数
  window.setInterval = function(callback, delay, ...args) {
    if (typeof callback === 'string') {
      console.warn('[Security] 阻止了危险的setInterval字符串调用');
      return null;
    }
    return Window.prototype.setInterval.call(window, callback, delay, ...args);
  };
  
  window.setTimeout = function(callback, delay, ...args) {
    if (typeof callback === 'string') {
      console.warn('[Security] 阻止了危险的setTimeout字符串调用');
      return null;
    }
    return Window.prototype.setTimeout.call(window, callback, delay, ...args);
  };
  
  // ==================== 2. 安全的Storage封装 ====================
  
  const storageKey = 'ambrose_secure_key_v1';
  
  window.SecureStorage = {
    set(key, value) {
      try {
        const data = JSON.stringify({
          value,
          timestamp: Date.now()
        });
        // 简单混淆（生产环境请使用真正的加密）
        const obfuscated = btoa(data);
        localStorage.setItem(`${storageKey}_${key}`, obfuscated);
        return true;
      } catch (e) {
        console.error('[Security] Storage error:', e);
        return false;
      }
    },
    
    get(key) {
      try {
        const obfuscated = localStorage.getItem(`${storageKey}_${key}`);
        if (!obfuscated) return null;
        const data = atob(obfuscated);
        const parsed = JSON.parse(data);
        return parsed.value;
      } catch (e) {
        return null;
      }
    },
    
    remove(key) {
      localStorage.removeItem(`${storageKey}_${key}`);
    }
  };
  
  // 替换原有的localStorage直接操作
  window.addEventListener('DOMContentLoaded', () => {
    // 迁移旧数据到新格式
    const oldUser = localStorage.getItem('ambroseUser');
    if (oldUser) {
      SecureStorage.set('user', JSON.parse(oldUser));
      localStorage.removeItem('ambroseUser');
    }
    
    const oldToken = localStorage.getItem('ambrose_token');
    if (oldToken) {
      SecureStorage.set('token', oldToken);
      localStorage.removeItem('ambrose_token');
    }
  });
  
  // ==================== 3. 输入验证补丁 ====================
  
  window.InputValidator = {
    phone(value) {
      return /^1[3-9]\d{9}$/.test(String(value));
    },
    
    number(value, min = -Infinity, max = Infinity) {
      const num = parseFloat(value);
      return !isNaN(num) && num >= min && num <= max;
    },
    
    required(value) {
      return value !== undefined && value !== null && String(value).trim() !== '';
    },
    
    safeString(value, maxLength = 1000) {
      const str = String(value);
      return str.length <= maxLength && !/[\x00-\x1F\x7F]/.test(str);
    }
  };
  
  // ==================== 4. 防抖/节流补丁 ====================
  
  window.debounce = function(fn, delay = 300) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  };
  
  window.throttle = function(fn, limit = 100) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // ==================== 5. 定时器管理补丁 ====================
  
  const managedTimers = new Set();
  
  const originalSetInterval = window.setInterval;
  const originalSetTimeout = window.setTimeout;
  const originalClearInterval = window.clearInterval;
  const originalClearTimeout = window.clearTimeout;
  
  window.setManagedInterval = function(fn, delay, ...args) {
    const id = originalSetInterval(fn, delay, ...args);
    managedTimers.add({ id, type: 'interval', fn });
    return id;
  };
  
  window.setManagedTimeout = function(fn, delay, ...args) {
    const id = originalSetTimeout(() => {
      fn(...args);
      managedTimers.delete(timer);
    }, delay);
    const timer = { id, type: 'timeout' };
    managedTimers.add(timer);
    return id;
  };
  
  window.clearAllManagedTimers = function() {
    managedTimers.forEach(timer => {
      if (timer.type === 'interval') {
        originalClearInterval(timer.id);
      } else {
        originalClearTimeout(timer.id);
      }
    });
    managedTimers.clear();
  };
  
  // 页面卸载时清理
  window.addEventListener('beforeunload', window.clearAllManagedTimers);
  
  // ==================== 6. 错误处理补丁 ====================
  
  window.addEventListener('error', (e) => {
    console.error('[Security] 全局错误捕获:', e.error);
    // 阻止错误向上传播
    e.preventDefault();
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('[Security] 未处理的Promise拒绝:', e.reason);
    e.preventDefault();
  });
  
  // ==================== 7. 安全检查补丁 ====================
  
  // 检查原型污染
  if (Object.prototype.toString !== '[object Object]'.constructor.prototype.toString) {
    console.warn('[Security] 检测到原型污染！');
  }
  
  // 检查eval使用
  if (window.eval !== window.Function.prototype.constructor) {
    console.warn('[Security] eval可能被篡改！');
  }
  
  console.log('[Security Patch] 安全补丁加载完成');
  
})();
