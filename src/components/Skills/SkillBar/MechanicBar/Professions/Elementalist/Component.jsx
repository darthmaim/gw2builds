import React from 'react';
import map from 'lodash/map';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkillIcon = (skill, index, active, onAttunementChange) => {
    const isActive = index === active;
    const className = isActive ? '' : style.inactive;

    return (
        <SkillTooltip key={index} skill={skill} action={'change attunement'}>
            <SkillIcon className={className} onClick={onAttunementChange.bind(this, index)} skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Elementalist = ({ availableElementalistAttunementObjects, availableSkillObjects, selectedAttunementId, onAttunementChange }) => (
    <div className={style.attunements}>
        {map(availableElementalistAttunementObjects, ({ attunement, id }) =>
            renderSkillIcon(availableSkillObjects[id], attunement, selectedAttunementId, onAttunementChange)
        )}
    </div>
);

export default Elementalist;
