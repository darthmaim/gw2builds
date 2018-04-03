import { connect } from 'react-redux';
import Ranger from './Component';
import { setSelectedRangerPetId } from '../../../../../../actions/mechanics/ranger';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects,
    availableRangerPets: state.availableRangerPets,
    selectedRangerPetIds: state.selectedRangerPetIds
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setSelectedRangerPetId: (petId) => dispatch(setSelectedRangerPetId({ slotId: 0, petId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranger);
