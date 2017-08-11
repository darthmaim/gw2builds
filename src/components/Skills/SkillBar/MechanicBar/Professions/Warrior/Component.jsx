import React from 'react';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkill = (availableSkillObjects, professionSkills, weapon) => {
    const possibleSkill = filter(professionSkills, s => s.slot = 'Profession_2' && availableSkillObjects[s.id] && includes(availableSkillObjects[s.id].categories, 'Burst') && availableSkillObjects[s.id].weapon_type === weapon);

    if (possibleSkill.length) {
        return (
            <SkillTooltip skill={availableSkillObjects[possibleSkill[0].id]}>
                <SkillIcon skill={availableSkillObjects[possibleSkill[0].id]} size={32}/>
            </SkillTooltip>
        );
    } else {
        return (<SkillIcon.Empty size={32}/>);
    }
};

const Warrior = ({ professionSkills, availableSkillObjects, weapon }) => (
    <div className={style.component}>
        <div className={style.bar}>
            <span/><span/><span/>
        </div>
        {renderSkill(availableSkillObjects, professionSkills, weapon)}
    </div>
);

export default Warrior;
