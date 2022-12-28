import { createSelector } from 'reselect';
import { getAttributePrecision } from './precision';
import { capAttributeDetails, createAttributeReducer } from './utils';

export const getAttributeCriticalChanceDetails = createSelector(
    [getAttributePrecision],
    (precision) => capAttributeDetails([
        { label: 'Base', value: 0 },
        { label: 'Precision', value: (precision - 895) / 21 / 100 }
    ], 1)
);

export const getAttributeCriticalChance = createAttributeReducer(getAttributeCriticalChanceDetails);
