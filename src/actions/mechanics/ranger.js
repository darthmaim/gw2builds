import { createAction } from 'redux-actions';
import { convertToIndexed, createApiAction } from '../utils';

export const FETCH_AVAILABLE_RANGER_PETS = 'FETCH_AVAILABLE_RANGER_PETS';
export const SET_SELECTED_RANGER_PET_ID = 'SET_SELECTED_RANGER_PET_ID';
export const SWAP_SELECTED_RANGER_PET_IDS = 'SWAP_SELECTED_RANGER_PET_IDS';
export const WIPE_SELECTED_RANGER_PET_ID = 'WIPE_SELECTED_RANGER_PET_ID';
export const WIPE_ALL_SELECTED_RANGER_PET_IDS = 'WIPE_ALL_SELECTED_RANGER_PET_IDS';

// TODO: only run this if the current profession is ranger
export const fetchAvailableRangerPets = createApiAction(
    FETCH_AVAILABLE_RANGER_PETS,
    (state, api) => api.pets().all().then(convertToIndexed)
);

/** Action to set a selected ranger pet id. Params: { slotId, petId } */
export const setSelectedRangerPetId = createAction(SET_SELECTED_RANGER_PET_ID);

/** Action to swap two selected ranger pets with each other. Params: { slotId1, slotId2 } */
export const swapSelectedRangerPetIds = createAction(SWAP_SELECTED_RANGER_PET_IDS);

/** Action to wipe a selected ranger pet. Params: { slotId } */
export const wipeSelectedRangerPetId = createAction(WIPE_SELECTED_RANGER_PET_ID);

/** Action to wipe all the selected ranger pet. Params: { } */
export const wipeAllSelectedRangerPetIds = createAction(WIPE_ALL_SELECTED_RANGER_PET_IDS);

export default {
    FETCH_AVAILABLE_RANGER_PETS,
    SET_SELECTED_RANGER_PET_ID,
    SWAP_SELECTED_RANGER_PET_IDS,
    WIPE_SELECTED_RANGER_PET_ID,
    WIPE_ALL_SELECTED_RANGER_PET_IDS,

    fetchAvailableRangerPets,
    setSelectedRangerPetId,
    swapSelectedRangerPetIds,
    wipeSelectedRangerPetId,
    wipeAllSelectedRangerPetIds
};
