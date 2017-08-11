import { connect } from 'react-redux';
import Guardian from './Component';

const mapStateToProps = (state, ownProps) => ({
    // Redux states
    availableSkillObjects: state.availableSkillObjects,
    professionSkills: state.professionSkills
});

export default connect(mapStateToProps)(Guardian);
