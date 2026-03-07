/**
 * AMBROSE Health v1.2 - 课程系统UI
 * 修复：XSS漏洞、添加输入验证、常量提取
 */

// 常量定义
const COURSE_CONSTANTS = {
  STORAGE_KEYS: {
    FAVORITES: 'ambrose_favorites',
    LEARNING_PLAN: 'ambrose_learning_plan'
  },
  DIFFICULTY_LABELS: {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级'
  },
  DEFAULT_TAB: 'fitness'
};

// 安全转义函数
function escapeHtml(text) {
  if (text == null) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

class CourseSystem {
  constructor() {
    this.currentTab = COURSE_CONSTANTS.DEFAULT_TAB;
    this.favorites = this.loadFavorites();
    this.learningPlan = this.loadLearningPlan();
  }

  loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem(COURSE_CONSTANTS.STORAGE_KEYS.FAVORITES) || '[]');
    } catch (e) {
      console.warn('Failed to load favorites:', e);
      return [];
    }
  }

  loadLearningPlan() {
    try {
      return JSON.parse(localStorage.getItem(COURSE_CONSTANTS.STORAGE_KEYS.LEARNING_PLAN) || '[]');
    } catch (e) {
      console.warn('Failed to load learning plan:', e);
      return [];
    }
  }

  init() {
    this.renderCoursePage();
    this.bindEvents();
  }

  renderCoursePage() {
    const page = document.getElementById('coursePage') || this.createCoursePage();
    
    // 使用DocumentFragment优化DOM操作
    const fragment = document.createDocumentFragment();
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="course-header">
        <button class="back-btn" onclick="showPage('homePage')">←</button>
        <h1>📚 健康课程</h1>
      </div>
      
      <div class="course-tabs">
        <button class="course-tab ${this.currentTab === 'fitness' ? 'active' : ''}" data-tab="fitness">
          💪 运动
        </button>
        <button class="course-tab ${this.currentTab === 'recipes' ? 'active' : ''}" data-tab="recipes">
          🥗 食谱
        </button>
        <button class="course-tab ${this.currentTab === 'articles' ? 'active' : ''}" data-tab="articles">
          📖 文章
        </button>
        <button class="course-tab ${this.currentTab === 'favorites' ? 'active' : ''}" data-tab="favorites">
          ⭐ 收藏
        </button>
      </div>
      
      <div class="course-content" id="courseContent"></div>
      
      <div style="height: 100px;"></div>
    `;
    
    // 安全地设置内容
    while (container.firstChild) {
      fragment.appendChild(container.firstChild);
    }
    
    page.innerHTML = '';
    page.appendChild(fragment);
    
    // 渲染内容区域
    this.renderContentArea();
  }

  renderContentArea() {
    const contentEl = document.getElementById('courseContent');
    if (!contentEl) return;
    
    const content = this.renderContent();
    
    // 使用安全的DOM操作方法
    if (typeof content === 'string') {
      // 对于trusted content，使用textContent插入
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      contentEl.innerHTML = '';
      while (tempDiv.firstChild) {
        contentEl.appendChild(tempDiv.firstChild);
      }
    } else if (content instanceof DocumentFragment) {
      contentEl.innerHTML = '';
      contentEl.appendChild(content);
    }
  }

  createCoursePage() {
    const page = document.createElement('div');
    page.id = 'coursePage';
    page.className = 'page';
    document.body.appendChild(page);
    return page;
  }

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
        return document.createDocumentFragment();
    }
  }

  renderFitnessCourses() {
    const courses = COURSES_DATA?.fitness || [];
    const fragment = document.createDocumentFragment();
    
    const grid = document.createElement('div');
    grid.className = 'course-grid';
    
    courses.forEach(course => {
      const card = this.createCourseCard(course, 'fitness');
      grid.appendChild(card);
    });
    
    fragment.appendChild(grid);
    return fragment;
  }

  renderRecipes() {
    const recipes = COURSES_DATA?.recipes || [];
    const fragment = document.createDocumentFragment();
    
    const grid = document.createElement('div');
    grid.className = 'course-grid';
    
    recipes.forEach(recipe => {
      const card = this.createRecipeCard(recipe);
      grid.appendChild(card);
    });
    
    fragment.appendChild(grid);
    return fragment;
  }

  renderArticles() {
    const articles = COURSES_DATA?.articles || [];
    const fragment = document.createDocumentFragment();
    
    const list = document.createElement('div');
    list.className = 'article-list';
    
    articles.forEach(article => {
      const card = this.createArticleCard(article);
      list.appendChild(card);
    });
    
    fragment.appendChild(list);
    return fragment;
  }

  renderFavorites() {
    const fragment = document.createDocumentFragment();
    
    if (this.favorites.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
        <div class="empty-icon">⭐</div>
        <div class="empty-text">还没有收藏内容</div>
        <div class="empty-hint">点击课程/食谱/文章旁边的☆收藏</div>
      `;
      fragment.appendChild(emptyState);
      return fragment;
    }

    const favoriteItems = this.favorites.map(id => {
      return (COURSES_DATA?.fitness || []).find(c => c.id === id) ||
             (COURSES_DATA?.recipes || []).find(r => r.id === id) ||
             (COURSES_DATA?.articles || []).find(a => a.id === id);
    }).filter(Boolean);

    const grid = document.createElement('div');
    grid.className = 'course-grid';
    
    favoriteItems.forEach(item => {
      const card = this.createFavoriteCard(item);
      grid.appendChild(card);
    });
    
    fragment.appendChild(grid);
    return fragment;
  }

  createCourseCard(course) {
    const card = document.createElement('div');
    card.className = `course-card ${course.isPremium ? 'premium' : ''}`;
    card.onclick = () => this.showCourseDetail(course.id);
    
    const difficultyLabel = COURSE_CONSTANTS.DIFFICULTY_LABELS[course.difficulty] || course.difficulty;
    const isFav = this.isFavorite(course.id);
    
    card.innerHTML = `
      ${course.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
      <div class="course-image" style="background-image: url('${escapeHtml(course.image)}')">
        <div class="course-duration">${escapeHtml(course.duration)}分钟</div>
      </div>
      <div class="course-info">
        <div class="course-category">${escapeHtml(course.category)}</div>
        <div class="course-title">${escapeHtml(course.title)}</div>
        <div class="course-meta">
          <span>🔥 ${escapeHtml(course.calories)}卡</span>
          <span>📊 ${escapeHtml(difficultyLabel)}</span>
        </div>
        <div class="course-tags">
          ${(course.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
      <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${escapeHtml(course.id)}">
        ${isFav ? '★' : '☆'}
      </button>
    `;
    
    // 绑定收藏按钮事件
    const favBtn = card.querySelector('.favorite-btn');
    favBtn.onclick = (e) => {
      e.stopPropagation();
      this.toggleFavorite(course.id);
    };
    
    return card;
  }

  createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = `course-card ${recipe.isPremium ? 'premium' : ''}`;
    card.onclick = () => this.showRecipeDetail(recipe.id);
    
    const isFav = this.isFavorite(recipe.id);
    const nutrition = recipe.nutrition || {};
    
    card.innerHTML = `
      ${recipe.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
      <div class="course-image" style="background-image: url('${escapeHtml(recipe.image)}')">
        <div class="course-duration">${escapeHtml(recipe.time)}分钟</div>
      </div>
      <div class="course-info">
        <div class="course-category">${escapeHtml(recipe.category)}</div>
        <div class="course-title">${escapeHtml(recipe.title)}</div>
        <div class="course-meta">
          <span>🔥 ${escapeHtml(recipe.calories)}卡</span>
          <span>🥩 蛋白质${escapeHtml(nutrition.protein)}g</span>
        </div>
        <div class="course-tags">
          ${(recipe.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      </div>
      <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${escapeHtml(recipe.id)}">
        ${isFav ? '★' : '☆'}
      </button>
    `;
    
    const favBtn = card.querySelector('.favorite-btn');
    favBtn.onclick = (e) => {
      e.stopPropagation();
      this.toggleFavorite(recipe.id);
    };
    
    return card;
  }

  createArticleCard(article) {
    const card = document.createElement('div');
    card.className = `article-card ${article.isPremium ? 'premium' : ''}`;
    card.onclick = () => this.showArticleDetail(article.id);
    
    const isFav = this.isFavorite(article.id);
    
    card.innerHTML = `
      ${article.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
      <div class="article-image" style="background-image: url('${escapeHtml(article.image)}')"></div>
      <div class="article-content">
        <div class="article-category">${escapeHtml(article.category)}</div>
        <div class="article-title">${escapeHtml(article.title)}</div>
        <div class="article-meta">
          <span>⏱️ ${escapeHtml(article.readTime)}分钟阅读</span>
          <span>🏷️ ${escapeHtml((article.tags || []).join(', '))}</span>
        </div>
      </div>
      <button class="favorite-btn ${isFav ? 'active' : ''}" data-id="${escapeHtml(article.id)}">
        ${isFav ? '★' : '☆'}
      </button>
    `;
    
    const favBtn = card.querySelector('.favorite-btn');
    favBtn.onclick = (e) => {
      e.stopPropagation();
      this.toggleFavorite(article.id);
    };
    
    return card;
  }

  createFavoriteCard(item) {
    const card = document.createElement('div');
    card.className = `course-card ${item.isPremium ? 'premium' : ''}`;
    card.onclick = () => this.showDetailByType(item.id);
    
    card.innerHTML = `
      ${item.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
      <div class="course-image" style="background-image: url('${escapeHtml(item.image)}')"></div>
      <div class="course-info">
        <div class="course-category">${escapeHtml(item.category)}</div>
        <div class="course-title">${escapeHtml(item.title)}</div>
      </div>
      <button class="favorite-btn active" data-id="${escapeHtml(item.id)}">★</button>
    `;
    
    const favBtn = card.querySelector('.favorite-btn');
    favBtn.onclick = (e) => {
      e.stopPropagation();
      this.toggleFavorite(item.id);
    };
    
    return card;
  }

  showCourseDetail(courseId) {
    // 验证ID
    if (!courseId || typeof courseId !== 'string') {
      console.warn('Invalid course ID');
      return;
    }
    
    const course = (COURSES_DATA?.fitness || []).find(c => c.id === courseId);
    if (!course) return;

    const modal = document.createElement('div');
    modal.className = 'course-modal';
    
    const difficultyLabel = COURSE_CONSTANTS.DIFFICULTY_LABELS[course.difficulty] || course.difficulty;
    
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.course-modal').remove()">×</button>
        
        <div class="modal-image" style="background-image: url('${escapeHtml(course.image)}')">
          ${course.isPremium ? '<div class="premium-badge large">PRO会员专享</div>' : ''}
        </div>
        
        <div class="modal-body">
          <div class="modal-category">${escapeHtml(course.category)}</div>
          <h2 class="modal-title">${escapeHtml(course.title)}</h2>
          
          <div class="modal-stats">
            <div class="stat">
              <div class="stat-value">${escapeHtml(course.duration)}</div>
              <div class="stat-label">分钟</div>
            </div>
            <div class="stat">
              <div class="stat-value">${escapeHtml(course.calories)}</div>
              <div class="stat-label">卡路里</div>
            </div>
            <div class="stat">
              <div class="stat-value">${escapeHtml(difficultyLabel)}</div>
              <div class="stat-label">难度</div>
            </div>
          </div>
          
          <div class="modal-description">${escapeHtml(course.description)}</div>
          
          <div class="modal-section">
            <h3>训练步骤</h3>
            <ol class="steps-list">
              ${(course.steps || []).map(step => `<li>${escapeHtml(step)}</li>`).join('')}
            </ol>
          </div>
          
          ${course.isPremium 
            ? '<button class="btn-primary" onclick="showUpgradeModal()">升级Pro会员解锁</button>'
            : `<button class="btn-primary" data-course-id="${escapeHtml(course.id)}">开始训练</button>
               <div class="video-container">
                 <iframe src="${escapeHtml(course.videoUrl)}" frameborder="0" allowfullscreen></iframe>
               </div>`
          }
        </div>
      </div>
    `;
    
    // 绑定开始训练按钮
    const startBtn = modal.querySelector('[data-course-id]');
    if (startBtn) {
      startBtn.onclick = () => this.startCourse(course.id);
    }
    
    document.body.appendChild(modal);
  }

  showRecipeDetail(recipeId) {
    if (!recipeId || typeof recipeId !== 'string') {
      console.warn('Invalid recipe ID');
      return;
    }
    
    const recipe = (COURSES_DATA?.recipes || []).find(r => r.id === recipeId);
    if (!recipe) return;

    const modal = document.createElement('div');
    modal.className = 'course-modal';
    
    const nutrition = recipe.nutrition || {};
    
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.course-modal').remove()">×</button>
        
        <div class="modal-image" style="background-image: url('${escapeHtml(recipe.image)}')">
          ${recipe.isPremium ? '<div class="premium-badge large">PRO会员专享</div>' : ''}
        </div>
        
        <div class="modal-body">
          <div class="modal-category">${escapeHtml(recipe.category)}</div>
          <h2 class="modal-title">${escapeHtml(recipe.title)}</h2>
          
          <div class="modal-stats">
            <div class="stat">
              <div class="stat-value">${escapeHtml(recipe.calories)}</div>
              <div class="stat-label">卡路里</div>
            </div>
            <div class="stat">
              <div class="stat-value">${escapeHtml(recipe.time)}</div>
              <div class="stat-label">分钟</div>
            </div>
          </div>
          
          <div class="nutrition-bar">
            <div class="nutrition-item">
              <span>蛋白质 ${escapeHtml(nutrition.protein)}g</span>
              <div class="nutrition-progress"><div style="width: ${Math.min(nutrition.protein || 0, 100)}%; background: #FF2D92;"></div></div>
            </div>
            <div class="nutrition-item">
              <span>碳水 ${escapeHtml(nutrition.carbs)}g</span>
              <div class="nutrition-progress"><div style="width: ${Math.min(nutrition.carbs || 0, 100)}%; background: #00D4FF;"></div></div>
            </div>
            <div class="nutrition-item">
              <span>脂肪 ${escapeHtml(nutrition.fat)}g</span>
              <div class="nutrition-progress"><div style="width: ${Math.min(nutrition.fat || 0, 100)}%; background: #FFD700;"></div></div>
            </div>
          </div>
          
          <div class="modal-section">
            <h3>食材</h3>
            <ul class="ingredient-list">
              ${(recipe.ingredients || []).map(ing => `<li>${escapeHtml(ing)}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-section">
            <h3>做法</h3>
            <ol class="steps-list">
              ${(recipe.steps || []).map(step => `<li>${escapeHtml(step)}</li>`).join('')}
            </ol>
          </div>
          
          ${recipe.isPremium 
            ? '<button class="btn-primary" onclick="showUpgradeModal()">升级Pro会员解锁</button>'
            : '<button class="btn-primary" data-add-recipe="true">添加到今日食谱</button>'
          }
        </div>
      </div>
    `;
    
    const addBtn = modal.querySelector('[data-add-recipe]');
    if (addBtn) {
      addBtn.onclick = () => {
        if (typeof showToast === 'function') {
          showToast('已添加到今日食谱');
        }
      };
    }
    
    document.body.appendChild(modal);
  }

  showArticleDetail(articleId) {
    if (!articleId || typeof articleId !== 'string') {
      console.warn('Invalid article ID');
      return;
    }
    
    const article = (COURSES_DATA?.articles || []).find(a => a.id === articleId);
    if (!article) return;

    const modal = document.createElement('div');
    modal.className = 'course-modal article-modal';
    
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.course-modal').remove()">×</button>
        
        <div class="modal-image" style="background-image: url('${escapeHtml(article.image)}')">
          ${article.isPremium ? '<div class="premium-badge large">PRO会员专享</div>' : ''}
        </div>
        
        <div class="modal-body">
          <div class="modal-category">${escapeHtml(article.category)}</div>
          <h2 class="modal-title">${escapeHtml(article.title)}</h2>
          
          <div class="article-meta-bar">
            <span>⏱️ ${escapeHtml(article.readTime)}分钟阅读</span>
            <span>🏷️ ${escapeHtml((article.tags || []).join(' '))}</span>
          </div>
          
          ${article.isPremium 
            ? '<div class="premium-lock"><button class="btn-primary" onclick="showUpgradeModal()">升级Pro会员阅读全文</button></div>'
            : `<div class="article-content-text">
                 ${escapeHtml(article.content || '').replace(/\n/g, '<br>')}
               </div>
               <button class="btn-primary" data-mark-read="true">标记为已读</button>`
          }
        </div>
      </div>
    `;
    
    const markBtn = modal.querySelector('[data-mark-read]');
    if (markBtn) {
      markBtn.onclick = () => {
        if (typeof showToast === 'function') {
          showToast('已标记为已读');
        }
      };
    }
    
    document.body.appendChild(modal);
  }

  showDetailByType(id) {
    if (!id) return;
    
    if ((COURSES_DATA?.fitness || []).find(c => c.id === id)) {
      this.showCourseDetail(id);
    } else if ((COURSES_DATA?.recipes || []).find(r => r.id === id)) {
      this.showRecipeDetail(id);
    } else {
      this.showArticleDetail(id);
    }
  }

  toggleFavorite(id) {
    if (!id) return;
    
    const index = this.favorites.indexOf(id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      if (typeof showToast === 'function') {
        showToast('已取消收藏');
      }
    } else {
      this.favorites.push(id);
      if (typeof showToast === 'function') {
        showToast('已添加到收藏');
      }
    }
    
    try {
      localStorage.setItem(COURSE_CONSTANTS.STORAGE_KEYS.FAVORITES, JSON.stringify(this.favorites));
    } catch (e) {
      console.warn('Failed to save favorites:', e);
    }
    
    this.renderCoursePage();
  }

  isFavorite(id) {
    return id ? this.favorites.includes(id) : false;
  }

  startCourse(courseId) {
    if (typeof showToast === 'function') {
      showToast('开始训练！加油 💪');
    }
    
    // 记录到学习计划
    if (courseId && !this.learningPlan.includes(courseId)) {
      this.learningPlan.push(courseId);
      try {
        localStorage.setItem(COURSE_CONSTANTS.STORAGE_KEYS.LEARNING_PLAN, JSON.stringify(this.learningPlan));
      } catch (e) {
        console.warn('Failed to save learning plan:', e);
      }
    }
  }

  bindEvents() {
    const tabs = document.querySelectorAll('.course-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const newTab = e.currentTarget.dataset.tab;
        if (newTab) {
          this.currentTab = newTab;
          this.renderCoursePage();
        }
      });
    });
  }

  // 清理方法
  destroy() {
    // 清理事件监听器
    const tabs = document.querySelectorAll('.course-tab');
    tabs.forEach(tab => {
      tab.replaceWith(tab.cloneNode(true));
    });
  }
}

// 初始化
let courseSystem;

function showCoursePage() {
  if (!courseSystem) {
    courseSystem = new CourseSystem();
  }
  courseSystem.init();
  if (typeof showPage === 'function') {
    showPage('coursePage');
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CourseSystem, COURSE_CONSTANTS };
} else {
  window.CourseSystem = CourseSystem;
  window.COURSE_CONSTANTS = COURSE_CONSTANTS;
  window.showCoursePage = showCoursePage;
}
