import { handleActions } from 'redux-actions';
import * as actions from '~/actions';

export const selectedItemstatIds = handleActions({
    [actions.SET_SELECTED_ITEMSTAT_ID]: (state, action) => {
        // Set an individual itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemstatId;
        return newState;
    },
    [actions.WIPE_SELECTED_ITEMSTAT_ID]: (state, action) => {
        // Wipe an itemstat
        const newState = state.slice();
        newState[action.payload.slotId] = null;
        return newState;
    }
}, []);

export default {
    selectedItemstatIds
};
