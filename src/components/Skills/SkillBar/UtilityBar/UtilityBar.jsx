import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SkillTooltip from '../../../Tooltips/Skills/TooltipContainer';
import SkillIcon from '../../Icon';
import Select from '../../../Inputs/Select/Select';
import SkillSelect from '../../SkillSelect';

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
        this.renderSkill = this.renderSkill.bind(this);
    }

    render() {
        return (
            <div>
                {[0,1,2,3,4].map(this.renderSlot)}
            </div>
        )
    }

    renderSlot(slot) {
        const { selectedSkillIds, availableSkillObjects, availableProfessionSkillObjects, onSelectedSkillChange } = this.props;
        const selectedId = selectedSkillIds[slot];
        const selectedSkill = availableSkillObjects[slot];

        const availableSkills = availableProfessionSkillObjects
            .filter((skill) => skill.slot === slots[slot])
            .filter((skill) => availableSkillObjects[skill.id] !== undefined)
            .map((skill) => availableSkillObjects[skill.id]);

        return (
            <SkillSelect value={selectedId} key={slot} onChange={onSelectedSkillChange.bind(this, slot)} skills={availableSkills}/>
        );
    }

    renderSkill(skill, index) {
        if (skill === null) {
            return (
                <SkillIcon.Empty key={index}/>
            );
        }

        return (
            <SkillTooltip key={index} skill={skill}>
                <SkillIcon skill={skill}/>
            </SkillTooltip>
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
