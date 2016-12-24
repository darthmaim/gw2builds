import React from 'react';

import style from './header.css';

export default props => (
    <div className={style.header}>
        <div className={style.logo}>
            <img src="/img/logo.svg" role="presentation"/>
        </div>
        <div className={style.title}>
            <img src="/img/header.svg" alt="gw2efficiency | Build Editor"/>
        </div>
    </div>
);
