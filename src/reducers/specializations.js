import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction, swapElements } from './utils';

/** Reducer for the available specialization ids for the selected profession. */
export const availableSpecializationIds = handleSimpleAction(actions.FETCH_PROFESSION, [], 'specializations');

/** Reducer for the available specialization objects for the selected profession. */
export const availableSpecializationObjects = handleSimpleAction(actions.FETCH_AVAILABLE_SPECIALIZATIONS, {});

/** Reducer for the selected specialization ids. */
export const selectedSpecializationIds = handleActions({
    // Set a specialization
    [actions.SET_SELECTED_SPECIALIZATION_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.specializationLine] = action.payload.specializationId;
        return newState;
    },
    // Swap two specializations with each other
    [actions.SWAP_SELECTED_SPECIALIZATION_IDS]: (state, action) => {
        const newState = state.slice();
        swapElements(newState, action.payload.specializationLine1, action.payload.specializationLine2);
        return newState;
    },
    // Reset a specialization
    [actions.WIPE_SELECTED_SPECIALIZATION_ID]: (state, action) => {
        const newState = state.slice();
        delete newState[action.payload.specializationLine];
        return newState;
    },

    // Reset all
    [actions.WIPE_ALL_SELECTED_SPECIALIZATION_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    availableSpecializationIds,
    availableSpecializationObjects,
    selectedSpecializationIds
};
