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
        const { activeWeaponSet } = this.props;

        return (
            <div>
                <SetButton isActive={activeWeaponSet === 0} onClick={this.handleClick(0)}>
                    <img src="/img/weaponset/set1.svg"/>
                    Weaponset 1
                </SetButton>
                <SetButton isActive={activeWeaponSet === 1} onClick={this.handleClick(1)}>
                    <img src="/img/weaponset/set2.svg"/>
                    Weaponset 2
                </SetButton>
                <SetButton isActive={activeWeaponSet === 2} onClick={this.handleClick(2)}>
                    <img src="/img/weaponset/water1.svg"/>
                    Underwater 1
                </SetButton>
                <SetButton isActive={activeWeaponSet === 3} onClick={this.handleClick(3)}>
                    <img src="/img/weaponset/water2.svg"/>
                    Underwater 2
                </SetButton>
            </div>
        )
    }
}

SetSelection.propTypes = {
    activeWeaponSet: React.PropTypes.number.isRequired,
    onWeaponSetChange: React.PropTypes.func.isRequired
};

export default SetSelection;
