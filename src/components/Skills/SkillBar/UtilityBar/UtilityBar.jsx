import React, { Component } from 'react';
import SkillTooltip from '~/components/Tooltips/Skills/TooltipContainer';
import SkillIcon from '../../Icon';

class UtilityBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSkill = this.renderSkill.bind(this);
    }

    getSkillsForSlot({ skills, attunement }) {
        return index => {
            const slotName = (index==0?'Heal':(index==4?'Elite':'Utility'));

            // find all matching skills for the requested slot
            const skillsForSlot = Object.values(skills)
            // filter slot
                .filter(skill => skill.slot === slotName);

            // return the skill object
            return skillsForSlot[0] && skills[skillsForSlot[0].id];
        };
    }

    render() {
        console.log(this.props);
        const getSkillsForSlot = this.getSkillsForSlot(this.props);

        const slots = [0, 1, 2, 3, 4].map(getSkillsForSlot);

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

UtilityBar.propTypes = {
    attunement: React.PropTypes.string,
    skills: React.PropTypes.object.isRequired
};

export default UtilityBar;
