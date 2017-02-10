import { connect } from 'react-redux';
import TraitTooltip from './Tooltip';

const mapStateToProps = state => ({
    activeMajorTraits: state.activeMajorTraits,
    activeMinorTraits: state.activeMinorTraits
});

export default connect(mapStateToProps)(TraitTooltip);
