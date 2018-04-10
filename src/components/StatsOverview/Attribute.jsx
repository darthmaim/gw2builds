import PropTypes from 'prop-types';
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
                            <polygon fill="#CCCCCC" points="0 0 0 8 7 4"/>
                        </svg>
                        {this.props.label}
                    </span>
                    <span className={style.value}><FormattedNumber value={this.props.value} {...numberFormat}/></span>
                </div>
                {open && this.renderDetails(numberFormat)}
            </li>
        );
    }

    renderDetails(numberFormat) {
        if(!this.props.details) {
            return (
                <div className={style.details}>Details</div>
            );
        }

        return (
            <div className={style.details}>{this.props.details.map(
                (detail, key) => (
                    <div key={key} className={style.detailsRow}>
                        <span className={style.detailsLabel}>{detail.label}</span>
                        <span>
                            {key > 0 ? (detail.value >= 0 ? '+ ' : '- ') : ''}
                            <FormattedNumber value={Math.abs(detail.value)} {...numberFormat}/></span>
                    </div>
                )
            )}</div>
        );
    }
}

Attribute.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.bool
};

export default Attribute;
