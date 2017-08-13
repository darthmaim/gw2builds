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
const getSelectedGearItemstatIds = state => state.selectedGearItemstatIds;
const getSelectedGearIsAscended = state => state.selectedGearIsAscended;

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
        getSelectedGearItemstatIds,
        getSelectedGearIsAscended
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
        selectedItemstatIds,
        selectedGearIsAscended
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
            selectedItemstatIds,
            selectedGearIsAscended
        });
    }
);

export default {
    getUrl
};
