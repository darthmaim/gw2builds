import { connect } from 'react-redux';
import { getHasMultipleWeaponsets } from '~/selectors/skills';
import Gear from './Gear';

const mapStateToProps = (state, ownProps) => ({
    activeMainhandWeapons: state.activeMainhandWeapons,
    activeOffhandWeapons: state.activeOffhandWeapons,
    hasMultipleWeaponsets: getHasMultipleWeaponsets(state, ownProps),
    language: state.language
});

export default connect(mapStateToProps)(Gear);
