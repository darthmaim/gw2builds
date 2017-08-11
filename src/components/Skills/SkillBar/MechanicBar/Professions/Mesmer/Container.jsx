import { connect } from 'react-redux';
import Mesmer from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    professionSkills: state.professionSkills
});

export default connect(mapStateToProps)(Mesmer);
