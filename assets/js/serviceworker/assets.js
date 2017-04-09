import { serveFromCacheFallbackToNetwork } from './cacheHelper';

let lastManifest;
export function install() {
    // cache all files in the revision manifest
    return fetch('/rev-manifest.json')
        .then(response => response.json())

        // store the manifest for later (and prefix all paths with /)
        .then(manifest => lastManifest = Object.values(manifest).map(path => path.indexOf('/') === 0 ? path : '/' + path))

        // add all entries of the manifest to the cache
        .then(manifest => caches.open('assets')
            .then(cache => cache.addAll(manifest))
        );
}

// delete all outdated cache entries
export function activate() {
    return caches.open('assets')
        .then(cache => cache.keys()
            .then(keys => Promise.all(
                keys.map(key => deleteIfOutdated(key, cache))
            ))
        );
}

function deleteIfOutdated(key, cache) {
    const path = new URL(key.url).pathname;

    if(lastManifest && lastManifest.indexOf(path) === -1) {
        console.log('removing old cache entry', path);
        return cache.delete(key);
    }
}

export function canHandleFetch({ url, request }) {
    return request.method === 'GET' && ['/img/', '/css/', '/js/'].some(path => url.pathname.indexOf(path) === 0);
}

export function handleFetch({ request }) {
    return serveFromCacheFallbackToNetwork(request, 'assets');
}
