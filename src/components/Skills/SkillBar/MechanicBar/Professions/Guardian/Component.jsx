import React from 'react';
import groupBy from 'lodash/groupBy';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkills = (professionSkills, skills) => {
    const slots = groupBy(professionSkills.filter(skill => skill.type === 'Profession'), 'slot');

    return ['Profession_1', 'Profession_2', 'Profession_3'].map(slot => {
        if (slots[slot]) {
            return (
                <SkillTooltip skill={skills[slots[slot][0].id]} key={slot}>
                    <SkillIcon skill={skills[slots[slot][0].id]} size={32}/>
                </SkillTooltip>
            );
        } else {
            <SkillIcon/>
        }
    });
};

const Guardian = ({ professionSkills, skills }) => (
    <div className={style.component}>
        {renderSkills(professionSkills, skills)}
    </div>
);

export default Guardian;
