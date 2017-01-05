'use strict';

import { combineReducers } from 'redux';
import { language, gameMode, profession, race } from './general';
import { specializations, specializationIds, activeSpecializations } from './specializations';
import { traits, traitIds, activeMinorTraits, activeMajorTraits } from './traits';
import { weapons, activeWeaponSet, activeMainhandWeapons, activeOffhandWeapons, activeMechanics, skillIds, skills } from './skills';

export default combineReducers({
    // General
    language,
    gameMode,
    profession,
    race,

    // Specializations: specializations
    specializationIds,
    specializations,
    activeSpecializations,

    // Specializations: traits
    traitIds,
    traits,
    activeMinorTraits,
    activeMajorTraits,

    // Skills
    weapons,
    activeWeaponSet,
    activeMainhandWeapons,
    activeOffhandWeapons,
    activeMechanics,
    skillIds,
    skills
});
