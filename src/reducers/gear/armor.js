import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../../actions';

/** Reducer for the selected armor itemstat ids. */
export const selectedArmorItemstatIds = handleActions({
    // Set the itemstat of a piece of armor
    [actions.SET_SELECTED_ARMOR_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },

    // Reset the itemstat of a piece of armor
    [actions.WIPE_SELECTED_ARMOR_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, []);

/** Reducer for the armor ascended flag. */
export const selectedArmorIsAscended = handleAction(actions.SET_SELECTED_ARMOR_ISASCENDED, (state, action) => {
    // Set the ascended flag on a piece of armor
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

/** Reducer for the selected armor upgrade item ids. */
export const selectedArmorUpgradeIds = handleActions({
    // Set the upgrade item of a piece of armor
    [actions.SET_SELECTED_ARMOR_UPGRADE_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemId;
        return newState;
    },

    // Reset the upgrade item of a piece of armor
    [actions.WIPE_SELECTED_ARMOR_UPGRADE_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, []);

export default {
    selectedArmorItemstatIds,
    selectedArmorIsAscended,
    selectedArmorUpgradeIds
};
