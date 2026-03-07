/**
 * AMBROSE Health - 社区页面渲染
 * 完整的社区功能UI实现
 */

function renderCommunityPage() {
  var container = document.getElementById('communityContainer');
  if (!container) return;
  
  // 生成示例动态
  if (typeof communityGenerateSamplePosts === 'function') {
    communityGenerateSamplePosts();
  }
  
  renderFeed('all');
}

// 渲染动态流
function renderFeed(type) {
  var container = document.getElementById('communityFeed');
  if (!container) return;
  
  // 获取动态数据
  var posts = [];
  if (typeof communityGetFeed === 'function') {
    posts = communityGetFeed(type, 1, 10);
  } else {
    // 示例数据
    posts = getSamplePosts();
  }
  
  if (posts.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 48px 24px; color: var(--text-secondary);">暂无动态</div>';
    return;
  }
  
  var html = '';
  posts.forEach(function(post) {
    html += createPostCard(post);
  });
  
  container.innerHTML = html;
}

// 创建动态卡片
function createPostCard(post) {
  var timeText = formatTime(post.createdAt);
  var author = post.author || { name: '用户', avatar: '👤' };
  
  var html = '<div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; margin-bottom: 16px; overflow: hidden;">';
  
  // 头部
  html += '<div style="padding: 16px; display: flex; align-items: center; gap: 12px;">';
  html += '<div style="width: 44px; height: 44px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">' + author.avatar + '</div>';
  html += '<div style="flex: 1;">';
  html += '<div style="font-weight: 600;">' + author.name + '</div>';
  html += '<div style="font-size: 12px; color: var(--text-secondary);">' + timeText + '</div>';
  html += '</div>';
  html += '<button style="background: none; border: none; color: var(--text-secondary); font-size: 20px; cursor: pointer;">⋯</button>';
  html += '</div>';
  
  // 内容
  html += '<div style="padding: 0 16px 16px;">';
  html += '<div style="line-height: 1.6; margin-bottom: 12px;">' + post.content + '</div>';
  
  // 标签
  if (post.tags && post.tags.length > 0) {
    html += '<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">';
    post.tags.forEach(function(tag) {
      html += '<span style="background: rgba(0,212,255,0.1); color: var(--primary); padding: 4px 12px; border-radius: 12px; font-size: 12px;">#' + tag + '</span>';
    });
    html += '</div>';
  }
  
  // 训练数据卡片
  if (post.type === 'workout' && post.workoutData) {
    html += '<div style="background: rgba(0,212,255,0.05); border: 1px solid rgba(0,212,255,0.2); border-radius: 12px; padding: 16px;">';
    html += '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">';
    html += '<span style="font-size: 20px;">💪</span>';
    html += '<span style="font-weight: 600;">完成训练</span>';
    html += '</div>';
    html += '<div style="display: flex; gap: 24px;">';
    html += '<div><div style="font-size: 12px; color: var(--text-secondary);">时长</div><div style="font-weight: 600;">' + post.workoutData.duration + '分钟</div></div>';
    html += '<div><div style="font-size: 12px; color: var(--text-secondary);">消耗</div><div style="font-weight: 600;">' + post.workoutData.calories + '千卡</div></div>';
    html += '<div><div style="font-size: 12px; color: var(--text-secondary);">类型</div><div style="font-weight: 600;">' + post.workoutData.type + '</div></div>';
    html += '</div>';
    html += '</div>';
  }
  
  // 饮食数据卡片
  if (post.type === 'diet' && post.dietData) {
    html += '<div style="background: rgba(85,230,193,0.05); border: 1px solid rgba(85,230,193,0.2); border-radius: 12px; padding: 16px;">';
    html += '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">';
    html += '<span style="font-size: 20px;">🥗</span>';
    html += '<span style="font-weight: 600;">健康饮食</span>';
    html += '</div>';
    html += '<div style="display: flex; gap: 24px;">';
    html += '<div><div style="font-size: 12px; color: var(--text-secondary);">热量</div><div style="font-weight: 600;">' + post.dietData.calories + '千卡</div></div>';
    html += '<div><div style="font-size: 12px; color: var(--text-secondary);">蛋白质</div><div style="font-weight: 600;">' + post.dietData.protein + 'g</div></div>';
    html += '</div>';
    html += '</div>';
  }
  
  html += '</div>';
  
  // 操作栏
  var likeClass = post.isLiked ? 'color: #FF6B6B;' : 'color: var(--text-secondary);';
  html += '<div style="padding: 12px 16px; border-top: 1px solid var(--border); display: flex; justify-content: space-around;">';
  html += '<button onclick="likePost(\'' + post.id + '\', this)" style="background: none; border: none; ' + likeClass + ' font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px;">❤️ ' + (post.stats ? post.stats.likes : 0) + '</button>';
  html += '<button onclick="showComments(\'' + post.id + '\')" style="background: none; border: none; color: var(--text-secondary); font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px;">💬 ' + (post.stats ? post.stats.comments : 0) + '</button>';
  html += '<button onclick="sharePost(\'' + post.id + '\')" style="background: none; border: none; color: var(--text-secondary); font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 6px;">📤 分享</button>';
  html += '</div>';
  
  html += '</div>';
  
  return html;
}

