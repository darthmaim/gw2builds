export function install() {
    // cache the base html
    return caches.open('app').then(cache => cache.add('/'));
}

export function activate() {
    // Nothing to do here, just exporting this for consistency with the other handlers
}

export function canHandleFetch({ url, request }) {
    return request.method === 'GET' && (url.pathname === '/' || url.pathname.match(/^\/[A-Za-z0-9_-]+$/));
}

export function handleFetch({ request }) {
    // try to fetch first
    return fetch(request)
        // then fallback to the stored html request
        .catch(() => caches.open('app')
            .then(cache => cache.match('/'))
        );
}
