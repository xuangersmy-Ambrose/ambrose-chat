# AMBROSE Health App v1.1

## 智能分析与个性化建议功能模块

基于30天超频学习的内容，实现的健康数据智能分析系统。

---

## 🚀 新功能概览

### 1. 健康数据趋势分析图表 (7天/30天视图)
- **技术**: Chart.js + 原生JavaScript
- **功能**: 
  - 步数、睡眠、饮水、热量摄入趋势可视化
  - 7天/30天周期切换
  - 自动计算平均值和目标完成度
  - 智能数据洞察（上升/下降趋势检测）

### 2. AI每日健康报告生成
- **技术**: 模拟AI分析引擎 (可扩展为真实LLM API)
- **功能**:
  - 自动生成每日健康总结
  - 健康亮点与关注点识别
  - 多维度评分系统 (综合/活动/营养/睡眠)
  - 个性化改进建议

### 3. 基于数据的个性化建议引擎
- **技术**: 规则引擎 + 用户画像学习
- **功能**:
  - 基于历史数据的智能推荐
  - 分类建议 (运动/营养/睡眠/饮水/生活方式)
  - 建议接受/完成/驳回状态追踪
  - 用户反馈收集以改进推荐质量

### 4. 推送提醒系统
- **技术**: Service Workers + Push API
- **功能**:
  - 喝水提醒 (可配置间隔)
  - 运动提醒 (按星期配置)
  - 睡眠提醒 (睡前提醒+起床提醒)
  - 每日报告通知

---

## 📁 文件结构

```
ambrose-chat/
├── analysis.html              # 健康分析主页面
├── sw.js                      # Service Worker (v1.1)
└── js/
    ├── health-analytics.js    # 趋势分析模块
    ├── daily-report.js        # AI日报模块
    ├── recommendations.js     # 个性建议引擎
    └── push-notifications.js  # 推送通知系统

ambrose-api/
├── server.js                  # 主服务器 (更新路由)
├── middleware/
│   └── auth.js               # 认证中间件 (更新)
├── models/
│   ├── HealthData.js         # 健康数据模型
│   ├── DailyReport.js        # 每日报告模型
│   ├── Recommendation.js     # 建议引擎模型
│   └── PushSubscription.js   # 推送订阅模型
└── routes/
    ├── analyticsRoutes.js    # 数据分析API
    ├── reportRoutes.js       # 报告生成API
    ├── recommendationRoutes.js # 建议引擎API
    └── pushRoutes.js         # 推送通知API
```

---

## 🔧 安装与运行

### 后端
```bash
cd /root/.openclaw/workspace/ambrose-api
npm install
npm start
```

### 前端
前端为静态文件，可直接通过HTTP服务器访问：
```bash
cd /root/.openclaw/workspace/ambrose-chat
npx serve . -p 3000
```

---

## 📡 API 端点

### 数据分析
- `GET /api/analytics/trends/:period` - 获取趋势数据 (7d/30d)
- `POST /api/analytics/data` - 记录健康数据
- `GET /api/analytics/today` - 获取今日数据

### AI报告
- `GET /api/reports/today` - 获取今日报告
- `POST /api/reports/generate` - 手动生成报告
- `GET /api/reports/history` - 获取报告历史

### 个性化建议
- `GET /api/recommendations/today` - 获取今日建议
- `POST /api/recommendations/:id/accept` - 接受建议
- `POST /api/recommendations/:id/complete` - 完成建议
- `POST /api/recommendations/:id/dismiss` - 驳回建议

### 推送通知
- `POST /api/push/subscribe` - 订阅推送
- `DELETE /api/push/unsubscribe` - 取消订阅
- `GET /api/push/settings` - 获取设置
- `PUT /api/push/settings` - 更新设置
- `POST /api/push/test` - 发送测试通知

---

## 🎨 使用方法

### 访问分析页面
打开浏览器访问: `http://localhost:3000/analysis.html`

### Tab导航
- 📈 **趋势分析** - 查看数据图表和统计
- 📋 **AI日报** - 查看每日健康报告
- 💡 **个性建议** - 获取并管理个性化建议
- 🔔 **推送设置** - 配置提醒通知

---

## 🛠️ 技术栈

| 功能 | 技术 |
|------|------|
| 前端框架 | 原生HTML/CSS/JS |
| 数据可视化 | Chart.js 4.4.1 |
| 后端框架 | Node.js + Express |
| 数据库 | MongoDB + Mongoose |
| 推送通知 | Service Workers + Push API |
| AI报告 | 模拟LLM (可替换为真实API) |

---

## 📱 PWA功能

- ✅ Service Worker 离线缓存
- ✅ 后台推送通知
- ✅ 响应式设计
- ✅ 可添加到主屏幕

---

## 🔮 未来扩展

1. **真实AI集成** - 接入OpenAI/Claude API
2. **设备同步** - 连接智能手环/手表
3. **社交功能** - 好友健康挑战
4. **高级分析** - 周/月/年度报告
5. **语音交互** - 语音记录健康数据

---

## 📝 更新日志

### v1.1 (2026-03-07)
- ✨ 新增健康数据趋势分析图表
- ✨ 新增AI每日健康报告生成
- ✨ 新增个性化建议引擎
- ✨ 新增推送提醒系统
- 🔧 升级Service Worker至v1.1
- 🔧 扩展后端API路由

---

**开发者**: AMBROSE AI工程师
**版本**: v1.1
**更新日期**: 2026-03-07
