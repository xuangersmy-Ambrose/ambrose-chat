/**
 * AMBROSE Health - 课程系统 (优化版)
 * 修复问题: XSS漏洞、内存泄漏、代码重复、缺乏错误处理
 */

import SecurityUtils from './security-utils.js';
import PerformanceUtils from './performance-utils.js';
import apiClient from './api-client.js';

class CourseSystem {
  constructor() {
    this.currentTab = 'fitness';
    this.favorites = this.loadFavorites();
    this.learningPlan = this.loadLearningPlan();
    this.eventCleanupFns = [];
    
    // 使用防抖优化频繁操作
    this.debouncedRender = PerformanceUtils.debounce(() => {
      this.renderCoursePage();
    }, 100);
  }

  // 安全地加载本地存储数据
  loadFavorites() {
    try {
      return SecurityUtils.storage.get('favorites') || [];
    } catch (e) {
      console.error('加载收藏失败:', e);
      return [];
    }
  }

  loadLearningPlan() {
    try {
      return SecurityUtils.storage.get('learning_plan') || [];
    } catch (e) {
      console.error('加载学习计划失败:', e);
      return [];
    }
  }

  // 安全地保存数据
  saveFavorites() {
    SecurityUtils.storage.set('favorites', this.favorites);
  }

  saveLearningPlan() {
    SecurityUtils.storage.set('learning_plan', this.learningPlan);
  }

  init() {
    this.renderCoursePage();
    this.bindEvents();
    return this;
  }

  // 创建课程页面 - 使用安全的方式
  createCoursePage() {
    const page = document.createElement('div');
    page.id = 'coursePage';
    page.className = 'page';
    document.body.appendChild(page);
    return page;
  }

  // 渲染课程页面 - 使用安全的DOM操作
  renderCoursePage() {
    const page = document.getElementById('coursePage') || this.createCoursePage();
    
    // 使用文档片段批量更新
    const fragment = document.createDocumentFragment();
    
    // 头部
    const header = SecurityUtils.createElement('div', { class: 'course-header' }, [
      SecurityUtils.createElement('button', { 
        class: 'back-btn',
        'data-action': 'back'
      }, ['←']),
      SecurityUtils.createElement('h1', {}, ['📚 健康课程'])
    ]);
    
    // Tab导航
    const tabs = this.renderTabs();
    
    // 内容区域
    const content = SecurityUtils.createElement('div', { 
      class: 'course-content',
      id: 'courseContent'
    });
    content.innerHTML = this.renderContent();  // 内容已转义
    
    // 底部占位
    const spacer = SecurityUtils.createElement('div', { style: 'height: 100px;' });
    
    fragment.appendChild(header);
    fragment.appendChild(tabs);
    fragment.appendChild(content);
    fragment.appendChild(spacer);
    
    // 清空并重新填充
    page.innerHTML = '';
    page.appendChild(fragment);
    
    // 绑定新生成元素的事件
    this.bindDynamicEvents();
  }

  // 渲染Tab按钮 - 安全版本
  renderTabs() {
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'course-tabs';
    
    const tabs = [
      { id: 'fitness', label: '💪 运动' },
      { id: 'recipes', label: '🥗 食谱' },
      { id: 'articles', label: '📖 文章' },
      { id: 'favorites', label: '⭐ 收藏' }
    ];
    
    tabs.forEach(tab => {
      const button = SecurityUtils.createElement('button', {
        class: `course-tab ${this.currentTab === tab.id ? 'active' : ''}`,
        'data-tab': tab.id
      });
      button.textContent = tab.label;  // 使用textContent防止XSS
      tabsContainer.appendChild(button);
    });
    
    return tabsContainer;
  }

  // 渲染内容 - 安全版本
  renderContent() {
    switch(this.currentTab) {
      case 'fitness':
        return this.renderFitnessCourses();
      case 'recipes':
        return this.renderRecipes();
      case 'articles':
        return this.renderArticles();
      case 'favorites':
        return this.renderFavorites();
      default:
        return '';
    }
  }

