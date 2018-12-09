import React from 'react';
import cx from 'classnames';
import style from './Dialog.module.css';
import { ReactComponent as CloseIcon } from './close.svg';

export default ({title, onClose, children, className}) => (
    <div className={cx(style.dialog, className)}>
        <div className={style.header}>
            {title}
            {onClose && (
                <button type="button" onClick={onClose} className={style.closeButton}>
                    <CloseIcon/>
                </button>
            )}
        </div>
        {children}
    </div>
);
