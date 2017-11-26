import { createAction } from 'redux-actions';

export const SET_SELECTED_ARMOR_ITEMSTAT_ID = 'SET_SELECTED_ARMOR_ITEMSTAT_ID';
export const WIPE_SELECTED_ARMOR_ITEMSTAT_ID = 'WIPE_SELECTED_ARMOR_ITEMSTAT_ID';
export const SET_SELECTED_ARMOR_ISASCENDED = 'SET_SELECTED_ARMOR_ISASCENDED';
export const SET_SELECTED_ARMOR_UPGRADE_ID = 'SET_SELECTED_ARMOR_UPGRADE_ID';
export const WIPE_SELECTED_ARMOR_UPGRADE_ID = 'WIPE_SELECTED_ARMOR_UPGRADE_ID';
export const SET_SELECTED_ARMOR_INFUSION_ID = 'SET_SELECTED_ARMOR_INFUSION_ID';
export const WIPE_SELECTED_ARMOR_INFUSION_ID = 'WIPE_SELECTED_ARMOR_INFUSION_ID';

export const SET_SELECTED_PVP_AMULET_ID = 'SET_SELECTED_PVP_AMULET_ID';
export const WIPE_SELECTED_PVP_AMULET_ID = 'WIPE_SELECTED_PVP_AMULET_ID';
export const SET_SELECTED_PVP_ARMOR_UPGRADE_ID = 'SET_SELECTED_PVP_ARMOR_UPGRADE_ID';
export const WIPE_SELECTED_PVP_ARMOR_UPGRADE_ID = 'WIPE_SELECTED_PVP_ARMOR_UPGRADE_ID';

/** Action to set a selected itemstat id for a piece of armor. Params: { slotId, itemstatId } */
export const setSelectedArmorItemstatId = createAction(SET_SELECTED_ARMOR_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a piece of armor. Params: { slotId } */
export const wipeSelectedArmorItemstatId = createAction(WIPE_SELECTED_ARMOR_ITEMSTAT_ID);

/** Action to set the ascended flag on a selected piece of armor. Params: { slotId, isAscended } */
export const setSelectedArmorIsAscended = createAction(SET_SELECTED_ARMOR_ISASCENDED);

/** Action to set a selected upgrade item id for a piece of armor. Params: { slotId, itemId } */
export const setSelectedArmorUpgradeId = createAction(SET_SELECTED_ARMOR_ITEMSTAT_ID);

/** Action to wipe a selected upgrade item id for a piece of armor. Params: { slotId } */
export const wipeSelectedArmorUpgradeId = createAction(WIPE_SELECTED_ARMOR_ITEMSTAT_ID);

/** Action to set a selected infusion item id for a piece of armor. Params: { slotId, itemId } */
export const setSelectedArmorInfusionId = createAction(SET_SELECTED_ARMOR_INFUSION_ID);

/** Action to wipe a selected infusion item id for a piece of armor. Params: { slotId } */
export const wipeSelectedArmorInfusionId = createAction(WIPE_SELECTED_ARMOR_INFUSION_ID);

/** Action to set a selected PvP amulet id. Params: { amuletId } */
export const setSelectedPvpAmuletId = createAction(SET_SELECTED_PVP_AMULET_ID);

/** Action to wipe a selected PvP amulet id. Params: { } */
export const wipeSelectedPvpAmuletId = createAction(WIPE_SELECTED_PVP_AMULET_ID);

/** Action to set a selected PvP armor upgrade item id. Params: { itemId } */
export const setSelectedPvpArmorUpgradeId = createAction(SET_SELECTED_PVP_ARMOR_UPGRADE_ID);

/** Action to wipe a selected PvP armor upgrade item id. Params: { } */
export const wipeSelectedPvpArmorUpgradeId = createAction(WIPE_SELECTED_PVP_ARMOR_UPGRADE_ID);

export default {
    SET_SELECTED_ARMOR_ITEMSTAT_ID,
    WIPE_SELECTED_ARMOR_ITEMSTAT_ID,
    SET_SELECTED_ARMOR_ISASCENDED,
    SET_SELECTED_ARMOR_UPGRADE_ID,
    WIPE_SELECTED_ARMOR_UPGRADE_ID,
    SET_SELECTED_ARMOR_INFUSION_ID,
    WIPE_SELECTED_ARMOR_INFUSION_ID,

    SET_SELECTED_PVP_AMULET_ID,
    WIPE_SELECTED_PVP_AMULET_ID,
    SET_SELECTED_PVP_ARMOR_UPGRADE_ID,
    WIPE_SELECTED_PVP_ARMOR_UPGRADE_ID,

    setSelectedArmorItemstatId,
    wipeSelectedArmorItemstatId,
    setSelectedArmorIsAscended,
    setSelectedArmorUpgradeId,
    wipeSelectedArmorUpgradeId,
    setSelectedArmorInfusionId,
    wipeSelectedArmorInfusionId,

    setSelectedPvpAmuletId,
    wipeSelectedPvpAmuletId,
    setSelectedPvpArmorUpgradeId,
    wipeSelectedPvpArmorUpgradeId
};
