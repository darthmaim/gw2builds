'use strict';

import { connect } from 'react-redux';
import { setSpecialization } from '../../../actions';
import { getCoreSpecializationIds, getEliteSpecializationIds, getSelectedSpecializationId } from '../../../selectors/specializations';
import SelectionPopup from './SelectionPopup';

const mapStateToProps = (state, ownProps) => ({
    activeSpecializationIds: state.activeSpecializations,
    availableCoreSpecializationIds: getCoreSpecializationIds(state, ownProps),
    availableEliteSpecializationIds: getEliteSpecializationIds(state, ownProps),
    selectedSpecializationId: getSelectedSpecializationId(state, ownProps),
    specializations: state.specializations
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSpecializationChange: specializationId => {
        dispatch(setSpecialization({
            specializationLine: ownProps.specializationLine,
            specializationId
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionPopup);
