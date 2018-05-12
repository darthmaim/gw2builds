import { connect } from 'react-redux';
import TraitTooltip from './Tooltip';
import { getSelectedMinorTraitIds } from '../../../selectors/specializations';

const mapStateToProps = (state, ownProps) => ({
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: getSelectedMinorTraitIds(state, ownProps),
    showIds: state.settings.showIds
});

export default connect(mapStateToProps)(TraitTooltip);
