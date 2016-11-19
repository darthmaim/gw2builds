import React, { Component } from 'react';
import { FormattedNumber } from 'react-intl';

import style from './style.css';

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
            style: formatAsPercent ? 'percent' : null,
            minimumFractionDigits: formatAsPercent ? 2 : 0,
            maximumFractionDigits: formatAsPercent ? 2 : 0,
            useGrouping: true
        };

        return (
            <li className={open ? style.attributeOpen : style.attribute}>
                <div className={style.header} onClick={this.handleClick}>
                    <span className={style.label}>
                        <svg className={style.expander}>
                            <polygon fill="#CCCCCC"  points="0 0 0 8 7 4"/>
                        </svg>
                        {this.props.label}
                    </span>
                    <span className={style.value}><FormattedNumber value={this.props.value} {...numberFormat}/></span>
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
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number.isRequired,
    percent: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default Attribute;
