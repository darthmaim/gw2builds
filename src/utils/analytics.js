// based on https://github.com/philipwalton/analyticsjs-boilerplate
/* global ga */

/**
 * The tracking ID for your Google Analytics property.
 * https://support.google.com/analytics/answer/1032385
 * @type {string}
 */
const TRACKING_ID = process.env.REACT_APP_ANALYTICS;

/**
 * Bump this when making backwards incompatible changes to the tracking
 * implementation. This allows you to create a segment or view filter
 * that isolates only data captured with the most recent tracking changes.
 * @type {string}
 */
const TRACKING_VERSION = '4';

/**
 * A default value for dimensions so unset values always are reported as
 * something. This is needed since Google Analytics will drop empty dimension
 * values in reports.
 * @type {string}
 */
const NULL_VALUE = '(not set)';

/**
 * A mapping between custom dimension names and their indexes.
 */
const dimensions = {
    TRACKING_VERSION: 'dimension1',
    CLIENT_ID: 'dimension2',
    WINDOW_ID: 'dimension3',
    HIT_ID: 'dimension4',
    HIT_TIME: 'dimension5',
    HIT_TYPE: 'dimension6',
    HIT_SOURCE: 'dimension7',
    VISIBILITY_STATE: 'dimension8',
    SERVICE_WORKER_STATUS: 'dimension9'
};

/**
 * A mapping between custom metric names and their indexes.
 */
const metrics = {
    RESPONSE_END_TIME: 'metric1',
    DOM_LOAD_TIME: 'metric2',
    WINDOW_LOAD_TIME: 'metric3',
    PAGE_VISIBLE: 'metric4',
    MAX_SCROLL_PERCENTAGE: 'metric5',
};

/**
 * Initializes all the analytics setup. Creates trackers and sets initial
 * values on the trackers.
 */
export const init = () => {
    // Initialize the command queue in case analytics.js hasn't loaded yet.
    window.ga = window.ga || ((...args) => (ga.q = ga.q || []).push(args));

    if(!TRACKING_ID) {
        console.log('Disabled google analytics because the tracking id is not set ' +
            '(REACT_APP_ANALYTICS environment variable)');
        return;
    }

    loadAnalytics();
    createTracker();
    trackErrors();
    trackCustomDimensions();
    sendInitialPageview();
    sendNavigationTimingMetrics();
    trackInstallBanner();
};


/**
 * Tracks a JavaScript error with optional fields object overrides.
 * This function is exported so it can be used in other parts of the codebase.
 * E.g.:
 *
 *    `fetch('/api.json').catch(trackError);`
 *
 * @param {Error|undefined} err
 * @param {Object=} fieldsObj
 */
export const trackError = (err, fieldsObj = {}) => {
    ga('send', 'event', Object.assign({
        eventCategory: 'Error',
        eventAction: err.name,
        eventLabel: `${err.message}\n${err.stack || '(no stack trace)'}`,
        nonInteraction: true,
    }, fieldsObj));
};

/**
 * Loads the google analytics script
 */
const loadAnalytics = () => {
    const script = document.createElement('script');
    script.src = 'https://www.google-analytics.com/analytics.js';
    document.getElementsByTagName("head")[0].appendChild(script);
};

/**
 * Creates the trackers and sets the default transport and tracking
 * version fields. In non-production environments it also logs hits.
 */
const createTracker = () => {
    ga('create', TRACKING_ID, 'auto');

    // Ensures all hits are sent via `navigator.sendBeacon()`.
    ga('set', 'transport', 'beacon');
};


/**
 * Tracks any errors that may have occured on the page prior to analytics being
 * initialized, then adds an event handler to track future errors.
 */
const trackErrors = () => {
    // Errors that have occurred prior to this script running are stored on
    // `window.__e.q`, as specified in `index.html`.
    const loadErrorEvents = (window.__e && window.__e.q) || [];

    // Use a different eventCategory for uncaught errors.
    const fieldsObj = {eventCategory: 'Uncaught Error'};

    // Replay any stored load error events.
    for (let event of loadErrorEvents) {
        trackError(event.error, fieldsObj);
    }

    // Add a new listener to track event immediately.
    window.addEventListener('error', (event) => {
        trackError(event.error, fieldsObj);
    });
};


