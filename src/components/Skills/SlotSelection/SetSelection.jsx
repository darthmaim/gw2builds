import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SetButton from './SetButton';

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
            { name: 'Weaponset 1', icon: '/img/weaponset/set1.svg', enabled: true },
            { name: 'Weaponset 2', icon: '/img/weaponset/set2.svg', enabled: hasMultipleWeaponsets },
            { name: 'Underwater 1', icon: '/img/weaponset/water1.svg', enabled: true },
            { name: 'Underwater 2', icon: '/img/weaponset/water2.svg', enabled: hasMultipleWeaponsets }
        ];

        return (
            <div>
                {sets.map((set, index) => set.enabled && (
                    <SetButton key={index} isActive={activeWeaponSet === index} onClick={this.handleClick(index)}>
                        <img src={set.icon}/>
                        {set.name}
                    </SetButton>
                ))}
            </div>
        );
    }
}

SetSelection.propTypes = {
    activeWeaponSet: PropTypes.number.isRequired,
    selectedProfession: PropTypes.string,
    onWeaponSetChange: PropTypes.func.isRequired
};

export default SetSelection;
