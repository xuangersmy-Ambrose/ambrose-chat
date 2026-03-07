/**
 * AMBROSE Health - API客户端
 * 统一处理所有API请求
 */

class ApiClient {
  constructor() {
    this.baseUrl = window.AMBROSE_CONFIG?.apiUrl || 'https://ambrose-api.onrender.com';
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  getAuthToken() {
    return localStorage.getItem('ambrose_token') || '';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getAuthToken();
    
    const config = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.text();
        throw new ApiError(response.status, error);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(0, error.message);
    }
  }

  // GET请求
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST请求
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT请求
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE请求
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

/**
 * API错误类
 */
class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

/**
 * 健康数据API
 */
class HealthApi {
  constructor(client) {
    this.client = client;
  }

  // 获取健康数据
  async getData(days = 7) {
    return this.client.get(`/api/health/data?days=${days}`);
  }

  // 保存健康数据
  async saveData(type, data) {
    return this.client.post('/api/health/data', { type, data });
  }

  // 获取分析报告
  async getAnalytics(days = 7) {
    return this.client.get(`/api/health/analytics?days=${days}`);
  }

  // 获取每日报告
  async getDailyReport() {
    return this.client.get('/api/health/report');
  }

  // 获取目标
  async getGoals() {
    return this.client.get('/api/health/goals');
  }

  // 更新目标
  async updateGoals(goals) {
    return this.client.put('/api/health/goals', goals);
  }
}

/**
 * 推送通知API
 */
class PushApi {
  constructor(client) {
    this.client = client;
  }

  // 订阅推送
  async subscribe(subscription) {
    return this.client.post('/api/push/subscribe', subscription);
  }

  // 取消订阅
  async unsubscribe() {
    return this.client.post('/api/push/unsubscribe');
  }

  // 更新提醒设置
  async updateSettings(settings) {
    return this.client.put('/api/settings/reminders', settings);
  }
}

/**
 * 用户API
 */
class UserApi {
  constructor(client) {
    this.client = client;
  }

  // 登录
  async login(credentials) {
    return this.client.post('/api/auth/login', credentials);
  }

  // 注册
  async register(data) {
    return this.client.post('/api/auth/register', data);
  }

  // 获取用户信息
  async getProfile() {
    return this.client.get('/api/user/profile');
  }

  // 更新用户信息
  async updateProfile(data) {
    return this.client.put('/api/user/profile', data);
  }
}

// 创建单例
const apiClient = new ApiClient();
const healthApi = new HealthApi(apiClient);
const pushApi = new PushApi(apiClient);
const userApi = new UserApi(apiClient);

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApiClient, ApiError, HealthApi, PushApi, UserApi, apiClient, healthApi, pushApi, userApi };
}
