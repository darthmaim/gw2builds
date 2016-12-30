'use strict';

import { handleActions, handleAction } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction } from './utils';
import forEach  from 'lodash/forEach'

/** Reducer for the available weapons for the selected profession */
export const weapons = handleSimpleAction(actions.FETCH_PROFESSION, {}, 'weapons');

export const activeWeaponSet = handleSimpleAction(actions.SET_WEAPON_SET, 0, 'activeWeaponSet');

export const activeMainhandWeapons = handleActions({
    [actions.SET_MAINHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.getState().activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null],
    [actions.SET_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);


export const activeOffhandWeapons = handleActions({
    [actions.SET_OFFHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.getState().activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null],
    [actions.SET_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);

/** Reducer for the available skill ids for the current profession. */
export const skillIds = handleAction(actions.FETCH_PROFESSION, (state, action) => {
    const skills = [];

    forEach(action.payload.weapons, weapon => {
        forEach(weapon.skills, skill => skills.push(skill.id));
    });

    forEach(action.payload.training, training => {
        forEach(training.track, skill => skill.type === 'Skill' && skills.push(skill.skill_id));
    });

    return skills;
}, []);

export const skills = handleSimpleAction(actions.FETCH_SKILLS, {});

export default {
    weapons,
    activeWeaponSet,
    activeMainhandWeapons,
    activeOffhandWeapons,
    skillIds
};
