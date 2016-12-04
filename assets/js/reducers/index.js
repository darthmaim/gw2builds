'use strict';

import fp from 'lodash/fp';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions';

function handleSimpleAction(type, defaultValue) {
    return handleAction(type, (state, action) => action.payload, defaultValue);
}

export const language = handleSimpleAction(actions.SET_LANGUAGE, 'en');
export const gameMode = handleSimpleAction(actions.SET_GAMEMODE, null);
export const profession = handleSimpleAction(actions.SET_PROFESSION, null);
export const race = handleSimpleAction(actions.SET_RACE, 'none');
export const activeSpecializations = handleAction(
    actions.SET_SPECIALIZATION,
    (state, action) => {
        state[action.payload.lineId] = action.payload.specId;
        return state;
    },
    []
);
export const activeMinorTraits = handleAction(
    actions.SET_MINOR_TRAIT,
    (state, action) => {
        const pos = action.payload.lineId * 3 + action.payload.traitTier - 1;
        state[pos] = action.payload.traitId;
        return state;
    },
    []
);
export const activeMajorTraits = handleAction(
    actions.SET_MAJOR_TRAIT,
    (state, action) => {
        const pos = action.payload.lineId * 3 + action.payload.traitTier - 1;
        state[pos] = action.payload.traitId;
        return state;
    },
    []
);

// Grabs the specializations ids from the current profession
export const specializationIds = handleAction(
    actions.FETCH_PROFESSION,
    (state, action) => action.payload.specializations,
    []
);
// Grabs the specialization objects from the current profession
export const specializations = handleSimpleAction(actions.FETCH_SPECIALIZATIONS, []);

// Grabs the trait ids from the current profession
export const traitIds = handleAction(
    actions.FETCH_SPECIALIZATIONS,
    (state, action) => fp.flatMapDeep(s => [s.minor_traits, s.major_traits])(action.payload),
    []
);
// Grabs the trait objects from the current profession
export const traits = handleSimpleAction(actions.FETCH_TRAITS, []);

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
