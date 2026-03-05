# 🚀 AMBROSE Health v1.1.1 - AI健康教练

<p align="center">
  <img src="https://img.shields.io/badge/version-1.1.1-blue.svg" alt="version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license">
  <img src="https://img.shields.io/badge/stack-Vercel%20%2B%20Supabase%20%2B%20Stripe-orange.svg" alt="stack">
</p>

<p align="center">
  <strong>AI健康陪伴师 — 私人健康顾问 + 健身教练 + 养生管家</strong>
</p>

<p align="center">
  <a href="https://ambrose-chat.vercel.app">🌐 在线访问</a> |
  <a href="https://ambrose-chat.vercel.app/setup.html">🔧 配置助手</a> |
  <a href="./YOUR_TASKS.md">📋 快速开始</a>
</p>

---

## ✨ 功能特性

### 🎯 核心功能
- **AI 健康咨询** — 24小时在线健康问答
- **健康数据追踪** — 步数、热量、睡眠、饮水
- **运动记录** — 跑步、骑行、游泳等多种运动
- **饮食管理** — 热量统计、营养分析
- **体重管理** — BMI计算、趋势追踪

### 🔧 技术特性
- ✅ **PWA 渐进式应用** — 可安装到手机桌面，离线使用
- ✅ **Supabase 云端数据库** — 数据云端同步，换设备不丢失
- ✅ **Stripe 支付系统** — 支持会员订阅收款
- ✅ **自动 CI/CD 部署** — GitHub 推送自动更新
- ✅ **响应式设计** — 完美适配手机、平板、桌面

---

## 🚀 快速开始

### 只需要 5 分钟

1. **访问网站**
   ```
   https://ambrose-chat.vercel.app
   ```

2. **配置云端数据库**（可选，但强烈建议）
   - 查看 [>YOUR_TASKS.md](./YOUR_TASKS.md) 获取详细步骤
   - 或访问 [>配置助手](https://ambrose-chat.vercel.app/setup.html)

3. **开始使用**
   - 邀请码: `8888`
   - 专属验证码: `0812`（仅 BOSS Shao 需要）

---

## 📁 项目结构

```
ambrose-chat/
├── index.html              # 主应用页面
├── setup.html              # 配置助手页面
├── manifest.json           # PWA 配置
├── sw.js                   # Service Worker
│
├── api/                    # Vercel Serverless API
│   ├── chat.js             # AI 对话接口
│   ├── create-checkout-session.js  # Stripe 支付
│   └── stripe-webhook.js   # 支付回调
│
├── supabase-client.js      # Supabase 服务封装
├── stripe-service.js       # Stripe 支付 UI
├── sentry-monitor.js       # 错误监控
│
└── 文档/
    ├── YOUR_TASKS.md       # ⭐ 你只需要做的4件事
    ├── QUICK_SETUP.md      # 快速配置指南
    ├── SUPABASE_SETUP.md   # Supabase 详细配置
    ├── SUPABASE_INIT.sql   # 数据库初始化脚本
    ├── VERCEL_ENV.md       # Vercel 环境变量配置
    └── DEPLOY_V1.1.0.md    # 完整部署指南
```

---

## 🔧 配置说明

### 必需配置（云端数据库）

在 Vercel Dashboard → Settings → Environment Variables 中添加:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 可选配置（支付功能）

```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 💳 会员定价

| 版本 | 价格 | 功能 |
|------|------|------|
| 🆓 免费版 | $0 | AI健康咨询、基础数据追踪 |
| ⭐ 基础版 | $4.9/月 | + 每周健康报告 |
| 💎 专业版 | $9.9/月 | + 个性化训练计划、营养方案 |
| 👑 尊享版 | $19.9/月 | + 1对1 AI教练、家庭账号(5人) |

---

## 🛠️ 技术栈

- **前端**: HTML5 + CSS3 + Vanilla JavaScript
- **部署**: Vercel (Serverless)
- **数据库**: Supabase (PostgreSQL)
- **支付**: Stripe
- **监控**: Sentry (可选)
- **AI**: Moonshot AI API

---

## 📝 更新日志

### v1.1.1 (2026-03-06)
- ✅ 添加配置助手页面 (setup.html)
- ✅ 优化配置检测逻辑
- ✅ 添加详细配置文档

### v1.1.0 (2026-03-06)
- ✅ Supabase 云端数据库集成
- ✅ Stripe 支付系统
- ✅ PWA 离线应用支持
- ✅ GitHub Actions 自动部署
- ✅ Sentry 错误监控

### v1.0.0 (2026-03-05)
- ✅ AI 健康教练转型
- ✅ 赛博朋克风格界面
- ✅ 健康数据中心
- ✅ 身份识别系统

---

## 🤝 贡献

由 AMBROSE AI 为 BOSS Shao 专属打造。

---

## 📄 许可证

MIT License

---

<p align="center">
  <strong>"放心吧，哪怕世界忘了，我也替你记着。"</strong>
</p>
