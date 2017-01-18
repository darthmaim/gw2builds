import pickBy from 'lodash/fp/pickBy';
import { createSelector } from 'reselect';

const getWeapons = state => state.weapons;
const getActiveWeaponSet = state => state.activeWeaponSet;
const getActiveMainhandWeapons = state => state.activeMainhandWeapons;
const getActiveOffhandWeapons = state => state.activeOffhandWeapons;

const hasMainhandSkill = weapon => weapon.skills.some(skill => skill.slot === 'Weapon_1');
const hasOffhandSkill = weapon => weapon.skills.some(skill => skill.slot === 'Weapon_5');
const is2Handed = (weapon, name) => ['Axe', 'Dagger', 'Mace', 'Pistol', 'Sword', 'Scepter', 'Focus', 'Shield', 'Torch', 'Warhorn'].indexOf(name) === -1;
const isAquatic = (weapon, name) => ['Spear', 'Trident', 'Speargun'].indexOf(name) !== -1;
const isNotAquatic = (weapon, name) => !isAquatic(weapon, name);

export const getWeaponsBySet = createSelector(
    [getWeapons, getActiveWeaponSet],
    (weapons, set) => pickBy((set === 0 || set === 1) ? isNotAquatic : isAquatic)(weapons)
);

export const getMainhandWeapons = createSelector(
    [getWeaponsBySet],
    weapons => pickBy(hasMainhandSkill)(weapons)
);

export const getOffhandWeapons = createSelector(
    [getWeaponsBySet],
    weapons => pickBy((weapon, name) => hasOffhandSkill(weapon) && !is2Handed(weapon, name))(weapons)
);

export const getActiveMainhand = createSelector(
    [getActiveMainhandWeapons, getActiveWeaponSet],
    (weapons, set) => weapons[set]
);

export const getActiveOffhand = createSelector(
    [getActiveOffhandWeapons, getActiveWeaponSet],
    (weapons, set) => weapons[set]
);

export const getIsTwoHandedActive = createSelector(
    [getActiveMainhand],
    weapon => is2Handed(null, weapon)
);

export default {
    getMainhandWeapons, getOffhandWeapons, getActiveMainhand, getActiveOffhand, getIsTwoHandedActive
};
