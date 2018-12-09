import React, { Component } from 'react';
import Attribute from './Attribute';
import style from './style.module.css';

class StatsOverview extends Component {
    render() {
        return (
            <ul className={style.list}>
                <Attribute className={style['attribute-power']} label={'Power'} value={this.props.power}/>
                <Attribute className={style['attribute-toughness']} label={'Toughness'} value={this.props.toughness}/>
                <Attribute className={style['attribute-vitality']} label={'Vitality'} value={this.props.vitality}/>
                <Attribute className={style['attribute-precision']} label={'Precision'} value={this.props.precision}/>
                <Attribute className={style['attribute-ferocity']} label={'Ferocity'} value={this.props.ferocity}/>
                <Attribute className={style['attribute-condition-damage']} label={'Condition Damage'} value={this.props.conditionDamage}/>
                <Attribute className={style['attribute-expertise']} label={'Expertise'} value={this.props.expertise}/>
                <Attribute className={style['attribute-concentration']} label={'Concentration'} value={this.props.concentration}/>
                <Attribute className={style['attribute-profession-bonus']} label={'Profession Bonus'} value={this.props.professionBonus}/>
                <Attribute className={style['attribute-armor']} label={'Armor'} value={this.props.armor}/>
                <Attribute className={style['attribute-health']} label={'Health'} value={this.props.health}/>
                <Attribute className={style['attribute-critical-chance']} label={'Critical Chance'} value={this.props.criticalChance} percent/>
                <Attribute className={style['attribute-critical-damage']} label={'Critical Damage'} value={this.props.criticalDamage} percent/>
                <Attribute className={style['attribute-healing-power']} label={'Healing Power'} value={this.props.healingPower}/>
                <Attribute className={style['attribute-condition-duration']} label={'Condition Duration'} value={this.props.conditionDuration} percent/>
                <Attribute className={style['attribute-boon-duration']} label={'Boon Duration'} value={this.props.boonDuration} percent/>
            </ul>
        );
    }
}

export default StatsOverview;
