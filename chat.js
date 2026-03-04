/**
 * AMBROSE - 微信H5语音对话 (修复版)
 */

// ==================== 配置管理 ====================
const Config = {
    // 默认配置（预填的Key）
    defaults: {
        kimi_api_key: 'sk-Wa4NDeoKOszV7Q0kdKCXJEcleDPL6gPk5CumMyqD74SUCvky',
        ali_key_id: '',
        ali_key_secret: '',
        ali_app_key: '',
        voice_type: 'zhixia'
    },
    
    get(key) {
        return localStorage.getItem(key) || this.defaults[key] || '';
    },
    set(key, value) {
        localStorage.setItem(key, value);
    },
    getAll() {
        return {
            kimiApiKey: this.get('kimi_api_key'),
            aliKeyId: this.get('ali_key_id'),
            aliKeySecret: this.get('ali_key_secret'),
            aliAppKey: this.get('ali_app_key'),
            voiceType: this.get('voice_type') || 'zhixia'
        };
    }
};

// ==================== 语音识别 ====================
const VoiceRecognition = {
    recognition: null,
    isRecording: false,
    
    init() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.log('浏览器不支持语音识别');
            return false;
        }
        
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'zh-CN';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        
        this.recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            console.log('识别结果:', text);
            Chat.sendMessage(text);
        };
        
        this.recognition.onerror = (event) => {
            console.error('语音识别错误:', event.error);
            UI.hideRecording();
            if (event.error !== 'aborted') {
                UI.showToast('语音识别失败: ' + event.error);
            }
        };
        
        this.recognition.onend = () => {
            console.log('录音结束');
            this.isRecording = false;
            UI.hideRecording();
        };
        
        return true;
    },
    
    start() {
        if (!this.recognition) {
            if (!this.init()) {
                UI.showToast('您的浏览器不支持语音识别，请使用文字输入');
                return false;
            }
        }
        
        try {
            this.recognition.start();
            this.isRecording = true;
            console.log('录音开始');
            return true;
        } catch (err) {
            console.error('启动录音失败:', err);
            UI.showToast('启动录音失败，请重试');
            return false;
        }
    },
    
    stop() {
        if (this.recognition && this.isRecording) {
            try {
                this.recognition.stop();
            } catch (err) {
                console.error('停止录音失败:', err);
            }
            this.isRecording = false;
        }
    }
};

// ==================== 阿里云语音合成 ====================
const AliyunTTS = {
    async synthesize(text, voice = 'zhixia') {
        const config = Config.getAll();
        if (!config.aliKeyId || !config.aliKeySecret) {
            return this.browserTTS(text);
        }
        
        try {
            // 这里简化处理，实际应该调用后端API
            return this.browserTTS(text);
        } catch (err) {
            console.error('TTS失败:', err);
            return this.browserTTS(text);
        }
    },
    
    browserTTS(text) {
        if ('speechSynthesis' in window) {
            // 停止之前的播放
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            
            // 尝试找女声
            const voices = window.speechSynthesis.getVoices();
            const femaleVoice = voices.find(v => v.lang.includes('zh') && (v.name.includes('Female') || v.name.includes('女')));
            if (femaleVoice) {
                utterance.voice = femaleVoice;
            }
            
            window.speechSynthesis.speak(utterance);
            return true;
        }
        return false;
    }
};

