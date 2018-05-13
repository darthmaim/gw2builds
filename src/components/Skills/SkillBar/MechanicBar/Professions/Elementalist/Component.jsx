import React from 'react';
import map from 'lodash/map';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkillIcon = (id, skills, index, active, onAttunementChange, specializations) => {
    const isActive = index === active;
    const className = isActive ? '' : style.inactive;

    const skill = skills[id] && isActive && specializations.indexOf(48) !== -1
        ? skills[skills[id].flip_skill]
        : skills[id];

    return (
        <SkillTooltip key={index} skill={skill} action={!isActive ? 'change attunement' : undefined}>
            <SkillIcon className={className} onClick={onAttunementChange.bind(this, index)} skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Elementalist = ({
    availableElementalistAttunementObjects, availableSkillObjects, selectedAttunementId, onAttunementChange,
    selectedSpecializationIds
}) => (
    <div className={style.attunements}>
        {map(availableElementalistAttunementObjects, ({ attunement, id }) =>
            renderSkillIcon(id, availableSkillObjects, attunement, selectedAttunementId, onAttunementChange, selectedSpecializationIds)
        )}
    </div>
);

export default Elementalist;
