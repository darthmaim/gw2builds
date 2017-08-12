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

export const getUrl = createSelector(
    [
        getSelectedGameMode,
        getSelectedProfession,
        getSelectedRace,
        getSelectedSpecializationIds,
        getSelectedMajorTraitIds,
        getSelectedMainhandWeaponIds,
        getSelectedOffhandWeaponIds,
        getSelectedSkillIds
    ],
    (
        selectedGameMode,
        selectedProfession,
        selectedRace,
        selectedSpecializationIds,
        selectedMajorTraitIds,
        selectedMainhandWeaponIds,
        selectedOffhandWeaponIds,
        selectedSkillIds
    ) => {
        return exportBuildToString({
            selectedGameMode,
            selectedProfession,
            selectedRace,
            selectedSpecializationIds,
            selectedMajorTraitIds,
            selectedMainhandWeaponIds,
            selectedOffhandWeaponIds,
            selectedSkillIds
        });
    }
);

export default {
    getUrl
};
