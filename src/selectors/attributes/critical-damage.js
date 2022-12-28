import { createSelector } from 'reselect';
import { getAttributeFerocity } from './ferocity';
import { createAttributeReducer } from './utils';

export const getAttributeCriticalDamageDetails = createSelector(
    [getAttributeFerocity],
    (ferocity) => [
        { label: 'Base', value: 1.5 },
        { label: 'Ferocity', value: ferocity / 1500 }
    ]
);

export const getAttributeCriticalDamage = createAttributeReducer(getAttributeCriticalDamageDetails);
