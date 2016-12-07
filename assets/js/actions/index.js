'use strict';

import { createAction } from 'redux-actions';
import { ucFirst } from 'change-case';
import fp from 'lodash/fp';

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_GAMEMODE = 'SET_GAMEMODE';
export const SET_PROFESSION = 'SET_PROFESSION';
export const SET_RACE = 'SET_RACE';
export const SET_SPECIALIZATION = 'SET_SPECIALIZATION';
export const SET_MAJOR_TRAIT = 'SET_MAJOR_TRAIT';

export const WIPE_ACTIVE_SPECIALIZATIONS = 'WIPE_ACTIVE_SPECIALIZATIONS';
export const WIPE_ACTIVE_TRAITS = 'WIPE_ACTIVE_TRAITS';
export const WIPE_ALL_ACTIVE_TRAITS = 'WIPE_ALL_ACTIVE_TRAITS';

export const FETCH_PROFESSION = 'FETCH_PROFESSION';
export const FETCH_SPECIALIZATIONS = 'FETCH_SPECIALIZATIONS';
export const FETCH_TRAITS = 'FETCH_TRAITS';

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

function createStateAwareAction(actionType, payloadCreator, metaCreator) {
    if (!payloadCreator) {
        payloadCreator = arg => arg;
    }
    return (...args) => {
        return (dispatch, getState) => {
            const newPayloadCreator = (...args) => {
                // Inject the getState function into the payload
                const payload = payloadCreator(...args);
                payload.getState = getState;
                return payload;
            };
            return dispatch(createAction(actionType, newPayloadCreator, metaCreator)(...args));
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

function convertToIndexed(item) {
    return fp.keyBy(i => i.id)(item);
}

export const fetchTraits = createApiAction(
    FETCH_TRAITS,
    (state, api) => api.traits().many(state.traitIds).then(convertToIndexed)
);
export const fetchSpecializations = createChainedAction(
    createApiAction(
        FETCH_SPECIALIZATIONS,
        (state, api) => api.specializations().many(state.specializationIds).then(convertToIndexed)
    ),
    fetchTraits
);
export const fetchProfession = createChainedAction(
    createApiAction(
        FETCH_PROFESSION,
        (state, api) => api.professions().get(ucFirst(state.profession))
    ),
    fetchSpecializations
);

export const wipeActiveTraits = createAction(WIPE_ACTIVE_TRAITS); // Params: { specializationId }
export const wipeAllActiveTraits = createAction(WIPE_ALL_ACTIVE_TRAITS); // Params: {}
export const wipeActiveSpecializations = createChainedAction(
    createAction(WIPE_ACTIVE_SPECIALIZATIONS), // Params: {}
    wipeAllActiveTraits
);

export const setLanguage = createChainedAction(
    createAction(SET_LANGUAGE), // Params: { language }
    fetchProfession
);
export const setGameMode = createAction(SET_GAMEMODE); // Params: { gameMode }
export const setProfession = createChainedAction(
    createAction(SET_PROFESSION), // Params: { profession }
    [wipeActiveSpecializations, fetchProfession]
);
export const setRace = createAction(SET_RACE); // Params: { race }
export const setSpecialization = createChainedAction(
    createStateAwareAction(SET_SPECIALIZATION), // Params: { specializationLine, specializationId }
    wipeActiveTraits
);
export const setMajorTrait = createAction(SET_MAJOR_TRAIT); // Params: { specializationLine, traitTier, traitId }
