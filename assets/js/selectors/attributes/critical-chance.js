'use strict';

import { createSelector } from 'reselect';
import { getAttributePrecision } from './precision';

export const getAttributeCriticalChance = createSelector(
    [getAttributePrecision],
    precision => {
        return Math.min(1, (precision - 895) / 21 / 100);
    }
);
