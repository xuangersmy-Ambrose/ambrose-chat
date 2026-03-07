/**
 * AMBROSE Health - YouTube视频播放器与视频库UI
 */

// 当前播放的视频
let currentVideo = null;

// 渲染视频库页面
function renderVideoLibraryPage() {
  const categories = [
    { id: 'all', name: '全部', icon: '📚' },
    { id: 'basic', name: '基础动作', icon: '💪' },
    { id: 'cardio', name: '有氧燃脂', icon: '🔥' },
    { id: 'strength', name: '力量训练', icon: '🏋️' },
    { id: 'yoga', name: '瑜伽拉伸', icon: '🧘' },
    { id: 'special', name: '专项训练', icon: '🎯' },
    { id: 'female', name: '女性专区', icon: '👩' }
  ];

  // 渲染分类选择器
  const categoryContainer = document.getElementById('videoCategorySelector');
  if (categoryContainer) {
    categoryContainer.innerHTML = categories.map(cat => `
      <button class="video-category-btn ${cat.id === 'all' ? 'active' : ''}" 
              onclick="filterVideoCategory('${cat.id}', this)"
              data-category="${cat.id}">
        <span class="category-icon">${cat.icon}</span>
        <span class="category-name">${cat.name}</span>
      </button>
    `).join('');
  }

  // 渲染视频列表
  renderVideoList('all');
}

// 渲染视频列表
function renderVideoList(category) {
  const container = document.getElementById('videoGrid');
  if (!container) return;

  let videos = [];
  if (category === 'all') {
    videos = getAllYouTubeVideos ? getAllYouTubeVideos() : [];
  } else {
    videos = getYouTubeVideosByCategory ? getYouTubeVideosByCategory(category) : [];
  }

  if (videos.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 48px 24px;">
        <div style="font-size: 64px; margin-bottom: 16px;">📹</div>
        <div style="color: var(--text-secondary);">暂无视频</div>
      </div>
    `;
    return;
  }

  container.innerHTML = videos.map(video => `
    <div class="video-card" onclick="openVideoPlayer('${video.id}')">
      <div class="video-thumbnail" style="position: relative; padding-top: 56.25%; background: #000; border-radius: 12px; overflow: hidden;">
        <img src="${getYouTubeThumbnail ? getYouTubeThumbnail(video.youtubeId) : ''}" 
             alt="${video.title}"
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 180%22%3E%3Crect fill=%22%23333%22 width=%22320%22 height=%22180%22/%3E%3Ctext fill=%22%23666%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E视频缩略图%3C/text%3E%3C/svg%3E'">
        <div class="video-play-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
          <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
            ▶️
          </div>
        </div>
        <div class="video-duration" style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
          ${video.duration}
        </div>
      </div>
      
      <div class="video-info" style="padding: 12px 0;">
        <div class="video-title" style="font-weight: 600; font-size: 15px; margin-bottom: 8px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${video.title}
        </div>
        <div class="video-meta" style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--text-secondary);">
          <span>👤 ${video.instructor}</span>
          <span style="background: ${getDifficultyColor(video.difficulty)}; color: #000; padding: 2px 8px; border-radius: 10px; font-size: 11px;">${video.difficulty}</span>
        </div>
        
        <div class="video-target" style="margin-top: 8px; font-size: 12px; color: var(--primary);">
          🎯 ${video.target}
        </div>
      </div>
    </div>
  `).join('');
}

// 获取难度颜色
function getDifficultyColor(difficulty) {
  switch(difficulty) {
    case '初级': return '#55E6C1';
    case '中级': return '#FFD93D';
    case '中高级': return '#FF9F43';
    case '高级': return '#FF6B6B';
    default: return '#ccc';
  }
}

// 筛选视频分类
function filterVideoCategory(category, btn) {
  // 更新按钮状态
  document.querySelectorAll('.video-category-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // 渲染对应分类的视频
  renderVideoList(category);
}

// 打开视频播放器
function openVideoPlayer(videoId) {
  const videos = getAllYouTubeVideos ? getAllYouTubeVideos() : [];
  const video = videos.find(v => v.id === videoId);
  
  if (!video) {
    showToast('视频不存在');
    return;
  }
  
  currentVideo = video;
  
  // 更新播放器内容
  const playerContainer = document.getElementById('videoPlayerContainer');
  const videoInfo = document.getElementById('videoPlayerInfo');
  
  if (playerContainer) {
    playerContainer.innerHTML = `
      <iframe 
        src="${getYouTubeEmbedUrl ? getYouTubeEmbedUrl(video.youtubeId) : ''}"
        title="${video.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width: 100%; height: 100%; border-radius: 12px;"
      ></iframe>
    `;
  }
  
  if (videoInfo) {
    videoInfo.innerHTML = `
      <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">${video.title}</h2>
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px; color: var(--text-secondary); font-size: 14px;">
        <span>👤 ${video.instructor}</span>
        <span>⏱️ ${video.duration}</span>
        <span style="background: ${getDifficultyColor(video.difficulty)}; color: #000; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500;">${video.difficulty}</span>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">${video.description}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
        ${video.tags.map(tag => `
          <span style="background: rgba(0,212,255,0.1); color: var(--primary); padding: 4px 12px; border-radius: 12px; font-size: 12px;">#${tag}</span>
        `).join('')}
      </div>
      <div style="display: flex; gap: 12px;">
        <button class="btn-primary" style="flex: 1;" onclick="addToFavorites('${video.id}')">
          ❤️ 收藏
        </button>
        <button class="btn-secondary" style="flex: 1;" onclick="shareVideo('${video.id}')">
          📤 分享
        </button>
      </div>
    `;
  }
  
  // 显示播放器页面
  showPage('videoPlayerPage');
  
  // 加载相关推荐
  loadRelatedVideos(video);
}

// 加载相关推荐视频
function loadRelatedVideos(currentVideo) {
  const container = document.getElementById('relatedVideosList');
  if (!container) return;
  
  const allVideos = getAllYouTubeVideos ? getAllYouTubeVideos() : [];
  
  // 找到相同分类或标签相似的视频
  const related = allVideos
    .filter(v => v.id !== currentVideo.id)
    .filter(v => 
      v.category === currentVideo.category || 
      v.tags.some(tag => currentVideo.tags.includes(tag))
    )
    .slice(0, 4);
  
  if (related.length === 0) {
    // 如果没有相关视频，随机推荐
    const random = allVideos
      .filter(v => v.id !== currentVideo.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    container.innerHTML = random.map(video => createRelatedVideoCard(video)).join('');
  } else {
    container.innerHTML = related.map(video => createRelatedVideoCard(video)).join('');
  }
}

// 创建相关视频卡片
function createRelatedVideoCard(video) {
  return `
    <div class="related-video-card" onclick="openVideoPlayer('${video.id}')" style="display: flex; gap: 12px; cursor: pointer; padding: 12px; background: var(--bg-card); border-radius: 12px; margin-bottom: 12px;">
      <div style="width: 120px; height: 68px; background: #000; border-radius: 8px; overflow: hidden; flex-shrink: 0;">
        <img src="${getYouTubeThumbnail ? getYouTubeThumbnail(video.youtubeId, 'mqdefault') : ''}" 
             alt="${video.title}"
             style="width: 100%; height: 100%; object-fit: cover;"
             onerror="this.style.display='none'">
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${video.title}</div>
        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">${video.instructor}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${video.duration} · ${video.difficulty}</div>
      </div>
    </div>
  `;
}

// 搜索视频
function searchVideos(query) {
  if (!query.trim()) {
    renderVideoList('all');
    return;
  }
  
  const results = searchYouTubeVideos ? searchYouTubeVideos(query) : [];
  const container = document.getElementById('videoGrid');
  
  if (!container) return;
  
  if (results.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 48px 24px;">
        <div style="font-size: 64px; margin-bottom: 16px;">🔍</div>
        <div style="color: var(--text-secondary);">未找到相关视频</div>
      </div>
    `;
    return;
  }
  
  // 使用相同的渲染逻辑
  container.innerHTML = results.map(video => `
    <div class="video-card" onclick="openVideoPlayer('${video.id}')">
      <div class="video-thumbnail" style="position: relative; padding-top: 56.25%; background: #000; border-radius: 12px; overflow: hidden;">
        <img src="${getYouTubeThumbnail ? getYouTubeThumbnail(video.youtubeId) : ''}" 
             alt="${video.title}"
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 180%22%3E%3Crect fill=%22%23333%22 width=%22320%22 height=%22180%22/%3E%3Ctext fill=%22%23666%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E视频缩略图%3C/text%3E%3C/svg%3E'">
        <div class="video-play-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
          <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
            ▶️
          </div>
        </div>
        <div class="video-duration" style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
          ${video.duration}
        </div>
      </div>
      
      <div class="video-info" style="padding: 12px 0;">
        <div class="video-title" style="font-weight: 600; font-size: 15px; margin-bottom: 8px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${video.title}
        </div>
        <div class="video-meta" style="display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--text-secondary);">
          <span>👤 ${video.instructor}</span>
          <span style="background: ${getDifficultyColor(video.difficulty)}; color: #000; padding: 2px 8px; border-radius: 10px; font-size: 11px;">${video.difficulty}</span>
        </div>
        
        <div class="video-target" style="margin-top: 8px; font-size: 12px; color: var(--primary);">
          🎯 ${video.target}
        </div>
      </div>
    </div>
  `).join('');
}

