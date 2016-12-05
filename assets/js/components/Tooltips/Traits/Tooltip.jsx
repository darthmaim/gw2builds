import React, { Component } from 'react';
import { Tooltip } from '../index';

class TraitTooltip extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderTooltip = this.renderTooltip.bind(this);
    }

    isTraitActive(traitId) {
        return this.props.activeMajorTraits.indexOf(traitId) !== -1
            || this.props.activeMinorTraits.indexOf(traitId) !== -1
    }

    render() {
        return (
            <Tooltip tooltip={this.renderTooltip}>
                {this.props.children}
            </Tooltip>
        );
    }

    renderTooltip() {
        if(!this.props.trait) {
            return null;
        }

        const { name, description, facts, traited_facts } = this.props.trait;

        let activeFacts = [];
        facts.forEach(fact => activeFacts.push(fact));

        (traited_facts || []).forEach(fact => {
            if(this.isTraitActive(fact.requires_trait)) {
                if(fact.overrides !== undefined) {
                    activeFacts[fact.overrides] = fact;
                } else {
                    activeFacts.push(fact);
                }
            }
        });

        return (
            <div style={{ background: '#fff', padding: 8, margin: 8, border: '1px solid #eee' }}>
                <div style={{ fontWeight: 'bold' }}>
                    {name}
                </div>
                <div>
                    {description}
                </div>
                {activeFacts.map(this.renderFact)}
            </div>
        );
    }

    renderFact(fact, i) {
        return (
            <div key={i}>
                <img src={fact.icon} width={16} height={16} />
                {fact.text}
            </div>
        );
    }
}

TraitTooltip.propTypes = {
    children: React.PropTypes.node.isRequired,
    trait: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        facts: React.PropTypes.arrayOf(React.PropTypes.shape({
            icon: React.PropTypes.string.isRequired,
            text: React.PropTypes.string
        }))
    }),
    // bound from redux state
    activeMajorTraits: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    activeMinorTraits: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
};

export default TraitTooltip;
