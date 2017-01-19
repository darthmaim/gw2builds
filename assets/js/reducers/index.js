import { combineReducers } from 'redux';
import { selectedLanguage, selectedGameMode, selectedProfession, selectedRace } from './general';
import { availableSpecializationIds, availableSpecializationObjects, selectedSpecializationIds } from './specializations';
import { availableTraitIds, availableTraitObjects, selectedMinorTraitIds, selectedMajorTraitIds } from './traits';
import { weapons, activeWeaponSet, activeMainhandWeapons, activeOffhandWeapons, attunements, activeAttunements, skillIds, skills } from './skills';

export default combineReducers({
    // General
    selectedLanguage,
    selectedGameMode,
    selectedProfession,
    selectedRace,

    // Specializations: specializations
    availableSpecializationIds,
    availableSpecializationObjects,
    selectedSpecializationIds,

    // Specializations: traits
    availableTraitIds,
    availableTraitObjects,
    selectedMinorTraitIds,
    selectedMajorTraitIds,

    // Skills
    skillIds,
    skills,

    // Weapons
    weapons,
    activeWeaponSet,
    activeMainhandWeapons,
    activeOffhandWeapons,

    // Mechanics
    attunements,
    activeAttunements
});
