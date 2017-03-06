import React from 'react';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkill = (skills, professionSkills, weapon) => {
    const possibleSkill = filter(professionSkills, s => s.slot = 'Profession_2' && skills[s.id] && includes(skills[s.id].categories, 'Burst') && skills[s.id].weapon_type === weapon)

    if(possibleSkill.length) {
        return (
            <SkillTooltip skill={skills[possibleSkill[0].id]}>
                <SkillIcon skill={skills[possibleSkill[0].id]} size={32}/>
            </SkillTooltip>
        );
    } else {
        return (<SkillIcon.Empty size={32}/>);
    }
};

const Warrior = ({ professionSkills, skills, weapon }) => (
    <div className={style.component}>
        <div className={style.bar}>
            <span/><span/><span/>
        </div>
        {renderSkill(skills, professionSkills, weapon)}
    </div>
);

export default Warrior;
