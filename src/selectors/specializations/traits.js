import values from 'lodash/values';
import keyBy from 'lodash/fp/keyBy';
import { createSelector } from 'reselect';

const getAvailableSpecializationObjects = state => state.availableSpecializationObjects;
const getSelectedSpecializationIds = state => state.selectedSpecializationIds;
const getSelectedMajorTraitIds = state => state.selectedMajorTraitIds;
const getCurrentSpecializationLine = (_, props) => props.specializationLine;
const getCurrentTraitTier = (_, props) => props.traitTier;
const getAvailableTraits = state => state.availableTraitObjects;

export const getSelectedMinorTraitIds = createSelector(
    [getSelectedSpecializationIds, getAvailableSpecializationObjects],
    (selectedSpecializationIds, availableSpecializationObjects) =>
        [].concat.apply([], selectedSpecializationIds.map(id => availableSpecializationObjects[id].minor_traits))
);

export const getSelectedMajorTraitId = createSelector(
    [getSelectedMajorTraitIds, getCurrentSpecializationLine, getCurrentTraitTier],
    (selectedMajorTraitIds, specializationLine, traitTier) => selectedMajorTraitIds[(specializationLine * 3) + traitTier - 1]
);

export const getSpecializationTraitsFromTier = createSelector(
    [getAvailableTraits, getSelectedSpecializationIds, getCurrentSpecializationLine, getCurrentTraitTier],
    (availableTraits, selectedSpecializationIds, specializationLine, traitTier) =>
        keyBy(t => t.id)(values(availableTraits)
            .filter(t => t.tier === traitTier && t.specialization === selectedSpecializationIds[specializationLine]))
);

export const getMinorTraitId = createSelector(
    [getSpecializationTraitsFromTier],
    traits => {
        const trait = values(traits).find(t => t.slot.toLowerCase() === 'minor');
        if (trait) {
            return trait.id;
        }
    }
);

export const getMajorTraitIds = createSelector(
    [getSpecializationTraitsFromTier],
    traits => values(traits)
        .filter(t => t.slot.toLowerCase() === 'major')
        .sort((a, b) => a.order - b.order)
        .map(t => t.id)
);

export default {
    getSelectedMajorTraitId,
    getSpecializationTraitsFromTier,
    getMinorTraitId,
    getMajorTraitIds
};
