import React from 'react';
import cx from 'classnames';
import style from './Dialog.css';

export default ({title, onClose, children, className}) => (
    <div className={cx(style.dialog, className)}>
        <div className={style.header}>
            {title}
            <button type="button" onClick={onClose} className={style.closeButton}>
                <img src="/img/general/close.svg"/>
            </button>
        </div>
        {children}
    </div>
);
