'use strict';

import { connect } from 'react-redux';
import { getMainhandWeapons, getOffhandWeapons } from '../../../selectors/skills';
import WeaponSelection from './WeaponSelection';

const mapStateToProps = (state, ownProps) => ({
    // selectedWeapon: getSelectedWeapon(state, ownProps),
    mainHand: getMainhandWeapons(state, ownProps),
    offHand: getOffhandWeapons(state, ownProps)
});

export default connect(mapStateToProps)(WeaponSelection);
