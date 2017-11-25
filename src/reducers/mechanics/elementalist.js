import { handleAction, handleActions } from 'redux-actions';
import keyBy from 'lodash/keyBy'
import * as actions from '../../actions';

/** Reducer for the available elementalist attunement objects. */
export const availableElementalistAttunementObjects = handleAction(actions.FETCH_PROFESSION,
    (state, action) => keyBy(action.payload.skills.filter(
        (skill) => skill.type === 'Profession'
    ), 'attunement') || {}, {});

/** Reducer for the selected elementalist attunement id. */
export const selectedElementalistAttunementId = handleActions({
    // Set the attunement
    [actions.SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID]: (state, action) => action.payload.attunementId,

    // Reset the attunement
    [actions.SET_SELECTED_PROFESSION]: () => 'Fire'
}, 'Fire');

/** Reducer for the selected weaver previous attunement id. */
export const selectedWeaverPreviousAttunementId = handleActions({
    // Set the attunement
    [actions.SET_SELECTED_WEAVER_PREVIOUS_ATTUNEMENT_ID]: (state, action) => action.payload.attunementId,

    // Reset the attunement
    [actions.SET_SELECTED_PROFESSION]: () => 'Fire'
    // TODO: Also wipe the attunement whenever the build swaps away from weaver
}, 'Fire');

export default {
    availableElementalistAttunementObjects,
    selectedElementalistAttunementId,
    selectedWeaverPreviousAttunementId
};
