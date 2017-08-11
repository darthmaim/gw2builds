import { connect } from 'react-redux';
import { getAvailableWeaponObjects, getActiveMainhandWeaponObject, getActiveOffhandWeaponObject, getIsTwoHandedActive } from '~/selectors/skills';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import WeaponBar from './WeaponBar';

const mapStateToProps = (state, ownProps) => ({
    activeMainhandWeaponId: getActiveMainhandWeaponObject(state, ownProps),
    activeOffhandWeaponId: getActiveOffhandWeaponObject(state, ownProps),
    attunement: getActiveAttunement(state, ownProps),
    availableSkillObjects: state.availableSkillObjects,
    availableWeaponObjects: state.availableWeaponObjects,
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: state.selectedMinorTraitIds,
    twoHanded: getIsTwoHandedActive(state, ownProps)
});

export default connect(mapStateToProps)(WeaponBar);
