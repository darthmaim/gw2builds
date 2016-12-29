'use strict';

import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction, swapElements } from './utils';

/** Reducer for the available weapons for the selected profession */
export const weapons = handleSimpleAction(actions.FETCH_PROFESSION, {}, 'weapons');

export const activeWeaponSet = handleSimpleAction(actions.SET_WEAPON_SET, 0, 'activeWeaponSet');

export default {
    weapons,
    activeWeaponSet
};
