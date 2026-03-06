/**
 * AMBROSE Health v1.1 - 分析模块集成
 * 
 * 将新的分析功能集成到主应用
 */

// 健康分析仪表盘页面
function showAnalyticsDashboard() {
  // 隐藏所有页面
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // 检查是否已存在分析页面
  let analyticsPage = document.getElementById('analyticsPage');
  
  if (!analyticsPage) {
    analyticsPage = createAnalyticsPage();
    document.body.appendChild(analyticsPage);
  }
  
  analyticsPage.classList.add('active');
  
  // 初始化分析UI
  setTimeout(() => {
    if (window.analyticsUI) {
      window.analyticsUI.init();
    } else {
      window.analyticsUI = new HealthAnalyticsUI();
      window.analyticsUI.init();
    }
  }, 100);
  
  // 更新底部导航
  updateBottomNav('analytics');
}

// 创建分析页面
function createAnalyticsPage() {
  const page = document.createElement('div');
  page.id = 'analyticsPage';
  page.className = 'page';
  
  page.innerHTML = `
    <div class="analytics-header">
      <div class="analytics-header-content">
        <button class="back-btn" onclick="showPage('homePage')">←</button>
        <h1>📊 健康分析</h1>
      </div>
    </div>
    <div id="analytics-dashboard"></div>
    <div style="height: 100px;"></div>
  `;
  
  return page;
}

// 添加分析入口到主页
function addAnalyticsEntry() {
  // 查找健康数据入口区域
  const quickActions = document.querySelector('.quick-actions, .action-grid, .feature-grid');
  
  if (quickActions) {
    const analyticsBtn = document.createElement('div');
    analyticsBtn.className = 'action-item';
    analyticsBtn.innerHTML = `
      <div class="action-icon" style="background: linear-gradient(135deg, #00D4FF, #FF2D92);">📊</div>
      <div class="action-text">健康分析</div>
    `;
    analyticsBtn.onclick = showAnalyticsDashboard;
    quickActions.appendChild(analyticsBtn);
  }
  
  // 在菜单中添加分析入口
  addMenuAnalyticsEntry();
}

// 添加菜单入口
function addMenuAnalyticsEntry() {
  const menuContent = document.querySelector('.menu-content, .drawer-content');
  
  if (menuContent) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
      <div class="menu-icon">📊</div>
      <div class="menu-text">健康分析</div>
      <div class="menu-arrow">→</div>
    `;
    menuItem.onclick = () => {
      closeMenu();
      showAnalyticsDashboard();
    };
    
    // 插入到合适位置
    const insertAfter = menuContent.querySelector('.menu-item:nth-child(2)');
    if (insertAfter) {
      insertAfter.parentNode.insertBefore(menuItem, insertAfter.nextSibling);
    } else {
      menuContent.appendChild(menuItem);
    }
  }
}

// 更新底部导航
function updateBottomNav(activeTab) {
  document.querySelectorAll('.bottom-nav-item, .nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.tab === activeTab || item.onclick?.toString().includes(activeTab)) {
      item.classList.add('active');
    }
  });
}

// 关闭菜单（兼容不同实现）
function closeMenu() {
  const menu = document.querySelector('.side-menu, .drawer, .menu-overlay');
  if (menu) {
    menu.classList.remove('active', 'open');
  }
  const overlay = document.querySelector('.menu-overlay, .drawer-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// 注入分析样式
function injectAnalyticsStyles() {
  if (document.getElementById('analytics-integration-styles')) return;
  
  const styles = document.createElement('style');
  styles.id = 'analytics-integration-styles';
  styles.textContent = `
    .analytics-header {
      padding: 60px 20px 20px;
      background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,45,146,0.1));
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .analytics-header-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .analytics-header h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
    
    .back-btn {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.1);
      border: none;
      border-radius: 50%;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* 快速入口样式增强 */
    .action-item[data-analytics] .action-icon {
      background: linear-gradient(135deg, #00D4FF, #FF2D92) !important;
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 10px rgba(0,212,255,0.3); }
      50% { box-shadow: 0 0 20px rgba(0,212,255,0.6), 0 0 30px rgba(255,45,146,0.3); }
    }
  `;
  document.head.appendChild(styles);
}

// 初始化
function initAnalyticsIntegration() {
  injectAnalyticsStyles();
  
  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(addAnalyticsEntry, 1000);
    });
  } else {
    setTimeout(addAnalyticsEntry, 1000);
  }
}

// 自动初始化
initAnalyticsIntegration();

// 导出全局函数
window.showAnalyticsDashboard = showAnalyticsDashboard;
