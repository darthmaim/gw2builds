'use strict';

import { createSelector } from 'reselect';
import { serialize, deserialize } from '../../../lib/build-serialization';

const getGameMode = state => state.gameMode;
const getProfession = state => state.profession;
const getRace = state => state.race;
const getActiveSpecializationIds = state => state.activeSpecializations;
const getActiveMajorTraitIds = state => state.activeMajorTraits;

export const getUrl = createSelector(
    [getGameMode, getProfession, getRace, getActiveSpecializationIds, getActiveMajorTraitIds],
    (gameMode, profession, race, specializations, majorTraits) => {
        const data = {
            general: {
                gameMode,
                profession,
                race,
            },
            specialization1: {
                specialization: specializations[0],
                majorTrait1: majorTraits[0],
                majorTrait2: majorTraits[1],
                majorTrait3: majorTraits[2],
            },
            specialization2: {
                specialization: specializations[1],
                majorTrait1: majorTraits[3],
                majorTrait2: majorTraits[4],
                majorTrait3: majorTraits[5],
            },
            specialization3: {
                specialization: specializations[2],
                majorTrait1: majorTraits[6],
                majorTrait2: majorTraits[7],
                majorTrait3: majorTraits[8]
            }
        };
        return serialize(data);
    }
);

export default {
    getUrl
};
