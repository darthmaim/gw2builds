import { combineReducers } from 'redux';
import { selectedLanguage, selectedGameMode, selectedProfession, selectedRace } from './general';
import {
    activeWeaponSet,
    availableWeaponObjects,
    selectedArmorItemstatIds, selectedArmorIsAscended, selectedArmorUpgradeIds,
    selectedTrinketItemstatIds, selectedTrinketIsAscended, selectedTrinketUpgradeIds,
    selectedMainhandWeaponIds, selectedMainhandWeaponItemstatIds, selectedMainhandWeaponIsAscended, selectedMainhandWeaponUpgradeIds,
    selectedOffhandWeaponIds, selectedOffhandWeaponItemstatIds, selectedOffhandWeaponIsAscended, selectedOffhandWeaponUpgradeIds
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

    // Gear: armor
    selectedArmorItemstatIds,
    selectedArmorIsAscended,
    selectedArmorUpgradeIds,

    // Gear: weapons
    activeWeaponSet,
    availableWeaponObjects,
    selectedMainhandWeaponIds,
    selectedOffhandWeaponIds,
    selectedMainhandWeaponItemstatIds,
    selectedOffhandWeaponItemstatIds,
    selectedMainhandWeaponIsAscended,
    selectedOffhandWeaponIsAscended,
    selectedMainhandWeaponUpgradeIds,
    selectedOffhandWeaponUpgradeIds,

    // Gear: trinkets
    selectedTrinketItemstatIds,
    selectedTrinketIsAscended,
    selectedTrinketUpgradeIds,

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
