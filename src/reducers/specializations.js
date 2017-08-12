import { handleActions } from 'redux-actions';
import * as actions from '~/actions';
import { handleSimpleAction, swapElements } from './utils';

/** Reducer for the available specialization ids for the current profession. */
export const availableSpecializationIds = handleSimpleAction(actions.FETCH_PROFESSION, [], 'specializations');

/** Reducer for the available specialization objects for the current profession. */
export const availableSpecializationObjects = handleSimpleAction(actions.FETCH_AVAILABLE_SPECIALIZATIONS, {});

/** Reducer for active/selected specializations as ids. */
export const selectedSpecializationIds = handleActions({
    [actions.SET_SELECTED_SPECIALIZATION_ID]: (state, action) => {
        // Set an individual specialization
        const newState = state.slice();
        newState[action.payload.specializationLine] = action.payload.specializationId;
        return newState;
    },
    [actions.SWAP_SELECTED_SPECIALIZATION_IDS]: (state, action) => {
        // Swap two specializations with each other
        const newState = state.slice();
        swapElements(newState, action.payload.specializationLine1, action.payload.specializationLine2);
        return newState;
    },
    [actions.WIPE_SELECTED_SPECIALIZATION_ID]: (state, action) => {
        // Wipe a specialization
        const newState = state.slice();
        delete newState[action.payload.specializationLine];
        return newState;
    },
    [actions.WIPE_ALL_SELECTED_SPECIALIZATION_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    availableSpecializationIds,
    availableSpecializationObjects,
    selectedSpecializationIds
};
