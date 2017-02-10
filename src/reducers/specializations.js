import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction, swapElements } from './utils';

/** Reducer for the available specialization ids for the current profession. */
export const specializationIds = handleSimpleAction(actions.FETCH_PROFESSION, [], 'specializations');

/** Reducer for the available specialization objects for the current profession. */
export const specializations = handleSimpleAction(actions.FETCH_SPECIALIZATIONS, {});

/** Reducer for active/selected specializations as ids. */
export const activeSpecializations = handleActions({
    [actions.SET_SPECIALIZATION]: (state, action) => {
        // Set an individual specialization
        const newState = state.slice();
        newState[action.payload.specializationLine] = action.payload.specializationId;
        return newState;
    },
    [actions.SWAP_ACTIVE_SPECIALIZATIONS]: (state, action) => {
        // Swap two specializations with each other
        const newState = state.slice();
        swapElements(newState, action.payload.specializationLine1, action.payload.specializationLine2);
        return newState;
    },
    [actions.WIPE_ACTIVE_SPECIALIZATION]: (state, action) => {
        // Wipe a specialization
        const newState = state.slice();
        delete newState[action.payload.specializationLine];
        return newState;
    },
    [actions.WIPE_ALL_ACTIVE_SPECIALIZATIONS]: () => [],
    [actions.SET_PROFESSION]: () => []
}, []);

export default {
    specializationIds,
    specializations,
    activeSpecializations
};
