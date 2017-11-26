import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import { Select } from '../../../components/Inputs';
import style from './WeaponSelection.css';

// a weapon is available if it doesn't require a specialization
// or if the specialization is active.
const isWeaponAvailable = (weapon, selectedSpecializationIds) =>
    !weapon.specialization || selectedSpecializationIds.some(id => id === weapon.specialization);

const renderSelect = (weapons, value, onChange, selectedSpecializationIds) => (
    <Select value={value} onChange={onChange} placeholder="None">
        {map(weapons, (weapon, name) => (
            <Select.Option key={name} value={name} disabled={!isWeaponAvailable(weapon, selectedSpecializationIds)}>
                {name}
                {weapon.specialization && (<span className={style.specializationRequirement}>Requires specialization {weapon.specialization}</span>)}
            </Select.Option>
        ))}
    </Select>
);

const WeaponSelection = ({
    availableMainhandWeaponObjects, onMainhandChange, activeMainhandWeaponId,
    availableOffhandWeaponObjects, onOffhandChange, activeOffhandWeaponId,
    twoHanded, selectedSpecializationIds
}) => (
    <div>
        {renderSelect(availableMainhandWeaponObjects, activeMainhandWeaponId, onMainhandChange, selectedSpecializationIds)}
        {!twoHanded && renderSelect(availableOffhandWeaponObjects, activeOffhandWeaponId, onOffhandChange, selectedSpecializationIds)}
    </div>
);

WeaponSelection.propTypes = {
    twoHanded: PropTypes.bool.isRequired,

    // Events
    onMainhandChange: PropTypes.func.isRequired,
    onOffhandChange: PropTypes.func.isRequired,

    // Redux states
    activeMainhandWeaponId: PropTypes.string,
    activeOffhandWeaponId: PropTypes.string,
    availableMainhandWeaponObjects: PropTypes.object,
    availableOffhandWeaponObjects: PropTypes.object,
    selectedSpecializationIds: PropTypes.arrayOf(PropTypes.number)
};

export default WeaponSelection;
