import { createAction } from 'redux-actions';

export const SET_ACTIVE_WEAPON_SET = 'SET_ACTIVE_WEAPON_SET';

export const SET_SELECTED_MAINHAND_WEAPON_ID = 'SET_SELECTED_MAINHAND_WEAPON_ID';
export const SET_SELECTED_OFFHAND_WEAPON_ID = 'SET_SELECTED_OFFHAND_WEAPON_ID';
export const WIPE_ALL_SELECTED_WEAPON_IDS = 'WIPE_ALL_SELECTED_WEAPON_IDS';

export const SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID = 'SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID';
export const SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID = 'SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID';
export const WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID = 'WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID';
export const WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID = 'WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID';
export const SET_SELECTED_MAINHAND_WEAPON_ISASCENDED = 'SET_SELECTED_MAINHAND_WEAPON_ISASCENDED';
export const SET_SELECTED_OFFHAND_WEAPON_ISASCENDED = 'SET_SELECTED_OFFHAND_WEAPON_ISASCENDED';
export const SET_SELECTED_MAINHAND_WEAPON_UPGRADE_ID = 'SET_SELECTED_MAINHAND_WEAPON_UPGRADE_ID';
export const SET_SELECTED_OFFHAND_WEAPON_UPGRADE_ID = 'SET_SELECTED_OFFHAND_WEAPON_UPGRADE_ID';
export const WIPE_SELECTED_MAINHAND_WEAPON_UPGRADE_ID = 'WIPE_SELECTED_MAINHAND_WEAPON_UPGRADE_ID';
export const WIPE_SELECTED_OFFHAND_WEAPON_UPGRADE_ID = 'WIPE_SELECTED_OFFHAND_WEAPON_UPGRADE_ID';
export const SET_SELECTED_MAINHAND_WEAPON_INFUSION_ID = 'SET_SELECTED_MAINHAND_WEAPON_INFUSION_ID';
export const SET_SELECTED_OFFHAND_WEAPON_INFUSION_ID = 'SET_SELECTED_OFFHAND_WEAPON_INFUSION_ID';
export const WIPE_SELECTED_MAINHAND_WEAPON_INFUSION_ID = 'WIPE_SELECTED_MAINHAND_WEAPON_INFUSION_ID';
export const WIPE_SELECTED_OFFHAND_WEAPON_INFUSION_ID = 'WIPE_SELECTED_OFFHAND_WEAPON_INFUSION_ID';

/** Action to set the active weapon set. Params: { weaponSet } */
export const setActiveWeaponSet = createAction(SET_ACTIVE_WEAPON_SET);

/** Action to set a selected main-hand weapon. Params: { weaponSet, weaponId } */
export const setSelectedMainhandWeaponId = createAction(SET_SELECTED_MAINHAND_WEAPON_ID);

/** Action to set a selected off-hand weapon. Params: { weaponSet, weaponId } */
export const setSelectedOffhandWeaponId = createAction(SET_SELECTED_OFFHAND_WEAPON_ID);

/** Action to wipe all selected weapon ids. Params: {} */
export const wipeAllSelectedWeaponIds = createAction(WIPE_ALL_SELECTED_WEAPON_IDS);

/** Action to set a selected itemstat id for a main-hand weapon. Params: { slotId, itemstatId } */
export const setSelectedMainhandWeaponItemstatId = createAction(SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID);

