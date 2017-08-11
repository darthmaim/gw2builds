import { connect } from 'react-redux';
import { getActiveMainhandWeaponId } from '~/selectors/skills/weapons';
import Warrior from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    professionSkills: state.professionSkills,
    weapon: getActiveMainhandWeaponId(state, ownProps)
});

export default connect(mapStateToProps)(Warrior);
