import pickBy from 'lodash/fp/pickBy';
import { createSelector } from 'reselect';

const getAvailableWeaponObjects = state => state.availableWeaponObjects;
const getActiveWeaponSet = state => state.activeWeaponSet;
const getSelectedMainhandWeaponIds = state => state.selectedMainhandWeaponIds;
const getSelectedOffhandWeaponIds = state => state.selectedOffhandWeaponIds;
// const getSelectedProfession = state => state.selectedProfession;

const hasFlag = (weapon, flag) => weapon
    ? weapon.flags.indexOf(flag) !== -1
    : false;

export const getWeaponsBySet = createSelector(
    [getAvailableWeaponObjects, getActiveWeaponSet],
    (weapons, set) => pickBy((set === 0 || set === 1)
        ? (weapon) => !hasFlag(weapon, 'Aquatic')
        : (weapon) => hasFlag(weapon, 'Aquatic')
    )(weapons)
);

export const getAvailableMainhandWeaponObjects = createSelector(
    [getWeaponsBySet],
    weapons => pickBy((weapon) => hasFlag(weapon, 'Mainhand') || hasFlag(weapon, 'TwoHand'))(weapons)
);

export const getAvailableOffhandWeaponObjects = createSelector(
    [getWeaponsBySet],
    weapons => pickBy((weapon) => hasFlag(weapon, 'Offhand'))(weapons)
);

export const getActiveMainhandWeaponId = createSelector(
    [getSelectedMainhandWeaponIds, getActiveWeaponSet],
    (weapons, set) => weapons[set]
);

export const getActiveOffhandWeaponId = createSelector(
    [getSelectedOffhandWeaponIds, getActiveWeaponSet],
    (weapons, set) => weapons[set]
);

export const getIsTwoHandedActive = createSelector(
    [getAvailableMainhandWeaponObjects, getActiveMainhandWeaponId],
    (weapons, active)=> hasFlag(weapons[active], 'TwoHand')
);

export default {
    getAvailableMainhandWeaponObjects,
    getAvailableOffhandWeaponObjects,
    getActiveMainhandWeaponId,
    getActiveOffhandWeaponId,
    getIsTwoHandedActive
};
