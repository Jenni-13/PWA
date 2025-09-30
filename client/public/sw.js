const CACHE_NAME = "mi-pwa-cache-v1";

// Aquí agregamos los archivos esenciales de tu build
const urlsToCache = [
    "/",               
    "/index.html",   
    "/offline.html",   
    "/favicon.ico",
    "/logo192.png",
    "/logo512.png",
    "/manifest.json",
    "/static/js/main.8a8f095e.js",
    "/static/js/runtime-main.3b9a1f7d.js",
    "/static/js/2.d3d8e9f1.chunk.js"   

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

            return fetch(e.request).catch(() => {
                // Fallback offline solo para páginas HTML
                if (e.request.destination === "document") {
                    return caches.match("/offline.html");
                }
                // Para JS, CSS, imágenes dinámicas → no hacemos nada
                return undefined;
            });
        })
    );
});
