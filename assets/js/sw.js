"use strict";

let currentBuild = "?";

// some endpoints never change between different builds and
// can be served from cache first to save some more time.
function canBeServedFromCacheFirst(url) {
    return [
        '/v2/professions',
        '/v2/skills',
        '/v2/specializations',
        '/v2/traits',
    ].some(path => url.pathname.indexOf(path) === 0);
}

function serveFromCacheFallbackToNetwork(request, cacheName) {
    return caches.match(request)
        .then(cached => cached || fetch(request).then(response => saveRequestToCache(request, response, cacheName))
    );
}

function serveFromNetworkFallbackToCache(request, cacheName) {
    return fetch(request)
        .then(response => saveRequestToCache(request, response, cacheName))
        .catch(() => caches.match(request));
}

function saveRequestToCache(request, response, cacheName) {
    return caches.open(cacheName).then(cache => {
        cache.put(request, response.clone());
        return response;
    });
}

self.addEventListener('fetch', function(event) {
    const request = event.request;
    const url = new URL(request.url);
    const isGetRequest = request.method === 'GET';

    const isRequestToApi = url.hostname === 'api.guildwars2.com';
    const isRequestToRender = url.hostname === 'render.guildwars2.com';

    const cacheName = isRequestToApi ? 'api:' + currentBuild : 'render';

    // all requests to the render service and some api requests can be served from cache first
    const serveFirstFromCache = isRequestToRender || (isRequestToApi && canBeServedFromCacheFirst(url));

    if (isGetRequest && serveFirstFromCache) {
        event.respondWith(serveFromCacheFallbackToNetwork(request, cacheName));
    } else if (isGetRequest && isRequestToApi) {
        event.respondWith(serveFromNetworkFallbackToCache(request, cacheName));
    }
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        fetchCurrentBuildVersion().then(build => {
            currentBuild = build;

            // delete old caches
            return caches.keys().then(keys => Promise.all(
                keys.filter(key => key !== 'api:' + build && key !== 'render')
                    .map(key => caches.delete(key))
            ));
        })
    );
});

function fetchCurrentBuildVersion() {
    return fetch('https://api.guildwars2.com/v2/build')
        .then(response => response.json())
        .then(build => build.id);
}
