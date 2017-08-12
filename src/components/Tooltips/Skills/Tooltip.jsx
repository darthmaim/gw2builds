import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Fact, { FactShape } from '../Facts/Fact';
import Tooltip from '../Tooltip';
import style from './tooltip.css';

class SkillTooltip extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderTooltip = this.renderTooltip.bind(this);
    }

    isTraitSelected(traitId) {
        const isSelectedMajorTrait = this.props.selectedMajorTraitIds.indexOf(traitId) !== -1;
        const isSelectedMinorTrait = this.props.selectedMinorTraitIds.indexOf(traitId) !== -1;

        return isSelectedMajorTrait || isSelectedMinorTrait;
    }

    render() {
        return (
            <Tooltip tooltip={this.renderTooltip}>
                {this.props.children}
            </Tooltip>
        );
    }

    renderTooltip() {
        if (!this.props.skill) {
            return null;
        }

        const { name, description, facts, traited_facts: traitedFacts } = this.props.skill;
        let activeFacts = [];

        // add all facts to the active ones
        (facts || []).forEach(fact => activeFacts.push(fact));

        // override active traits with traited facts if the required trait is active
        (traitedFacts || []).forEach(fact => {
            if (this.isTraitSelected(fact.requires_trait)) {
                const traitedFact = Object.assign({}, fact, { isTraitedFact: true });
                if (fact.overrides !== undefined) {
                    activeFacts[fact.overrides] = traitedFact;
                } else {
                    activeFacts.push(traitedFact);
                }
            }
        });

        return (
            <div className={style.tooltip}>
                <div className={style.title}>
                    {name}
                </div>
                <div className={style.description} dangerouslySetInnerHTML={this.renderDescription(description)}/>
                {this.renderFacts(activeFacts)}
            </div>
        );
    }

    renderDescription(description) {
        // TODO: parse <c=@reminder>, ... tags
        return { __html: description };
    }

    renderFacts(facts) {
        if (!facts || facts.length === 0) {
            return;
        }

        return (
            <div className={style.facts}>
                {facts.map(this.renderFact)}
            </div>
        );
    }

    renderFact(fact, i) {
        return (
            <Fact key={i} fact={fact}/>
        );
    }
}

SkillTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    skill: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        facts: PropTypes.arrayOf(FactShape),
        traited_facts: PropTypes.arrayOf(FactShape)
    }),
    // bound from redux state
    selectedMajorTraitIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedMinorTraitIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default SkillTooltip;
