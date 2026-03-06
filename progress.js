// ========== 动态进度条系统 ==========
var taskProgress = {
  totalTasks: 0,
  completedTasks: 0,
  currentTask: '',
  taskList: [],
  
  init: function(tasks) {
    this.taskList = tasks;
    this.totalTasks = tasks.length;
    this.completedTasks = 0;
    this.render();
  },
  
  update: function(taskName, status, percent) {
    this.currentTask = taskName;
    if (status === 'completed') {
      this.completedTasks++;
    }
    this.render();
  },
  
  render: function() {
    var percent = Math.round((this.completedTasks / this.totalTasks) * 100);
    var bar = document.getElementById('progressBar');
    var text = document.getElementById('progressText');
    var task = document.getElementById('currentTask');
    
    if (bar) {
      bar.style.width = percent + '%';
      bar.style.background = percent === 100 ? '#30D158' : 'linear-gradient(90deg, #00D4FF, #FF2D92)';
    }
    if (text) {
      text.textContent = percent + '%';
    }
    if (task) {
      task.textContent = this.currentTask || '准备中...';
    }
  }
};

// 显示进度条
function showProgress() {
  var html = `
    <div id="progressContainer" style="
      position: fixed; top: 0; left: 0; right: 0; 
      background: rgba(10,10,10,0.98); 
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding: 16px 24px; z-index: 100000;
      animation: slideDown 0.3s ease;
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 14px; color: var(--text-secondary);">任务进度</span>
        <span id="progressText" style="font-size: 16px; font-weight: 700; color: var(--primary);">0%</span>
      </div>
      <div style="
        height: 6px; background: rgba(255,255,255,0.1); 
        border-radius: 3px; overflow: hidden;
      ">
        <div id="progressBar" style="
          height: 100%; width: 0%; 
          background: linear-gradient(90deg, #00D4FF, #FF2D92);
          border-radius: 3px; transition: all 0.5s ease;
        "></div>
      </div>
      <div id="currentTask" style="
        font-size: 13px; color: var(--text-secondary); 
        margin-top: 8px; text-align: center;
      ">准备中...</div>
    </div>
    <style>
      @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
    </style>
  `;
  
  // 移除旧的进度条
  var old = document.getElementById('progressContainer');
  if (old) old.remove();
  
  document.body.insertAdjacentHTML('afterbegin', html);
}

// 隐藏进度条
function hideProgress() {
  var bar = document.getElementById('progressContainer');
  if (bar) {
    bar.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => bar.remove(), 300);
  }
}
