import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SetButton from './SetButton';
import InputGroup from '../../Inputs/Group/InputGroup';
import { Trans } from '@lingui/macro';

import { ReactComponent as Set1Icon } from './set1.svg';
import { ReactComponent as Set2Icon } from './set2.svg';
import { ReactComponent as Water1Icon } from './water1.svg';
import { ReactComponent as Water2Icon } from './water2.svg';

class SetSelection extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        return () => this.props.onWeaponSetChange(index);
    }

    render() {
        const { activeWeaponSet, hasMultipleWeaponsets } = this.props;

        const sets = [
            { name: <Trans>Weaponset 1</Trans>, icon: Set1Icon, enabled: true },
            { name: <Trans>Weaponset 2</Trans>, icon: Set2Icon, enabled: hasMultipleWeaponsets },
            { name: <Trans>Underwater 1</Trans>, icon: Water1Icon, enabled: true },
            { name: <Trans>Underwater 2</Trans>, icon: Water2Icon, enabled: hasMultipleWeaponsets }
        ];

        return (
            <InputGroup title={<Trans>Weapon Set</Trans>}>
                {sets.map(({ name, icon, enabled }, index) => enabled && (
                    <SetButton key={index} isActive={activeWeaponSet === index} onClick={this.handleClick(index)} icon={icon}>
                        {name}
                    </SetButton>
                ))}
            </InputGroup>
        );
    }
}

SetSelection.propTypes = {
    activeWeaponSet: PropTypes.number.isRequired,
    selectedProfession: PropTypes.string,
    onWeaponSetChange: PropTypes.func.isRequired
};

export default SetSelection;
