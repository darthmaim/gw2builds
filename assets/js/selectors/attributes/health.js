"use strict";

import { createSelector } from "reselect";
import { getAttributeVitality } from "./vitality"

const getProfession = (state) => state.profession;

export const getAttributeHealthBase = createSelector(
    [getProfession],
    profession => {
        switch (profession) {
            case "warrior":
            case "necromancer":
                return 9212;
            case "revenant":
            case "engineer":
            case "ranger":
            case "mesmer":
                return 5922;
            case "guardian":
            case "thief":
            case "elementalist":
                return 1645;
            default:
                return 0;
        }
    }
);

export const getAttributeHealth = createSelector(
    [getAttributeHealthBase, getAttributeVitality],
    (base, vitality) => {
        return base + vitality * 10;
    }
);
