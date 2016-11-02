import React from 'react';
import style from './style.css';

class Option extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onSelected) {
            this.props.onSelected(this.props.option);
        }
    }

    render() {
        const className = [
            style[`option${this.props.selected ? '-selected' : ''}`],
            style[`${this.props.group}-${this.props.option}`]
        ].join(' ');

        return (
            <li className={className} onClick={this.onClick}>
                {this.props.children}
            </li>
        );
    }
}

export default Option;
