# AMBROSE v2.0 部署修复说明

## 问题
用户反馈：主页卡住，按钮点击没反应

## 修复内容
1. ✅ 添加了缺失的 empathy-response-library.js 引用
2. ✅ 重新部署到生产环境

## 访问地址
- https://ambrose-chat.vercel.app

## 如果仍有问题，请尝试：
1. **强制刷新页面**：Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)
2. **清除浏览器缓存**：
   - Chrome: F12 → Application → Storage → Clear site data
   - 或 Ctrl+Shift+Delete → 清除缓存
3. **无痕模式打开**：Ctrl+Shift+N (Chrome)
4. **手机用户**：
   - 浏览器设置 → 清除缓存
   - 或卸载重装浏览器

## 技术原因
Service Worker 缓存了旧版本 index.html，导致新旧代码冲突。

## 验证方法
打开页面后按 F12 → Console，应该看到：
```
[AMBROSE] v4.0 initialized - Health Core ready
```
如果没有看到这条日志，说明还是旧版本。
