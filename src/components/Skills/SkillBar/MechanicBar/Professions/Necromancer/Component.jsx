import React from 'react';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import { NumberFormat } from '@lingui/macro';
import style from './style.module.css';

const renderSkill = (availableProfessionSkillObjects, availableSkillObjects) => {
    const possibleSkill = availableProfessionSkillObjects.filter(skill => skill.slot === 'Profession_1')[0];
    const skill = possibleSkill ? availableSkillObjects[possibleSkill.id] : null;

    return (
        <SkillTooltip skill={skill}>
            <SkillIcon skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Necromancer = ({ availableProfessionSkillObjects, availableSkillObjects, health }) => (
    <div className={style.component}>
        <div className={style.bar}><NumberFormat value={0.69 * health} format={{maximumFractionDigits: 0}}/></div>
        {renderSkill(availableProfessionSkillObjects, availableSkillObjects)}
    </div>
);

export default Necromancer;
