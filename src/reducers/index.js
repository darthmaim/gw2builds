import { combineReducers } from 'redux';
import { selectedLanguage, selectedGameMode, selectedProfession, selectedRace } from './general';
import { availableSpecializationIds, availableSpecializationObjects, selectedSpecializationIds } from './specializations';
import { availableTraitIds, availableTraitObjects, selectedMinorTraitIds, selectedMajorTraitIds } from './traits';
import { availableWeaponObjects, activeWeaponSet, selectedMainhandWeaponIds, selectedOffhandWeaponIds, activeAttunements, availableAttunementObjects, availableSkillIds, availableSkillObjects, availableProfessionSkillObjects } from './skills';
import { selectedElementalistAttunementId, selectedWeaverPreviousAttunementId, selectedRangerPetIds, selectedRevenantLegendIds } from './mechanics';

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
    availableProfessionSkillObjects,

    // Weapons
    activeWeaponSet,
    availableWeaponObjects,
    selectedMainhandWeaponIds,
    selectedOffhandWeaponIds,

    // Mechanics
    selectedElementalistAttunementId,
    selectedWeaverPreviousAttunementId,
    selectedRangerPetIds,
    selectedRevenantLegendIds,
    activeAttunements, // TODO: check if updates are needed
    availableAttunementObjects // TODO: check if updates are needed
});
