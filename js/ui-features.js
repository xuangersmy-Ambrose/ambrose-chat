/**
 * AMBROSE Health - UI功能模块
 * 食物搜索、动作库、食谱、成就等页面功能
 */

// ========== 食物搜索功能 ==========
let currentFoodCategory = 'all';
let currentFoods = [];

function searchFoodsUI() {
  const query = document.getElementById('foodSearchInput')?.value || '';
  let foods = [];
  
  if (currentFoodCategory === 'all') {
    foods = AMBROSE_UTILS.getAllFoods ? AMBROSE_UTILS.getAllFoods() : [];
  } else {
    foods = AMBROSE_UTILS.getFoodsByCategory ? AMBROSE_UTILS.getFoodsByCategory(currentFoodCategory) : [];
  }
  
  if (query) {
    foods = foods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
  }
  
  currentFoods = foods;
  renderFoodList(foods);
}

function filterFoodCategoryUI(category, btn) {
  currentFoodCategory = category;
  document.querySelectorAll('.food-categories .category-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  searchFoodsUI();
}

function renderFoodList(foods) {
  const container = document.getElementById('foodList');
  if (!container) return;
  
  if (foods.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--text-secondary);">未找到相关食物</div>';
    return;
  }
  
  container.innerHTML = foods.map(food => `
    <div class="food-item" onclick="showFoodDetail('${food.id}')" style="display: flex; align-items: center; gap: 16px; background: var(--bg-card); padding: 16px; border-radius: 16px; margin-bottom: 12px; cursor: pointer;">
      <div style="font-size: 40px;">${food.emoji || '🍽️'}</div>
      <div style="flex: 1;">
        <div style="font-weight: 600; margin-bottom: 4px;">${food.name}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${food.unit} · 蛋白质${food.protein}g</div>
      </div>
      <div style="text-align: right;">
        <div style="color: var(--primary); font-weight: 700; font-size: 18px;">${food.calories}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">千卡</div>
      </div>
    </div>
  `).join('');
}

function showFoodDetail(foodId) {
  const food = AMBROSE_UTILS.getAllFoods ? AMBROSE_UTILS.getAllFoods().find(f => f.id === foodId) : null;
  if (!food) return;
  
  document.getElementById('foodDetailName').textContent = food.name;
  document.getElementById('foodDetailCalories').textContent = food.calories + ' 千卡/' + food.unit;
  document.getElementById('foodDetailProtein').textContent = food.protein + 'g';
  document.getElementById('foodDetailFat').textContent = food.fat + 'g';
  document.getElementById('foodDetailCarbs').textContent = food.carbs + 'g';
  document.getElementById('foodDetailFiber').textContent = (food.fiber || 0) + 'g';
  document.querySelector('.food-detail-header .food-emoji').textContent = food.emoji || '🍽️';
  
  const tagsContainer = document.getElementById('foodDetailTags');
  if (tagsContainer) {
    const tags = food.tags || [];
    if (food.gi) tags.push('GI:' + food.gi);
    tagsContainer.innerHTML = tags.map(tag => `
      <span style="background: rgba(0,212,255,0.1); color: var(--primary); padding: 4px 12px; border-radius: 12px; font-size: 12px;">${tag}</span>
    `).join('');
  }
  
  document.getElementById('foodDetailModal').style.display = 'flex';
}

function closeFoodDetail() {
  document.getElementById('foodDetailModal').style.display = 'none';
}

function addFoodToDiary() {
  showToast('已添加到饮食记录');
  closeFoodDetail();
}

// ========== 动作库功能 ==========
let currentExerciseCategory = 'all';
let currentExerciseDifficulty = 'all';

function searchExercisesUI() {
  const query = document.getElementById('exerciseSearchInput')?.value || '';
  let exercises = AMBROSE_UTILS.getAllExercises ? AMBROSE_UTILS.getAllExercises() : [];
  
  if (currentExerciseCategory !== 'all') {
    exercises = exercises.filter(e => e.category === currentExerciseCategory);
  }
  
  if (currentExerciseDifficulty !== 'all') {
    exercises = exercises.filter(e => e.difficulty === currentExerciseDifficulty);
  }
  
  if (query) {
    exercises = exercises.filter(e => e.name.toLowerCase().includes(query.toLowerCase()));
  }
  
  renderExerciseList(exercises);
}

