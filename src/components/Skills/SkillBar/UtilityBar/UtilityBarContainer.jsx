import { connect } from 'react-redux';
import UtilityBar from './UtilityBar';
import { setSelectedSkillId } from '../../../../actions';

const mapStateToProps = (state, ownProps) => ({
    selectedSkillIds: state.selectedSkillIds,
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects
});

const mapDispatchToProps = dispatch => ({
    onSelectedSkillChange: (slotId, skillId) => {
        dispatch(setSelectedSkillId({
            slotId, skillId
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UtilityBar);
