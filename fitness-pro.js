/**
 * AMBROSE Fitness Pro v3.0
 * 专业级健身系统
 */

class FitnessPro {
    constructor(ui) {
        this.ui = ui;
        this.currentView = null;
        this.videoLibrary = {
            strength: [
                { id: 'qILM02f85yY', title: '胸肌轰炸训练', subtitle: 'Chest Destruction', duration: '15:30', level: '进阶', views: '12.8M', thumbnail: '💪', color: '#00f3ff', desc: '胸大肌全面刺激 · 增肌必备' },
                { id: 'H1F-UfC8MbE', title: '背部力量特训', subtitle: 'Back Power', duration: '18:45', level: '中级', views: '8.5M', thumbnail: '🦍', color: '#00f3ff', desc: '引体向上 · 划船 · 背部宽度厚度' },
                { id: '9gjQdR08E1E', title: '腿部高强度训练', subtitle: 'Leg Day', duration: '22:00', level: '进阶', views: '6.2M', thumbnail: '🦵', color: '#00f3ff', desc: '深蹲 · 硬拉 · 腿部力量爆发' }
            ],
            hiit: [
                { id: 'ml6cT4AZdqI', title: '30分钟HIIT燃脂', subtitle: 'HIIT Fat Burner', duration: '30:00', level: '中级', views: '112M', thumbnail: '🔥', color: '#ff6b35', desc: '高强度间歇 · 极速燃脂' },
                { id: 'L_xrDAtykMI', title: '10分钟跳绳燃脂', subtitle: 'Jump Rope', duration: '10:00', level: '中级', views: '15.3M', thumbnail: '⚡', color: '#ff6b35', desc: '双摇 · 交叉跳 · 高效燃脂' },
                { id: '2MoGxTQmNIc', title: '15分钟有氧舞蹈', subtitle: 'Dance Cardio', duration: '15:00', level: '入门', views: '38.9M', thumbnail: '💃', color: '#ff6b35', desc: '音乐律动 · 快乐燃脂' }
            ],
            yoga: [
                { id: 'v7AYKMP6rOE', title: '晨间唤醒瑜伽', subtitle: 'Morning Flow', duration: '20:00', level: '入门', views: '28.7M', thumbnail: '🌅', color: '#9d4edd', desc: '唤醒身体 · 舒展脊柱' },
                { id: 'inpok4MKVLM', title: '睡前放松瑜伽', subtitle: 'Bedtime Yoga', duration: '15:00', level: '入门', views: '22.4M', thumbnail: '🌙', color: '#9d4edd', desc: '舒缓压力 · 改善睡眠' },
                { id: 'sTANio_2E0Q', title: '全身拉伸放松', subtitle: 'Full Stretch', duration: '12:00', level: '入门', views: '18.9M', thumbnail: '🌿', color: '#9d4edd', desc: '运动后恢复 · 缓解酸痛' }
            ]
        };
    }

