import React from 'react';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkill = ({ availableProfessionSkillObjects, availableSkillObjects, weapon, selectedEliteSpecializationId }) => {
    const allPossibleSkills = filter(
        availableProfessionSkillObjects,
        (skill) => skill.slot === 'Profession_1' &&
            availableSkillObjects[skill.id] &&
            includes(availableSkillObjects[skill.id].categories, 'Burst') &&
            availableSkillObjects[skill.id].weapon_type === weapon
    );

    const possibleSkillsWithCorrectEliteSpec = allPossibleSkills.filter(
        (skill) => availableSkillObjects[skill.id].specialization === selectedEliteSpecializationId
    );

    const possibleSkillsWithNoSpecialization = allPossibleSkills.filter(
        (skill) => availableSkillObjects[skill.id].specialization === undefined
    );

    // use skills with correct elite spec, fallback to skills without specialization requirement
    const possibleSkills = possibleSkillsWithCorrectEliteSpec.length
        ? possibleSkillsWithCorrectEliteSpec
        : possibleSkillsWithNoSpecialization;

    console.assert(
        weapon === undefined || possibleSkills.length === 1,
        `Expected to find a single burst skill for ${weapon}, but found ${possibleSkills.length}:`,
        possibleSkills
    );

    if (possibleSkills.length) {
        return (
            <SkillTooltip skill={availableSkillObjects[possibleSkills[0].id]}>
                <SkillIcon skill={availableSkillObjects[possibleSkills[0].id]} size={32}/>
            </SkillTooltip>
        );
    } else {
        return (<SkillIcon.Empty size={32}/>);
    }
};

const renderBerserkerSkill = ({ availableProfessionSkillObjects, availableSkillObjects, selectedEliteSpecializationId }) => {
    if(selectedEliteSpecializationId !== 18) {
        return null;
    }

    // hardcoded, because there is no way to distinguish between skills 30435 and 30185.
    // 30185 is the one documented in the wiki and equipped ingame. I'm not sure when 30185 is used.
    const skill = availableSkillObjects[30435];

    return (
        <SkillTooltip skill={skill}>
            <SkillIcon skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Warrior = (props) => (
    <div className={style.component}>
        <div className={style.bar}>
            <span/><span/><span/>
        </div>
        {renderSkill(props)}
        {renderBerserkerSkill(props)}
    </div>
);

export default Warrior;
