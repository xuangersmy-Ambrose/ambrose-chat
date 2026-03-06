# 🚨 紧急重新部署方案

## 步骤 1: 删除现有 Vercel 项目

1. 访问 https://vercel.com/dashboard
2. 找到 `ambrose-chat` 项目
3. 点击 Settings → General
4. 滚动到底部点击 **Delete Project**
5. 确认删除

## 步骤 2: 重新导入 GitHub 仓库

1. 点击 **Add New Project**
2. 选择 **Import Git Repository**
3. 找到 `xuangersmy-Ambrose/ambrose-chat`
4. 点击 **Import**

## 步骤 3: 配置部署

Framework Preset: 选择 **Other** (纯静态网站)
Root Directory: 保持默认 (./)
Build Command: 留空
Output Directory: 留空

点击 **Deploy**

## 步骤 4: 配置环境变量 (可选)

部署完成后，进入 Settings → Environment Variables：
- 如需 Supabase，添加 `SUPABASE_URL` 等变量
- 如需 Stripe，添加 `STRIPE_PUBLIC_KEY` 等变量

## 步骤 5: 验证

访问新的域名（通常是 ambrose-chat-xxx.vercel.app）

---

## 替代方案: 使用 Netlify (更稳定)

如果不想用 Vercel，可以部署到 Netlify：

1. 访问 https://app.netlify.com
2. 点击 Add new site → Import an existing project
3. 选择 GitHub → ambrose-chat
4. 点击 Deploy site

---

需要我提供更详细的截图指导吗？
