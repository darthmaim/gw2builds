import { handleActions } from 'redux-actions';
import * as actions from '~/actions';
import { handleSimpleAction } from '~/reducers/utils';

/** Reducer for the available weapons for the selected profession */
export const weapons = handleSimpleAction(actions.FETCH_PROFESSION, {}, 'weapons');

export const activeWeaponSet = handleActions({
    [actions.SET_WEAPON_SET]: (state, action) => action.payload.activeWeaponSet,
    [actions.WIPE_ALL_WEAPONS]: () => 0,
    [actions.SET_SELECTED_PROFESSION]: () => 0
}, 0);

export const activeMainhandWeapons = handleActions({
    [actions.SET_MAINHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null],
    [actions.SET_SELECTED_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);

export const activeOffhandWeapons = handleActions({
    [actions.SET_OFFHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null],
    [actions.SET_SELECTED_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);

export default {
    weapons,
    activeWeaponSet,
    activeMainhandWeapons,
    activeOffhandWeapons
};
