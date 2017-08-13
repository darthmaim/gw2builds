import { createAction } from 'redux-actions';

export const SET_SELECTED_ITEMSTAT_ID = 'SET_SELECTED_ITEMSTAT_ID';
export const WIPE_SELECTED_ITEMSTAT_ID = 'WIPE_SELECTED_ITEMSTAT_ID';

/** Action to set a specific itemstat id for a piece of gear. Params: { slotId, itemstatId } */
export const setSelectedItemstatId = createAction(SET_SELECTED_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a piece of gear. Params: { slotId } */
export const wipeSelectedItemstatID = createAction(WIPE_SELECTED_ITEMSTAT_ID);

export default {
    SET_SELECTED_ITEMSTAT_ID,
    WIPE_SELECTED_ITEMSTAT_ID,

    setSelectedItemstatId,
    wipeSelectedItemstatID,
};
