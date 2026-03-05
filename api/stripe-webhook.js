// Vercel Serverless API - Stripe Webhook 处理
// 处理支付成功、订阅更新等事件
// 路径: /api/stripe-webhook.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Supabase 客户端 (用于更新用户会员状态)
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['stripe-signature'];
  let event;

  try {
    // 验证 webhook 签名
    const body = await getRawBody(req);
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 处理事件
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }
};

// 支付完成处理
async function handleCheckoutCompleted(session) {
  const customerEmail = session.customer_email;
  const plan = session.metadata?.plan;
  const subscriptionId = session.subscription;

  console.log(`✅ Checkout completed for ${customerEmail}, plan: ${plan}`);

  // 更新用户会员状态
  const { error } = await supabase
    .from('profiles')
    .update({
      membership: plan,
      membership_status: 'active',
      stripe_customer_id: session.customer,
      stripe_subscription_id: subscriptionId,
      membership_started_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('email', customerEmail);

  if (error) {
    console.error('Failed to update user membership:', error);
  }
}

// 定期扣款成功
async function handlePaymentSucceeded(invoice) {
  const subscriptionId = invoice.subscription;
  
  console.log(`✅ Payment succeeded for subscription: ${subscriptionId}`);

  // 可以在这里发送确认邮件或更新账单记录
}

// 扣款失败
async function handlePaymentFailed(invoice) {
  const subscriptionId = invoice.subscription;
  
  console.log(`❌ Payment failed for subscription: ${subscriptionId}`);

  // 更新用户状态
  await supabase
    .from('profiles')
    .update({
      membership_status: 'past_due',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscriptionId);
}

// 订阅取消
async function handleSubscriptionCancelled(subscription) {
  const subscriptionId = subscription.id;
  
  console.log(`🚫 Subscription cancelled: ${subscriptionId}`);

  await supabase
    .from('profiles')
    .update({
      membership_status: 'cancelled',
      membership: 'free',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscriptionId);
}

// 订阅更新
async function handleSubscriptionUpdated(subscription) {
  const subscriptionId = subscription.id;
  const status = subscription.status;
  
  console.log(`📝 Subscription updated: ${subscriptionId}, status: ${status}`);

  await supabase
    .from('profiles')
    .update({
      membership_status: status,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscriptionId);
}

// 获取原始请求体
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(Buffer.from(data));
    });
    req.on('error', reject);
  });
}
