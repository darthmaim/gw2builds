import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../../actions';

/** Reducer for the selected trinket itemstat ids. */
export const selectedTrinketItemstatIds = handleActions({
    // Set a trinket itemstat
    [actions.SET_SELECTED_TRINKET_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },

    // Reset a trinket itemstat
    [actions.WIPE_SELECTED_TRINKET_ITEMSTAT_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, []);

/** Reducer for the trinket ascended flag. */
export const selectedTrinketIsAscended = handleAction(actions.SET_SELECTED_TRINKET_ISASCENDED, (state, action) => {
    // Set the ascended flag on a trinket
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

/** Reducer for the selected trinket upgrade item ids. */
export const selectedTrinketUpgradeIds = handleActions({
    // Set a trinket upgrade item
    [actions.SET_SELECTED_TRINKET_UPGRADE_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemId;
        return newState;
    },

    // Reset a trinket upgrade item
    [actions.WIPE_SELECTED_TRINKET_UPGRADE_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, []);

export default {
    selectedTrinketItemstatIds,
    selectedTrinketIsAscended,
    selectedTrinketUpgradeIds
};
