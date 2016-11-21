'use strict';

import { connect } from 'react-redux';
import { setSpecialization } from '../actions';
import { getCoreSpecializations, getEliteSpecializations } from '../selectors/specializations';
import Specializations from '../components/Specializations';

const mapStateToProps = state => ({
    activeSpecializations: state.activeSpecializations,
    availableCoreSpecializations: getCoreSpecializations(state),
    availableEliteSpecializations: getEliteSpecializations(state)
});

const mapDispatchToProps = dispatch => ({
    onSpecializationChange: (lineId, specId) => {
        dispatch(setSpecialization(lineId, specId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Specializations);
