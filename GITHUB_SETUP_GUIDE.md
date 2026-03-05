# GitHub推送完整指南

## 步骤1：在GitHub创建仓库

1. 打开 https://github.com/new
2. 输入仓库名：`ambrose-chat`
3. 选择 **Public**（公开）
4. 不要勾选 "Add a README file"
5. 点击 **Create repository**

## 步骤2：复制仓库地址

创建后，复制这个地址（HTTPS）：
```
https://github.com/你的用户名/ambrose-chat.git
```

例如：
```
https://github.com/bossshao/ambrose-chat.git
```

## 步骤3：本地配置远程仓库

```bash
cd /root/.openclaw/workspace/ambrose-chat

# 添加远程仓库（用你的实际用户名替换）
git remote add origin https://github.com/你的用户名/ambrose-chat.git

# 验证是否添加成功
git remote -v
# 应该显示：
# origin  https://github.com/你的用户名/ambrose-chat.git (fetch)
# origin  https://github.com/你的用户名/ambrose-chat.git (push)
```

## 步骤4：推送到GitHub

```bash
# 推送代码
git push -u origin master

# 会提示输入用户名和密码（或Token）
# 用户名：你的GitHub用户名
# 密码：GitHub Personal Access Token（不是登录密码）
```

### 关于Token（如果没有配置过）

GitHub不再支持密码登录，需要用Token：

1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 勾选 **repo** 权限
4. 点击 **Generate token**
5. 复制生成的token（只显示一次）

用这个token代替密码。

## 步骤5：Vercel自动部署

推送成功后：
1. Vercel会自动检测GitHub的变化
2. 自动开始重新部署（约1-2分钟）
3. 部署完成后刷新 https://ambrose-chat.vercel.app

## 验证是否成功

```bash
# 查看提交记录
git log --oneline -3

# 查看远程状态
git status
# 应该显示：nothing to commit, working tree clean
```

---

**完成后告诉我，我帮你验证！**
