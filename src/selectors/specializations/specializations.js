import { createSelector } from 'reselect';

const getSelectedSpecializationIds = state => state.selectedSpecializationIds;
const getCurrentSpecializationLine = (_, props) => props.specializationLine;
const getAvailableSpecializationObjects = state => state.availableSpecializationObjects;
const getAvailableSpecializationIds = state => state.availableSpecializationIds;
const isEliteSupported = (_, props) => props.supportsElite;

export const getCoreSpecializationIds = createSelector(
    [getAvailableSpecializationIds, getAvailableSpecializationObjects],
    (ids, specializations) => {
        return ids.filter(id => !specializations[id].elite);
    }
);

export const getEliteSpecializationIds = createSelector(
    [getAvailableSpecializationIds, getAvailableSpecializationObjects, isEliteSupported],
    (ids, specializations, supportsElite) => {
        if (supportsElite) {
            return ids.filter(id => specializations[id].elite);
        }
        return [];
    }
);

export const getSelectedSpecializationId = createSelector(
    [getSelectedSpecializationIds, getCurrentSpecializationLine],
    (selectedSpecializationIds, specializationLine) => selectedSpecializationIds[specializationLine]
);

/**
 * Returns the currently selected elite specialization id or undefined.
 */
export const getSelectedEliteSpecializationId = createSelector(
    [getSelectedSpecializationIds, getAvailableSpecializationObjects],
    (selected, available) => selected.filter(
        (id) => available[id] && available[id].elite === true
    )[0]
);

export default {
    getCoreSpecializationIds,
    getEliteSpecializationIds,
    getSelectedSpecializationId
};
