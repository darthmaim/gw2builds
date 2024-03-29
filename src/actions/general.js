import { createAction } from 'redux-actions';
import {
    createChainedAction,
    createConditionalAction,
    createApiAction,
    convertToIndexed
} from './utils';
import { fetchAvailableSpecializations } from './specializations';
import { fetchAvailableSkillsWithRelated } from './skills';
import { i18nMark } from '@lingui/react';

export const LOAD_BASE_DATA = 'LOAD_BASE_DATA';
export const FETCH_PROFESSION = 'FETCH_PROFESSION';
export const SET_SELECTED_LANGUAGE = 'SET_SELECTED_LANGUAGE';
export const SET_SELECTED_THEME = 'SET_SELECTED_THEME';
export const SET_SELECTED_GAMEMODE = 'SET_SELECTED_GAMEMODE';
export const SET_SELECTED_PROFESSION = 'SET_SELECTED_PROFESSION';
export const SET_SELECTED_RACE = 'SET_SELECTED_RACE';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export const loadBaseData = createApiAction(
    LOAD_BASE_DATA,
    (state, api) => Promise.all([
        Promise.resolve([{id: i18nMark('pve')}, {id: i18nMark('pvp')}, {id: i18nMark('wvw')}]).then(convertToIndexed),
        api.professions().all().then(convertToIndexed),
        api.races().all().then(convertToIndexed)
    ]).then(
        ([availableGameModes, availableProfessions, availableRaces]) => ({
            availableGameModes, availableProfessions, availableRaces
        })
    )
);

/** Action to fetch the selected profession from the GW2 API. */
export const fetchProfession = createConditionalAction(
    (state) => state.selectedProfession !== null,
    createChainedAction(
        createApiAction(
            FETCH_PROFESSION,
            (state, api) => state.availableProfessions[state.selectedProfession]
        ),
        [fetchAvailableSpecializations, fetchAvailableSkillsWithRelated]
    )
);

/** Action to set the selected language. Params: { language } */
export const setSelectedLanguage = createChainedAction(
    createAction(SET_SELECTED_LANGUAGE),
    [loadBaseData, fetchProfession]
);

/** Action to set the selected theme. Params: { theme } */
export const setSelectedTheme = createAction(SET_SELECTED_THEME);

/** Action to set the selected game mode. Params: { gameMode } */
export const setSelectedGameMode = createAction(SET_SELECTED_GAMEMODE);

/** Action to set the selected profession. Params: { profession } */
export const setSelectedProfession = createChainedAction(
    createAction(SET_SELECTED_PROFESSION),
    [fetchProfession]
);

/** Action to set the selected race. Params: { race } */
export const setSelectedRace = createAction(SET_SELECTED_RACE);

/**
 * Action to set the selected race. Params: { loading }
 * @type {function({loading: boolean}): Promise}
 */
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
