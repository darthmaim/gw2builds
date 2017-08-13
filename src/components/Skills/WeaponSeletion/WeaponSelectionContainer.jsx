import { connect } from 'react-redux';
import { getAvailableMainhandWeaponObjects, getAvailableOffhandWeaponObjects, getActiveMainhandWeaponId, getActiveOffhandWeaponId, getIsTwoHandedActive } from '../../../selectors/skills';
import { setActiveMainhandWeaponId, setActiveOffhandWeaponId } from '../../../actions';
import WeaponSelection from './WeaponSelection';

const mapStateToProps = (state, ownProps) => ({
    activeMainhandWeaponId: getActiveMainhandWeaponId(state, ownProps),
    activeOffhandWeaponId: getActiveOffhandWeaponId(state, ownProps),
    activeWeaponSet: state.activeWeaponSet,
    availableMainhandWeaponObjects: getAvailableMainhandWeaponObjects(state, ownProps),
    availableOffhandWeaponObjects: getAvailableOffhandWeaponObjects(state, ownProps),
    twoHanded: getIsTwoHandedActive(state, ownProps),
    selectedSpecializationIds: state.selectedSpecializationIds
});

const mergeProps = (mappedProps, { dispatch }, ownProps) => Object.assign({}, mappedProps, ownProps, {
    onMainhandChange: weaponId => {
        dispatch(setActiveMainhandWeaponId({
            weaponId,
            activeWeaponSet: mappedProps.activeWeaponSet
        }));
    },
    onOffhandChange: weaponId => {
        dispatch(setActiveOffhandWeaponId({
            weaponId,
            activeWeaponSet: mappedProps.activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, null, mergeProps)(WeaponSelection);
