'use strict';

import { createAction } from 'redux-actions';
import { ucFirst } from 'change-case';

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_GAMEMODE = 'SET_GAMEMODE';
export const SET_PROFESSION = 'SET_PROFESSION';
export const SET_RACE = 'SET_RACE';

export const FETCH_PROFESSION = 'FETCH_PROFESSION';
export const FETCH_SPECIALIZATIONS = 'FETCH_SPECIALIZATIONS';

function createChainedAction(action, dispatchChain) {
    // Make sure it's an array
    if (!Array.isArray(dispatchChain)) {
        dispatchChain = [dispatchChain];
    }

    // Return a function that creates a function that's consumed by the redux-thunk middleware
    // The arguments are carried over to the inner action calls
    return (...args) => {
        return dispatch => {
            const toExecute = action.then ? action(...args) : Promise.resolve(action(...args));
            let disp = dispatch(toExecute);
            // Expand our dispatch chain into separate sequential dispatches
            for (let toDispatch of dispatchChain) {
                disp = disp.then(result => dispatch(toDispatch(result.payload)));
            }
            return disp;
        };
    };
}

function createApiAction(actionType, apiCall) {
    return (...args) => {
        return (dispatch, getState, Gw2Api) => {
            return dispatch(createAction(actionType, (...args) => {
                return apiCall(getState(), Gw2Api.language(getState().language), ...args);
            })(...args));
        };
    };
}

export const fetchSpecializations = createApiAction(
    FETCH_SPECIALIZATIONS,
    (state, api) => api.specializations().many(state.specializationIds)
);
export const fetchProfession = createChainedAction(
    createApiAction(
        FETCH_PROFESSION,
        (state, api) => api.professions().get(ucFirst(state.profession))
    ),
    fetchSpecializations
);

export const setLanguage = createChainedAction(createAction(SET_LANGUAGE), fetchProfession);
export const setGameMode = createAction(SET_GAMEMODE);
export const setProfession = createChainedAction(createAction(SET_PROFESSION), fetchProfession);
export const setRace = createAction(SET_RACE);
