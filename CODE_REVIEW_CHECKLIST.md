# AMBROSE 代码审查清单

## 🔴 提交前必须检查

### 1. 语法检查
- [ ] 运行 `npm run lint` 无错误
- [ ] 运行 `npm run test` 全部通过
- [ ] 浏览器控制台无报错

### 2. 安全审查
- [ ] 无 `innerHTML` 直接插入用户输入
- [ ] 所有用户输入已验证和转义
- [ ] 无硬编码敏感信息（密钥、密码）
- [ ] 无 `eval()` 或 `new Function()`

### 3. 功能验证
- [ ] 手动测试主要功能路径
- [ ] 移动端适配正常
- [ ] 无内存泄漏（检查定时器/事件监听）

### 4. 代码质量
- [ ] 函数长度 < 50 行
- [ ] 无重复代码（DRY原则）
- [ ] 有意义的变量名
- [ ] 关键逻辑有注释

---

## 🛡️ 安全编码规范

### XSS 防护
```javascript
// ❌ 错误
element.innerHTML = `<div>${userInput}</div>`;

// ✅ 正确
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
element.innerHTML = `<div>${escapeHtml(userInput)}</div>`;
```

### 输入验证
```javascript
// ❌ 错误
const age = document.getElementById('age').value;
if (age > 0) { ... }

// ✅ 正确
const ageInput = document.getElementById('age').value;
const age = parseInt(ageInput, 10);
if (Number.isInteger(age) && age > 0 && age < 150) { ... }
```

### 函数设计
```javascript
// ❌ 错误
function process() {
  // 100+ 行代码，做很多事情
}

// ✅ 正确
function validateInput(input) { }
function transformData(data) { }
function renderResult(result) { }

function process(input) {
  const validated = validateInput(input);
  const transformed = transformData(validated);
  return renderResult(transformed);
}
```

---

## 🧪 测试要求

### 单元测试模板
```javascript
describe('CourseSystem', () => {
  beforeEach(() => {
    // 重置状态
    localStorage.clear();
  });

  test('should add course to favorites', () => {
    const system = new CourseSystem();
    system.toggleFavorite('course-001');
    expect(system.isFavorite('course-001')).toBe(true);
  });

  test('should escape HTML in course title', () => {
    const maliciousTitle = '<script>alert("xss")</script>';
    const escaped = escapeHtml(maliciousTitle);
    expect(escaped).not.toContain('<script>');
  });
});
```

---

## 📊 性能标准

- 首屏加载 < 1.5s
- 交互响应 < 100ms
- 内存使用稳定（无持续增长）
- Lighthouse 评分 > 85

---

*每次提交前对照此清单自检*
