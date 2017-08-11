import pickBy from 'lodash/fp/pickBy';
import { createSelector } from 'reselect';

const getWeapons = state => state.weapons;
const getActiveWeaponSet = state => state.activeWeaponSet;
const getActiveMainhandWeapons = state => state.activeMainhandWeapons;
const getActiveOffhandWeapons = state => state.activeOffhandWeapons;
const getProfession = state => state.profession;

const hasFlag = (weapon, flag) => weapon && weapon.flags.indexOf(flag) !== -1;

export const getWeaponsBySet = createSelector(
    [getWeapons, getActiveWeaponSet],
    (weapons, set) => pickBy((set === 0 || set === 1)
        ? (weapon) => !hasFlag(weapon, 'Aquatic')
        : (weapon) => hasFlag(weapon, 'Aquatic')
    )(weapons)
);

export const getMainhandWeapons = createSelector(
    [getWeaponsBySet],
    weapons => pickBy((weapon) => hasFlag(weapon, 'Mainhand') || hasFlag(weapon, 'TwoHand'))(weapons)
);

export const getOffhandWeapons = createSelector(
    [getWeaponsBySet],
    weapons => pickBy((weapon) => hasFlag(weapon, 'Offhand'))(weapons)
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
    [getWeapons, getActiveMainhand],
    (weapons, active)=> hasFlag(weapons[active], 'TwoHand')
);

export const getHasMultipleWeaponsets = createSelector(
    [getProfession],
    profession => profession !== 'Elementalist' && profession !== 'Engineer'
);

export default {
    getMainhandWeapons, getOffhandWeapons, getActiveMainhand, getActiveOffhand, getIsTwoHandedActive, getHasMultipleWeaponsets
};
