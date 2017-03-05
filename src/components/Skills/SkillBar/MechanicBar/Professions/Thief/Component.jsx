import React from 'react';
import range from 'lodash/range';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const Thief = ({ attunements, onAttunementChange, activeAttunement, skills }) => (
    <div className={style.component}>
        <SkillTooltip skill={skills[13014]}>
            <SkillIcon skill={skills[13014]} size={32}/>
        </SkillTooltip>
        <SkillIcon.Empty size={32}/>
        <div className={style.initiative}>
            {range(0, 15).map(i => (<span key={i}></span>))}
        </div>
    </div>
);

export default Thief;
