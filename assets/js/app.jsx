'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import apiClient from 'gw2api-client';
import cacheMemory from 'gw2api-client/build/cache/memory';
import extendApiClient from 'gw2api-extension';
import extendApiData from 'gw2be-api-extension-data';
import editor from './reducers';
import { TooltipContext } from './components/Tooltips';
import { Layout } from './components/App';

const Gw2Api = extendApiClient(apiClient(), extendApiData).cacheStorage(cacheMemory());
const initialState = {
    language: 'en',
    race: 'none'
};

let store = createStore(editor, initialState, applyMiddleware(thunk.withExtraArgument(Gw2Api), promiseMiddleware));

class Editor extends React.Component {
    render() {
        return (
            <IntlProvider locale={this.props.locale}>
                <TooltipContext>
                    <Layout/>
                </TooltipContext>
            </IntlProvider>
        );
    }
}

Editor = connect(state => {
    return { locale: state.language };
})(Editor);

render(
    <Provider store={store}>
        <Editor/>
    </Provider>,
    document.getElementById('container')
);
