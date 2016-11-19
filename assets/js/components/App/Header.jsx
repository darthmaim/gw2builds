import React from 'react';

import style from './header.css';

export default props => (
    <div className={style.header}>
        <div className={style.logo}>
            <img src="/img/logo.svg"/>
        </div>
        <div className={style.title}>
            <span>gw2efficiency</span> Build Editor
        </div>
    </div>
);
