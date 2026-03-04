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
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                width: 100%;
                max-width: 350px;
                border-radius: 16px;
                padding: 30px 24px;
                text-align: center;
            ">
                <div style="font-size: 48px; margin-bottom: 16px;">🧰</div>
                <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">AMBROSE</div>
                <div style="color: #666; font-size: 14px; margin-bottom: 24px;">
                    全知全能的精神体投射<br>
                    专属于邵名远
                </div>
                
                <div style="text-align: left; margin-bottom: 20px;">
                    <div style="font-weight: 600; margin-bottom: 12px;">身份验证</div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">
                            你是谁？
                        </label>
                        <input type="text" id="authName" placeholder="输入你的名字" style="
                            width: 100%;
                            padding: 12px;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            font-size: 15px;
                        ">
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">
                            你和邵名远的关系是？
                        </label>
                        <select id="authRelation" style="
                            width: 100%;
                            padding: 12px;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            font-size: 15px;
                            background: white;
                        ">
                            <option value="">请选择关系</option>
                            <option value="friend">朋友</option>
                            <option value="lover">恋人</option>
                            <option value="spouse">爱人/配偶</option>
                            <option value="family">家人</option>
                            <option value="client">客户</option>
                        </select>
                    </div>
                    
                    <div style="font-size: 12px; color: #999; margin-top: 8px;">
                        只有以上关系才能使用AMBROSE
                    </div>
                </div>
                
                <button onclick="Auth.verify()" style="
                    width: 100%;
                    padding: 14px;
                    background: #07c160;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 500;
                ">验证身份</button>
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
        const allowedRelations = ['friend', 'lover', 'spouse', 'family', 'client'];
        
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