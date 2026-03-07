#!/bin/bash
# AMBROSE 代码质量检查脚本

echo "🔍 开始代码质量检查..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# 1. 检查 JavaScript 语法
echo ""
echo "📋 检查 JavaScript 语法..."
for file in js/*.js; do
  if [ -f "$file" ]; then
    if node --check "$file" 2>/dev/null; then
      echo -e "${GREEN}✓${NC} $file"
    else
      echo -e "${RED}✗${NC} $file - 语法错误"
      ((errors++))
    fi
  fi
done

# 2. 检查 HTML 中的潜在问题
echo ""
echo "📋 检查 HTML 潜在问题..."

# 检查 innerHTML 使用（可能有XSS风险）
innerhtml_count=$(grep -r "innerHTML.*=" index.html 2>/dev/null | wc -l)
if [ "$innerhtml_count" -gt 0 ]; then
  echo -e "${YELLOW}⚠${NC} 发现 $innerhtml_count 处 innerHTML 使用，请确保已转义用户输入"
  ((warnings++))
fi

# 检查 console.log
echo ""
echo "📋 检查调试代码..."
console_count=$(grep -r "console.log" js/ 2>/dev/null | wc -l)
if [ "$console_count" -gt 0 ]; then
  echo -e "${YELLOW}⚠${NC} 发现 $console_count 处 console.log，生产环境应移除"
  ((warnings++))
fi

# 3. 检查函数重复定义
echo ""
echo "📋 检查函数重复定义..."
showpage_count=$(grep -c "function showPage" index.html 2>/dev/null || echo 0)
if [ "$showpage_count" -gt 1 ]; then
  echo -e "${RED}✗${NC} 发现 $showpage_count 个 showPage 函数定义"
  ((errors++))
else
  echo -e "${GREEN}✓${NC} 无函数重复定义"
fi

# 4. 文件大小检查
echo ""
echo "📋 检查文件大小..."
index_size=$(stat -f%z index.html 2>/dev/null || stat -c%s index.html 2>/dev/null || echo 0)
if [ "$index_size" -gt 200000 ]; then
  echo -e "${YELLOW}⚠${NC} index.html 大小 ${index_size} bytes，建议拆分"
  ((warnings++))
fi

# 5. 总结
echo ""
echo "================================"
if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
  echo -e "${GREEN}✓ 所有检查通过${NC}"
  exit 0
else
  echo -e "${RED}✗ 发现 $errors 个错误，$warnings 个警告${NC}"
  exit 1
fi
