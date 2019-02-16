import React from 'react';
import style from './InputGroup.module.css';

export default ({title, children, inline = false}) => (
    <div className={inline ? style.inline : style.group}>
        <label>{title}</label>
        <div>{children}</div>
    </div>
);
