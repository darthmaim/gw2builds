import { connect } from 'react-redux';
import Thief from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects
});

export default connect(mapStateToProps)(Thief);
