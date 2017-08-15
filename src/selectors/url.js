import { createSelector } from 'reselect';
import { exportBuildToString } from '../utils/build-string';

const getSelectedGameMode = state => state.selectedGameMode;
const getSelectedProfession = state => state.selectedProfession;
const getSelectedRace = state => state.selectedRace;
const getSelectedSpecializationIds = state => state.selectedSpecializationIds;
const getSelectedMajorTraitIds = state => state.selectedMajorTraitIds;
const getSelectedMainhandWeaponIds = state => state.selectedMainhandWeaponIds;
const getSelectedOffhandWeaponIds = state => state.selectedOffhandWeaponIds;
const getSelectedSkillIds = state => state.selectedSkillIds;
const getSelectedRevenantLegendIds = state => state.selectedRevenantLegendIds;
const getSelectedRangerPetIds = state => state.selectedRangerPetIds;
const getSelectedElementalistAttunementId = state => state.selectedElementalistAttunementId;
const getSelectedWeaverPreviousAttunementId = state => state.selectedWeaverPreviousAttunementId;
const getSelectedArmorItemstatIds = state => state.selectedArmorItemstatIds;
const getSelectedArmorIsAscended = state => state.selectedArmorIsAscended;
const getSelectedArmorUpgradeIds = state => state.selectedArmorUpgradeIds;
const getSelectedArmorInfusionIds = state => state.selectedArmorInfusionIds;
const getSelectedTrinketItemstatIds = state => state.selectedTrinketItemstatIds;
const getSelectedTrinketIsAscended = state => state.selectedTrinketIsAscended;
const getSelectedTrinketUpgradeIds = state => state.selectedTrinketUpgradeIds;
const getSelectedTrinketInfusionIds = state => state.selectedTrinketInfusionIds;
const getSelectedMainhandWeaponItemstatIds = state => state.selectedMainhandWeaponItemstatIds;
const getSelectedMainhandWeaponIsAscended = state => state.selectedMainhandWeaponIsAscended;
const getSelectedMainhandWeaponUpgradeIds = state => state.selectedMainhandWeaponUpgradeIds;
const getSelectedMainhandWeaponInfusionIds = state => state.selectedMainhandWeaponInfusionIds;
const getSelectedOffhandWeaponItemstatIds = state => state.selectedOffhandWeaponItemstatIds;
const getSelectedOffhandWeaponIsAscended = state => state.selectedOffhandWeaponIsAscended;
const getSelectedOffhandWeaponUpgradeIds = state => state.selectedOffhandWeaponUpgradeIds;
const getSelectedOffhandWeaponInfusionIds = state => state.selectedOffhandWeaponInfusionIds;

export const getUrl = createSelector(
    [
        getSelectedGameMode,
        getSelectedProfession,
        getSelectedRace,
        getSelectedSpecializationIds,
        getSelectedMajorTraitIds,
        getSelectedMainhandWeaponIds,
        getSelectedOffhandWeaponIds,
        getSelectedSkillIds,
        getSelectedRevenantLegendIds,
        getSelectedRangerPetIds,
        getSelectedElementalistAttunementId,
        getSelectedWeaverPreviousAttunementId,
        getSelectedArmorItemstatIds,
        getSelectedArmorIsAscended,
        getSelectedArmorUpgradeIds,
        getSelectedArmorInfusionIds,
        getSelectedTrinketItemstatIds,
        getSelectedTrinketIsAscended,
        getSelectedTrinketUpgradeIds,
        getSelectedTrinketInfusionIds,
        getSelectedMainhandWeaponItemstatIds,
        getSelectedMainhandWeaponIsAscended,
        getSelectedMainhandWeaponUpgradeIds,
        getSelectedMainhandWeaponInfusionIds,
        getSelectedOffhandWeaponItemstatIds,
        getSelectedOffhandWeaponIsAscended,
        getSelectedOffhandWeaponUpgradeIds,
        getSelectedOffhandWeaponInfusionIds
    ],
    (
        selectedGameMode,
        selectedProfession,
        selectedRace,
        selectedSpecializationIds,
        selectedMajorTraitIds,
        selectedMainhandWeaponIds,
        selectedOffhandWeaponIds,
        selectedSkillIds,
        selectedRevenantLegendIds,
        selectedRangerPetIds,
        selectedElementalistAttunementId,
        selectedWeaverPreviousAttunementId,
        selectedArmorItemstatIds,
        selectedArmorIsAscended,
        selectedArmorUpgradeIds,
        selectedArmorInfusionIds,
        selectedTrinketItemstatIds,
        selectedTrinketIsAscended,
        selectedTrinketUpgradeIds,
        selectedTrinketInfusionIds,
        selectedMainhandWeaponItemstatIds,
        selectedMainhandWeaponIsAscended,
        selectedMainhandWeaponUpgradeIds,
        selectedMainhandWeaponInfusionIds,
        selectedOffhandWeaponItemstatIds,
        selectedOffhandWeaponIsAscended,
        selectedOffhandWeaponUpgradeIds,
        selectedOffhandWeaponInfusionIds
    ) => {
        return exportBuildToString({
            selectedGameMode,
            selectedProfession,
            selectedRace,
            selectedSpecializationIds,
            selectedMajorTraitIds,
            selectedMainhandWeaponIds,
            selectedOffhandWeaponIds,
            selectedSkillIds,
            selectedRevenantLegendIds,
            selectedRangerPetIds,
            selectedElementalistAttunementId,
            selectedWeaverPreviousAttunementId,
            selectedArmorItemstatIds,
            selectedArmorIsAscended,
            selectedArmorUpgradeIds,
            selectedArmorInfusionIds,
            selectedTrinketItemstatIds,
            selectedTrinketIsAscended,
            selectedTrinketUpgradeIds,
            selectedTrinketInfusionIds,
            selectedMainhandWeaponItemstatIds,
            selectedMainhandWeaponIsAscended,
            selectedMainhandWeaponUpgradeIds,
            selectedMainhandWeaponInfusionIds,
            selectedOffhandWeaponItemstatIds,
            selectedOffhandWeaponIsAscended,
            selectedOffhandWeaponUpgradeIds,
            selectedOffhandWeaponInfusionIds
        });
    }
);

export default {
    getUrl
};
