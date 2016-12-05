'use strict';

import { connect } from 'react-redux';
import { setMajorTrait } from '../../../actions';
import { getActiveMajorTrait, getMajorTraitIds, getMinorTraitId, getSpecializationTraitsFromTier } from '../../../selectors/specializations';
import TraitTier from './TraitTier';

const mapStateToProps = (state, ownProps) => ({
    majorTraitIds: getMajorTraitIds(state, ownProps),
    minorTraitId: getMinorTraitId(state, ownProps),
    selectedMajorTraitId: getActiveMajorTrait(state, ownProps),
    traits: getSpecializationTraitsFromTier(state, ownProps)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onTraitChange: traitId => {
        dispatch(setMajorTrait(ownProps.specializationLine, ownProps.traitTier, traitId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TraitTier);
