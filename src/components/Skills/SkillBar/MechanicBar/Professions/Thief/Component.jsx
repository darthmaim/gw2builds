import React from 'react';
import range from 'lodash/range';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
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

const Thief = ({ professionSkills, availableSkillObjects }) => (
    <div className={style.component}>
        {renderSkill(professionSkills, availableSkillObjects)}
        <SkillIcon.Empty size={32}/>
        <div className={style.initiative}>
            {range(0, 15).map(i => (<span key={i}/>))}
        </div>
    </div>
);

export default Thief;
