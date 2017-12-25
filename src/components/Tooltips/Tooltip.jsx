import PropTypes from 'prop-types';
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
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    handleMouseEnter(e) {
        if (e.pointerType === 'touch') {
            return;
        }

        this.context.tooltipContext.setTooltip(this.props.tooltip, e);
    }

    handleTouchStart(e) {
        this.touchStart = e.changedTouches[0];
    }

    handleTouchEnd(e) {
        const start = this.touchStart;
        const touch = e.changedTouches[0];
        const handle = touch.identifier === start.identifier &&
            Math.abs(touch.clientX - start.clientX) < 16 && Math.abs(touch.clientY - start.clientY) < 16 &&
            touch.target === start.target;

        if (!this.state.visible && handle) {
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
        this.node.addEventListener('touchstart', this.handleTouchStart);
        this.node.addEventListener('touchend', this.handleTouchEnd);
        this.unregisterTooltipChangeEvent = this.context.tooltipContext.onTooltipChange(tooltip => {
            this.setState({ visible: tooltip === this.props.tooltip });
        });
    }

    dettachEvents() {
        this.node.removeEventListener('pointerenter', this.handleMouseEnter);
        this.node.removeEventListener('pointerout', this.handleMouseOut);
        this.node.removeEventListener('touchstart', this.handleTouchStart);
        this.node.removeEventListener('touchend', this.handleTouchEnd);
        this.unregisterTooltipChangeEvent();
    }

    componentDidMount() {
        this.node = findDOMNode(this);
        this.attachEvents();
    }

    componentWillUnmount() {
        if(this.state.visible) {
            this.context.tooltipContext.hideTooltip();
        }

        this.dettachEvents();
    }

    hide() {
        this.context.tooltipContext.hideTooltip();
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
};

Tooltip.contextTypes = {
    tooltipContext: ContextShape
};

export default Tooltip;
