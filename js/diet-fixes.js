/**
 * AMBROSE Health - 饮食功能修复
 * 修复食物搜索、健康食谱、自定义食物功能
 */

// ========== 食谱数据 ==========
var recipesData = [
  {
    id: 1,
    name: '鸡胸肉沙拉',
    emoji: '🥗',
    category: ['午餐', '晚餐', '减脂'],
    calories: 320,
    time: '15分钟',
    difficulty: '简单',
    ingredients: ['鸡胸肉 150g', '生菜 100g', '小番茄 6个', '黄瓜 半根', '橄榄油 1勺'],
    steps: ['鸡胸肉煮熟撕成丝', '蔬菜洗净切块', '混合所有食材', '淋上橄榄油和少许盐']
  },
  {
    id: 2,
    name: '燕麦牛奶早餐',
    emoji: '🥣',
    category: ['早餐', '增肌'],
    calories: 380,
    time: '5分钟',
    difficulty: '简单',
    ingredients: ['燕麦片 50g', '牛奶 250ml', '香蕉 1根', '坚果 10g'],
    steps: ['燕麦片倒入碗中', '加入热牛奶浸泡3分钟', '放上切好的香蕉', '撒上坚果即可']
  },
  {
    id: 3,
    name: '三文鱼藜麦饭',
    emoji: '🍱',
    category: ['午餐', '晚餐', '增肌'],
    calories: 520,
    time: '25分钟',
    difficulty: '中等',
    ingredients: ['三文鱼 150g', '藜麦 80g', '西兰花 100g', '胡萝卜 50g'],
    steps: ['藜麦提前浸泡后煮熟', '三文鱼煎熟', '蔬菜焯水', '装盘淋上柠檬汁']
  },
  {
    id: 4,
    name: '蔬菜鸡蛋饼',
    emoji: '🍳',
    category: ['早餐', '素食'],
    calories: 280,
    time: '10分钟',
    difficulty: '简单',
    ingredients: ['鸡蛋 2个', '菠菜 50g', '胡萝卜 30g', '面粉 20g'],
    steps: ['蔬菜切碎', '鸡蛋打散加入面粉', '放入蔬菜搅拌均匀', '平底锅煎熟即可']
  },
  {
    id: 5,
    name: '牛肉糙米饭',
    emoji: '🥩',
    category: ['午餐', '晚餐', '增肌'],
    calories: 580,
    time: '30分钟',
    difficulty: '中等',
    ingredients: ['牛肉 150g', '糙米 100g', '青椒 1个', '洋葱 半个'],
    steps: ['糙米提前浸泡煮熟', '牛肉切丁腌制', '蔬菜切块', '先炒牛肉再加蔬菜，最后拌饭']
  },
  {
    id: 6,
    name: '希腊酸奶杯',
    emoji: '🥛',
    category: ['早餐', '加餐', '减脂'],
    calories: 220,
    time: '5分钟',
    difficulty: '简单',
    ingredients: ['希腊酸奶 200g', '蓝莓 30g', '燕麦脆 20g', '蜂蜜 1勺'],
    steps: ['酸奶倒入杯中', '加入洗好的蓝莓', '撒上燕麦脆', '淋上蜂蜜即可']
  },
  {
    id: 7,
    name: '蒸蛋羹',
    emoji: '🍮',
    category: ['早餐', '晚餐'],
    calories: 150,
    time: '15分钟',
    difficulty: '简单',
    ingredients: ['鸡蛋 2个', '温水 150ml', '虾仁 3个', '香油 少许'],
    steps: ['鸡蛋打散加温水', '过筛去泡沫', '放入虾仁', '蒸10分钟，淋上香油']
  },
  {
    id: 8,
    name: '牛油果吐司',
    emoji: '🥑',
    category: ['早餐', '素食'],
    calories: 350,
    time: '10分钟',
    difficulty: '简单',
    ingredients: ['全麦面包 2片', '牛油果 半个', '鸡蛋 1个', '黑胡椒 少许'],
    steps: ['面包烤脆', '牛油果捣泥涂抹', '煎个太阳蛋放上', '撒上黑胡椒']
  }
];

// ========== 健康食谱功能 ==========
// 渲染食谱页面
function renderRecipesPage() {
  filterRecipeCategoryUI('all', null);
}

