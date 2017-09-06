import { handleActions } from 'redux-actions';
import * as actions from '../../actions';
import { swapElements } from '../utils';

/** Reducer for the selected ranger pet ids. */
export const selectedRangerPetIds = handleActions({
    // Set a pet
    [actions.SET_SELECTED_RANGER_PET_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.petId;
        return newState;
    },
    // Swap two pets with each other
    [actions.SWAP_SELECTED_RANGER_PET_IDS]: (state, action) => {
        const newState = state.slice();
        return swapElements(newState, action.payload.slotId1, action.payload.slotId2);
    },
    // Reset a pet
    [actions.WIPE_SELECTED_RANGER_PET_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    },

    // Reset all pets
    [actions.WIPE_ALL_SELECTED_RANGER_PET_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    selectedRangerPetIds
};
