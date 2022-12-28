import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_HEALING_POWER = 0;

const getGearHealingPower = createAttributeDetailSelector('Healing');

export const getAttributeHealingPowerDetails = createSelector(
    [getGearHealingPower],
    (healingPower) => [{ label: 'Base', value: BASE_HEALING_POWER }].concat(healingPower)
);

export const getAttributeHealingPower = createAttributeReducer(getAttributeHealingPowerDetails);
