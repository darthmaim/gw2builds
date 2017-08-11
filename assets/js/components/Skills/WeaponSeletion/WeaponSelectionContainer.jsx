import { connect } from 'react-redux';
import { getAvailableMainhandWeaponObjects, getAvailableOffhandWeaponObjects, getActiveMainhandWeaponObject, getActiveOffhandWeaponObject, getIsTwoHandedActive } from '~/selectors/skills';
import { setMainhandWeapon, setOffhandWeapon } from '~/actions';
import WeaponSelection from './WeaponSelection';

const mapStateToProps = (state, ownProps) => ({
    availableMainhandWeaponObjects: getAvailableMainhandWeaponObjects(state, ownProps),
    availableOffhandWeaponObjects: getAvailableOffhandWeaponObjects(state, ownProps),
    activeMainhandWeaponId: getActiveMainhandWeaponObject(state, ownProps),
    activeOffhandWeaponId: getActiveOffhandWeaponObject(state, ownProps),
    activeWeaponSet: state.activeWeaponSet,
    twoHanded: getIsTwoHandedActive(state, ownProps),
    selectedSpecializationIds: state.selectedSpecializationIds
});

const mergeProps = (mappedProps, { dispatch }, ownProps) => Object.assign({}, mappedProps, ownProps, {
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
