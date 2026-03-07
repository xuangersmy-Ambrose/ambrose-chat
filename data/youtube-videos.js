/**
 * AMBROSE Health - YouTube视频库
 * 精选可嵌入的免费健身教学视频
 */

const YOUTUBE_VIDEO_LIBRARY = {
  // ========== 基础动作教学 ==========
  basic: [
    {
      id: 'yt_basic_001',
      title: '标准俯卧撑完整教程',
      youtubeId: 'IODxDxX7oi4', // THENX - Perfect Pushup
      duration: '5:32',
      difficulty: '初级',
      target: '胸部、三头肌',
      instructor: 'Chris Heria',
      description: '详细讲解俯卧撑的正确姿势、常见错误和进阶方法',
      tags: ['俯卧撑', '胸部训练', '自重训练']
    },
    {
      id: 'yt_basic_002',
      title: '深蹲标准动作教学',
      youtubeId: 'YaXPRqUwItQ', // THENX - Squats
      duration: '6:15',
      difficulty: '初级',
      target: '腿部、臀部',
      instructor: 'THENX',
      description: '从基础深蹲到单腿深蹲的完整进阶指南',
      tags: ['深蹲', '腿部训练', '自重训练']
    },
    {
      id: 'yt_basic_003',
      title: '平板支撑核心训练',
      youtubeId: 'pSHjTR5n4ZQ', // Fitness Blender - Plank
      duration: '4:45',
      difficulty: '初级',
      target: '核心肌群',
      instructor: 'Fitness Blender',
      description: '平板支撑的正确姿势和变式动作',
      tags: ['平板支撑', '核心训练', '腹肌']
    },
    {
      id: 'yt_basic_004',
      title: '卷腹动作要领',
      youtubeId: 'FcjCKvR4vUU', // THENX - Sit Ups
      duration: '3:28',
      difficulty: '初级',
      target: '腹直肌',
      instructor: 'Chris Heria',
      description: '卷腹vs仰卧起坐，正确的腹肌训练方法',
      tags: ['卷腹', '腹肌训练', '核心']
    },
    {
      id: 'yt_basic_005',
      title: '波比跳燃脂教学',
      youtubeId: 'auY2li4cPSY', // THENX - Burpees
      duration: '5:12',
      difficulty: '中级',
      target: '全身、心肺',
      instructor: 'Chris Heria',
      description: '波比跳的标准动作和燃脂训练计划',
      tags: ['波比跳', 'HIIT', '燃脂']
    }
  ],

  // ========== 有氧/HIIT训练 ==========
  cardio: [
    {
      id: 'yt_cardio_001',
      title: '10分钟HIIT燃脂训练',
      youtubeId: 'ml6cT4AZdqI', // THENX - HIIT
      duration: '10:24',
      difficulty: '中级',
      target: '全身燃脂',
      instructor: 'Chris Heria',
      description: '无需器械，10分钟高效燃脂HIIT',
      tags: ['HIIT', '燃脂', '有氧']
    },
    {
      id: 'yt_cardio_002',
      title: '15分钟全身有氧',
      youtubeId: 'qWy_aOlB45Y', // Pamela Reif - 15min Cardio
      duration: '15:00',
      difficulty: '中级',
      target: '心肺、耐力',
      instructor: 'Pamela Reif',
      description: '帕梅拉经典有氧训练，无需跳跃',
      tags: ['有氧', '帕梅拉', '全身训练']
    },
    {
      id: 'yt_cardio_003',
      title: '开合跳Tabata训练',
      youtubeId: '8wVvP7d0k0A', // MadFit - Jumping Jacks
      duration: '4:08',
      difficulty: '初级',
      target: '心肺',
      instructor: 'MadFit',
      description: 'Tabata模式开合跳，4分钟快速燃脂',
      tags: ['开合跳', 'Tabata', '快速燃脂']
    },
    {
      id: 'yt_cardio_004',
      title: '20分钟低冲击有氧',
      youtubeId: 'M0uO8Xhm3jI', // Fitness Blender - Low Impact
      duration: '20:15',
      difficulty: '初级',
      target: '心肺、关节友好',
      instructor: 'Fitness Blender',
      description: '适合大体重和膝盖不好的低冲击有氧',
      tags: ['低冲击', '有氧', '大体重友好']
    }
  ],

  // ========== 力量训练 ==========
  strength: [
    {
      id: 'yt_strength_001',
      title: '徒手全身力量训练',
      youtubeId: '7Kp7J_sR9wU', // THENX - Full Body
      duration: '12:45',
      difficulty: '中级',
      target: '全身肌肉',
      instructor: 'Chris Heria',
      description: '无需器械的全身力量训练',
      tags: ['力量训练', '全身', '自重']
    },
    {
      id: 'yt_strength_002',
      title: '胸肌训练 - 俯卧撑变式',
      youtubeId: '2m-b3n2HXeA', // THENX - Chest Workout
      duration: '8:30',
      difficulty: '中高级',
      target: '胸肌',
      instructor: 'Chris Heria',
      description: '10种俯卧撑变式，全面刺激胸肌',
      tags: ['胸肌', '俯卧撑', '力量']
    },
    {
      id: 'yt_strength_003',
      title: '腹肌撕裂者训练',
      youtubeId: '2pLT-olgUJs', // THENX - Abs Workout
      duration: '7:20',
      difficulty: '中级',
      target: '腹肌',
      instructor: 'Chris Heria',
      description: '7分钟高强度腹肌训练',
      tags: ['腹肌', '核心', '高强度']
    },
    {
      id: 'yt_strength_004',
      title: '腿部塑形训练',
      youtubeId: '9gjQd4mVJTg', // THENX - Legs
      duration: '10:15',
      difficulty: '中级',
      target: '腿部、臀部',
      instructor: 'Chris Heria',
      description: '徒手腿部力量训练，打造完美腿型',
      tags: ['腿部', '臀部', '塑形']
    }
  ],

  // ========== 瑜伽/拉伸 ==========
  yoga: [
    {
      id: 'yt_yoga_001',
      title: '晨间唤醒瑜伽',
      youtubeId: 'v7AYKMP6rOE', // Yoga with Adriene - Morning Yoga
      duration: '10:30',
      difficulty: '初级',
      target: '全身拉伸、放松',
      instructor: 'Yoga with Adriene',
      description: '10分钟晨间瑜伽，唤醒身体',
      tags: ['瑜伽', '晨间', '拉伸']
    },
    {
      id: 'yt_yoga_002',
      title: '睡前放松瑜伽',
      youtubeId: 'oBu-pQG6sTY', // Yoga with Adriene - Bedtime Yoga
      duration: '15:45',
      difficulty: '初级',
      target: '放松、助眠',
      instructor: 'Yoga with Adriene',
      description: '睡前瑜伽，帮助入眠',
      tags: ['瑜伽', '睡前', '放松']
    },
    {
      id: 'yt_yoga_003',
      title: '全身拉伸放松',
      youtubeId: 'sTANio_2E0Q', // MadFit - Full Body Stretch
      duration: '12:00',
      difficulty: '初级',
      target: '全身柔韧性',
      instructor: 'MadFit',
      description: '运动后全身拉伸，缓解肌肉酸痛',
      tags: ['拉伸', '放松', '恢复']
    },
    {
      id: 'yt_yoga_004',
      title: '办公室瑜伽',
      youtubeId: 'M-8FvC3GD8c', // Yoga with Adriene - Office Yoga
      duration: '8:15',
      difficulty: '初级',
      target: '肩颈、腰背',
      instructor: 'Yoga with Adriene',
      description: '适合久坐办公族的瑜伽练习',
      tags: ['办公室', '肩颈', '腰背']
    }
  ],

  // ========== 专项训练 ==========
  special: [
    {
      id: 'yt_special_001',
      title: '7天减脂挑战Day1',
      youtubeId: '2MoGx4-1Z3A', // THENX - Fat Burn
      duration: '15:30',
      difficulty: '中级',
      target: '全身燃脂',
      instructor: 'Chris Heria',
      description: '7天减脂计划第一天，全身燃脂',
      tags: ['减脂', '挑战', '燃脂']
    },
    {
      id: 'yt_special_002',
      title: '核心稳定训练',
      youtubeId: '3p8EBPVZ2Jw', // THENX - Core
      duration: '8:45',
      difficulty: '中级',
      target: '核心稳定性',
      instructor: 'Chris Heria',
      description: '强化核心稳定性，改善体态',
      tags: ['核心', '稳定', '体态']
    },
    {
      id: 'yt_special_003',
      title: '燃脂跳绳训练',
      youtubeId: '1b98WrR4klA', // THENX - Jump Rope
      duration: '11:20',
      difficulty: '中级',
      target: '心肺、协调',
      instructor: 'Chris Heria',
      description: '跳绳燃脂训练，提高协调性',
      tags: ['跳绳', '燃脂', '心肺']
    },
    {
      id: 'yt_special_004',
      title: '引体向上教学',
      youtubeId: 'eGo4IYlbE5s', // THENX - Pull Ups
      duration: '7:30',
      difficulty: '中高级',
      target: '背部、二头肌',
      instructor: 'Chris Heria',
      description: '从零开始学引体向上',
      tags: ['引体向上', '背部', '进阶']
    }
  ],

  // ========== 女性专项 ==========
  female: [
    {
      id: 'yt_female_001',
      title: '帕梅拉15分钟臀部训练',
      youtubeId: 'w2iPxzNlVzY', // Pamela Reif - Booty
      duration: '15:00',
      difficulty: '中级',
      target: '臀部',
      instructor: 'Pamela Reif',
      description: '帕梅拉经典臀部训练，无跳跃',
      tags: ['臀部', '帕梅拉', '塑形']
    },
    {
      id: 'yt_female_002',
      title: '帕梅拉10分钟腹肌',
      youtubeId: 'vBK8y-NfZ4k', // Pamela Reif - Abs
      duration: '10:00',
      difficulty: '中级',
      target: '腹肌',
      instructor: 'Pamela Reif',
      description: '帕梅拉腹肌训练，马甲线养成',
      tags: ['腹肌', '帕梅拉', '马甲线']
    },
    {
      id: 'yt_female_003',
      title: '20分钟全身塑形',
      youtubeId: 's2NkBs4z1KY', // Pamela Reif - Full Body
      duration: '20:00',
      difficulty: '中级',
      target: '全身',
      instructor: 'Pamela Reif',
      description: '无器械全身塑形训练',
      tags: ['全身', '塑形', '帕梅拉']
    }
  ]
};

