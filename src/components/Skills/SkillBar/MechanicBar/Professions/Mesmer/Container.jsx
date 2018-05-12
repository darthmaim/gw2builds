import { connect } from 'react-redux';
import Mesmer from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects,
    selectedSpecializationIds: state.selectedSpecializationIds
});

export default connect(mapStateToProps)(Mesmer);
