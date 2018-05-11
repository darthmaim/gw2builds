import React from 'react';
import style from './Dialog.css';

export default ({title, onClose, children}) => (
    <div className={style.dialog}>
        <div className={style.header}>
            {title}
            <button type="button" onClick={onClose} className={style.closeButton}>
                <img src="/img/general/close.svg"/>
            </button>
        </div>
        {children}
    </div>
);
