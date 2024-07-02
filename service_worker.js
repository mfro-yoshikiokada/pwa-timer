// キャッシュ名
const cacheName = 'pwa-test-caches';

//プリキャッシュするファイルの指定
const precacheResources = [
    '/pwa/',
    '/pwa/index.html',
    '/pwa/script.js',
    '/pwa/style.css'
];

// サービスワーカーのインストールが完了したら、キャッシュを開いてプリキャッシュリソースを追加する
self.addEventListener('install', (event) => {
  console.log('サービスワーカーのインストール');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

self.addEventListener('activate', (event) => {
  console.log('サービスワーカーのアクティベート');
});

// 取得要求があった場合、プリキャッシュリソースでの応答を試み、それ以外の場合はネットワークにフォールバックする
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});