function filterExerciseCategoryUI(category, btn) {
  currentExerciseCategory = category;
  document.querySelectorAll('.exercise-categories .category-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  searchExercisesUI();
}

function filterExerciseDifficultyUI(difficulty, btn) {
  currentExerciseDifficulty = difficulty;
  document.querySelectorAll('.difficulty-filter .difficulty-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  searchExercisesUI();
}

function renderExerciseList(exercises) {
  const container = document.getElementById('exerciseList');
  if (!container) return;
  
  if (exercises.length === 0) {
    container.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--text-secondary);">未找到相关动作</div>';
    return;
  }
  
  container.innerHTML = exercises.map(ex => `
    <div class="exercise-item" style="background: var(--bg-card); padding: 16px; border-radius: 16px; margin-bottom: 12px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="font-size: 40px;">${ex.emoji || '💪'}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
            ${ex.name}
            <span style="font-size: 11px; padding: 2px 8px; border-radius: 10px; background: ${getDifficultyColor(ex.difficulty)}; color: #000; font-weight: 500;">${ex.difficulty}</span>
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">${ex.target}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">${ex.duration ? ex.duration + '秒' : (ex.reps + '次 × ' + ex.sets + '组')} · 🔥${ex.calories}千卡</div>
        </div>
      </div>
      ${ex.description ? `<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); font-size: 13px; color: var(--text-secondary);">💡 ${ex.description}</div>` : ''}
    </div>
  `).join('');
}

function getDifficultyColor(difficulty) {
  switch(difficulty) {
    case '初级': return '#55E6C1';
    case '中级': return '#FFD93D';
    case '高级': return '#FF6B6B';
    default: return '#ccc';
  }
}

// ========== 食谱功能 ==========
let currentRecipeCategory = 'all';

function filterRecipeCategoryUI(category, btn) {
  currentRecipeCategory = category;
  document.querySelectorAll('.recipes-filter .category-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRecipes();
}

function renderRecipes() {
  const container = document.getElementById('recipesGrid');
  if (!container) return;
  
  let recipes = AMBROSE_UTILS.getAllRecipes ? AMBROSE_UTILS.getAllRecipes() : [];
  if (currentRecipeCategory !== 'all') {
    recipes = recipes.filter(r => r.category === currentRecipeCategory);
  }
  
  container.innerHTML = recipes.map(recipe => `
    <div class="recipe-card" onclick="showRecipeDetail('${recipe.id}')" style="background: var(--bg-card); border-radius: 16px; overflow: hidden; cursor: pointer;">
      <div style="font-size: 64px; text-align: center; padding: 24px; background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,45,146,0.1));">${recipe.emoji}</div>
      <div style="padding: 16px;">
        <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">${recipe.title}</div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary);">
          <span>🔥${recipe.calories}千卡</span>
          <span>⏱️${recipe.time}分</span>
        </div>
      </div>
    </div>
  `).join('');
}

function showRecipeDetail(recipeId) {
  const recipe = AMBROSE_UTILS.getAllRecipes ? AMBROSE_UTILS.getAllRecipes().find(r => r.id === recipeId) : null;
  if (!recipe) return;
  
  document.getElementById('recipeDetailTitle').textContent = recipe.title;
  document.getElementById('recipeDetailSubtitle').textContent = recipe.subtitle || '';
  document.getElementById('recipeDetailCalories').textContent = recipe.calories;
  document.getElementById('recipeDetailTime').textContent = recipe.time;
  document.getElementById('recipeDetailDifficulty').textContent = recipe.difficulty;
  document.querySelector('.recipe-detail-header .recipe-emoji').textContent = recipe.emoji;
  document.getElementById('recipeDetailTips').textContent = recipe.tips || '暂无小贴士';
  
  const ingredientsContainer = document.getElementById('recipeDetailIngredients');
  if (ingredientsContainer && recipe.ingredients) {
    ingredientsContainer.innerHTML = recipe.ingredients.map(ing => `
      <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border);">
        <span>${ing.name}</span>
        <span style="color: var(--text-secondary);">${ing.amount}</span>
      </div>
    `).join('');
  }
  
  const stepsContainer = document.getElementById('recipeDetailSteps');
  if (stepsContainer && recipe.steps) {
    stepsContainer.innerHTML = recipe.steps.map((step, i) => `
      <div style="display: flex; gap: 12px; padding: 12px 0; ${i < recipe.steps.length - 1 ? 'border-bottom: 1px solid var(--border);' : ''}">
        <div style="width: 24px; height: 24px; background: var(--primary); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0;">${i + 1}</div>
        <div style="font-size: 14px; line-height: 1.5;">${step}</div>
      </div>
    `).join('');
  }
  
  document.getElementById('recipeDetailModal').style.display = 'flex';
}

function closeRecipeDetail() {
  document.getElementById('recipeDetailModal').style.display = 'none';
}

// ========== 成就功能 ==========
let currentAchievementCategory = 'all';

function filterAchievementsUI(category, btn) {
  currentAchievementCategory = category;
  document.querySelectorAll('.achievements-categories .category-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAchievements();
}

function renderAchievements() {
  const container = document.getElementById('achievementsList');
  if (!container) return;
  
  let achievements = AMBROSE_UTILS.getAllAchievements ? AMBROSE_UTILS.getAllAchievements() : [];
  if (currentAchievementCategory !== 'all') {
    achievements = achievements.filter(a => a.category === currentAchievementCategory);
  }
  
  // 模拟已解锁的成就
  const unlockedIds = ['workout_001', 'workout_005', 'diet_001'];
  
  container.innerHTML = achievements.map(ach => {
    const unlocked = unlockedIds.includes(ach.id);
    return `
      <div class="achievement-item" style="display: flex; align-items: center; gap: 16px; background: ${unlocked ? 'var(--bg-card)' : 'rgba(255,255,255,0.02)'}; padding: 16px; border-radius: 16px; margin-bottom: 12px; opacity: ${unlocked ? 1 : 0.5};">
        <div style="font-size: 40px; filter: ${unlocked ? 'none' : 'grayscale(100%)'};">${ach.emoji}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
            ${ach.title}
            ${unlocked ? '<span style="background: var(--primary); color: #000; padding: 2px 8px; border-radius: 10px; font-size: 11px;">已解锁</span>' : ''}
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">${ach.description}</div>
          <div style="font-size: 12px; color: ${ach.color};">+${ach.points} 积分</div>
        </div>
      </div>
    `;
  }).join('');
}

// 预定义函数供HTML调用
window.searchFoodsUI = searchFoodsUI;
window.filterFoodCategoryUI = filterFoodCategoryUI;
window.showFoodDetail = showFoodDetail;
window.closeFoodDetail = closeFoodDetail;
window.addFoodToDiary = addFoodToDiary;

window.searchExercisesUI = searchExercisesUI;
window.filterExerciseCategoryUI = filterExerciseCategoryUI;
window.filterExerciseDifficultyUI = filterExerciseDifficultyUI;

window.filterRecipeCategoryUI = filterRecipeCategoryUI;
window.showRecipeDetail = showRecipeDetail;
window.closeRecipeDetail = closeRecipeDetail;

window.filterAchievementsUI = filterAchievementsUI;

// 页面初始化时渲染内容
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('foodSearchPage')) {
    searchFoodsUI();
  }
  if (document.getElementById('exerciseList')) {
    searchExercisesUI();
  }
  if (document.getElementById('recipesGrid')) {
    renderRecipes();
  }
  if (document.getElementById('achievementsList')) {
    renderAchievements();
  }
});

console.log('[AMBROSE] UI module loaded successfully');
