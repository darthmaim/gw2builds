import map from 'lodash/map';
import React from 'react';
import { Select } from '~/components/Inputs';

// a weapon is available if it doesn't require a specialization
// or if the specialization is active.
const isWeaponAvailable = (weapon, selectedSpecializationIds) =>
    !weapon.specialization || selectedSpecializationIds.some(id => id === weapon.specialization);

const renderSelect = (weapons, value, onChange, selectedSpecializationIds) => (
    <Select value={value} onChange={onChange} placeholder="None">
        {map(weapons, (weapon, name) => (
            <option key={name} value={name} disabled={!isWeaponAvailable(weapon, selectedSpecializationIds)}>{name}</option>
        ))}
    </Select>
);

const WeaponSelection = ({
    mainhandWeapons, onMainhandChange, activeMainhand,
    offhandWeapons, onOffhandChange, activeOffhand,
    twoHanded, selectedSpecializationIds
}) => (
    <div>
        {renderSelect(mainhandWeapons, activeMainhand, onMainhandChange, selectedSpecializationIds)}
        {!twoHanded && renderSelect(offhandWeapons, activeOffhand, onOffhandChange, selectedSpecializationIds)}
    </div>
);

WeaponSelection.propTypes = {
    selectedSpecializationIds: React.PropTypes.arrayOf(React.PropTypes.number),
    mainhandWeapons: React.PropTypes.object,
    offhandWeapons: React.PropTypes.object,
    onMainhandChange: React.PropTypes.func.isRequired,
    onOffhandChange: React.PropTypes.func.isRequired,
    activeMainhand: React.PropTypes.string,
    activeOffhand: React.PropTypes.string,
    twoHanded: React.PropTypes.bool.isRequired
};

export default WeaponSelection;
