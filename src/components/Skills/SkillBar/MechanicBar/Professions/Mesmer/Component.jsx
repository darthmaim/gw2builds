import React from 'react';
import range from 'lodash/range';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const Mesmer = ({ skills }) => (
    <div className={style.component}>
        <div className={style.illusions}>
            {range(0, 3).map(i => (<span key={i}></span>))}
        </div>
        {[10191, 10190, 10287, 10192].map(id => (
            <SkillTooltip skill={skills[id]}>
                <SkillIcon skill={skills[id]} size={32}/>
            </SkillTooltip>
        ))}
    </div>
);

export default Mesmer;
