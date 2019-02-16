import * as serviceWorker from './serviceWorker';
import { renderApp } from './app';
import { init as initAnalytics } from './utils/analytics';

initAnalytics();

renderApp();
// TODO cra: wait until styles are loaded
// const styles = document.getElementById('style');
//
// if(styles.sheet && styles.sheet.cssRules) {
//     renderApp();
// } else {
//     styles.onload = renderApp;
// }

serviceWorker.register();
