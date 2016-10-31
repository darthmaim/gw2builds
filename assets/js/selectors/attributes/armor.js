"use strict";

import { createSelector } from "reselect";
import { getAttributeToughness } from "./toughness"
import { getAttributeDefense } from "./defense"

export const getAttributeArmor = createSelector(
    [getAttributeToughness, getAttributeDefense],
    (toughness, defense) => {
        return toughness + defense;
    }
);
