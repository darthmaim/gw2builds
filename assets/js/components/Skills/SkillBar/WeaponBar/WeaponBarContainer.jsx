import { connect } from 'react-redux';
import { getAvailableWeaponObjects, getActiveMainhandWeaponId, getActiveOffhandWeaponId, getIsTwoHandedActive } from '~/selectors/skills';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import WeaponBar from './WeaponBar';

const mapStateToProps = (state, ownProps) => ({
    activeMainhandWeaponId: getActiveMainhandWeaponId(state, ownProps),
    activeOffhandWeaponId: getActiveOffhandWeaponId(state, ownProps),
    attunement: getActiveAttunement(state, ownProps),
    availableSkillObjects: state.availableSkillObjects,
    availableWeaponObjects: state.availableWeaponObjects,
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: state.selectedMinorTraitIds,
    twoHanded: getIsTwoHandedActive(state, ownProps)
});

export default connect(mapStateToProps)(WeaponBar);
