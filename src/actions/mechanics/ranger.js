import { createAction } from 'redux-actions';

export const SET_SELECTED_RANGER_PET_ID = 'SET_SELECTED_RANGER_PET_ID';
export const SWAP_SELECTED_RANGER_PET_IDS = 'SWAP_SELECTED_RANGER_PET_IDS';
export const WIPE_SELECTED_RANGER_PET_ID = 'WIPE_SELECTED_RANGER_PET_ID';
export const WIPE_ALL_SELECTED_RANGER_PET_IDS = 'WIPE_ALL_SELECTED_RANGER_PET_IDS';

/** Action to set a specific ranger pet id. Params: { slotId, petId } */
export const setSelectedRangerPetId = createAction(SET_SELECTED_RANGER_PET_ID);

/** Action to swap two set ranger pets with each other. Params: { slotId1, slotId2 } */
export const swapSelectedRangerPetIds = createAction(SWAP_SELECTED_RANGER_PET_IDS);

/** Action to wipe a selected ranger pet. Params: { slotId } */
export const wipeSelectedRangerPetId = createAction(WIPE_SELECTED_RANGER_PET_ID);

/** Action to wipe all the selected ranger pet. Params: { } */
export const wipeAllSelectedRangerPetIds = createAction(WIPE_ALL_SELECTED_RANGER_PET_IDS);

export default {
    SET_SELECTED_RANGER_PET_ID,
    SWAP_SELECTED_RANGER_PET_IDS,
    WIPE_SELECTED_RANGER_PET_ID,
    WIPE_ALL_SELECTED_RANGER_PET_IDS,

    setSelectedRangerPetId,
    swapSelectedRangerPetIds,
    wipeSelectedRangerPetId,
    wipeAllSelectedRangerPetIds
};
