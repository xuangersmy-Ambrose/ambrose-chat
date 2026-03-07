/**
 * AMBROSE Health - 数据模块入口
 * 统一引入所有数据文件
 */

// 数据命名空间
window.AMBROSE_DATA = {
  foods: typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE : {},
  exercises: typeof EXERCISE_DATABASE !== 'undefined' ? EXERCISE_DATABASE : {},
  courses: typeof COURSE_DATABASE !== 'undefined' ? COURSE_DATABASE : [],
  recipes: typeof RECIPE_DATABASE !== 'undefined' ? RECIPE_DATABASE : [],
  achievements: typeof ACHIEVEMENTS_DATABASE !== 'undefined' ? ACHIEVEMENTS_DATABASE : {},
};

// 工具函数命名空间
window.AMBROSE_UTILS = {
  // 食物相关
  searchFoods: typeof searchFoods === 'function' ? searchFoods : () => [],
  getFoodsByCategory: typeof getFoodsByCategory === 'function' ? getFoodsByCategory : () => [],
  getAllFoods: typeof getAllFoods === 'function' ? getAllFoods : () => [],
  calculateCalories: typeof calculateCalories === 'function' ? calculateCalories : () => 0,
  
  // 动作相关
  getAllExercises: typeof getAllExercises === 'function' ? getAllExercises : () => [],
  getExercisesByCategory: typeof getExercisesByCategory === 'function' ? getExercisesByCategory : () => [],
  searchExercises: typeof searchExercises === 'function' ? searchExercises : () => [],
  getExercisesByDifficulty: typeof getExercisesByDifficulty === 'function' ? getExercisesByDifficulty : () => [],
  getExercisesByTarget: typeof getExercisesByTarget === 'function' ? getExercisesByTarget : () => [],
  
  // 课程相关
  getAllCourses: typeof getAllCourses === 'function' ? getAllCourses : () => [],
  getCoursesByCategory: typeof getCoursesByCategory === 'function' ? getCoursesByCategory : () => [],
  getCoursesByLevel: typeof getCoursesByLevel === 'function' ? getCoursesByLevel : () => [],
  searchCourses: typeof searchCourses === 'function' ? searchCourses : () => [],
  getRecommendedCourses: typeof getRecommendedCourses === 'function' ? getRecommendedCourses : () => [],
  
  // 食谱相关
  getAllRecipes: typeof getAllRecipes === 'function' ? getAllRecipes : () => [],
  getRecipesByCategory: typeof getRecipesByCategory === 'function' ? getRecipesByCategory : () => [],
  searchRecipes: typeof searchRecipes === 'function' ? searchRecipes : () => [],
  getRecommendedRecipes: typeof getRecommendedRecipes === 'function' ? getRecommendedRecipes : () => [],
  
  // 成就相关
  getAllAchievements: typeof getAllAchievements === 'function' ? getAllAchievements : () => [],
  getLevelInfo: typeof getLevelInfo === 'function' ? getLevelInfo : () => ({}),
};

console.log('[AMBROSE] Data module loaded successfully');
