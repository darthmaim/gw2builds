import { connect } from 'react-redux';
import { setImportDialogVisible, setSelectedGameMode, setSelectedProfession, setSelectedRace } from '../../actions';
import Header from './Header';

const mapDispatchToProps = (dispatch) => ({
    setImportDialogVisible: (visible) => dispatch(setImportDialogVisible(visible)),
    resetBuild: () => {
        dispatch(setSelectedGameMode({ gameMode: null }));
        dispatch(setSelectedProfession({ profession: null }));
        dispatch(setSelectedRace({ race: null }));
    }
});

export default connect(null, mapDispatchToProps)(Header);