/** Action to set a selected itemstat id for an off-hand weapon. Params: { slotId, itemstatId } */
export const setSelectedOffhandWeaponItemstatId = createAction(SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a main-hand weapon. Params: { slotId } */
export const wipeSelectedMainhandWeaponItemstatId = createAction(WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for an off-hand weapon. Params: { slotId } */
export const wipeSelectedOffhandWeaponItemstatId = createAction(WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID);

/** Action to set the ascended flag on a selected main-hand weapon. Params: { slotId, isAscended } */
export const setSelectedMainhandWeaponIsAscended = createAction(SET_SELECTED_MAINHAND_WEAPON_ISASCENDED);

/** Action to set the ascended flag on a selected main-hand weapon. Params: { slotId, isAscended } */
export const setSelectedOffhandWeaponIsAscended = createAction(SET_SELECTED_OFFHAND_WEAPON_ISASCENDED);

/** Action to set a selected upgrade item id for a main-hand weapon. Params: { slotId, itemId } */
export const setSelectedMainhandWeaponUpgradeId = createAction(SET_SELECTED_MAINHAND_WEAPON_UPGRADE_ID);

/** Action to set a selected upgrade item id for an off-hand weapon. Params: { slotId, itemId } */
export const setSelectedOffhandWeaponUpgradeId = createAction(SET_SELECTED_OFFHAND_WEAPON_UPGRADE_ID);

/** Action to wipe a selected upgrade item id for a main-hand weapon. Params: { slotId } */
export const wipeSelectedMainhandWeaponUpgradeId = createAction(WIPE_SELECTED_MAINHAND_WEAPON_UPGRADE_ID);

/** Action to wipe a selected upgrade item id for an off-hand weapon. Params: { slotId } */
export const wipeSelectedOffhandWeaponUpgradeId = createAction(WIPE_SELECTED_OFFHAND_WEAPON_UPGRADE_ID);

/** Action to set a selected infusion item id for a main-hand weapon. Params: { slotId, itemId } */
export const setSelectedMainhandWeaponInfusionId = createAction(SET_SELECTED_MAINHAND_WEAPON_INFUSION_ID);

/** Action to set a selected infusion item id for an off-hand weapon. Params: { slotId, itemId } */
export const setSelectedOffhandWeaponInfusionId = createAction(SET_SELECTED_OFFHAND_WEAPON_INFUSION_ID);

/** Action to wipe a selected infusion item id for a main-hand weapon. Params: { slotId } */
export const wipeSelectedMainhandWeaponInfusionId = createAction(WIPE_SELECTED_MAINHAND_WEAPON_INFUSION_ID);

/** Action to wipe a selected infusion item id for an off-hand weapon. Params: { slotId } */
export const wipeSelectedOffhandWeaponInfusionId = createAction(WIPE_SELECTED_OFFHAND_WEAPON_INFUSION_ID);

export default {
    SET_ACTIVE_WEAPON_SET,
    SET_SELECTED_MAINHAND_WEAPON_ID,
    SET_SELECTED_OFFHAND_WEAPON_ID,
    WIPE_ALL_SELECTED_WEAPON_IDS,

    SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID,
    SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID,
    WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID,
    WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID,
    SET_SELECTED_MAINHAND_WEAPON_ISASCENDED,
    SET_SELECTED_OFFHAND_WEAPON_ISASCENDED,
    SET_SELECTED_MAINHAND_WEAPON_UPGRADE_ID,
    SET_SELECTED_OFFHAND_WEAPON_UPGRADE_ID,
    WIPE_SELECTED_MAINHAND_WEAPON_UPGRADE_ID,
    WIPE_SELECTED_OFFHAND_WEAPON_UPGRADE_ID,
    SET_SELECTED_MAINHAND_WEAPON_INFUSION_ID,
    SET_SELECTED_OFFHAND_WEAPON_INFUSION_ID,
    WIPE_SELECTED_MAINHAND_WEAPON_INFUSION_ID,
    WIPE_SELECTED_OFFHAND_WEAPON_INFUSION_ID,

    setActiveWeaponSet,
    setSelectedMainhandWeaponId,
    setSelectedOffhandWeaponId,
    wipeAllSelectedWeaponIds,

    setSelectedMainhandWeaponItemstatId,
    setSelectedOffhandWeaponItemstatId,
    wipeSelectedMainhandWeaponItemstatId,
    wipeSelectedOffhandWeaponItemstatId,
    setSelectedMainhandWeaponIsAscended,
    setSelectedOffhandWeaponIsAscended,
    setSelectedMainhandWeaponUpgradeId,
    setSelectedOffhandWeaponUpgradeId,
    wipeSelectedMainhandWeaponUpgradeId,
    wipeSelectedOffhandWeaponUpgradeId,
    setSelectedMainhandWeaponInfusionId,
    setSelectedOffhandWeaponInfusionId,
    wipeSelectedMainhandWeaponInfusionId,
    wipeSelectedOffhandWeaponInfusionId
};
