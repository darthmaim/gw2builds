import React, { Component } from 'react';
import Attribute from './Attribute';
import style from './style.css';

class StatsOverview extends Component {
    render() {
        return (
            <ul className={style.list}>
                <Attribute className={style['attribute-power']} label={'Power'} value={this.props.power} details={this.props.powerDetails}/>
                <Attribute className={style['attribute-toughness']} label={'Toughness'} value={this.props.toughness} details={this.props.toughnessDetails}/>
                <Attribute className={style['attribute-vitality']} label={'Vitality'} value={this.props.vitality} details={this.props.vitalityDetails}/>
                <Attribute className={style['attribute-precision']} label={'Precision'} value={this.props.precision} details={this.props.precisionDetails}/>
                <Attribute className={style['attribute-ferocity']} label={'Ferocity'} value={this.props.ferocity} details={this.props.ferocityDetails}/>
                <Attribute className={style['attribute-condition-damage']} label={'Condition Damage'} value={this.props.conditionDamage} details={this.props.conditionDamageDetails}/>
                <Attribute className={style['attribute-expertise']} label={'Expertise'} value={this.props.expertise} details={this.props.expertiseDetails}/>
                <Attribute className={style['attribute-concentration']} label={'Concentration'} value={this.props.concentration} details={this.props.concentrationDetails}/>
                <Attribute className={style['attribute-profession-bonus']} label={'Profession Bonus'} value={this.props.professionBonus} details={this.props.professionBonusDetails}/>
                <Attribute className={style['attribute-armor']} label={'Armor'} value={this.props.armor} details={this.props.armorDetails}/>
                <Attribute className={style['attribute-health']} label={'Health'} value={this.props.health} details={this.props.healthDetails}/>
                <Attribute className={style['attribute-critical-chance']} label={'Critical Chance'} value={this.props.criticalChance} percent details={this.props.criticalChanceDetails}/>
                <Attribute className={style['attribute-critical-damage']} label={'Critical Damage'} value={this.props.criticalDamage} percent details={this.props.criticalDamageDetails}/>
                <Attribute className={style['attribute-healing-power']} label={'Healing Power'} value={this.props.healingPower} details={this.props.healingPowerDetails}/>
                <Attribute className={style['attribute-condition-duration']} label={'Condition Duration'} value={this.props.conditionDuration} percent details={this.props.conditionDurationDetails}/>
                <Attribute className={style['attribute-boon-duration']} label={'Boon Duration'} value={this.props.boonDuration} percent details={this.props.boonDurationDetails}/>
            </ul>
        );
    }
}

export default StatsOverview;
