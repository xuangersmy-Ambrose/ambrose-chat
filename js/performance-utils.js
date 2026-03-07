/**
 * AMBROSE Health - 性能工具库 (优化版)
 * 修复问题: 缺少防抖/节流、内存泄漏、频繁DOM操作
 */

const PerformanceUtils = {
  /**
   * 防抖函数
   * @param {Function} fn - 要防抖的函数
   * @param {number} delay - 延迟时间(毫秒)
   * @param {boolean} immediate - 是否立即执行
   */
  debounce(fn, delay = 300, immediate = false) {
    let timeout;
    let lastArgs;
    
    const debounced = function(...args) {
      lastArgs = args;
      const callNow = immediate && !timeout;
      
      clearTimeout(timeout);
      
      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) {
          fn.apply(this, lastArgs);
        }
      }, delay);
      
      if (callNow) {
        fn.apply(this, args);
      }
    };
    
    // 取消方法
    debounced.cancel = () => {
      clearTimeout(timeout);
      timeout = null;
    };
    
    return debounced;
  },

  /**
   * 节流函数
   * @param {Function} fn - 要节流的函数
   * @param {number} limit - 限制时间(毫秒)
   * @param {boolean} trailing - 是否执行尾部调用
   */
  throttle(fn, limit = 100, trailing = true) {
    let inThrottle;
    let lastArgs;
    let timeout;
    
    const throttled = function(...args) {
      lastArgs = args;
      
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        
        setTimeout(() => {
          inThrottle = false;
          if (trailing && lastArgs && lastArgs !== args) {
            fn.apply(this, lastArgs);
          }
        }, limit);
      }
    };
    
    throttled.cancel = () => {
      clearTimeout(timeout);
      inThrottle = false;
    };
    
    return throttled;
  },

  /**
   * 请求动画帧节流
   * 适用于滚动、动画等视觉更新
   */
  rafThrottle(fn) {
    let ticking = false;
    let lastArgs;
    
    return function(...args) {
      lastArgs = args;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          fn.apply(this, lastArgs);
          ticking = false;
        });
        ticking = true;
      }
    };
  },

  /**
   * 批量DOM操作
   * 使用文档片段批量插入，减少重排
   */
  batchDomOperations(operations) {
    const fragment = document.createDocumentFragment();
    const container = document.createElement('div');
    
    operations.forEach(op => {
      if (typeof op === 'function') {
        op(container);
      }
    });
    
    // 一次性插入
    return container.innerHTML;
  },

  /**
   * 虚拟列表渲染
   * 适用于大数据量列表
   */
  virtualList(container, items, itemHeight, renderFn, options = {}) {
    const {
      overscan = 5,        // 上下多渲染的数量
      containerHeight = 400
    } = options;
    
    let scrollTop = 0;
    let visibleItems = [];
    
    const totalHeight = items.length * itemHeight;
    
    const updateVisibleItems = () => {
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const endIndex = Math.min(
        items.length,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
      );
      
      visibleItems = items.slice(startIndex, endIndex).map((item, index) => ({
        data: item,
        index: startIndex + index,
        offset: (startIndex + index) * itemHeight
      }));
      
      render(visibleItems, totalHeight);
    };
    
    const render = (visible, total) => {
      const html = visible.map(item => `
        <div style="position: absolute; top: ${item.offset}px; height: ${itemHeight}px; width: 100%;">
          ${renderFn(item.data, item.index)}
        </div>
      `).join('');
      
      container.innerHTML = `
        <div style="position: relative; height: ${total}px;">
          ${html}
        </div>
      `;
    };
    
    // 节流滚动事件
    const handleScroll = this.throttle((e) => {
      scrollTop = e.target.scrollTop;
      updateVisibleItems();
    }, 16);  // ~60fps
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    updateVisibleItems();
    
    return {
      refresh(newItems) {
        items = newItems;
        updateVisibleItems();
      },
      destroy() {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  },

  /**
   * 资源预加载
   */
  preloadResources(resources) {
    const loaded = [];
    
    resources.forEach(resource => {
      if (resource.type === 'image') {
        const img = new Image();
        img.src = resource.src;
        loaded.push(new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        }));
      } else if (resource.type === 'script') {
        const script = document.createElement('script');
        script.src = resource.src;
        script.async = true;
        document.head.appendChild(script);
        loaded.push(new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        }));
      }
    });
    
    return Promise.all(loaded);
  },

  /**
   * 懒加载图片
   */
  lazyLoadImages(selector = 'img[data-src]') {
    if (!('IntersectionObserver' in window)) {
      // 降级：直接加载所有
      document.querySelectorAll(selector).forEach(img => {
        img.src = img.dataset.src;
      });
      return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    document.querySelectorAll(selector).forEach(img => {
      imageObserver.observe(img);
    });
  },

  /**
   * 内存管理器
   */
  memoryManager: {
    caches: new Map(),
    observers: new Set(),
    
    // 创建带LRU缓存的函数
    createCachedFunction(fn, maxSize = 100) {
      const cache = new Map();
      
      return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
          // 移动到末尾(LRU)
          const value = cache.get(key);
          cache.delete(key);
          cache.set(key, value);
          return value;
        }
        
        const result = fn.apply(this, args);
        
        // 清理旧缓存
        if (cache.size >= maxSize) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }
        
        cache.set(key, result);
        return result;
      };
    },
    
    // 注册可清理资源
    register(cleanupFn) {
      this.observers.add(cleanupFn);
    },
    
    // 清理所有资源
    cleanup() {
      this.observers.forEach(fn => {
        try {
          fn();
        } catch (e) {
          console.error('Cleanup error:', e);
        }
      });
      this.observers.clear();
      this.caches.clear();
    }
  },

  /**
   * 定时器管理器 - 防止内存泄漏
   */
  timerManager: {
    timers: new Set(),
    
    setTimeout(fn, delay, ...args) {
      const id = setTimeout(() => {
        this.timers.delete(id);
        fn(...args);
      }, delay);
      this.timers.add(id);
      return id;
    },
    
    setInterval(fn, delay, ...args) {
      const id = setInterval(fn, delay, ...args);
      this.timers.add(id);
      return id;
    },
    
    clear(id) {
      clearTimeout(id);
      clearInterval(id);
      this.timers.delete(id);
    },
    
    clearAll() {
      this.timers.forEach(id => {
        clearTimeout(id);
        clearInterval(id);
      });
      this.timers.clear();
    }
  },

  /**
   * 事件监听管理器
   */
  eventManager: {
    listeners: new Map(),
    
    add(element, event, handler, options = {}) {
      element.addEventListener(event, handler, options);
      
      const key = this.getElementKey(element);
      if (!this.listeners.has(key)) {
        this.listeners.set(key, []);
      }
      
      this.listeners.get(key).push({ event, handler, options });
    },
    
    remove(element, event, handler) {
      element.removeEventListener(event, handler);
      
      const key = this.getElementKey(element);
      const list = this.listeners.get(key) || [];
      const index = list.findIndex(l => l.event === event && l.handler === handler);
      
      if (index > -1) {
        list.splice(index, 1);
      }
    },
    
    removeAll(element) {
      const key = this.getElementKey(element);
      const list = this.listeners.get(key) || [];
      
      list.forEach(({ event, handler, options }) => {
        element.removeEventListener(event, handler, options);
      });
      
      this.listeners.delete(key);
    },
    
    getElementKey(element) {
      return element._eventKey || (element._eventKey = Math.random().toString(36));
    }
  },

  /**
   * 测量性能
   */
  measure(name, fn) {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
    
    const start = Date.now();
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = Date.now() - start;
        console.log(`[Performance] ${name}: ${duration}ms`);
        
        if (typeof performance !== 'undefined') {
          performance.mark(`${name}-end`);
          performance.measure(name, `${name}-start`, `${name}-end`);
        }
      });
    }
    
    const duration = Date.now() - start;
    console.log(`[Performance] ${name}: ${duration}ms`);
    
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    }
    
    return result;
  }
};

// 导出
export default PerformanceUtils;

// 全局可用
if (typeof window !== 'undefined') {
  window.PerformanceUtils = PerformanceUtils;
}