// 添加到收藏
function addToFavorites(videoId) {
  // 获取当前收藏列表
  let favorites = JSON.parse(localStorage.getItem('ambrose_favorite_videos') || '[]');
  
  if (!favorites.includes(videoId)) {
    favorites.push(videoId);
    localStorage.setItem('ambrose_favorite_videos', JSON.stringify(favorites));
    showToast('❤️ 已添加到收藏');
  } else {
    showToast('已经收藏过了');
  }
}

// 分享视频
function shareVideo(videoId) {
  const videos = getAllYouTubeVideos ? getAllYouTubeVideos() : [];
  const video = videos.find(v => v.id === videoId);
  
  if (!video) return;
  
  // 复制链接到剪贴板
  const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('📋 视频链接已复制');
    });
  } else {
    showToast('视频链接: ' + url);
  }
}

// 获取收藏的视频
function getFavoriteVideos() {
  const favorites = JSON.parse(localStorage.getItem('ambrose_favorite_videos') || '[]');
  const allVideos = getAllYouTubeVideos ? getAllYouTubeVideos() : [];
  return allVideos.filter(v => favorites.includes(v.id));
}

// 导出函数
window.renderVideoLibraryPage = renderVideoLibraryPage;
window.renderVideoList = renderVideoList;
window.filterVideoCategory = filterVideoCategory;
window.openVideoPlayer = openVideoPlayer;
window.searchVideos = searchVideos;
window.addToFavorites = addToFavorites;
window.shareVideo = shareVideo;
window.getFavoriteVideos = getFavoriteVideos;

console.log('[AMBROSE] YouTube Video Player loaded');
