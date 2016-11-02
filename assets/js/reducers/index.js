'use strict';

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

export const specializations = handleSimpleAction(actions.FETCH_SPECIALIZATIONS, []);

const editor = combineReducers({
    language,
    gameMode,
    profession,
    race,
    specializations
});

export default editor;