// 获取所有视频
function getAllYouTubeVideos() {
  const all = [];
  Object.keys(YOUTUBE_VIDEO_LIBRARY).forEach(category => {
    YOUTUBE_VIDEO_LIBRARY[category].forEach(video => {
      all.push({ ...video, category });
    });
  });
  return all;
}

// 按分类获取
function getYouTubeVideosByCategory(category) {
  return YOUTUBE_VIDEO_LIBRARY[category] || [];
}

// 搜索视频
function searchYouTubeVideos(query) {
  const all = getAllYouTubeVideos();
  return all.filter(video => 
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    video.target.toLowerCase().includes(query.toLowerCase())
  );
}

// 生成YouTube嵌入URL
function getYouTubeEmbedUrl(youtubeId, options = {}) {
  const { autoplay = 0, mute = 0, start = 0 } = options;
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay}&mute=${mute}&start=${start}&rel=0&modestbranding=1`;
}

// 生成YouTube缩略图
function getYouTubeThumbnail(youtubeId, quality = 'mqdefault') {
  // quality: default, mqdefault, hqdefault, sddefault, maxresdefault
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    YOUTUBE_VIDEO_LIBRARY, 
    getAllYouTubeVideos, 
    getYouTubeVideosByCategory, 
    searchYouTubeVideos,
    getYouTubeEmbedUrl,
    getYouTubeThumbnail
  };
}

console.log('[AMBROSE] YouTube Video Library loaded');
