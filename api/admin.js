// Vercel Serverless API - 管理员功能（仅 BOSS Shao 可用）
// 处理设计更改等敏感操作

const https = require('https');

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
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        let body = '';
        for await (const chunk of req) {
            body += chunk;
        }
        
        const data = JSON.parse(body);
        const { action, userRelation, isMaster, masterCode, description } = data;
        
        // 严格权限验证：必须是本人
        if (userRelation !== 'self' || isMaster !== true) {
            return res.status(403).json({
                error: 'Access denied',
                message: '只有 BOSS Shao 本人可以执行此操作'
            });
        }
        
        // 额外验证专属验证码
        if (masterCode !== '0812') {
            return res.status(403).json({
                error: 'Invalid master code',
                message: '专属验证码错误'
            });
        }
        
        // 处理不同操作
        switch (action) {
            case 'designChange':
                // 记录设计更改请求
                const changeRequest = {
                    type: 'designChange',
                    description: description || '未提供描述',
                    timestamp: getBeijingTime(),
                    status: 'pending'
                };
                
                // 这里可以发送到外部通知系统（如邮件、Webhook 等）
                // 暂时返回确认信息
                return res.status(200).json({
                    success: true,
                    message: '设计更改请求已记录',
                    request: changeRequest,
                    note: '我会尽快处理这个设计更改'
                });
                
            case 'getConfig':
                // 返回当前配置信息（仅基本配置，不含敏感信息）
                return res.status(200).json({
                    success: true,
                    config: {
                        appName: 'AMBROSE Chat',
                        version: '2.0',
                        lastUpdate: getBeijingTime(),
                        features: [
                            '身份识别系统',
                            '高精度北京时间',
                            '赛博朋克界面',
                            '用户统计',
                            '性别区分'
                        ]
                    }
                });
                
            case 'verifyIdentity':
                // 验证身份
                return res.status(200).json({
                    success: true,
                    message: '身份验证通过',
                    isMaster: true,
                    timestamp: getBeijingTime()
                });
                
            default:
                return res.status(400).json({
                    error: 'Invalid action',
                    message: '未知的操作类型'
                });
        }
        
    } catch (error) {
        console.error('Admin API error:', error);
        return res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
}