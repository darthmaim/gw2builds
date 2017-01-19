import * as actions from '~/actions';
import { handleSimpleAction } from './utils';

/** The language reducer. */
export const selectedLanguage = handleSimpleAction(actions.SET_SELECTED_LANGUAGE, 'en', 'language');

/** The game mode reducer. */
export const selectedGameMode = handleSimpleAction(actions.SET_SELECTED_GAMEMODE, null, 'gameMode');

/** The profession reducer. */
export const selectedProfession = handleSimpleAction(actions.SET_SELECTED_PROFESSION, null, 'profession');

/** The race reducer. */
export const selectedRace = handleSimpleAction(actions.SET_SELECTED_RACE, null, 'race');

export default {
    selectedLanguage,
    selectedGameMode,
    selectedProfession,
    selectedRace
};
