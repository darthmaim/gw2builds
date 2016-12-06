import React, { Component } from 'react';
import Fact from '../Facts/Fact';
import { Tooltip } from '../index';
import style from './tooltip.css';

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

        // add all facts to the active ones
        (facts || []).forEach(fact => activeFacts.push(fact));

        // override active traits with traited facts if the required trait is active
        (traited_facts || []).forEach(fact => {
            if(this.isTraitActive(fact.requires_trait)) {
                if(fact.overrides !== undefined) {
                    activeFacts[fact.overrides] = fact;
                } else {
                    activeFacts.push(fact);
                }
            }
        });

        // TODO: parse description (includes <br>, <c=@reminder>, ...)
        return (
            <div className={style.tooltip}>
                <div className={style.title}>
                    {name}
                </div>
                <div className={style.description} dangerouslySetInnerHTML={this.renderDescription(description)}/>
                <div className={style.facts}>
                    {activeFacts.map(this.renderFact)}
                </div>
            </div>
        );
    }

    renderDescription(description) {
        return { __html: description };
    }

    renderFact(fact, i) {
        return (
            <Fact key={i} fact={fact} />
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
