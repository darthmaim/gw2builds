import { handleAction, handleActions } from 'redux-actions';
import * as actions from '~/actions';

export const selectedGearItemstatIds = handleActions({
    [actions.SET_SELECTED_GEAR_ITEMSTAT_ID]: (state, action) => {
        // Set an individual gear itemstat
        const newState = Object.assign({}, state);
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },
    [actions.WIPE_SELECTED_GEAR_ITEMSTAT_ID]: (state, action) => {
        // Wipe a gear itemstat
        const newState = Object.assign({}, state);
        newState[action.payload.slotId] = null;
        return newState;
    }
}, {});

export const selectedGearIsAscended = handleAction(actions.SET_SELECTED_GEAR_ISASCENDED, (state, action) => {
    // Set the ascended flag on individual gear
    const newState = Object.assign({}, state);
    newState[action.payload.slotId] = action.payload.isAscended;
    return newState;
});

export default {
    selectedGearItemstatIds,
    selectedGearIsAscended
};
