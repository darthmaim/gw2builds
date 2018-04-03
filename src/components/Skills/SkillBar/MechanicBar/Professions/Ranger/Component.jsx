import React from 'react';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import { FormattedNumber } from 'react-intl';
import style from './style.css';
import Select from '../../../../../Inputs/Select/Select';

const renderSkill = (availableProfessionSkillObjects, availableSkillObjects) => {
    const possibleSkill = availableProfessionSkillObjects.filter(skill => skill.slot === 'Profession_1')[0];
    const skill = possibleSkill ? availableSkillObjects[possibleSkill.id] : null;

    return (
        <SkillTooltip skill={skill}>
            <SkillIcon skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Ranger = ({ availableProfessionSkillObjects, availableSkillObjects, availableRangerPets, setSelectedRangerPetId, selectedRangerPetIds }) => (
    <div className={style.component}>
        <div className={style.attackMyTarget}></div>
        <Select value={selectedRangerPetIds[0]} onChange={setSelectedRangerPetId}>
            {Object.values(availableRangerPets).map(
                (pet) => (<Select.Option key={pet.id} value={pet.id}>{pet.id} {pet.name}</Select.Option>)
            )}
        </Select>
    </div>
);

export default Ranger;
