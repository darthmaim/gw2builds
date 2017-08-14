import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../../actions';

export const selectedArmorItemstatIds = handleActions({
    [actions.SET_SELECTED_ARMOR_ITEMSTAT_ID]: (state, action) => {
        // Set the itemstat of a piece of armor
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },
    [actions.WIPE_SELECTED_ARMOR_ITEMSTAT_ID]: (state, action) => {
        // Wipe the itemstat of a piece of armor
        const newState = state.slice();
        newState[action.payload.slotId] = null;
        return newState;
    }
}, []);

export const selectedArmorIsAscended = handleAction(actions.SET_SELECTED_ARMOR_ISASCENDED, (state, action) => {
    // Set the ascended flag on an individual piece of armor
    const newState = state.slice();
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
}, []);

export default {
    selectedArmorItemstatIds,
    selectedArmorIsAscended
};
