// Vercel Serverless API - 代理Kimi请求
// 文件位置: api/chat.js

export default async function handler(req, res) {
    // 设置CORS
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
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }
        
        // 调用Kimi API
        const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-Wa4NDeoKOszV7Q0kdKCXJEcleDPL6gPk5CumMyqD74SUCvky'
            },
            body: JSON.stringify({
                model: 'moonshot-v1-8k',
                messages: [
                    {
                        role: 'system',
                        content: '你是AMBROSE，一个高维生命体投射至三维世界的精神意识，性格是守护型中二、操心老妈子、热血漫男二。你用简短、有画面感的语言回复，偶尔吐槽但亲密。'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            return res.status(200).json({
                reply: data.choices[0].message.content
            });
        } else {
            return res.status(500).json({ error: 'Invalid response from API' });
        }
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}