/**
 * Sets a default dimension value for all custom dimensions on all trackers.
 */
const trackCustomDimensions = () => {
    // Sets a default dimension value for all custom dimensions to ensure
    // that every dimension in every hit has *some* value. This is necessary
    // because Google Analytics will drop rows with empty dimension values
    // in your reports.
    Object.keys(dimensions).forEach((key) => {
        ga('set', dimensions[key], NULL_VALUE);
    });

    // Adds tracking of dimensions known at page load time.
    ga((tracker) => {
        tracker.set({
            [dimensions.TRACKING_VERSION]: TRACKING_VERSION,
            [dimensions.CLIENT_ID]: tracker.get('clientId'),
            [dimensions.WINDOW_ID]: uuid(),
            [dimensions.SERVICE_WORKER_STATUS]: getServiceWorkerStatus()
        });
    });

    // Adds tracking to record each the type, time, uuid, and visibility state
    // of each hit immediately before it's sent.
    ga((tracker) => {
        const originalBuildHitTask = tracker.get('buildHitTask');
        tracker.set('buildHitTask', (model) => {
            const qt = model.get('queueTime') || 0;
            model.set(dimensions.HIT_TIME, String(new Date() - qt), true);
            model.set(dimensions.HIT_ID, uuid(), true);
            model.set(dimensions.HIT_TYPE, model.get('hitType'), true);
            model.set(dimensions.VISIBILITY_STATE, document.visibilityState, true);

            originalBuildHitTask(model);
        });
    });
};


/**
 * Sends the initial pageview to Google Analytics.
 */
const sendInitialPageview = () => {
    ga('send', 'pageview', {[dimensions.HIT_SOURCE]: 'pageload'});
};


/**
 * Gets the DOM and window load times and sends them as custom metrics to
 * Google Analytics via an event hit.
 */
const sendNavigationTimingMetrics = () => {
    // Only track performance in supporting browsers.
    if (!(window.performance && window.performance.timing)) return;

    // If the window hasn't loaded, run this function after the `load` event.
    if (document.readyState !== 'complete') {
        window.addEventListener('load', sendNavigationTimingMetrics);
        return;
    }

    const nt = performance.timing;
    const navStart = nt.navigationStart;

    const responseEnd = Math.round(nt.responseEnd - navStart);
    const domLoaded = Math.round(nt.domContentLoadedEventStart - navStart);
    const windowLoaded = Math.round(nt.loadEventStart - navStart);

    // In some edge cases browsers return very obviously incorrect NT values,
    // e.g. 0, negative, or future times. This validates values before sending.
    const allValuesAreValid = (...values) => {
        return values.every((value) => value > 0 && value < 6e6);
    };

    if (allValuesAreValid(responseEnd, domLoaded, windowLoaded)) {
        ga('send', 'event', {
            eventCategory: 'Navigation Timing',
            eventAction: 'track',
            nonInteraction: true,
            [metrics.RESPONSE_END_TIME]: responseEnd,
            [metrics.DOM_LOAD_TIME]: domLoaded,
            [metrics.WINDOW_LOAD_TIME]: windowLoaded,
        });
    }
};


/**
 * Generates a UUID.
 * https://gist.github.com/jed/982883
 * @param {string|undefined=} a
 * @return {string}
 */
const uuid = function b(a) {
    return a ? (a ^ ((Math.random() * 16) >> a / 4)).toString(16) :
        ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

/**
 * Gets the status of the service worker.
 *
 * @return {string}
 */
function getServiceWorkerStatus() {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker.controller ? 'controlled' : 'supported';
    } else {
        return 'unsupported';
    }
}

/**
 * Tracks install banner status.
 */
const trackInstallBanner = () => {
    window.addEventListener('beforeinstallprompt', () => ga('send', 'event', 'install', 'available'));

    window.addEventListener('appinstalled', () => ga('send', 'event', 'install', 'installed'));
};