  // 渲染健身课程 - 安全版本
  renderFitnessCourses() {
    const courses = COURSES_DATA.fitness || [];
    
    if (courses.length === 0) {
      return `<div class="empty-state">
        <div class="empty-icon">💪</div>
        <div class="empty-text">暂无课程数据</div>
      </div>`;
    }
    
    const cards = courses.map(course => {
      // 转义所有动态内容
      const safeId = SecurityUtils.escapeHtml(course.id);
      const safeTitle = SecurityUtils.escapeHtml(course.title);
      const safeCategory = SecurityUtils.escapeHtml(course.category);
      const safeDuration = SecurityUtils.escapeHtml(String(course.duration));
      const safeCalories = SecurityUtils.escapeHtml(String(course.calories));
      const safeDifficulty = this.getDifficultyLabel(course.difficulty);
      
      const isPremium = course.isPremium ? '<div class="premium-badge">PRO</div>' : '';
      const isFavorite = this.isFavorite(course.id) ? 'active' : '';
      
      // 安全构建标签
      const tagsHtml = (course.tags || [])
        .map(tag => `<span class="tag">${SecurityUtils.escapeHtml(tag)}</span>`)
        .join('');
      
      return `
        <div class="course-card ${course.isPremium ? 'premium' : ''}" data-course-id="${safeId}">
          ${isPremium}
          <div class="course-image" style="background-image: url('${SecurityUtils.escapeHtml(course.image)}')">
            <div class="course-duration">${safeDuration}分钟</div>
          </div>
          <div class="course-info">
            <div class="course-category">${safeCategory}</div>
            <div class="course-title">${safeTitle}</div>
            <div class="course-meta">
              <span>🔥 ${safeCalories}卡</span>
              <span>📊 ${safeDifficulty}</span>
            </div>
            <div class="course-tags">${tagsHtml}</div>
          </div>
          <button class="favorite-btn ${isFavorite}" data-course-id="${safeId}" aria-label="${this.isFavorite(course.id) ? '取消收藏' : '收藏'}">
            ${this.isFavorite(course.id) ? '★' : '☆'}
          </button>
        </div>
      `;
    }).join('');
    
    return `<div class="course-grid">${cards}</div>`;
  }

  // 渲染食谱
  renderRecipes() {
    const recipes = COURSES_DATA.recipes || [];
    
    const cards = recipes.map(recipe => {
      const safeId = SecurityUtils.escapeHtml(recipe.id);
      const safeTitle = SecurityUtils.escapeHtml(recipe.title);
      
      return `
        <div class="course-card ${recipe.isPremium ? 'premium' : ''}" data-recipe-id="${safeId}">
          ${recipe.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
          <div class="course-image" style="background-image: url('${SecurityUtils.escapeHtml(recipe.image)}')">
            <div class="course-duration">${SecurityUtils.escapeHtml(String(recipe.time))}分钟</div>
          </div>
          <div class="course-info">
            <div class="course-category">${SecurityUtils.escapeHtml(recipe.category)}</div>
            <div class="course-title">${safeTitle}</div>
            <div class="course-meta">
              <span>🔥 ${SecurityUtils.escapeHtml(String(recipe.calories))}卡</span>
              <span>🥩 蛋白质${SecurityUtils.escapeHtml(String(recipe.nutrition?.protein || 0))}g</span>
            </div>
          </div>
          <button class="favorite-btn ${this.isFavorite(recipe.id) ? 'active' : ''}" data-recipe-id="${safeId}">
            ${this.isFavorite(recipe.id) ? '★' : '☆'}
          </button>
        </div>
      `;
    }).join('');
    
    return `<div class="course-grid">${cards}</div>`;
  }

  // 渲染文章
  renderArticles() {
    const articles = COURSES_DATA.articles || [];
    
    const cards = articles.map(article => {
      const safeId = SecurityUtils.escapeHtml(article.id);
      
      return `
        <div class="article-card ${article.isPremium ? 'premium' : ''}" data-article-id="${safeId}">
          ${article.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
          <div class="article-image" style="background-image: url('${SecurityUtils.escapeHtml(article.image)}')"></div>
          <div class="article-content">
            <div class="article-category">${SecurityUtils.escapeHtml(article.category)}</div>
            <div class="article-title">${SecurityUtils.escapeHtml(article.title)}</div>
            <div class="article-meta">
              <span>⏱️ ${SecurityUtils.escapeHtml(String(article.readTime))}分钟阅读</span>
            </div>
          </div>
          <button class="favorite-btn ${this.isFavorite(article.id) ? 'active' : ''}" data-article-id="${safeId}">
            ${this.isFavorite(article.id) ? '★' : '☆'}
          </button>
        </div>
      `;
    }).join('');
    
    return `<div class="article-list">${cards}</div>`;
  }

