import { createSelector } from 'reselect';

const getActiveSpecializationIds = state => state.activeSpecializations;
const getCurrentSpecializationLine = (_, props) => props.specializationLine;
const getSpecializations = state => state.specializations;
const getSpecializationIds = state => state.specializationIds;
const isEliteSupported = (_, props) => props.supportsElite;

export const getCoreSpecializationIds = createSelector(
    [getSpecializationIds, getSpecializations],
    (ids, specializations) => {
        return ids.filter(id => !specializations[id].elite);
    }
);

export const getEliteSpecializationIds = createSelector(
    [getSpecializationIds, getSpecializations, isEliteSupported],
    (ids, specializations, supportsElite) => {
        if (supportsElite) {
            return ids.filter(id => specializations[id].elite);
        }
        return [];
    }
);

export const getSelectedSpecializationId = createSelector(
    [getActiveSpecializationIds, getCurrentSpecializationLine],
    (activeSpecializations, specializationLine) => activeSpecializations[specializationLine]
);

export default {
    getCoreSpecializationIds,
    getEliteSpecializationIds,
    getSelectedSpecializationId
};
