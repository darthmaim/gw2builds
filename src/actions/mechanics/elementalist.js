import { createAction } from 'redux-actions';

export const SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID = 'SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID';
export const SET_SELECTED_WEAVER_PREVIOUS_ATTUNEMENT_ID = 'SET_SELECTED_WEAVER_PREVIOUS_ATTUNEMENT_ID';

/** Action to set a specific elementalist attunement id. Params: { attunementId } */
export const setSelectedElementalistAttunementId = createAction(SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID);

/** Action to set a specific weaver previous attunement id. Params: { attunementId } */
export const setSelectedWeaverPreviousAttunementId = createAction(SET_SELECTED_WEAVER_PREVIOUS_ATTUNEMENT_ID);

export default {
    SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID,
    SET_SELECTED_WEAVER_PREVIOUS_ATTUNEMENT_ID,

    setSelectedElementalistAttunementId,
    setSelectedWeaverPreviousAttunementId,
};
