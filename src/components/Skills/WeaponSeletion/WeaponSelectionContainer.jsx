import { connect } from 'react-redux';
import { getAvailableMainhandWeaponObjects, getAvailableOffhandWeaponObjects, getActiveMainhandWeaponId, getActiveOffhandWeaponId, getIsTwoHandedActive } from '../../../selectors/gear';
import { setSelectedMainhandWeaponId, setSelectedOffhandWeaponId } from '../../../actions';
import WeaponSelection from './WeaponSelection';

const mapStateToProps = (state, ownProps) => ({
    activeMainhandWeaponId: getActiveMainhandWeaponId(state, ownProps),
    activeOffhandWeaponId: getActiveOffhandWeaponId(state, ownProps),
    activeWeaponSet: state.activeWeaponSet,
    availableMainhandWeaponObjects: getAvailableMainhandWeaponObjects(state, ownProps),
    availableOffhandWeaponObjects: getAvailableOffhandWeaponObjects(state, ownProps),
    availableSpecializationObjects: state.availableSpecializationObjects,
    twoHanded: getIsTwoHandedActive(state, ownProps),
    selectedSpecializationIds: state.selectedSpecializationIds
});

const mergeProps = (mappedProps, { dispatch }, ownProps) => Object.assign({}, mappedProps, ownProps, {
    onMainhandChange: weaponId => {
        dispatch(setSelectedMainhandWeaponId({
            weaponSet: mappedProps.activeWeaponSet,
            weaponId
        }));
    },
    onOffhandChange: weaponId => {
        dispatch(setSelectedOffhandWeaponId({
            weaponSet: mappedProps.activeWeaponSet,
            weaponId
        }));
    }
});

export default connect(mapStateToProps, null, mergeProps)(WeaponSelection);
