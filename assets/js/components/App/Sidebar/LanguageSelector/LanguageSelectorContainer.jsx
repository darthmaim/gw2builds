import { connect } from 'react-redux';
import { setLanguage } from '~/actions';
import { applyEditorMode } from '~/editor-modes';
import LanguageSelector from './LanguageSelector';

const mapStateToProps = state => ({
    language: state.selectedLanguage
});

const mapDispathToProps = dispatch => ({
    onLanguageChange: language => {
        dispatch(setLanguage({ language }));
        applyEditorMode('language', language);
    }
});

export default connect(mapStateToProps, mapDispathToProps)(LanguageSelector);
