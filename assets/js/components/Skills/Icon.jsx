import React from 'react';
import style from './Icon.css';

const SkillIcon = ({skill, size}) => {
    const inline = size && size !== 64
        ? { width: size, height: size }
        : {};

    if(!skill) {
        return (<div className={style.loading} style={inline}/>);
    }

    return (
        <div className={style.skill} style={inline}>
            <img src={skill.icon}/>
        </div>
    );
};

SkillIcon.propTypes = {
    skill: React.PropTypes.object,
    size: React.PropTypes.number
};

SkillIcon.Empty = () => (
    <div className={style.empty}/>
);

export default SkillIcon;
