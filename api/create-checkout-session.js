// Vercel Serverless API - 创建 Stripe Checkout Session
// 路径: /api/create-checkout-session.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  // CORS 设置
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, plan, successUrl, cancelUrl } = req.body;

    if (!priceId || !successUrl || !cancelUrl) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        required: ['priceId', 'successUrl', 'cancelUrl']
      });
    }

    // 创建 checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        plan: plan || 'unknown',
        source: 'ambrose-health-app'
      },
      // 收集客户邮箱
      customer_email: req.body.email || undefined,
      // 允许促销码
      allow_promotion_codes: true,
      // 自动扣税
      automatic_tax: { enabled: true },
      // 订阅设置
      subscription_data: {
        trial_period_days: 7, // 7天免费试用
        metadata: {
          plan: plan
        }
      },
      // 发票设置
      invoice_creation: {
        enabled: true
      }
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message
    });
  }
};
