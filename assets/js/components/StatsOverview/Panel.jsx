'use strict';

import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';
import style from './style.css';

class Panel extends Component {
    render() {
        return (
            <div className={style.panel}>
                <ul className={style.list}>
                    <li className={style['attribute-power']}><FormattedNumber value={this.props.power} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-toughness']}><FormattedNumber value={this.props.toughness} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-vitality']}><FormattedNumber value={this.props.vitality} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-precision']}><FormattedNumber value={this.props.precision} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-ferocity']}><FormattedNumber value={this.props.ferocity} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-condition-damage']}><FormattedNumber value={this.props.conditionDamage} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-expertise']}><FormattedNumber value={this.props.expertise} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-concentration']}><FormattedNumber value={this.props.concentration} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-profession-bonus']}><FormattedNumber value={this.props.professionBonus} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-armor']}><FormattedNumber value={this.props.armor} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-health']}><FormattedNumber value={this.props.health} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-critical-chance']}><FormattedNumber value={this.props.criticalChance} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                    <li className={style['attribute-critical-damage']}><FormattedNumber value={this.props.criticalDamage} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                    <li className={style['attribute-healing-power']}><FormattedNumber value={this.props.healingPower} maximumFractionDigits={0}/></li>
                    <li className={style['attribute-condition-duration']}><FormattedNumber value={this.props.conditionDuration} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                    <li className={style['attribute-boon-duration']}><FormattedNumber value={this.props.boonDuration} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                </ul>
            </div>
        );
    }
}

export default Panel;
