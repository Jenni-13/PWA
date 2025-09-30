const CACHE_NAME = "mi-pwa-cache-v1";

// Archivos esenciales que siempre estarán en cache
const urlsToCache = [
    "/",
    "/index.html",
    "/offline.html",
    "/favicon.ico",
    "/logo192.png",
    "/logo512.png",
    "/manifest.json",
];

// Instalar SW y cachear recursos esenciales
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

// Activar SW y limpiar cachés viejos
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Interceptar peticiones y manejar cache dinámico
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // Usa lo que ya está en cache
            }

            return fetch(e.request)
                .then(networkResponse => {
                    // Guardar en cache dinámico lo que se vaya pidiendo
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(e.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Fallback si no hay red y es un HTML
                    if (e.request.destination === "document") {
                        return caches.match("/offline.html");
                    }
                });
        })
    );
});
