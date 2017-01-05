'use strict';

import { createAction } from 'redux-actions';
import { createApiAction, convertToIndexed } from './utils';

export const SET_WEAPON_SET = 'SET_WEAPON_SET';

export const SET_MAINHAND_WEAPON = 'SET_MAINHAND_WEAPON';
export const SET_OFFHAND_WEAPON = 'SET_OFFHAND_WEAPON';
export const WIPE_ALL_WEAPONS = 'WIPE_ALL_WEAPONS';

export const SET_MECHANIC = 'SET_MECHANIC';

export const FETCH_SKILLS = 'FETCH_SKILLS';

/** Action to swap two set specializations with each other. Params: { specializationLine1, specializationLine2 } */
export const setWeaponSet = createAction(SET_WEAPON_SET);

export const setMainhandWeapon = createAction(SET_MAINHAND_WEAPON);
export const setOffhandWeapon = createAction(SET_OFFHAND_WEAPON);
export const wipeAllWeapons = createAction(WIPE_ALL_WEAPONS);

export const setMechanic = createAction(SET_MECHANIC);

export const fetchSkills = createApiAction(
    FETCH_SKILLS,
    (state, api) => api.skills().many(state.skillIds).then(convertToIndexed)
);

export default {
    SET_WEAPON_SET,

    SET_MAINHAND_WEAPON,
    SET_OFFHAND_WEAPON,
    WIPE_ALL_WEAPONS,

    SET_MECHANIC,

    FETCH_SKILLS,

    setWeaponSet,

    setMainhandWeapon,
    setOffhandWeapon,
    wipeAllWeapons,

    setMechanic,

    fetchSkills
};
