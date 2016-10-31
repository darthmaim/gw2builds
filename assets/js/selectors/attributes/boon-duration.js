"use strict";

import { createSelector } from "reselect";
import { getAttributeConcentration } from "./concentration"

export const getAttributeBoonDuration = createSelector(
    [getAttributeConcentration],
    concentration => {
        return Math.min(1, concentration / 15 / 100);
    }
);
