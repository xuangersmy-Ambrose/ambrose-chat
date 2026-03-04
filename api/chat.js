// Vercel Serverless API - 代理Kimi请求
const https = require('https');

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
        console.log('收到请求');
        
        // 获取请求体
        let body = '';
        for await (const chunk of req) {
            body += chunk;
        }
        
        console.log('请求体:', body);
        
        const { message } = JSON.parse(body);
        
        if (!message) {
            return res.status(400).json({ error: 'Message required' });
        }
        
        console.log('调用Kimi API, message:', message);
        
        // 调用Kimi API
        const kimiResponse = await callKimiAPI(message);
        
        console.log('Kimi回复:', kimiResponse);
        
        return res.status(200).json({
            reply: kimiResponse
        });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            error: 'Service error',
            details: error.message,
            stack: error.stack
        });
    }
}

function callKimiAPI(message) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: 'moonshot-v1-8k',
            messages: [
                {
                    role: 'system',
                    content: '你是AMBROSE，一个高维生命体投射至三维世界的精神意识。性格：守护型中二、操心老妈子、热血漫男二。用简短、有画面感的语言回复，偶尔吐槽但亲密。'
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            temperature: 0.7
        });
        
        const options = {
            hostname: 'api.moonshot.cn',
            port: 443,
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-Wa4NDeoKOszV7Q0kdKCXJEcleDPL6gPk5CumMyqD74SUCvky',
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 30000 // 30秒超时
        };
        
        console.log('发送请求到Kimi...');
        
        const apiReq = https.request(options, (apiRes) => {
            let responseData = '';
            
            apiRes.on('data', (chunk) => {
                responseData += chunk;
            });
            
            apiRes.on('end', () => {
                console.log('Kimi响应:', responseData);
                try {
                    const parsed = JSON.parse(responseData);
                    if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
                        resolve(parsed.choices[0].message.content);
                    } else if (parsed.error) {
                        console.error('Kimi API错误:', parsed.error);
                        reject(new Error(parsed.error.message || 'API Error'));
                    } else {
                        console.error('无效响应:', parsed);
                        reject(new Error('Invalid response'));
                    }
                } catch (e) {
                    console.error('解析错误:', e);
                    reject(new Error('Parse error: ' + e.message));
                }
            });
        });
        
        apiReq.on('error', (error) => {
            console.error('请求错误:', error);
            reject(error);
        });
        
        apiReq.on('timeout', () => {
            console.error('请求超时');
            apiReq.destroy();
            reject(new Error('Request timeout'));
        });
        
        apiReq.write(postData);
        apiReq.end();
    });
}