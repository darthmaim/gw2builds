'use strict';

import { connect } from 'react-redux';
import { getMainhandWeapons, getOffhandWeapons, getActiveMainhand, getActiveOffhand, getIsTwoHandedActive } from '../../../selectors/skills';
import { setMainhandWeapon, setOffhandWeapon } from '../../../actions';
import WeaponSelection from './WeaponSelection';

const mapStateToProps = (state, ownProps) => ({
    mainhandWeapons: getMainhandWeapons(state, ownProps),
    offhandWeapons: getOffhandWeapons(state, ownProps),
    activeMainhand: getActiveMainhand(state, ownProps),
    activeOffhand: getActiveOffhand(state, ownProps),
    twoHanded: getIsTwoHandedActive(state, ownProps)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMainhandChange: weaponId => {
        dispatch(setMainhandWeapon({
            weaponId
        }));
    },
    onOffhandChange: weaponId => {
        dispatch(setOffhandWeapon({
            weaponId
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(WeaponSelection);
