import pickBy from 'lodash/fp/pickBy';
import { createSelector } from 'reselect';

const getAvailableWeaponObjects = state => state.availableWeaponObjects;
const getActiveWeaponSet = state => state.activeWeaponSet;
const getSelectedMainhandWeapons = state => state.selectedMainhandWeaponIds;
const getSelectedOffhandWeapons = state => state.selectedOffhandWeaponIds;

const hasMainhandSkill = weapon => weapon.skills.some(skill => skill.slot === 'Weapon_1');
const hasOffhandSkill = weapon => weapon.skills.some(skill => skill.slot === 'Weapon_5');
const is2Handed = (weapon, name) => ['Axe', 'Dagger', 'Mace', 'Pistol', 'Sword', 'Scepter', 'Focus', 'Shield', 'Torch', 'Warhorn'].indexOf(name) === -1;
const isAquatic = (weapon, name) => ['Spear', 'Trident', 'Speargun'].indexOf(name) !== -1;
const isNotAquatic = (weapon, name) => !isAquatic(weapon, name);

export const getWeaponsBySet = createSelector(
    [getAvailableWeaponObjects, getActiveWeaponSet],
    (weapons, set) => pickBy((set === 0 || set === 1) ? isNotAquatic : isAquatic)(weapons)
);

export const getAvailableMainhandWeaponObjects = createSelector(
    [getWeaponsBySet],
    weapons => pickBy(hasMainhandSkill)(weapons)
);

export const getAvailableOffhandWeaponObjects = createSelector(
    [getWeaponsBySet],
    weapons => pickBy((weapon, name) => hasOffhandSkill(weapon) && !is2Handed(weapon, name))(weapons)
);

export const getActiveMainhandWeaponObject = createSelector(
    [getSelectedMainhandWeapons, getActiveWeaponSet],
    (weapons, set) => weapons[set]
);

export const getActiveOffhandWeaponObject = createSelector(
    [getSelectedOffhandWeapons, getActiveWeaponSet],
    (weapons, set) => weapons[set]
);

export const getIsTwoHandedActive = createSelector(
    [getActiveMainhandWeaponObject],
    weapon => is2Handed(null, weapon)
);

export default {
    getAvailableMainhandWeaponObjects, getAvailableOffhandWeaponObjects, getActiveMainhandWeaponObject, getActiveOffhandWeaponObject, getIsTwoHandedActive
};
