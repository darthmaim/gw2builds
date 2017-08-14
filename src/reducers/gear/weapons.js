import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../../actions';

export const selectedMainhandWeaponItemstatIds = handleActions({
    [actions.SET_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        // Set a main-hand weapon itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },
    [actions.WIPE_SELECTED_MAINHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        // Wipe a main-hand weapon itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = null;
        return newState;
    }
}, []);

export const selectedOffhandWeaponItemstatIds = handleActions({
    [actions.SET_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        // Set an off-hand weapon itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },
    [actions.WIPE_SELECTED_OFFHAND_WEAPON_ITEMSTAT_ID]: (state, action) => {
        // Wipe an off-hand weapon itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = null;
        return newState;
    }
}, []);

export const selectedMainhandWeaponIsAscended = handleAction(actions.SET_SELECTED_MAINHAND_WEAPON_ISASCENDED, (state, action) => {
    // Set the ascended flag on a main-hand weapon
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

export const selectedOffhandWeaponIsAscended = handleAction(actions.SET_SELECTED_OFFHAND_WEAPON_ISASCENDED, (state, action) => {
    // Set the ascended flag on an off-hand weapon
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

export default {
    selectedMainhandWeaponItemstatIds,
    selectedOffhandWeaponItemstatIds,
    selectedMainhandWeaponIsAscended,
    selectedOffhandWeaponIsAscended
};
