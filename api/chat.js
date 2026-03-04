// Vercel Serverless API - 模拟回复（临时方案）
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
        
        const { message } = JSON.parse(body);
        
        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }
        
        // 模拟回复（根据关键词）
        const replies = [
            `收到你的消息："${message}"\n\n我是AMBROSE，很高兴为你服务。`,
            `嗯，我在听。你说："${message}"\n\n让我想想怎么帮你。`,
            `"${message}"\n\n了解，这对我来说小菜一碟。`,
            `哈哈，"${message}"\n\n你这问题有意思，我来搞定。`
        ];
        
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        // 延迟1秒模拟AI思考
        await new Promise(r => setTimeout(r, 1000));
        
        return res.status(200).json({
            reply: randomReply
        });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Service error',
            details: error.message
        });
    }
}