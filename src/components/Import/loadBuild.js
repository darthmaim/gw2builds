import { setImportDialogVisible, setSelectedProfession, setSelectedGameMode, setSelectedRace } from '../../actions';

export const TYPE_PVE = 'pve';
export const TYPE_PVP = 'pvp';
export const TYPE_WVW = 'wvw';

export default (dispatch) => (type, { character }) => {
    console.log(`Loading ${type} build of ${character.name}`);

    // set general states
    dispatch(setSelectedGameMode({ gameMode: type }));
    dispatch(setSelectedProfession({ profession: character.profession }));
    dispatch(setSelectedRace({ race: character.race }));

    dispatch(setImportDialogVisible(false));
}
