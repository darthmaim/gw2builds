import { connect } from 'react-redux';
import { setSelectedSpecializationId, swapSelectedSpecializationIds, wipeSelectedSpecializationIds} from '~/actions';
import { getCoreSpecializationIds, getEliteSpecializationIds, getSelectedSpecializationId } from '~/selectors/specializations';
import SelectionPopup from './SelectionPopup';

const mapStateToProps = (state, ownProps) => ({
    availableCoreSpecializationIds: getCoreSpecializationIds(state, ownProps),
    availableEliteSpecializationIds: getEliteSpecializationIds(state, ownProps),
    availableSpecializationObjects: state.availableSpecializationObjects,
    selectedSpecializationId: getSelectedSpecializationId(state, ownProps),
    selectedSpecializationIds: state.selectedSpecializationIds
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSpecializationChange: (specializationId, selectedSpecializationIds, specializations) => {
        // Check if the chosen specialization id is already active
        const existingSpecializationLine = selectedSpecializationIds.indexOf(specializationId);
        if (existingSpecializationLine === ownProps.specializationLine) {
            // Same line, do nothing
            return;
        }

        if (existingSpecializationLine > -1) {
            // The chosen specialization is already added
            dispatch(swapSelectedSpecializationIds({
                specializationLine1: ownProps.specializationLine,
                specializationLine2: existingSpecializationLine
            }));
            if (specializations[selectedSpecializationIds[ownProps.specializationLine]].elite) {
                // Elite specializations can't be swapped, so make sure to wipe it
                // (this means that it's hardcoded to support only one active elite specialization at a time,
                // update this when it changes in the future)
                // Since the previous dispatch is synchronous, we can immediately do this dispatch
                dispatch(wipeSelectedSpecializationIds({
                    specializationLine: existingSpecializationLine
                }));
            }
        } else {
            // The chosen specialization is unique
            dispatch(setSelectedSpecializationId({
                specializationLine: ownProps.specializationLine,
                specializationId,
                specializations
            }));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionPopup);
