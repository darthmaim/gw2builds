import { connect } from 'react-redux';
import Thief from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    professionSkills: state.professionSkills
});

export default connect(mapStateToProps)(Thief);
