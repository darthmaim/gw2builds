import { connect } from 'react-redux';
import { getActiveMainhandWeaponId, getActiveOffhandWeaponId, getIsTwoHandedActive } from '../../../../selectors/skills';
import { getActiveAttunement } from '../../../../selectors/skills/mechanic';
import WeaponBar from './WeaponBar';

const mapStateToProps = (state, ownProps) => ({
    activeMainhandWeaponId: getActiveMainhandWeaponId(state, ownProps),
    activeOffhandWeaponId: getActiveOffhandWeaponId(state, ownProps),
    activeAttunement: getActiveAttunement(state, ownProps),
    availableSkillObjects: state.availableSkillObjects,
    availableWeaponObjects: state.availableWeaponObjects,
    isTwoHanded: getIsTwoHandedActive(state, ownProps)
});

export default connect(mapStateToProps)(WeaponBar);
