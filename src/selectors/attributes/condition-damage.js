import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_CONDITION_DAMAGE = 0;

const getGearConditionDamage = createAttributeDetailSelector('ConditionDamage');

export const getAttributeConditionDamageDetails = createSelector(
    [getGearConditionDamage],
    (conditionDamage) => [{ label: 'Base', value: BASE_CONDITION_DAMAGE }].concat(conditionDamage)
);

export const getAttributeConditionDamage = createAttributeReducer(getAttributeConditionDamageDetails);
