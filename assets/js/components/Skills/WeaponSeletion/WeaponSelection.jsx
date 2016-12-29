import React from 'react';
import { Select } from './../../Inputs';
import map from 'lodash/map';

const renderSelect = (weapons, value, onChange) => (
    <Select value={value} onChange={onChange} placeholder="None">
        {map(weapons, (weapon, name) => (
            <option key={name} value={name}>{name}</option>
        ))}
    </Select>
);

const WeaponSelection = ({
    mainhandWeapons, onMainhandChange, activeMainhand,
    offhandWeapons, onOffhandChange, activeOffhand
}) => (
    <div>
        {renderSelect(mainhandWeapons, activeMainhand, onMainhandChange)}
        {renderSelect(offhandWeapons, activeOffhand, onOffhandChange)}
    </div>
);

WeaponSelection.propTypes = {
    mainhandWeapons: React.PropTypes.object,
    offhandWeapons: React.PropTypes.object,
    onMainhandChange: React.PropTypes.func.isRequired,
    onOffhandChange: React.PropTypes.func.isRequired,
    activeMainhand: React.PropTypes.string,
    activeOffhand: React.PropTypes.string,
};

export default WeaponSelection;
