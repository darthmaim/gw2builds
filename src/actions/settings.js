import { createAction } from 'redux-actions';

export const SET_SETTINGS_SHOW_IDS = 'SET_SETTINGS_SHOW_IDS';

/** Action to enable or disable showing of ids in tooltips. Params: { showIds } */
export const setSettingsShowIds = createAction(SET_SETTINGS_SHOW_IDS);

export default {
    SET_SETTINGS_SHOW_IDS,

    setSettingsShowIds
};
