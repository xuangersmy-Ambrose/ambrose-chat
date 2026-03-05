// Service Worker - PWA 离线支持
// 缓存策略: Cache First, Network Fallback

const CACHE_NAME = 'ambrose-health-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/chat.js',
  '/auth.js',
  '/supabase-client.js',
  '/health-dashboard.js',
  '/fitness-pro.js',
  '/nutrition-system.js',
  '/weight-tracker.js',
  '/ai-coach.js',
  '/ui-components.js',
  '/design-system.js',
  '/user-profile-system.js',
  '/manifest.json'
];

// 安装 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] Cache failed:', err);
      })
  );
});

// 激活 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// 请求拦截 - 缓存优先策略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API 请求 - 网络优先，失败时返回缓存
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 静态资源 - 缓存优先
  if (request.method === 'GET') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 其他请求直接放行
  event.respondWith(fetch(request));
});

// 缓存优先策略
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    // 后台更新缓存
    fetch(request).then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    }).catch(() => {});
    return cached;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Network fetch failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// 网络优先策略 (用于API)
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache...');
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// 后台同步 - 离线提交的数据
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-health-data') {
    event.waitUntil(syncHealthData());
  }
});

async function syncHealthData() {
  // 从 IndexedDB 读取待同步数据
  // 这里需要与主应用配合
  console.log('[SW] Syncing health data...');
}

// 推送通知支持
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const options = {
    body: data.body || '记得记录今天的健康数据哦！',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    tag: data.tag || 'health-reminder',
    requireInteraction: false,
    actions: [
      { action: 'record', title: '立即记录' },
      { action: 'dismiss', title: '稍后再说' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('AMBROSE Health', options)
  );
});

// 通知点击处理
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'record') {
    event.waitUntil(
      clients.openWindow('/?action=record')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 消息处理 (来自主应用)
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker loaded');
