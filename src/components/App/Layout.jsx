import React from 'react';
import Header from './HeaderContainer';
import Content from './Content';
import { Select } from '../Inputs';
import Wizard from '../Import/WizardContainer';
import style from './layout.module.css';
import tooltipStyle from '../Tooltips/tooltip.module.css';
import Overlay from './Overlay/Overlay';
import Dialog from '../Inputs/Dialog/Dialog';

export default ({ loading, error }) => (
    <div className={style.frame}>
        <div className={loading ? style.loadingVisible : style.loading}>Loading…</div>
        <Select.Dropdown outsideClickIgnoreClass={tooltipStyle.touch}/>
        <Wizard/>
        <Header/>
        <Content/>
        {error && (
            <Overlay>
                <Dialog title={error.title}>
                    <div>
                        {error.text}
                        <button className={style.dialogButton} onClick={() => window.location.reload()}>
                            Try again
                        </button>
                    </div>
                </Dialog>
            </Overlay>
        )}
    </div>
);
