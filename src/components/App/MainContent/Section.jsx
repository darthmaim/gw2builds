import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import style from './section.css';

const Section = ({ className, domRef, anchorRef, name, actions, children }) => (
    <div className={classnames(style.section, className)} ref={domRef}>
        <span className={style.anchor} ref={anchorRef}/>
        <div className={style.header}>
            {name}
            {actions.map(({ key, text, onClick }) => (
                <button type="button" key={key || text} className={style.action} onClick={onClick}>
                    {text}
                </button>
            ))}
        </div>
        <div className={style.content}>
            {children}
        </div>
    </div>
);

Section.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    domRef: PropTypes.func,
    anchorRef: PropTypes.func,
    className: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }))
};

Section.defaultProps = {
    actions: []
};

export default Section;
