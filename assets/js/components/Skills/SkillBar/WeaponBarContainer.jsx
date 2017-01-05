import { connect } from 'react-redux';
import { getActiveMainhand, getActiveOffhand, getIsTwoHandedActive } from '../../../selectors/skills';
import { getActiveMechanic } from '../../../selectors/skills/mechanic';
import WeaponBar from './WeaponBar';

const mapStateToProps = (state, ownProps) => ({
    mainhand: getActiveMainhand(state, ownProps),
    offhand: getActiveOffhand(state, ownProps),
    isTwoHanded: getIsTwoHandedActive(state, ownProps),
    mechanic: getActiveMechanic(state, ownProps),
    weapons: state.weapons,
    skills: state.skills,
    activeMajorTraits: state.activeMajorTraits,
    activeMinorTraits: state.activeMinorTraits
});

export default connect(mapStateToProps)(WeaponBar);
