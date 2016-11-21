'use strict';

import { createSelector } from 'reselect';

const getSpecializations = state => state.specializations;

export const getAllSpecializations = createSelector(
    [getSpecializations], specializations => specializations
);

export const getCoreSpecializations = createSelector(
    [getAllSpecializations],
    specializations => specializations.filter(spec => !spec.elite)
);

export const getEliteSpecializations = createSelector(
    [getAllSpecializations],
    specializations => specializations.filter(spec => spec.elite)
);

export default {
    getAllSpecializations,
    getCoreSpecializations,
    getEliteSpecializations
};
