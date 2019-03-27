import { renderApp } from './app';

renderApp();

window.requestAnimationFrame(() => {
    import(/* webpackChunkName: "analytics", webpackPreload: true */ './utils/analytics').then(
        ({ init: initAnalytics }) => initAnalytics()
    );

    import(/* webpackChunkName: "serviceWorker", webpackPreload: true */'./serviceWorker').then(
        (serviceWorker) => serviceWorker.register()
    );
});
