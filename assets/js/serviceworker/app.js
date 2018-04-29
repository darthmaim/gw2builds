const filesToCache = ['/', '/manifest.json'];

export function install() {
    // cache the base html
    return caches.open('app').then(cache => cache.addAll(filesToCache));
}

export function activate() {
    // Nothing to do here, just exporting this for consistency with the other handlers
}

function isStartpage(url) {
    return url.pathname === '/' || url.pathname.match(/^\/[A-Za-z0-9_-]+$/);
}

function isCached(url) {
    return filesToCache.indexOf(url.pathname) !== -1;
}

export function canHandleFetch({ url, request }) {
    return request.method === 'GET' && (isStartpage(url) || isCached(url));
}

export function handleFetch({ url, request }) {
    // try to fetch first
    return fetch(request)
        // then fallback to the stored html request
        .catch(() => caches.open('app')
            .then(cache => isStartpage(url) ? cache.match('/') : cache.match(request))
        );
}