// 按分类筛选食谱
function filterRecipeCategoryUI(category, btn) {
  var grid = document.getElementById('recipesGrid');
  if (!grid) return;
  
  // 更新按钮状态
  if (btn) {
    document.querySelectorAll('.recipes-filter .category-chip').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  }
  
  // 筛选食谱
  var filtered = category === 'all' 
    ? recipesData 
    : recipesData.filter(function(r) {
        return r.category.includes(category);
      });
  
  // 渲染食谱卡片
  var html = '';
  if (filtered.length === 0) {
    html = '<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-secondary);">暂无此类食谱</div>';
  } else {
    filtered.forEach(function(recipe) {
      html += `
        <div class="recipe-card" onclick="showRecipeDetail(${recipe.id})" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; cursor: pointer;">
          <div style="font-size: 48px; text-align: center; padding: 20px; background: rgba(0,212,255,0.1);">${recipe.emoji}</div>
          <div style="padding: 16px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${recipe.name}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">🔥 ${recipe.calories}千卡 · ⏱️ ${recipe.time}</div>
            <div style="display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;">
              ${recipe.category.slice(0, 2).map(function(c) {
                return '<span style="font-size: 11px; background: rgba(0,212,255,0.1); color: var(--primary); padding: 2px 8px; border-radius: 10px;">' + c + '</span>';
              }).join('')}
            </div>
          </div>
        </div>
      `;
    });
  }
  
  grid.innerHTML = html;
}

// 显示食谱详情
function showRecipeDetail(recipeId) {
  var recipe = recipesData.find(function(r) { return r.id === recipeId; });
  if (!recipe) return;
  
  document.getElementById('recipeDetailTitle').textContent = recipe.name;
  var emojiEl = document.querySelector('.recipe-emoji');
  if (emojiEl) emojiEl.textContent = recipe.emoji;
  
  var calEl = document.getElementById('recipeDetailCalories');
  if (calEl) calEl.textContent = recipe.calories;
  
  var timeEl = document.getElementById('recipeDetailTime');
  if (timeEl) timeEl.textContent = recipe.time.replace('分钟', '');
  
  var diffEl = document.getElementById('recipeDetailDifficulty');
  if (diffEl) diffEl.textContent = recipe.difficulty;
  
  // 食材列表
  var ingredientsContainer = document.getElementById('recipeDetailIngredients');
  if (ingredientsContainer) {
    var ingredientsHtml = recipe.ingredients.map(function(ing) {
      return '<div style="padding: 8px 0; border-bottom: 1px solid var(--border);">' + ing + '</div>';
    }).join('');
    ingredientsContainer.innerHTML = ingredientsHtml;
  }
  
  // 步骤
  var stepsContainer = document.getElementById('recipeDetailSteps');
  if (stepsContainer) {
    var stepsHtml = recipe.steps.map(function(step, i) {
      return '<div style="padding: 12px 0; border-bottom: 1px solid var(--border);"><span style="color: var(--primary); font-weight: 600;">' + (i+1) + '.</span> ' + step + '</div>';
    }).join('');
    stepsContainer.innerHTML = stepsHtml;
  }
  
  var modal = document.getElementById('recipeDetailModal');
  if (modal) modal.style.display = 'flex';
}

// 关闭食谱详情
function closeRecipeDetail() {
  document.getElementById('recipeDetailModal').style.display = 'none';
}

