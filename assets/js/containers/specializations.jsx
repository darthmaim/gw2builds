'use strict';

import { connect } from 'react-redux';
import { setSpecialization, setMinorTrait, setMajorTrait } from '../actions';
import { getCoreSpecializations, getEliteSpecializations } from '../selectors/specializations';
import Specializations from '../components/Specializations';

const mapStateToProps = state => ({
    activeSpecializations: state.activeSpecializations,
    availableCoreSpecializations: getCoreSpecializations(state),
    availableEliteSpecializations: getEliteSpecializations(state),
    availableTraits: state.traits
});

const mapDispatchToProps = dispatch => ({
    onSpecializationChange: (lineId, specId) => {
        dispatch(setSpecialization(lineId, specId));
        for (let i = 1; i <= 3; i++) {
            // Wipe the active major traits
            dispatch(setMajorTrait(lineId, i, null));
        }
    },
    onTraitChange: (lineId, traitTier, traitId) => {
        dispatch(setMajorTrait(lineId, traitTier, traitId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Specializations);
