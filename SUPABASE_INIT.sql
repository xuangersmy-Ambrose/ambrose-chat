# 🔧 Supabase 一键配置脚本

## 使用说明

这个 SQL 脚本包含 AMBROSE Health 需要的所有数据库表和权限设置。

## 快速执行

1. 登录 Supabase Dashboard
2. 进入 SQL Editor
3. 新建查询
4. 复制下面全部内容
5. 点击 Run

## SQL 脚本

```sql
-- ============================================
-- AMBROSE Health 数据库初始化脚本
-- 执行后会创建：用户档案、健康数据、运动记录表
-- ============================================

-- 1. 用户档案表
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    name TEXT,
    avatar_url TEXT,
    gender TEXT,
    birth_date DATE,
    height_cm INTEGER,
    weight_kg DECIMAL(5,2),
    fitness_goal TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 每日健康数据表
CREATE TABLE IF NOT EXISTS daily_health (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    steps INTEGER DEFAULT 0,
    calories INTEGER DEFAULT 0,
    sleep_hours DECIMAL(4,2),
    water_ml INTEGER DEFAULT 0,
    weight DECIMAL(5,2),
    mood INTEGER CHECK (mood >= 1 AND mood <= 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 3. 运动记录表
CREATE TABLE IF NOT EXISTS exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    calories_burned INTEGER DEFAULT 0,
    distance_km DECIMAL(6,2),
    date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 饮食记录表
CREATE TABLE IF NOT EXISTS meals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    date DATE NOT NULL,
    meal_type TEXT NOT NULL,
    food_name TEXT NOT NULL,
    calories INTEGER DEFAULT 0,
    protein_g DECIMAL(5,2),
    carbs_g DECIMAL(5,2),
    fat_g DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 健康目标表
CREATE TABLE IF NOT EXISTS health_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    target_value DECIMAL(8,2) NOT NULL,
    current_value DECIMAL(8,2) DEFAULT 0,
    unit TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 会员订阅表
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    plan_type TEXT DEFAULT 'free',
    status TEXT DEFAULT 'active',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    payment_provider TEXT,
    payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 行级安全策略 (RLS)
-- ============================================

-- 开启 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有操作 (简化版，生产环境建议改为 user_id = auth.uid())
CREATE POLICY "public_profiles" ON profiles FOR ALL USING (true);
CREATE POLICY "public_health" ON daily_health FOR ALL USING (true);
CREATE POLICY "public_exercises" ON exercises FOR ALL USING (true);
CREATE POLICY "public_meals" ON meals FOR ALL USING (true);
CREATE POLICY "public_goals" ON health_goals FOR ALL USING (true);
CREATE POLICY "public_subscriptions" ON subscriptions FOR ALL USING (true);

-- ============================================
-- 索引优化
-- ============================================

CREATE INDEX IF NOT EXISTS idx_daily_health_user_date ON daily_health(user_id, date);
CREATE INDEX IF NOT EXISTS idx_exercises_user_date ON exercises(user_id, date);
CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals(user_id, date);

-- ============================================
-- 完成！
-- ============================================
SELECT 'Database setup complete!' as status;
```

## 验证执行成功

执行后在 Table Editor 应该看到：
- profiles
- daily_health
- exercises
- meals
- health_goals
- subscriptions

## 注意事项

- 免费版有 500MB 数据库限制
- 建议定期备份数据
- RLS 策略在生产环境应改为更严格的权限控制
