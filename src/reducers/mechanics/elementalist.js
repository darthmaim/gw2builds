import { handleActions } from 'redux-actions';
import * as actions from '../../actions';

/** Reducer for the selected elementalist attunement id. */
export const selectedElementalistAttunementId = handleActions({
    // Set the attunement
    [actions.SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID]: (state, action) => action.payload.attunementId,

    // Reset the attunement
    [actions.SET_SELECTED_PROFESSION]: () => 0
}, 0);

/** Reducer for the selected weaver previous attunement id. */
export const selectedWeaverPreviousAttunementId = handleActions({
    // Set the attunement
    [actions.SET_SELECTED_WEAVER_PREVIOUS_ATTUNEMENT_ID]: (state, action) => action.payload.attunementId,

    // Reset the attunement
    [actions.SET_SELECTED_PROFESSION]: () => 0
    // TODO: Also wipe the attunement whenever the build swaps away from weaver
}, 0);

export default {
    selectedElementalistAttunementId,
    selectedWeaverPreviousAttunementId
};
