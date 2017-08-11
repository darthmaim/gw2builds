import { handleActions } from 'redux-actions';
import * as actions from '~/actions';
import { handleSimpleAction } from '~/reducers/utils';

/** Reducer for the available weapons for the selected profession */
export const availableWeaponObjects = handleSimpleAction(actions.FETCH_PROFESSION, {}, 'weapons');

export const activeWeaponSet = handleActions({
    [actions.SET_ACTIVE_WEAPON_SET]: (state, action) => action.payload.activeWeaponSet,
    [actions.WIPE_ALL_SELECTED_WEAPON_IDS]: () => 0,
    [actions.SET_SELECTED_PROFESSION]: () => 0
}, 0);

export const selectedMainhandWeaponIds = handleActions({
    [actions.SET_ACTIVE_MAINHAND_WEAPON_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_SELECTED_WEAPON_IDS]: () => [null, null, null, null],
    [actions.SET_SELECTED_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);

export const selectedOffhandWeaponIds = handleActions({
    [actions.SET_ACTIVE_OFFHAND_WEAPON_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_SELECTED_WEAPON_IDS]: () => [null, null, null, null],
    [actions.SET_SELECTED_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);

export default {
    availableWeaponObjects,
    activeWeaponSet,
    selectedMainhandWeaponIds,
    selectedOffhandWeaponIds
};
