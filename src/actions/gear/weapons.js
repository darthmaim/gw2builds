import { createAction } from 'redux-actions';

export const SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID = 'SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID';
export const SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID = 'SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID';
export const WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID = 'WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID';
export const WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID = 'WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID';
export const SET_SELECTED_MAINHAND_WEAPON_ISASCENDED = 'SET_SELECTED_MAINHAND_WEAPON_ISASCENDED';
export const SET_SELECTED_OFFHAND_WEAPON_ISASCENDED = 'SET_SELECTED_OFFHAND_WEAPON_ISASCENDED';

/** Action to set a specific itemstat id for a main-hand weapon. Params: { slotId, itemstatId } */
export const setSelectedMainhandWeaponItemstatId = createAction(SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID);

/** Action to set a specific itemstat id for an off-hand weapon. Params: { slotId, itemstatId } */
export const setSelectedOffhandWeaponItemstatId = createAction(SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for a main-hand weapon. Params: { slotId } */
export const wipeSelectedMainhandWeaponItemstatId = createAction(WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID);

/** Action to wipe a selected itemstat id for an off-hand weapon. Params: { slotId } */
export const wipeSelectedOffhandWeaponItemstatId = createAction(WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID);

/** Action to set the ascended flag on a specific main-hand weapon. Params: { slotId, isAscended } */
export const setSelectedMainhandWeaponIsAscended = createAction(SET_SELECTED_MAINHAND_WEAPON_ISASCENDED);

/** Action to set the ascended flag on a specific main-hand weapon. Params: { slotId, isAscended } */
export const setSelectedOffhandWeaponIsAscended = createAction(SET_SELECTED_OFFHAND_WEAPON_ISASCENDED);

export default {
    SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID,
    SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID,
    WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID,
    WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID,
    SET_SELECTED_MAINHAND_WEAPON_ISASCENDED,
    SET_SELECTED_OFFHAND_WEAPON_ISASCENDED,

    setSelectedMainhandWeaponItemstatId,
    setSelectedOffhandWeaponItemstatId,
    wipeSelectedMainhandWeaponItemstatId,
    wipeSelectedOffhandWeaponItemstatId,
    setSelectedMainhandWeaponIsAscended,
    setSelectedOffhandWeaponIsAscended
};
