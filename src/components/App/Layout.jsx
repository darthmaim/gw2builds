import React from 'react';
import { TooltipElement } from '~/components/Tooltips';
import Header from './Header';
import Content from './Content';
import style from './layout.css';

export default ({ loading }) => (
    <div className={style.frame}>
        <div className={loading ? style.loadingVisible : style.loading}>Loading…</div>
        <TooltipElement/>
        <Header/>
        <Content/>
    </div>
);