    showFitnessHub() {
        const html = `
            <div class="fitness-hub" style="background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%); border-radius: 24px; margin: 16px 0; overflow: hidden; border: 1px solid rgba(0,243,255,0.15); box-shadow: 0 0 60px rgba(0,243,255,0.08); animation: fadeInUp 0.5s ease;">
                <div style="padding: 32px 24px; background: linear-gradient(135deg, rgba(0,243,255,0.1) 0%, rgba(255,0,160,0.05) 100%); border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #00f3ff, #00c2cc); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 0 30px rgba(0,243,255,0.4);">🏋️</div>
                        <div>
                            <div style="font-family: 'Orbitron', monospace; font-size: 24px; font-weight: 800; color: #fff; letter-spacing: 2px; text-shadow: 0 0 20px rgba(0,243,255,0.5);">FITNESS PRO</div>
                            <div style="font-size: 12px; color: #00f3ff; letter-spacing: 3px; margin-top: 4px;">AI PERSONAL TRAINER</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button onclick="Fitness.showVideoLibrary()" style="flex: 1; background: linear-gradient(135deg, #00f3ff, #00c2cc); border: none; border-radius: 12px; padding: 14px; color: #000; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 20px rgba(0,243,255,0.3);">🎬 视频训练</button>
                        <button onclick="Fitness.showNutrition()" style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 14px; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer;">🥗 饮食方案</button>
                    </div>
                </div>
                
                <div style="padding: 24px;">
                    <div style="font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 16px;">训练分类</div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                        <div onclick="Fitness.showCategory('strength')" style="background: linear-gradient(145deg, rgba(0,243,255,0.1), rgba(0,243,255,0.05)); border: 1px solid rgba(0,243,255,0.2); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                            onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(0,243,255,0.2)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                        >
                            <div style="font-size: 32px; margin-bottom: 8px;">💪</div>
                            <div style="font-size: 14px; font-weight: 600; color: #00f3ff;">力量训练</div>
                            <div style="font-size: 11px; color: #888; margin-top: 4px;">STRENGTH</div>
                        </div>
                        <div onclick="Fitness.showCategory('hiit')" style="background: linear-gradient(145deg, rgba(255,107,53,0.1), rgba(255,107,53,0.05)); border: 1px solid rgba(255,107,53,0.2); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                            onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(255,107,53,0.2)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                        >
                            <div style="font-size: 32px; margin-bottom: 8px;">🔥</div>
                            <div style="font-size: 14px; font-weight: 600; color: #ff6b35;">有氧燃脂</div>
                            <div style="font-size: 11px; color: #888; margin-top: 4px;">CARDIO</div>
                        </div>
                        <div onclick="Fitness.showCategory('yoga')" style="background: linear-gradient(145deg, rgba(157,78,221,0.1), rgba(157,78,221,0.05)); border: 1px solid rgba(157,78,221,0.2); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                            onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(157,78,221,0.2)';"
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                        >
                            <div style="font-size: 32px; margin-bottom: 8px;">🧘</div>
                            <div style="font-size: 14px; font-weight: 600; color: #9d4edd;">瑜伽拉伸</div>
                            <div style="font-size: 11px; color: #888; margin-top: 4px;">YOGA</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.ui.addMessageHTML(html, 'bot');
    }

    showCategory(category) {
        const videos = this.videoLibrary[category] || [];
        const categoryNames = { strength: '力量训练', hiit: '有氧燃脂', yoga: '瑜伽拉伸' };
        const categoryColors = { strength: '#00f3ff', hiit: '#ff6b35', yoga: '#9d4edd' };
        const color = categoryColors[category];
        
        let html = `
            <div style="background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%); border-radius: 24px; margin: 16px 0; padding: 24px; border: 1px solid ${color}30; animation: fadeInUp 0.4s ease;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                    <div style="font-size: 20px; font-weight: 700; color: ${color};">${categoryNames[category]}</div>
                    <button onclick="Fitness.showFitnessHub()" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 16px; color: #888; font-size: 13px; cursor: pointer;">← 返回</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 16px;">
        `;

        videos.forEach(video => {
            html += `
                <div onclick="Fitness.playVideo('${video.id}', '${video.title}', '${video.subtitle}', '${video.duration}', '${video.level}', '${video.views}', '${video.desc}', '${video.color}')" 
                    style="background: rgba(15, 18, 30, 0.85); border-radius: 16px; overflow: hidden; border: 1px solid ${video.color}30; cursor: pointer; transition: all 0.3s;"
                    onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 20px 40px ${video.color}20'; this.style.borderColor='${video.color}50';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'; this.style.borderColor='${video.color}30';"
                >
                    <div style="position: relative; aspect-ratio: 16/9; background: #000;">
                        <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;" />
                        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%);"></div>
                        <div style="position: absolute; bottom: 12px; left: 12px; right: 12px;">
                            <div style="font-size: 10px; color: ${video.color}; font-family: 'Orbitron'; letter-spacing: 1px; margin-bottom: 4px;">${video.subtitle}</div>
                            <div style="font-size: 16px; font-weight: 700; color: #fff;">${video.title}</div>
                        </div>
                        <div style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.8); padding: 4px 10px; border-radius: 20px; font-size: 11px; color: #fff; font-family: 'Orbitron';">${video.duration}</div>
                        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                            <div style="width: 60px; height: 60px; background: ${video.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 40px ${video.color};">
                                <span style="font-size: 24px; margin-left: 4px; color: #000;">▶</span>
                            </div>
                        </div>
                    </div>
                    <div style="padding: 16px;">
                        <div style="font-size: 13px; color: #888; margin-bottom: 12px;">${video.desc}</div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="background: ${video.color}15; color: ${video.color}; padding: 4px 12px; border-radius: 20px; font-size: 11px;">${video.level}</span>
                            <span style="font-size: 12px; color: #666;">👁 ${video.views}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div></div>`;
        this.ui.addMessageHTML(html, 'bot');
    }

    playVideo(id, title, subtitle, duration, level, views, desc, color) {
        const html = `
            <div style="background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%); border-radius: 24px; padding: 24px; margin: 16px 0; border: 1px solid ${color}50; box-shadow: 0 0 60px ${color}20;">
                <div style="position: relative; aspect-ratio: 16/9; background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
                    <iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" style="position: absolute; inset: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
                </div>
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 10px; color: ${color}; font-family: 'Orbitron'; letter-spacing: 2px; margin-bottom: 8px;">${subtitle}</div>
                    <div style="font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px;">${title}</div>
                    <div style="font-size: 13px; color: #888; margin-bottom: 12px;">${desc}</div>
                    <div style="display: flex; gap: 16px; font-size: 12px; color: #666;">
                        <span>⏱ ${duration}</span>
                        <span>👁 ${views}</span>
                        <span>📊 ${level}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <button onclick="UI.sendFitnessQuery('请给我详细的${title}训练指导，包括动作要领、组数次数建议和注意事项')" style="flex: 1; background: linear-gradient(135deg, ${color}, ${color}dd); border: none; border-radius: 12px; padding: 14px; color: #000; font-size: 15px; font-weight: 700; cursor: pointer;">🤖 AI训练指导</button>
                    <button onclick="this.closest('.video-player').remove()" style="width: 48px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: #fff; font-size: 16px; cursor: pointer;">✕</button>
                </div>
            </div>
        `;
        this.ui.addMessageHTML(html, 'bot');
    }

    showNutrition() {
        const html = `
            <div style="background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%); border-radius: 24px; margin: 16px 0; padding: 24px; border: 1px solid rgba(0,255,136,0.2);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                    <div style="font-size: 20px; font-weight: 700; color: #00ff88;">🥗 饮食管理</div>
                    <button onclick="Fitness.showFitnessHub()" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 16px; color: #888; font-size: 13px; cursor: pointer;">← 返回</button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <div onclick="UI.sendFitnessQuery('我正在增肌，请给我详细的增肌饮食方案和食谱推荐')" style="background: linear-gradient(145deg, rgba(0,255,136,0.1), rgba(0,255,136,0.05)); border: 1px solid rgba(0,255,136,0.25); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(0,255,136,0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                    >
                        <div style="font-size: 36px; margin-bottom: 12px;">🥩</div>
                        <div style="font-size: 15px; font-weight: 700; color: #00ff88;">增肌饮食</div>
                        <div style="font-size: 10px; color: #00ff88; opacity: 0.8; margin-top: 4px; font-family: 'Orbitron';">MUSCLE BUILDING</div>
                    </div>
                    
                    <div onclick="UI.sendFitnessQuery('我正在减脂，请给我低热量饮食方案和食谱推荐')" style="background: linear-gradient(145deg, rgba(0,255,136,0.1), rgba(0,255,136,0.05)); border: 1px solid rgba(0,255,136,0.25); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(0,255,136,0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                    >
                        <div style="font-size: 36px; margin-bottom: 12px;">🥗</div>
                        <div style="font-size: 15px; font-weight: 700; color: #00ff88;">减脂饮食</div>
                        <div style="font-size: 10px; color: #00ff88; opacity: 0.8; margin-top: 4px; font-family: 'Orbitron';">FAT LOSS</div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; background: rgba(0,255,136,0.05); border: 1px dashed rgba(0,255,136,0.2); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer;"
                    onclick="Fitness.showBodyMetrics()"
                >
                    <span style="font-size: 14px; color: #00ff88;">📊 身体数据测算 →</span>
                </div>
            </div>
        `;
        this.ui.addMessageHTML(html, 'bot');
    }
    
    showBodyMetrics() {
        const html = `
            <div style="background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%); border-radius: 24px; margin: 16px 0; padding: 24px; border: 1px solid rgba(0,243,255,0.2);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                    <div style="font-size: 20px; font-weight: 700; color: #00f3ff;">📊 身体数据测算</div>
                    <button onclick="Fitness.showNutrition()" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 16px; color: #888; font-size: 13px; cursor: pointer;">← 返回</button>
                </div>
                
                <div style="display: grid; gap: 12px;">
                    <div onclick="UI.handleSendWithPrompt('请帮我计算BMI身体质量指数，详细解释结果含义，并根据我的情况给出健康建议')" 
                        style="background: rgba(0,243,255,0.05); border: 1px solid rgba(0,243,255,0.15); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='rgba(0,243,255,0.1)'; this.style.transform='translateX(4px)';"
                        onmouseout="this.style.background='rgba(0,243,255,0.05)'; this.style.transform='translateX(0)';"
                    >
                        <div style="font-size: 32px;">⚖️</div>
                        <div style="flex: 1;">
                            <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px;">BMI 身体质量指数</div>
                            <div style="font-size: 11px; color: #00f3ff; font-family: 'Orbitron'; margin-bottom: 4px;">BODY MASS INDEX</div>
                            <div style="font-size: 12px; color: #888;">评估体重健康状况的标准指标</div>
                        </div>
                        <div style="color: #00f3ff; font-size: 20px;">→</div>
                    </div>
                    
                    <div onclick="UI.handleSendWithPrompt('请帮我计算基础代谢率BMR，解释影响代谢的因素，并给出提高代谢的建议')" 
                        style="background: rgba(255,0,160,0.05); border: 1px solid rgba(255,0,160,0.15); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='rgba(255,0,160,0.1)'; this.style.transform='translateX(4px)';"
                        onmouseout="this.style.background='rgba(255,0,160,0.05)'; this.style.transform='translateX(0)';"
                    >
                        <div style="font-size: 32px;">🔥</div>
                        <div style="flex: 1;">
                            <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px;">基础代谢率 BMR</div>
                            <div style="font-size: 11px; color: #ff00a0; font-family: 'Orbitron'; margin-bottom: 4px;">BASAL METABOLIC RATE</div>
                            <div style="font-size: 12px; color: #888;">静息状态下的能量消耗</div>
                        </div>
                        <div style="color: #ff00a0; font-size: 20px;">→</div>
                    </div>
                    
                    <div onclick="UI.handleSendWithPrompt('请帮我计算每日总热量需求TDEE，根据我的运动强度给出具体的卡路里建议')" 
                        style="background: rgba(0,255,136,0.05); border: 1px solid rgba(0,255,136,0.15); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='rgba(0,255,136,0.1)'; this.style.transform='translateX(4px)';"
                        onmouseout="this.style.background='rgba(0,255,136,0.05)'; this.style.transform='translateX(0)';"
                    >
                        <div style="font-size: 32px;">📈</div>
                        <div style="flex: 1;">
                            <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px;">每日热量需求 TDEE</div>
                            <div style="font-size: 11px; color: #00ff88; font-family: 'Orbitron'; margin-bottom: 4px;">TOTAL DAILY ENERGY EXPENDITURE</div>
                            <div style="font-size: 12px; color: #888;">包含运动的总能量消耗</div>
                        </div>
                        <div style="color: #00ff88; font-size: 20px;">→</div>
                    </div>
                    
                    <div onclick="UI.handleSendWithPrompt('请帮我计算每日建议饮水量，并给出科学饮水的建议')" 
                        style="background: rgba(0,150,255,0.05); border: 1px solid rgba(0,150,255,0.15); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.background='rgba(0,150,255,0.1)'; this.style.transform='translateX(4px)';"
                        onmouseout="this.style.background='rgba(0,150,255,0.05)'; this.style.transform='translateX(0)';"
                    >
                        <div style="font-size: 32px;">💧</div>
                        <div style="flex: 1;">
                            <div style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 4px;">每日饮水量</div>
                            <div style="font-size: 11px; color: #0096ff; font-family: 'Orbitron'; margin-bottom: 4px;">WATER INTAKE</div>
                            <div style="font-size: 12px; color: #888;">根据体重计算每日建议饮水</div>
                        </div>
                        <div style="color: #0096ff; font-size: 20px;">→</div>
                    </div>
                </div>
            </div>
        `;
        this.ui.addMessageHTML(html, 'bot');
    }
}

// 全局实例
window.FitnessPro = FitnessPro;
