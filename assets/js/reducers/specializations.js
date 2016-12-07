'use strict';

import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction } from './utils';

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
    [actions.WIPE_ACTIVE_SPECIALIZATIONS]: () =>
        // Wipe all the specializations
        []
}, []);

export default {
    specializationIds,
    specializations,
    activeSpecializations
};