// ========== 食物搜索功能 ==========
// 渲染食物列表
function renderFoodList(foods) {
  if (!foods || foods.length === 0) {
    return '<div style="text-align: center; padding: 48px; color: var(--text-secondary);">没有找到食物</div>';
  }
  
  var html = '<div style="display: grid; gap: 12px;">';
  foods.forEach(function(food, index) {
    html += `
      <div onclick="showFoodDetail(${index})" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 16px; cursor: pointer;">
        <div style="font-size: 40px;">${food.icon || '🍽️'}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600;">${food.name}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">${food.unit}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 20px; font-weight: 700; color: var(--primary);">${food.calories}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">千卡</div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

// 搜索食物UI
function searchFoodsUI() {
  var input = document.getElementById('foodSearchInput');
  var keyword = input ? input.value.trim() : '';
  var container = document.getElementById('foodList');
  
  if (!container) return;
  
  if (!keyword) {
    container.innerHTML = renderFoodList(foodDatabase);
    return;
  }
  
  var filtered = foodDatabase.filter(function(f) {
    return f.name.includes(keyword);
  });
  
  container.innerHTML = renderFoodList(filtered);
}

// 按分类筛选食物
function filterFoodCategoryUI(category, btn) {
  if (btn) {
    document.querySelectorAll('.food-categories .category-chip').forEach(function(b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
  }
  
  var container = document.getElementById('foodList');
  if (!container) return;
  
  var filtered = category === 'all' 
    ? foodDatabase 
    : foodDatabase.filter(function(f) {
        // 分类映射
        var categoryMap = {
          'staples': '主食',
          'meat': '蛋白质',
          'vegetables': '蔬菜',
          'fruits': '水果',
          'dairy': '蛋白质',
          'nuts': '蛋白质',
          'drinks': '饮品'
        };
        return f.category === categoryMap[category];
      });
  
  container.innerHTML = renderFoodList(filtered);
}

// ========== 自定义食物功能 ==========
// 显示添加自定义食物弹窗
function showAddCustomFoodModal() {
  var html = `
    <div id="customFoodModal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 100002; display: flex; align-items: center; justify-content: center; padding: 24px;">
      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 24px; padding: 24px; width: 100%; max-width: 400px; max-height: 90vh; overflow-y: auto;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 48px; margin-bottom: 8px;">🍽️</div>
          <h3 style="font-size: 20px;">添加自定义食物</h3>
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; color: var(--text-secondary); font-size: 14px; margin-bottom: 8px;">食物名称</label>
          <input type="text" id="customFoodName" placeholder="例如：妈妈的红烧肉" style="width: 100%; padding: 14px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; color: #fff; font-size: 16px;">
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; color: var(--text-secondary); font-size: 14px; margin-bottom: 8px;">单位（如：碗、个、100g）</label>
          <input type="text" id="customFoodUnit" placeholder="例如：碗(150g)" style="width: 100%; padding: 14px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; color: #fff; font-size: 16px;">
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; color: var(--text-secondary); font-size: 14px; margin-bottom: 8px;">热量（千卡）</label>
          <input type="number" id="customFoodCalories" placeholder="输入每单位的热量" style="width: 100%; padding: 14px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 12px; color: #fff; font-size: 16px;">
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
          <div>
            <label style="display: block; color: var(--text-secondary); font-size: 12px; margin-bottom: 4px;">蛋白质(g)</label>
            <input type="number" id="customFoodProtein" placeholder="0" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 14px;">
          </div>
          <div>
            <label style="display: block; color: var(--text-secondary); font-size: 12px; margin-bottom: 4px;">脂肪(g)</label>
            <input type="number" id="customFoodFat" placeholder="0" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 14px;">
          </div>
          <div>
            <label style="display: block; color: var(--text-secondary); font-size: 12px; margin-bottom: 4px;">碳水(g)</label>
            <input type="number" id="customFoodCarbs" placeholder="0" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 8px; color: #fff; font-size: 14px;">
          </div>
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button onclick="closeCustomFoodModal()" style="flex: 1; padding: 14px; background: transparent; border: 1px solid var(--border); border-radius: 12px; color: var(--text-secondary); font-size: 16px; cursor: pointer;">取消</button>
          <button onclick="saveCustomFood()" style="flex: 1; padding: 14px; background: var(--primary); border: none; border-radius: 12px; color: #000; font-weight: 600; font-size: 16px; cursor: pointer;">保存</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', html);
}

// 关闭自定义食物弹窗
function closeCustomFoodModal() {
  var modal = document.getElementById('customFoodModal');
  if (modal) modal.remove();
}

// 保存自定义食物
function saveCustomFood() {
  var name = document.getElementById('customFoodName').value.trim();
  var unit = document.getElementById('customFoodUnit').value.trim() || '份';
  var calories = parseFloat(document.getElementById('customFoodCalories').value);
  var protein = parseFloat(document.getElementById('customFoodProtein').value) || 0;
  var fat = parseFloat(document.getElementById('customFoodFat').value) || 0;
  var carbs = parseFloat(document.getElementById('customFoodCarbs').value) || 0;
  
  if (!name || !calories || calories <= 0) {
    showToast('请填写食物名称和热量');
    return;
  }
  
  // 创建新食物
  var newFood = {
    name: name,
    unit: unit,
    calories: calories,
    category: '自定义',
    icon: '🍽️',
    protein: protein,
    fat: fat,
    carbs: carbs,
    isCustom: true
  };
  
  // 添加到数据库
  foodDatabase.push(newFood);
  
  // 保存到本地存储
  var customFoods = JSON.parse(localStorage.getItem('ambrose_custom_foods') || '[]');
  customFoods.push(newFood);
  localStorage.setItem('ambrose_custom_foods', JSON.stringify(customFoods));
  
  closeCustomFoodModal();
  showToast('✅ 自定义食物已添加');
  
  // 刷新列表
  if (typeof searchFoodsUI === 'function') {
    searchFoodsUI();
  }
}

// 加载自定义食物
function loadCustomFoods() {
  var customFoods = JSON.parse(localStorage.getItem('ambrose_custom_foods') || '[]');
  customFoods.forEach(function(food) {
    // 检查是否已存在
    var exists = foodDatabase.some(function(f) {
      return f.name === food.name && f.isCustom;
    });
    if (!exists) {
      foodDatabase.push(food);
    }
  });
}

// ========== 初始化 ==========
// 页面加载时初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCustomFoods);
} else {
  loadCustomFoods();
}

// 导出函数
window.renderRecipesPage = renderRecipesPage;
window.filterRecipeCategoryUI = filterRecipeCategoryUI;
window.showRecipeDetail = showRecipeDetail;
window.closeRecipeDetail = closeRecipeDetail;
window.searchFoodsUI = searchFoodsUI;
window.filterFoodCategoryUI = filterFoodCategoryUI;
window.renderFoodList = renderFoodList;
window.showAddCustomFoodModal = showAddCustomFoodModal;
window.closeCustomFoodModal = closeCustomFoodModal;
window.saveCustomFood = saveCustomFood;

console.log('[AMBROSE] Diet fixes loaded');
