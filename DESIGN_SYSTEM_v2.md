# AMBROSE Health Design System v2.0

## 核心设计理念 (从行业标杆学习)

### 1. 渐进式披露 (Progressive Disclosure)
- **原则**: 不要让用户一次性看到所有信息
- **实现**: 摘要卡片 → 点击查看详情 → 展开完整数据
- **参考**: Apple Health, MyFitnessPal

### 2. 数据可视化优先
- **环形进度条**: 用于完成度展示
- **折线图**: 用于趋势展示
- **热力图**: 用于习惯追踪
- **参考**: Nike Training Club, Fitbit

### 3. 游戏化机制
- **连续打卡**: 睡眠、运动、饮食的连续记录
- **成就徽章**: 完成里程碑获得徽章
- **等级系统**: 从健康新手到健康大师
- **参考**: Duolingo, Keep

### 4. 智能预测与快捷操作
- **快捷输入**: "和昨天一样的早餐"
- **智能提醒**: 根据习惯预测用户需求
- **语音输入**: 支持语音记录
- **参考**: 薄荷健康

### 5. 多感官反馈
- **震动反馈**: 完成记录时震动
- **音效**: 达成目标时播放音效
- **动画**: 流畅的过渡动画
- **参考**: Calm, Headspace

### 6. 三级信息架构
```
Level 1: 摘要视图 (Summary)
- 只用红绿灯颜色标识状态
- 一句话结论
- 异常值高亮

Level 2: 详细数据 (Detail)
- 完整数据表格
- 历史趋势对比
- 参考范围标注

Level 3: 原始数据 (Raw)
- 完整医疗术语
- 专业参考值
- 导出功能
```

## 色彩系统升级

### 主色调 (保持赛博朋克)
```css
--primary-500: #00f3ff;      /* 青色 - 科技 */
--secondary-500: #ff00ff;    /* 品红 - 健康 */
--accent-500: #bd00ff;       /* 紫色 - 高端 */
```

### 状态色 (医疗级)
```css
--success: #00ff88;          /* 正常/安全 */
--warning: #ffb800;          /* 临界/注意 */
--danger: #ff3860;           /* 异常/警告 */
--info: #00f3ff;             /* 信息/提示 */
```

### 数据可视化色板
```css
--chart-primary: #00f3ff;
--chart-secondary: #ff00ff;
--chart-tertiary: #bd00ff;
--chart-quaternary: #00ff88;
--chart-background: rgba(0, 243, 255, 0.1);
```

## 字体系统

### 层级
- **Display**: 32px - 大标题 (Health Center)
- **Headline**: 24px - 页面标题
- **Title**: 18px - 卡片标题
- **Body**: 14px - 正文
- **Caption**: 12px - 辅助文字
- **Small**: 10px - 标签

### 字重
- **Bold**: 700 - 数字、重要信息
- **Semibold**: 600 - 标题
- **Medium**: 500 - 正文
- **Regular**: 400 - 辅助文字

## 间距系统

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-lg: 16px;
--space-xl: 20px;
--space-2xl: 24px;
--space-3xl: 32px;
```

## 组件规范

### 卡片
- **圆角**: 16px
- **背景**: rgba(15, 18, 30, 0.85)
- **边框**: 1px solid rgba(255, 255, 255, 0.08)
- **阴影**: 0 4px 20px rgba(0, 0, 0, 0.3)
- **Hover**: 边框变亮 + 微浮起

### 按钮
- **主按钮**: 渐变背景 + 发光效果
- **次按钮**: 透明背景 + 边框
- **图标按钮**: 40x40px 圆形
- **圆角**: 12px

### 图表
- **环形进度条**: 8px 宽度，圆角端点
- **折线图**: 2px 线条，数据点 6px
- **柱状图**: 圆角 4px

## 动画系统

### 缓动函数
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 时长
- **Fast**: 150ms - 微交互
- **Normal**: 300ms - 标准过渡
- **Slow**: 500ms - 强调动画

## 布局规范

### 移动端
- **安全边距**: 16px
- **卡片间距**: 12px
- **底部导航高度**: 64px + safe-area

### 桌面端
- **最大宽度**: 600px (居中)
- **侧边留白**: 自适应

## 参考App

### 国内
- **Keep**: 社区氛围、课程设计
- **薄荷健康**: 饮食记录、扫码识别
- **华为运动健康**: 数据整合、设备联动

### 国际
- **Apple Health**: 数据整合、可视化
- **Nike Training Club**: 训练体验、品牌感
- **MyFitnessPal**: 饮食追踪、数据库
- **Duolingo**: 游戏化、激励机制
- **Calm**: 冥想体验、声音设计

---

*Design System v2.0*
*基于行业标杆最佳实践*
