import React from 'react';
import SkillIcon from '../../../../Icon';
import SkillTooltip from '../../../../../Tooltips/Skills/TooltipContainer';
import style from './style.css';

const renderSkillIcon = (skill, index) => skill ? (
    <SkillTooltip key={index} skill={skill}>
        <SkillIcon skill={skill} size={32}/>
    </SkillTooltip>
) : (
    <SkillIcon.Empty key={index} size={32}/>
);

const getToolbeltSkill = (skill) => skill && skill.toolbelt_skill ? skill.toolbelt_skill : null;

const Engineer = ({ availableSkillObjects, selectedSkillIds }) => (
    <div className={style.toolbelt}>
        {[0,1,2,3,4].map(
            (index) => renderSkillIcon(
                availableSkillObjects[
                    getToolbeltSkill(availableSkillObjects[selectedSkillIds[index]])
                ], index
            )
        )}
    </div>
);

export default Engineer;
