import { connect } from 'react-redux';
import { setLanguage } from '../actions';
import LanguageSelector from '../components/App/Sidebar/LanguageSelector';
import { applyEditorMode } from '../editor-modes';

const mapStateToProps = state => ({
    language: state.language
});

const mapDispathToProps = dispatch => ({
    onLanguageChange: language => {
        dispatch(setLanguage({ language }));
        applyEditorMode('language', language);
    }
});

export default connect(mapStateToProps, mapDispathToProps)(LanguageSelector);
