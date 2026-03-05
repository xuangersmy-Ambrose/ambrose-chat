# 🚀 AMBROSE Health v1.1.0 全功能实战部署

**版本**: v1.1.0 (全功能版)  
**部署时间**: 2026-03-06  
**状态**: 开发完成，等待配置

---

## ✅ 已完成功能

### 1. Supabase 云端数据库 ✅
- 文件: `supabase-client.js`, `supabase-schema.sql`
- 功能: 用户认证、健康数据、运动记录、实时订阅
- 状态: 代码完成，需配置项目URL和Key

### 2. Stripe 支付系统 ✅
- 文件: `stripe-service.js`, `api/create-checkout-session.js`, `api/stripe-webhook.js`
- 功能: 会员订阅、3档定价、7天试用、Webhook处理
- 状态: 代码完成，需配置Stripe密钥

### 3. GitHub Actions 自动部署 ✅
- 文件: `.github/workflows/deploy.yml`
- 功能: 自动测试、自动部署到Vercel、预览部署
- 状态: 配置完成，需设置Secrets

### 4. PWA 离线应用 ✅
- 文件: `manifest.json`, `sw.js`
- 功能: 离线访问、添加到主屏幕、推送通知
- 状态: 完全可用

### 5. Sentry 错误监控 ✅
- 文件: `sentry-monitor.js`
- 功能: 错误捕获、性能追踪、用户反馈
- 状态: 代码完成，可选配置DSN

---

## 🔧 部署步骤

### 第一步: 配置 Vercel 环境变量

在 Vercel Dashboard → Project Settings → Environment Variables 中添加:

```
# Supabase (必需)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Stripe (支付功能)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLIC_KEY=pk_test_...

# Sentry (可选)
SENTRY_DSN=https://... sentry.io/...

# 其他
NODE_ENV=production
```

### 第二步: 配置 GitHub Secrets

在 GitHub Repo → Settings → Secrets and variables → Actions 中添加:

```
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
```

获取方式:
```bash
npx vercel login
npx vercel link
# 查看 .vercel/project.json 获取 orgId 和 projectId
npx vercel tokens
```

### 第三步: 创建 Supabase 数据库表

在 Supabase SQL Editor 中执行 `supabase-schema.sql` 中的SQL语句。

### 第四步: 配置 Stripe Webhook

1. 在 Stripe Dashboard → Developers → Webhooks 中添加端点:
   - URL: `https://your-domain.vercel.app/api/stripe-webhook`
   - 选择事件:
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `customer.subscription.deleted`
     - `customer.subscription.updated`

2. 复制 Webhook Secret 到环境变量

### 第五步: 部署

```bash
# 推送代码触发自动部署
git add .
git commit -m "v1.1.0: 全功能实战版"
git push origin main

# 或者手动部署
vercel --prod
```

---

## 📱 PWA 使用

### 添加到主屏幕 (iOS Safari)
1. 用 Safari 打开 https://ambrose-chat.vercel.app
2. 点击底部分享按钮
3. 选择「添加到主屏幕」
4. 在主屏幕点击图标启动

### 添加到主屏幕 (Android Chrome)
1. 用 Chrome 打开网站
2. 点击菜单 → 添加到主屏幕
3. 确认安装

---

## 💳 会员定价

| 版本 | 价格 | 功能 |
|-----|------|------|
| 免费版 | $0 | AI健康咨询、基础数据追踪 |
| 基础版 | $4.9/月 | + 每周健康报告 |
| 专业版 | $9.9/月 | + 个性化训练计划、营养方案 |
| 尊享版 | $19.9/月 | + 1对1 AI教练、家庭账号(5人) |

---

## 📊 文件结构

```
ambrose-chat/
├── index.html              # 主页面 (已集成所有功能)
├── manifest.json           # PWA 配置
├── sw.js                   # Service Worker
├── package.json            # 依赖配置
├── vercel.json             # Vercel 部署配置
│
├── supabase-client.js      # Supabase 服务封装
├── stripe-service.js       # Stripe 支付服务
├── sentry-monitor.js       # 错误监控
│
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 自动部署
│
├── api/
│   ├── chat.js             # AI 对话 API
│   ├── create-checkout-session.js  # Stripe 结账
│   └── stripe-webhook.js   # Stripe Webhook
│
└── supabase-schema.sql     # 数据库表结构
```

---

## 🎯 下一步

1. 提供 Supabase 项目配置
2. 提供 Stripe 账户信息 (或使用测试模式)
3. 执行部署
4. 测试支付流程

**等待你的配置信息，然后一键部署！**
