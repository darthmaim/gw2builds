import PropTypes from 'prop-types';
import React from 'react';
import style from './SetButton.module.css';

const SetButton = ({ isActive, children, onClick, icon: Icon }) => (
    <button type="button" className={isActive ? style.active : style.button} onClick={onClick}>
        <Icon className={style.icon}/>{children}
    </button>
);

SetButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.any.isRequired
};

export default SetButton;
