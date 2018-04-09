import { connect } from 'react-redux';
import {
    getAttributePower, getAttributeToughness, getAttributeVitality, getAttributePrecision,
    getAttributeFerocity, getAttributeConditionDamage, getAttributeExpertise, getAttributeConcentration,
    getAttributeProfession, getAttributeArmor, getAttributeHealth, getAttributeCriticalChance, getAttributeCriticalDamage,
    getAttributeHealingPower, getAttributeConditionDuration, getAttributeBoonDuration,

    getAttributePowerDetails, getAttributeToughnessDetails, getAttributeVitalityDetails, getAttributePrecisionDetails,
    getAttributeFerocityDetails, getAttributeConditionDamageDetails, getAttributeExpertiseDetails, getAttributeConcentrationDetails,
    getAttributeProfessionDetails, getAttributeArmorDetails, getAttributeHealthDetails, getAttributeCriticalChanceDetails, getAttributeCriticalDamageDetails,
    getAttributeHealingPowerDetails, getAttributeConditionDurationDetails, getAttributeBoonDurationDetails
} from '../../selectors/attributes';
import StatsOverview from './StatsOverview';

const mapStateToProps = (state) => ({
    power: getAttributePower(state),
    powerDetails: getAttributePowerDetails(state),
    toughness: getAttributeToughness(state),
    toughnessDetails: getAttributeToughnessDetails(state),
    vitality: getAttributeVitality(state),
    vitalityDetails: getAttributeVitalityDetails(state),
    precision: getAttributePrecision(state),
    precisionDetails: getAttributePrecisionDetails(state),
    ferocity: getAttributeFerocity(state),
    ferocityDetails: getAttributeFerocityDetails(state),
    conditionDamage: getAttributeConditionDamage(state),
    conditionDamageDetails: getAttributeConditionDamageDetails(state),
    expertise: getAttributeExpertise(state),
    expertiseDetails: getAttributeExpertiseDetails(state),
    concentration: getAttributeConcentration(state),
    concentrationDetails: getAttributeConcentrationDetails(state),
    professionBonus: getAttributeProfession(state),
    professionBonusDetails: getAttributeProfessionDetails(state),
    armor: getAttributeArmor(state),
    armorDetails: getAttributeArmorDetails(state),
    health: getAttributeHealth(state),
    healthDetails: getAttributeHealthDetails(state),
    criticalChance: getAttributeCriticalChance(state),
    criticalChanceDetails: getAttributeCriticalChanceDetails(state),
    criticalDamage: getAttributeCriticalDamage(state),
    criticalDamageDetails: getAttributeCriticalDamageDetails(state),
    healingPower: getAttributeHealingPower(state),
    healingPowerDetails: getAttributeHealingPowerDetails(state),
    conditionDuration: getAttributeConditionDuration(state),
    conditionDurationDetails: getAttributeConditionDurationDetails(state),
    boonDuration: getAttributeBoonDuration(state),
    boonDurationDetails: getAttributeBoonDurationDetails(state)
});

export default connect(mapStateToProps)(StatsOverview);
