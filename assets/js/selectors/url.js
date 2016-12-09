'use strict';

import { createSelector } from 'reselect';
import { serialize, toBase64 } from '../url';

const getGameMode = state => state.gameMode;
const getProfession = state => state.profession;
const getRace = state => state.race;
const getActiveSpecializationIds = state => state.activeSpecializations;
const getActiveMajorTraitIds = state => state.activeMajorTraits;

export const getUrl = createSelector(
    [getGameMode, getProfession, getRace, getActiveSpecializationIds, getActiveMajorTraitIds],
    (gameMode, profession, race, specializations, majorTraits) => {
        const data = {
            gameMode,
            profession,
            race,
            specialization1: specializations[0],
            majorTrait11: majorTraits[0],
            majorTrait12: majorTraits[1],
            majorTrait13: majorTraits[2],
            specialization2: specializations[1],
            majorTrait21: majorTraits[3],
            majorTrait22: majorTraits[4],
            majorTrait23: majorTraits[5],
            specialization3: specializations[2],
            majorTrait31: majorTraits[6],
            majorTrait32: majorTraits[7],
            majorTrait33: majorTraits[8]
        };
        return toBase64(serialize(data));
    }
);

export default {
    getUrl
};
