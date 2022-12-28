import React from 'react';
import map from 'lodash/map';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.module.css';

const SPEC_TEMPEST = 48;
const SPEC_WEAVER = 56;

const renderSkillIcon = (id, index, {
    availableSkillObjects, selectedAttunementId, onAttunementChange,
    selectedEliteSpecializationId, selectedWeaverPreviousAttunementId
}) => {
    const isActive = index === selectedAttunementId || index === selectedWeaverPreviousAttunementId;
    const hasAction = index !== selectedAttunementId || (selectedEliteSpecializationId === SPEC_WEAVER && index !== selectedWeaverPreviousAttunementId);
    const className = isActive ? '' : style.inactive;

    const skill = availableSkillObjects[id] && isActive && selectedEliteSpecializationId === SPEC_TEMPEST
        ? availableSkillObjects[availableSkillObjects[id].flip_skill]
        : availableSkillObjects[id];

    return (
        <SkillTooltip key={index} skill={skill} action={hasAction ? 'change attunement' : undefined}>
            <SkillIcon className={className} onClick={onAttunementChange.bind(this, index)} skill={skill} size={32}/>
        </SkillTooltip>
    );
};

const Elementalist = ({ availableElementalistAttunementObjects, ...props }) => (
    <div className={style.attunements}>
        {map(availableElementalistAttunementObjects, ({ attunement, id }) =>
            renderSkillIcon(id, attunement, props)
        )}
    </div>
);

export default Elementalist;
