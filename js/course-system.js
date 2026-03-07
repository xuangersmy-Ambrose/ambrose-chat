/**
 * AMBROSE Health v1.2 - 课程系统UI
 */

class CourseSystem {
  constructor() {
    this.currentTab = 'fitness';
    this.favorites = JSON.parse(localStorage.getItem('ambrose_favorites') || '[]');
    this.learningPlan = JSON.parse(localStorage.getItem('ambrose_learning_plan') || '[]');
  }

  init() {
    this.renderCoursePage();
    this.bindEvents();
  }

  renderCoursePage() {
    const page = document.getElementById('coursePage') || this.createCoursePage();
    page.innerHTML = `
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
      
      <div class="course-content" id="courseContent">
        ${this.renderContent()}
      </div>
      
      <div style="height: 100px;"></div>
    `;
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
        return '';
    }
  }

  renderFitnessCourses() {
    const courses = COURSES_DATA.fitness;
    return `
      <div class="course-grid">
        ${courses.map(course => `
          <div class="course-card ${course.isPremium ? 'premium' : ''}" onclick="courseSystem.showCourseDetail('${course.id}')">
            ${course.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
            <div class="course-image" style="background-image: url('${course.image}')">
              <div class="course-duration">${course.duration}分钟</div>
            </div>
            <div class="course-info">
              <div class="course-category">${course.category}</div>
              <div class="course-title">${course.title}</div>
              <div class="course-meta">
                <span>🔥 ${course.calories}卡</span>
                <span>📊 ${course.difficulty === 'beginner' ? '初级' : course.difficulty === 'intermediate' ? '中级' : '高级'}</span>
              </div>
              <div class="course-tags">
                ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
            <button class="favorite-btn ${this.isFavorite(course.id) ? 'active' : ''}" onclick="event.stopPropagation(); courseSystem.toggleFavorite('${course.id}')">
              ${this.isFavorite(course.id) ? '★' : '☆'}
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderRecipes() {
    const recipes = COURSES_DATA.recipes;
    return `
      <div class="course-grid">
        ${recipes.map(recipe => `
          <div class="course-card ${recipe.isPremium ? 'premium' : ''}" onclick="courseSystem.showRecipeDetail('${recipe.id}')">
            ${recipe.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
            <div class="course-image" style="background-image: url('${recipe.image}')">
              <div class="course-duration">${recipe.time}分钟</div>
            </div>
            <div class="course-info">
              <div class="course-category">${recipe.category}</div>
              <div class="course-title">${recipe.title}</div>
              <div class="course-meta">
                <span>🔥 ${recipe.calories}卡</span>
                <span>🥩 蛋白质${recipe.nutrition.protein}g</span>
              </div>
              <div class="course-tags">
                ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
            <button class="favorite-btn ${this.isFavorite(recipe.id) ? 'active' : ''}" onclick="event.stopPropagation(); courseSystem.toggleFavorite('${recipe.id}')">
              ${this.isFavorite(recipe.id) ? '★' : '☆'}
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderArticles() {
    const articles = COURSES_DATA.articles;
    return `
      <div class="article-list">
        ${articles.map(article => `
          <div class="article-card ${article.isPremium ? 'premium' : ''}" onclick="courseSystem.showArticleDetail('${article.id}')">
            ${article.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
            <div class="article-image" style="background-image: url('${article.image}')"></div>
            <div class="article-content">
              <div class="article-category">${article.category}</div>
              <div class="article-title">${article.title}</div>
              <div class="article-meta">
                <span>⏱️ ${article.readTime}分钟阅读</span>
                <span>🏷️ ${article.tags.join(', ')}</span>
              </div>
            </div>
            <button class="favorite-btn ${this.isFavorite(article.id) ? 'active' : ''}" onclick="event.stopPropagation(); courseSystem.toggleFavorite('${article.id}')">
              ${this.isFavorite(article.id) ? '★' : '☆'}
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

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

    return `
      <div class="course-grid">
        ${favoriteItems.map(item => `
          <div class="course-card ${item.isPremium ? 'premium' : ''}" onclick="courseSystem.showDetailByType('${item.id}')">
            ${item.isPremium ? '<div class="premium-badge">PRO</div>' : ''}
            <div class="course-image" style="background-image: url('${item.image}')"></div>
            <div class="course-info">
              <div class="course-category">${item.category}</div>
              <div class="course-title">${item.title}</div>
            </div>
            <button class="favorite-btn active" onclick="event.stopPropagation(); courseSystem.toggleFavorite('${item.id}')">★</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  showCourseDetail(courseId) {
    const course = COURSES_DATA.fitness.find(c => c.id === courseId);
    if (!course) return;

    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.course-modal').remove()">×</button>
        
        <div class="modal-image" style="background-image: url('${course.image}')">
          ${course.isPremium ? '<div class="premium-badge large">PRO会员专享</div>' : ''}
        </div>
        
        <div class="modal-body">
          <div class="modal-category">${course.category}</div>
          <h2 class="modal-title">${course.title}</h2>
          
          <div class="modal-stats">
            <div class="stat">
              <div class="stat-value">${course.duration}</div>
              <div class="stat-label">分钟</div>
            </div>
            <div class="stat">
              <div class="stat-value">${course.calories}</div>
              <div class="stat-label">卡路里</div>
            </div>
            <div class="stat">
              <div class="stat-value">${course.difficulty === 'beginner' ? '初级' : course.difficulty === 'intermediate' ? '中级' : '高级'}</div>
              <div class="stat-label">难度</div>
            </div>
          </div>
          
          <div class="modal-description">${course.description}</div>
          
          <div class="modal-section">
            <h3>训练步骤</h3>
            <ol class="steps-list">
              ${course.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
          
          ${course.isPremium 
            ? '<button class="btn-primary" onclick="showUpgradeModal()">升级Pro会员解锁</button>'
            : `<button class="btn-primary" onclick="courseSystem.startCourse('${course.id}')">开始训练</button>
               <div class="video-container">
                 <iframe src="${course.videoUrl}" frameborder="0" allowfullscreen></iframe>
               </div>`
          }
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  showRecipeDetail(recipeId) {
    const recipe = COURSES_DATA.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.course-modal').remove()">×</button>
        
        <div class="modal-image" style="background-image: url('${recipe.image}')">
          ${recipe.isPremium ? '<div class="premium-badge large">PRO会员专享</div>' : ''}
        </div>
        
        <div class="modal-body">
          <div class="modal-category">${recipe.category}</div>
          <h2 class="modal-title">${recipe.title}</h2>
          
          <div class="modal-stats">
            <div class="stat">
              <div class="stat-value">${recipe.calories}</div>
              <div class="stat-label">卡路里</div>
            </div>
            <div class="stat">
              <div class="stat-value">${recipe.time}</div>
              <div class="stat-label">分钟</div>
            </div>
          </div>
          
          <div class="nutrition-bar">
            <div class="nutrition-item">
              <span>蛋白质 ${recipe.nutrition.protein}g</span>
              <div class="nutrition-progress"><div style="width: ${recipe.nutrition.protein}%; background: #FF2D92;"></div></div>
            </div>
            <div class="nutrition-item">
              <span>碳水 ${recipe.nutrition.carbs}g</span>
              <div class="nutrition-progress"><div style="width: ${recipe.nutrition.carbs}%; background: #00D4FF;"></div></div>
            </div>
            <div class="nutrition-item">
              <span>脂肪 ${recipe.nutrition.fat}g</span>
              <div class="nutrition-progress"><div style="width: ${recipe.nutrition.fat}%; background: #FFD700;"></div></div>
            </div>
          </div>
          
          <div class="modal-section">
            <h3>食材</h3>
            <ul class="ingredient-list">
              ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-section">
            <h3>做法</h3>
            <ol class="steps-list">
              ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
          </div>
          
          ${recipe.isPremium 
            ? '<button class="btn-primary" onclick="showUpgradeModal()">升级Pro会员解锁</button>'
            : '<button class="btn-primary" onclick="showToast('已添加到今日食谱')">添加到今日食谱</button>'
          }
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  showArticleDetail(articleId) {
    const article = COURSES_DATA.articles.find(a => a.id === articleId);
    if (!article) return;

    const modal = document.createElement('div');
    modal.className = 'course-modal article-modal';
    modal.innerHTML = `
      <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="modal-content">
        <button class="modal-close" onclick="this.closest('.course-modal').remove()">×</button>
        
        <div class="modal-image" style="background-image: url('${article.image}')">
          ${article.isPremium ? '<div class="premium-badge large">PRO会员专享</div>' : ''}
        </div>
        
        <div class="modal-body">
          <div class="modal-category">${article.category}</div>
          <h2 class="modal-title">${article.title}</h2>
          
          <div class="article-meta-bar">
            <span>⏱️ ${article.readTime}分钟阅读</span>
            <span>🏷️ ${article.tags.join(' ')}</span>
          </div>
          
          ${article.isPremium 
            ? '<div class="premium-lock"><button class="btn-primary" onclick="showUpgradeModal()">升级Pro会员阅读全文</button></div>'
            : `<div class="article-content-text">
                 ${article.content.replace(/\n/g, '<br>')}
               </div>
               <button class="btn-primary" onclick="showToast('已标记为已读')">标记为已读</button>`
          }
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  showDetailByType(id) {
    if (COURSES_DATA.fitness.find(c => c.id === id)) {
      this.showCourseDetail(id);
    } else if (COURSES_DATA.recipes.find(r => r.id === id)) {
      this.showRecipeDetail(id);
    } else {
      this.showArticleDetail(id);
    }
  }

  toggleFavorite(id) {
    const index = this.favorites.indexOf(id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      showToast('已取消收藏');
    } else {
      this.favorites.push(id);
      showToast('已添加到收藏');
    }
    localStorage.setItem('ambrose_favorites', JSON.stringify(this.favorites));
    this.renderCoursePage();
  }

  isFavorite(id) {
    return this.favorites.includes(id);
  }

  startCourse(courseId) {
    showToast('开始训练！加油 💪');
    // 记录到学习计划
    if (!this.learningPlan.includes(courseId)) {
      this.learningPlan.push(courseId);
      localStorage.setItem('ambrose_learning_plan', JSON.stringify(this.learningPlan));
    }
  }

  bindEvents() {
    document.querySelectorAll('.course-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.currentTab = e.target.dataset.tab;
        this.renderCoursePage();
      });
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
  showPage('coursePage');
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CourseSystem;
}
