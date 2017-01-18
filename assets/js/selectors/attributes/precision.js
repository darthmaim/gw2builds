import { createSelector } from 'reselect';

export const getAttributePrecision = createSelector(
    [],
    () => {
        return 1000;
    }
);
