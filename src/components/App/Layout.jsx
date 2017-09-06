import React from 'react';
import Header from './Header';
import Content from './Content';
import { TooltipElement } from '../Tooltips';
import { Select } from '../Inputs';
import style from './layout.css';

export default ({ loading }) => (
    <div className={style.frame}>
        <div className={loading ? style.loadingVisible : style.loading}>Loading…</div>
        <TooltipElement/>
        <Select.Dropdown/>
        <Header/>
        <Content/>
    </div>
);
