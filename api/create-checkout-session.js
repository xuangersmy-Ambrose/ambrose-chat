// AMBROSE Health v6.0 - Stripe支付后端API
// 部署到Vercel Serverless Functions

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 创建Checkout Session
module.exports = async (req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { planId, userId } = req.body;
    
    // 价格配置
    const priceMap = {
      'pro': process.env.STRIPE_PRICE_PRO || 'price_pro_monthly',
      'premium': process.env.STRIPE_PRICE_PREMIUM || 'price_premium_monthly'
    };
    
    const priceId = priceMap[planId];
    if (!priceId) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // 创建Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: userId, // 用户邮箱
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/pricing`,
      metadata: {
        userId: userId,
        planId: planId
      }
    });

    res.status(200).json({ sessionId: session.id });
    
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
