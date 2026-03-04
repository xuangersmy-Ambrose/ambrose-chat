// 身份验证模块
const Auth = {
    isAuthenticated: localStorage.getItem('ambrose_authed') === 'true',
    
    init() {
        if (!this.isAuthenticated) {
            this.showAuthModal();
        } else {
            UI.init();
        }
    },
    
    showAuthModal() {
        const modal = document.createElement('div');
        modal.id = 'authModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a0a1f 100%);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            font-family: 'Noto Sans SC', sans-serif;
        `;
        
        // 添加网格背景
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
                background-size: 50px 50px;
                pointer-events: none;
            "></div>
            
            <div style="
                background: rgba(10, 10, 15, 0.95);
                width: 100%;
                max-width: 380px;
                border: 2px solid #00f3ff;
                border-radius: 8px;
                padding: 40px 30px;
                text-align: center;
                position: relative;
                box-shadow: 
                    0 0 40px rgba(0, 243, 255, 0.3),
                    inset 0 0 60px rgba(0, 243, 255, 0.05);
                backdrop-filter: blur(10px);
            ">
                <!-- 装饰角标 -->
                <div style="
                    position: absolute;
                    top: -2px; left: -2px;
                    width: 20px; height: 20px;
                    border-top: 3px solid #ff00ff;
                    border-left: 3px solid #ff00ff;
                "></div>
                <div style="
                    position: absolute;
                    top: -2px; right: -2px;
                    width: 20px; height: 20px;
                    border-top: 3px solid #ff00ff;
                    border-right: 3px solid #ff00ff;
                "></div>
                <div style="
                    position: absolute;
                    bottom: -2px; left: -2px;
                    width: 20px; height: 20px;
                    border-bottom: 3px solid #ff00ff;
                    border-left: 3px solid #ff00ff;
                "></div>
                <div style="
                    position: absolute;
                    bottom: -2px; right: -2px;
                    width: 20px; height: 20px;
                    border-bottom: 3px solid #ff00ff;
                    border-right: 3px solid #ff00ff;
                "></div>
                
                <!-- 图标 -->
                <div style="
                    font-size: 56px;
                    margin-bottom: 20px;
                    text-shadow: 0 0 30px rgba(0, 243, 255, 0.8);
                    animation: pulse-icon 2s ease-in-out infinite;
                ">🧰</div>
                
                <!-- 标题 -->
                <div style="
                    font-family: 'Orbitron', monospace;
                    font-size: 28px;
                    font-weight: 900;
                    color: #00f3ff;
                    letter-spacing: 6px;
                    margin-bottom: 8px;
                    text-shadow: 
                        0 0 10px #00f3ff,
                        0 0 20px #00f3ff,
                        0 0 40px #00f3ff;
                    text-transform: uppercase;
                ">AMBROSE</div>
                
                <div style="
                    font-family: 'Orbitron', monospace;
                    font-size: 11px;
                    color: #ff00ff;
                    letter-spacing: 3px;
                    margin-bottom: 24px;
                    text-transform: uppercase;
                ">CYBERPUNK EDITION // 2088</div>
                
                <div style="
                    color: #888;
                    font-size: 13px;
                    margin-bottom: 32px;
                    line-height: 1.6;
                ">
                    全知全能的精神体投射<br>
                    <span style="color: #00f3ff;">专属于邵名远</span>
                </div>
                
                <div style="
                    border-top: 1px solid rgba(0, 243, 255, 0.3);
                    padding-top: 24px;
                    margin-bottom: 24px;
                ">
                    <div style="
                        font-family: 'Orbitron', monospace;
                        color: #ff00ff;
                        font-size: 12px;
                        letter-spacing: 2px;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                    ">身份验证 // IDENTITY_VERIFY</div>
                    
                    <div style="margin-bottom: 20px; text-align: left;">
                        <label style="
                            display: block;
                            font-size: 12px;
                            color: #00f3ff;
                            margin-bottom: 8px;
                            font-family: 'Orbitron', monospace;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                        ">
                            你是谁？ // WHO_ARE_YOU
                        </label>
                        <input type="text" id="authName" placeholder="输入你的代号" style="
                            width: 100%;
                            padding: 14px;
                            background: rgba(0, 0, 0, 0.5);
                            border: 1px solid #00f3ff;
                            border-radius: 4px;
                            font-size: 15px;
                            color: #fff;
                            outline: none;
                            box-shadow: inset 0 0 10px rgba(0, 243, 255, 0.1);
                            transition: all 0.3s;
                        " onfocus="this.style.borderColor='#00ffff'; this.style.boxShadow='inset 0 0 15px rgba(0, 255, 255, 0.2), 0 0 20px rgba(0, 243, 255, 0.3)'" 
                        onblur="this.style.borderColor='#00f3ff'; this.style.boxShadow='inset 0 0 10px rgba(0, 243, 255, 0.1)'">
                    </div>
                    
                    <div style="margin-bottom: 20px; text-align: left;">
                        <label style="
                            display: block;
                            font-size: 12px;
                            color: #00f3ff;
                            margin-bottom: 8px;
                            font-family: 'Orbitron', monospace;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                        ">
                            关系 // RELATION
                        </label>
                        <select id="authRelation" style="
                            width: 100%;
                            padding: 14px;
                            background: rgba(0, 0, 0, 0.5);
                            border: 1px solid #ff00ff;
                            border-radius: 4px;
                            font-size: 15px;
                            color: #fff;
                            outline: none;
                            cursor: pointer;
                            box-shadow: inset 0 0 10px rgba(255, 0, 255, 0.1);
                        ">
                            <option value="" style="background: #0a0a0f;">选择关系 // SELECT</option>
                            <option value="self" style="background: #0a0a0f;">本人（邵名远）// SELF</option>
                            <option value="friend" style="background: #0a0a0f;">朋友 // FRIEND</option>
                            <option value="lover" style="background: #0a0a0f;">恋人 // LOVER</option>
                            <option value="spouse" style="background: #0a0a0f;">爱人/配偶 // SPOUSE</option>
                            <option value="family" style="background: #0a0a0f;">家人 // FAMILY</option>
                            <option value="client" style="background: #0a0a0f;">客户 // CLIENT</option>
                        </select>
                    </div>
                    
                    <div style="
                        font-size: 11px;
                        color: #666;
                        margin-top: 16px;
                        font-family: 'Orbitron', monospace;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        border-left: 2px solid #ff00ff;
                        padding-left: 12px;
                    ">
                        只有以上关系才能连接AMBROSE<br>
                        ONLY AUTHORIZED RELATIONS CAN CONNECT
                    </div>
                </div>
                
                <button onclick="Auth.verify()" style="
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, #ff00ff 0%, #b829dd 100%);
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-family: 'Orbitron', monospace;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    cursor: pointer;
                    box-shadow: 
                        0 0 20px rgba(255, 0, 255, 0.4),
                        inset 0 0 10px rgba(255, 255, 255, 0.2);
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                " onmouseover="this.style.boxShadow='0 0 30px rgba(255, 0, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)'" 
                onmouseout="this.style.boxShadow='0 0 20px rgba(255, 0, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)'">
                    验证身份 // VERIFY
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    },
    
    verify() {
        const name = document.getElementById('authName')?.value?.trim();
        const relation = document.getElementById('authRelation')?.value;
        
        if (!name) {
            alert('请输入你的名字');
            return;
        }
        
        if (!relation) {
            alert('请选择你和邵名远的关系');
            return;
        }
        
        // 保存验证信息
        localStorage.setItem('ambrose_authed', 'true');
        localStorage.setItem('ambrose_user_name', name);
        localStorage.setItem('ambrose_user_relation', relation);
        
        // 移除验证弹窗
        document.getElementById('authModal')?.remove();
        
        // 初始化UI
        UI.init();
        
        // 欢迎消息
        const relationText = {
            'self': '本人（邵名远）',
            'friend': '朋友',
            'lover': '恋人',
            'spouse': '爱人',
            'family': '家人',
            'client': '客户'
        }[relation];
        
        setTimeout(() => {
            UI.addMessage(`验证通过。\n\n你好，${name}。\n你是邵名远的${relationText}，可以使用我。\n\n我是AMBROSE，很高兴为你服务。`, 'bot');
        }, 300);
    },
    
    // 检查是否允许使用
    checkAccess() {
        if (!this.isAuthenticated) {
            return false;
        }
        
        const relation = localStorage.getItem('ambrose_user_relation');
        const allowedRelations = ['self', 'friend', 'lover', 'spouse', 'family', 'client'];
        
        if (!allowedRelations.includes(relation)) {
            localStorage.removeItem('ambrose_authed');
            this.isAuthenticated = false;
            this.showAuthModal();
            return false;
        }
        
        return true;
    },
    
    // 注销
    logout() {
        localStorage.removeItem('ambrose_authed');
        localStorage.removeItem('ambrose_user_name');
        localStorage.removeItem('ambrose_user_relation');
        location.reload();
    }
};

// 修改UI.init，添加注销按钮
const originalUIInit = UI.init;
UI.init = function() {
    originalUIInit.call(this);
    
    // 添加注销按钮到header
    const header = document.querySelector('.header');
    if (header) {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = '退出';
        logoutBtn.style.cssText = `
            position: absolute;
            right: 16px;
            background: none;
            border: none;
            color: white;
            font-size: 14px;
            opacity: 0.8;
        `;
        logoutBtn.onclick = () => Auth.logout();
        header.appendChild(logoutBtn);
    }
};