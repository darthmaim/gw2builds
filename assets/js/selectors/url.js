'use strict';

import { createSelector } from 'reselect';
import { exportBuildToString } from '../utils/build-string';

const getGameMode = state => state.gameMode;
const getProfession = state => state.profession;
const getRace = state => state.race;
const getActiveSpecializationIds = state => state.activeSpecializations;
const getActiveMajorTraitIds = state => state.activeMajorTraits;

export const getUrl = createSelector(
    [getGameMode, getProfession, getRace, getActiveSpecializationIds, getActiveMajorTraitIds],
    (gameMode, profession, race, activeSpecializations, activeMajorTraits) => {
        return exportBuildToString({
            gameMode,
            profession,
            race,
            activeSpecializations,
            activeMajorTraits
        });
    }
);

export default {
    getUrl
};
