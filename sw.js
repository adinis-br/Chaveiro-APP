const CACHE_NAME = 'keyforge-3d-v5';
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
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/SVGLoader.js',
  'https://unpkg.com/clipper-lib@1.0.0/clipper.js',
  'https://unpkg.com/imagetracerjs@1.2.6/imagetracer_v1.2.6.js',
  'https://cdn.jsdelivr.net/npm/@fontsource/montserrat@5.0.8/files/montserrat-latin-black-normal.woff',
  'https://cdn.jsdelivr.net/npm/@fontsource/pacifico@5.0.8/files/pacifico-latin-regular-normal.woff',
  'https://cdn.jsdelivr.net/npm/@fontsource/bungee@5.0.8/files/bungee-latin-regular-normal.woff',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json'
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
