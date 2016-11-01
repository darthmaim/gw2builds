import React from 'react';
import style from './trait.css';

export default (props) => props.from && props.to
    ? <div className={style[`line-${props.from}-${props.to}`]}/>
    : <div className={style.lineInvisible}/>;
