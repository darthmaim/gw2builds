import React from 'react';
import { render } from 'react-dom';
import { I18nProvider } from '@lingui/react'
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
import { syncMiddleware } from 'redux-sync-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadBaseData, setIsLoading } from './actions';
import 'typeface-open-sans';

const store = createStore(editor, {}, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api), promiseMiddleware, syncMiddleware)
));

class Editor extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            error: undefined,
            catalogs: { }
        };
    }

    componentWillMount() {
        // load initial locale
        this.loadLocale(this.props.locale);

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

    loadLocale(locale) {
        window.document.documentElement.lang = locale;

        import(`@lingui/loader!./locales/${locale}/messages.po`).then(
            (messages) => {
                this.setState(
                    ({ catalogs }) => ({
                        catalogs: { ...catalogs, [locale]: messages }
                    })
                )
            }
        );
    }

    componentDidUpdate({ locale: prevLocale }) {
        const {url, locale, selectedProfession} = this.props;

        if(prevLocale !== locale && !this.state.catalogs[locale]) {
            this.loadLocale(locale);
        }

        // prevent updating the url/title while a build is loaded
        if (this.props.loading) {
            return;
        }

        window.history.replaceState(undefined, '', url);
        window.document.title = (selectedProfession ? `${selectedProfession} | ` : '') + 'Build Editor - gw2efficiency';
    }

    render() {
        return (
            <I18nProvider language={this.props.locale} catalogs={this.state.catalogs}>
                <TooltipContext>
                    <Select.Context>
                        <Layout loading={this.props.loading} error={this.state.error}/>
                    </Select.Context>
                </TooltipContext>
            </I18nProvider>
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

export function renderApp() {
    render(
        <Provider store={store}>
            <Editor/>
        </Provider>,
        document.getElementById('root')
    );
}
