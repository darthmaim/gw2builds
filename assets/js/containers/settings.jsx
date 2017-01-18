// TODO: This container will be removed at a later stage in favor of a better settings container

import { connect } from 'react-redux';
import { setLanguage, setGameMode, setProfession, setRace } from '../actions';
import SettingsPanel from '../components/Settings';
import { applyEditorMode } from '../editor-modes';

const mapStateToProps = state => ({
    language: state.language,
    gameMode: state.gameMode,
    profession: state.profession,
    race: state.race
});

const mapDispathToProps = dispatch => ({
    onLanguageChange: language => {
        dispatch(setLanguage({ language }));
        applyEditorMode('language', language);
    },
    onGameModeChange: gameMode => {
        dispatch(setGameMode({ gameMode }));
        applyEditorMode('gameMode', gameMode);
    },
    onProfessionChange: profession => {
        dispatch(setProfession({ profession }));
        applyEditorMode('profession', profession);
    },
    onRaceChange: race => {
        dispatch(setRace({ race }));
        applyEditorMode('race', race);
    }
});

const Settings = connect(mapStateToProps, mapDispathToProps)(SettingsPanel);
export default Settings;
