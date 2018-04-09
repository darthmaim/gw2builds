import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_FEROCITY = 0;

const getGearFerocity = createAttributeDetailSelector('CritDamage');

export const getAttributeFerocityDetails = createSelector(
    [getGearFerocity],
    (ferocity) => [{ label: 'Base', value: BASE_FEROCITY }].concat(ferocity)
);

export const getAttributeFerocity = createAttributeReducer(getAttributeFerocityDetails);
