/**
 * AMBROSE Health - API Client
 * 统一的API客户端 - 处理所有后端请求
 */

const API_CONFIG = {
  BASE_URL: window.AMBROSE_CONFIG?.apiUrl || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000
};

class ApiClient {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.pendingRequests = new Map();
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  /**
   * 获取认证Token
   * @returns {string}
   */
  getAuthToken() {
    return localStorage.getItem('ambrose_token') || '';
  }

  /**
   * 获取默认请求头
   * @returns {object}
   */
  getDefaultHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  /**
   * 添加请求拦截器
   * @param {Function} interceptor - (config) => config
   */
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * 添加响应拦截器
   * @param {Function} interceptor - (response) => response
   */
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * 执行请求拦截器
   * @param {object} config 
   * @returns {object}
   */
  async runRequestInterceptors(config) {
    let result = config;
    for (const interceptor of this.requestInterceptors) {
      result = await interceptor(result);
    }
    return result;
  }

  /**
   * 执行响应拦截器
   * @param {object} response 
   * @returns {object}
   */
  async runResponseInterceptors(response) {
    let result = response;
    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result);
    }
    return result;
  }

  /**
   * 生成请求唯一标识
   * @param {string} url 
   * @param {object} options 
   * @returns {string}
   */
  getRequestKey(url, options) {
    return `${options.method || 'GET'}:${url}:${JSON.stringify(options.body || '')}`;
  }

  /**
   * 核心请求方法
   * @param {string} endpoint - API端点
   * @param {object} options - 请求选项
   * @returns {Promise<object>}
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const requestKey = this.getRequestKey(url, options);

    // 防止重复请求
    if (this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey);
    }

    const requestPromise = this.executeRequest(url, options, requestKey);
    this.pendingRequests.set(requestKey, requestPromise);

    try {
      const result = await requestPromise;
      return result;
    } finally {
      this.pendingRequests.delete(requestKey);
    }
  }

  /**
   * 执行请求（带重试逻辑）
   * @param {string} url 
   * @param {object} options 
   * @param {string} requestKey 
   * @param {number} retryCount 
   * @returns {Promise<object>}
   */
  async executeRequest(url, options, requestKey, retryCount = 0) {
    try {
      // 应用请求拦截器
      let config = {
        method: 'GET',
        headers: this.getDefaultHeaders(),
        ...options
      };
      config = await this.runRequestInterceptors(config);

      // 创建AbortController用于超时
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // 应用响应拦截器
      const processedResponse = await this.runResponseInterceptors(response);

      // 处理HTTP错误
      if (!processedResponse.ok) {
        const errorData = await processedResponse.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${processedResponse.status}: ${processedResponse.statusText}`,
          processedResponse.status,
          errorData
        );
      }

      // 解析响应数据
      const data = await processedResponse.json();
      return { success: true, data, status: processedResponse.status };

    } catch (error) {
      // 网络错误重试
      if (retryCount < API_CONFIG.RETRY_COUNT && this.isRetryableError(error)) {
        await this.delay(API_CONFIG.RETRY_DELAY * Math.pow(2, retryCount));
        return this.executeRequest(url, options, requestKey, retryCount + 1);
      }

      // 处理特定错误
      if (error.name === 'AbortError') {
        throw new ApiError('请求超时，请检查网络连接', 408, {});
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(error.message || '网络请求失败', 0, {});
    }
  }

  /**
   * 判断错误是否可重试
   * @param {Error} error 
   * @returns {boolean}
   */
  isRetryableError(error) {
    return error.name === 'TypeError' || // 网络错误
           error.name === 'AbortError' || // 超时
           (error.status >= 500 && error.status < 600); // 服务器错误
  }

  /**
   * 延迟函数
   * @param {number} ms 
   * @returns {Promise<void>}
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ============ 快捷方法 ============

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

/**
 * 自定义API错误类
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * 创建API端点专用方法
 */
const createApiEndpoints = (apiClient) => ({
  // 用户相关
  user: {
    getProfile: () => apiClient.get('/user/profile'),
    updateProfile: (data) => apiClient.put('/user/profile', data),
  },

  // 健康数据
  health: {
    getToday: () => apiClient.get('/health/today'),
    updateToday: (data) => apiClient.put('/health/today', data),
    getHistory: (days = 7) => apiClient.get(`/health/history?days=${days}`),
  },

  // 报告
  reports: {
    getToday: () => apiClient.get('/reports/today'),
    getHistory: (limit = 7) => apiClient.get(`/reports/history?limit=${limit}`),
    generate: () => apiClient.post('/reports/generate'),
    markAsRead: (id) => apiClient.patch(`/reports/${id}/read`),
  },

  // 建议
  recommendations: {
    getToday: () => apiClient.get('/recommendations/today'),
    accept: (id) => apiClient.post(`/recommendations/${id}/accept`),
    complete: (id) => apiClient.post(`/recommendations/${id}/complete`),
    dismiss: (id) => apiClient.post(`/recommendations/${id}/dismiss`),
  },

  // 推送通知
  push: {
    getSettings: () => apiClient.get('/push/settings'),
    updateSettings: (data) => apiClient.put('/push/settings', data),
    subscribe: (data) => apiClient.post('/push/subscribe', data),
    unsubscribe: () => apiClient.delete('/push/unsubscribe'),
    test: (type) => apiClient.post('/push/test', { type }),
  },

  // 分析
  analytics: {
    getTrends: (period = '7d') => apiClient.get(`/analytics/trends/${period}`),
  }
});

// 初始化并导出
const apiClient = new ApiClient();
const api = createApiEndpoints(apiClient);

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApiClient, ApiError, apiClient, api, API_CONFIG };
} else {
  window.ApiClient = ApiClient;
  window.ApiError = ApiError;
  window.apiClient = apiClient;
  window.api = api;
  window.API_CONFIG = API_CONFIG;
}
