import React from 'react';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import { FormattedNumber } from 'react-intl';
import style from './style.css';

const Necromancer = ({ skills, health }) => (
    <div className={style.component}>
        <div className={style.bar}><FormattedNumber value={0.69 * health} maximumFractionDigits={0}/></div>
        <SkillTooltip skill={skills[10574]}>
            <SkillIcon skill={skills[10574]} size={32}/>
        </SkillTooltip>
    </div>
);

export default Necromancer;
