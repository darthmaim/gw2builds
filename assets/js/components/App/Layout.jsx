import React from 'react';
import { TooltipElement } from '../Tooltips';
import style from './layout.css';
import { Header, Content } from './index';

export default () => (
    <div className={style.frame}>
        <TooltipElement/>
        <Header/>
        <Content/>
    </div>
);
