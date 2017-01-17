import React from 'react';
import style from './Icon.css';

const SkillIcon = ({skill, size, className,...props}) => {
    const inline = size && size !== 64
        ? { width: size, height: size }
        : {};

    if(!skill) {
        return (<div className={style.loading} style={inline} {...props}/>);
    }

    return (
        <div className={style.skill + ' ' + className} style={inline} {...props}>
            <img src={skill.icon}/>
        </div>
    );
};

SkillIcon.propTypes = {
    skill: React.PropTypes.object,
    size: React.PropTypes.number
};

SkillIcon.Empty = props => (
    <div className={style.empty} {...props}/>
);

export default SkillIcon;
