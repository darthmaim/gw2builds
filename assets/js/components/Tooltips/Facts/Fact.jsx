import React from 'react';
import style from './fact.css';

const getIcon = function (fact) {
    switch (fact.type) {
        case 'PrefixedBuff':
            return (
                <span>
                    <img src={fact.prefix.icon} width={16} height={16}/>
                    <img src={fact.icon} width={16} height={16}/>
                </span>
            );
        default:
            return (<img src={fact.icon} width={16} height={16}/>);
    }
};

const getText = function (fact) {
    switch (fact.type) {
        case 'AttributeAdjust':
            if (fact.text) {
                return (<span>{fact.text}: +{fact.value} {fact.target !== 'None' && fact.target}</span>);
            }
            return (<span>{fact.target}: +{fact.value}</span>);
        case 'Buff':
        case 'PrefixedBuff':
            const status = fact.status || fact.prefix.status;
            const description = fact.description || (fact.prefix && fact.prefix.description);
            return (
                <span>
                    {fact.apply_count ? fact.apply_count + '× ' : ''}
                    {status}{fact.duration > 0 ? ' (' + fact.duration + 's)' : '' }
                    {description && <span>: <div className={style.description}>{description}</div></span>}
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

const Fact = ({ fact }) => {
    return (
        <div className={fact.isTraitedFact ? style.traitedFact : style.fact}>
            {getIcon(fact)}{getText(fact)}
        </div>
    );
};

export const FactShape = React.PropTypes.shape({
    icon: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    distance: React.PropTypes.number,
    duration: React.PropTypes.number,
    field_type: React.PropTypes.string,
    finisher_type: React.PropTypes.string,
    isTraitedFact: React.PropTypes.bool,
    percent: React.PropTypes.number,
    source: React.PropTypes.string,
    status: React.PropTypes.string,
    target: React.PropTypes.string,
    text: React.PropTypes.string,
    value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    prefix: React.PropTypes.shape({
        icon: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
        status: React.PropTypes.string,
        text: React.PropTypes.string
    })
});

Fact.propTypes = {
    fact: FactShape
};

export default Fact;
