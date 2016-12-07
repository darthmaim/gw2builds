'use strict';

import fp from 'lodash/fp';
import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction, swapElements } from './utils';

/** Reducer for the available trait ids for the current profession. */
export const traitIds = handleAction(
    actions.FETCH_SPECIALIZATIONS,
    (state, action) => fp.flatMapDeep(s => {
        const traits = [s.minor_traits, s.major_traits];
        if (s.weapon_trait) {
            // Add the elite weapon trait
            traits.push(s.weapon_trait);
        }
        return traits;
    })(action.payload),
    []
);

/** Reducer for the available trait objects for the current profession. */
export const traits = handleSimpleAction(actions.FETCH_TRAITS, {});

/** Reducer for active/selected minor traits as ids. */
export const activeMinorTraits = handleActions({
    [actions.SET_SPECIALIZATION]: (state, action) => {
        // Set the minor traits from an individual specialization
        const newState = state.slice();
        const specializations = action.payload.getState().specializations;
        const pos = action.payload.specializationLine * 3;
        for (let i = 0; i < 3; i++) {
            newState[pos + i] = specializations[action.payload.specializationId].minor_traits[i];
        }
        return newState;
    },
    [actions.SWAP_ACTIVE_SPECIALIZATIONS]: (state, action) => {
        // Set the minor traits from swapping two specializations
        const newState = state.slice();
        for (let i = 0; i < 3; i++) {
            swapElements(newState, (action.payload.specializationLine1 * 3) + i, (action.payload.specializationLine2 * 3) + i);
        }
        return newState;
    },
    [actions.WIPE_ACTIVE_SPECIALIZATION]: (state, action) => {
        // Wipe the minor traits from an individual specialization
        const newState = state.slice();
        const pos = action.payload.specializationLine * 3;
        for (let i = 0; i < 3; i++ ) {
            delete newState[pos + i];
        }
        return newState;
    },
    [actions.WIPE_ALL_ACTIVE_SPECIALIZATIONS]: () =>
        // Wipe all the minor traits
        []
}, []);

/** Reducer for active/selected major traits as ids. */
export const activeMajorTraits = handleActions({
    [actions.SET_MAJOR_TRAIT]: (state, action) => {
        // Set an individual major trait
        const newState = state.slice();
        newState[(action.payload.specializationLine * 3) + action.payload.traitTier - 1] = action.payload.traitId;
        return newState;
    },
    [actions.SWAP_ACTIVE_SPECIALIZATIONS]: (state, action) => {
        // Set the major traits from swapping two specializations
        const newState = state.slice();
        for (let i = 0; i < 3; i++) {
            swapElements(newState, (action.payload.specializationLine1 * 3) + i, (action.payload.specializationLine2 * 3) + i);
        }
        return newState;
    },
    [actions.WIPE_ACTIVE_TRAITS]: (state, action) => {
        // Wipe the major traits of an individual specialization line
        const newState = state.slice();
        const specializationLines = action.payload.specializationLine !== undefined && action.payload.specializationLine !== null ? [action.payload.specializationLine] : [0, 1, 2];
        for (let line of specializationLines) {
            for (let i = 0; i < 3; i++) {
                delete newState[(line * 3) + i];
            }
        }
        return newState;
    },
    [actions.WIPE_ALL_ACTIVE_TRAITS]: () =>
        // Wipe all the major traits
        []
}, []);

export default {
    traitIds,
    traits,
    activeMinorTraits,
    activeMajorTraits
};
