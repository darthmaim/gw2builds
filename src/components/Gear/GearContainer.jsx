import { connect } from 'react-redux';
import { getHasMultipleWeaponsets } from '../../selectors/gear/weapons';
import Gear from './Gear';

const mapStateToProps = (state, ownProps) => ({
    selectedMainhandWeaponIds: state.selectedMainhandWeaponIds,
    selectedOffhandWeaponIds: state.selectedOffhandWeaponIds,
    hasMultipleWeaponsets: state.hasMultipleWeaponSets,
    availableItemstats: state.availableItemstats
});

export default connect(mapStateToProps)(Gear);
