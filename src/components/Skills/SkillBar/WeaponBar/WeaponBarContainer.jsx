import { connect } from 'react-redux';
import { getActiveMainhandWeaponId, getActiveOffhandWeaponId, getIsTwoHandedActive } from '../../../../selectors/gear';
import WeaponBar from './WeaponBar';

const mapStateToProps = (state, ownProps) => ({
    activeMainhandWeaponId: getActiveMainhandWeaponId(state, ownProps),
    activeOffhandWeaponId: getActiveOffhandWeaponId(state, ownProps),
    availableSkillObjects: state.availableSkillObjects,
    availableWeaponObjects: state.availableWeaponObjects,
    isTwoHanded: getIsTwoHandedActive(state, ownProps),
    selectedAttunementId: state.selectedElementalistAttunementId
});

export default connect(mapStateToProps)(WeaponBar);
