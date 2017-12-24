import React from 'react';
import style from './style.css';
import SkillSelect from '../../../../SkillSelect';

function onChange(availableRevenantLegends, setSelectedRevenantLegendId, slotId) {
    return (swapId) => setSelectedRevenantLegendId({
        slotId,
        legendId: Object.values(availableRevenantLegends).find((legend) => legend.swap === swapId).id
    });
}

const Revenant = ({ availableRevenantLegends, availableSkillObjects, selectedRevenantLegendIds, setSelectedRevenantLegendId }) => {
    const skills = Object.values(availableRevenantLegends).map(
        (legend) => availableSkillObjects[legend.swap]
    ).filter(Boolean);

    const selectedSkills = selectedRevenantLegendIds.map(
        (name) => name && availableRevenantLegends[name].swap
    );

    return (
        <div className={style.component}>
            <SkillSelect skills={skills} value={selectedSkills[0]} size={32} onChange={onChange(availableRevenantLegends, setSelectedRevenantLegendId, 0)}/>
            <SkillSelect skills={skills} value={selectedSkills[1]} size={32} onChange={onChange(availableRevenantLegends, setSelectedRevenantLegendId, 1)}/>
        </div>
    );
};

export default Revenant;
