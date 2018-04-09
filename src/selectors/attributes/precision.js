import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_PRECISION = 1000;

const getGearPrecision = createAttributeDetailSelector('Precision');

export const getAttributePrecisionDetails = createSelector(
    [getGearPrecision],
    (precision) => [{ label: 'Base', value: BASE_PRECISION }].concat(precision)
);

export const getAttributePrecision = createAttributeReducer(getAttributePrecisionDetails);
