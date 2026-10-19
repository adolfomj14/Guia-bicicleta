const CACHE_NAME = 'decathlon-bicis-v2';
const ASSETS = [
  './guia_bicicletas.html',
  './index.html',
  './manifest-bicis.json',
  './img/mtb.jpg',
  './img/ruta.jpg',
  './img/urbana.jpg',
  './img/plegable.jpg',
  './img/ninos.jpg',
  './img/allen.jpg',
  './img/bomba.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
