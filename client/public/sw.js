const CACHE_NAME = "mi-pwa-cache-v1";
const urlsToCache = [
    "/",               // Página principal
    "/index.html",     // HTML
    "/offline.html",   // Página offline que crearemos
    "/favicon.ico",
    "/logo192.png",
    "/logo512.png",
    "/manifest.json"
];

// Instalar SW y cachear recursos
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

// Interceptar peticiones
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            // Intentar fetch normal si hay internet
            return fetch(e.request).catch(() => {
                // Fallback offline solo para páginas HTML
                if (e.request.destination === "document") {
                    return caches.match("/offline.html");
                }
                // Para JS, CSS, imágenes dinámicas de React no cacheadas → no hacer nada
                return undefined;
            });
        })
    );
});
