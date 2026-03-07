/**
 * AMBROSE Health - 社区动态流页面
 * 学习Keep社区，支持发布动态、点赞、评论
 */

// 渲染社区页面
function renderCommunityPage() {
  var container = document.getElementById('communityContainer');
  if (!container) return;
  
  // 如果没有数据，生成示例数据
  if (!window.communityData) {
    window.communityData = generateSamplePosts();
  }
  
  var html = '';
  
  // 发布框
  html += '<div style="padding: 16px 24px;">';
  html += '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 16px;">';
  html += '<div style="display: flex; gap: 12px;">';
  html += '<div style="width: 44px; height: 44px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;">' + (currentUser ? (currentUser.gender === 'female' ? '👩' : '👨') : '👤') + '</div>';
  html += '<div style="flex: 1;">';
  html += '<input type="text" id="postInput" placeholder="分享今天的运动成果..." 
          style="width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 24px; color: #fff; font-size: 14px; cursor: pointer;"
          onclick="openPostModal()" readonly>';
  html += '</div>';
  html += '</div>';
  html += '<div style="display: flex; justify-content: space-around; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">';
  html += '<button style="background: none; border: none; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">📷 图片</button>';
  html += '<button style="background: none; border: none; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">📹 视频</button>';
  html += '<button style="background: none; border: none; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">🏃 打卡</button>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  
  // 分类标签
  html += '<div style="padding: 0 24px 16px; display: flex; gap: 8px; overflow-x: auto;">';
  var tabs = [
    { id: 'all', name: '推荐', icon: '🔥' },
    { id: 'following', name: '关注', icon: '👥' },
    { id: 'workout', name: '运动', icon: '💪' },
    { id: 'diet', name: '饮食', icon: '🥗' },
    { id: 'transformation', name: '蜕变', icon: '✨' }
  ];
  
  tabs.forEach(function(tab, i) {
    var activeClass = i === 0 ? 'active' : '';
    var activeStyle = i === 0 ? 'background: var(--primary); color: #000;' : 'background: rgba(255,255,255,0.05); color: var(--text-secondary);';
    html += `
      <button class="community-tab ${activeClass}" onclick="switchCommunityTab('${tab.id}', this)" data-tab="${tab.id}"
              style="padding: 8px 16px; border: none; border-radius: 20px; font-size: 14px; cursor: pointer; white-space: nowrap; ${activeStyle}">
        ${tab.icon} ${tab.name}
      </button>
    `;
  });
  html += '</div>';
  
  // 动态列表
  html += '<div id="postsList" style="padding: 0 24px 100px;">';
  html += renderPosts(window.communityData);
  html += '</div>';
  
  container.innerHTML = html;
}

