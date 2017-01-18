import { connect } from 'react-redux';
import MechanicBar from './MechanicBar';

const mapStateToProps = state => ({
    profession: state.profession
});

export default connect(mapStateToProps)(MechanicBar);
