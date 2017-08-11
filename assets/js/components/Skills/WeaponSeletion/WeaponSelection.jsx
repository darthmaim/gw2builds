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

const WeaponSelection = props => (
    <div>
        {renderSelect(props.availableMainhandWeaponObjects, props.activeMainhandWeaponObject, props.onMainhandChange, props.selectedSpecializationIds)}
        {!props.twoHanded && renderSelect(props.availableOffhandWeaponObjects, props.activeOffhandWeaponObject, props.onOffhandChange, props.selectedSpecializationIds)}
    </div>
);

WeaponSelection.propTypes = {
    twoHanded: React.PropTypes.bool.isRequired,

    // Events
    onMainhandChange: React.PropTypes.func.isRequired,
    onOffhandChange: React.PropTypes.func.isRequired,

    // Redux states
    activeMainhandWeaponObject: React.PropTypes.string,
    activeOffhandWeaponObject: React.PropTypes.string,
    availableMainhandWeaponObjects: React.PropTypes.object,
    availableOffhandWeaponObjects: React.PropTypes.object,
    selectedSpecializationIds: React.PropTypes.arrayOf(React.PropTypes.number)
};

export default WeaponSelection;
