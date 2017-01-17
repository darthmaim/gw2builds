import { connect } from 'react-redux';
import MechanicBar from './MechanicBar';

const mapStateToProps = (state, ownProps) => ({
    profession: state.profession,
});

export default connect(mapStateToProps)(MechanicBar);
