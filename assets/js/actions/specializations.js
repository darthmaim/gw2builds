'use strict';

import { createAction } from 'redux-actions';
import { createChainedAction, createApiAction, convertToIndexed } from './utils';
import { fetchTraits, wipeActiveTraits, wipeAllActiveTraits } from './traits';

export const FETCH_SPECIALIZATIONS = 'FETCH_SPECIALIZATIONS';
export const SET_SPECIALIZATION = 'SET_SPECIALIZATION';
export const SWAP_ACTIVE_SPECIALIZATIONS = 'SWAP_ACTIVE_SPECIALIZATIONS';
export const WIPE_ACTIVE_SPECIALIZATION = 'WIPE_ACTIVE_SPECIALIZATION';
export const WIPE_ALL_ACTIVE_SPECIALIZATIONS = 'WIPE_ALL_ACTIVE_SPECIALIZATIONS';

/** Action to fetch the current specializations from the GW2 API. */
export const fetchSpecializations = createChainedAction(
    createApiAction(
        FETCH_SPECIALIZATIONS,
        (state, api) => api.specializations().many(state.specializationIds).then(convertToIndexed)
    ),
    fetchTraits
);

/** Action to set a specific specialization line. Params: { specializationLine, specializationId, specializations } */
export const setSpecialization = createChainedAction(
    createAction(SET_SPECIALIZATION),
    wipeActiveTraits
);

/** Action to swap two set specializations with each other. Params: { specializationLine1, specializationLine2 } */
export const swapSpecializations = createAction(SWAP_ACTIVE_SPECIALIZATIONS);

/** Action to wipe an active specialization. Params: { specializationLine } */
export const wipeActiveSpecialization = createChainedAction(
    createAction(WIPE_ACTIVE_SPECIALIZATION),
    wipeActiveTraits
);

/** Action to wipe the active specializations. Params: { } */
export const wipeAllActiveSpecializations = createChainedAction(
    createAction(WIPE_ALL_ACTIVE_SPECIALIZATIONS),
    wipeAllActiveTraits
);

export default {
    FETCH_SPECIALIZATIONS,
    SET_SPECIALIZATION,
    SWAP_ACTIVE_SPECIALIZATIONS,
    WIPE_ACTIVE_SPECIALIZATION,
    WIPE_ALL_ACTIVE_SPECIALIZATIONS,

    fetchSpecializations,
    setSpecialization,
    swapSpecializations,
    wipeActiveSpecialization,
    wipeAllActiveSpecializations
};
