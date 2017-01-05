import { connect } from 'react-redux';
import { getActiveMainhand, getActiveOffhand, getIsTwoHandedActive } from '../../../selectors/skills';
import WeaponBar from './WeaponBar';

const mapStateToProps = (state, ownProps) => ({
    mainhand: getActiveMainhand(state, ownProps),
    offhand: getActiveOffhand(state, ownProps),
    isTwoHanded: getIsTwoHandedActive(state, ownProps),
    weapons: state.weapons,
    skills: state.skills,
    activeMajorTraits: state.activeMajorTraits,
    activeMinorTraits: state.activeMinorTraits
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WeaponBar);
