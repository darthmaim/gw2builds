import { connect } from 'react-redux';
import { getSelectedSpecializationId } from '~/selectors/specializations';
import SpecializationLine from './SpecializationLine';

const mapStateToProps = (state, ownProps) => ({
    availableSpecializationObjects: state.availableSpecializationObjects,
    availableTraitObjects: state.availableTraitObjects,
    selectedSpecializationId: getSelectedSpecializationId(state, ownProps)
});

export default connect(mapStateToProps)(SpecializationLine);
