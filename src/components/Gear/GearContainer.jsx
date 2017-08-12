import { connect } from 'react-redux';
import { getHasMultipleWeaponsets } from '~/selectors/skills';
import Gear from './Gear';

const mapStateToProps = (state, ownProps) => ({
    selectedMainhandWeaponIds: state.selectedMainhandWeaponIds,
    selectedOffhandWeaponIds: state.selectedOffhandWeaponIds,
    hasMultipleWeaponsets: getHasMultipleWeaponsets(state, ownProps),
    selectedLanguage: state.selectedLanguage
});

export default connect(mapStateToProps)(Gear);
