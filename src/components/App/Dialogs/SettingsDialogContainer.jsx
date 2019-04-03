import { connect } from 'react-redux';
import { setSelectedLanguage, setSelectedTheme, setSettingsShowIds } from '../../../actions';
import SettingsDialog from './SettingsDialog';

const mapStateToProps = (state, ownProps) => ({
    selectedLanguage: state.selectedLanguage,
    selectedTheme: state.selectedTheme,
    settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
    onLanguageChange: (language) => {
        dispatch(setSelectedLanguage({ language }));
    },
    onThemeChange: (theme) => {
        dispatch(setSelectedTheme({ theme }));
    },
    setSettingsShowIds: (showIds) => dispatch(setSettingsShowIds({ showIds }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
