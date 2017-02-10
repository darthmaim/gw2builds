import { connect } from 'react-redux';
import { setWeaponSet } from '~/actions';
import SetSelection from './SetSelection';

const mapStateToProps = state => ({
    activeWeaponSet: state.activeWeaponSet,
    profession: state.profession
});

const mapDispatchToProps = dispatch => ({
    onWeaponSetChange: activeWeaponSet => {
        dispatch(setWeaponSet({
            activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetSelection);
