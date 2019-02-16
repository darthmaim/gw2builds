import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import style from './Icon.module.css';

const inlineSize = size => size && size !== 64
    ? { width: size, height: size }
    : {};

const SkillIcon = ({ skill, size, className, borderless = false, ...props }) => {
    const inline = inlineSize(size);

    if (!skill) {
        return (<div className={style.loading} style={inline} {...props}/>);
    }

    return (
        <div className={classnames(borderless ? style.skillBorderless : style.skill, className)} style={inline} {...props}>
            <img src={skill.icon} alt={skill.name}/>
        </div>
    );
};

SkillIcon.propTypes = {
    skill: PropTypes.object,
    size: PropTypes.number
};

SkillIcon.Empty = ({ size, borderless = false, ...props }) => (
    <div className={borderless ? style.emptyBorderless : style.empty} style={inlineSize(size)} {...props}/>
);

export default SkillIcon;
