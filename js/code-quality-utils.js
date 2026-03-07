/**
 * 代码质量优化指南 - AMBROSE Health
 */

// ==========================================
// 1. XSS防护 - HTML转义工具
// ==========================================
const HtmlUtils = {
  escape(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  },
  
  // 安全的innerHTML设置
  setHTML(element, html) {
    // 如果DOMPurify可用，使用它
    if (window.DOMPurify) {
      element.innerHTML = DOMPurify.sanitize(html);
    } else {
      // 基础转义
      element.innerHTML = html;
    }
  }
};

// ==========================================
// 2. 日志管理 - 生产环境禁用
// ==========================================
const Logger = {
  isDev: location.hostname === 'localhost' || location.hostname === '127.0.0.1',
  
  log(...args) {
    if (this.isDev) console.log(...args);
  },
  
  error(...args) {
    // 错误始终记录，但生产环境发送到监控服务
    if (this.isDev) {
      console.error(...args);
    } else {
      // 发送到Sentry等监控服务
      this.sendToMonitoring('error', args);
    }
  },
  
  warn(...args) {
    if (this.isDev) console.warn(...args);
  },
  
  sendToMonitoring(level, data) {
    // 生产环境错误监控
    if (window.Sentry) {
      window.Sentry.captureMessage(data.join(' '), level);
    }
  }
};

// 替换所有console调用
// 原: console.log('message')
// 新: Logger.log('message')

// ==========================================
// 3. 性能优化 - 防抖/节流
// ==========================================
const PerformanceUtils = {
  // 防抖
  debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  
  // 节流
  throttle(fn, limit = 300) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // 请求动画帧节流
  rafThrottle(fn) {
    let ticking = false;
    return function(...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          fn.apply(this, args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }
};

// ==========================================
// 4. DOM操作优化
// ==========================================
const DOMMUtils = {
  // 使用DocumentFragment批量插入
  batchInsert(parent, elements) {
    const fragment = document.createDocumentFragment();
    elements.forEach(el => fragment.appendChild(el));
    parent.appendChild(fragment);
  },
  
  // 虚拟滚动 - 长列表优化
  virtualScroll(container, items, itemHeight, renderFn) {
    const visibleCount = Math.ceil(container.clientHeight / itemHeight);
    const totalHeight = items.length * itemHeight;
    
    container.style.position = 'relative';
    container.style.height = `${totalHeight}px`;
    
    const update = () => {
      const scrollTop = container.scrollTop;
      const startIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
      
      container.innerHTML = '';
      for (let i = startIndex; i < endIndex; i++) {
        const el = renderFn(items[i], i);
        el.style.position = 'absolute';
        el.style.top = `${i * itemHeight}px`;
        el.style.height = `${itemHeight}px`;
        container.appendChild(el);
      }
    };
    
    container.addEventListener('scroll', PerformanceUtils.throttle(update, 16));
    update();
  }
};

// ==========================================
// 5. 错误边界
// ==========================================
window.addEventListener('error', (e) => {
  Logger.error('Global error:', e.message, e.filename, e.lineno);
  // 防止错误导致白屏
  e.preventDefault();
});

window.addEventListener('unhandledrejection', (e) => {
  Logger.error('Unhandled promise rejection:', e.reason);
  e.preventDefault();
});

// ==========================================
// 6. 内存泄漏防护
// ==========================================
const MemoryManager = {
  observers: [],
  timers: [],
  
  // 安全添加事件监听
  addEventListener(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    return () => target.removeEventListener(event, handler, options);
  },
  
  // 安全设置定时器
  setTimeout(fn, delay) {
    const id = setTimeout(fn, delay);
    this.timers.push(id);
    return id;
  },
  
  // 安全创建Observer
  observe(observer) {
    this.observers.push(observer);
    return observer;
  },
  
  // 清理所有资源
  cleanup() {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
    this.observers.forEach(obs => obs.disconnect?.());
    this.observers = [];
  }
};

// 页面卸载时清理
window.addEventListener('beforeunload', () => MemoryManager.cleanup());

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HtmlUtils, Logger, PerformanceUtils, DOMMUtils, MemoryManager };
}
