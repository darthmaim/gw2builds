import React from 'react';
import { TooltipElement } from '~/components/Tooltips';
import Header from './Header';
import Content from './Content';
import style from './layout.css';

export default () => (
    <div className={style.frame}>
        <TooltipElement/>
        <Header/>
        <Content/>
    </div>
);
