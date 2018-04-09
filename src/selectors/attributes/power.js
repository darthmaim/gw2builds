import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_POWER = 1000;

const getGearPower = createAttributeDetailSelector('Power');

export const getAttributePowerDetails = createSelector(
    [getGearPower],
    (power) => [{ label: 'Base', value: BASE_POWER }].concat(power)
);

export const getAttributePower = createAttributeReducer(getAttributePowerDetails);
