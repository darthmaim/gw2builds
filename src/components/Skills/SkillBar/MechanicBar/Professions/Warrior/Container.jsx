import { connect } from 'react-redux';
import { getActiveMainhand } from '~/selectors/skills/weapons';
import Warrior from './Component';

const mapStateToProps = (state, ownProps) => ({
    skills: state.skills,
    weapon: getActiveMainhand(state, ownProps)
});

export default connect(mapStateToProps)(Warrior);
