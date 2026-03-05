// supabase-client.js - Supabase客户端初始化
// 超频学习实战 - Day 2

// 引入Supabase客户端库 (通过CDN加载)
// <script src="https://unpkg.com/@supabase/supabase-js@2"></script>

class SupabaseService {
    constructor() {
        // TODO: 替换为实际的Supabase项目配置
        this.supabaseUrl = 'https://your-project.supabase.co';
        this.supabaseKey = 'your-anon-key';
        
        // 初始化客户端
        if (typeof supabase !== 'undefined') {
            this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
        }
    }

    // ==================== 用户认证 ====================
    
    // 用户注册
    async signUp(email, password) {
        try {
            const { data, error } = await this.client.auth.signUp({
                email,
                password
            });
            
            if (error) throw error;
            
            // 创建用户档案
            await this.createUserProfile(data.user.id, email);
            
            return { success: true, user: data.user };
        } catch (error) {
            console.error('注册失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 用户登录
    async signIn(email, password) {
        try {
            const { data, error } = await this.client.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            return { success: true, user: data.user, session: data.session };
        } catch (error) {
            console.error('登录失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 用户登出
    async signOut() {
        try {
            const { error } = await this.client.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('登出失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 获取当前用户
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await this.client.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('获取用户失败:', error);
            return null;
        }
    }

    // ==================== 用户档案 ====================

    // 创建用户档案
    async createUserProfile(userId, email) {
        try {
            const { error } = await this.client
                .from('profiles')
                .insert({
                    id: userId,
                    email: email,
                    name: '用户' + Date.now().toString().slice(-4),
                    created_at: new Date().toISOString()
                });
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('创建档案失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 获取用户档案
    async getUserProfile(userId) {
        try {
            const { data, error } = await this.client
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (error) throw error;
            return { success: true, profile: data };
        } catch (error) {
            console.error('获取档案失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 更新用户档案
    async updateUserProfile(userId, updates) {
        try {
            const { data, error } = await this.client
                .from('profiles')
                .update(updates)
                .eq('id', userId);
            
            if (error) throw error;
            return { success: true, profile: data };
        } catch (error) {
            console.error('更新档案失败:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== 健康数据 ====================

    // 保存每日健康数据
    async saveDailyHealth(userId, date, data) {
        try {
            const healthData = {
                user_id: userId,
                date: date,
                steps: data.steps || 0,
                calories: data.calories || 0,
                sleep_hours: data.sleep_hours || 0,
                water_ml: data.water_ml || 0,
                weight: data.weight || null,
                mood: data.mood || null,
                notes: data.notes || '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { error } = await this.client
                .from('daily_health')
                .upsert(healthData, { onConflict: ['user_id', 'date'] });
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('保存健康数据失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 获取某日健康数据
    async getDailyHealth(userId, date) {
        try {
            const { data, error } = await this.client
                .from('daily_health')
                .select('*')
                .eq('user_id', userId)
                .eq('date', date)
                .single();
            
            if (error && error.code !== 'PGRST116') throw error; // PGRST116 = 无数据
            
            return { success: true, data: data || null };
        } catch (error) {
            console.error('获取健康数据失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 获取健康数据历史
    async getHealthHistory(userId, days = 30) {
        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - days);

            const { data, error } = await this.client
                .from('daily_health')
                .select('*')
                .eq('user_id', userId)
                .gte('date', startDate.toISOString().split('T')[0])
                .lte('date', endDate.toISOString().split('T')[0])
                .order('date', { ascending: false });
            
            if (error) throw error;
            return { success: true, data: data || [] };
        } catch (error) {
            console.error('获取历史数据失败:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== 运动记录 ====================

    // 添加运动记录
    async addExercise(userId, exercise) {
        try {
            const exerciseData = {
                user_id: userId,
                type: exercise.type, // running, cycling, swimming, etc.
                duration_minutes: exercise.duration || 0,
                calories_burned: exercise.calories || 0,
                distance_km: exercise.distance || null,
                date: exercise.date || new Date().toISOString().split('T')[0],
                notes: exercise.notes || '',
                created_at: new Date().toISOString()
            };

            const { data, error } = await this.client
                .from('exercises')
                .insert(exerciseData)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, exercise: data };
        } catch (error) {
            console.error('添加运动记录失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 获取运动记录
    async getExercises(userId, limit = 10) {
        try {
            const { data, error } = await this.client
                .from('exercises')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(limit);
            
            if (error) throw error;
            return { success: true, exercises: data || [] };
        } catch (error) {
            console.error('获取运动记录失败:', error);
            return { success: false, error: error.message };
        }
    }

    // ==================== 实时订阅 ====================

    // 订阅健康数据变化
    subscribeToHealthData(userId, callback) {
        const subscription = this.client
            .channel('daily_health_changes')
            .on('postgres_changes', 
                { 
                    event: '*', 
                    schema: 'public', 
                    table: 'daily_health',
                    filter: `user_id=eq.${userId}`
                }, 
                (payload) => {
                    console.log('健康数据变化:', payload);
                    callback(payload);
                }
            )
            .subscribe();

        return subscription;
    }

    // 订阅运动记录变化
    subscribeToExercises(userId, callback) {
        const subscription = this.client
            .channel('exercise_changes')
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'exercises',
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    console.log('运动记录变化:', payload);
                    callback(payload);
                }
            )
            .subscribe();

        return subscription;
    }

    // ==================== 工具方法 ====================

    // 获取统计数据
    async getStats(userId) {
        try {
            // 总运动次数
            const { count: totalExercises } = await this.client
                .from('exercises')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            // 本周数据
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            
            const { data: weekData } = await this.client
                .from('daily_health')
                .select('*')
                .eq('user_id', userId)
                .gte('date', weekStart.toISOString().split('T')[0]);

            const weekStats = {
                totalSteps: weekData?.reduce((sum, d) => sum + (d.steps || 0), 0) || 0,
                totalCalories: weekData?.reduce((sum, d) => sum + (d.calories || 0), 0) || 0,
                avgSleep: weekData?.length 
                    ? (weekData.reduce((sum, d) => sum + (d.sleep_hours || 0), 0) / weekData.length).toFixed(1)
                    : 0
            };

            return {
                success: true,
                stats: {
                    totalExercises: totalExercises || 0,
                    weekStats
                }
            };
        } catch (error) {
            console.error('获取统计失败:', error);
            return { success: false, error: error.message };
        }
    }
}

// 导出单例
const supabaseService = new SupabaseService();

// 兼容模块导出和全局变量
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SupabaseService, supabaseService };
} else {
    window.SupabaseService = SupabaseService;
    window.supabaseService = supabaseService;
}