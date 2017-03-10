import { connect } from 'react-redux';
import Mesmer from './Component';

const mapStateToProps = (state, ownProps) => ({
    skills: state.skills,
    professionSkills: state.professionSkills
});

export default connect(mapStateToProps)(Mesmer);