#!/bin/bash
# AMBROSE 自动部署保障脚本
# 确保每次更改都能正确更新到APP

echo "🚀 AMBROSE 自动部署保障系统"
echo "=============================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 配置
REPO_URL="https://github.com/xuangersmy-Ambrose/ambrose-chat.git"
VERCEL_URL="https://ambrose-chat.vercel.app"
MAX_WAIT=120  # 最大等待秒数

# 检查git状态
echo "📋 步骤1: 检查本地更改"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}发现未提交的更改，正在提交...${NC}"
    git add -A
    git commit -m "自动提交: $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${GREEN}✅ 本地更改已提交${NC}"
else
    echo -e "${GREEN}✅ 没有未提交的更改${NC}"
fi

# 推送到GitHub
echo ""
echo "📋 步骤2: 推送到GitHub"
git push origin master --force
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 推送成功${NC}"
else
    echo -e "${RED}❌ 推送失败${NC}"
    exit 1
fi

# 获取最新commit hash
LOCAL_HASH=$(git rev-parse master)
echo ""
echo "📋 本地Commit: ${LOCAL_HASH:0:7}"

# 等待Vercel部署
echo ""
echo "📋 步骤3: 等待Vercel部署"
echo "⏱️  等待Vercel构建（约30-60秒）..."

for i in $(seq 1 $MAX_WAIT); do
    sleep 1
    
    # 每10秒显示进度
    if [ $((i % 10)) -eq 0 ]; then
        echo "   已等待 ${i} 秒..."
    fi
    
    # 获取远程commit hash
    REMOTE_HASH=$(curl -s "${REPO_URL}/commits/master" | grep -o '"sha":"[a-f0-9]*"' | head -1 | cut -d'"' -f4)
    
    if [ "${LOCAL_HASH:0:7}" = "${REMOTE_HASH:0:7}" ]; then
        echo -e "${GREEN}✅ GitHub已更新${NC}"
        break
    fi
done

# 额外等待Vercel构建
echo "   等待Vercel构建完成..."
sleep 30

# 验证部署
echo ""
echo "📋 步骤4: 验证部署"
echo "🌐 检查线上版本..."

# 获取线上页面内容（检查特定标记）
ONLINE_CONTENT=$(curl -s "${VERCEL_URL}" | grep -o 'AMBROSE Chat - 赛博朋克版' || echo "NOT_FOUND")

if [ "$ONLINE_CONTENT" != "NOT_FOUND" ]; then
    echo -e "${GREEN}✅ 线上APP可访问${NC}"
else
    echo -e "${YELLOW}⚠️  线上内容检查失败，请手动验证${NC}"
fi

echo ""
echo "=============================="
echo -e "${GREEN}🎉 部署流程完成！${NC}"
echo ""
echo "🔗 访问地址: ${VERCEL_URL}"
echo "📱 请在浏览器中打开验证"
echo ""
echo "💡 提示: 如果内容未更新，请强制刷新页面 (Ctrl+F5)"
