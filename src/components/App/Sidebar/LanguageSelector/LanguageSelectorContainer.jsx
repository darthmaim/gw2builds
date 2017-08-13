import { connect } from 'react-redux';
import { setSelectedLanguage } from '../../../../actions';
import { applyEditorMode } from '../../../../editor-modes';
import LanguageSelector from './LanguageSelector';

const mapStateToProps = state => ({
    selectedLanguage: state.selectedLanguage
});

const mapDispathToProps = dispatch => ({
    onLanguageChange: language => {
        dispatch(setSelectedLanguage({ language }));
        applyEditorMode('language', language);
    }
});

export default connect(mapStateToProps, mapDispathToProps)(LanguageSelector);
