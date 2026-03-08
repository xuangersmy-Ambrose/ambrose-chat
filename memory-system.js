/**
 * AMBROSE Memory System v2.0
 * 长期记忆系统 - 分层记忆架构
 */

class MemorySystem {
  constructor() {
    this.storageKey = 'ambrose_memory_v2';
    this.maxShortTerm = 20;      // 短期记忆上限
    this.maxMediumTerm = 100;    // 中期记忆上限
    this.maxLongTerm = 500;      // 长期记忆上限
    this.initialize();
  }

  // 初始化记忆系统
  initialize() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.memory = JSON.parse(stored);
    } else {
      this.memory = this.createEmptyMemory();
      this.save();
    }
  }

  // 创建空记忆结构
  createEmptyMemory() {
    return {
      // 短期记忆：当前对话上下文
      shortTerm: {
        currentSession: [],
        detectedEmotions: [],
        activeTopics: [],
        pendingQuestions: []
      },
      
      // 中期记忆：最近7天的模式与事件
      mediumTerm: {
        emotionPatterns: [],
        healthEvents: [],
        conversationHighlights: [],
        userPreferences: {
          communicationStyle: null,  // 'direct', 'gentle', 'humorous'
          preferredTimes: {},        // 活跃时间偏好
          dislikedTopics: []         // 用户回避的话题
        }
      },
      
      // 长期记忆：重要事件、成长轨迹、核心特质
      longTerm: {
        profile: {
          name: 'BOSS Shao',
          relation: 'master',
          firstMet: new Date().toISOString(),
          personalityTraits: [],
          coreValues: [],
          goals: []
        },
        milestones: [],
        importantEvents: [],
        growthTrajectory: [],
        insideJokes: [],  // 只有我们俩懂的梗
        emotionalTriggers: {
          positive: [],
          negative: [],
          neutral: []
        }
      },
      
      // 元数据
      meta: {
        version: '2.0',
        lastUpdated: new Date().toISOString(),
        totalConversations: 0,
        totalMessages: 0
      }
    };
  }

  // 保存到本地存储
  save() {
    this.memory.meta.lastUpdated = new Date().toISOString();
    localStorage.setItem(this.storageKey, JSON.stringify(this.memory));
  }

  // ========== 短期记忆操作 ==========
  
  // 添加当前对话消息
  addToShortTerm(message, role = 'user', metadata = {}) {
    const entry = {
      id: this.generateId(),
      timestamp: Date.now(),
      role,
      content: message.substring(0, 500), // 限制长度
      emotion: metadata.emotion || null,
      topic: metadata.topic || null
    };
    
    this.memory.shortTerm.currentSession.push(entry);
    
    // 保持上限
    if (this.memory.shortTerm.currentSession.length > this.maxShortTerm) {
      this.archiveToMediumTerm(this.memory.shortTerm.currentSession.shift());
    }
    
    this.save();
    return entry;
  }

  // 记录检测到的情绪
  recordEmotion(emotion, confidence, context = {}) {
    this.memory.shortTerm.detectedEmotions.push({
      timestamp: Date.now(),
      emotion,
      confidence,
      context
    });
    
    if (this.memory.shortTerm.detectedEmotions.length > this.maxShortTerm) {
      this.memory.shortTerm.detectedEmotions.shift();
    }
    
    this.save();
  }

  // 获取当前对话上下文
  getCurrentContext(limit = 10) {
    return this.memory.shortTerm.currentSession.slice(-limit);
  }

  // ========== 中期记忆操作 ==========

  // 归档到中期记忆
  archiveToMediumTerm(entry) {
    // 分析情绪模式
    if (entry.emotion) {
      this.memory.mediumTerm.emotionPatterns.push({
        timestamp: entry.timestamp,
        emotion: entry.emotion,
        context: entry.topic
      });
    }
    
    // 保持上限
    if (this.memory.mediumTerm.emotionPatterns.length > this.maxMediumTerm) {
      this.summarizeAndArchive();
    }
    
    this.save();
  }

  // 记录健康事件
  recordHealthEvent(eventType, data, significance = 'normal') {
    const event = {
      id: this.generateId(),
      timestamp: Date.now(),
      type: eventType,
      data,
      significance,  // 'minor', 'normal', 'major', 'milestone'
      emotionalContext: this.getCurrentEmotionalContext()
    };
    
    this.memory.mediumTerm.healthEvents.push(event);
    
    // 重大事件升级到长期记忆
    if (significance === 'milestone') {
      this.promoteToLongTerm(event);
    }
    
    this.save();
    return event;
  }

  // 记录对话亮点 (值得记住的对话片段)
  recordHighlight(content, reason, emotion = null) {
    this.memory.mediumTerm.conversationHighlights.push({
      timestamp: Date.now(),
      content: content.substring(0, 200),
      reason,  // 为什么值得记住
      emotion
    });
    
    if (this.memory.mediumTerm.conversationHighlights.length > 50) {
      this.memory.mediumTerm.conversationHighlights.shift();
    }
    
    this.save();
  }

  // 更新用户偏好
  updatePreference(key, value) {
    this.memory.mediumTerm.userPreferences[key] = value;
    this.save();
  }

  // 获取最近的情绪模式
  getRecentEmotionPattern(days = 7) {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return this.memory.mediumTerm.emotionPatterns.filter(
      p => p.timestamp > cutoff
    );
  }

  // ========== 长期记忆操作 ==========

  // 升级到长期记忆
  promoteToLongTerm(event) {
    this.memory.longTerm.milestones.push({
      ...event,
      promotedAt: Date.now()
    });
    this.save();
  }

  // 记录重要事件
  recordImportantEvent(eventType, description, emotionalImpact = 'neutral') {
    const event = {
      id: this.generateId(),
      timestamp: Date.now(),
      type: eventType,
      description,
      emotionalImpact,
      relatedHealthData: this.getRelatedHealthData()
    };
    
    this.memory.longTerm.importantEvents.push(event);
    this.save();
    return event;
  }

  // 记录成长轨迹
  recordGrowth(metric, value, context = '') {
    this.memory.longTerm.growthTrajectory.push({
      timestamp: Date.now(),
      metric,  // 例如: 'consistency', 'mood_improvement', 'fitness_level'
      value,
      context
    });
    this.save();
  }

  // 添加内部梗
  addInsideJoke(trigger, meaning, context = '') {
    this.memory.longTerm.insideJokes.push({
      timestamp: Date.now(),
      trigger,  // 触发词
      meaning,  // 含义
      context,  // 来源背景
      usedCount: 0
    });
    this.save();
  }

  // 记录情绪触发器
  recordEmotionalTrigger(trigger, emotion, intensity) {
    const category = intensity > 0.6 ? 'positive' : 
                     intensity < -0.6 ? 'negative' : 'neutral';
    
    this.memory.longTerm.emotionalTriggers[category].push({
      trigger,
      emotion,
      intensity,
      firstDetected: Date.now(),
      occurrenceCount: 1
    });
    this.save();
  }

  // ========== 查询与检索 ==========

  // 获取关系阶段
  getRelationshipStage() {
    const daysSinceFirstMet = Math.floor(
      (Date.now() - new Date(this.memory.longTerm.profile.firstMet).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    const messageCount = this.memory.meta.totalMessages;
    
    if (daysSinceFirstMet < 7 || messageCount < 50) return 'new';
    if (daysSinceFirstMet < 30 || messageCount < 200) return 'developing';
    if (messageCount > 1000) return 'intimate';
    return 'established';
  }

  // 获取适合当前关系的语调
  getAppropriateTone() {
    const stage = this.getRelationshipStage();
    const preferences = this.memory.mediumTerm.userPreferences;
    
    const tones = {
      new: 'professional_warm',
      developing: 'friendly_casual',
      established: 'intimate_playful',
      intimate: 'deeply_personal'
    };
    
    return preferences.communicationStyle || tones[stage] || 'friendly_casual';
  }

  // 搜索相关记忆
  searchRelevantMemories(query, limit = 5) {
    const allMemories = [
      ...this.memory.longTerm.importantEvents.map(e => ({...e, source: 'important'})),
      ...this.memory.mediumTerm.conversationHighlights.map(h => ({...h, source: 'highlight'})),
      ...this.memory.longTerm.milestones.map(m => ({...m, source: 'milestone'}))
    ];
    
    // 简单的关键词匹配 (后续可以用向量检索)
    const keywords = query.toLowerCase().split(/\s+/);
    
    return allMemories
      .filter(m => {
        const content = JSON.stringify(m).toLowerCase();
        return keywords.some(k => content.includes(k));
      })
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  // 获取统计数据
  getStats() {
    return {
      totalMessages: this.memory.meta.totalMessages,
      totalConversations: this.memory.meta.totalConversations,
      daysTogether: Math.floor(
        (Date.now() - new Date(this.memory.longTerm.profile.firstMet).getTime()) / 
        (1000 * 60 * 60 * 24)
      ),
      relationshipStage: this.getRelationshipStage(),
      memorySize: JSON.stringify(this.memory).length
    };
  }

  // ========== 辅助方法 ==========

  generateId() {
    return 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getCurrentEmotionalContext() {
    const recent = this.memory.shortTerm.detectedEmotions.slice(-3);
    if (recent.length === 0) return null;
    
    return {
      dominant: recent[0].emotion,
      trend: recent.length > 1 ? 
        (recent[recent.length - 1].emotion === recent[0].emotion ? 'stable' : 'shifting') : 'unknown'
    };
  }

  getRelatedHealthData() {
    // 获取最近的健康数据快照
    try {
      return {
        sleep: localStorage.getItem('ambrose_sleep_lastNight'),
        steps: localStorage.getItem('ambrose_exercise_todaySteps'),
        mood: localStorage.getItem('ambrose_mood_today')
      };
    } catch {
      return null;
    }
  }

  summarizeAndArchive() {
    // 当中期记忆满时，生成摘要并存入长期记忆
    const oldPatterns = this.memory.mediumTerm.emotionPatterns.splice(0, 50);
    
    // 生成情绪摘要
    const summary = this.summarizeEmotionPatterns(oldPatterns);
    
    this.memory.longTerm.growthTrajectory.push({
      timestamp: Date.now(),
      metric: 'emotional_period_summary',
      value: summary,
      context: 'Auto-summarized from medium-term memory'
    });
  }

  summarizeEmotionPatterns(patterns) {
    const counts = {};
    patterns.forEach(p => {
      counts[p.emotion] = (counts[p.emotion] || 0) + 1;
    });
    
    const dominant = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])[0];
    
    return {
      period: '7_days',
      dominantEmotion: dominant ? dominant[0] : 'neutral',
      totalPatterns: patterns.length,
      variety: Object.keys(counts).length
    };
  }

  // 清空记忆 (谨慎使用)
  clear() {
    this.memory = this.createEmptyMemory();
    this.save();
  }

  // 导出记忆 (用于备份)
  export() {
    return JSON.stringify(this.memory, null, 2);
  }

  // 导入记忆
  import(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.memory = imported;
      this.save();
      return true;
    } catch {
      return false;
    }
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MemorySystem;
}
