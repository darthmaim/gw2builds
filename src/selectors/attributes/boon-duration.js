import { createSelector } from 'reselect';
import { capAttributeDetails, createAttributeReducer } from './utils';
import { getAttributeConcentration } from './concentration';

export const getAttributeBoonDurationDetails = createSelector(
    [getAttributeConcentration],
    (concentration) => capAttributeDetails([
        { label: 'Base', value: 0 },
        { label: 'Concentration', value: concentration / 1500 }
    ], 1)
);

export const getAttributeBoonDuration = createAttributeReducer(getAttributeBoonDurationDetails);
