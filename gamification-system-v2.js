/**
 * AMBROSE Gamification System v2.0
 * 游戏化激励系统 - 深度优化版
 * 学习：Duolingo + Keep + 行为心理学
 */

class GamificationSystem {
    constructor() {
        this.userLevel = this.loadLevel();
        this.achievements = this.loadAchievements();
        this.challenges = this.initializeChallenges();
        this.leaderboard = this.loadLeaderboard();
    }

    loadLevel() {
        return JSON.parse(localStorage.getItem('ambrose_user_level') || JSON.stringify({
            level: 1,
            xp: 0,
            totalXP: 0,
            streakDays: 0,
            lastActive: null
        }));
    }

    loadAchievements() {
        const defaultAchievements = [
            // 运动类成就
            { id: 'step_1k', name: '起步者', desc: '单日步数超过1000', icon: '👟', unlocked: false, rarity: 'common' },
            { id: 'step_5k', name: '步行者', desc: '单日步数超过5000', icon: '🚶', unlocked: false, rarity: 'common' },
            { id: 'step_10k', name: '万步达人', desc: '单日步数超过10000', icon: '🏃', unlocked: false, rarity: 'rare' },
            { id: 'step_100k', name: '百万行者', desc: '累计步数超过10万', icon: '👣', unlocked: false, rarity: 'epic' },
            
            // 睡眠类成就
            { id: 'sleep_early', name: '早睡鸟', desc: '连续3天22:00前入睡', icon: '🌙', unlocked: false, rarity: 'common' },
            { id: 'sleep_8h', name: '睡眠大师', desc: '连续7天睡眠8小时以上', icon: '😴', unlocked: false, rarity: 'rare' },
            { id: 'sleep_streak_30', name: '睡眠守护', desc: '连续30天记录睡眠', icon: '🛏️', unlocked: false, rarity: 'epic' },
            
            // 饮食类成就
            { id: 'log_3meals', name: '记录达人', desc: '单日记录3餐', icon: '📝', unlocked: false, rarity: 'common' },
            { id: 'healthy_week', name: '健康饮食周', desc: '连续7天热量控制在目标内', icon: '🥗', unlocked: false, rarity: 'rare' },
            { id: 'water_2l', name: '水润达人', desc: '单日饮水超过2000ml', icon: '💧', unlocked: false, rarity: 'common' },
            
            // 体重类成就
            { id: 'weight_first', name: '第一步', desc: '记录第一次体重', icon: '⚖️', unlocked: false, rarity: 'common' },
            { id: 'weight_goal', name: '目标达成', desc: '达到目标体重', icon: '🎯', unlocked: false, rarity: 'legendary' },
            { id: 'weight_streak_30', name: '坚持记录', desc: '连续30天记录体重', icon: '📊', unlocked: false, rarity: 'rare' },
            
            // 连续打卡成就
            { id: 'streak_3', name: '3天 streak', desc: '连续3天使用APP', icon: '🔥', unlocked: false, rarity: 'common' },
            { id: 'streak_7', name: '一周 streak', desc: '连续7天使用APP', icon: '🔥🔥', unlocked: false, rarity: 'common' },
            { id: 'streak_30', name: '一月 streak', desc: '连续30天使用APP', icon: '🔥🔥🔥', unlocked: false, rarity: 'rare' },
            { id: 'streak_100', name: '百日 streak', desc: '连续100天使用APP', icon: '👑', unlocked: false, rarity: 'legendary' },
            
            // 综合成就
            { id: 'all_modules', name: '全能选手', desc: '使用所有功能模块', icon: '🌟', unlocked: false, rarity: 'epic' },
            { id: 'early_bird', name: '早起的鸟', desc: '连续7天6:00前打开APP', icon: '🌅', unlocked: false, rarity: 'rare' },
            { id: 'night_owl', name: '夜猫子', desc: '连续7天23:00后打开APP', icon: '🦉', unlocked: false, rarity: 'rare' }
        ];
        
        return JSON.parse(localStorage.getItem('ambrose_achievements') || JSON.stringify(defaultAchievements));
    }

    initializeChallenges() {
        return [
            {
                id: 'challenge_weekly_steps',
                name: '本周步数挑战',
                desc: '本周累计步数达到50000步',
                target: 50000,
                current: 0,
                reward: { xp: 500, badge: '🏆' },
                deadline: this.getWeekEnd(),
                type: 'weekly'
            },
            {
                id: 'challenge_daily_water',
                name: '每日饮水挑战',
                desc: '连续7天饮水超过2000ml',
                target: 7,
                current: 0,
                reward: { xp: 300, badge: '💧' },
                deadline: null,
                type: 'streak'
            },
            {
                id: 'challenge_sleep_goal',
                name: '睡眠改善挑战',
                desc: '连续5天睡眠达到7小时以上',
                target: 5,
                current: 0,
                reward: { xp: 400, badge: '😴' },
                deadline: null,
                type: 'streak'
            },
            {
                id: 'challenge_weight_loss',
                name: '减重挑战',
                desc: '本周减重0.5kg',
                target: 0.5,
                current: 0,
                reward: { xp: 600, badge: '⚖️' },
                deadline: this.getWeekEnd(),
                type: 'weekly'
            }
        ];
    }

    loadLeaderboard() {
        return JSON.parse(localStorage.getItem('ambrose_leaderboard') || JSON.stringify([
            { name: 'BOSS Shao', level: 1, xp: 0, streak: 0, isMe: true },
            { name: 'User123', level: 5, xp: 2500, streak: 7, isMe: false },
            { name: 'HealthFan', level: 8, xp: 4800, streak: 15, isMe: false },
            { name: 'RunMaster', level: 12, xp: 7200, streak: 30, isMe: false },
            { name: 'YogaPro', level: 15, xp: 9500, streak: 45, isMe: false }
        ]));
    }

