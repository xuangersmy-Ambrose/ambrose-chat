#!/bin/bash
# AMBROSE 自动部署脚本

echo "🚀 AMBROSE 自动部署脚本"
echo "========================"
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：没有找到 index.html"
    echo "请先在 ambrose-chat 目录运行此脚本"
    exit 1
fi

echo "📋 请提供以下信息："
echo ""

# 询问GitHub用户名
read -p "你的GitHub用户名: " GITHUB_USER

if [ -z "$GITHUB_USER" ]; then
    echo "❌ 用户名不能为空"
    exit 1
fi

echo ""
echo "🔧 开始配置..."
echo ""

# 1. 配置Git用户信息（如果没有）
git config --global user.email "deploy@ambrose.app" 2>/dev/null || true
git config --global user.name "AMBROSE Deploy" 2>/dev/null || true

# 2. 添加远程仓库
echo "1️⃣ 添加远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USER/ambrose-chat.git"

# 验证
echo "   远程仓库："
git remote -v

# 3. 提交所有更改
echo ""
echo "2️⃣ 提交本地更改..."
git add -A
git commit -m "部署: 乔布斯设计v2.0 + 卡顿修复 $(date '+%Y-%m-%d %H:%M')" || echo "   没有新更改需要提交"

# 4. 推送到GitHub
echo ""
echo "3️⃣ 推送到GitHub..."
echo "   会提示输入用户名和密码/Token"
echo ""
git push -u origin master --force

# 检查推送结果
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 推送成功！"
    echo ""
    echo "🔄 Vercel将在1-2分钟内自动重新部署"
    echo "🌐 访问地址: https://ambrose-chat.vercel.app"
    echo ""
    echo "⏱️ 请等待2分钟后刷新页面查看更新"
else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "1. GitHub仓库不存在 - 请先在GitHub创建仓库"
    echo "2. 认证失败 - 请使用Token而不是密码"
    echo "3. 网络问题"
    echo ""
    echo "创建仓库地址: https://github.com/new"
    echo "生成Token地址: https://github.com/settings/tokens"
fi
