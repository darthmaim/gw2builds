'use strict';

import { createAction } from 'redux-actions';
import { createStateAwareAction, createChainedAction, createApiAction, convertToIndexed } from './utils';
import { fetchTraits, wipeActiveTraits, wipeAllActiveTraits } from './traits';

export const FETCH_SPECIALIZATIONS = 'FETCH_SPECIALIZATIONS';
export const SET_SPECIALIZATION = 'SET_SPECIALIZATION';
export const WIPE_ACTIVE_SPECIALIZATIONS = 'WIPE_ACTIVE_SPECIALIZATIONS';

/** Action to fetch the current specializations from the GW2 API. */
export const fetchSpecializations = createChainedAction(
    createApiAction(
        FETCH_SPECIALIZATIONS,
        (state, api) => api.specializations().many(state.specializationIds).then(convertToIndexed)
    ),
    fetchTraits
);

/** Action to set a specific specialization line. Params: { specializationLine, specializationId } */
export const setSpecialization = createChainedAction(
    createStateAwareAction(SET_SPECIALIZATION),
    wipeActiveTraits
);
/** Action to wipe the active specializations. Params: { } */
export const wipeActiveSpecializations = createChainedAction(
    createAction(WIPE_ACTIVE_SPECIALIZATIONS),
    wipeAllActiveTraits
);

export default {
    FETCH_SPECIALIZATIONS,
    SET_SPECIALIZATION,
    WIPE_ACTIVE_SPECIALIZATIONS,

    fetchSpecializations,
    setSpecialization,
    wipeActiveSpecializations
};
