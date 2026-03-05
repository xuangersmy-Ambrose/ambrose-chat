# AMBROSE 部署保障指南

## 🎯 目标：时刻保证APP更新到最新更改

---

## 快速部署命令（每次修改后执行）

```bash
cd /root/.openclaw/workspace/ambrose-chat
./deploy.sh
```

---

## 🔄 自动化部署流程

### 方式1：一键部署脚本（推荐）

已创建 `deploy.sh`，执行以下操作：
1. ✅ 检查并提交本地更改
2. ✅ 推送到GitHub
3. ✅ 等待Vercel构建
4. ✅ 验证部署结果

### 方式2：Git提交后自动触发

Vercel已配置自动部署：
```
GitHub推送 → Vercel自动检测 → 自动构建 → 自动部署
```

---

## 📋 每次修改后的标准流程

### 步骤1：修改代码
编辑 `index.html` 或其他文件

### 步骤2：执行部署
```bash
./deploy.sh
```

### 步骤3：验证更新（30秒后）
访问：https://ambrose-chat.vercel.app

---

## 🔍 验证部署成功的方法

### 方法1：查看Vercel Dashboard
访问：https://vercel.com/dashboard
- 找到 `ambrose-chat` 项目
- 查看最新部署状态（Ready = 成功）

### 方法2：查看GitHub提交
访问：https://github.com/xuangersmy-Ambrose/ambrose-chat/commits/master
- 确认最新commit已推送

### 方法3：浏览器验证
1. 打开：https://ambrose-chat.vercel.app
2. 强制刷新：Ctrl+F5（Windows）或 Cmd+Shift+R（Mac）
3. 检查新功能是否生效

---

## ⚡ 加速部署的技巧

### 技巧1：使用Cache Busting
在URL后添加时间戳强制刷新：
```
https://ambrose-chat.vercel.app?v=1
https://ambrose-chat.vercel.app?v=2
```

### 技巧2：无痕模式测试
新开无痕窗口访问，避免缓存干扰

### 技巧3：手机测试
微信/浏览器扫码访问，确保移动端生效

---

## 🛡️ 防止部署失败的检查清单

- [ ] 本地代码已保存
- [ ] `git add -A` 已执行
- [ ] `git commit` 已执行
- [ ] `git push` 成功
- [ ] Vercel状态显示 Ready
- [ ] 浏览器强制刷新后生效

---

## 🚨 部署失败排查

### 问题1：推送失败
**解决**：检查网络连接，重新执行 `./deploy.sh`

### 问题2：Vercel构建失败
**解决**：
1. 访问 https://vercel.com/dashboard
2. 查看构建日志
3. 修复错误后重新部署

### 问题3：浏览器显示旧版本
**解决**：
```bash
# 方法1：强制刷新
Ctrl + F5

# 方法2：清除缓存
浏览器设置 → 清除浏览数据 → 缓存

# 方法3：无痕模式
新开隐私窗口访问
```

---

## 📊 部署监控

### 当前部署状态

| 项目 | 状态 |
|------|------|
| GitHub最新Commit | [查看](https://github.com/xuangersmy-Ambrose/ambrose-chat/commits/master) |
| Vercel部署状态 | [查看](https://vercel.com/dashboard) |
| 线上APP | [访问](https://ambrose-chat.vercel.app) |

---

## 💡 最佳实践

1. **小步快跑**：每次修改后立刻部署
2. **验证再下一步**：确保当前更改生效后再继续
3. **保持Git干净**：及时提交，避免大量未提交更改
4. **测试后再提交**：本地先测试通过再push

---

## 📝 快捷命令

```bash
# 快速提交并部署
git add -A && git commit -m "更新" && git push origin master

# 查看部署状态
curl -s https://ambrose-chat.vercel.app | head -5

# 强制刷新（在服务器上）
./deploy.sh && echo "部署完成，请刷新浏览器"
```

---

**记住：每次修改后执行 `./deploy.sh` 即可确保APP更新！**
