export function serveFromCacheFallbackToNetwork(request, cacheName) {
    return caches.open(cacheName)
        .then(cache => cache.match(request))
        .then(cached => cached || fetch(request).then(response => saveRequestToCache(request, response, cacheName))
    );
}

export function serveFromNetworkFallbackToCache(request, cacheName) {
    return fetch(request)
        .then(response => saveRequestToCache(request, response, cacheName))
        .catch(
            () => caches.open(cacheName).then(cache => cache.match(request))
        );
}

export function saveRequestToCache(request, response, cacheName) {
    if(!response.ok) {
        return response;
    }

    return caches.open(cacheName).then(cache => {
        cache.put(request, response.clone());
        return response;
    });
}
