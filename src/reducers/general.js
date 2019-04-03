import * as actions from '../actions';
import { handleSimpleAction } from './utils';
import { syncedReducer } from 'redux-sync-reducer';

/** The language reducer. */
export const selectedLanguage = syncedReducer(handleSimpleAction(actions.SET_SELECTED_LANGUAGE, 'en', 'language'), { name: 'language' });

/** The language reducer. */
export const selectedTheme = syncedReducer(handleSimpleAction(actions.SET_SELECTED_THEME, 'light', 'theme'), { name: 'theme' });

/** The game mode reducer. */
export const availableGameModes = handleSimpleAction(actions.LOAD_BASE_DATA, {}, 'availableGameModes');

/** The game mode reducer. */
export const selectedGameMode = handleSimpleAction(actions.SET_SELECTED_GAMEMODE, null, 'gameMode');

/** The game mode reducer. */
export const availableProfessions = handleSimpleAction(actions.LOAD_BASE_DATA, {}, 'availableProfessions');

/** The profession reducer. */
export const selectedProfession = handleSimpleAction(actions.SET_SELECTED_PROFESSION, null, 'profession');

/** The game mode reducer. */
export const availableRaces = handleSimpleAction(actions.LOAD_BASE_DATA, {}, 'availableRaces');

/** The race reducer. */
export const selectedRace = handleSimpleAction(actions.SET_SELECTED_RACE, null, 'race');

/** The race reducer. */
export const isLoading = handleSimpleAction(actions.SET_IS_LOADING, null, 'loading');

export default {
    selectedLanguage,
    availableGameModes,
    selectedGameMode,
    availableProfessions,
    selectedProfession,
    availableRaces,
    selectedRace,
    isLoading
};
