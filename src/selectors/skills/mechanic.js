import { createSelector } from 'reselect';

const getActiveAttunements = state => state.activeAttunements;
const getActiveWeaponSet = state => state.activeWeaponSet;

export const getActiveAttunement = createSelector(
    [getActiveAttunements, getActiveWeaponSet],
    (attunements, set) => attunements[set]
);

export default {
    getActiveAttunement
};
