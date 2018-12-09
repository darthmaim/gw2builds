import React from 'react';
import MechanicBar from './MechanicBar';
import UtilityBar from './UtilityBar';
import WeaponBar from './WeaponBar';
import style from './SkillBar.module.css';

export default () => (
    <div className={style.container}>
        <div>
            <MechanicBar/>
            <WeaponBar/>
        </div>
        <UtilityBar/>
    </div>
);
