/**
 * AMBROSE Health - 全局配置文件
 * 敏感信息从此文件读取，不再硬编码
 */

const AMBROSE_CONFIG = {
  // API基础URL
  apiUrl: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://api.ambrose.health/api',
  
  // VAPID公钥（用于推送通知）- 应从环境变量或后端获取
  // 生产环境不应在前端暴露此密钥
  vapidPublicKey: '',
  
  // 邀请码和主验证码（应从后端验证）
  inviteCode: '8888',
  masterCode: '0812',
  
  // Stripe公钥（测试环境）
  stripePublicKey: 'pk_test_your_key_here',
  
  // 调试模式
  debug: window.location.hostname === 'localhost',
  
  // 版本号
  version: '1.2.0'
};

// 全局挂载
window.AMBROSE_CONFIG = AMBROSE_CONFIG;

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AMBROSE_CONFIG;
}
