// Sentry 错误监控集成
// 自动捕获并上报 JavaScript 错误

class SentryMonitor {
  constructor() {
    this.dsn = window.SENTRY_DSN || null;
    this.environment = window.location.hostname === 'localhost' ? 'development' : 'production';
    this.initialized = false;
  }

  // 初始化 Sentry
  async init() {
    if (this.initialized || !this.dsn) return;

    // 加载 Sentry SDK
    await this.loadSentrySDK();
    
    // 初始化配置
    if (typeof Sentry !== 'undefined') {
      Sentry.init({
        dsn: this.dsn,
        environment: this.environment,
        release: 'ambrose-health@1.0.0',
        integrations: [
          new Sentry.BrowserTracing({
            tracePropagationTargets: ['localhost', /\/api\//]
          })
        ],
        tracesSampleRate: 0.1, // 10% 采样率
        replaysSessionSampleRate: 0.01, // 1% 会话录制
        replaysOnErrorSampleRate: 1.0, // 100% 错误时录制
        beforeSend: (event) => {
          // 过滤敏感信息
          if (event.exception) {
            this.filterSensitiveData(event);
          }
          return event;
        }
      });

      this.initialized = true;
      console.log('[Sentry] Initialized');
    }
  }

  // 加载 Sentry SDK
  loadSentrySDK() {
    return new Promise((resolve, reject) => {
      if (window.Sentry) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://browser.sentry-cdn.com/7.100.1/bundle.tracing.min.js';
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // 过滤敏感数据
  filterSensitiveData(event) {
    // 移除可能的敏感信息
    const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'creditCard'];
    
    if (event.request && event.request.headers) {
      delete event.request.headers['Authorization'];
      delete event.request.headers['Cookie'];
    }

    if (event.extra) {
      this.sanitizeObject(event.extra, sensitiveKeys);
    }
  }

  sanitizeObject(obj, sensitiveKeys) {
    for (const key in obj) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
        obj[key] = '[FILTERED]';
      } else if (typeof obj[key] === 'object') {
        this.sanitizeObject(obj[key], sensitiveKeys);
      }
    }
  }

  // 捕获错误
  captureError(error, context = {}) {
    if (!this.initialized) {
      console.error('[Sentry] Not initialized, logging to console:', error);
      return;
    }

    Sentry.captureException(error, {
      extra: context
    });
  }

  // 捕获消息
  captureMessage(message, level = 'info') {
    if (!this.initialized) return;
    Sentry.captureMessage(message, level);
  }

  // 设置用户信息
  setUser(user) {
    if (!this.initialized) return;
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.name
    });
  }

  // 性能监控 - 开始事务
  startTransaction(name, op) {
    if (!this.initialized) return null;
    return Sentry.startTransaction({ name, op });
  }

  // 面包屑记录
  addBreadcrumb(category, message, data = {}) {
    if (!this.initialized) return;
    Sentry.addBreadcrumb({
      category,
      message,
      data,
      level: 'info'
    });
  }
}

// 全局错误处理
window.onerror = function(msg, url, line, col, error) {
  if (window.sentryMonitor) {
    window.sentryMonitor.captureError(error || new Error(msg), {
      url,
      line,
      column: col
    });
  }
  return false;
};

window.onunhandledrejection = function(event) {
  if (window.sentryMonitor) {
    window.sentryMonitor.captureError(event.reason, {
      type: 'unhandledrejection'
    });
  }
};

// 初始化
const sentryMonitor = new SentryMonitor();

// 页面加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => sentryMonitor.init());
} else {
  sentryMonitor.init();
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SentryMonitor, sentryMonitor };
} else {
  window.SentryMonitor = SentryMonitor;
  window.sentryMonitor = sentryMonitor;
}
