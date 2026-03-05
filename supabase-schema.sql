-- Supabase数据库表结构
-- 创建时间: 2026-03-05
-- 用途: AMBROSE Health APP后端数据库

-- ============================================
-- 1. 用户档案表 (扩展auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    gender TEXT, -- male/female/other
    birth_date DATE,
    height_cm INTEGER,
    weight_kg DECIMAL(5,2),
    fitness_goal TEXT, -- lose_weight, maintain, gain_muscle
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建触发器自动更新updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. 每日健康数据表
-- ============================================
CREATE TABLE IF NOT EXISTS daily_health (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    steps INTEGER DEFAULT 0,
    calories INTEGER DEFAULT 0,
    sleep_hours DECIMAL(4,2),
    water_ml INTEGER DEFAULT 0,
    weight DECIMAL(5,2),
    mood INTEGER CHECK (mood >= 1 AND mood <= 5), -- 1-5心情等级
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date) -- 每个用户每天只有一条记录
);

CREATE TRIGGER update_daily_health_updated_at
    BEFORE UPDATE ON daily_health
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. 运动记录表
-- ============================================
CREATE TABLE IF NOT EXISTS exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- running, cycling, swimming, yoga, strength, other
    duration_minutes INTEGER NOT NULL,
    calories_burned INTEGER DEFAULT 0,
    distance_km DECIMAL(6,2),
    date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. 饮食记录表
-- ============================================
CREATE TABLE IF NOT EXISTS meals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    meal_type TEXT NOT NULL, -- breakfast, lunch, dinner, snack
    food_name TEXT NOT NULL,
    calories INTEGER DEFAULT 0,
    protein_g DECIMAL(5,2),
    carbs_g DECIMAL(5,2),
    fat_g DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. 健康目标表
-- ============================================
CREATE TABLE IF NOT EXISTS health_goals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- steps, calories, sleep, water, weight
    target_value DECIMAL(8,2) NOT NULL,
    current_value DECIMAL(8,2) DEFAULT 0,
    unit TEXT NOT NULL, -- steps, kcal, hours, ml, kg
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. 订阅/会员表
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    plan_type TEXT NOT NULL, -- free, basic, pro, premium
    status TEXT DEFAULT 'active', -- active, cancelled, expired
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    payment_provider TEXT, -- stripe, alipay, wechat
    payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- RLS (行级安全) 策略
-- ============================================

-- 开启RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- profiles: 用户只能看到自己的档案
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- daily_health: 用户只能看到自己的健康数据
CREATE POLICY "Users can view own health data" ON daily_health
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health data" ON daily_health
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health data" ON daily_health
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health data" ON daily_health
    FOR DELETE USING (auth.uid() = user_id);

-- exercises: 用户只能看到自己的运动记录
CREATE POLICY "Users can view own exercises" ON exercises
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercises" ON exercises
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercises" ON exercises
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercises" ON exercises
    FOR DELETE USING (auth.uid() = user_id);

-- meals: 用户只能看到自己的饮食记录
CREATE POLICY "Users can view own meals" ON meals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meals" ON meals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meals" ON meals
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own meals" ON meals
    FOR DELETE USING (auth.uid() = user_id);

-- health_goals: 用户只能看到自己的目标
CREATE POLICY "Users can view own goals" ON health_goals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own goals" ON health_goals
    FOR ALL USING (auth.uid() = user_id);

-- subscriptions: 用户只能看到自己的订阅
CREATE POLICY "Users can view own subscription" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 索引优化
-- ============================================
CREATE INDEX idx_daily_health_user_date ON daily_health(user_id, date);
CREATE INDEX idx_exercises_user_date ON exercises(user_id, date);
CREATE INDEX idx_meals_user_date ON meals(user_id, date);
CREATE INDEX idx_health_goals_user ON health_goals(user_id);

-- ============================================
-- 创建新用户时自动创建档案的触发器
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', '用户' || substr(NEW.id::text, 1, 4))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();