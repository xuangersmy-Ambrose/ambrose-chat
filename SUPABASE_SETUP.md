# 🗄️ Supabase 配置完全指南

## 第一步：创建 Supabase 项目

### 1.1 注册/登录
访问: https://supabase.com
- 点击 "Start your project"
- 使用 GitHub 账号登录

### 1.2 创建新项目
1. 点击 "New Project"
2. 填写信息:
   - **Organization**: 选择或创建 (例如: boss-shao)
   - **Project Name**: `ambrose-health`
   - **Database Password**: 设置强密码 (保存好!)
   - **Region**: `Singapore` (离中国最近)
3. 点击 "Create new project"
4. 等待 1-2 分钟项目创建完成

---

## 第二步：获取 API 凭证

项目创建后，进入 Project Dashboard:

### 2.1 找到 Project URL 和 Anon Key
1. 点击左侧菜单 **Project Settings** (⚙️)
2. 选择 **API** 标签
3. 复制以下信息:

```
Project URL: https://xxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (很长的字符串)
service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (保密!)
```

**保存好这三个值，下面要用!**

---

## 第三步：创建数据库表

### 3.1 打开 SQL Editor
1. 点击左侧菜单 **SQL Editor**
2. 点击 **New query**

### 3.2 执行建表 SQL
复制 `supabase-schema.sql` 的全部内容，粘贴到 SQL Editor，然后点击 **Run**。

这会创建以下表:
- `profiles` - 用户档案
- `daily_health` - 每日健康数据
- `exercises` - 运动记录
- `meals` - 饮食记录
- `health_goals` - 健康目标
- `subscriptions` - 会员订阅

### 3.3 验证表创建成功
在左侧菜单点击 **Table Editor**，应该能看到所有创建的表。

---

## 第四步：配置 Vercel 环境变量

### 4.1 进入 Vercel Dashboard
访问: https://vercel.com/dashboard
找到 `ambrose-chat` 项目

### 4.2 添加环境变量
1. 点击 **Settings** → **Environment Variables**
2. 添加以下变量:

```
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. 点击 **Save**
4. 重新部署项目 (Deployments → 最新部署 → Redeploy)

---

## 第五步：测试连接

### 5.1 打开浏览器控制台
访问: https://ambrose-chat.vercel.app
打开开发者工具 (F12) → Console

### 5.2 检查连接状态
应该看到类似输出:
```
✅ Supabase 云服务已连接
🚀 AMBROSE Health v1.1.0 已启动
```

### 5.3 测试数据写入
在 Console 中执行:
```javascript
// 测试保存数据
await supabaseService.saveDailyHealth('test-user', '2026-03-06', {
    steps: 10000,
    calories: 500,
    sleep_hours: 8,
    water_ml: 2000
});
```

---

## 📊 Supabase 免费额度

| 资源 | 免费额度 | 备注 |
|------|---------|------|
| 数据库 | 500MB | 足够1000用户使用 |
| 存储 | 1GB | 用户头像等 |
| 带宽 | 2GB/月 | 超出后 $0.09/GB |
| API调用 | 无限 | 但有速率限制 |
| 实时连接 | 200 concurrent | 同时在线 |

**升级到 Pro ($25/月)**: 8GB 数据库 + 100GB 存储 + 250GB 带宽

---

## 🔧 常见问题

### Q: 连接失败怎么办?
检查:
1. 环境变量是否正确设置
2. URL 是否包含 `https://`
3. Anon Key 是否完整复制

### Q: RLS 策略是什么?
Row Level Security - 行级安全策略，确保用户只能访问自己的数据。

### Q: 如何备份数据?
Supabase 自动每日备份，也可以手动导出:
1. SQL Editor → New Query
2. 运行 `pg_dump` 或使用 Dashboard 导出功能

---

## ✅ 配置清单

- [ ] 创建 Supabase 项目
- [ ] 复制 Project URL
- [ ] 复制 Anon Key
- [ ] 复制 Service Role Key
- [ ] 执行 SQL 建表
- [ ] 配置 Vercel 环境变量
- [ ] 重新部署
- [ ] 测试连接

**完成以上步骤后，APP 就拥有了完整的云端数据库能力！**
