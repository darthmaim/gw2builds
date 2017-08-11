export function serveFromCacheFallbackToNetwork(request, cacheName) {
    return caches.match(request)
        .then(cached => cached || fetch(request).then(response => saveRequestToCache(request, response, cacheName))
    );
}

export function serveFromNetworkFallbackToCache(request, cacheName) {
    return fetch(request)
        .then(response => saveRequestToCache(request, response, cacheName))
        .catch(() => caches.match(request));
}

export function saveRequestToCache(request, response, cacheName) {
    return caches.open(cacheName).then(cache => {
        cache.put(request, response.clone());
        return response;
    });
}
