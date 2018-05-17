import React from 'react';
import InputGroup from '../Inputs/Group/InputGroup';
import Select from '../Inputs/Select/Select';

export default ({
    availableGameModes, selectedGameMode, onGameModeChange,
    availableProfessions, selectedProfession, onProfessionChange,
    availableRaces, selectedRace, onRaceChange
}) => (
    <div>
        <InputGroup title={"Game Mode"} inline={true}>
            <Select onChange={onGameModeChange} value={selectedGameMode} placeholder={'None'}>
                {availableGameModes && Object.values(availableGameModes).map(
                    (gameMode) => (<Select.Option value={gameMode.id} key={gameMode.id}>{gameMode.id}</Select.Option>)
                )}
            </Select>
        </InputGroup>
        <InputGroup title={"Profession"} inline={true}>
            <Select onChange={onProfessionChange} value={selectedProfession} placeholder={'None'}>
                {availableProfessions && Object.values(availableProfessions).map(
                    (profession) => (
                        <Select.Option value={profession.id} key={profession.id} keywords={[profession.name]}>
                            {profession.name}
                        </Select.Option>
                    )
                )}
            </Select>
        </InputGroup>
        <InputGroup title={"Race"} inline={true}>
            <Select onChange={onRaceChange} value={selectedRace} placeholder={'None'}>
                {availableRaces && Object.values(availableRaces).map(
                    (race) => (
                        <Select.Option value={race.id} key={race.id} keywords={[race.name]}>
                            {race.name}
                        </Select.Option>
                    )
                )}
            </Select>
        </InputGroup>
    </div>
);
