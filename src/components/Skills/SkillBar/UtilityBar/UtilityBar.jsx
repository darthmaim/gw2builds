import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SkillTooltip from '../../../Tooltips/Skills/TooltipContainer';
import SkillIcon from '../../Icon';
import SkillSelect from '../../SkillSelect';
import style from './UtilityBar.css';

const slots = [
    'Heal',
    'Utility',
    'Utility',
    'Utility',
    'Elite'
];

class UtilityBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSlot = this.renderSlot.bind(this);
    }

    render() {
        return (
            <div className={style.bar}>
                {[0,1,2,3,4].map(this.renderSlot)}
            </div>
        )
    }

    renderSlot(slot) {
        const { selectedSkillIds, availableSkillObjects, availableProfessionSkillObjects, onSelectedSkillChange } = this.props;

        const availableSkills = availableProfessionSkillObjects
            .filter((skill) => skill.slot === slots[slot])
            .filter((skill) => availableSkillObjects[skill.id] !== undefined)
            .map((skill) => availableSkillObjects[skill.id]);

        return (
            <SkillSelect value={selectedSkillIds[slot]} key={slot} onChange={onSelectedSkillChange.bind(this, slot)}
                skills={availableSkills} valueAction={`change ${slots[slot]} skill`}
            />
        );
    }
}

UtilityBar.propTypes = {
    // Redux states
    selectedSkillIds: PropTypes.array.isRequired,
    availableSkillObjects: PropTypes.object.isRequired,
    availableProfessionSkillObjects: PropTypes.array.isRequired
};

export default UtilityBar;
