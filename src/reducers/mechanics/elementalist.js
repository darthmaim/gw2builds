import { handleActions } from 'redux-actions';
import * as actions from '~/actions';

export const selectedElementalistAttunementId = handleActions({
    // Set the attunement
    [actions.SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID]: (state, action) => action.payload.attunementId,

    // Wipe the attunement
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export const selectedWeaverPreviousAttunementId = handleActions({
    // Set the attunement
    [actions.SET_SELECTED_WEAVER_PREVIOUS_ATTUNEMENT_ID]: (state, action) => action.payload.attunementId,

    // Wipe the attunement
    [actions.SET_SELECTED_PROFESSION]: () => []
    // TODO: Also wipe the attunement whenever the build swaps away from weaver
}, []);

export default {
    selectedElementalistAttunementId,
    selectedWeaverPreviousAttunementId
};
