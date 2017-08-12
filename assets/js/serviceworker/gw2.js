import storage from './storage';
import { serveFromCacheFallbackToNetwork, serveFromNetworkFallbackToCache } from './cacheHelper';

function isApiRequest(url) {
    return url.hostname === 'api.guildwars2.com';
}

function isRenderRequest(url) {
    return url.hostname === 'render.guildwars2.com';
}

export function canHandleFetch({ request, url }) {
    return request.method === 'GET' && (isApiRequest(url) || isRenderRequest(url))
}

export function handleFetch({ request, url }) {
    if(isApiRequest(url)) {
        return getCurrentBuildVersion()
            .then(build => canBeServedFromCacheFirst({ url })
                ? serveFromCacheFallbackToNetwork(request, 'gw2api:' + build)
                : serveFromNetworkFallbackToCache(request, 'gw2api:' + build));
    }

    if(isRenderRequest(url)) {
        return serveFromCacheFallbackToNetwork(request, 'render');
    }
}

export function canBeServedFromCacheFirst({ url }) {
    // blacklist endpoints that can change between builds
    const isBlacklisted = [
        '/v2/account',
        '/v2/characters',
        '/v2/commerce',
        '/v2/wvw/matches'
    ].some(path => url.pathname.indexOf(path) === 0);

    // don't serve authenticated requests from cache
    const isAuthenticated = url.search.indexOf('access_token') !== -1;

    return !isBlacklisted && !isAuthenticated;
}

// load the current build version from the api
function fetchCurrentBuildVersion() {
    return fetch('https://api.guildwars2.com/v2/build')
        .then(response => response.json())
        .then(build => build.id);
}

let currentBuild;
function getCurrentBuildVersion() {
    return currentBuild
        ? Promise.resolve(currentBuild)
        : updateBuildVersion()
            .catch(() => storage.getItem('build'))
            .then(build => currentBuild = build)
}

// load the current build from the api and save it to storage
function updateBuildVersion() {
    return fetchCurrentBuildVersion()
        .then(build => storage.setItem('build', build).then(() => build));
}

export function install() {
    // load the current build version and store it in storage
    return updateBuildVersion();
}

export function activate() {
    return getCurrentBuildVersion()
        // clean up old caches
        .then(build => caches.keys().then(keys => Promise.all(
            keys.filter(key => key.indexOf('gw2api:') === 0 && key !== 'gw2api:' + build)
                .map(key => caches.delete(key))
        )));
}


/* debug help: run this to change the last stored build version

    indexedDB.open('@@gw2efficiency-build-editor/serviceworker').onsuccess = function(r) {
      r.target.result.transaction('sw_storage', 'readwrite').objectStore('sw_storage').put(123, 'build');
    }
*/
