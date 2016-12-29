'use strict';

import { createAction } from 'redux-actions';
import { createStateAwareAction } from './utils';

export const SET_WEAPON_SET = 'SET_WEAPON_SET';

export const SET_MAINHAND_WEAPON = 'SET_MAINHAND_WEAPON';
export const SET_OFFHAND_WEAPON = 'SET_OFFHAND_WEAPON';
export const WIPE_ALL_WEAPONS = 'WIPE_ALL_WEAPONS';

/** Action to swap two set specializations with each other. Params: { specializationLine1, specializationLine2 } */
export const setWeaponSet = createAction(SET_WEAPON_SET);

export const setMainhandWeapon = createStateAwareAction(SET_MAINHAND_WEAPON);
export const setOffhandWeapon = createStateAwareAction(SET_OFFHAND_WEAPON);
export const wipeAllWeapons = createAction(WIPE_ALL_WEAPONS);

export default {
    SET_WEAPON_SET,
    SET_MAINHAND_WEAPON,
    SET_OFFHAND_WEAPON,
    WIPE_ALL_WEAPONS,

    setWeaponSet,
    setMainhandWeapon,
    setOffhandWeapon,
    wipeAllWeapons
};