// 获取示例动态
function getSamplePosts() {
  return [
    {
      id: 'post_1',
      author: { name: '健身小达人', avatar: '👩' },
      content: '今天完成了30分钟HIIT，大汗淋漓的感觉太棒了！坚持就是胜利💪 #每日训练 #燃脂',
      type: 'workout',
      workoutData: { duration: 30, calories: 300, type: 'HIIT' },
      tags: ['每日训练', '燃脂'],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      stats: { likes: 24, comments: 5 },
      isLiked: false
    },
    {
      id: 'post_2',
      author: { name: '跑步狂人', avatar: '👨' },
      content: '早起晨跑5公里，空气真好！🏃‍♂️ #晨跑 #早起',
      type: 'workout',
      workoutData: { duration: 35, calories: 350, type: '跑步' },
      tags: ['晨跑', '早起'],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      stats: { likes: 18, comments: 3 },
      isLiked: true
    },
    {
      id: 'post_3',
      author: { name: '瑜伽爱好者', avatar: '🧘‍♀️' },
      content: '今日份健康餐：鸡胸肉沙拉🥗 低卡又美味！ #健康饮食 #减脂餐',
      type: 'diet',
      dietData: { calories: 450, protein: 35 },
      tags: ['健康饮食', '减脂餐'],
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      stats: { likes: 32, comments: 8 },
      isLiked: false
    },
    {
      id: 'post_4',
      author: { name: '减脂进行时', avatar: '💪' },
      content: '连续打卡30天达成！🎉 感谢自己的坚持！从70kg减到了68kg，继续加油！ #里程碑 #坚持',
      type: 'achievement',
      achievementData: { name: '月度坚持奖', icon: '🏆' },
      tags: ['里程碑', '坚持'],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      stats: { likes: 56, comments: 12 },
      isLiked: true
    }
  ];
}

// 格式化时间
function formatTime(timestamp) {
  var now = Date.now();
  var time = new Date(timestamp).getTime();
  var diff = now - time;
  
  var minute = 60 * 1000;
  var hour = 60 * minute;
  var day = 24 * hour;
  
  if (diff < minute) return '刚刚';
  if (diff < hour) return Math.floor(diff / minute) + '分钟前';
  if (diff < day) return Math.floor(diff / hour) + '小时前';
  return Math.floor(diff / day) + '天前';
}

// 点赞
function likePost(postId, btn) {
  if (typeof communityLikePost === 'function') {
    var result = communityLikePost(postId);
    if (result) {
      // 更新UI
      var isLiked = btn.style.color === 'rgb(255, 107, 107)';
      var currentCount = parseInt(btn.textContent.trim().split(' ')[1] || 0);
      
      if (isLiked) {
        btn.style.color = 'var(--text-secondary)';
        btn.innerHTML = '❤️ ' + (currentCount - 1);
      } else {
        btn.style.color = '#FF6B6B';
        btn.innerHTML = '❤️ ' + (currentCount + 1);
      }
    }
  }
}

// 显示评论
function showComments(postId) {
  showToast('评论功能开发中');
}

// 分享
function sharePost(postId) {
  if (navigator.share) {
    navigator.share({
      title: 'AMBROSE健康社区',
      text: '来看看这条动态',
      url: window.location.href
    });
  } else {
    showToast('分享链接已复制');
  }
}

// 发布动态
function createPost() {
  var content = document.getElementById('postContent')?.value.trim();
  if (!content) {
    showToast('请输入内容');
    return;
  }
  
  if (typeof communityCreatePost === 'function') {
    communityCreatePost(content, { type: 'text' });
    document.getElementById('postContent').value = '';
    showToast('发布成功！');
    renderFeed('all');
  }
}

// 切换动态类型
function switchFeedType(type, btn) {
  // 更新按钮状态
  document.querySelectorAll('.feed-type-btn').forEach(function(b) {
    b.style.background = 'transparent';
    b.style.color = 'var(--text-secondary)';
    b.classList.remove('active');
  });
  btn.style.background = 'var(--primary)';
  btn.style.color = '#000';
  btn.classList.add('active');
  
  // 渲染对应类型
  renderFeed(type);
}

// 导出函数
window.renderCommunityPage = renderCommunityPage;
window.renderFeed = renderFeed;
window.likePost = likePost;
window.showComments = showComments;
window.sharePost = sharePost;
window.createPost = createPost;
window.switchFeedType = switchFeedType;

console.log('[AMBROSE] Community UI loaded');
