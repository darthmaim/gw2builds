import React from 'react';
import style from './Wizard.css';

export default ({children, onClose}) => (
    <div className={style.header}>
        {children}
        <button type="button" onClick={onClose} className={style.closeButton}>
            <img src="/img/general/close.svg"/>
        </button>
    </div>
);
