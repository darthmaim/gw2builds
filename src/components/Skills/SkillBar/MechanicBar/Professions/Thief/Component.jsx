import React from 'react';
import range from 'lodash/range';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkill = ({ availableProfessionSkillObjects, availableSkillObjects, selectedSpecializationIds }) => {
    const allPossibleSkills = availableProfessionSkillObjects.filter(
        (skill) => skill.slot === 'Profession_1' && availableSkillObjects[skill.id]
    );
    const possibleSkillsWithSpecialization = allPossibleSkills.filter(
        (skill) => selectedSpecializationIds.indexOf(availableSkillObjects[skill.id].specialization) !== -1
    );
    const possibleSkillsWithoutSpecialization = allPossibleSkills.filter(
        (skill) => availableSkillObjects[skill.id].specialization === undefined
    );

    const possibleSkills = possibleSkillsWithSpecialization.length
        ? possibleSkillsWithSpecialization
        : possibleSkillsWithoutSpecialization;

    console.assert(
        Object.keys(availableSkillObjects).length === 0 || possibleSkills.length === 1,
        `Expected to find exactly 1 profession skill, but found ${possibleSkills.length}:`,
        possibleSkills
    );

    const skill = possibleSkills.length ? availableSkillObjects[possibleSkills[0].id] : null;

    return (
        <SkillTooltip skill={skill}>
            <SkillIcon skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const getInitiative = ({ selectedMinorTraitIds }) =>
    selectedMinorTraitIds.indexOf(1232) !== -1 ? 15 : 12;

const Thief = (props) => (
    <div className={style.component}>
        {renderSkill(props)}
        <SkillIcon.Empty size={32}/>
        <div className={style.initiative}>
            {range(0, getInitiative(props)).map(i => (<span key={i}/>))}
        </div>
    </div>
);

export default Thief;
