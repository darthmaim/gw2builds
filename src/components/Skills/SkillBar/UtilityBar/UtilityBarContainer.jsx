import { connect } from 'react-redux';
import { getActiveMainhand, getActiveOffhand, getIsTwoHandedActive } from '~/selectors/skills';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import UtilityBar from './UtilityBar';

const mapStateToProps = (state, ownProps) => ({
    mainhand: getActiveMainhand(state, ownProps),
    offhand: getActiveOffhand(state, ownProps),
    isTwoHanded: getIsTwoHandedActive(state, ownProps),
    attunement: getActiveAttunement(state, ownProps),
    skills: state.skills
});

export default connect(mapStateToProps)(UtilityBar);
