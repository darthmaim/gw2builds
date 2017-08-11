import { createAction } from 'redux-actions';
import { createChainedAction, createApiAction } from './utils';
import { fetchAvailableSpecializations } from './specializations';
import { fetchAvailableSkills } from './skills';

export const FETCH_PROFESSION = 'FETCH_PROFESSION';
export const SET_SELECTED_LANGUAGE = 'SET_SELECTED_LANGUAGE';
export const SET_SELECTED_GAMEMODE = 'SET_SELECTED_GAMEMODE';
export const SET_SELECTED_PROFESSION = 'SET_SELECTED_PROFESSION';
export const SET_SELECTED_RACE = 'SET_SELECTED_RACE';

/** Action to fetch the current profession from the GW2 API. */
export const fetchProfession = createChainedAction(
    createApiAction(
        FETCH_PROFESSION,
        (state, api) => api.professions().get(state.selectedProfession)
    ),
    [fetchAvailableSpecializations, fetchAvailableSkills]
);

/** Action to set the language. Params: { language } */
export const setSelectedLanguage = createChainedAction(
    createAction(SET_SELECTED_LANGUAGE),
    fetchProfession
);

/** Action to set the game mode. Params: { gameMode } */
export const setSelectedGameMode = createAction(SET_SELECTED_GAMEMODE);

/** Action to set the profession. Params: { profession } */
export const setSelectedProfession = createChainedAction(
    createAction(SET_SELECTED_PROFESSION),
    [fetchProfession]
);

/** Action to set the race. Params: { race } */
export const setSelectedRace = createAction(SET_SELECTED_RACE);

export default {
    FETCH_PROFESSION,
    SET_SELECTED_LANGUAGE,
    SET_SELECTED_GAMEMODE,
    SET_SELECTED_PROFESSION,
    SET_SELECTED_RACE,

    fetchProfession,
    setSelectedLanguage,
    setSelectedGameMode,
    setSelectedProfession,
    setSelectedRace
};
