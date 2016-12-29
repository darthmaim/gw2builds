'use strict';

import _ from 'lodash';
import fp from 'lodash/fp';
import { createSelector } from 'reselect';

const getWeapons = state => state.weapons;
const getActiveWeaponSet = state => state.activeWeaponSet;

const hasMainhandSkill = weapon => weapon.skills.some(skill => skill.slot === 'Weapon_1');
const hasOffhandSkill = weapon => weapon.skills.some(skill => skill.slot === 'Weapon_5');
const is2Handed = (weapon, name) => ['Axe', 'Dagger', 'Mace', 'Pistol', 'Sword', 'Scepter', 'Focus', 'Shield', 'Torch', 'Warhorn'].indexOf(name) === -1;
const isAquatic = (weapon, name) => ['Spear', 'Trident', 'Speargun'].indexOf(name) !== -1;
const isNotAquatic = (weapon, name) => !isAquatic(weapon, name);

export const getWeaponsBySet = createSelector(
    [getWeapons, getActiveWeaponSet],
    (weapons, set) => _.pickBy(weapons, (set === 0 || set === 1) ? isNotAquatic : isAquatic)
);

export const getMainhandWeapons = createSelector(
    [getWeaponsBySet],
    weapons => _.pickBy(weapons, hasMainhandSkill)
);

export const getOffhandWeapons = createSelector(
    [getWeaponsBySet],
    weapons => _.pickBy(weapons, (weapon, name) => hasOffhandSkill(weapon) && !is2Handed(weapon, name))
);

export default {
    getMainhandWeapons, getOffhandWeapons
};
