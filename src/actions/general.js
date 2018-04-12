import { createAction } from 'redux-actions';
import { createChainedAction, createApiAction } from './utils';
import { fetchAvailableSpecializations } from './specializations';
import { fetchAvailableSkillsWithRelated } from './skills';

export const FETCH_PROFESSION = 'FETCH_PROFESSION';
export const SET_SELECTED_LANGUAGE = 'SET_SELECTED_LANGUAGE';
export const SET_SELECTED_GAMEMODE = 'SET_SELECTED_GAMEMODE';
export const SET_SELECTED_PROFESSION = 'SET_SELECTED_PROFESSION';
export const SET_SELECTED_RACE = 'SET_SELECTED_RACE';
export const SET_IS_LOADING = 'SET_IS_LOADING';

/** Action to fetch the selected profession from the GW2 API. */
export const fetchProfession = createChainedAction(
    createApiAction(
        FETCH_PROFESSION,
        (state, api) => api.professions().get(state.selectedProfession)
    ),
    [fetchAvailableSpecializations, fetchAvailableSkillsWithRelated]
);

/** Action to set the selected language. Params: { language } */
export const setSelectedLanguage = createChainedAction(
    createAction(SET_SELECTED_LANGUAGE),
    [fetchProfession]
);

/** Action to set the selected game mode. Params: { gameMode } */
export const setSelectedGameMode = createAction(SET_SELECTED_GAMEMODE);

/** Action to set the selected profession. Params: { profession } */
export const setSelectedProfession = createChainedAction(
    createAction(SET_SELECTED_PROFESSION),
    [fetchProfession]
);

/** Action to set the selected race. Params: { race } */
export const setSelectedRace = createAction(SET_SELECTED_RACE);

/** Action to set the selected race. Params: { race } */
export const setIsLoading = createAction(SET_IS_LOADING);

export default {
    FETCH_PROFESSION,
    SET_SELECTED_LANGUAGE,
    SET_SELECTED_GAMEMODE,
    SET_SELECTED_PROFESSION,
    SET_SELECTED_RACE,
    SET_IS_LOADING,

    fetchProfession,
    setSelectedLanguage,
    setSelectedGameMode,
    setSelectedProfession,
    setSelectedRace,
    setIsLoading
};
