"use strict";

import { createSelector } from "reselect";

export const getAttributeToughness = createSelector(
    [],
    () => {
        return 1000;
    }
);
