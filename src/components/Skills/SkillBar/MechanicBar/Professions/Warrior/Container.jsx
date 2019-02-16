import { connect } from 'react-redux';
import { getActiveMainhandWeaponId } from '../../../../../../selectors/gear/weapons';
import { getSelectedEliteSpecializationId } from '../../../../../../selectors/specializations';
import Warrior from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects,
    selectedEliteSpecializationId: getSelectedEliteSpecializationId(state, ownProps),
    weapon: getActiveMainhandWeaponId(state, ownProps)
});

export default connect(mapStateToProps)(Warrior);
