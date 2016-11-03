import React, { Component } from 'react';

const ContextShape = React.PropTypes.shape({
    setTooltip: React.PropTypes.func,
    hideTooltip: React.PropTypes.func,
    onTooltipChange: React.PropTypes.func
});

class TooltipContext extends Component {
    constructor(props, context) {
        super(props, context);

        this.tooltips = [];
        this.listeners = [];
    }

    getChildContext() {
        return {
            tooltipContext: {
                setTooltip: tooltip => {
                    this.tooltips = [tooltip, ...this.tooltips];

                    this.listeners.forEach(listener => listener(
                        tooltip
                    ));
                },
                hideTooltip: () => {
                    const [, ...tooltips] = this.tooltips;
                    this.tooltips = tooltips;

                    this.listeners.forEach(listener => listener(
                        tooltips[0] || null
                    ));
                },
                onTooltipChange: listener => {
                    const i = this.listeners.length;
                    this.listeners.push(listener);
                    return () => delete this.listeners[i];
                }
            }
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

TooltipContext.propTypes = {
    children: React.PropTypes.node.isRequired
};

TooltipContext.childContextTypes = {
    tooltipContext: ContextShape
};

export default TooltipContext;
export { ContextShape };
