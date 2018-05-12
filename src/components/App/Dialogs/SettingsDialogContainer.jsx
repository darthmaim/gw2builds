import { connect } from 'react-redux';
import { setSelectedLanguage } from '../../../actions';
import SettingsDialog from './SettingsDialog';

const mapStateToProps = (state, ownProps) => ({
    selectedLanguage: state.selectedLanguage
});

const mapDispatchToProps = (dispatch) => ({
    onLanguageChange: (language) => {
        dispatch(setSelectedLanguage({ language }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
