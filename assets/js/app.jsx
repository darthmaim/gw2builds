"use strict";

import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";
import { IntlProvider } from "react-intl";
import editor from "./reducers";
import Settings from "./containers/settings";
import CharacterPanel from "./components/panels/character";
import StatsOverview from "./containers/stats-overview";
import apiClient from "gw2api-client";
import cacheMemory from "gw2api-client/build/cache/memory";

const Gw2Api = apiClient().cacheStorage(cacheMemory());
const initialState = {
    language: "en",
    race: "none"
};

let store = createStore(editor, initialState, applyMiddleware(thunk.withExtraArgument(Gw2Api), promiseMiddleware));

class Editor extends React.Component {
    render() {
        return (
            <IntlProvider locale={this.props.locale}>
                <div className="editor">
                    <Settings/>
                    <CharacterPanel/>
                    <StatsOverview/>
                </div>
            </IntlProvider>
        );
    }
}

Editor = connect(state => { return { locale: state.language }; })(Editor);

render(
    <Provider store={store}>
        <Editor/>
    </Provider>,
    document.getElementById("container")
);