// 渲染动态列表
function renderPosts(posts) {
  if (!posts || posts.length === 0) {
    return '<div style="text-align: center; padding: 48px; color: var(--text-secondary);">暂无动态</div>';
  }
  
  return posts.map(function(post) {
    var html = '<div class="post-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 16px; margin-bottom: 16px;">';
    
    // 头部：用户信息
    html += '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">';
    html += '<div style="width: 44px; height: 44px; background: linear-gradient(135deg, rgba(0,212,255,0.3), rgba(255,45,146,0.3)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">' + (post.author.avatar || '👤') + '</div>';
    html += '<div style="flex: 1;">';
    html += '<div style="font-weight: 600;">' + post.author.name + '</div>';
    html += '<div style="font-size: 12px; color: var(--text-secondary);">' + formatTime(post.createdAt) + '</div>';
    html += '</div>';
    html += '<button style="background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer;">⋯</button>';
    html += '</div>';
    
    // 内容
    html += '<div style="margin-bottom: 12px; line-height: 1.6;">' + post.content + '</div>';
    
    // 训练/饮食数据卡片（如果有）
    if (post.type === 'workout' && post.workoutData) {
      html += '<div style="background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px;">';
      html += '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">';
      html += '<div style="font-size: 24px;">💪</div>';
      html += '<div style="font-weight: 600;">完成了 ' + post.workoutData.type + '</div>';
      html += '</div>';
      html += '<div style="display: flex; gap: 24px;">';
      html += '<div><div style="font-size: 18px; font-weight: 700;">' + post.workoutData.duration + '</div><div style="font-size: 12px; color: var(--text-secondary);">分钟</div></div>';
      html += '<div><div style="font-size: 18px; font-weight: 700;">' + post.workoutData.calories + '</div><div style="font-size: 12px; color: var(--text-secondary);">千卡</div></div>';
      html += '</div>';
      html += '</div>';
    }
    
    // 图片（如果有）
    if (post.images && post.images.length > 0) {
      html += '<div style="margin-bottom: 12px; border-radius: 12px; overflow: hidden;">';
      html += '<img src="' + post.images[0] + '" style="width: 100%; max-height: 300px; object-fit: cover;">';
      html += '</div>';
    }
    
    // 标签
    if (post.tags && post.tags.length > 0) {
      html += '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">';
      post.tags.forEach(function(tag) {
        html += '<span style="background: rgba(0,212,255,0.1); color: var(--primary); padding: 4px 12px; border-radius: 12px; font-size: 12px;">#' + tag + '</span>';
      });
      html += '</div>';
    }
    
    // 互动按钮
    html += '<div style="display: flex; gap: 24px; padding-top: 12px; border-top: 1px solid var(--border);">';
    
    // 点赞
    var likeStyle = post.isLiked ? 'color: var(--secondary);' : 'color: var(--text-secondary);';
    html += '<button onclick="likePost(\'' + post.id + '\')" style="background: none; border: none; ' + likeStyle + ' display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">';
    html += '<span>' + (post.isLiked ? '❤️' : '🤍') + '</span>';
    html += '<span>' + (post.stats.likes || 0) + '</span>';
    html += '</button>';
    
    // 评论
    html += '<button style="background: none; border: none; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">';
    html += '<span>💬</span>';
    html += '<span>' + (post.stats.comments || 0) + '</span>';
    html += '</button>';
    
    // 分享
    html += '<button style="background: none; border: none; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; margin-left: auto;">';
    html += '<span>📤</span>';
    html += '<span>分享</span>';
    html += '</button>';
    
    html += '</div>';
    
    html += '</div>';
    return html;
  }).join('');
}

// 生成示例动态数据
function generateSamplePosts() {
  var sampleUsers = [
    { id: 'u1', name: '健身小达人', avatar: '👩', level: 5 },
    { id: 'u2', name: '跑步狂人', avatar: '👨', level: 8 },
    { id: 'u3', name: '瑜伽爱好者', avatar: '🧘‍♀️', level: 4 },
    { id: 'u4', name: '减脂进行时', avatar: '💪', level: 3 },
    { id: 'u5', name: '增肌小王子', avatar: '🏋️', level: 6 }
  ];
  
  var posts = [
    {
      id: 'post_001',
      author: sampleUsers[0],
      content: '今天完成了30分钟HIIT，大汗淋漓的感觉太棒了！坚持就是胜利 💪 #每日训练 #减脂',
      type: 'workout',
      workoutData: { duration: 30, calories: 300, type: 'HIIT燃脂训练' },
      tags: ['每日训练', '减脂'],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      stats: { likes: 45, comments: 8 },
      isLiked: false
    },
    {
      id: 'post_002',
      author: sampleUsers[1],
      content: '晨跑10公里完成！早晨的空气真好，跑完整个人都精神了 🏃‍♂️ #晨跑 #十公里',
      type: 'workout',
      workoutData: { duration: 55, calories: 520, type: '户外跑步' },
      tags: ['晨跑', '十公里'],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      stats: { likes: 128, comments: 23 },
      isLiked: true
    },
    {
      id: 'post_003',
      author: sampleUsers[2],
      content: '坚持瑜伽第100天，身体柔韧性明显改善了，心情也变好了 🧘‍♀️ #瑜伽 #坚持',
      type: 'achievement',
      achievementData: { name: '百日瑜伽', icon: '🧘' },
      tags: ['瑜伽', '坚持'],
      createdAt: new Date(Date.now() - 18000000).toISOString(),
      stats: { likes: 256, comments: 42 },
      isLiked: false
    },
    {
      id: 'post_004',
      author: sampleUsers[3],
      content: '今日份健康餐：鸡胸肉沙拉 🥗 低卡又美味！减脂期间也要好好吃饭 #健康饮食 #减脂餐',
      type: 'diet',
      dietData: { calories: 450, protein: 35 },
      tags: ['健康饮食', '减脂餐'],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      stats: { likes: 89, comments: 15 },
      isLiked: false
    },
    {
      id: 'post_005',
      author: sampleUsers[4],
      content: '深蹲重量突破100kg！三个月前的目标终于达成了 🎉 #力量训练 #突破',
      type: 'achievement',
      achievementData: { name: '力量突破', icon: '🏋️' },
      tags: ['力量训练', '突破'],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      stats: { likes: 312, comments: 56 },
      isLiked: true
    }
  ];
  
  return posts;
}

