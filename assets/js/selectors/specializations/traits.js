import values from 'lodash/values';
import keyBy from 'lodash/fp/keyBy';
import { createSelector } from 'reselect';

const getActiveSpecializationIds = state => state.activeSpecializations;
const getActiveMajorTraitIds = state => state.activeMajorTraits;
const getCurrentSpecializationLine = (_, props) => props.specializationLine;
const getCurrentTraitTier = (_, props) => props.traitTier;
const getTraits = state => state.traits;

export const getActiveMajorTrait = createSelector(
    [getActiveMajorTraitIds, getCurrentSpecializationLine, getCurrentTraitTier],
    (activeMajorTraitIds, specializationLine, traitTier) => activeMajorTraitIds[(specializationLine * 3) + traitTier - 1]
);

export const getSpecializationTraitsFromTier = createSelector(
    [getTraits, getActiveSpecializationIds, getCurrentSpecializationLine, getCurrentTraitTier],
    (traits, activeSpecializationIds, specializationLine, traitTier) =>
        keyBy(t => t.id)(values(traits)
            .filter(t => t.tier === traitTier && t.specialization === activeSpecializationIds[specializationLine]))
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
    getActiveMajorTrait,
    getSpecializationTraitsFromTier,
    getMinorTraitId,
    getMajorTraitIds
};
