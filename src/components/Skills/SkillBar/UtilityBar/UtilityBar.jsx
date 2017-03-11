import React, { Component } from 'react';
import SelectableSkill from '../../SelectableSkill';
import style from './UtilityBar.css'

class UtilityBar extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderSkill = this.renderSkill.bind(this);
    }

    render() {
        const slots = [0, 1, 2, 3, 4];

        return (
            <div className={style.utilitybar}>
                {slots.map(this.renderSkill)}
            </div>
        );
    }

    renderSkill(index) {
        const slotName = (index==0?'Heal':(index==4?'Elite':'Utility'));

        return (
            <SelectableSkill key={index} slot={slotName}/>
        );
    }
}

UtilityBar.propTypes = {
    attunement: React.PropTypes.string,
    skills: React.PropTypes.object.isRequired
};

export default UtilityBar;
