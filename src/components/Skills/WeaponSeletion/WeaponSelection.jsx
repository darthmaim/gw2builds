import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import { Select } from '~/components/Inputs';

// a weapon is available if it doesn't require a specialization
// or if the specialization is active.
const isWeaponAvailable = (weapon, activeSpecializations) =>
    !weapon.specialization || activeSpecializations.some(id => id === weapon.specialization);

const renderSelect = (weapons, value, onChange, activeSpecializations) => (
    <Select value={value} onChange={onChange} placeholder="None">
        {map(weapons, (weapon, name) => (
            <option key={name} value={name} disabled={!isWeaponAvailable(weapon, activeSpecializations)}>{name}</option>
        ))}
    </Select>
);

const WeaponSelection = ({
    mainhandWeapons, onMainhandChange, activeMainhand,
    offhandWeapons, onOffhandChange, activeOffhand,
    twoHanded, activeSpecializations
}) => (
    <div>
        {renderSelect(mainhandWeapons, activeMainhand, onMainhandChange, activeSpecializations)}
        {!twoHanded && renderSelect(offhandWeapons, activeOffhand, onOffhandChange, activeSpecializations)}
    </div>
);

WeaponSelection.propTypes = {
    activeSpecializations: PropTypes.arrayOf(PropTypes.number),
    mainhandWeapons: PropTypes.object,
    offhandWeapons: PropTypes.object,
    onMainhandChange: PropTypes.func.isRequired,
    onOffhandChange: PropTypes.func.isRequired,
    activeMainhand: PropTypes.string,
    activeOffhand: PropTypes.string,
    twoHanded: PropTypes.bool.isRequired
};

export default WeaponSelection;
