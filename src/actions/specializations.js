import { createAction } from 'redux-actions';
import { createChainedAction, createApiAction, convertToIndexed } from './utils';
import { fetchAvailableTraits, wipeSelectedTraitIds, wipeAllSelectedTraitIds } from './traits';

export const FETCH_AVAILABLE_SPECIALIZATIONS = 'FETCH_AVAILABLE_SPECIALIZATIONS';
export const SET_SELECTED_SPECIALIZATION_ID = 'SET_SELECTED_SPECIALIZATION_ID';
export const SWAP_SELECTED_SPECIALIZATION_IDS = 'SWAP_SELECTED_SPECIALIZATION_IDS';
export const WIPE_SELECTED_SPECIALIZATION_ID = 'WIPE_SELECTED_SPECIALIZATION_ID';
export const WIPE_ALL_SELECTED_SPECIALIZATION_IDS = 'WIPE_ALL_SELECTED_SPECIALIZATION_IDS';

/** Action to fetch the current specializations from the GW2 API. */
export const fetchAvailableSpecializations = createChainedAction(
    createApiAction(
        FETCH_AVAILABLE_SPECIALIZATIONS,
        (state, api) => api.specializations().many(state.availableSpecializationIds).then(convertToIndexed)
    ),
    fetchAvailableTraits
);

/** Action to set a selected specialization line. Params: { specializationLine, specializationId, specializations } */
export const setSelectedSpecializationId = createChainedAction(
    createAction(SET_SELECTED_SPECIALIZATION_ID),
    wipeSelectedTraitIds
);

/** Action to swap two selected specializations with each other. Params: { specializationLine1, specializationLine2 } */
export const swapSelectedSpecializationIds = createAction(SWAP_SELECTED_SPECIALIZATION_IDS);

/** Action to wipe a selected specialization. Params: { specializationLine } */
export const wipeSelectedSpecializationId = createChainedAction(
    createAction(WIPE_SELECTED_SPECIALIZATION_ID),
    wipeSelectedTraitIds
);

/** Action to wipe the selected specializations. Params: { } */
export const wipeAllSelectedSpecializationIds = createChainedAction(
    createAction(WIPE_ALL_SELECTED_SPECIALIZATION_IDS),
    wipeAllSelectedTraitIds
);

export default {
    FETCH_AVAILABLE_SPECIALIZATIONS,
    SET_SELECTED_SPECIALIZATION_ID,
    SWAP_SELECTED_SPECIALIZATION_IDS,
    WIPE_SELECTED_SPECIALIZATION_ID,
    WIPE_ALL_SELECTED_SPECIALIZATION_IDS,

    fetchAvailableSpecializations,
    setSelectedSpecializationId,
    swapSelectedSpecializationIds,
    wipeSelectedSpecializationId,
    wipeAllSelectedSpecializationIds
};
