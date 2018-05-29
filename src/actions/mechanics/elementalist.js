import { createAction } from 'redux-actions';
import { getSelectedEliteSpecializationId } from '../../selectors/specializations';

export const SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID = 'SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID';

/** Action to set a selected elementalist attunement id. Params: { attunementId, previousAttunementId? } */
export const setSelectedElementalistAttunementId =
    (...args) => (dispatch, getState) => dispatch(createAction(
        SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID,
        (payload) => {
            const state = getState();

            return {
                isWeaver: getSelectedEliteSpecializationId(state) === 56,
                previousAttunementId: state.selectedElementalistAttunementId,
                ...payload
            }
        }
    )(...args));

export default {
    SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID,

    setSelectedElementalistAttunementId,
};
