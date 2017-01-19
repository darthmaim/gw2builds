// TODO: This container will be removed at a later stage in favor of a better settings container

import { connect } from 'react-redux';
import { setSelectedLanguage, setSelectedGameMode, setSelectedProfession, setSelectedRace } from '../actions';
import SettingsPanel from '../components/Settings';
import { applyEditorMode } from '../editor-modes';

const mapStateToProps = state => ({
    language: state.selectedLanguage,
    gameMode: state.selectedGameMode,
    profession: state.selectedProfession,
    race: state.selectedRace
});

const mapDispathToProps = dispatch => ({
    onLanguageChange: language => {
        dispatch(setSelectedLanguage({ language }));
        applyEditorMode('language', language);
    },
    onGameModeChange: gameMode => {
        dispatch(setSelectedGameMode({ gameMode }));
        applyEditorMode('gameMode', gameMode);
    },
    onProfessionChange: profession => {
        dispatch(setSelectedProfession({ profession }));
        applyEditorMode('profession', profession);
    },
    onRaceChange: race => {
        dispatch(setSelectedRace({ race }));
        applyEditorMode('race', race);
    }
});

const Settings = connect(mapStateToProps, mapDispathToProps)(SettingsPanel);
export default Settings;
