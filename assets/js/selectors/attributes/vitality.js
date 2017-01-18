import { createSelector } from 'reselect';

export const getAttributeVitality = createSelector(
    [],
    () => {
        return 1000;
    }
);
