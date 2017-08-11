import { combineReducers } from 'redux';
import { selectedLanguage, selectedGameMode, selectedProfession, selectedRace } from './general';
import { availableSpecializationIds, availableSpecializationObjects, selectedSpecializationIds } from './specializations';
import { availableTraitIds, availableTraitObjects, selectedMinorTraitIds, selectedMajorTraitIds } from './traits';
import { availableWeaponObjects, activeWeaponSet, selectedMainhandWeaponIds, selectedOffhandWeaponIds, activeAttunements, availableAttunementObjects, availableSkillIds, availableSkillObjects, professionSkills } from './skills';

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
    availableSkillIds,
    availableSkillObjects,
    professionSkills,

    // Weapons
    activeWeaponSet,
    availableWeaponObjects,
    selectedMainhandWeaponIds,
    selectedOffhandWeaponIds,

    // Mechanics
    activeAttunements,
    availableAttunementObjects
});
