"use strict";

import { connect } from "react-redux";
import {
    getAttributePower, getAttributeToughness, getAttributeVitality, getAttributePrecision,
    getAttributeFerocity, getAttributeConditionDamage, getAttributeExpertise, getAttributeConcentration,
    getAttributeProfession, getAttributeArmor, getAttributeHealth, getAttributeCriticalChance, getAttributeCriticalDamage,
    getAttributeHealingPower, getAttributeConditionDuration, getAttributeBoonDuration
} from "../selectors/attributes";
import StatsOverviewPanel from "../components/panels/stats-overview";

const mapStateToProps = state => ({
    power: getAttributePower(state),
    toughness: getAttributeToughness(state),
    vitality: getAttributeVitality(state),
    precision: getAttributePrecision(state),
    ferocity: getAttributeFerocity(state),
    conditionDamage: getAttributeConditionDamage(state),
    expertise: getAttributeExpertise(state),
    concentration: getAttributeConcentration(state),
    professionBonus: getAttributeProfession(state),
    armor: getAttributeArmor(state),
    health: getAttributeHealth(state),
    criticalChance: getAttributeCriticalChance(state),
    criticalDamage: getAttributeCriticalDamage(state),
    healingPower: getAttributeHealingPower(state),
    conditionDuration: getAttributeConditionDuration(state),
    boonDuration: getAttributeBoonDuration(state)
});

const StatsOverview = connect(mapStateToProps)(StatsOverviewPanel);
export default StatsOverview;
