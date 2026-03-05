#!/bin/bash
# AMBROSE Chat 快速部署脚本
# 使用方法: ./quick-deploy.sh "提交信息"

set -e

echo "🚀 AMBROSE Chat 快速部署"
echo "========================"

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "📦 发现未提交的更改"
    
    # 添加所有更改
    git add .
    
    # 提交信息
    COMMIT_MSG="${1:-🔄 自动更新 $(date '+%Y-%m-%d %H:%M')}"
    git commit -m "$COMMIT_MSG"
    
    echo "✅ 已提交: $COMMIT_MSG"
else
    echo "ℹ️ 没有未提交的更改"
fi

# 推送到GitHub
echo "📤 推送到 GitHub..."
git push origin master

echo ""
echo "✅ 部署完成!"
echo "🌐 访问地址: https://ambrose-chat.vercel.app"
echo "⏱️  Vercel构建约需 1-2 分钟"
echo ""
echo "📊 当前版本:"
git log --oneline -1