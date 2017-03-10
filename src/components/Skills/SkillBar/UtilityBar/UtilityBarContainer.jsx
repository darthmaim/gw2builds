import { connect } from 'react-redux';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import UtilityBar from './UtilityBar';

const mapStateToProps = (state, ownProps) => ({
    attunement: getActiveAttunement(state, ownProps),
    skills: state.skills
});

export default connect(mapStateToProps)(UtilityBar);
