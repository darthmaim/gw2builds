import { combineReducers } from 'redux';
import { selectedLanguage, selectedGameMode, selectedProfession, selectedRace } from './general';
import { selectedGearItemstatIds, selectedGearIsAscended } from './gear';
import { availableSpecializationIds, availableSpecializationObjects, selectedSpecializationIds } from './specializations';
import { availableTraitIds, availableTraitObjects, selectedMinorTraitIds, selectedMajorTraitIds } from './traits';
import { availableWeaponObjects, activeWeaponSet, selectedMainhandWeaponIds, selectedOffhandWeaponIds, activeAttunements, availableAttunementObjects, availableSkillIds, selectedSkillIds, availableSkillObjects, availableProfessionSkillObjects } from './skills';
import { selectedElementalistAttunementId, selectedWeaverPreviousAttunementId, selectedRangerPetIds, selectedRevenantLegendIds } from './mechanics';

export default combineReducers({
    // General
    selectedLanguage,
    selectedGameMode,
    selectedProfession,
    selectedRace,

    // Gear
    selectedGearItemstatIds,
    selectedGearIsAscended,

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
    selectedSkillIds,

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
