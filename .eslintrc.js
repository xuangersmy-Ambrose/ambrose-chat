/**
 * AMBROSE Health - ESLint 配置
 * 严格代码质量标准
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // 错误预防
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'no-redeclare': 'error',
    'no-dupe-keys': 'error',
    'no-dupe-args': 'error',
    'no-unreachable': 'error',
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    
    // 最佳实践
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    
    // 代码风格
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'max-len': ['warn', { code: 100 }],
    
    // 变量声明
    'prefer-const': 'error',
    'no-var': 'error',
    
    // 函数
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    
    // 对象/数组
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    
    // XSS 安全防护
    'no-inner-declarations': 'error'
  },
  globals: {
    'showToast': 'readonly',
    'showPage': 'readonly',
    'COURSES_DATA': 'readonly',
    'courseSystem': 'readonly',
    'HealthAnalyticsEngine': 'readonly',
    'localStorage': 'readonly',
    'fetch': 'readonly',
    'navigator': 'readonly',
    'document': 'readonly',
    'window': 'readonly',
    'Notification': 'readonly',
    'Chart': 'readonly'
  }
};
