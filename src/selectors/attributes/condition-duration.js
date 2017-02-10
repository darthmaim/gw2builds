import { createSelector } from 'reselect';
import { getAttributeExpertise } from './expertise';

export const getAttributeConditionDuration = createSelector(
    [getAttributeExpertise],
    expertise => {
        return Math.min(1, expertise / 15 / 100);
    }
);
