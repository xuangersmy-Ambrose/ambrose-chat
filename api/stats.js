// Vercel Serverless API - 用户统计（带权限验证）
// 追踪使用 AMBROSE 的用户

// 简单内存存储（Vercel 冷启动会重置，生产环境应使用 Redis/KV）
const userStats = global.userStats || {
    users: new Map(),
    totalVisits: 0
};
global.userStats = userStats;

// 获取当前北京时间
function getBeijingTime() {
    const now = new Date();
    return now.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // 记录用户访问 (POST) - 任何人都可以记录
    if (req.method === 'POST') {
        try {
            let body = '';
            for await (const chunk of req) {
                body += chunk;
            }
            
            const { userName, userRelation, gender, action } = JSON.parse(body);
            
            if (action === 'record') {
                const userKey = `${userName}_${userRelation}`;
                const existingUser = userStats.users.get(userKey);
                
                if (!existingUser) {
                    userStats.users.set(userKey, {
                        name: userName,
                        relation: userRelation,
                        gender: gender,
                        firstVisit: getBeijingTime(),
                        lastVisit: getBeijingTime(),
                        visitCount: 1
                    });
                } else {
                    existingUser.lastVisit = getBeijingTime();
                    existingUser.visitCount++;
                    userStats.users.set(userKey, existingUser);
                }
                
                userStats.totalVisits++;
                
                return res.status(200).json({ success: true });
            }
            
            return res.status(400).json({ error: 'Invalid action' });
            
        } catch (error) {
            console.error('Stats error:', error);
            return res.status(500).json({ error: error.message });
        }
    }
    
    // 获取统计信息 (GET) - 只有本人可以查询
    if (req.method === 'GET') {
        try {
            // 从查询参数获取身份验证信息
            const { isMaster, userRelation } = req.query;
            
            // 严格权限验证：必须是本人（self）且 isMaster=true
            if (userRelation !== 'self' || isMaster !== 'true') {
                return res.status(403).json({ 
                    error: 'Access denied',
                    message: '只有 BOSS Shao 本人可以查看使用统计'
                });
            }
            
            const users = Array.from(userStats.users.values());
            
            const relatedUsers = users.filter(u => 
                ['self', 'friend', 'lover', 'spouse', 'family', 'client'].includes(u.relation)
            );
            
            const strangers = users.filter(u => 
                !['self', 'friend', 'lover', 'spouse', 'family', 'client'].includes(u.relation)
            );
            
            const byRelation = {
                self: users.filter(u => u.relation === 'self'),
                friend: users.filter(u => u.relation === 'friend'),
                lover: users.filter(u => u.relation === 'lover'),
                spouse: users.filter(u => u.relation === 'spouse'),
                family: users.filter(u => u.relation === 'family'),
                client: users.filter(u => u.relation === 'client'),
                other: strangers
            };
            
            return res.status(200).json({
                totalUsers: users.length,
                totalVisits: userStats.totalVisits,
                relatedUsers: {
                    count: relatedUsers.length,
                    breakdown: {
                        本人: byRelation.self.length,
                        朋友: byRelation.friend.length,
                        恋人: byRelation.lover.length,
                        爱人配偶: byRelation.spouse.length,
                        家人: byRelation.family.length,
                        客户: byRelation.client.length
                    },
                    users: relatedUsers.map(u => ({
                        name: u.name,
                        relation: u.relation,
                        gender: u.gender === 'female' ? '女' : '男',
                        firstVisit: u.firstVisit,
                        lastVisit: u.lastVisit,
                        visits: u.visitCount
                    }))
                },
                strangers: {
                    count: strangers.length,
                    users: strangers.map(u => ({
                        name: u.name,
                        firstVisit: u.firstVisit,
                        lastVisit: u.lastVisit
                    }))
                },
                timestamp: getBeijingTime()
            });
            
        } catch (error) {
            console.error('Stats error:', error);
            return res.status(500).json({ error: error.message });
        }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
}