self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("browser-use-shell-v1").then((cache) => cache.addAll(["/", "/manifest.webmanifest", "/icon-192.svg", "/icon-512.svg"]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open("browser-use-shell-v1").then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
