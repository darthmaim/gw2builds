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
import { loadBaseData, setIsLoading } from './actions';
import 'typeface-open-sans';

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

        this.state = {
            error: undefined
        };
    }

    componentWillMount() {
        // Get an existing build string for initialization
        const path = window.location.pathname.substr(1);

        store.dispatch(setIsLoading({ loading: true }));
        const init = store.dispatch(loadBaseData());

        // handle errors while loading initial data
        init.catch((error) => {
            store.dispatch(setIsLoading({ loading: false }));
            console.error(error);
            this.setState({
                error: {
                    title: 'API Error',
                    text: (
                        <div>
                            Couldn't load required data from the official{' '}
                            <span style={{whiteSpace: 'nowrap'}}>Guild Wars 2 API</span>.
                        </div>
                    )
                }
            });
        });

        // load buildstring if path is set
        if (path) {
            init.then(() => initializeBuildFromString(store.dispatch, path))
                .then(build => {
                    console.log('Loaded build from url:', build);
                })
                .catch(e => {
                    console.log('Couldn\'t load build from url:', e);
                    window.history.replaceState(undefined, '', '/');
                });
        } else {
            init.then(() => store.dispatch(setIsLoading({ loading: false })));
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
                        <Layout loading={this.props.loading} error={this.state.error}/>
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
        document.getElementById('root')
    );
}

renderApp();
// TODO cra: wait until styles are loaded
// const styles = document.getElementById('style');
//
// if(styles.sheet && styles.sheet.cssRules) {
//     renderApp();
// } else {
//     styles.onload = renderApp;
// }
