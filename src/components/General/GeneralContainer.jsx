import { connect } from 'react-redux';
import { setSelectedGameMode, setSelectedProfession, setSelectedRace } from '../../actions';
import General from './General';

const mapStateToProps = state => ({
    availableGameModes: state.availableGameModes,
    availableProfessions: state.availableProfessions,
    availableRaces: state.availableRaces,

    selectedGameMode: state.selectedGameMode,
    selectedProfession: state.selectedProfession,
    selectedRace: state.selectedRace,
});

const mapDispathToProps = dispatch => ({
    onGameModeChange: (gameMode) => dispatch(setSelectedGameMode({ gameMode })),
    onProfessionChange: (profession) => dispatch(setSelectedProfession({ profession })),
    onRaceChange: (race) => dispatch(setSelectedRace({ race })),
});

export default connect(mapStateToProps, mapDispathToProps)(General);
