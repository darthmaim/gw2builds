import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SkillSelect from '../../SkillSelect';
import style from './UtilityBar.module.css';

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
        this.getCurrentSkill = this.getCurrentSkill.bind(this);
    }

    render() {
        return (
            <div className={style.bar}>
                {[0,1,2,3,4].map(this.renderSlot)}
            </div>
        )
    }

    renderSlot(slot) {
        const {
            selectedSkillIds,
            availableSkillObjects,
            availableProfessionSkillObjects,
            onSelectedSkillChange,
            selectedSpecializationIds
        } = this.props;

        const availableSkills = availableProfessionSkillObjects
            .filter((skill) => skill.slot === slots[slot])
            .filter((skill) => availableSkillObjects[skill.id] !== undefined)
            .map((skill) => availableSkillObjects[skill.id]);

        return (
            <SkillSelect value={selectedSkillIds[slot]} key={slot} onChange={onSelectedSkillChange.bind(this, slot)}
                skills={availableSkills} valueAction={`change ${slots[slot]} skill`}
                getCurrentSkill={this.getCurrentSkill} selectedSpecializationIds={selectedSpecializationIds}
            />
        );
    }

    getCurrentSkill(id) {
        const skill = this.props.availableSkillObjects[id];

        if(skill && skill.subskills) {
            const availabeSubskills = skill.subskills.filter(
                (subskill) => subskill.attunement === this.props.selectedElementalistAttunementId
            );

            if(availabeSubskills.length > 0) {
                console.assert(availabeSubskills.length === 1, `${availabeSubskills.length} available subskills for skill ${id} (https://api.guildwars2.com/v2/skills/${id}.`);
                return this.props.availableSkillObjects[availabeSubskills[0].id];
            }
        }

        return skill;
    }
}

UtilityBar.propTypes = {
    // Redux states
    selectedSkillIds: PropTypes.array.isRequired,
    availableSkillObjects: PropTypes.object.isRequired,
    availableProfessionSkillObjects: PropTypes.array.isRequired,
    selectedElementalistAttunementId: PropTypes.string
};

export default UtilityBar;
