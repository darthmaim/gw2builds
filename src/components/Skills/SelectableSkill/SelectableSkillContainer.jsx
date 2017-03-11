import { connect } from 'react-redux';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import SelectableSkill from './SelectableSkill';

const mapStateToProps = (state, ownProps) => ({
    attunement: getActiveAttunement(state, ownProps),
    skills: state.skills
});

export default connect(mapStateToProps)(SelectableSkill);
