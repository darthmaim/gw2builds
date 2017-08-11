import { createAction } from 'redux-actions';
import { createApiAction, convertToIndexed } from './utils';

export const FETCH_AVAILABLE_TRAITS = 'FETCH_AVAILABLE_TRAITS';
export const SET_SELECTED_MAJOR_TRAIT_ID = 'SET_SELECTED_MAJOR_TRAIT_ID';
export const WIPE_SELECTED_TRAIT_IDS = 'WIPE_SELECTED_TRAIT_IDS';
export const WIPE_ALL_SELECTED_TRAIT_IDS = 'WIPE_ALL_SELECTED_TRAIT_IDS';

/** Action to fetch the current traits from the GW2 API. */
export const fetchAvailableTraits = createApiAction(
    FETCH_AVAILABLE_TRAITS,
    (state, api) => api.traits().many(state.availableTraitIds).then(convertToIndexed)
);

/** Action to set a specific major trait in a trait tier of a specialization line. Params: { specializationLine, traitTier, traitId } */
export const setSelectedMajorTraitId = createAction(SET_SELECTED_MAJOR_TRAIT_ID);

/** Action to wipe the selected traits of a specific specialization line. Params: { specializationLine } */
export const wipeSelectedTraitIds = createAction(WIPE_SELECTED_TRAIT_IDS);

/** Action to wipe all selected traits of all selected specialization lines. Params: {} */
export const wipeAllSelectedTraitIds = createAction(WIPE_ALL_SELECTED_TRAIT_IDS);

export default {
    FETCH_AVAILABLE_TRAITS,
    SET_SELECTED_MAJOR_TRAIT_ID,
    WIPE_SELECTED_TRAIT_IDS,
    WIPE_ALL_SELECTED_TRAIT_IDS,

    fetchAvailableTraits,
    setSelectedMajorTraitId,
    wipeSelectedTraitIds,
    wipeAllSelectedTraitIds
};
