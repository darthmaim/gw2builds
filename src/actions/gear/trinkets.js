import { createAction } from 'redux-actions';

export const SET_SELECTED_TRINKET_ITEMSTAT_ID = 'SET_SELECTED_TRINKET_ITEMSTAT_ID';
export const WIPE_SELECTED_TRINKET_ITEMSTAT_ID = 'WIPE_SELECTED_TRINKET_ITEMSTAT_ID';
export const SET_SELECTED_TRINKET_ISASCENDED = 'SET_SELECTED_TRINKET_ISASCENDED';

/** Action to set a specific itemstat id for a trinket. Params: { slotId, itemstatId } */
export const setSelectedTrinketItemstatId = createAction(SET_SELECTED_TRINKET_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a trinket. Params: { slotId } */
export const wipeSelectedTrinketItemstatId = createAction(WIPE_SELECTED_TRINKET_ITEMSTAT_ID);

/** Action to set the ascended flag on a specific trinket. Params: { slotId, isAscended } */
export const setSelectedTrinketIsAscended = createAction(SET_SELECTED_TRINKET_ISASCENDED);

export default {
    SET_SELECTED_TRINKET_ITEMSTAT_ID,
    WIPE_SELECTED_TRINKET_ITEMSTAT_ID,
    SET_SELECTED_TRINKET_ISASCENDED,

    setSelectedTrinketItemstatId,
    wipeSelectedTrinketItemstatId,
    setSelectedTrinketIsAscended
};
