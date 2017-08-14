import { createAction } from 'redux-actions';

export const SET_SELECTED_ARMOR_ITEMSTAT_ID = 'SET_SELECTED_ARMOR_ITEMSTAT_ID';
export const WIPE_SELECTED_ARMOR_ITEMSTAT_ID = 'WIPE_SELECTED_ARMOR_ITEMSTAT_ID';
export const SET_SELECTED_ARMOR_ISASCENDED = 'SET_SELECTED_ARMOR_ISASCENDED';

/** Action to set a selected itemstat id for a piece of armor. Params: { slotId, itemstatId } */
export const setSelectedArmorItemstatId = createAction(SET_SELECTED_ARMOR_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a piece of armor. Params: { slotId } */
export const wipeSelectedArmorItemstatId = createAction(WIPE_SELECTED_ARMOR_ITEMSTAT_ID);

/** Action to set the ascended flag on a selected piece of armor. Params: { slotId, isAscended } */
export const setSelectedArmorIsAscended = createAction(SET_SELECTED_ARMOR_ISASCENDED);

export default {
    SET_SELECTED_ARMOR_ITEMSTAT_ID,
    WIPE_SELECTED_ARMOR_ITEMSTAT_ID,
    SET_SELECTED_ARMOR_ISASCENDED,

    setSelectedArmorItemstatId,
    wipeSelectedArmorItemstatId,
    setSelectedArmorIsAscended
};
