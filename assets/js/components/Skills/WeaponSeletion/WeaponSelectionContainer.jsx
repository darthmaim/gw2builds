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
    twoHanded: getIsTwoHandedActive(state, ownProps),
    activeWeaponSet: state.activeWeaponSet
});

const mergeProps = (mappedProps, {dispatch}, ownProps) => Object.assign({}, mappedProps, ownProps, {
    onMainhandChange: weaponId => {
        dispatch(setMainhandWeapon({
            weaponId,
            activeWeaponSet: mappedProps.activeWeaponSet
        }));
    },
    onOffhandChange: weaponId => {
        dispatch(setOffhandWeapon({
            weaponId,
            activeWeaponSet: mappedProps.activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, null, mergeProps)(WeaponSelection);
