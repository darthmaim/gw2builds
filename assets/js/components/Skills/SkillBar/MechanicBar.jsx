import React from 'react';
import SkillIcon from '../Icon';
import SkillTooltip from '../../Tooltips/Skills/Tooltip';
import style from './MechanicBar.css';

const renderSkillIcon = (skill, index, active, onMechanicChange, activeMajorTraits, activeMinorTraits) => {
    const isActive = index === active;
    const className = isActive ? '' : style.inactive;

    return (
        <SkillTooltip key={index} activeMajorTraits={activeMajorTraits} activeMinorTraits={activeMinorTraits} skill={skill}>
            <SkillIcon className={className} onClick={onMechanicChange.bind(this, index)} skill={skill} size={32}/>
        </SkillTooltip>
    )
};

const Professions = {
    Elementalist: ({onMechanicChange, mechanic, skills, activeMajorTraits, activeMinorTraits}) => (
        <div className={style.mechanicBar} tabIndex="0">
            {[5492, 5493, 5494, 5495].map((id, index) =>
                renderSkillIcon(skills[id], index, mechanic, onMechanicChange, activeMajorTraits, activeMinorTraits)
            )}
        </div>
    )
};

const MechanicBar = props => (Professions[props.profession] ? Professions[props.profession](props) : null);


MechanicBar.propTypes = {
    onMechanicChange: React.PropTypes.func.isRequired,
    profession: React.PropTypes.string,
    mechanic: React.PropTypes.number
};

export default MechanicBar;
