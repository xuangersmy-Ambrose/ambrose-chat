// AMBROSE Health - Service Worker v1.1
// 版本号用于缓存控制
const CACHE_VERSION = 'v1.1';
const CACHE_NAME = `ambrose-${CACHE_VERSION}`;

// 核心资源列表
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/analysis.html',
  '/favicon.ico'
];

// 动态缓存名称
const DYNAMIC_CACHE = `ambrose-dynamic-${CACHE_VERSION}`;

// ==================== 安装阶段 ====================
self.addEventListener('install', event => {
  console.log('[SW v1.1] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS).catch(err => {
          console.warn('[SW] Some assets failed to cache:', err);
        });
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// ==================== 激活阶段 ====================
self.addEventListener('activate', event => {
  console.log('[SW v1.1] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// ==================== 拦截请求 ====================
self.addEventListener('fetch', event => {
  const { request } = event;
  
  if (request.method !== 'GET') return;
  if (request.url.startsWith('chrome-extension://')) return;
  
  const url = new URL(request.url);
  
  // API 请求 - Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // 静态资源 - Cache First
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // 其他请求 - Stale While Revalidate
  event.respondWith(staleWhileRevalidateStrategy(request));
});

// ==================== 缓存策略 ====================

async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    throw error;
  }
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, falling back to cache');
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidateStrategy(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    const cache = caches.open(DYNAMIC_CACHE);
    cache.then(c => c.put(request, networkResponse.clone()));
    return networkResponse;
  }).catch(err => {
    console.log('[SW] Network fetch failed:', err);
  });
  
  return cached || fetchPromise;
}

function isStaticAsset(request) {
  const staticExtensions = [
    '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.woff', '.woff2', '.ttf', '.eot'
  ];
  const url = new URL(request.url);
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

// ==================== 后台同步 ====================
self.addEventListener('sync', event => {
  if (event.tag === 'sync-health-data') {
    event.waitUntil(syncHealthData());
  }
});

async function syncHealthData() {
  console.log('[SW] Syncing health data...');
}

// ==================== 推送通知 v1.1 ====================
self.addEventListener('push', event => {
  console.log('[SW] Push received:', event);
  
  let data = {};
  try {
    data = event.data?.json() || {};
  } catch (e) {
    data = { title: event.data?.text() || 'AMBROSE Health', body: '' };
  }
  
  const title = data.title || 'AMBROSE Health';
  const options = {
    body: data.body || 'Time to check your health!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: data.tag || 'health-reminder',
    requireInteraction: data.requireInteraction !== false,
    renotify: true,
    silent: false,
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
      type: data.type || 'general',
      ...data.payload
    },
    actions: getNotificationActions(data.type)
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 根据通知类型获取操作按钮
function getNotificationActions(type) {
  const actions = {
    water: [
      { action: 'record', title: '💧 记录饮水' },
      { action: 'snooze', title: '⏰ 稍后提醒' }
    ],
    exercise: [
      { action: 'start', title: '💪 开始运动' },
      { action: 'snooze', title: '⏰ 稍后提醒' }
    ],
    sleep: [
      { action: 'record', title: '😴 记录睡眠' },
      { action: 'dismiss', title: '忽略' }
    ],
    report: [
      { action: 'view', title: '📊 查看报告' },
      { action: 'dismiss', title: '忽略' }
    ]
  };
  
  return actions[type] || [
    { action: 'open', title: '打开应用' },
    { action: 'dismiss', title: '忽略' }
  ];
}

// 点击通知
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click:', event);
  
  const notification = event.notification;
  const action = event.action;
  const data = notification.data || {};
  
  notification.close();
  
  if (action === 'dismiss' || action === 'snooze') {
    return;
  }
  
  // 处理不同操作
  let targetUrl = data.url || '/';
  
  if (action === 'record' && data.type === 'water') {
    targetUrl = '/?action=addWater';
  } else if (action === 'start' && data.type === 'exercise') {
    targetUrl = '/workout.html';
  } else if (action === 'view' && data.type === 'report') {
    targetUrl = '/analysis.html?tab=report';
  }
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(windowClients => {
        // 查找已打开的窗口
        for (let client of windowClients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            return client.focus().then(client => {
              // 发送消息到客户端
              client.postMessage({
                type: 'notification-click',
                action: action,
                data: data
              });
              return client.navigate(targetUrl);
            });
          }
        }
        // 没有打开的窗口，新建一个
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

// 关闭通知
self.addEventListener('notificationclose', event => {
  console.log('[SW] Notification closed:', event);
});

// ==================== 消息处理 ====================
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'schedule-reminder') {
    // 处理客户端发送的提醒调度请求
    console.log('[SW] Scheduling reminder:', event.data.reminder);
  }
});

console.log('[SW v1.1] Service Worker loaded');
