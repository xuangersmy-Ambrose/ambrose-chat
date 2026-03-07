/**
 * AMBROSE Health - 安全工具库
 * 修复XSS漏洞和其他安全问题
 */

const SecurityUtils = {
  /**
   * HTML转义 - 防止XSS
   */
  escapeHtml(text) {
    if (typeof text !== 'string') return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * 安全的innerHTML设置
   */
  safeSetHTML(element, html) {
    // 清理事件处理器
    const cleaned = html
      .replace(/on\w+\s*=/gi, '')
      .replace(/javascript:/gi, '');
    element.innerHTML = cleaned;
  },

  /**
   * 验证输入
   */
  validateInput(value, type = 'string') {
    if (value === null || value === undefined) return false;
    
    switch(type) {
      case 'string':
        return typeof value === 'string' && value.trim().length > 0;
      case 'number':
        return typeof value === 'number' && !isNaN(value) && isFinite(value);
      case 'positiveNumber':
        return typeof value === 'number' && value > 0 && isFinite(value);
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'date':
        return !isNaN(Date.parse(value));
      default:
        return true;
    }
  },

  /**
   * 安全的JSON解析
   */
  safeJSONParse(str, defaultVal = null) {
    try {
      return JSON.parse(str);
    } catch {
      return defaultVal;
    }
  },

  /**
   * 安全的localStorage操作
   */
  storage: {
    get(key, defaultVal = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? SecurityUtils.safeJSONParse(item, defaultVal) : defaultVal;
      } catch {
        return defaultVal;
      }
    },
    
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },
    
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }
  },

  /**
   * 生成安全ID
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

/**
 * 安全日志 - 生产环境禁用console
 */
const SecureLogger = {
  isDev: () => {
    return location.hostname === 'localhost' || 
           location.hostname === '127.0.0.1' ||
           location.protocol === 'file:';
  },

  log(...args) {
    if (this.isDev()) console.log(...args);
  },

  warn(...args) {
    if (this.isDev()) console.warn(...args);
  },

  error(...args) {
    if (this.isDev()) {
      console.error(...args);
    } else {
      // 生产环境发送到监控
      this.sendToMonitoring('error', args);
    }
  },

  sendToMonitoring(level, data) {
    // 可以集成Sentry等监控服务
    if (window.Sentry) {
      window.Sentry.captureMessage(data.join(' '), level);
    }
  }
};

/**
 * 内存管理器 - 防止内存泄漏
 */
class MemoryManager {
  constructor() {
    this.timers = [];
    this.listeners = [];
    this.observers = [];
    this.intervals = [];
  }

  setTimeout(fn, delay) {
    const id = setTimeout(fn, delay);
    this.timers.push(id);
    return id;
  }

  setInterval(fn, delay) {
    const id = setInterval(fn, delay);
    this.intervals.push(id);
    return id;
  }

  addEventListener(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    this.listeners.push({ target, event, handler, options });
    return () => this.removeEventListener(target, event, handler, options);
  }

  removeEventListener(target, event, handler, options) {
    target.removeEventListener(event, handler, options);
    this.listeners = this.listeners.filter(
      l => !(l.target === target && l.event === event && l.handler === handler)
    );
  }

  observe(observer) {
    this.observers.push(observer);
    return observer;
  }

  cleanup() {
    this.timers.forEach(id => clearTimeout(id));
    this.intervals.forEach(id => clearInterval(id));
    this.listeners.forEach(({ target, event, handler, options }) => {
      target.removeEventListener(event, handler, options);
    });
    this.observers.forEach(obs => obs.disconnect?.());
    
    this.timers = [];
    this.intervals = [];
    this.listeners = [];
    this.observers = [];
  }
}

/**
 * 全局错误处理
 */
window.addEventListener('error', (e) => {
  SecureLogger.error('Global error:', e.message, e.filename, e.lineno);
  e.preventDefault();
});

window.addEventListener('unhandledrejection', (e) => {
  SecureLogger.error('Unhandled rejection:', e.reason);
  e.preventDefault();
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SecurityUtils, SecureLogger, MemoryManager };
}
