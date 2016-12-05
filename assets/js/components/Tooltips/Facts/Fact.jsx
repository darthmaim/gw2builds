import React from 'react';
import style from './fact.css';

const getIcon = function(fact) {
    switch(fact.type) {
        case 'PrefixedBuff':
            debugger;
            return (
                <span>
                    <img src={fact.prefix.icon} width={16} height={16} />
                    <img src={fact.icon} width={16} height={16} />
                </span>
            );
        default:
            return (<img src={fact.icon} width={16} height={16} />);
    }
};

const getText = function(fact) {
    switch(fact.type) {
        case 'AttributeAdjust':
            return (<span>+{fact.value} {fact.target}</span>);
        case 'Buff':
        case 'PrefixedBuff':
            return (
                <span>
                    {fact.apply_count ? fact.apply_count + '× ' : ''}
                    {fact.status}{fact.duration > 0 ? ' (' + fact.duration + 's)' : '' }
                    {fact.description && <span>: <div className={style.description}>{fact.description}</div></span>}
                </span>
            );
        case 'BuffConversion':
            return (<span>Gain {fact.target} based on a percentage of {fact.source}: {fact.percent}%</span>);
        case 'ComboField':
            return (<span>{fact.text}: {fact.field_type}</span>);
        case 'ComboFinisher':
            return (<span>{fact.text}: {fact.finisher_type} ({fact.percent}%)</span>);
        case 'Distance':
        case 'Radius':
            return (<span>{fact.text}: {fact.distance}</span>);
        case 'Number':
        case 'Range':
            return (<span>{fact.text}: {fact.value}</span>);
        case 'Percent':
            return (<span>{fact.text}: {fact.percent}%</span>);
        case 'Recharge':
            return (<span>{fact.text}: {fact.value}s</span>);
        case 'Time':
            return (<span>{fact.text}: {fact.duration}s</span>);

        default: return fact.text;
    }
};

const Fact = ({fact}) => {
    return (
        <div className={style.fact}>
            {getIcon(fact)} {getText(fact)}
        </div>
    );
};

Fact.propTypes = {
    fact: React.PropTypes.shape({
        icon: React.PropTypes.string.isRequired,
        text: React.PropTypes.string,
    })
};

export default Fact;
