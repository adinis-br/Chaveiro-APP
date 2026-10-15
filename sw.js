const CACHE_NAME = 'keyforge-3d-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './fonte_customizada.js',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/STLExporter.js',
  'https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/TTFLoader.js',
  'https://unpkg.com/clipper-lib@1.0.0/clipper.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/optimer_bold.typeface.json',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/gentilis_bold.typeface.json',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/droid/droid_sans_bold.typeface.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
