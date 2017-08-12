import { connect } from 'react-redux';
import { setSelectedMajorTraitId } from '~/actions';
import { getSelectedMajorTraitId, getMajorTraitIds, getMinorTraitId, getSpecializationTraitsFromTier } from '~/selectors/specializations';
import TraitTier from './TraitTier';

const mapStateToProps = (state, ownProps) => ({
    availableTraitObjects: getSpecializationTraitsFromTier(state, ownProps),
    majorTraitIds: getMajorTraitIds(state, ownProps),
    minorTraitId: getMinorTraitId(state, ownProps),
    selectedMajorTraitId: getSelectedMajorTraitId(state, ownProps)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onTraitChange: traitId => {
        dispatch(setSelectedMajorTraitId({
            specializationLine: ownProps.specializationLine,
            traitTier: ownProps.traitTier,
            traitId
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TraitTier);
