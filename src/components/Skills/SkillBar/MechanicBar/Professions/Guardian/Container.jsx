import { connect } from 'react-redux';
import Guardian from './Component';

const mapStateToProps = (state, ownProps) => ({
    skills: state.skills,
    professionSkills: state.professionSkills
});

export default connect(mapStateToProps)(Guardian);
