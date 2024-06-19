const CACHE_NAME = 'siakad_v1';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/js/main.js',
  '/images/icons/logo.png',
  // Tambahkan semua URL yang ingin kamu cache di sini
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});