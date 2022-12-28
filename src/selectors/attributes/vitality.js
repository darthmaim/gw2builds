import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_VITALITY = 1000;

const getGearVitality = createAttributeDetailSelector('Vitality');

export const getAttributeVitalityDetails = createSelector(
    [getGearVitality],
    (vitality) => [{ label: 'Base', value: BASE_VITALITY }].concat(vitality)
);

export const getAttributeVitality = createAttributeReducer(getAttributeVitalityDetails);
