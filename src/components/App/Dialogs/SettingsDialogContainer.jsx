import { connect } from 'react-redux';
import { setSelectedLanguage, setSettingsShowIds } from '../../../actions';
import SettingsDialog from './SettingsDialog';

const mapStateToProps = (state, ownProps) => ({
    selectedLanguage: state.selectedLanguage,
    settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
    onLanguageChange: (language) => {
        dispatch(setSelectedLanguage({ language }));
    },
    setSettingsShowIds: (showIds) => dispatch(setSettingsShowIds({ showIds }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
