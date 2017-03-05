import { connect } from 'react-redux';
import Thief from './Component';

const mapStateToProps = (state, ownProps) => ({
    skills: state.skills
});

export default connect(mapStateToProps)(Thief);
