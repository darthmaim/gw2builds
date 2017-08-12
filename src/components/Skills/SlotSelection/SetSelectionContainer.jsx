import { connect } from 'react-redux';
import { setActiveWeaponSet } from '~/actions';
import SetSelection from './SetSelection';
import { getHasMultipleWeaponsets } from '~/selectors/skills';

const mapStateToProps = state => ({
    activeWeaponSet: state.activeWeaponSet,
    hasMultipleWeaponsets: getHasMultipleWeaponsets(state)
});

const mapDispatchToProps = dispatch => ({
    onWeaponSetChange: activeWeaponSet => {
        dispatch(setActiveWeaponSet({
            activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetSelection);
