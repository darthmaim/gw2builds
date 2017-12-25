import { connect } from 'react-redux';
import Engineer from './Component';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    selectedSkillIds: state.selectedSkillIds
});

export default connect(mapStateToProps)(Engineer);
