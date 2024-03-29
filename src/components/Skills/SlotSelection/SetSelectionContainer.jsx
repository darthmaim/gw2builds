import { connect } from 'react-redux';
import { setActiveWeaponSet } from '../../../actions';
import SetSelection from './SetSelection';

const mapStateToProps = state => ({
    activeWeaponSet: state.activeWeaponSet,
    hasMultipleWeaponsets: state.hasMultipleWeaponSets
});

const mapDispatchToProps = dispatch => ({
    onWeaponSetChange: activeWeaponSet => {
        dispatch(setActiveWeaponSet({
            activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetSelection);
