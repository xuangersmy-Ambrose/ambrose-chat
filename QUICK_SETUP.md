# 🔧 快速配置指南

## 当前状态
- ✅ 代码已推送到 GitHub (v1.1.0)
- ✅ Vercel 自动部署已触发
- ⏳ 等待配置 Supabase 和 Vercel 环境变量

---

## 5分钟快速配置

### 1. 创建 Supabase 项目 (2分钟)

访问 https://supabase.com
1. 点击 "New Project"
2. 名称填: `ambrose-health`
3. 地区选: `Singapore`
4. 设置密码并保存
5. 等待创建完成

### 2. 获取凭证 (30秒)

项目创建后:
1. 点击左侧 **Settings** ⚙️
2. 点击 **API**
3. 复制这三个值:
   - `Project URL`: https://xxx.supabase.co
   - `anon public`: eyJhbGci...
   - `service_role`: eyJhbGci... (保密!)

### 3. 创建数据库表 (1分钟)

1. 点击左侧 **SQL Editor**
2. 点击 **New query**
3. 粘贴下面内容并执行:

```sql
-- 简化版数据库表
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    name TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    steps INTEGER DEFAULT 0,
    calories INTEGER DEFAULT 0,
    sleep_hours DECIMAL(4,2),
    water_ml INTEGER DEFAULT 0,
    UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    type TEXT,
    duration_minutes INTEGER,
    calories_burned INTEGER,
    date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. 配置 Vercel 环境变量 (1分钟)

访问 https://vercel.com/dashboard
1. 找到 `ambrose-chat` 项目
2. 点击 **Settings** → **Environment Variables**
3. 添加三个变量:

```
SUPABASE_URL=https://你的项目.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi... (anon public)
SUPABASE_SERVICE_KEY=eyJhbGciOi... (service_role)
```

4. 点击 **Save**
5. 返回 **Deployments** → 点击 **Redeploy**

---

## ✅ 验证配置

部署完成后:
1. 访问 https://ambrose-chat.vercel.app
2. 按 F12 打开控制台
3. 应该看到: `✅ Supabase 云服务已连接`

---

## 支付功能 (可选)

如需 Stripe 支付，还需配置:
```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 需要帮助？

查看详细文档:
- `DEPLOY_V1.1.0.md` - 完整部署指南
- `supabase-schema.sql` - 完整数据库结构

**完成以上4步后，APP就拥有完整的云端数据库能力！**
