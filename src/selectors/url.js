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
const getSelectedTrinketItemstatIds = state => state.selectedTrinketItemstatIds;
const getSelectedTrinketIsAscended = state => state.selectedTrinketIsAscended;
const getSelectedMainhandWeaponItemstatIds = state => state.selectedMainhandWeaponItemstatIds;
const getSelectedMainhandWeaponIsAscended = state => state.selectedMainhandWeaponIsAscended;
const getSelectedOffhandWeaponItemstatIds = state => state.selectedOffhandWeaponItemstatIds;
const getSelectedOffhandWeaponIsAscended = state => state.selectedOffhandWeaponIsAscended;

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
        getSelectedTrinketItemstatIds,
        getSelectedTrinketIsAscended,
        getSelectedMainhandWeaponItemstatIds,
        getSelectedMainhandWeaponIsAscended,
        getSelectedOffhandWeaponItemstatIds,
        getSelectedOffhandWeaponIsAscended
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
        selectedTrinketItemstatIds,
        selectedTrinketIsAscended,
        selectedMainhandWeaponItemstatIds,
        selectedMainhandWeaponIsAscended,
        selectedOffhandWeaponItemstatIds,
        selectedOffhandWeaponIsAscended
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
            selectedTrinketItemstatIds,
            selectedTrinketIsAscended,
            selectedMainhandWeaponItemstatIds,
            selectedMainhandWeaponIsAscended,
            selectedOffhandWeaponItemstatIds,
            selectedOffhandWeaponIsAscended
        });
    }
);

export default {
    getUrl
};
