import React from 'react';
import Header from './HeaderContainer';
import Content from './Content';
import { Select } from '../Inputs';
import Wizard from '../Import/WizardContainer';
import style from './layout.css';
import tooltipStyle from '../Tooltips/tooltip.css';


export default ({ loading }) => (
    <div className={style.frame}>
        <div className={loading ? style.loadingVisible : style.loading}>Loading…</div>
        <Select.Dropdown outsideClickIgnoreClass={tooltipStyle.touch}/>
        <Wizard/>
        <Header/>
        <Content/>
    </div>
);
