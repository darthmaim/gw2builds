'use strict';

import { createSelector } from 'reselect';
import { getAttributeFerocity } from './ferocity';

export const getAttributeCriticalDamage = createSelector(
    [getAttributeFerocity],
    ferocity => {
        return (150 + ferocity / 15) / 100;
    }
);
