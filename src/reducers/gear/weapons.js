import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../../actions';
import { handleSimpleAction } from '../../reducers/utils';

/** Reducer for the available weapons for the selected profession. */
export const availableWeaponObjects = handleSimpleAction(actions.FETCH_PROFESSION, {}, 'weapons');

/** Reducer for the active weapon set */
export const activeWeaponSet = handleActions({
    // Set the active weapon set
    [actions.SET_ACTIVE_WEAPON_SET]: (state, action) => action.payload.activeWeaponSet,

    // Reset the active weapon set
    [actions.WIPE_ALL_SELECTED_WEAPON_IDS]: () => 0,
    [actions.SET_SELECTED_PROFESSION]: () => 0
}, 0);

/** Reducer for the selected main-hand weapon ids. */
export const selectedMainhandWeaponIds = handleActions({
    // Set the selected main-hand weapon id
    [actions.SET_SELECTED_MAINHAND_WEAPON_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.weaponSet] = action.payload.weaponId;
        return newState;
    },

    // Reset the selected main-hand weapon ids
    [actions.WIPE_ALL_SELECTED_WEAPON_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

/** Reducer for the selected off-hand weapon ids. */
export const selectedOffhandWeaponIds = handleActions({
    // Set the selected off-hand weapon id
    [actions.SET_SELECTED_OFFHAND_WEAPON_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.weaponSet] = action.payload.weaponId;
        return newState;
    },

    // Reset the selected off-hand weapon ids
    [actions.WIPE_ALL_SELECTED_WEAPON_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

/** Reducer for the selected main-hand weapon itemstat ids. */
export const selectedMainhandWeaponItemstatIds = handleActions({
    // Set a main-hand weapon itemstat
    [actions.SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },

    // Reset a main-hand weapon itemstat
    [actions.WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, []);

/** Reducer for the selected off-hand weapon itemstat ids. */
export const selectedOffhandWeaponItemstatIds = handleActions({
    // Set an off-hand weapon itemstat
    [actions.SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },

    // Reset an off-hand weapon itemstat
    [actions.WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, []);

/** Reducer for the main-hand weapon ascended flag. */
export const selectedMainhandWeaponIsAscended = handleAction(actions.SET_SELECTED_MAINHAND_WEAPON_ISASCENDED, (state, action) => {
    // Set the ascended flag on a main-hand weapon
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

/** Reducer for the off-hand weapon ascended flag. */
export const selectedOffhandWeaponIsAscended = handleAction(actions.SET_SELECTED_OFFHAND_WEAPON_ISASCENDED, (state, action) => {
    // Set the ascended flag on an off-hand weapon
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

export default {
    activeWeaponSet,
    availableWeaponObjects,
    selectedMainhandWeaponIds,
    selectedOffhandWeaponIds,

    selectedMainhandWeaponItemstatIds,
    selectedOffhandWeaponItemstatIds,
    selectedMainhandWeaponIsAscended,
    selectedOffhandWeaponIsAscended
};
