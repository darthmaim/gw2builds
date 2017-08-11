import React from 'react';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import { FormattedNumber } from 'react-intl';
import style from './style.css';

const renderSkill = (professionSkills, availableSkillObjects) => {
    const possibleSkill = professionSkills.filter(skill => skill.slot === 'Profession_1')[0];
    const skill = possibleSkill ? availableSkillObjects[possibleSkill.id] : null;

    return (
        <SkillTooltip skill={skill}>
            <SkillIcon skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Necromancer = ({ professionSkills, availableSkillObjects, health }) => (
    <div className={style.component}>
        <div className={style.bar}><FormattedNumber value={0.69 * health} maximumFractionDigits={0}/></div>
        {renderSkill(professionSkills, availableSkillObjects)}
    </div>
);

export default Necromancer;
