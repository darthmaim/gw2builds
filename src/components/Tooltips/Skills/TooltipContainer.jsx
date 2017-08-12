import { connect } from 'react-redux';
import Tooltip from './Tooltip';

const mapStateToProps = (state, ownProps) => ({
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: state.selectedMinorTraitIds
});

export default connect(mapStateToProps)(Tooltip);
