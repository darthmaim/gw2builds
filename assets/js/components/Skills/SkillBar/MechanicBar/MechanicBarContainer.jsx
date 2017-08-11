import { connect } from 'react-redux';
import MechanicBar from './MechanicBar';

const mapStateToProps = state => ({
    selectedProfession: state.selectedProfession
});

export default connect(mapStateToProps)(MechanicBar);
