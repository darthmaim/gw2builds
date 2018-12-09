import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { format } from 'gw2-tooltip-html';
import Fact, { FactShape } from '../Facts/Fact';
import Tooltip from '../Tooltip';
import style from './tooltip.module.css';

class SkillTooltip extends Component {
    constructor(props, context) {
        super(props, context);

        this.tooltip = null;
        this.renderTooltip = this.renderTooltip.bind(this);
    }

    isTraitSelected(traitId) {
        const isSelectedMajorTrait = this.props.selectedMajorTraitIds.indexOf(traitId) !== -1;
        const isSelectedMinorTrait = this.props.selectedMinorTraitIds.indexOf(traitId) !== -1;

        return isSelectedMajorTrait || isSelectedMinorTrait;
    }

    render() {
        return (
            <Tooltip showIds={this.props.showIds} tooltip={this.renderTooltip} ref={(tooltip) => this.tooltip = tooltip}>
                {this.props.children}
            </Tooltip>
        );
    }

    renderTooltip(touch) {
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
                    {this.props.showIds ? ` (${this.props.skill.id})` : ''}
                </div>
                {this.renderDescription(description)}
                {this.renderFacts(activeFacts)}
                {this.renderAction(touch)}
            </div>
        );
    }

    renderDescription(description) {
        return (
            <div className={style.description} dangerouslySetInnerHTML={{__html: format(description)}}/>
        );
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

    renderAction(touch) {
        if(!this.props.action) {
            return null;
        }

        const action = this.props.action;
        const actionClick = () => {
            this.tooltip.node.click();
            this.tooltip.hide();
        };

        if(touch) {
            return (
                <button className={style.actionButton} onClick={actionClick}>
                    {action}
                </button>
            );
        } else {
            return (
                <div className={style.actionHint}>Click to {action}.</div>
            );
        }
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
    action: PropTypes.string,
    // bound from redux state
    selectedMajorTraitIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedMinorTraitIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default SkillTooltip;
