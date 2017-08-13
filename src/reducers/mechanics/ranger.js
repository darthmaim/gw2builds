import { handleActions } from 'redux-actions';
import * as actions from '../../actions';
import { swapElements } from '../utils';

export const selectedRangerPetIds = handleActions({
    [actions.SET_SELECTED_RANGER_PET_ID]: (state, action) => {
        // Set an individual pet
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.petId;
        return newState;
    },
    [actions.SWAP_SELECTED_RANGER_PET_IDS]: (state, action) => {
        // Swap two pets with each other
        const newState = state.slice();
        return swapElements(newState, action.payload.slotId1, action.payload.slotId2);
    },
    [actions.WIPE_SELECTED_RANGER_PET_ID]: (state, action) => {
        // Wipe a pet
        const newState = state.slice();
        newState[action.payload.slotId] = null;
        return newState;
    },

    // Wipe all
    [actions.WIPE_ALL_SELECTED_RANGER_PET_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    selectedRangerPetIds
};
