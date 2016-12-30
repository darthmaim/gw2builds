'use strict';

import { connect } from 'react-redux';
import { setWeaponSet } from '../../../actions';
import SetSelection from './SetSelection';

const mapStateToProps = (state, ownProps) => ({
    activeWeaponSet: state.activeWeaponSet,
    profession: state.profession
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onWeaponSetChange: activeWeaponSet => {
        dispatch(setWeaponSet({
            activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetSelection);
