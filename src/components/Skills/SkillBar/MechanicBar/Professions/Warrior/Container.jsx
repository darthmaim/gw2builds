import { connect } from 'react-redux';
import { getActiveMainhandWeaponId } from '../../../../../../selectors/gear/weapons';
import Warrior from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects,
    weapon: getActiveMainhandWeaponId(state, ownProps)
});

export default connect(mapStateToProps)(Warrior);
