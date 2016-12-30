import React, { Component } from 'react';
import SkillTooltip from '../../Tooltips/Skills/Tooltip';
import style from './Skillbar.css';

class Skillbar extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSkill = this.renderSkill.bind(this);
    }

    getSkillInSlot({ mainhand, offhand, isTwoHanded, weapons, skills }) {
        return index => {
            const getFromMainhand = index < 3 || isTwoHanded;

            // handle empty weapon
            if(getFromMainhand && !mainhand || !getFromMainhand && !offhand) {
                return null;
            }

            const weapon = getFromMainhand ? mainhand : offhand;
            const slotName = `Weapon_${index + 1}`;

            // find all matching skills for the requested slot
            const skillsForSlot = weapons[weapon].skills.filter(skill => skill.slot === slotName);

            // for now take the first one, later we have to filter attunement, ...
            const skillId = skillsForSlot[0].id;

            // return the skill object
            return skills[skillId];
        };
    }

    render() {
        const getSkillInSlot = this.getSkillInSlot(this.props);

        const slots = [0,1,2,3,4].map(getSkillInSlot);

        return (
            <div>
                {slots.map(this.renderSkill)}
            </div>
        );
    }

    renderSkill(skill, index) {
        if(skill === null) {
            return (
                <div className={style.empty} key={index}/>
            );
        }

        const { activeMajorTraits, activeMinorTraits } = this.props;

        return (
            <SkillTooltip key={index} activeMajorTraits={activeMajorTraits} activeMinorTraits={activeMinorTraits} skill={skill}>
                <div className={style.skill}>
                    <img src={skill.icon}/>
                </div>
            </SkillTooltip>
        );
    }
}

Skillbar.propTypes = {
    mainhand: React.PropTypes.string,
    offhand: React.PropTypes.string,
    isTwoHanded: React.PropTypes.bool,
    weapons: React.PropTypes.array.isRequired,
    skills: React.PropTypes.array.isRequired,
    activeMajorTraits: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    activeMinorTraits: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
};

export default Skillbar;
