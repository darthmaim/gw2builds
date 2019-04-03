import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NumberFormat } from '@lingui/react';
import style from './style.module.css';

class Attribute extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ open: !this.state.open });
    }

    render() {
        const formatAsPercent = this.props.percent;
        const { open } = this.state;

        const numberFormat = {
            style: formatAsPercent ? 'percent' : undefined,
            minimumFractionDigits: formatAsPercent ? 2 : 0,
            maximumFractionDigits: formatAsPercent ? 2 : 0,
            useGrouping: true
        };

        return (
            <li className={open ? style.attributeOpen : style.attribute}>
                <div className={style.header} onClick={this.handleClick}>
                    <span className={style.label}>
                        <svg className={style.expander}>
                            <polygon fill="currentColor" points="0 0 0 8 7 4"/>
                        </svg>
                        {this.props.label}
                    </span>
                    <span className={style.value}><NumberFormat value={this.props.value} format={numberFormat}/></span>
                </div>
                {open && this.renderDetails()}
            </li>
        );
    }

    renderDetails() {
        return (
            <div className={style.details}>Details</div>
        );
    }
}

Attribute.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.bool
};

export default Attribute;