  // 渲染收藏
  renderFavorites() {
    if (this.favorites.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">⭐</div>
          <div class="empty-text">还没有收藏内容</div>
          <div class="empty-hint">点击课程/食谱/文章旁边的☆收藏</div>
        </div>
      `;
    }
    
    const favoriteItems = this.favorites.map(id => {
      return COURSES_DATA.fitness.find(c => c.id === id) ||
             COURSES_DATA.recipes.find(r => r.id === id) ||
             COURSES_DATA.articles.find(a => a.id === id);
    }).filter(Boolean);
    
    const cards = favoriteItems.map(item => `
      <div class="course-card ${item.isPremium ? 'premium' : ''}" data-id="${SecurityUtils.escapeHtml(item.id)}">
        ${item.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
        <div class="course-image" style="background-image: url('${SecurityUtils.escapeHtml(item.image)}')"></div>
        <div class="course-info">
          <div class="course-category">${SecurityUtils.escapeHtml(item.category)}</div>
          <div class="course-title">${SecurityUtils.escapeHtml(item.title)}</div>
        </div>
        <button class="favorite-btn active" data-id="${SecurityUtils.escapeHtml(item.id)}">★</button>
      </div>
    `).join('');
    
    return `<div class="course-grid">${cards}</div>`;
  }

  // 获取难度标签
  getDifficultyLabel(difficulty) {
    const labels = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    };
    return labels[difficulty] || difficulty;
  }

  // 显示课程详情 - 使用API获取数据
  async showCourseDetail(courseId) {
    // 验证ID
    if (!courseId || typeof courseId !== 'string') {
      console.error('Invalid course ID');
      return;
    }
    
    const course = COURSES_DATA.fitness.find(c => c.id === courseId);
    if (!course) {
      this.showToast('课程不存在', 'error');
      return;
    }
    
    // 创建模态框
    const modal = this.createModal('course-detail');
    
    // 使用API获取详细信息
    try {
      const detail = await apiClient.get(`/courses/${courseId}`);
      this.renderCourseModal(modal, { ...course, ...detail.data });
    } catch (error) {
      // 降级使用本地数据
      this.renderCourseModal(modal, course);
    }
  }

  // 渲染课程模态框
  renderCourseModal(modal, course) {
    const safeTitle = SecurityUtils.escapeHtml(course.title);
    const safeDescription = SecurityUtils.escapeHtml(course.description);
    
    modal.innerHTML = `
      <div class="modal-overlay" data-action="close-modal"></div>
      <div class="modal-content">
        <button class="modal-close" data-action="close-modal" aria-label="关闭">×</button>
        <div class="modal-image" style="background-image: url('${SecurityUtils.escapeHtml(course.image)}')">
          ${course.isPremium ? '<div class="premium-badge large">PRO会员专享</div>' : ''}
        </div>
        <div class="modal-body">
          <div class="modal-category">${SecurityUtils.escapeHtml(course.category)}</div>
          <h2 class="modal-title">${safeTitle}</h2>
          
          <div class="modal-stats">
            <div class="stat">
              <div class="stat-value">${SecurityUtils.escapeHtml(String(course.duration))}</div>
              <div class="stat-label">分钟</div>
            </div>
            <div class="stat">
              <div class="stat-value">${SecurityUtils.escapeHtml(String(course.calories))}</div>
              <div class="stat-label">卡路里</div>
            </div>
          </div>
          
          <div class="modal-description">${safeDescription}</div>
          
          ${course.isPremium 
            ? '<button class="btn-primary" data-action="upgrade">升级Pro会员解锁</button>'
            : `<button class="btn-primary" data-course-id="${SecurityUtils.escapeHtml(course.id)}" data-action="start-course">开始训练</button>
               <div class="video-container">
                 <iframe src="${SecurityUtils.escapeHtml(course.videoUrl)}" frameborder="0" allowfullscreen></iframe>
               </div>`
          }
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  // 创建模态框元素
  createModal(id) {
    // 移除已存在的同ID模态框
    const existing = document.querySelector(`.course-modal[data-modal-id="${id}"]`);
    if (existing) {
      existing.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.setAttribute('data-modal-id', id);
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    return modal;
  }

  // 切换收藏 - 带防抖
  toggleFavorite(id, event) {
    if (event) {
      event.stopPropagation();
    }
    
    const index = this.favorites.indexOf(id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.showToast('已取消收藏');
    } else {
      this.favorites.push(id);
      this.showToast('已添加到收藏');
    }
    
    this.saveFavorites();
    this.debouncedRender();
  }

  isFavorite(id) {
    return this.favorites.includes(id);
  }

  // 开始课程
  async startCourse(courseId) {
    try {
      // 记录到学习计划
      if (!this.learningPlan.includes(courseId)) {
        this.learningPlan.push(courseId);
        this.saveLearningPlan();
      }
      
      // 调用API记录进度
      await apiClient.post('/courses/progress', { courseId });
      
      this.showToast('开始训练！加油 💪');
      this.closeModal();
    } catch (error) {
      this.showToast('开始训练失败，请重试', 'error');
    }
  }

  // 关闭模态框
  closeModal() {
    const modal = document.querySelector('.course-modal');
    if (modal) {
      modal.remove();
    }
  }

  // 绑定事件 - 使用事件委托
  bindEvents() {
    // 使用PerformanceUtils管理事件
    const page = document.getElementById('coursePage') || document.body;
    
    PerformanceUtils.eventManager.add(page, 'click', (e) => {
      const target = e.target;
      
      // Tab切换
      if (target.matches('.course-tab')) {
        this.currentTab = target.dataset.tab;
        this.renderCoursePage();
      }
      
      // 返回按钮
      if (target.matches('[data-action="back"]')) {
        window.showPage?.('homePage');
      }
    });
  }

  // 绑定动态事件
  bindDynamicEvents() {
    const page = document.getElementById('coursePage');
    if (!page) return;
    
    // 课程卡片点击
    page.querySelectorAll('[data-course-id]').forEach(card => {
      if (!card.matches('.favorite-btn')) {
        card.addEventListener('click', () => {
          this.showCourseDetail(card.dataset.courseId);
        });
      }
    });
    
    // 收藏按钮
    page.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.courseId || btn.dataset.recipeId || 
                   btn.dataset.articleId || btn.dataset.id;
        if (id) {
          this.toggleFavorite(id, e);
        }
      });
    });
    
    // 模态框事件
    const modal = document.querySelector('.course-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target.matches('[data-action="close-modal"], .modal-overlay')) {
          this.closeModal();
        }
        if (e.target.matches('[data-action="start-course"]')) {
          const courseId = e.target.dataset.courseId;
          if (courseId) {
            this.startCourse(courseId);
          }
        }
      });
      
      // ESC关闭
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          this.closeModal();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
      this.eventCleanupFns.push(() => document.removeEventListener('keydown', escHandler));
    }
  }

  // 显示提示
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = SecurityUtils.escapeHtml(message);
      toast.className = `toast show ${type}`;
      
      PerformanceUtils.timerManager.setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // 销毁清理
  destroy() {
    // 清理所有定时器
    PerformanceUtils.timerManager.clearAll();
    
    // 清理事件监听
    const page = document.getElementById('coursePage');
    if (page) {
      PerformanceUtils.eventManager.removeAll(page);
    }
    
    // 执行清理函数
    this.eventCleanupFns.forEach(fn => fn());
    this.eventCleanupFns = [];
    
    // 关闭模态框
    this.closeModal();
  }
}

// 初始化 - 使用模块导出
let courseSystem;

export function showCoursePage() {
  if (!courseSystem) {
    courseSystem = new CourseSystem();
  }
  courseSystem.init();
  window.showPage?.('coursePage');
}

export { CourseSystem };

// 兼容旧代码
if (typeof window !== 'undefined') {
  window.CourseSystem = CourseSystem;
  window.showCoursePage = showCoursePage;
}
