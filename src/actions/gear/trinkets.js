import { createAction } from 'redux-actions';

export const SET_SELECTED_TRINKET_ITEMSTAT_ID = 'SET_SELECTED_TRINKET_ITEMSTAT_ID';
export const WIPE_SELECTED_TRINKET_ITEMSTAT_ID = 'WIPE_SELECTED_TRINKET_ITEMSTAT_ID';
export const SET_SELECTED_TRINKET_ISASCENDED = 'SET_SELECTED_TRINKET_ISASCENDED';
export const SET_SELECTED_TRINKET_UPGRADE_ID = 'SET_SELECTED_TRINKET_UPGRADE_ID';
export const WIPE_SELECTED_TRINKET_UPGRADE_ID = 'WIPE_SELECTED_TRINKET_UPGRADE_ID';
export const SET_SELECTED_TRINKET_INFUSION_ID = 'SET_SELECTED_TRINKET_INFUSION_ID';
export const WIPE_SELECTED_TRINKET_INFUSION_ID = 'WIPE_SELECTED_TRINKET_INFUSION_ID';

/** Action to set a selected itemstat id for a trinket. Params: { slotId, itemstatId } */
export const setSelectedTrinketItemstatId = createAction(SET_SELECTED_TRINKET_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a trinket. Params: { slotId } */
export const wipeSelectedTrinketItemstatId = createAction(WIPE_SELECTED_TRINKET_ITEMSTAT_ID);

/** Action to set the ascended flag on a selected trinket. Params: { slotId, isAscended } */
export const setSelectedTrinketIsAscended = createAction(SET_SELECTED_TRINKET_ISASCENDED);

/** Action to set a selected upgrade item id for a trinket. Params: { slotId, itemId } */
export const setSelectedTrinketUpgradeId = createAction(SET_SELECTED_TRINKET_UPGRADE_ID);

/** Action to wipe a selected upgrade item id for a trinket. Params: { slotId } */
export const wipeSelectedTrinketUpgradeId = createAction(WIPE_SELECTED_TRINKET_UPGRADE_ID);

/** Action to set a selected infusion item id for a trinket. Params: { slotId, itemId } */
export const setSelectedTrinketInfusionId = createAction(SET_SELECTED_TRINKET_INFUSION_ID);

/** Action to wipe a selected infusion item id for a trinket. Params: { slotId } */
export const wipeSelectedTrinketInfusionId = createAction(WIPE_SELECTED_TRINKET_INFUSION_ID);

export default {
    SET_SELECTED_TRINKET_ITEMSTAT_ID,
    WIPE_SELECTED_TRINKET_ITEMSTAT_ID,
    SET_SELECTED_TRINKET_ISASCENDED,
    SET_SELECTED_TRINKET_UPGRADE_ID,
    WIPE_SELECTED_TRINKET_UPGRADE_ID,
    SET_SELECTED_TRINKET_INFUSION_ID,
    WIPE_SELECTED_TRINKET_INFUSION_ID,

    setSelectedTrinketItemstatId,
    wipeSelectedTrinketItemstatId,
    setSelectedTrinketIsAscended,
    setSelectedTrinketUpgradeId,
    wipeSelectedTrinketUpgradeId,
    setSelectedTrinketInfusionId,
    wipeSelectedTrinketInfusionId
};
