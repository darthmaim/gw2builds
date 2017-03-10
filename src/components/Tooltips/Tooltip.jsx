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
        this.handleTouch = this.handleTouch.bind(this);
    }

    handleMouseEnter(e) {
        if (e.pointerType === 'touch') {
            return;
        }

        this.context.tooltipContext.setTooltip(this.props.tooltip, e);
    }

    handleTouch(e) {
        if (!this.state.visible) {
            this.context.tooltipContext.setTooltip(this.props.tooltip, e);
            e.preventDefault();
        }
    }

    handleMouseOut(e) {
        if (e.pointerType === 'touch') {
            return;
        }

        let node = e.relatedTarget;

        while (node && node !== e.currentTarget) {
            node = node.parentElement;
        }

        if (!node) {
            this.context.tooltipContext.hideTooltip(e);
        }
    }

    attachEvents() {
        this.node.addEventListener('pointerenter', this.handleMouseEnter);
        this.node.addEventListener('pointerout', this.handleMouseOut);
        this.node.addEventListener('touchstart', this.handleTouch);
        this.unregisterTooltipChangeEvent = this.context.tooltipContext.onTooltipChange(tooltip => {
            this.setState({ visible: tooltip === this.props.tooltip });
        });
    }

    dettachEvents() {
        this.node.removeEventListener('pointerenter', this.handleMouseEnter);
        this.node.removeEventListener('pointerout', this.handleMouseOut);
        this.node.removeEventListener('touchstart', this.handleTouch);
        this.unregisterTooltipChangeEvent();
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
