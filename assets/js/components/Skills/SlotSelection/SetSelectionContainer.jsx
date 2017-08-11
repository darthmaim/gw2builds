import { connect } from 'react-redux';
import { setActiveWeaponSet } from '~/actions';
import SetSelection from './SetSelection';

const mapStateToProps = state => ({
    activeWeaponSet: state.activeWeaponSet,
    profession: state.selectedProfession
});

const mapDispatchToProps = dispatch => ({
    onWeaponSetChange: activeWeaponSet => {
        dispatch(setActiveWeaponSet({
            activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetSelection);
