import React from 'react';
import map from 'lodash/map';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/Tooltip';
import style from './style.css';

const renderSkillIcon = (skill, index, active, onAttunementChange, selectedMajorTraitIds, selectedMinorTraitIds) => {
    const isActive = index === active;
    const className = isActive ? '' : style.inactive;

    return (
        <SkillTooltip key={index} selectedMajorTraitIds={selectedMajorTraitIds} selectedMinorTraitIds={selectedMinorTraitIds} skill={skill}>
            <SkillIcon className={className} onClick={onAttunementChange.bind(this, index)} skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Elementalist = ({ attunements, onAttunementChange, activeAttunement, availableSkillObjects, selectedMajorTraitIds, selectedMinorTraitIds }) => (
    <div className={style.attunements}>
        {map(attunements, ({ id, swap }) =>
            renderSkillIcon(skills[swap], id, activeAttunement, onAttunementChange, selectedMajorTraitIds, selectedMinorTraitIds)
        )}
    </div>
);

export default Elementalist;
