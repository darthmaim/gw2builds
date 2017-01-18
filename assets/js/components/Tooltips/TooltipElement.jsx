/* global window */

import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';
import style from './tooltip.css';

class TooltipElement extends Component {
    constructor(props, context) {
        super(props, context);

        this.tooltips = [];

        this.state = {
            tooltip: null
        };

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.setElementRef = this.setElementRef.bind(this);
    }

    componentDidMount() {
        this.unsubscribeTooltipChange = this.context.tooltipContext.onTooltipChange(
            tooltip => this.setState({ tooltip })
        );

        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        if (this.unsubscribeTooltipChange) {
            this.unsubscribeTooltipChange();
        }

        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove(e) {
        if (this.element && this.state.tooltip) {
            let { clientX: x, clientY: y } = e;
            const { width, height } = this.element.getBoundingClientRect();

            x = Math.min(x, window.innerWidth - width);
            y = y + height > window.innerHeight ? Math.max(y - height, 0) : y;

            this.element.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    setElementRef(ref) {
        this.element = ref;
    }

    render() {
        const tooltip = isFunction(this.state.tooltip) ? this.state.tooltip() : this.state.tooltip;

        if (!tooltip) {
            return <div className={style.tooltip}/>;
        }

        return (
            <div className={style.tooltip} ref={this.setElementRef}>
                {React.Children.only(tooltip)}
            </div>
        );
    }
}

TooltipElement.contextTypes = {
    tooltipContext: React.PropTypes.any
};

export default TooltipElement;
