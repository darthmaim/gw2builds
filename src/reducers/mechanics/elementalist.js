import { handleAction, handleActions } from 'redux-actions';
import sortBy from 'lodash/sortBy';
import * as actions from '../../actions';

/** Reducer for the available elementalist attunement objects. */
export const availableElementalistAttunementObjects = handleAction(actions.FETCH_PROFESSION,
    (state, action) => action.payload.id === 'Elementalist' ? sortBy(action.payload.skills.filter(
        (skill) => skill.type === 'Profession'
    ), 'slot') : [] || [], []);

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
    [actions.SET_SELECTED_ELEMENTALIST_ATTUNEMENT_ID]: (state, action) => {
        const {attunementId, previousAttunementId, isWeaver} = action.payload;

        if(!isWeaver) {
            return attunementId;
        }

        return previousAttunementId;
    },

    // Reset the attunement
    [actions.SET_SELECTED_PROFESSION]: () => 'Fire'
    // TODO: Also wipe the attunement whenever the build swaps away from weaver
}, 'Fire');

export default {
    availableElementalistAttunementObjects,
    selectedElementalistAttunementId,
    selectedWeaverPreviousAttunementId
};
