import { createSelector } from 'reselect';
import { exportBuildToString } from '../utils/build-string';

const getSelectedGameMode = state => state.selectedGameMode;
const getSelectedProfession = state => state.selectedProfession;
const getSelectedRace = state => state.selectedRace;
const getSelectedSpecializationIds = state => state.selectedSpecializationIds;
const getSelectedMajorTraitIds = state => state.selectedMajorTraitIds;

export const getUrl = createSelector(
    [getSelectedGameMode, getSelectedProfession, getSelectedRace, getSelectedSpecializationIds, getSelectedMajorTraitIds],
    (selectedGameMode, selectedProfession, selectedRace, selectedSpecializationIds, selectedMajorTraitIds) => {
        return exportBuildToString({
            selectedGameMode,
            selectedProfession,
            selectedRace,
            selectedSpecializationIds,
            selectedMajorTraitIds
        });
    }
);

export default {
    getUrl
};
