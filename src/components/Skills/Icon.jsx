import React from 'react';
import style from './Icon.css';

const inlineSize = size => size && size !== 64
    ? { width: size, height: size }
    : {};

const SkillIcon = ({ skill, size, className, ...props }) => {
    const inline = inlineSize(size);

    if (!skill) {
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

SkillIcon.Empty = ({ size, ...props }) => (
    <div className={style.empty} style={inlineSize(size)} {...props}/>
);

export default SkillIcon;
