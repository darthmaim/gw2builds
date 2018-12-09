import PropTypes from 'prop-types';
import React from 'react';
import style from './SetButton.module.css';

const SetButton = ({ isActive, children, onClick }) => (
    <button type="button" className={isActive ? style.active : style.button} onClick={onClick}>
        {children}
    </button>
);

SetButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SetButton;
