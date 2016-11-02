import React from 'react';

import Settings from '../../containers/settings';
import StatsOverview from '../../containers/stats-overview';
import { Panel as CharacterPanel } from '../Character';

import LanguageSelector from '../../containers/languageSelector';

import style from './content.css';

export default props => (
    <div className={style.container}>
        <div className={style.sidebar}>
            <div style={{flex: 1}} />
            <LanguageSelector />
        </div>
        <div className={style.content}>
            <Settings/>
            <CharacterPanel/>
        </div>
        <div className={style.stats}>
            <StatsOverview/>
        </div>
    </div>
);
