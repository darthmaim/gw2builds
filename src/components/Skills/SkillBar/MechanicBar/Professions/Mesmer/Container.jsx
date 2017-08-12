import { connect } from 'react-redux';
import Mesmer from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects
});

export default connect(mapStateToProps)(Mesmer);
