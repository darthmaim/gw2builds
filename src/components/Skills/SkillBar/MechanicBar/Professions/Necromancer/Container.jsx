import { connect } from 'react-redux';
import { getAttributeHealth } from '../../../../../../selectors/attributes';
import Necromancer from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableProfessionSkillObjects: state.availableProfessionSkillObjects,
    health: getAttributeHealth(state)
});

export default connect(mapStateToProps)(Necromancer);
