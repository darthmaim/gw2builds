import { handleActions } from 'redux-actions';
import * as actions from '../actions/index';
import { swapElements } from './utils';

/** Reducer for the selected food item ids. */
export const selectedFoodIds = handleActions({
    // Set a food
    [actions.SET_SELECTED_FOOD_ITEM_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemId;
        return newState;
    },
    // Reset a food
    [actions.WIPE_SELECTED_FOOD_ITEM_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    },

    // Reset all food
    [actions.WIPE_ALL_SELECTED_FOOD_ITEM_IDS]: () => [],
    [actions.SET_SELECTED_GAMEMODE]: () => []
}, []);

export default {
    selectedFoodIds
};
