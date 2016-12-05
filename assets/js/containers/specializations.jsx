'use strict';

import { connect } from 'react-redux';
import { setSpecialization, setMinorTrait, setMajorTrait } from '../actions';
import { getCoreSpecializations, getEliteSpecializations } from '../selectors/specializations';
import Specializations from '../components/Specializations';

const mapStateToProps = state => ({
    activeSpecializations: state.activeSpecializations,
    activeMajorTraits: state.activeMajorTraits,
    availableCoreSpecializations: getCoreSpecializations(state),
    availableEliteSpecializations: getEliteSpecializations(state),
    availableTraits: state.traits
});

const mapDispatchToProps = dispatch => ({
    onSpecializationChange: (lineId, specId) => {
        dispatch(setSpecialization(lineId, specId));
        dispatch(setMajorTrait(lineId, null, null));
    },
    onTraitChange: (lineId, traitTier, traitId) => {
        dispatch(setMajorTrait(lineId, traitTier, traitId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Specializations);
