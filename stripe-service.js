// Stripe 支付服务
// 支持订阅制会员和一次性购买

class StripeService {
  constructor() {
    // 这些配置需要从环境变量或配置文件读取
    this.publishableKey = window.STRIPE_PUBLIC_KEY || 'pk_test_your_key_here';
    this.stripe = null;
    this.elements = null;
    this.subscriptionPlans = {
      basic: {
        name: '基础版',
        price: 4.90,
        priceId: 'price_basic_monthly',
        features: ['AI健康咨询', '基础数据追踪', '每周健康报告']
      },
      pro: {
        name: '专业版',
        price: 9.90,
        priceId: 'price_pro_monthly',
        features: ['全部基础功能', '个性化训练计划', '营养方案定制', '优先客服支持']
      },
      premium: {
        name: '尊享版',
        price: 19.90,
        priceId: 'price_premium_monthly',
        features: ['全部专业功能', '1对1 AI教练', '家庭账号(5人)', '专属健康档案']
      }
    };
  }

  // 初始化 Stripe
  async init() {
    if (typeof Stripe === 'undefined') {
      await this.loadStripeJS();
    }
    this.stripe = Stripe(this.publishableKey);
    return this.stripe;
  }

  // 加载 Stripe JS
  loadStripeJS() {
    return new Promise((resolve, reject) => {
      if (document.getElementById('stripe-js')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'stripe-js';
      script.src = 'https://js.stripe.com/v3/';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // 显示会员计划选择
  showMembershipPlans() {
    const plansHTML = `
      <div class="membership-modal" id="membershipModal">
        <div class="membership-content">
          <div class="membership-header">
            <h2>升级会员</h2>
            <p>解锁更多 AI 健康功能</p>
            <button class="close-btn" onclick="stripeService.closeModal()">×</button>
          </div>
          <div class="plans-grid">
            ${Object.entries(this.subscriptionPlans).map(([key, plan]) => `
              <div class="plan-card ${key === 'pro' ? 'recommended' : ''}" data-plan="${key}">
                ${key === 'pro' ? '<div class="badge">推荐</div>' : ''}
                <h3>${plan.name}</h3>
                <div class="price">$${plan.price}<span>/月</span></div>
                <ul class="features">
                  ${plan.features.map(f => `<li>✓ ${f}</li>`).join('')}
                </ul>
                <button class="select-btn" onclick="stripeService.selectPlan('${key}')">
                  选择方案
                </button>
              </div>
            `).join('')}
          </div>
          <div class="guarantee">
            🔒 安全支付 · 随时取消 · 7天退款保障
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', plansHTML);
    this.addModalStyles();
  }

  // 选择计划
  async selectPlan(planKey) {
    const plan = this.subscriptionPlans[planKey];
    if (!plan) return;

    try {
      // 创建 checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          plan: planKey,
          successUrl: window.location.origin + '/?payment=success',
          cancelUrl: window.location.origin + '/?payment=cancel'
        })
      });

      const { sessionId } = await response.json();

      // 重定向到 Stripe Checkout
      const result = await this.stripe.redirectToCheckout({ sessionId });
      if (result.error) {
        throw result.error;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('支付初始化失败，请重试');
    }
  }

  // 关闭模态框
  closeModal() {
    const modal = document.getElementById('membershipModal');
    if (modal) {
      modal.remove();
    }
  }

  // 添加样式
  addModalStyles() {
    if (document.getElementById('stripe-styles')) return;
    
    const styles = `
      <style id="stripe-styles">
        .membership-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .membership-content {
          background: #1a1a1a;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 30px;
        }
        .membership-header {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }
        .membership-header h2 {
          font-size: 28px;
          margin-bottom: 8px;
        }
        .membership-header p {
          color: rgba(255,255,255,0.6);
        }
        .close-btn {
          position: absolute;
          top: 0;
          right: 0;
          background: none;
          border: none;
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          width: 40px;
          height: 40px;
        }
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .plan-card {
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          transition: all 0.3s;
        }
        .plan-card:hover {
          border-color: #00D4FF;
          transform: translateY(-4px);
        }
        .plan-card.recommended {
          border-color: #00D4FF;
          background: rgba(0,212,255,0.05);
        }
        .badge {
          position: absolute;
          top: -10px;
          right: 20px;
          background: #00D4FF;
          color: #000;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }
        .plan-card h3 {
          font-size: 20px;
          margin-bottom: 12px;
        }
        .price {
          font-size: 36px;
          font-weight: bold;
          color: #00D4FF;
          margin-bottom: 20px;
        }
        .price span {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
        }
        .features {
          list-style: none;
          margin-bottom: 24px;
        }
        .features li {
          padding: 8px 0;
          color: rgba(255,255,255,0.8);
          font-size: 14px;
        }
        .select-btn {
          width: 100%;
          padding: 14px;
          background: #00D4FF;
          color: #000;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .select-btn:hover {
          opacity: 0.9;
        }
        .guarantee {
          text-align: center;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        @media (max-width: 768px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }
          .membership-content {
            padding: 20px;
          }
        }
      </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
  }

  // 检查支付状态
  checkPaymentStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const payment = urlParams.get('payment');
    
    if (payment === 'success') {
      this.showSuccessMessage();
      // 清理 URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (payment === 'cancel') {
      this.showCancelMessage();
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  showSuccessMessage() {
    const toast = document.createElement('div');
    toast.className = 'payment-toast success';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="icon">🎉</span>
        <div>
          <strong>升级成功！</strong>
          <p>欢迎加入 AMBROSE Health 会员</p>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  showCancelMessage() {
    const toast = document.createElement('div');
    toast.className = 'payment-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="icon">ℹ️</span>
        <div>
          <strong>支付已取消</strong>
          <p>随时可以再次升级</p>
        </div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
}

// 初始化
const stripeService = new StripeService();

// 页面加载时检查支付状态
window.addEventListener('DOMContentLoaded', () => {
  stripeService.checkPaymentStatus();
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StripeService, stripeService };
} else {
  window.StripeService = StripeService;
  window.stripeService = stripeService;
}
