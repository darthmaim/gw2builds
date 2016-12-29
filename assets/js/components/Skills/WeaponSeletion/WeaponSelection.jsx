import React from 'react';
import { Select } from './../../Inputs';
import map from 'lodash/map';

const renderSelect = weapons => (
    <Select onChange={() => {}}>
        {map(weapons, (weapon, name) => (
            <option key={name} value={name}>{name}</option>
        ))}
    </Select>
);

export default ({mainHand, offHand}) => (
    <div>
        {renderSelect(mainHand)} {renderSelect(offHand)}
    </div>
)
