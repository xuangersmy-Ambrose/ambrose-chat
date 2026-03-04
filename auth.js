// 身份验证模块 - 赛博朋克版（含性别选择）
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
                max-height: 90vh;
                overflow-y: auto;
            ">
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
                
                <div style="
                    font-size: 56px;
                    margin-bottom: 20px;
                    text-shadow: 0 0 30px rgba(0, 243, 255, 0.8);
                    animation: pulse-icon 2s ease-in-out infinite;
                ">🧰</div>
                
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
                    margin-bottom: 24px;
                    line-height: 1.6;
                ">
                    全知全能的精神体投射<br>
                    <span style="color: #00f3ff;">专属于 BOSS Shao</span>
                </div>
                
                <div style="
                    border-top: 1px solid rgba(0, 243, 255, 0.3);
                    padding-top: 20px;
                    margin-bottom: 20px;
                ">
                    <div style="
                        font-family: 'Orbitron', monospace;
                        color: #ff00ff;
                        font-size: 12px;
                        letter-spacing: 2px;
                        margin-bottom: 16px;
                        text-transform: uppercase;
                    ">身份验证 // IDENTITY_VERIFY</div>
                    
                    <!-- 性别选择 -->
                    <div style="margin-bottom: 16px; text-align: left;">
                        <label style="
                            display: block;
                            font-size: 12px;
                            color: #00f3ff;
                            margin-bottom: 8px;
                            font-family: 'Orbitron', monospace;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                        ">
                            性别 // GENDER
                        </label>
                        <div style="display: flex; gap: 12px;">
                            <div id="genderMale" onclick="Auth.selectGender('male')" style="
                                flex: 1;
                                padding: 12px;
                                background: rgba(0, 243, 255, 0.1);
                                border: 2px solid rgba(0, 243, 255, 0.3);
                                border-radius: 8px;
                                cursor: pointer;
                                text-align: center;
                                transition: all 0.3s;
                            ">
                                <div style="font-size: 28px; margin-bottom: 4px;">👨</div>
                                <div style="font-size: 11px; color: #00f3ff;">男 // MALE</div>
                            </div>
                            <div id="genderFemale" onclick="Auth.selectGender('female')" style="
                                flex: 1;
                                padding: 12px;
                                background: rgba(255, 0, 160, 0.1);
                                border: 2px solid rgba(255, 0, 160, 0.3);
                                border-radius: 8px;
                                cursor: pointer;
                                text-align: center;
                                transition: all 0.3s;
                            ">
                                <div style="font-size: 28px; margin-bottom: 4px;">👩</div>
                                <div style="font-size: 11px; color: #ff00a0;">女 // FEMALE</div>
                            </div>
                        </div>
                        <input type="hidden" id="authGender" value="">
                    </div>
                    
                    <div style="margin-bottom: 16px; text-align: left;">
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
                    
                    <div style="margin-bottom: 16px; text-align: left;">
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
                        " onchange="Auth.onRelationChange()">
                            <option value="" style="background: #0a0a0f;">选择关系 // SELECT</option>
                            <option value="self" style="background: #0a0a0f;">本人 // SELF</option>
                            <option value="friend" style="background: #0a0a0f;">朋友 // FRIEND</option>
                            <option value="lover" style="background: #0a0a0f;">恋人 // LOVER</option>
                            <option value="spouse" style="background: #0a0a0f;">爱人/配偶 // SPOUSE</option>
                            <option value="family" style="background: #0a0a0f;">家人 // FAMILY</option>
                            <option value="client" style="background: #0a0a0f;">客户 // CLIENT</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 16px; text-align: left;">
                        <label style="
                            display: block;
                            font-size: 12px;
                            color: #ffaa00;
                            margin-bottom: 8px;
                            font-family: 'Orbitron', monospace;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                        ">
                            邀请码 // INVITE_CODE
                        </label>
                        <input type="password" id="authInviteCode" placeholder="****" maxlength="4" style="
                            width: 100%;
                            padding: 14px;
                            background: rgba(0, 0, 0, 0.5);
                            border: 1px solid #ffaa00;
                            border-radius: 4px;
                            font-size: 15px;
                            color: #fff;
                            outline: none;
                            letter-spacing: 4px;
                            box-shadow: inset 0 0 10px rgba(255, 170, 0, 0.1);
                            transition: all 0.3s;
                        " onfocus="this.style.borderColor='#ffaa00'; this.style.boxShadow='inset 0 0 15px rgba(255, 170, 0, 0.2), 0 0 20px rgba(255, 170, 0, 0.3)'" 
                        onblur="this.style.borderColor='#ffaa00'; this.style.boxShadow='inset 0 0 10px rgba(255, 170, 0, 0.1)'">
                        <div style="
                            font-size: 10px;
                            color: #ffaa00;
                            margin-top: 8px;
                            font-family: 'Orbitron', monospace;
                            letter-spacing: 1px;
                        ">
                            ⚠ 请输入邀请码 8888，或向 BOSS Shao 本人索取
                        </div>
                    </div>
                    
                    <div id="idCardVerify" style="margin-bottom: 16px; text-align: left; display: none;">
                        <label style="
                            display: block;
                            font-size: 12px;
                            color: #ff0040;
                            margin-bottom: 8px;
                            font-family: 'Orbitron', monospace;
                            letter-spacing: 1px;
                            text-transform: uppercase;
                        ">
                            专属验证码 // MASTER_CODE
                        </label>
                        <input type="password" id="authMasterCode" placeholder="****" maxlength="4" style="
                            width: 100%;
                            padding: 14px;
                            background: rgba(0, 0, 0, 0.5);
                            border: 1px solid #ff0040;
                            border-radius: 4px;
                            font-size: 15px;
                            color: #fff;
                            outline: none;
                            letter-spacing: 4px;
                            box-shadow: inset 0 0 10px rgba(255, 0, 64, 0.1);
                            transition: all 0.3s;
                        " onfocus="this.style.borderColor='#ff0040'; this.style.boxShadow='inset 0 0 15px rgba(255, 0, 64, 0.2), 0 0 20px rgba(255, 0, 64, 0.3)'" 
                        onblur="this.style.borderColor='#ff0040'; this.style.boxShadow='inset 0 0 10px rgba(255, 0, 64, 0.1)'">
                        <div style="
                            font-size: 10px;
                            color: #ff0040;
                            margin-top: 8px;
                            font-family: 'Orbitron', monospace;
                            letter-spacing: 1px;
                        ">
                            ⚠ 本人身份需要输入专属验证码 0812
                        </div>
                    </div>
                    
                    <div style="
                        font-size: 11px;
                        color: #666;
                        margin-top: 12px;
                        font-family: 'Orbitron', monospace;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        border-left: 2px solid #ff00ff;
                        padding-left: 12px;
                    ">
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
                onmouseout="this.style.boxShadow='0 0 20px rgba(255, 0, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)'"
                >
                    验证身份 // VERIFY
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse-icon {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            .gender-selected-male {
                background: rgba(0, 243, 255, 0.3) !important;
                border-color: #00f3ff !important;
                box-shadow: 0 0 20px rgba(0, 243, 255, 0.4) !important;
            }
            .gender-selected-female {
                background: rgba(255, 0, 160, 0.3) !important;
                border-color: #ff00a0 !important;
                box-shadow: 0 0 20px rgba(255, 0, 160, 0.4) !important;
            }
        `;
        document.head.appendChild(style);
    },
    
    selectGender(gender) {
        const maleDiv = document.getElementById('genderMale');
        const femaleDiv = document.getElementById('genderFemale');
        const genderInput = document.getElementById('authGender');
        
        if (gender === 'male') {
            maleDiv.classList.add('gender-selected-male');
            femaleDiv.classList.remove('gender-selected-female');
        } else {
            maleDiv.classList.remove('gender-selected-male');
            femaleDiv.classList.add('gender-selected-female');
        }
        
        genderInput.value = gender;
    },
    
    onRelationChange() {
        const relation = document.getElementById('authRelation')?.value;
        const masterCodeDiv = document.getElementById('idCardVerify');
        
        if (relation === 'self') {
            masterCodeDiv.style.display = 'block';
        } else {
            masterCodeDiv.style.display = 'none';
            document.getElementById('authMasterCode').value = '';
        }
    },
    
    verify() {
        const gender = document.getElementById('authGender')?.value;
        const name = document.getElementById('authName')?.value?.trim();
        const relation = document.getElementById('authRelation')?.value;
        const inviteCode = document.getElementById('authInviteCode')?.value?.trim();
        const masterCode = document.getElementById('authMasterCode')?.value?.trim();
        
        if (!gender) {
            alert('请选择性别');
            return;
        }
        
        if (!name) {
            alert('请输入你的代号');
            return;
        }
        
        if (!relation) {
            alert('请选择你和邵名远的关系');
            return;
        }
        
        // 所有用户都需要验证邀请码 8888
        if (!inviteCode) {
            alert('请输入邀请码');
            return;
        }
        
        if (inviteCode !== '8888') {
            alert('邀请码错误，请向邵名远本人索取正确的邀请码');
            return;
        }
        
        // 本人身份需要额外验证专属验证码 0812
        if (relation === 'self') {
            if (!masterCode) {
                alert('本人身份需要输入专属验证码');
                return;
            }
            if (masterCode !== '0812') {
                alert('专属验证码错误，无法以本人身份登录');
                return;
            }
        }
        
        // 保存验证信息
        localStorage.setItem('ambrose_authed', 'true');
        localStorage.setItem('ambrose_user_gender', gender);
        localStorage.setItem('ambrose_user_name', name);
        localStorage.setItem('ambrose_user_relation', relation);
        
        // 移除验证弹窗
        document.getElementById('authModal')?.remove();
        
        // 初始化UI
        UI.init();
        
        // 欢迎消息
        const relationText = {
            'self': '本人',
            'friend': '朋友',
            'lover': '恋人',
            'spouse': '爱人',
            'family': '家人',
            'client': '客户'
        }[relation];
        
        const genderText = gender === 'male' ? '男' : '女';
        
        setTimeout(() => {
            UI.addMessage(`验证通过。\n\n你好，${name}。\n你是 BOSS Shao 的${relationText}（${genderText}），可以使用我。\n\n我是 AMBROSE，很高兴为你服务。`, 'bot');
        }, 300);
    },
    
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
    
    logout() {
        // 清除登录状态
        localStorage.removeItem('ambrose_authed');
        localStorage.removeItem('ambrose_user_gender');
        localStorage.removeItem('ambrose_user_name');
        localStorage.removeItem('ambrose_user_relation');
        
        // 重置认证状态
        this.isAuthenticated = false;
        
        // 隐藏当前聊天界面
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.style.display = 'none';
        }
        
        // 移除可能存在的旧登录弹窗
        const oldModal = document.getElementById('authModal');
        if (oldModal) {
            oldModal.remove();
        }
        
        // 显示登录界面（不刷新页面）
        this.showAuthModal();
    }
};