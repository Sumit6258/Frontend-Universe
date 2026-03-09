// Frontend Universe — Service Worker
const CACHE = 'fu-v1';
const ASSETS = ['./', './index.html', './assets/css/styles.css', './assets/js/app.js', './assets/js/data.js'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))));