// 切换社区标签
function switchCommunityTab(tab, btn) {
  document.querySelectorAll('.community-tab').forEach(function(t) {
    t.classList.remove('active');
    t.style.background = 'rgba(255,255,255,0.05)';
    t.style.color = 'var(--text-secondary)';
  });
  
  btn.classList.add('active');
  btn.style.background = 'var(--primary)';
  btn.style.color = '#000';
  
  // 根据标签过滤动态
  var filteredPosts = window.communityData;
  if (tab !== 'all') {
    filteredPosts = window.communityData.filter(function(p) {
      return p.type === tab || (tab === 'following' && p.isFollowing);
    });
  }
  
  document.getElementById('postsList').innerHTML = renderPosts(filteredPosts);
}

// 点赞动态
function likePost(postId) {
  var post = window.communityData.find(function(p) { return p.id === postId; });
  if (!post) return;
  
  if (post.isLiked) {
    post.stats.likes--;
    post.isLiked = false;
  } else {
    post.stats.likes++;
    post.isLiked = true;
  }
  
  // 重新渲染
  renderCommunityPage();
}

// 打开发布动态弹窗
function openPostModal() {
  var html = '<div id="postModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 100000;">';
  html += '<div style="max-width: 500px; margin: 0 auto; padding: 24px; height: 100%; display: flex; flex-direction: column;">';
  
  // 头部
  html += '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">';
  html += '<button onclick="closePostModal()" style="background: none; border: none; color: #fff; font-size: 16px; cursor: pointer;">取消</button>';
  html += '<div style="font-weight: 600;">发布动态</div>';
  html += '<button onclick="publishPost()" style="background: var(--primary); border: none; color: #000; padding: 8px 20px; border-radius: 20px; font-weight: 600; cursor: pointer;">发布</button>';
  html += '</div>';
  
  // 输入框
  html += '<textarea id="postContent" placeholder="分享今天的运动成果..." style="flex: 1; width: 100%; background: transparent; border: none; color: #fff; font-size: 16px; resize: none; outline: none; padding: 0;"></textarea>';
  
  // 底部工具栏
  html += '<div style="display: flex; gap: 16px; padding-top: 16px; border-top: 1px solid var(--border);">';
  html += '<button style="background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer;">📷</button>';
  html += '<button style="background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer;">📹</button>';
  html += '<button style="background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer;">😊</button>';
  html += '<button style="background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer;">#话题</button>';
  html += '</div>';
  
  html += '</div>';
  html += '</div>';
  
  document.body.insertAdjacentHTML('beforeend', html);
  
  // 自动聚焦
  setTimeout(function() {
    document.getElementById('postContent').focus();
  }, 100);
}

// 关闭发布弹窗
function closePostModal() {
  var modal = document.getElementById('postModal');
  if (modal) modal.remove();
}

// 发布动态
function publishPost() {
  var content = document.getElementById('postContent').value.trim();
  if (!content) {
    showToast('请输入内容');
    return;
  }
  
  var newPost = {
    id: 'post_' + Date.now(),
    author: currentUser ? { name: currentUser.name, avatar: currentUser.gender === 'female' ? '👩' : '👨' } : { name: '我', avatar: '👤' },
    content: content,
    type: 'text',
    tags: [],
    createdAt: new Date().toISOString(),
    stats: { likes: 0, comments: 0 },
    isLiked: false
  };
  
  window.communityData.unshift(newPost);
  closePostModal();
  renderCommunityPage();
  showToast('发布成功！');
}

// 格式化时间
function formatTime(isoString) {
  var date = new Date(isoString);
  var now = new Date();
  var diff = now - date;
  
  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
  if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
  return date.toLocaleDateString('zh-CN');
}

// 导出函数
window.renderCommunityPage = renderCommunityPage;
window.switchCommunityTab = switchCommunityTab;
window.likePost = likePost;
window.openPostModal = openPostModal;
window.closePostModal = closePostModal;
window.publishPost = publishPost;

console.log('[AMBROSE] Community Page loaded');
