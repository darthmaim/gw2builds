'use strict';

import { handleActions, handleAction } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction, swapElements } from './utils';

/** Reducer for the available weapons for the selected profession */
export const weapons = handleSimpleAction(actions.FETCH_PROFESSION, {}, 'weapons');

export const activeWeaponSet = handleSimpleAction(actions.SET_WEAPON_SET, 0, 'activeWeaponSet');

export const activeMainhandWeapons = handleActions({
    [actions.SET_MAINHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.getState().activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null]
}, [null, null, null, null]);


export const activeOffhandWeapons = handleActions({
    [actions.SET_OFFHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.getState().activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null]
}, [null, null, null, null]);

export default {
    weapons,
    activeWeaponSet,
    activeMainhandWeapons,
    activeOffhandWeapons
};
