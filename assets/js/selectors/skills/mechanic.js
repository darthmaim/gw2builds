'use strict';

import { createSelector } from 'reselect';

const getMechanics = state => state.activeMechanics;
const getActiveWeaponSet = state => state.activeWeaponSet;

export const getActiveMechanic = createSelector(
    [getMechanics, getActiveWeaponSet],
    (mechanics, set) => mechanics[set]
);

export default {
    getActiveMechanic
};
