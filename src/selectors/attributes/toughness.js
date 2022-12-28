import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_TOUGHNESS = 1000;

const getGearToughness = createAttributeDetailSelector('Toughness');

export const getAttributeToughnessDetails = createSelector(
    [getGearToughness],
    (toughness) => [{ label: 'Base', value: BASE_TOUGHNESS }].concat(toughness)
);

export const getAttributeToughness = createAttributeReducer(getAttributeToughnessDetails);
