import { combineReducers } from 'redux';

import { selectedLanguage, selectedGameMode, selectedProfession, selectedRace, isLoading } from './general';
import { importDialogVisible, importApiKeys } from './import';
import {
    activeWeaponSet,
    availableWeaponObjects,
    selectedArmorItemstatIds, selectedArmorIsAscended, selectedArmorUpgradeIds, selectedArmorInfusionIds, selectedPvpAmuletId, selectedPvpArmorUpgradeId,
    selectedTrinketItemstatIds, selectedTrinketIsAscended, selectedTrinketUpgradeIds, selectedTrinketInfusionIds,
    selectedMainhandWeaponIds, selectedMainhandWeaponItemstatIds, selectedMainhandWeaponIsAscended, selectedMainhandWeaponUpgradeIds, selectedMainhandWeaponInfusionIds,
    selectedOffhandWeaponIds, selectedOffhandWeaponItemstatIds, selectedOffhandWeaponIsAscended, selectedOffhandWeaponUpgradeIds, selectedOffhandWeaponInfusionIds
} from './gear';
import { selectedFoodIds } from './food';
import { availableSpecializationIds, availableSpecializationObjects, selectedSpecializationIds } from './specializations';
import { availableTraitIds, availableTraitObjects, selectedMajorTraitIds } from './traits';
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
    isLoading,

    // Import dialog
    importDialogVisible,
    importApiKeys,

    // Gear: armor
    selectedArmorItemstatIds,
    selectedArmorIsAscended,
    selectedArmorUpgradeIds,
    selectedArmorInfusionIds,
    selectedPvpAmuletId,
    selectedPvpArmorUpgradeId,

    // Gear: trinkets
    selectedTrinketItemstatIds,
    selectedTrinketIsAscended,
    selectedTrinketUpgradeIds,
    selectedTrinketInfusionIds,

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
    selectedMainhandWeaponInfusionIds,
    selectedOffhandWeaponInfusionIds,

    // Food
    selectedFoodIds,

    // Specializations: specializations
    availableSpecializationIds,
    availableSpecializationObjects,
    selectedSpecializationIds,

    // Specializations: traits
    availableTraitIds,
    availableTraitObjects,
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
