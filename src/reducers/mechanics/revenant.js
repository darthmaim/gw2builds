import { handleActions } from 'redux-actions';
import * as actions from '../../actions';
import { swapElements } from '../utils';

export const selectedRevenantLegendIds = handleActions({
    [actions.SET_SELECTED_REVENANT_LEGEND_ID]: (state, action) => {
        // Set an individual legend
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.legendId;
        return newState;
    },
    [actions.SWAP_SELECTED_REVENANT_LEGEND_IDS]: (state) => {
        // Swap two legends with each other
        const newState = state.slice();
        return swapElements(newState, 0, 1);
    },
    [actions.WIPE_SELECTED_REVENANT_LEGEND_ID]: (state, action) => {
        // Wipe a legend
        const newState = state.slice();
        newState[action.payload.slotId] = null;
        return newState;
    },

    // Wipe all
    [actions.WIPE_ALL_SELECTED_REVENANT_LEGEND_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    selectedRevenantLegendIds
};
