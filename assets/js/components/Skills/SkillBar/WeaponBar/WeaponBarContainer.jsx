import { connect } from 'react-redux';
import { getActiveMainhand, getActiveOffhand, getIsTwoHandedActive } from '~/selectors/skills';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import WeaponBar from './WeaponBar';

const mapStateToProps = (state, ownProps) => ({
    mainhand: getActiveMainhand(state, ownProps),
    offhand: getActiveOffhand(state, ownProps),
    isTwoHanded: getIsTwoHandedActive(state, ownProps),
    attunement: getActiveAttunement(state, ownProps),
    weapons: state.weapons,
    skills: state.skills,
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: state.selectedMinorTraitIds
});

export default connect(mapStateToProps)(WeaponBar);
