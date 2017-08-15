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

/** Reducer for the selected trinket infusion item ids. */
export const selectedTrinketInfusionIds = handleActions({
    // Set a trinket infusion item
    [actions.SET_SELECTED_TRINKET_INFUSION_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemId;
        return newState;
    },

    // Reset a trinket infusion item
    [actions.WIPE_SELECTED_TRINKET_INFUSION_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    },
    [actions.SET_SELECTED_TRINKET_ISASCENDED]: (state, action) => {
        if (!action.payload.isAscended) {
            // Some non-ascended armor pieces don't allow infusions
            let toRemove = [];
            switch (action.payload.slotId) {
                case 0:
                    // Some backpacks allow 1 infusion, remove second only
                    toRemove = [6];
                    break;
                case 4:
                    toRemove = [4, 7, 8];
                    break;
                case 5:
                    toRemove = [5, 9, 10];
                    break;
                default:
                    toRemove = [action.payload.slotId];
                    break;
            }
            const newState = state.slice();
            for (const slot of toRemove) {
                newState[slot] = undefined;
            }
            return newState;
        }
        return state;
    }
}, []);

export default {
    selectedTrinketItemstatIds,
    selectedTrinketIsAscended,
    selectedTrinketUpgradeIds,
    selectedTrinketInfusionIds
};
