import React, { Component } from 'react';
import { ContextShape } from './TooltipContext';

class Tooltip extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseEnter() {
        this.context.tooltipContext.setTooltip(this.props.tooltip);
    }

    handleMouseOut(e) {
        let node = e.relatedTarget;

        while (node && node !== e.currentTarget) {
            node = node.parentElement;
        }

        if (!node) {
            this.context.tooltipContext.hideTooltip();
        }
    }

    render() {
        return (<div style={{ display: 'initial' }} onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut}>
            {this.props.children}
        </div>);
    }
}

Tooltip.propTypes = {
    children: React.PropTypes.node.isRequired,
    tooltip: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func]).isRequired
};

Tooltip.contextTypes = {
    tooltipContext: ContextShape
};

export default Tooltip;
