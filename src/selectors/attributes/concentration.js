import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_CONCENTRATION = 0;

const getGearConcentration = createAttributeDetailSelector('Concentration');

export const getAttributeConcentrationDetails = createSelector(
    [getGearConcentration],
    (concentration) => [{ label: 'Base', value: BASE_CONCENTRATION }].concat(concentration)
);

export const getAttributeConcentration = createAttributeReducer(getAttributeConcentrationDetails);
