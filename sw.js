// AMBROSE Health - Service Worker
// 版本号用于缓存控制
const CACHE_VERSION = 'v1';
const CACHE_NAME = `ambrose-${CACHE_VERSION}`;

// 核心资源列表
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico'
];

// 动态缓存名称
const DYNAMIC_CACHE = `ambrose-dynamic-${CACHE_VERSION}`;

// ==================== 安装阶段 ====================
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        // 使用 addAll 缓存核心资源
        return cache.addAll(STATIC_ASSETS).catch(err => {
          console.warn('[SW] Some assets failed to cache:', err);
        });
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting(); // 立即激活新版本
      })
  );
});

// ==================== 激活阶段 ====================
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 删除旧版本缓存
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim(); // 立即控制所有页面
    })
  );
});

// ==================== 拦截请求 ====================
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // 跳过非 GET 请求
  if (request.method !== 'GET') return;
  
  // 跳过 Chrome 扩展请求
  if (request.url.startsWith('chrome-extension://')) return;
  
  // 根据请求类型选择策略
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

// 1. Cache First - 适用于静态资源
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

// 2. Network First - 适用于 API 数据
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

// 3. Stale While Revalidate - 平衡速度和新鲜度
async function staleWhileRevalidateStrategy(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    const cache = caches.open(DYNAMIC_CACHE);
    cache.then(c => c.put(request, networkResponse.clone()));
    return networkResponse;
  }).catch(err => {
    console.log('[SW] Network fetch failed:', err);
  });
  
  // 优先返回缓存，后台更新
  return cached || fetchPromise;
}

// ==================== 辅助函数 ====================

// 判断是否为静态资源
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

// 同步健康数据
async function syncHealthData() {
  // 从 IndexedDB 获取待同步数据
  // 发送到服务器
  console.log('[SW] Syncing health data...');
}

// ==================== 推送通知 ====================
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  
  const options = {
    body: data.body || 'Time to check your health!',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    tag: data.tag || 'health-reminder',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(
      data.title || 'AMBROSE Health',
      options
    )
  );
});

// 点击通知
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[SW] Service Worker loaded');
