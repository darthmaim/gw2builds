import { connect } from 'react-redux';
import MechanicBar from './MechanicBar';
import { setMechanic } from '../../../actions/skills';
import { getActiveMechanic } from '../../../selectors/skills/mechanic';

const mapStateToProps = (state, ownProps) => ({
    profession: state.profession,
    activeWeaponSet: state.activeWeaponSet,
    mechanic: getActiveMechanic(state, ownProps)
});

const mergeProps = (mappedProps, {dispatch}, ownProps) => Object.assign({}, mappedProps, ownProps, {
    onMechanicChange: mechanic => {
        dispatch(setMechanic({
            mechanic,
            activeWeaponSet: mappedProps.activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, null, mergeProps)(MechanicBar);
