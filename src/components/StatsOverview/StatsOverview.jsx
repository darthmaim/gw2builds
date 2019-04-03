import React, { Component } from 'react';
import Attribute from './Attribute';
import style from './style.module.css';
import { Trans } from '@lingui/macro';

class StatsOverview extends Component {
    render() {
        return (
            <ul className={style.list}>
                <Attribute className={style['attribute-power']} label={<Trans>Power</Trans>} value={this.props.power} details={this.props.powerDetails}/>
                <Attribute className={style['attribute-toughness']} label={<Trans>Toughness</Trans>} value={this.props.toughness} details={this.props.toughnessDetails}/>
                <Attribute className={style['attribute-vitality']} label={<Trans>Vitality</Trans>} value={this.props.vitality} details={this.props.vitalityDetails}/>
                <Attribute className={style['attribute-precision']} label={<Trans>Precision</Trans>} value={this.props.precision} details={this.props.precisionDetails}/>
                <Attribute className={style['attribute-ferocity']} label={<Trans id="CritDamage">Ferocity</Trans>} value={this.props.ferocity} details={this.props.ferocityDetails}/>
                <Attribute className={style['attribute-condition-damage']} label={<Trans id="ConditionDamage">Condition Damage</Trans>} value={this.props.conditionDamage} details={this.props.conditionDamageDetails}/>
                <Attribute className={style['attribute-expertise']} label={<Trans id="ConditionDuration">Expertise</Trans>} value={this.props.expertise} details={this.props.expertiseDetails}/>
                <Attribute className={style['attribute-concentration']} label={<Trans id="BoonDuration">Concentration</Trans>} value={this.props.concentration} details={this.props.concentrationDetails}/>
                <Attribute className={style['attribute-profession-bonus']} label={<Trans>Profession Bonus</Trans>} value={this.props.professionBonus} details={this.props.professionBonusDetails}/>
                <Attribute className={style['attribute-armor']} label={<Trans>Armor</Trans>} value={this.props.armor} details={this.props.armorDetails}/>
                <Attribute className={style['attribute-health']} label={<Trans>Health</Trans>} value={this.props.health} details={this.props.healthDetails}/>
                <Attribute className={style['attribute-critical-chance']} label={<Trans>Critical Chance</Trans>} value={this.props.criticalChance} details={this.props.criticalChanceDetails} percent/>
                <Attribute className={style['attribute-critical-damage']} label={<Trans>Critical Damage</Trans>} value={this.props.criticalDamage} details={this.props.criticalDamageDetails} percent/>
                <Attribute className={style['attribute-healing-power']} label={<Trans id="Healing">Healing Power</Trans>} value={this.props.healingPower} details={this.props.healingPowerDetails}/>
                <Attribute className={style['attribute-condition-duration']} label={<Trans>Condition Duration</Trans>} value={this.props.conditionDuration} details={this.props.conditionDurationDetails} percent/>
                <Attribute className={style['attribute-boon-duration']} label={<Trans>Boon Duration</Trans>} value={this.props.boonDuration} details={this.props.boonDurationDetails} percent/>
            </ul>
        );
    }
}

export default StatsOverview;
