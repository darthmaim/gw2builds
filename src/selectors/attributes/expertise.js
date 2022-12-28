import { createSelector } from 'reselect';
import { createAttributeDetailSelector, createAttributeReducer } from './utils';

const BASE_EXPERTISE = 0;

const getGearExpertise = createAttributeDetailSelector('ConditionDuration');

export const getAttributeExpertiseDetails = createSelector(
    [getGearExpertise],
    (expertise) => [{ label: 'Base', value: BASE_EXPERTISE }].concat(expertise)
);

export const getAttributeExpertise = createAttributeReducer(getAttributeExpertiseDetails);
