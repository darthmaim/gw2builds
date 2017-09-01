import { serveFromCacheFallbackToNetwork } from './cacheHelper';

let lastManifest;
export function install() {
    // cache all files in the revision manifest
    return fetch('/rev-manifest.json')
        .then(response => response.json())

        // store the manifest for later
        .then(manifest => (lastManifest = Object.values(manifest)
            // prefix all values with a slash
            .map(path => path.indexOf('/') === 0 ? path : '/' + path))
            // we don't precache fonts (fonts are added later on first fetch)
            // because we don't know yet what format this client supports (woff2, woff, eot, ...)
            .filter(path => path.indexOf('/fonts/') === -1)
            // only safari needs the pinned tab icon, cached on first fetch
            .filter(path => path.indexOf('/img/pinned-tab') === -1)
        )

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
    return request.method === 'GET' && ['/img/', '/css/', '/js/', '/fonts/'].some(path => url.pathname.indexOf(path) === 0);
}

export function handleFetch({ request }) {
    return serveFromCacheFallbackToNetwork(request, 'assets');
}
