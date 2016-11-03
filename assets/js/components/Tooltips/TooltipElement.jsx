/* global window */

import React, { Component } from 'react';

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
        if (this.element !== null && this.state.tooltip) {
            this.element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }
    }

    setElementRef(ref) {
        this.element = ref;
    }

    render() {
        if (!this.state.tooltip) {
            return null;
        }

        return (
            <div className={style.tooltip} ref={this.setElementRef}>
                {React.Children.only(this.state.tooltip)}
            </div>
        );
    }
}

TooltipElement.contextTypes = {
    tooltipContext: React.PropTypes.any
};

export default TooltipElement;
