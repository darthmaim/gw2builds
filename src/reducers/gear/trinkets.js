import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../../actions';

export const selectedTrinketItemstatIds = handleActions({
    [actions.SET_SELECTED_TRINKET_ITEMSTAT_ID]: (state, action) => {
        // Set a trinket itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },
    [actions.WIPE_SELECTED_TRINKET_ITEMSTAT_ID]: (state, action) => {
        // Wipe a trinket itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = null;
        return newState;
    }
}, []);

export const selectedTrinketIsAscended = handleAction(actions.SET_SELECTED_TRINKET_ISASCENDED, (state, action) => {
    // Set the ascended flag on a trinket
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

export default {
    selectedTrinketItemstatIds,
    selectedTrinketIsAscended
};
