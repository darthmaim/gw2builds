import { connect } from 'react-redux';
import { setSelectedElementalistAttunementId } from '../../../../../../actions';
import Elementalist from './Component';

const mapStateToProps = (state, ownProps) => ({
    // Redux states
    availableElementalistAttunementObjects: state.availableElementalistAttunementObjects,
    availableSkillObjects: state.availableSkillObjects,
    selectedAttunementId: state.selectedElementalistAttunementId,
    selectedSpecializationIds: state.selectedSpecializationIds
});

const mergeProps = (mappedProps, { dispatch }, ownProps) => Object.assign({}, mappedProps, ownProps, {
    onAttunementChange: attunementId => {
        dispatch(setSelectedElementalistAttunementId({ attunementId }));
    }
});

export default connect(mapStateToProps, null, mergeProps)(Elementalist);
