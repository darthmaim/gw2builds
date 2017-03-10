import { connect } from 'react-redux';
import { getActiveMainhand } from '~/selectors/skills/weapons';
import Warrior from './Component';

const mapStateToProps = (state, ownProps) => ({
    skills: state.skills,
    professionSkills: state.professionSkills,
    weapon: getActiveMainhand(state, ownProps)
});

export default connect(mapStateToProps)(Warrior);