import React from 'react';
import style from './SetButton.css';

const SetButton = ({ isActive, children, onClick }) => (
    <button type="button" className={isActive ? style.active : style.button} onClick={onClick}>
        {children}
    </button>
);

SetButton.propTypes = {
    isActive: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default SetButton;