// ==================== UI 控制 ====================
const UI = {
    messages: null,
    recordingModal: null,
    isRecording: false,
    
    init() {
        this.messages = document.getElementById('messages');
        this.recordingModal = document.getElementById('recordingModal');
        this.loadSettings();
        this.bindEvents();
        VoiceRecognition.init();
    },
    
    bindEvents() {
        const voiceBtn = document.getElementById('voiceBtn');
        if (!voiceBtn) return;
        
        // 触摸事件（手机）
        voiceBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.startRecord();
        }, { passive: false });
        
        voiceBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.stopRecord();
        }, { passive: false });
        
        voiceBtn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            this.stopRecord();
        });
        
        // 鼠标事件（电脑）
        voiceBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.startRecord();
        });
        
        voiceBtn.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.stopRecord();
        });
        
        voiceBtn.addEventListener('mouseleave', (e) => {
            if (this.isRecording) {
                this.stopRecord();
            }
        });
    },
    
    startRecord() {
        if (this.isRecording) return;
        
        console.log('开始录音...');
        this.isRecording = true;
        this.showRecording();
        
        // 延迟启动语音识别，让用户看到反馈
        setTimeout(() => {
            VoiceRecognition.start();
        }, 100);
    },
    
    stopRecord() {
        if (!this.isRecording) return;
        
        console.log('停止录音...');
        this.isRecording = false;
        VoiceRecognition.stop();
        this.hideRecording();
    },
    
    showRecording() {
        if (this.recordingModal) {
            this.recordingModal.classList.add('show');
        }
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.classList.add('recording');
            voiceBtn.textContent = '松开发送';
        }
    },
    
    hideRecording() {
        if (this.recordingModal) {
            this.recordingModal.classList.remove('show');
        }
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.classList.remove('recording');
            voiceBtn.textContent = '按住 说话';
        }
    },
    
    addMessage(text, sender, showVoice = true) {
        if (!this.messages) return;
        
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        
        const avatar = sender === 'user' ? '👤' : '🧰';
        
        let bubbleContent = text;
        if (showVoice && sender === 'bot') {
            bubbleContent += `<br><span class="voice-play" onclick="UI.playVoice(this, '${text.replace(/'/g, "\\'")}')">🔊 播放</span>`;
        }
        
        div.innerHTML = `
            <div class="avatar">${avatar}</div>
            <div class="bubble">${bubbleContent}</div>
        `;
        
        this.messages.appendChild(div);
        this.scrollToBottom();
    },
    
    addTyping() {
        const div = document.createElement('div');
        div.className = 'message bot typing-indicator';
        div.innerHTML = `
            <div class="avatar">🧰</div>
            <div class="bubble typing"><span></span><span></span><span></span></div>
        `;
        this.messages.appendChild(div);
        this.scrollToBottom();
        return div;
    },
    
    removeTyping() {
        const indicator = this.messages?.querySelector('.typing-indicator');
        if (indicator) indicator.remove();
    },
    
    scrollToBottom() {
        if (this.messages) {
            this.messages.scrollTop = this.messages.scrollHeight;
        }
    },
    
    playVoice(btn, text) {
        btn.classList.add('playing');
        btn.textContent = '🔊 播放中...';
        
        const voice = Config.get('voice_type') || 'zhixia';
        AliyunTTS.synthesize(text, voice);
        
        setTimeout(() => {
            btn.classList.remove('playing');
            btn.textContent = '🔊 播放';
        }, Math.min(text.length * 200, 5000));
    },
    
    showToast(msg) {
        // 移除旧toast
        document.querySelectorAll('.toast-msg').forEach(t => t.remove());
        
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            z-index: 9999;
            font-size: 14px;
            text-align: center;
        `;
        toast.textContent = msg;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 2500);
    },
    
    loadSettings() {
        const config = Config.getAll();
        const els = {
            kimiApiKey: document.getElementById('kimiApiKey'),
            aliKeyId: document.getElementById('aliKeyId'),
            aliKeySecret: document.getElementById('aliKeySecret'),
            aliAppKey: document.getElementById('aliAppKey'),
            voiceType: document.getElementById('voiceType')
        };
        
        if (els.kimiApiKey) els.kimiApiKey.value = config.kimiApiKey;
        if (els.aliKeyId) els.aliKeyId.value = config.aliKeyId;
        if (els.aliKeySecret) els.aliKeySecret.value = config.aliKeySecret;
        if (els.aliAppKey) els.aliAppKey.value = config.aliAppKey;
        if (els.voiceType) els.voiceType.value = config.voiceType;
    }
};

// ==================== 聊天逻辑 ====================
const Chat = {
    async sendMessage(text) {
        if (!text || !text.trim()) return;
        
        console.log('发送消息:', text);
        UI.addMessage(text, 'user', false);
        
        // 检查API配置
        const config = Config.getAll();
        if (!config.kimiApiKey) {
            UI.addMessage('请先点击右上角 ⚙️ 设置 API Key', 'bot');
            return;
        }
        
        UI.addTyping();
        
        try {
            // 模拟API调用（实际应该调用真实API）
            await new Promise(r => setTimeout(r, 1000));
            const reply = `收到你的消息："${text}"\n\n（这里将显示AI的实际回复，需要配置Kimi API Key）`;
            
            UI.removeTyping();
            UI.addMessage(reply, 'bot', true);
            
            // 自动播放
            const voice = config.voiceType || 'zhixia';
            AliyunTTS.synthesize(reply, voice);
        } catch (err) {
            UI.removeTyping();
            UI.addMessage('抱歉，服务暂时不可用', 'bot');
        }
    }
};

// ==================== 全局函数 ====================

// 切换输入模式
function switchInput() {
    const voiceBtn = document.getElementById('voiceBtn');
    const textInput = document.getElementById('textInput');
    const sendBtn = document.getElementById('sendBtn');
    const switchBtn = document.getElementById('switchBtn');
    
    if (!voiceBtn || !textInput) return;
    
    if (voiceBtn.style.display === 'none') {
        // 切换到语音
        voiceBtn.style.display = 'flex';
        textInput.style.display = 'none';
        sendBtn.style.display = 'none';
        switchBtn.textContent = '🎙️';
    } else {
        // 切换到文字
        voiceBtn.style.display = 'none';
        textInput.style.display = 'block';
        sendBtn.style.display = 'block';
        switchBtn.textContent = '⌨️';
        textInput.focus();
    }
}

// 发送文字
function sendText() {
    const input = document.getElementById('textInput');
    if (input && input.value.trim()) {
        Chat.sendMessage(input.value);
        input.value = '';
    }
}

// 设置面板
function showSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel) panel.classList.add('show');
}

function hideSettings() {
    const panel = document.getElementById('settingsPanel');
    if (panel) panel.classList.remove('show');
}

function saveSettings() {
    Config.set('kimi_api_key', document.getElementById('kimiApiKey')?.value || '');
    Config.set('ali_key_id', document.getElementById('aliKeyId')?.value || '');
    Config.set('ali_key_secret', document.getElementById('aliKeySecret')?.value || '');
    Config.set('ali_app_key', document.getElementById('aliAppKey')?.value || '');
    Config.set('voice_type', document.getElementById('voiceType')?.value || 'zhixia');
    
    UI.showToast('设置已保存');
    hideSettings();
}

// 旧的事件处理函数（兼容性）
function startRecord(e) {
    e?.preventDefault?.();
    UI.startRecord();
}

function stopRecord(e) {
    e?.preventDefault?.();
    UI.stopRecord();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('初始化中...');
    UI.init();
    
    // 回车发送
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendText();
        });
    }
});

// 防止微信浏览器下拉刷新
document.addEventListener('touchmove', (e) => {
    if (e.target.closest('.messages')) return;
    // e.preventDefault();
}, { passive: true });