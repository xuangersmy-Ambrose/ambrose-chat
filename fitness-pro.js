/**
 * AMBROSE Fitness Pro v3.0
 * 专业级健身系统 - 使用哔哩哔哩视频源
 */

class FitnessPro {
    constructor(ui) {
        this.ui = ui;
        this.currentView = null;
        // 使用哔哩哔哩视频源 - 国内直接播放，无需登录
        this.videoLibrary = {
            strength: [
                { 
                    id: 'BV1ea411q7bJ', 
                    title: '帕梅拉 10分钟腹肌训练', 
                    subtitle: 'Pamela Abs Workout', 
                    duration: '10:00', 
                    level: '中级', 
                    views: '2.8M', 
                    thumbnail: '🎯', 
                    color: '#00f3ff', 
                    desc: '高效腹肌雕刻 · 马甲线塑造'
                },
                { 
                    id: 'BV1gM4y1c7K6', 
                    title: '帕梅拉 15分钟全身燃脂', 
                    subtitle: 'Full Body Fat Burn', 
                    duration: '15:00', 
                    level: '中级', 
                    views: '3.5M', 
                    thumbnail: '🔥', 
                    color: '#00f3ff', 
                    desc: '全身塑形 · 高效燃脂'
                },
                { 
                    id: 'BV1T4411H7sE', 
                    title: '周六野 10分钟HIIT', 
                    subtitle: 'Zoey HIIT Workout', 
                    duration: '10:00', 
                    level: '入门', 
                    views: '5.2M', 
                    thumbnail: '⚡', 
                    color: '#00f3ff', 
                    desc: '无器械 · 快速燃脂'
                }
            ],
            hiit: [
                { 
                    id: 'BV1XK4y1G7Xa', 
                    title: '韩小四 12分钟HIIT', 
                    subtitle: 'April HIIT Cardio', 
                    duration: '12:00', 
                    level: '中级', 
                    views: '1.8M', 
                    thumbnail: '💃', 
                    color: '#ff6b35', 
                    desc: '全身燃脂 · 提升心肺'
                },
                { 
                    id: 'BV1S54y1G7Ch', 
                    title: '帕梅拉 20分钟全身训练', 
                    subtitle: 'Full Body Workout', 
                    duration: '20:00', 
                    level: '进阶', 
                    views: '2.1M', 
                    thumbnail: '💪', 
                    color: '#ff6b35', 
                    desc: '高强度 · 全身肌群激活'
                },
                { 
                    id: 'BV1jt4y1q7hY', 
                    title: '周六野 20分钟有氧', 
                    subtitle: 'Aerobic Cardio', 
                    duration: '20:00', 
                    level: '入门', 
                    views: '4.3M', 
                    thumbnail: '🏃', 
                    color: '#ff6b35', 
                    desc: '低冲击 · 持续燃脂'
                }
            ],
            yoga: [
                { 
                    id: 'BV1Kb411L7ZC', 
                    title: '周六野 床上瑜伽', 
                    subtitle: 'Bed Yoga', 
                    duration: '15:00', 
                    level: '入门', 
                    views: '3.7M', 
                    thumbnail: '🌙', 
                    color: '#9d4edd', 
                    desc: '睡前放松 · 改善睡眠'
                },
                { 
                    id: 'BV1bE411C7jE', 
                    title: '韩小四 全身拉伸', 
                    subtitle: 'Full Body Stretch', 
                    duration: '12:00', 
                    level: '入门', 
                    views: '2.2M', 
                    thumbnail: '🌿', 
                    color: '#9d4edd', 
                    desc: '运动后恢复 · 缓解酸痛'
                },
                { 
                    id: 'BV1Lt4y1q7CJ', 
                    title: '帕梅拉 10分钟拉伸', 
                    subtitle: 'Cool Down Stretch', 
                    duration: '10:00', 
                    level: '入门', 
                    views: '1.5M', 
                    thumbnail: '🧘', 
                    color: '#9d4edd', 
                    desc: '运动后拉伸 · 放松肌肉'
                }
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
                    <div style="position: relative; aspect-ratio: 16/9; background: linear-gradient(135deg, ${video.color}20, ${video.color}05); display: flex; align-items: center; justify-content: center;">
                        <div style="font-size: 48px; filter: drop-shadow(0 0 15px ${video.color});">${video.thumbnail}</div>
                        <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.85); padding: 4px 10px; border-radius: 6px; font-size: 11px; color: #fff; font-family: 'Orbitron'; font-weight: 600;">${video.duration}</div>
                        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); opacity: 0; transition: opacity 0.3s;" class="play-overlay"
                        >
                            <div style="width: 56px; height: 56px; background: ${video.color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 40px ${video.color}, 0 0 80px ${video.color}50; transition: transform 0.3s; transform: scale(0.9);">
                                <span style="font-size: 24px; margin-left: 4px; color: #000;">▶</span>
                            </div>
                        </div>
                    </div>
                    <div style="padding: 16px;">
                        <div style="font-size: 10px; color: ${video.color}; font-family: 'Orbitron'; letter-spacing: 1px; margin-bottom: 6px; text-transform: uppercase; font-weight: 500;">${video.subtitle}</div>
                        <div style="font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 8px;">${video.title}</div>
                        <div style="font-size: 12px; color: #888; margin-bottom: 12px;">${video.desc}</div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="background: ${video.color}15; color: ${video.color}; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 500;">${video.level}</span>
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
        // 哔哩哔哩嵌入播放器 - 国内直接播放，无需登录
        const embedUrl = `https://player.bilibili.com/player.html?bvid=${id}&page=1&high_quality=1&danmaku=0&autoplay=1`;
        
        const html = `
            <div class="video-player" style="background: linear-gradient(180deg, rgba(10,12,20,0.98) 0%, rgba(5,5,8,1) 100%); border-radius: 24px; padding: 24px; margin: 16px 0; border: 1px solid ${color}50; box-shadow: 0 0 60px ${color}20;">
                <div style="position: relative; aspect-ratio: 16/9; background: #000; border-radius: 16px; overflow: hidden; margin-bottom: 20px;">
                    <iframe 
                        src="${embedUrl}" 
                        style="position: absolute; inset: 0; width: 100%; height: 100%; border: none;" 
                        allowfullscreen
                        scrolling="no"
                        frameborder="0"
                        sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
                    ></iframe>
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
                    <button onclick="UI.handleSendWithPrompt('请给我详细的${title}训练指导，包括动作要领、组数次数建议和注意事项')" style="flex: 1; background: linear-gradient(135deg, ${color}, ${color}dd); border: none; border-radius: 12px; padding: 14px; color: #000; font-size: 15px; font-weight: 700; cursor: pointer;">🤖 AI训练指导</button>
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
                    <div style="font-size: 20px; font-weight: 700; color: #00ff88;">🥗 营养健康中心</div>
                    <button onclick="Fitness.showFitnessHub()" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 16px; color: #888; font-size: 13px; cursor: pointer;">← 返回</button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
                    <div onclick="Fitness.showBodyMetrics()" style="background: linear-gradient(145deg, rgba(0,243,255,0.1), rgba(0,243,255,0.05)); border: 1px solid rgba(0,243,255,0.2); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(0,243,255,0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                    >
                        <div style="font-size: 36px; margin-bottom: 12px;">📊</div>
                        <div style="font-size: 15px; font-weight: 700; color: #00f3ff;">身体数据</div>
                        <div style="font-size: 10px; color: #00f3ff; opacity: 0.8; margin-top: 4px; font-family: 'Orbitron';">BODY METRICS</div>
                    </div>
                    
                    <div onclick="UI.handleSendWithPrompt('我正在增肌，请给我详细的增肌饮食方案和食谱推荐')" style="background: linear-gradient(145deg, rgba(0,255,136,0.1), rgba(0,255,136,0.05)); border: 1px solid rgba(0,255,136,0.25); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(0,255,136,0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                    >
                        <div style="font-size: 36px; margin-bottom: 12px;">🥩</div>
                        <div style="font-size: 15px; font-weight: 700; color: #00ff88;">增肌饮食</div>
                        <div style="font-size: 10px; color: #00ff88; opacity: 0.8; margin-top: 4px; font-family: 'Orbitron';">MUSCLE BUILDING</div>
                    </div>
                    
                    <div onclick="UI.handleSendWithPrompt('我正在减脂，请给我低热量饮食方案和食谱推荐')" style="background: linear-gradient(145deg, rgba(255,107,53,0.1), rgba(255,107,53,0.05)); border: 1px solid rgba(255,107,53,0.25); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(255,107,53,0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                    >
                        <div style="font-size: 36px; margin-bottom: 12px;">🥗</div>
                        <div style="font-size: 15px; font-weight: 700; color: #ff6b35;">减脂饮食</div>
                        <div style="font-size: 10px; color: #ff6b35; opacity: 0.8; margin-top: 4px; font-family: 'Orbitron';">FAT LOSS</div>
                    </div>
                    
                    <div onclick="UI.handleSendWithPrompt('请给我日常健康饮食的基本原则和营养搭配建议')" style="background: linear-gradient(145deg, rgba(157,78,221,0.1), rgba(157,78,221,0.05)); border: 1px solid rgba(157,78,221,0.25); border-radius: 16px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;"
                        onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 30px rgba(157,78,221,0.2)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';"
                    >
                        <div style="font-size: 36px; margin-bottom: 12px;">🍎</div>
                        <div style="font-size: 15px; font-weight: 700; color: #9d4edd;">营养知识</div>
                        <div style="font-size: 10px; color: #9d4edd; opacity: 0.8; margin-top: 4px; font-family: 'Orbitron';">NUTRITION TIPS</div>
                    </div>
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
