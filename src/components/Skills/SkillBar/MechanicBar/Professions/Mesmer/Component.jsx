import React from 'react';
import range from 'lodash/range';
import groupBy from 'lodash/groupBy';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkills = ({ availableProfessionSkillObjects, availableSkillObjects, selectedSpecializationIds }) => {
    const skills = groupBy(availableProfessionSkillObjects.filter(skill => skill.type === 'Profession'), 'slot');
    const slots = ['Profession_1', 'Profession_2', 'Profession_3', 'Profession_4'].concat(
        selectedSpecializationIds.indexOf(40) !== -1 ? ['Profession_5'] : []
    );

    return slots.map(slot =>
        skills[slot]
            ? (
                <SkillTooltip skill={availableSkillObjects[skills[slot][0].id]} key={slot}>
                   <SkillIcon skill={availableSkillObjects[skills[slot][0].id]} size={32}/>
                </SkillTooltip>
            ) : (
                <SkillIcon key={slot} size={32}/>
            )
    );
};

const Mesmer = (props) => (
    <div className={style.component}>
        <div className={style.illusions}>
            {range(0, 3).map(i => (<span key={i}/>))}
        </div>
        <div className={style.skills}>
            {renderSkills(props)}
        </div>
    </div>
);

export default Mesmer;
