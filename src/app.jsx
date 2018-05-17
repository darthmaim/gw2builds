import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { api } from './utils/api';
import editor from './reducers';
import { TooltipContext } from './components/Tooltips';
import Layout from './components/App';
import { Select } from './components/Inputs';
import { getUrl } from './selectors/url';
import { initializeBuildFromString } from './utils/build-string';
import { init as initAnalytics } from './utils/analytics';
import { syncMiddleware } from 'redux-sync-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadBaseData, setAvailableGameModes, setAvailableProfessions, setAvailableRaces } from './actions';
import { convertToIndexed } from './actions/utils';

initAnalytics();

const initialState = {
    selectedLanguage: 'en'
};

const store = createStore(editor, initialState, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api), promiseMiddleware, syncMiddleware)
));

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        // Get an existing build string for initialization
        const path = window.location.pathname.substr(1);

        const init = store.dispatch(loadBaseData());

        if (path) {
            init.then(() => initializeBuildFromString(store.dispatch, path))
                .then(build => {
                    console.log('Loaded build from url:', build);
                })
                .catch(e => {
                    console.log('Couldn\'t load build from url:', e);
                    window.history.replaceState(undefined, '', '/');
                });
        }
    }

    componentDidUpdate() {
        const {url, locale, selectedProfession} = this.props;
        window.document.documentElement.lang = locale;

        // prevent updating the url/title while a build is loaded
        if (this.props.loading) {
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
                        <Layout loading={this.props.loading}/>
                    </Select.Context>
                </TooltipContext>
            </IntlProvider>
        );
    }
}

Editor = connect(state => {
    return {
        locale: state.selectedLanguage,
        selectedProfession: state.selectedProfession,
        url: getUrl(state),
        loading: state.isLoading
    };
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
