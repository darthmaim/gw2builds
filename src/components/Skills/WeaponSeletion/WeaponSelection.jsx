import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import { Select } from '../../../components/Inputs';
import style from './WeaponSelection.module.css';
import InputGroup from '../../Inputs/Group/InputGroup';
import { Trans } from '@lingui/macro';

// a weapon is available if it doesn't require a specialization
// or if the specialization is active.
const isWeaponAvailable = (weapon, selectedSpecializationIds) =>
    !weapon.specialization || selectedSpecializationIds.some(id => id === weapon.specialization);

const renderSelect = (title, weapons, value, onChange, selectedSpecializationIds, availableSpecializationObjects) => (
    <InputGroup title={title} inline={true}>
        <Select value={value} onChange={onChange} placeholder={<Trans>None</Trans>}>
            {map(weapons, (weapon, name) => (
                <Select.Option key={name} value={name} disabled={!isWeaponAvailable(weapon, selectedSpecializationIds)}>
                    {name}
                    {!isWeaponAvailable(weapon, selectedSpecializationIds) && renderSpecializationRequirement(weapon, availableSpecializationObjects)}
                </Select.Option>
            ))}
        </Select>
    </InputGroup>
);

const renderSpecializationRequirement = (weapon, availableSpecializationObjects) => {
    const specializations = availableSpecializationObjects[weapon.specialization];

    return specializations && (
        <span className={style.specializationRequirement}>
            {specializations.elite
                ? <Trans>Requires the elite specialization {specializations.name}</Trans>
                : <Trans>Requires the specialization {specializations.name}</Trans>
            }
        </span>
    );
};

const WeaponSelection = ({
    availableMainhandWeaponObjects, onMainhandChange, activeMainhandWeaponId,
    availableOffhandWeaponObjects, onOffhandChange, activeOffhandWeaponId,
    twoHanded, selectedSpecializationIds, availableSpecializationObjects
}) => (
    <div className={style.container}>
        {renderSelect((<Trans>Mainhand</Trans>), availableMainhandWeaponObjects, activeMainhandWeaponId, onMainhandChange, selectedSpecializationIds, availableSpecializationObjects)}
        {!twoHanded && renderSelect((<Trans>Offhand</Trans>), availableOffhandWeaponObjects, activeOffhandWeaponId, onOffhandChange, selectedSpecializationIds, availableSpecializationObjects)}
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
    selectedSpecializationIds: PropTypes.arrayOf(PropTypes.number),
    availableSpecializationObjects: PropTypes.object
};

export default WeaponSelection;
