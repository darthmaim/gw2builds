import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SkillTooltip from '../../../Tooltips/Skills/TooltipContainer';
import SkillIcon from '../../Icon';

class WeaponBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSkill = this.renderSkill.bind(this);
    }

    getSkillInSlot({ activeMainhandWeaponId, activeOffhandWeaponId, isTwoHanded, availableWeaponObjects, availableSkillObjects, selectedAttunementId }) {
        return index => {
            const getFromMainhand = index < 3 || isTwoHanded;

            // handle empty weapon
            if ((getFromMainhand && !activeMainhandWeaponId) || (!getFromMainhand && !activeOffhandWeaponId)) {
                return null;
            }

            const weapon = getFromMainhand ? activeMainhandWeaponId : activeOffhandWeaponId;
            const slotName = `Weapon_${index + 1}`;

            // find all matching skills for the requested slot
            const skillsForSlot = availableWeaponObjects[weapon].skills
                // filter slot
                .filter(skill => skill.slot === slotName)
                // filter offhand (thief)
                .filter(skill => !skill.offhand || skill.offhand === activeOffhandWeaponId || (skill.offhand === 'Nothing' && !activeOffhandWeaponId))
                // filter attunement (elementalist)
                .filter(skill => !skill.attunement || skill.attunement === selectedAttunementId);

            if(skillsForSlot.length > 0) {
                console.warn(`Multiple possible skills for ${weapon} in slot ${slotName} found.`, skillsForSlot);
            } else if(skillsForSlot.length === 0) {
                console.warn(`No skills for ${weapon} in slot ${slotName} found.`);
            }

            // return the skill object
            return skillsForSlot[0] && availableSkillObjects[skillsForSlot[0].id];
        };
    }

    render() {
        const getSkillInSlot = this.getSkillInSlot(this.props);
        const slots = [0, 1, 2, 3, 4].map(getSkillInSlot);
        return (
            <div>
                {slots.map(this.renderSkill)}
            </div>
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

WeaponBar.propTypes = {
    isTwoHanded: PropTypes.bool,

    // Redux states
    activeMainhandWeaponId: PropTypes.string,
    activeOffhandWeaponId: PropTypes.string,
    availableSkillObjects: PropTypes.object.isRequired,
    availableWeaponObjects: PropTypes.objectOf(PropTypes.shape({
        skills: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            slot: PropTypes.string.isRequired,
            attunement: PropTypes.string,
            offhand: PropTypes.string
        })).isRequired,
        specialization: PropTypes.number
    })).isRequired,
    selectedAttunementId: PropTypes.string
};

export default WeaponBar;
