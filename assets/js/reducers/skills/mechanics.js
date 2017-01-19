import { handleAction, handleActions } from 'redux-actions';
import * as actions from '~/actions';

export const attunements = handleAction(actions.FETCH_PROFESSION, (state, action) => {
    return action.payload.attunements || {};
}, {});

// TODO: remove the hardcoded default attunements and somehow set them after FETCH_PROFESSION...
const DEFAULT_ATTUNEMENTS = ['Fire', 'Fire', 'Fire', 'Fire'];

export const activeAttunements = handleActions({
    [actions.SET_ATTUNEMENT]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.attunement;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => DEFAULT_ATTUNEMENTS,
    [actions.SET_SELECTED_PROFESSION]: () => DEFAULT_ATTUNEMENTS
}, DEFAULT_ATTUNEMENTS);

export default {
    activeAttunements,
    attunements
};
