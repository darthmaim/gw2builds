import * as actions from '../actions';
import { handleSimpleAction } from './utils';
import { syncedReducer } from 'redux-sync-reducer';

/** The language reducer. */
export const language = syncedReducer(handleSimpleAction(actions.SET_LANGUAGE, 'en', 'language'), { name: 'language' });

/** The game mode reducer. */
export const gameMode = handleSimpleAction(actions.SET_GAMEMODE, null, 'gameMode');

/** The profession reducer. */
export const profession = handleSimpleAction(actions.SET_PROFESSION, null, 'profession');

/** The race reducer. */
export const race = handleSimpleAction(actions.SET_RACE, 'none', 'race');

export default {
    language,
    gameMode,
    profession,
    race
};
