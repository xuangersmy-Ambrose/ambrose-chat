/**
 * AMBROSE Health - 社区功能模块
 * 学习Keep社区，添加动态、关注、点赞等功能
 */

class CommunitySystem {
  constructor() {
    this.currentUser = null;
    this.posts = [];
    this.users = new Map();
  }

  // 发布动态
  createPost(content, options = {}) {
    const post = {
      id: 'post_' + Date.now(),
      author: this.currentUser,
      content: content,
      images: options.images || [],
      video: options.video || null,
      type: options.type || 'text', // text, workout, diet, achievement
      tags: options.tags || [],
      createdAt: new Date().toISOString(),
      stats: {
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0
      },
      isLiked: false,
      comments: []
    };

    // 根据类型添加特定数据
    if (post.type === 'workout') {
      post.workoutData = options.workoutData;
    } else if (post.type === 'diet') {
      post.dietData = options.dietData;
    } else if (post.type === 'achievement') {
      post.achievementData = options.achievementData;
    }

    this.posts.unshift(post);
    return post;
  }

  // 获取动态流
  getFeed(type = 'all', page = 1, limit = 10) {
    let filteredPosts = this.posts;

    switch (type) {
      case 'following':
        filteredPosts = this.posts.filter(p => this.isFollowing(p.author));
        break;
      case 'workout':
        filteredPosts = this.posts.filter(p => p.type === 'workout');
        break;
      case 'diet':
        filteredPosts = this.posts.filter(p => p.type === 'diet');
        break;
      case 'transformation':
        filteredPosts = this.posts.filter(p => p.type === 'achievement');
        break;
    }

    const start = (page - 1) * limit;
    return filteredPosts.slice(start, start + limit);
  }

  // 点赞
  likePost(postId) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return false;

    if (post.isLiked) {
      post.stats.likes--;
      post.isLiked = false;
    } else {
      post.stats.likes++;
      post.isLiked = true;
      // 发送通知给作者
      this.sendNotification(post.author, 'like', post);
    }
    return true;
  }

  // 评论
  addComment(postId, content, replyTo = null) {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const comment = {
      id: 'comment_' + Date.now(),
      author: this.currentUser,
      content: content,
      replyTo: replyTo,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    post.comments.push(comment);
    post.stats.comments++;
    
    // 发送通知
    this.sendNotification(post.author, 'comment', post);
    
    return comment;
  }

  // 关注用户
  followUser(userId) {
    if (!this.currentUser.following) {
      this.currentUser.following = [];
    }
    
    if (!this.currentUser.following.includes(userId)) {
      this.currentUser.following.push(userId);
      
      // 更新被关注者的粉丝数
      const user = this.users.get(userId);
      if (user) {
        user.followers = (user.followers || 0) + 1;
      }
      
      return true;
    }
    return false;
  }

  // 取消关注
  unfollowUser(userId) {
    if (this.currentUser.following) {
      const index = this.currentUser.following.indexOf(userId);
      if (index > -1) {
        this.currentUser.following.splice(index, 1);
        
        const user = this.users.get(userId);
        if (user) {
          user.followers = Math.max(0, (user.followers || 0) - 1);
        }
        
        return true;
      }
    }
    return false;
  }

  // 检查是否已关注
  isFollowing(userId) {
    return this.currentUser?.following?.includes(userId);
  }

  // 搜索用户
  searchUsers(query) {
    const results = [];
    this.users.forEach(user => {
      if (user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.id.toLowerCase().includes(query.toLowerCase())) {
        results.push(user);
      }
    });
    return results;
  }

  // 获取用户主页数据
  getUserProfile(userId) {
    const user = this.users.get(userId);
    if (!user) return null;

    const userPosts = this.posts.filter(p => p.author.id === userId);
    
    return {
      user: user,
      stats: {
        posts: userPosts.length,
        followers: user.followers || 0,
        following: user.following?.length || 0,
        totalWorkouts: user.totalWorkouts || 0,
        totalDuration: user.totalDuration || 0
      },
      recentPosts: userPosts.slice(0, 5),
      achievements: user.achievements || []
    };
  }

  // 创建挑战活动
  createChallenge(challengeData) {
    const challenge = {
      id: 'challenge_' + Date.now(),
      title: challengeData.title,
      description: challengeData.description,
      type: challengeData.type, // 'steps', 'workout', 'diet'
      target: challengeData.target,
      duration: challengeData.duration, // 天数
      startDate: challengeData.startDate,
      endDate: challengeData.endDate,
      participants: [],
      rewards: challengeData.rewards,
      creator: this.currentUser,
      coverImage: challengeData.coverImage,
      rules: challengeData.rules
    };

    return challenge;
  }

  // 加入挑战
  joinChallenge(challengeId) {
    // 实现加入挑战逻辑
    console.log('Joined challenge:', challengeId);
    return true;
  }

  // 发送通知
  sendNotification(user, type, data) {
    // 模拟发送通知
    console.log(`Notification sent to ${user.name}: ${type}`, data);
  }

  // 生成示例动态
  generateSamplePosts() {
    const sampleUsers = [
      { id: 'u1', name: '健身小达人', avatar: '👩', level: 5 },
      { id: 'u2', name: '跑步狂人', avatar: '👨', level: 8 },
      { id: 'u3', name: '瑜伽爱好者', avatar: '🧘‍♀️', level: 4 },
      { id: 'u4', name: '减脂进行时', avatar: '💪', level: 3 }
    ];

    const sampleContents = [
      { type: 'workout', content: '今天完成了30分钟HIIT，大汗淋漓的感觉太棒了！💪 #每日训练', workoutData: { duration: 30, calories: 300, type: 'HIIT' } },
      { type: 'diet', content: '今日份健康餐：鸡胸肉沙拉🥗 低卡又美味！', dietData: { calories: 450, protein: 35 } },
      { type: 'achievement', content: '连续打卡30天达成！🎉 感谢自己的坚持！', achievementData: { name: '月度坚持奖', icon: '🏆' } },
      { type: 'text', content: '运动不仅改变身体，更改变心态。每一天的坚持都是对未来的投资。✨' }
    ];

    sampleContents.forEach((content, index) => {
      this.currentUser = sampleUsers[index % sampleUsers.length];
      const post = this.createPost(content.content, {
        type: content.type,
        ...content
      });
      post.stats.likes = Math.floor(Math.random() * 50);
      post.stats.comments = Math.floor(Math.random() * 10);
    });

    return this.posts;
  }
}

// 创建全局实例
const community = new CommunitySystem();

// 导出函数
window.communityCreatePost = function(content, options) {
  return community.createPost(content, options);
};

window.communityGetFeed = function(type, page, limit) {
  return community.getFeed(type, page, limit);
};

window.communityLikePost = function(postId) {
  return community.likePost(postId);
};

window.communityAddComment = function(postId, content) {
  return community.addComment(postId, content);
};

window.communityFollowUser = function(userId) {
  return community.followUser(userId);
};

window.communityGetUserProfile = function(userId) {
  return community.getUserProfile(userId);
};

window.communityCreateChallenge = function(data) {
  return community.createChallenge(data);
};

window.communityGenerateSamplePosts = function() {
  return community.generateSamplePosts();
};

console.log('[AMBROSE] Community System loaded');
