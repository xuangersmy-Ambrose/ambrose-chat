// AMBROSE Health v6.0 - Stripe Webhook处理
// 处理支付成功、订阅更新等事件

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 处理事件
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      
      // 更新用户订阅状态
      const { userId, planId } = session.metadata;
      
      await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
          status: 'active',
          current_period_start: new Date().toISOString(),
          created_at: new Date().toISOString()
        });
      
      console.log(`✅ 用户 ${userId} 订阅了 ${planId} 计划`);
      break;
    }
    
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object;
      // 续费成功，更新订阅周期
      break;
    }
    
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      // 取消订阅，降级为免费版
      await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};
