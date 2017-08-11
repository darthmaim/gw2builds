import React, { Component } from 'react';
import SkillTooltip from '~/components/Tooltips/Skills/Tooltip';
import SkillIcon from '../../Icon';

class WeaponBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSkill = this.renderSkill.bind(this);
    }

    getSkillInSlot(props) {
        return index => {
            const getFromMainhand = index < 3 || props.twoHanded;

            // handle empty weapon
            if ((getFromMainhand && !props.activeMainhandWeaponId) || (!getFromMainhand && !props.activeOffhandWeaponId)) {
                return null;
            }

            const weapon = getFromMainhand ? props.activeMainhandWeaponId : props.activeOffhandWeaponId;
            const slotName = `Weapon_${index + 1}`;

            // find all matching skills for the requested slot
            const skillsForSlot = props.availableWeaponObjects[weapon].skills
                // filter slot
                .filter(skill => skill.slot === slotName)
                // filter offhand (thief)
                .filter(skill => !skill.offhand || skill.offhand === props.activeOffhandWeaponId || (skill.offhand === 'Nothing' && !props.activeOffhandWeaponId))
                // filter attunement (elementalist)
                .filter(skill => !skill.attunement || skill.attunement === props.activeAttunement);

            // return the skill object
            return skillsForSlot[0] && props.availableSkillObjects[skillsForSlot[0].id];
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
            <SkillTooltip key={index} selectedMajorTraitIds={this.props.selectedMajorTraitIds} selectedMinorTraitIds={this.props.selectedMinorTraitIds} skill={skill}>
                <SkillIcon skill={skill}/>
            </SkillTooltip>
        );
    }
}

WeaponBar.propTypes = {
    twoHanded: React.PropTypes.bool,

    // Redux states
    activeMainhandWeaponId: React.PropTypes.string,
    activeOffhandWeaponId: React.PropTypes.string,
    activeAttunement: React.PropTypes.string,
    availableSkillObjects: React.PropTypes.object.isRequired,
    availableWeaponObjects: React.PropTypes.objectOf(React.PropTypes.shape({
        skills: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            slot: React.PropTypes.string.isRequired,
            attunement: React.PropTypes.string,
            offhand: React.PropTypes.string
        })).isRequired,
        specialization: React.PropTypes.number
    })).isRequired,
    selectedMajorTraitIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    selectedMinorTraitIds: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
};

export default WeaponBar;
