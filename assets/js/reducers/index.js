'use strict';

import fp from 'lodash/fp';
import { handleAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';

function handleSimpleAction(type, defaultValue, prop) {
    return handleAction(type, (state, action) => prop ? action.payload[prop] : action.payload, defaultValue);
}

export const language = handleSimpleAction(actions.SET_LANGUAGE, 'en', 'language');
export const gameMode = handleSimpleAction(actions.SET_GAMEMODE, null, 'gameMode');
export const profession = handleSimpleAction(actions.SET_PROFESSION, null, 'profession');
export const race = handleSimpleAction(actions.SET_RACE, 'none', 'race');

// Holds the active/selected specializations as ids
export const activeSpecializations = handleActions({
    [actions.SET_SPECIALIZATION]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.specializationLine] = action.payload.specializationId;
        return newState;
    },
    [actions.WIPE_ACTIVE_SPECIALIZATIONS]: () => []
}, []);

// Holds the active/selected minor traits as ids
export const activeMinorTraits = handleActions({
    [actions.SET_SPECIALIZATION]: (state, action) => {
        const newState = state.slice();
        const specializations = action.payload.getState().specializations;
        const pos = action.payload.specializationLine * 3;
        for (let i = 0; i < 3; i++) {
            newState[pos + i] = specializations[action.payload.specializationId].minor_traits[i];
        }
        return newState;
    },
    [actions.WIPE_ACTIVE_SPECIALIZATIONS]: () => []
}, []);

// Holds the active/selected major traits as ids
export const activeMajorTraits = handleActions({
    [actions.SET_MAJOR_TRAIT]: (state, action) => {
        const newState = state.slice();
        newState[(action.payload.specializationLine * 3) + action.payload.traitTier - 1] = action.payload.traitId;
        return newState;
    },
    [actions.WIPE_ACTIVE_TRAITS]: (state, action) => {
        const newState = state.slice();
        const specializationLines = action.payload.specializationLine !== undefined && action.payload.specializationLine !== null ? [action.payload.specializationLine] : [0, 1, 2];
        for (let line of specializationLines) {
            for (let i = 0; i < 3; i++) {
                delete newState[(line * 3) + i];
            }
        }
        return newState;
    },
    [actions.WIPE_ALL_ACTIVE_TRAITS]: () => []
}, []);

// Grabs the specializations ids from the current profession
export const specializationIds = handleSimpleAction(actions.FETCH_PROFESSION, [], 'specializations');
// Grabs the specialization objects from the current profession
export const specializations = handleSimpleAction(actions.FETCH_SPECIALIZATIONS, {});

// Grabs the trait ids from the current profession
export const traitIds = handleAction(
    actions.FETCH_SPECIALIZATIONS,
    (state, action) => fp.flatMapDeep(s => [s.minor_traits, s.major_traits])(action.payload),
    []
);
// Grabs the trait objects from the current profession
export const traits = handleSimpleAction(actions.FETCH_TRAITS, {});

const editor = combineReducers({
    // General
    language,
    gameMode,
    profession,
    race,

    // Specializations: specializations
    specializationIds,
    specializations,
    activeSpecializations,

    // Specializations: traits
    traitIds,
    traits,
    activeMinorTraits,
    activeMajorTraits
});

export default editor;
