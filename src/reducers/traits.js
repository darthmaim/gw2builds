import flatMapDeep from 'lodash/fp/flatMapDeep';
import { combineActions, handleAction, handleActions } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction, swapElements } from './utils';

/** Reducer for the available trait ids for the selected profession. */
export const availableTraitIds = handleAction(
    actions.FETCH_AVAILABLE_SPECIALIZATIONS,
    (state, action) => flatMapDeep(s => {
        const traits = [s.minor_traits, s.major_traits];
        if (s.weapon_trait) {
            // Add the elite weapon trait
            traits.push(s.weapon_trait);
        }
        return traits;
    })(action.payload),
    []
);

/** Reducer for the available trait objects for the selected profession. */
export const availableTraitObjects = handleSimpleAction(actions.FETCH_AVAILABLE_TRAITS, {});

/** Reducer for selected major trait ids. */
export const selectedMajorTraitIds = handleActions({
    // Set a major trait
    [actions.SET_SELECTED_MAJOR_TRAIT_ID]: (state, action) => {
        const newState = state.slice();
        newState[(action.payload.specializationLine * 3) + action.payload.traitTier - 1] = action.payload.traitId;
        return newState;
    },
    // Set the major traits by swapping two specializations
    [actions.SWAP_SELECTED_SPECIALIZATION_IDS]: (state, action) => {
        const newState = state.slice();
        for (let i = 0; i < 3; i++) {
            swapElements(newState, (action.payload.specializationLine1 * 3) + i, (action.payload.specializationLine2 * 3) + i);
        }
        return newState;
    },
    // Reset the major traits of a specialization line
    [combineActions(actions.SET_SELECTED_SPECIALIZATION_ID, actions.WIPE_SELECTED_SPECIALIZATION_ID, actions.WIPE_SELECTED_TRAIT_IDS)](state, action) {
        const newState = state.slice();
        for (let i = 0; i < 3; i++) {
            newState[(action.payload.specializationLine * 3) + i] = undefined;
        }
        return newState;
    },

    // Reset all
    [actions.WIPE_ALL_SELECTED_TRAIT_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    availableTraitIds,
    availableTraitObjects,
    selectedMajorTraitIds
};
