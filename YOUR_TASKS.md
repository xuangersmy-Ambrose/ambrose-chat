# 🎯 BOSS Shao 专属：只需要你做的 4 件事

## 前置状态
✅ APP 代码已部署到 https://ambrose-chat.vercel.app
✅ PWA 离线功能已启用
✅ Stripe 支付代码已就绪
✅ 数据库连接代码已就绪
⏳ **等待你配置 Supabase 后启用云端功能**

---

## 第 1 步：创建 Supabase 账户（2分钟）

**做什么**：注册一个免费的数据库服务

**操作**：
1. 访问 https://supabase.com
2. 点击右上角 **Sign In** → 用 GitHub 登录
3. 点击 **New Project**
4. 填写：
   - Organization：随便填（如 boss-shao）
   - Project name：`ambrose-health`
   - Database password：设一个强密码（保存好！）
   - Region：**Singapore**
5. 点击 **Create new project**
6. 等待 1-2 分钟

**结果**：你会看到一个项目 Dashboard

---

## 第 2 步：复制三个值（30秒）

**做什么**：获取连接数据库的钥匙

**操作**：
1. 在 Supabase Dashboard，点击左侧 ⚙️ **Settings**
2. 点击 **API** 标签
3. 复制这三个值（点右侧复制按钮）：

```
Project URL: https://xxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（很长）
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...（很长）
```

**保存方式**：新建一个记事本，粘贴进去

---

## 第 3 步：创建数据库表（1分钟）

**做什么**：在数据库里建表存数据

**操作**：
1. 在 Supabase Dashboard，点击左侧 **SQL Editor**
2. 点击 **New query**
3. 粘贴这段代码：

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE, name TEXT, created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE daily_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, date DATE NOT NULL,
    steps INTEGER DEFAULT 0, calories INTEGER DEFAULT 0,
    sleep_hours DECIMAL(4,2), water_ml INTEGER DEFAULT 0,
    UNIQUE(user_id, date)
);

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL, type TEXT, duration_minutes INTEGER,
    calories_burned INTEGER, date DATE, created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_profiles" ON profiles FOR ALL USING (true);
CREATE POLICY "public_health" ON daily_health FOR ALL USING (true);
CREATE POLICY "public_exercises" ON exercises FOR ALL USING (true);
```

4. 点击 **Run**
5. 看到 "Success" 即完成

---

## 第 4 步：配置 Vercel 环境变量（1分钟）

**做什么**：告诉 Vercel 怎么连你的数据库

**操作**：
1. 访问 https://vercel.com/dashboard
2. 点击 **ambrose-chat**
3. 点击顶部 **Settings** 标签
4. 点击左侧 **Environment Variables**
5. 添加三个变量（逐个添加）：

| Name | Value |
|------|-------|
| `SUPABASE_URL` | 第2步复制的 Project URL |
| `SUPABASE_ANON_KEY` | 第2步复制的 anon public |
| `SUPABASE_SERVICE_KEY` | 第2步复制的 service_role |

6. 每个填完点 **Save**
7. 点左侧 **Deployments**
8. 找到最新的一条，点右侧 **...** → **Redeploy**
9. 等待 30 秒部署完成

---

## ✅ 验证成功

打开 https://ambrose-chat.vercel.app
按 F12 → Console，应该看到：

```
🚀 AMBROSE Health v1.1.1 启动中...
✅ Supabase 云服务已连接
✅ 启动完成
```

如果显示 "Supabase 未配置"，检查第4步的环境变量是否填对。

---

## 📱 完成后你的 APP 拥有

- ✅ 云端数据存储（换设备数据不丢）
- ✅ PWA 离线使用（没网也能用）
- ✅ Stripe 支付功能（配置密钥后可收款）
- ✅ 自动部署（GitHub 推送自动更新）

**预计总耗时：5分钟**

---

**需要协助？**
- 卡在第1步：告诉我，我截图指导
- 卡在第3步：把报错发给我
- 卡在第4步：检查环境变量是否有多余空格
