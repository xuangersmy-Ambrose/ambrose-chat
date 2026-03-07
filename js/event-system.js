// ==========================================
// AMBROSE 事件系统 v2.0 - 修复按钮点击问题
// ==========================================

// 核心问题分析：
// 1. defineOnce 机制可能在某些情况下阻止函数正确定义
// 2. 内联 onclick 在某些浏览器/环境下可能无法找到函数
// 3. 事件委托是更可靠的方案

// 解决方案：使用事件委托替代内联 onclick
(function() {
  'use strict';
  
  // 等待 DOM 加载完成
  function init() {
    console.log('[AMBROSE] 初始化事件系统 v2.0');
    
    // 使用事件委托处理所有点击
    document.addEventListener('click', handleGlobalClick);
    
    console.log('[AMBROSE] 事件系统初始化完成');
  }
  
  // 全局点击处理器
  function handleGlobalClick(e) {
    // 查找最近的 action-item 或带有 data-action 的元素
    var target = e.target.closest('.action-item, [data-action], .btn-primary, .btn-secondary');
    if (!target) return;
    
    // 获取 data-action 属性
    var action = target.getAttribute('data-action');
    if (!action) return;
    
    console.log('[AMBROSE] 点击操作:', action);
    
    // 阻止默认行为
    e.preventDefault();
    e.stopPropagation();
    
    // 处理不同的操作
    switch(action) {
      case 'workoutPage':
        showPage('workoutPage');
        break;
      case 'dietPage':
        showPage('dietPage');
        break;
      case 'achievePage':
        showPage('achievePage');
        break;
      case 'leaderboard':
        showLeaderboard();
        break;
      case 'community':
        showCommunity();
        break;
      case 'report':
        showReport();
        break;
      case 'coursePage':
        showCoursePage();
        break;
      default:
        // 如果是页面ID，直接跳转
        if (document.getElementById(action)) {
          showPage(action);
        }
    }
  }
  
  // 页面切换函数 - 确保在全局作用域
  window.showPage = function(pageId) {
    console.log('[AMBROSE] 切换页面:', pageId);
    try {
      // 隐藏所有页面
      var pages = document.querySelectorAll('.page');
      for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
      }
      
      // 显示目标页面
      var target = document.getElementById(pageId);
      if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
        console.log('[AMBROSE] 页面已显示:', pageId);
      } else {
        console.error('[AMBROSE] 页面不存在:', pageId);
      }
      
      // 更新底部导航
      var navPages = ['homePage', 'workoutPage', 'dietPage', 'chatPage', 'profilePage', 'communityPage', 'reportPage', 'coursePage', 'achievePage'];
      var bottomNav = document.getElementById('bottomNav') || document.querySelector('.bottom-nav');
      if (bottomNav) {
        bottomNav.style.display = navPages.indexOf(pageId) !== -1 ? 'flex' : 'none';
      }
    } catch (e) {
      console.error('[AMBROSE] showPage 错误:', e);
    }
  };
  
  // Toast 提示
  window.showToast = window.showToast || function(msg) {
    console.log('[Toast]', msg);
    var t = document.getElementById('toast');
    if (t) {
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(function() { t.classList.remove('show'); }, 2000);
    }
  };
  
  // 排行榜功能
  window.showLeaderboard = function() {
    console.log('[AMBROSE] 显示排行榜');
    try {
      // 移除旧页面
      var oldPage = document.getElementById('leaderboardPage');
      if (oldPage) oldPage.remove();

      var currentUserData = (typeof currentUser !== 'undefined' && currentUser) ? currentUser : { gender: 'male' };
      var userPoints = (typeof userData !== 'undefined' && userData.totalPoints) ? userData.totalPoints : 0;
      var userStreak = (typeof userData !== 'undefined' && userData.streak) ? userData.streak : 0;

      var html = '<div class="page" id="leaderboardPage"><div class="workout-page">';
      html += '<div class="page-header"><div class="page-title">🏆 排行榜</div><div class="page-subtitle">本周运动达人</div></div>';
      html += '<div class="category-tabs"><div class="tab active">总积分</div><div class="tab">训练次数</div><div class="tab">连续打卡</div></div>';
      html += '<div style="padding: 0 24px;">';

      var leaderboardData = [
        { rank: 1, name: '健身达人小李', avatar: '👨', points: 12580, workouts: 156, streak: 45 },
        { rank: 2, name: '瑜伽女王', avatar: '👩', points: 11230, workouts: 142, streak: 38 },
        { rank: 3, name: '跑步狂魔', avatar: '👨', points: 10890, workouts: 138, streak: 42 },
        { rank: 4, name: '力量举铁', avatar: '👨', points: 9560, workouts: 120, streak: 28 },
        { rank: 5, name: '你', avatar: currentUserData.gender === 'female' ? '👩' : '👨', points: userPoints, workouts: 12, streak: userStreak, isMe: true },
        { rank: 6, name: '早起鸟', avatar: '👩', points: 8230, workouts: 105, streak: 35 },
        { rank: 7, name: '腹肌撕裂者', avatar: '👨', points: 7890, workouts: 98, streak: 25 },
        { rank: 8, name: '拉伸大师', avatar: '👩', points: 7650, workouts: 95, streak: 22 },
        { rank: 9, name: 'HIIT战士', avatar: '👨', points: 7420, workouts: 92, streak: 30 },
        { rank: 10, name: '瑜伽小白', avatar: '👩', points: 6980, workouts: 85, streak: 18 }
      ];

      leaderboardData.forEach(function(user) {
        var isMe = user.isMe ? 'style="background: rgba(0,212,255,0.1); border-color: #00d4ff;"' : '';
        var rankIcon = user.rank <= 3 ? ['🥇','🥈','🥉'][user.rank-1] : user.rank;
        html += '<div class="workout-item" ' + isMe + '>';
        html += '<div style="width: 40px; text-align: center; font-size: 20px; font-weight: 700;">' + rankIcon + '</div>';
        html += '<div style="width: 48px; height: 48px; background: linear-gradient(135deg, #00f3ff, #ff00ff); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 16px;">' + user.avatar + '</div>';
        html += '<div class="workout-info">';
        html += '<div class="workout-name">' + user.name + (user.isMe ? ' (你)' : '') + '</div>';
        html += '<div class="workout-meta"><span>💎 ' + user.points + '积分</span><span>💪 ' + user.workouts + '次训练</span><span>🔥 ' + user.streak + '天连续</span></div>';
        html += '</div></div>';
      });

      html += '</div>';
      html += '<button class="btn-secondary" onclick="showPage(\'homePage\')" style="margin: 40px 24px;">← 返回首页</button>';
      html += '</div></div>';

      document.body.insertAdjacentHTML('beforeend', html);
      showPage('leaderboardPage');
    } catch (e) {
      console.error('[AMBROSE] showLeaderboard 错误:', e);
    }
  };
  
  // 社区功能
  window.showCommunity = function() {
    console.log('[AMBROSE] 显示社区');
    try {
      var oldPage = document.getElementById('communityPage');
      if (oldPage) oldPage.remove();

      var html = '<div class="page" id="communityPage"><div class="workout-page">';
      html += '<div class="page-header"><div class="page-title">👥 社区</div><div class="page-subtitle">分享你的运动时刻</div></div>';
      html += '<div class="category-tabs"><div class="tab active">推荐</div><div class="tab">关注</div><div class="tab">热门</div><div class="tab">附近</div></div>';
      html += '<div style="padding: 0 24px;">';

      var communityPosts = [
        { id: 1, user: '健身达人小李', avatar: '👨', time: '2小时前', content: '今天完成了30天腹肌挑战！感觉棒极了！💪🔥', image: '💪', likes: 128, comments: 23 },
        { id: 2, user: '瑜伽女王', avatar: '👩', time: '3小时前', content: '晨间瑜伽打卡，今天的 sunrise 太美了 🧘🌅', image: '🧘', likes: 256, comments: 45 },
        { id: 3, user: '跑步狂魔', avatar: '👨', time: '5小时前', content: '半马PB！1小时45分！感谢坚持的自己 🏃⚡', image: '🏃', likes: 512, comments: 89 },
        { id: 4, user: '力量举铁', avatar: '👨', time: '昨天', content: '深蹲突破100kg，继续加油！🏋️💯', image: '🏋️', likes: 189, comments: 34 },
        { id: 5, user: '早起鸟', avatar: '👩', time: '昨天', content: '坚持早起的第30天，感觉整个人都精神了 🌅✨', image: '🌅', likes: 345, comments: 56 }
      ];

      communityPosts.forEach(function(post) {
        html += '<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 16px; margin-bottom: 16px;">';
        html += '<div style="display: flex; align-items: center; margin-bottom: 12px;">';
        html += '<div style="width: 40px; height: 40px; background: linear-gradient(135deg, #00f3ff, #ff00ff); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-right: 12px;">' + post.avatar + '</div>';
        html += '<div><div style="font-weight: 600;">' + post.user + '</div><div style="font-size: 12px; color: rgba(255,255,255,0.5);">' + post.time + '</div></div>';
        html += '</div>';
        html += '<div style="margin-bottom: 12px; line-height: 1.6;">' + post.content + '</div>';
        html += '<div style="font-size: 48px; margin-bottom: 12px;">' + post.image + '</div>';
        html += '<div style="display: flex; gap: 24px; color: rgba(255,255,255,0.5); font-size: 14px;">';
        html += '<span>❤️ ' + post.likes + '</span>';
        html += '<span>💬 ' + post.comments + '</span>';
        html += '<span>↗️ 分享</span>';
        html += '</div></div>';
      });

      html += '</div>';
      html += '<button class="btn-secondary" onclick="showPage(\'homePage\')" style="margin: 40px 24px;">← 返回首页</button>';
      html += '</div></div>';

      document.body.insertAdjacentHTML('beforeend', html);
      showPage('communityPage');
    } catch (e) {
      console.error('[AMBROSE] showCommunity 错误:', e);
    }
  };
  
  // 数据报告
  window.showReport = function() {
    console.log('[AMBROSE] 显示数据报告');
    // 跳转到分析页面或显示提示
    window.location.href = '/analysis.html';
  };
  
  // 课程页面
  window.showCoursePage = function() {
    console.log('[AMBROSE] 显示课程页面');
    try {
      var existing = document.getElementById('coursePage');
      if (existing) existing.remove();

      var html = '<div class="page" id="coursePage"><div class="workout-page">';
      html += '<div class="page-header"><div class="page-title">📚 健康课程</div><div class="page-subtitle">系统学习健康知识</div></div>';
      html += '<div style="padding: 0 24px;">';

      var categories = [
        { name: '减脂课程', icon: '🔥', desc: '科学减脂，健康瘦身', count: 12 },
        { name: '增肌课程', icon: '💪', desc: '力量训练，塑造体型', count: 15 },
        { name: '瑜伽课程', icon: '🧘', desc: '柔韧身心，平衡生活', count: 8 },
        { name: '饮食课程', icon: '🥗', desc: '营养搭配，健康饮食', count: 6 },
        { name: '康复课程', icon: '🏥', desc: '运动康复，预防损伤', count: 5 }
      ];

      categories.forEach(function(cat) {
        html += '<div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 24px; margin-bottom: 16px; cursor: pointer;" onclick="showToast(\'课程详情开发中\')">';
        html += '<div style="display: flex; align-items: center; gap: 16px;">';
        html += '<div style="font-size: 48px;">' + cat.icon + '</div>';
        html += '<div style="flex: 1;">';
        html += '<div style="font-size: 18px; font-weight: 600; margin-bottom: 4px;">' + cat.name + '</div>';
        html += '<div style="color: rgba(255,255,255,0.5); font-size: 14px; margin-bottom: 8px;">' + cat.desc + '</div>';
        html += '<div style="color: #00f3ff; font-size: 13px;">' + cat.count + ' 节课程</div>';
        html += '</div>';
        html += '<div style="font-size: 24px; color: rgba(255,255,255,0.5);">›</div>';
        html += '</div></div>';
      });

      html += '</div>';
      html += '<button class="btn-secondary" onclick="showPage(\'homePage\')" style="margin: 40px 24px;">← 返回首页</button>';
      html += '</div></div>';

      document.body.insertAdjacentHTML('beforeend', html);
      showPage('coursePage');
    } catch (e) {
      console.error('[AMBROSE] showCoursePage 错误:', e);
    }
  };
  
  // 启动初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();