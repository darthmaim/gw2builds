import _ from 'lodash';
import fp from 'lodash/fp';
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
        fp.keyBy(t => t.id)(_.values(traits)
            .filter(t => t.tier === traitTier && t.specialization === activeSpecializationIds[specializationLine]))
);

export const getMinorTraitId = createSelector(
    [getSpecializationTraitsFromTier],
    traits => {
        const trait = _.values(traits).find(t => t.slot.toLowerCase() === 'minor');
        if (trait) {
            return trait.id;
        }
    }
);

export const getMajorTraitIds = createSelector(
    [getSpecializationTraitsFromTier],
    traits => _.values(traits)
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
