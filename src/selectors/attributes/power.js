import { createSelector } from 'reselect';

export const getAttributePower = createSelector(
    [],
    () => {
        return 1000;
    }
);
