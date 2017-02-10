import { connect } from 'react-redux';
import { setSpecialization, swapSpecializations, wipeActiveSpecialization } from '~/actions';
import { getCoreSpecializationIds, getEliteSpecializationIds, getSelectedSpecializationId } from '~/selectors/specializations';
import SelectionPopup from './SelectionPopup';

const mapStateToProps = (state, ownProps) => ({
    activeSpecializationIds: state.activeSpecializations,
    availableCoreSpecializationIds: getCoreSpecializationIds(state, ownProps),
    availableEliteSpecializationIds: getEliteSpecializationIds(state, ownProps),
    selectedSpecializationId: getSelectedSpecializationId(state, ownProps),
    specializations: state.specializations
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSpecializationChange: (specializationId, activeSpecializationIds, specializations) => {
        // Check if the chosen specialization id is already active
        const existingSpecializationLine = activeSpecializationIds.indexOf(specializationId);
        if (existingSpecializationLine === ownProps.specializationLine) {
            // Same line, do nothing
            return;
        }

        if (existingSpecializationLine > -1) {
            // The chosen specialization is already added
            dispatch(swapSpecializations({
                specializationLine1: ownProps.specializationLine,
                specializationLine2: existingSpecializationLine
            }));
            if (specializations[activeSpecializationIds[ownProps.specializationLine]].elite) {
                // Elite specializations can't be swapped, so make sure to wipe it
                // (this means that it's hardcoded to support only one active elite specialization at a time,
                // update this when it changes in the future)
                // Since the previous dispatch is synchronous, we can immediately do this dispatch
                dispatch(wipeActiveSpecialization({
                    specializationLine: existingSpecializationLine
                }));
            }
        } else {
            // The chosen specialization is unique
            dispatch(setSpecialization({
                specializationLine: ownProps.specializationLine,
                specializationId,
                specializations
            }));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionPopup);
