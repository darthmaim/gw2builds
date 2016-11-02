"use strict";

import React from 'react';
import { ucFirst } from 'change-case';
import style from './trait.css';

export default (props) => props.from && props.to
    ? <div className={style[`line${ucFirst(props.from)}To${ucFirst(props.to)}`]}/>
    : <div className={style.lineInvisible}/>;
