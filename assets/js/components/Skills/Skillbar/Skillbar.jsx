import React, { Component } from 'react';
import SkillTooltip from '../../Tooltips/Skills/Tooltip';
import style from './Skillbar.css';

const mainhandSlots = ['Weapon_1', 'Weapon_2', 'Weapon_3'];
const offhandSlots = ['Weapon_4', 'Weapon_5'];

class Skillbar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { mainhand, offhand, isTwoHanded, weapons, skills } = this.props;

        const mainhandSkills = mainhand ? (!isTwoHanded
            ? weapons[mainhand].skills.filter(skill => mainhandSlots.indexOf(skill.slot) !== -1).map(skill => skills[skill.id])
            : weapons[mainhand].skills.map(skill => skills[skill.id])) : [null, null, null, null, null];

        const offhandSkills = (!isTwoHanded && offhand)
            ? weapons[offhand].skills.filter(skill => offhandSlots.indexOf(skill.slot) !== -1).map(skill => skills[skill.id])
            : (isTwoHanded ? [] : [null, null]);

        console.log(mainhandSkills);

        return (
            <div>
                {this.renderSection(mainhandSkills, mainhand)}
                {this.renderSection(offhandSkills, offhand)}
            </div>
        );
    }

    renderSection(skills, name) {
        if(skills.length === 0) {
            return;
        }

        return (
            <div style={{display: 'inline'}}>
                {skills.map(this.renderSkill)}
            </div>
        );
    }

    renderSkill(skill, index) {
        if(skill === null) {
            return (<div className={style.empty} key={index}></div>);
        }

        return (
            <SkillTooltip key={index} activeMajorTraits={[]} activeMinorTraits={[]} skill={skill}>
                <img className={style.skill} src={skill.icon}/>
            </SkillTooltip>
        );
    }
}

export default Skillbar;
