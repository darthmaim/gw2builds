import React, { Component } from 'react';
import SetButton from './SetButton';

class SetSelection extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            index: 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        return () => this.setState({index});
    }

    render() {
        const { index } = this.state;

        return (
            <div>
                <SetButton isActive={index === 0} onClick={this.handleClick(0)}>
                    <img src="/img/weaponset/set1.svg"/>
                    Weaponset 1
                </SetButton>
                <SetButton isActive={index === 1} onClick={this.handleClick(1)}>
                    <img src="/img/weaponset/set2.svg"/>
                    Weaponset 2
                </SetButton>
                <SetButton isActive={index === 2} onClick={this.handleClick(2)}>
                    <img src="/img/weaponset/water1.svg"/>
                    Underwater 1
                </SetButton>
                <SetButton isActive={index === 3} onClick={this.handleClick(3)}>
                    <img src="/img/weaponset/water2.svg"/>
                    Underwater 2
                </SetButton>
            </div>
        )
    }
}

export default SetSelection;
