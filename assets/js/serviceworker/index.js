import {
    install as installGW2,
    activate as activateGW2,
    canHandleFetch as gw2CanHandleFetch,
    handleFetch as gw2HandleFetch
} from './gw2';

import {
    install as installAssets,
    activate as activateAssets,
    canHandleFetch as assetsCanHandleFetch,
    handleFetch as assetsHandleFetch
} from './assets';

import {
    install as installApp,
    activate as activateApp,
    canHandleFetch as appCanHandleFetch,
    handleFetch as appHandleFetch
} from './app';

self.addEventListener('install', function (event) {
    event.waitUntil(
        Promise.all([
            // add the app shell to cache
            installApp(),

            // add all assets to cache
            installAssets(),

            // load build version
            installGW2()

        // activate this service worker instantly
        ]).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            // app initialization
            activateApp(),

            // add all assets to cache
            activateAssets(),

            // load build version
            activateGW2()

        // after activation is done, claim all clients
        ]).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', function (event) {
    const request = event.request;
    const url = new URL(request.url);
    const data = { request, url };

    if(gw2CanHandleFetch(data)) {
        event.respondWith(gw2HandleFetch(data));
    } else if(assetsCanHandleFetch(data)) {
        event.respondWith(assetsHandleFetch(data));
    } else if(appCanHandleFetch(data)) {
        event.respondWith(appHandleFetch(data));
    }
});
