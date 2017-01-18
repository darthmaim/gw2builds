import { createSelector } from 'reselect';

const getAttunements = state => state.activeAttunements;
const getActiveWeaponSet = state => state.activeWeaponSet;

export const getActiveAttunement = createSelector(
    [getAttunements, getActiveWeaponSet],
    (attunements, set) => attunements[set]
);

export default {
    getActiveAttunement
};
