import { connect } from 'react-redux';
import Guardian from './Component';

const mapStateToProps = (state, ownProps) => ({
    // Redux states
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects
});

export default connect(mapStateToProps)(Guardian);
