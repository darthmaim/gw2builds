import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import apiClient from 'gw2api-client';
import cacheMemory from 'gw2api-client/build/cache/memory';
import extendApiClient from 'gw2api-extension';
import extendApiData from 'gw2be-api-extension-data';
import editor from './reducers';
import { TooltipContext } from './components/Tooltips';
import Layout from './components/App';
import { Select } from './components/Inputs';
import { getUrl } from './selectors/url';
import { initializeBuildFromString } from './utils/build-string';
import { init as initAnalytics } from './utils/analytics';
import { syncMiddleware } from 'redux-sync-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

initAnalytics();

const Gw2Api = extendApiClient(apiClient(), extendApiData).cacheStorage(cacheMemory());
const initialState = {
    selectedLanguage: 'en'
};

const store = createStore(editor, initialState, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(Gw2Api), promiseMiddleware, syncMiddleware)
));

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        // Get an existing build string for initialization
        const path = window.location.pathname.substr(1);

        if (path) {
            initializeBuildFromString(store, path)
                .then(build => {
                    console.log('Loaded build from url:', build);
                    this.setState({ loading: false });
                })
                .catch(e => {
                    console.log('Couldn\'t load build from url:', e);
                    window.history.replaceState(undefined, '', '/');
                    this.setState({ loading: false });
                });
        } else {
            this.setState({ loading: false });
        }
    }

    componentDidUpdate() {
        const {url, locale, selectedProfession} = this.props;
        window.document.documentElement.lang = locale;

        // prevent updating the url/title while a build is loaded
        if (this.state.loading) {
            return;
        }

        window.history.replaceState(undefined, '', url);
        window.document.title = (selectedProfession ? `${selectedProfession} | ` : '') + 'Build Editor - gw2efficiency';
    }

    render() {
        return (
            <IntlProvider locale={this.props.locale}>
                <TooltipContext>
                    <Select.Context>
                        <Layout loading={this.state.loading}/>
                    </Select.Context>
                </TooltipContext>
            </IntlProvider>
        );
    }
}

Editor = connect(state => {
    return { locale: state.selectedLanguage, selectedProfession: state.selectedProfession, url: getUrl(state) };
})(Editor);

function renderApp() {
    render(
        <Provider store={store}>
            <Editor/>
        </Provider>,
        document.getElementById('container')
    );
}

const styles = document.getElementById('style');

if(styles.sheet && styles.sheet.cssRules) {
    renderApp();
} else {
    styles.onload = renderApp;
}
