"use strict";

import React from "react";
import { FormattedNumber } from "react-intl";
import RegularPanel from "../base/regular-panel";

class StatsOverviewPanel extends React.Component {
    render() {
        return (
            <div className="stats-overview-panel">
                <RegularPanel>
                    <ul className="stats-attributes">
                        <li className="attribute-power"><FormattedNumber value={this.props.power} maximumFractionDigits={0}/></li>
                        <li className="attribute-toughness"><FormattedNumber value={this.props.toughness} maximumFractionDigits={0}/></li>
                        <li className="attribute-vitality"><FormattedNumber value={this.props.vitality} maximumFractionDigits={0}/></li>
                        <li className="attribute-precision"><FormattedNumber value={this.props.precision} maximumFractionDigits={0}/></li>
                        <li className="attribute-ferocity"><FormattedNumber value={this.props.ferocity} maximumFractionDigits={0}/></li>
                        <li className="attribute-condition-damage"><FormattedNumber value={this.props.conditionDamage} maximumFractionDigits={0}/></li>
                        <li className="attribute-expertise"><FormattedNumber value={this.props.expertise} maximumFractionDigits={0}/></li>
                        <li className="attribute-concentration"><FormattedNumber value={this.props.concentration} maximumFractionDigits={0}/></li>
                        <li className="attribute-profession-bonus"><FormattedNumber value={this.props.professionBonus} maximumFractionDigits={0}/></li>
                        <li className="attribute-armor"><FormattedNumber value={this.props.armor} maximumFractionDigits={0}/></li>
                        <li className="attribute-health"><FormattedNumber value={this.props.health} maximumFractionDigits={0}/></li>
                        <li className="attribute-critical-chance"><FormattedNumber value={this.props.criticalChance} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                        <li className="attribute-critical-damage"><FormattedNumber value={this.props.criticalDamage} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                        <li className="attribute-healing-power"><FormattedNumber value={this.props.healingPower} maximumFractionDigits={0}/></li>
                        <li className="attribute-condition-duration"><FormattedNumber value={this.props.conditionDuration} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                        <li className="attribute-boon-duration"><FormattedNumber value={this.props.boonDuration} style="percent" minimumFractionDigits={2} maximumFractionDigits={2}/></li>
                    </ul>
                </RegularPanel>
            </div>
        );
    }
}

export default StatsOverviewPanel;
