import React, { Component } from 'react';
import SkillTooltip from '~/components/Tooltips/Skills/TooltipContainer';
import SkillIcon from '../Icon';

class SelectableSkill extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSkill = this.renderSkill.bind(this);
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

SelectableSkill.propTypes = {
    attunement: React.PropTypes.string,
    skills: React.PropTypes.object.isRequired,
    slot: React.PropTypes.string
};

export default SelectableSkill;

