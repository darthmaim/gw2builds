import { connect } from 'react-redux';
import Tooltip from './Tooltip';

const mapStateToProps = (state, ownProps) => ({
    activeMajorTraits: state.activeMajorTraits,
    activeMinorTraits: state.activeMinorTraits
});

export default connect(mapStateToProps)(Tooltip);
