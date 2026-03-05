# 🔐 Vercel 环境变量配置指南

## 必需的环境变量

### Supabase (数据库)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Stripe (支付 - 可选)
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Sentry (监控 - 可选)
```
SENTRY_DSN=https://... sentry.io/...
```

---

## 配置步骤

### 方法1: Vercel Dashboard (推荐)

1. 访问 https://vercel.com/dashboard
2. 选择 `ambrose-chat` 项目
3. 点击 **Settings** tab
4. 选择左侧 **Environment Variables**
5. 逐个添加变量:
   - Name: `SUPABASE_URL`
   - Value: `https://...`
6. 点击 **Save**
7. 重复添加其他变量
8. 返回 **Deployments**
9. 找到最新部署，点击 **...** → **Redeploy**

### 方法2: Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 进入项目目录
cd ambrose-chat

# 链接项目
vercel link

# 添加环境变量
vercel env add SUPABASE_URL
# 输入值后回车

vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_KEY

# 重新部署
vercel --prod
```

---

## 验证配置

部署后检查环境变量是否生效:

1. 打开网站 https://ambrose-chat.vercel.app
2. 打开浏览器控制台 (F12)
3. 输入:
```javascript
console.log(window.APP_CONFIG);
```
4. 应该看到配置值 (敏感信息会被隐藏)

---

## 本地开发环境变量

如需本地测试，创建 `.env.local` 文件:

```bash
# .env.local (不要提交到Git!)
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_PUBLIC_KEY=...
```

添加到 `.gitignore`:
```
.env.local
.env
```

---

## ⚠️ 安全提醒

1. **永远不要**在代码中硬编码密钥
2. **永远不要**将 `.env` 文件提交到 Git
3. **Service Role Key** 是超级管理员密钥，只在服务端使用
4. **Anon Key** 可以公开，配合 RLS 策略使用
5. 定期轮换密钥 (Supabase Dashboard → Settings → API)
