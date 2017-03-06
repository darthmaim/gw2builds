import React from 'react';
import filter from 'lodash/filter';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const skillIds = [14443, 14544, 14375, 14367, 14353, 14414, 14506, 14396, 14387];

const renderSkill = (skills, weapon) => {
    const skill = skills[filter(skillIds, id => skills[id] && skills[id].weapon_type === weapon)[0]];

    if(skill) {
        return (
            <SkillTooltip skill={skill}>
                <SkillIcon skill={skill} size={32}/>
            </SkillTooltip>
        );
    } else {
        return (<SkillIcon.Empty size={32}/>);
    }
};

const Warrior = ({ skills, weapon }) => (
    <div className={style.component}>
        <div className={style.bar}>
            <span/><span/>
        </div>
        {renderSkill(skills, weapon)}
    </div>
);

export default Warrior;
