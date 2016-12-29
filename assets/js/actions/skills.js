'use strict';

import { createAction } from 'redux-actions';

export const SET_WEAPON_SET = 'SET_WEAPON_SET';

/** Action to swap two set specializations with each other. Params: { specializationLine1, specializationLine2 } */
export const setWeaponSet = createAction(SET_WEAPON_SET);

export default {
    SET_WEAPON_SET,

    setWeaponSet,
};
