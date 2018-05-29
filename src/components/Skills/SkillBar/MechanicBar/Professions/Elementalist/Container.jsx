import { connect } from 'react-redux';
import { setSelectedElementalistAttunementId } from '../../../../../../actions';
import Elementalist from './Component';
import { getSelectedEliteSpecializationId } from '../../../../../../selectors/specializations';

const mapStateToProps = (state, ownProps) => ({
    // Redux states
    availableElementalistAttunementObjects: state.availableElementalistAttunementObjects,
    availableSkillObjects: state.availableSkillObjects,
    selectedAttunementId: state.selectedElementalistAttunementId,
    selectedWeaverPreviousAttunementId: state.selectedWeaverPreviousAttunementId,
    selectedEliteSpecializationId: getSelectedEliteSpecializationId(state, ownProps)
});


const mapDispatchToProps = (dispatch) => ({
    onAttunementChange: (attunementId) => {
        dispatch(setSelectedElementalistAttunementId({ attunementId }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Elementalist);
