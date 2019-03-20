import React, { Fragment } from 'react';
import InputGroup from '../Inputs/Group/InputGroup';
import Select from '../Inputs/Select/Select';
import style from './General.module.css';
import { Trans } from '@lingui/macro';

export default (props) => (
    <Fragment>
        {renderGameMode(props)}
        {renderProfession(props)}
        {renderRace(props)}
    </Fragment>
);

const renderGameMode = ({availableGameModes, selectedGameMode, onGameModeChange}) => (
    <InputGroup title={<Trans>Game Mode</Trans>} inline={true}>
        <Select onChange={onGameModeChange} value={selectedGameMode} placeholder={<Trans>None</Trans>}>
            {availableGameModes && Object.values(availableGameModes).map(
                (gameMode) => (<Select.Option value={gameMode.id} key={gameMode.id}><Trans id={gameMode.id}>{gameMode.id}</Trans></Select.Option>)
            )}
        </Select>
    </InputGroup>
);

const renderProfession = ({availableProfessions, selectedProfession, onProfessionChange}) => (
    <InputGroup title={<Trans>Profession</Trans>} inline={true}>
        <Select onChange={onProfessionChange} value={selectedProfession} placeholder={<Trans>None</Trans>}>
            {availableProfessions && Object.values(availableProfessions).map(
                (profession) => (
                    <Select.Option value={profession.id} key={profession.id} keywords={[profession.name]}>
                        <img className={style.icon} src={profession.icon_big} alt=""/>
                        {profession.name}
                    </Select.Option>
                )
            )}
        </Select>
    </InputGroup>
);

const renderRace = ({availableRaces, selectedRace, onRaceChange}) => (
    <InputGroup title={<Trans>Race</Trans>} inline={true}>
        <Select onChange={onRaceChange} value={selectedRace} placeholder={<Trans>None</Trans>}>
            {availableRaces && Object.values(availableRaces).map(
                (race) => (
                    <Select.Option value={race.id} key={race.id} keywords={[race.name]}>
                        {race.name}
                    </Select.Option>
                )
            )}
        </Select>
    </InputGroup>
);
