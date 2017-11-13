import { connect } from 'react-redux';
import Tooltip from './Tooltip';
import { getSelectedMinorTraitIds } from '../../../selectors/specializations';

const mapStateToProps = (state, ownProps) => ({
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: getSelectedMinorTraitIds(state, ownProps)
});

export default connect(mapStateToProps)(Tooltip);
