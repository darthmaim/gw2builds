import { combineReducers } from 'redux';
import { selectedLanguage, selectedGameMode, selectedProfession, selectedRace } from './general';
import {
    activeWeaponSet,
    availableWeaponObjects,
    selectedArmorItemstatIds, selectedArmorIsAscended,
    selectedTrinketItemstatIds, selectedTrinketIsAscended,
    selectedMainhandWeaponIds, selectedMainhandWeaponItemstatIds, selectedMainhandWeaponIsAscended,
    selectedOffhandWeaponIds, selectedOffhandWeaponItemstatIds, selectedOffhandWeaponIsAscended
} from './gear';
import { availableSpecializationIds, availableSpecializationObjects, selectedSpecializationIds } from './specializations';
import { availableTraitIds, availableTraitObjects, selectedMinorTraitIds, selectedMajorTraitIds } from './traits';
import { availableSkillIds, selectedSkillIds, availableSkillObjects, availableProfessionSkillObjects } from './skills';
import {
    availableElementalistAttunementObjects, selectedElementalistAttunementId, selectedWeaverPreviousAttunementId,
    selectedRangerPetIds,
    selectedRevenantLegendIds
} from './mechanics';

export default combineReducers({
    // General
    selectedLanguage,
    selectedGameMode,
    selectedProfession,
    selectedRace,

    // Gear
    selectedArmorItemstatIds,
    selectedArmorIsAscended,
    selectedTrinketItemstatIds,
    selectedTrinketIsAscended,

    // Gear: weapons
    activeWeaponSet,
    availableWeaponObjects,
    selectedMainhandWeaponIds,
    selectedOffhandWeaponIds,
    selectedMainhandWeaponItemstatIds,
    selectedMainhandWeaponIsAscended,
    selectedOffhandWeaponItemstatIds,
    selectedOffhandWeaponIsAscended,

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

    // Mechanics
    availableElementalistAttunementObjects,
    selectedElementalistAttunementId,
    selectedWeaverPreviousAttunementId,
    selectedRangerPetIds,
    selectedRevenantLegendIds
});
