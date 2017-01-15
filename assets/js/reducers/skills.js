'use strict';

import { handleActions, handleAction } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction } from './utils';
import forEach  from 'lodash/forEach'

/** Reducer for the available weapons for the selected profession */
export const weapons = handleSimpleAction(actions.FETCH_PROFESSION, {}, 'weapons');

export const activeWeaponSet = handleActions({
    [actions.SET_WEAPON_SET]: (state, action) => action.payload.activeWeaponSet,
    [actions.WIPE_ALL_WEAPONS]: () => 0,
    [actions.SET_PROFESSION]: () => 0,
}, 0);

export const activeMainhandWeapons = handleActions({
    [actions.SET_MAINHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null],
    [actions.SET_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);


export const activeOffhandWeapons = handleActions({
    [actions.SET_OFFHAND_WEAPON]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.weaponId;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [null, null, null, null],
    [actions.SET_PROFESSION]: () => [null, null, null, null]
}, [null, null, null, null]);


export const activeMechanics = handleActions({
    [actions.SET_MECHANIC]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.activeWeaponSet] = action.payload.mechanic;
        return newState;
    },
    [actions.WIPE_ALL_WEAPONS]: () => [0, 0, 0, 0],
    [actions.SET_PROFESSION]: () => [0, 0, 0, 0]
}, [0, 0, 0, 0]);


/** Reducer for the available skill ids for the current profession. */
export const skillIds = handleAction(actions.FETCH_PROFESSION, (state, action) => {
    const skills = [];

    forEach(action.payload.weapons, weapon => {
        forEach(weapon.skills, skill => skills.push(skill.id));
    });

    forEach(action.payload.training, training => {
        forEach(training.track, skill => skill.type === 'Skill' && skills.push(skill.skill_id));
    });

    if (action.payload.id === 'Elementalist') {
        forEach(action.payload.attunements, attunement => skills.push(attunement.swap));
    }

    skills.push(action.payload.healing_skill_id);

    return skills;
}, []);

export const skills = handleSimpleAction(actions.FETCH_SKILLS, {});

export default {
    weapons,
    activeWeaponSet,
    activeMainhandWeapons,
    activeOffhandWeapons,
    activeMechanics,
    skillIds
};
