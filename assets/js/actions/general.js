'use strict';

import { createAction } from 'redux-actions';
import { ucFirst } from 'change-case';
import { createChainedAction, createApiAction } from './utils';
import { fetchSpecializations, wipeAllActiveSpecializations } from './specializations';
import { wipeAllWeapons, fetchSkills } from './skills';

export const FETCH_PROFESSION = 'FETCH_PROFESSION';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_GAMEMODE = 'SET_GAMEMODE';
export const SET_PROFESSION = 'SET_PROFESSION';
export const SET_RACE = 'SET_RACE';

/** Action to fetch the current profession from the GW2 API. */
export const fetchProfession = createChainedAction(
    createApiAction(
        FETCH_PROFESSION,
        (state, api) => api.professions().get(ucFirst(state.profession))
    ),
    [fetchSpecializations, fetchSkills]
);

/** Action to set the language. Params: { language } */
export const setLanguage = createChainedAction(
    createAction(SET_LANGUAGE),
    fetchProfession
);

/** Action to set the game mode. Params: { gameMode } */
export const setGameMode = createAction(SET_GAMEMODE);

/** Action to set the profession. Params: { profession } */
export const setProfession = createChainedAction(
    createAction(SET_PROFESSION),
    [wipeAllActiveSpecializations, wipeAllWeapons, fetchProfession]
);

/** Action to set the race. Params: { race } */
export const setRace = createAction(SET_RACE);

export default {
    FETCH_PROFESSION,
    SET_LANGUAGE,
    SET_GAMEMODE,
    SET_PROFESSION,
    SET_RACE,

    fetchProfession,
    setLanguage,
    setGameMode,
    setProfession,
    setRace
};
