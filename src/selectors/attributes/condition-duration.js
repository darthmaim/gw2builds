import { createSelector } from 'reselect';
import { capAttributeDetails, createAttributeReducer } from './utils';
import { getAttributeExpertise } from './expertise';

export const getAttributeConditionDurationDetails = createSelector(
    [getAttributeExpertise],
    (expertise) => capAttributeDetails([
        { label: 'Base', value: 0 },
        { label: 'Expertise', value: expertise / 1500 }
    ], 1)
);

export const getAttributeConditionDuration = createAttributeReducer(getAttributeConditionDurationDetails);
