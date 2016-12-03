import React, { Component } from 'react';
import { Tooltip } from '../index';

class TraitTooltip extends Component {
    constructor(props, context) {
        super(props, context);

        this.renderTooltip = this.renderTooltip.bind(this);
    }

    render() {
        return (
            <Tooltip tooltip={this.renderTooltip}>
                {this.props.children}
            </Tooltip>
        );
    }

    renderTooltip() {
        const { name, description, facts } = this.props.trait;

        return (
            <div style={{ background: '#fff', padding: 8, margin: 8, border: '1px solid #eee' }}>
                <div style={{ fontWeight: 'bold' }}>
                    {name}
                </div>
                <div>
                    {description}
                </div>
                {facts.map(this.renderTrait)}
            </div>
        );
    }

    renderTrait(fact, i) {
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
    })
};

export default TraitTooltip;
