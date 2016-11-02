import React from 'react';
import { Header, Content } from './index';

import style from './layout.css';

export default props => (
    <div className={style.frame}>
        <Header className={style.header}/>
        <Content className={style.content}/>
    </div>
);
