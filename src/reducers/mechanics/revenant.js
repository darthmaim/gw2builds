import { handleActions } from 'redux-actions';
import * as actions from '../../actions';
import { swapElements, handleSimpleAction } from '../utils';

/** Reducer for the selected revenant legends ids. */
export const selectedRevenantLegendIds = handleActions({
    // Set a legend
    [actions.SET_SELECTED_REVENANT_LEGEND_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.legendId;

        const otherSlotId = (action.payload.slotId + 1) % 2;
        if(state[otherSlotId] === action.payload.legendId) {
            newState[otherSlotId] = state[action.payload.slotId];
        }

        return newState;
    },
    // Swap two legends with each other
    [actions.SWAP_SELECTED_REVENANT_LEGEND_IDS]: (state) => {
        const newState = state.slice();
        return swapElements(newState, 0, 1);
    },
    // Reset a legend
    [actions.WIPE_SELECTED_REVENANT_LEGEND_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    },

    // Reset all legends
    [actions.WIPE_ALL_SELECTED_REVENANT_LEGEND_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export const availableRevenantLegends = handleSimpleAction(actions.FETCH_AVAILABLE_LEGENDS, {});

export const availableRevenantSkillIds = handleActions({
    [actions.FETCH_AVAILABLE_LEGENDS]: (state, action) =>
        [].concat.apply([], Object.values(action.payload).map(
            (legend) => [legend.swap, legend.heal, legend.elite, ...legend.utilities]
        ))
}, []);

export default {
    selectedRevenantLegendIds,
    availableRevenantLegends,
    availableRevenantSkillIds
};
