import React from 'react';
import map from 'lodash/map';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/Tooltip';
import style from './style.css';

const renderSkillIcon = (skill, index, active, onAttunementChange, activeMajorTraits, activeMinorTraits) => {
    const isActive = index === active;
    const className = isActive ? '' : style.inactive;

    return (
        <SkillTooltip key={index} activeMajorTraits={activeMajorTraits} activeMinorTraits={activeMinorTraits} skill={skill}>
            <SkillIcon className={className} onClick={onAttunementChange.bind(this, index)} skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Elementalist = ({ attunements, onAttunementChange, activeAttunement, skills, activeMajorTraits, activeMinorTraits }) => (
    <div className={style.attunements}>
        {map(attunements, ({ id, swap }) =>
            renderSkillIcon(skills[swap], id, activeAttunement, onAttunementChange, activeMajorTraits, activeMinorTraits)
        )}
    </div>
);

export default Elementalist;
