import { connect } from 'react-redux';
import TraitTooltip from './Tooltip';

const mapStateToProps = state => ({
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: state.selectedMinorTraitIds
});

export default connect(mapStateToProps)(TraitTooltip);