    // 增加XP
    addXP(amount, reason) {
        this.userLevel.xp += amount;
        this.userLevel.totalXP += amount;
        
        // 检查升级
        const xpNeeded = this.getXPForLevel(this.userLevel.level + 1);
        if (this.userLevel.xp >= xpNeeded) {
            this.levelUp();
        }
        
        this.saveLevel();
        return {
            xp: amount,
            reason: reason,
            totalXP: this.userLevel.totalXP,
            progress: this.getLevelProgress()
        };
    }

    // 计算升级所需XP
    getXPForLevel(level) {
        return Math.floor(100 * Math.pow(1.5, level - 1));
    }

    // 获取当前等级进度
    getLevelProgress() {
        const currentLevelXP = this.getXPForLevel(this.userLevel.level);
        const nextLevelXP = this.getXPForLevel(this.userLevel.level + 1);
        const progress = ((this.userLevel.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        return Math.max(0, Math.min(100, progress));
    }

    // 升级
    levelUp() {
        this.userLevel.level++;
        this.userLevel.xp = 0;
        
        return {
            newLevel: this.userLevel.level,
            rewards: this.getLevelRewards(this.userLevel.level)
        };
    }

    // 获取等级奖励
    getLevelRewards(level) {
        const rewards = {
            title: `等级 ${level} 达成！`,
            unlocks: []
        };
        
        if (level === 5) rewards.unlocks.push('解锁高级数据分析');
        if (level === 10) rewards.unlocks.push('解锁AI深度对话');
        if (level === 15) rewards.unlocks.push('解锁专家咨询预约');
        
        return rewards;
    }

    // 检查并解锁成就
    checkAchievements(type, data) {
        const unlocked = [];
        
        this.achievements.forEach(achievement => {
            if (achievement.unlocked) return;
            
            const shouldUnlock = this.checkAchievementCondition(achievement, type, data);
            if (shouldUnlock) {
                achievement.unlocked = true;
                achievement.unlockedAt = new Date().toISOString();
                unlocked.push(achievement);
                
                // 解锁成就奖励XP
                this.addXP(this.getAchievementXP(achievement.rarity), `解锁成就: ${achievement.name}`);
            }
        });
        
        if (unlocked.length > 0) {
            this.saveAchievements();
        }
        
        return unlocked;
    }

    // 检查成就条件
    checkAchievementCondition(achievement, type, data) {
        switch (achievement.id) {
            case 'step_1k':
                return type === 'steps' && data.steps >= 1000;
            case 'step_5k':
                return type === 'steps' && data.steps >= 5000;
            case 'step_10k':
                return type === 'steps' && data.steps >= 10000;
            case 'weight_first':
                return type === 'weight_logged';
            case 'log_3meals':
                return type === 'meals_logged' && data.count >= 3;
            case 'water_2l':
                return type === 'water' && data.amount >= 2000;
            default:
                return false;
        }
    }

    // 获取成就XP
    getAchievementXP(rarity) {
        const xpMap = {
            common: 50,
            rare: 100,
            epic: 200,
            legendary: 500
        };
        return xpMap[rarity] || 50;
    }

    // 更新连续打卡
    updateStreak() {
        const today = new Date().toDateString();
        const lastActive = this.userLevel.lastActive;
        
        if (lastActive) {
            const lastDate = new Date(lastActive);
            const diffDays = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                this.userLevel.streakDays++;
                // 连续打卡奖励
                this.addXP(10 * this.userLevel.streakDays, `${this.userLevel.streakDays}天连续打卡`);
            } else if (diffDays > 1) {
                this.userLevel.streakDays = 1;
            }
        } else {
            this.userLevel.streakDays = 1;
        }
        
        this.userLevel.lastActive = today;
        this.saveLevel();
        
        // 检查连续打卡成就
        this.checkAchievements('streak', { days: this.userLevel.streakDays });
        
        return this.userLevel.streakDays;
    }

    // 获取等级显示
    getLevelDisplay() {
        return {
            level: this.userLevel.level,
            title: this.getLevelTitle(this.userLevel.level),
            xp: this.userLevel.xp,
            nextLevelXP: this.getXPForLevel(this.userLevel.level + 1),
            progress: this.getLevelProgress(),
            streak: this.userLevel.streakDays
        };
    }

    // 获取等级称号
    getLevelTitle(level) {
        const titles = {
            1: '健康新手',
            5: '健康学徒',
            10: '健康达人',
            15: '健康专家',
            20: '健康大师',
            30: '健康传奇'
        };
        
        const levels = Object.keys(titles).map(Number).sort((a, b) => b - a);
        for (const l of levels) {
            if (level >= l) return titles[l];
        }
        return '健康新手';
    }

    // 获取排行榜位置
    getLeaderboardRank() {
        const sorted = [...this.leaderboard].sort((a, b) => b.xp - a.xp);
        const myIndex = sorted.findIndex(u => u.isMe);
        return {
            rank: myIndex + 1,
            total: sorted.length,
            nearby: sorted.slice(Math.max(0, myIndex - 2), myIndex + 3)
        };
    }

    // 获取本周结束时间
    getWeekEnd() {
        const now = new Date();
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        return endOfWeek.toISOString();
    }

    // 保存数据
    saveLevel() {
        localStorage.setItem('ambrose_user_level', JSON.stringify(this.userLevel));
    }

    saveAchievements() {
        localStorage.setItem('ambrose_achievements', JSON.stringify(this.achievements));
    }
}

// 暴露到全局
window.GamificationSystem = GamificationSystem;
