import React from 'react';
import range from 'lodash/range';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkill = ({ availableProfessionSkillObjects, availableSkillObjects }) => {
    const possibleSkill = availableProfessionSkillObjects.filter(skill => skill.slot === 'Profession_1')[0];
    const skill = possibleSkill ? availableSkillObjects[possibleSkill.id] : null;

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
