const CACHE_NAME = 'fiziyaa-1am-v1';

const ASSETS = [
  '/middle-school-physics-first-year/',
  '/middle-school-physics-first-year/index.html',
  '/middle-school-physics-first-year/electricity/lesson1.html',
  '/middle-school-physics-first-year/electricity/lesson2.html',
  '/middle-school-physics-first-year/electricity/lesson3.html',
  '/middle-school-physics-first-year/electricity/lesson4.html',
  '/middle-school-physics-first-year/electricity/lesson5.html',
  '/middle-school-physics-first-year/electricity/lesson6.html',
  '/middle-school-physics-first-year/electricity/lesson7.html',
  '/middle-school-physics-first-year/matter/lesson1.html',
  '/middle-school-physics-first-year/matter/lesson2.html',
  '/middle-school-physics-first-year/matter/lesson3.html',
  '/middle-school-physics-first-year/matter/lesson4.html',
  '/middle-school-physics-first-year/matter/lesson5.html',
  '/middle-school-physics-first-year/matter/lesson6.html',
  '/middle-school-physics-first-year/matter/lesson7.html',
  '/middle-school-physics-first-year/matter/lesson8.html',
  '/middle-school-physics-first-year/matter/lesson9.html',
  '/middle-school-physics-first-year/matter/lesson10.html',
  '/middle-school-physics-first-year/matter/lesson11.html',
  '/middle-school-physics-first-year/optics/lesson1.html',
  '/middle-school-physics-first-year/optics/lesson2.html',
  '/middle-school-physics-first-year/optics/lesson3.html',
  '/middle-school-physics-first-year/optics/lesson4.html',
  '/middle-school-physics-first-year/optics/lesson5.html',
  '/middle-school-physics-first-year/optics/lesson6.html',
  '/middle-school-physics-first-year/optics/lesson7.html',
  '/middle-school-physics-first-year/optics/lesson8.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match('/middle-school-physics-first-year/index.html'));
    })
  );
});
