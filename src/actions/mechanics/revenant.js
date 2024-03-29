import { createAction } from 'redux-actions';

export const SET_SELECTED_REVENANT_LEGEND_ID = 'SET_SELECTED_REVENANT_LEGEND_ID';
export const SWAP_SELECTED_REVENANT_LEGEND_IDS = 'SWAP_SELECTED_REVENANT_LEGEND_IDS';
export const WIPE_SELECTED_REVENANT_LEGEND_ID = 'WIPE_SELECTED_REVENANT_LEGEND_ID';
export const WIPE_ALL_SELECTED_REVENANT_LEGEND_IDS = 'WIPE_ALL_SELECTED_REVENANT_LEGEND_IDS';

/** Action to set a selected revenant legend id. Params: { slotId, legendId } */
export const setSelectedRevenantLegendId = createAction(SET_SELECTED_REVENANT_LEGEND_ID);

/** Action to swap two selected revenant legends with each other. Params: { } */
export const swapSelectedRevenantLegendIds = createAction(SWAP_SELECTED_REVENANT_LEGEND_IDS);

/** Action to wipe a selected revenant legend. Params: { slotId } */
export const wipeSelectedRevenantLegendId = createAction(WIPE_SELECTED_REVENANT_LEGEND_ID);

/** Action to wipe all the selected revenant legends. Params: { } */
export const wipeAllSelectedRevenantLegendIds = createAction(WIPE_ALL_SELECTED_REVENANT_LEGEND_IDS);

export default {
    SET_SELECTED_REVENANT_LEGEND_ID,
    SWAP_SELECTED_REVENANT_LEGEND_IDS,
    WIPE_SELECTED_REVENANT_LEGEND_ID,
    WIPE_ALL_SELECTED_REVENANT_LEGEND_IDS,

    setSelectedRevenantLegendId,
    swapSelectedRevenantLegendIds,
    wipeSelectedRevenantLegendId,
    wipeAllSelectedRevenantLegendIds
};
