self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/builder.css',
        '/builder.min.js',
        '/logo.svg',
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open('v1').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (
          networkResponse
        ) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
