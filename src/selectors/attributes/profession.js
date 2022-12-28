import { createSelector } from 'reselect';
import { createAttributeReducer } from './utils';

export const getAttributeProfessionDetails = createSelector(
    [],
    () => [{ label: 'Base', value: 0 }]
);

export const getAttributeProfession = createAttributeReducer(getAttributeProfessionDetails);
