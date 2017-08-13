import { createAction } from 'redux-actions';

export const SET_SELECTED_GEAR_ITEMSTAT_ID = 'SET_SELECTED_GEAR_ITEMSTAT_ID';
export const WIPE_SELECTED_GEAR_ITEMSTAT_ID = 'WIPE_SELECTED_GEAR_ITEMSTAT_ID';
export const SET_SELECTED_GEAR_ISASCENDED = 'SET_SELECTED_GEAR_ISASCENDED';

/** Action to set a specific itemstat id for a piece of gear. Params: { slotId, itemstatId } */
export const setSelectedGearItemstatId = createAction(SET_SELECTED_GEAR_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a piece of gear. Params: { slotId } */
export const wipeSelectedGearItemstatID = createAction(WIPE_SELECTED_GEAR_ITEMSTAT_ID);

/** Action to set the ascended flag on a specific piece of gear. Params: { slotId, isAscended } */
export const setSelectedGearIsAscended = createAction(SET_SELECTED_GEAR_ISASCENDED);

export default {
    SET_SELECTED_GEAR_ITEMSTAT_ID,
    WIPE_SELECTED_GEAR_ITEMSTAT_ID,
    SET_SELECTED_GEAR_ISASCENDED,

    setSelectedGearItemstatId,
    wipeSelectedGearItemstatID,
    setSelectedGearIsAscended
};
