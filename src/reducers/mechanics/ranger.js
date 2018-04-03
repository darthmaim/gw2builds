import { handleActions } from 'redux-actions';
import * as actions from '../../actions';
import flatten from 'lodash/fp/flatten';
import { handleSimpleAction, swapElements } from '../utils';

/** Reducer for the available skill objects for the selected profession. */
export const availableRangerPets = handleSimpleAction(actions.FETCH_AVAILABLE_RANGER_PETS, {});


/** Reducer for available toolbelt skill ids. */
export const availableRangerPetSkillIds = handleActions({
    [actions.FETCH_AVAILABLE_RANGER_PETS]: (state, action) => {
        return flatten(Object.values(action.payload).map(
            (pet) => (pet.skills || []).map(
                (sub) => sub.id
            )
        ));
    },

    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);


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
    availableRangerPets,
    availableRangerPetSkillIds,
    selectedRangerPetIds
};
