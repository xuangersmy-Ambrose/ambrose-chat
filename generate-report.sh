#!/bin/bash
# 优化迭代报告生成脚本

ITERATION_NUM=$(git rev-list --count HEAD)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_HASH=$(git rev-parse --short HEAD)

cat > ITERATION_REPORT_${ITERATION_NUM}.md << EOF
# 优化迭代报告 #${ITERATION_NUM}

**时间**: ${TIMESTAMP}
**提交**: ${COMMIT_HASH}
**部署**: https://ambrose-chat.vercel.app

## 优化概述
- **类型**: $1
- **范围**: $2
- **耗时**: $3

## 具体改动
EOF

git diff --stat HEAD~1 >> ITERATION_REPORT_${ITERATION_NUM}.md

echo "" >> ITERATION_REPORT_${ITERATION_NUM}.md
echo "## 用户价值" >> ITERATION_REPORT_${ITERATION_NUM}.md
echo "$4" >> ITERATION_REPORT_${ITERATION_NUM}.md

echo "报告已生成: ITERATION_REPORT_${ITERATION_NUM}.md"
