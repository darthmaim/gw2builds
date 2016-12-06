import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { ContextShape } from './TooltipContext';

class Tooltip extends PureComponent {
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

    attachEvents() {
        this.node.addEventListener('mouseenter', this.handleMouseEnter);
        this.node.addEventListener('mouseout', this.handleMouseOut);
    }

    dettachEvents() {
        this.node.removeEventListener('mouseenter', this.handleMouseEnter);
        this.node.removeEventListener('mouseout', this.handleMouseOut);
    }

    componentDidMount() {
        this.node = findDOMNode(this);
        this.attachEvents();
    }

    componentWillUnmount() {
        this.dettachEvents();
    }

    render() {
        return React.Children.only(this.props.children);
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
