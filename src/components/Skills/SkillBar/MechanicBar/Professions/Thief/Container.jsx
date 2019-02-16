import { connect } from 'react-redux';
import Thief from './Component';
import { getSelectedMinorTraitIds } from '../../../../../../selectors/specializations';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects,
    selectedMinorTraitIds: getSelectedMinorTraitIds(state, ownProps),
    selectedSpecializationIds: state.selectedSpecializationIds
});

export default connect(mapStateToProps)(Thief);
