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
        this.lastWasTouch = false;
    }

    getChildContext() {
        return {
            tooltipContext: {
                setTooltip: (tooltip, e) => {
                    if (e.constructor.name === 'TouchEvent') {
                        this.lastWasTouch = true;
                        this.tooltips = [tooltip];
                    } else {
                        if (this.lastWasTouch) {
                            this.tooltips = [];
                        }

                        this.tooltips = [tooltip, ...this.tooltips];
                        this.lastWasTouch = false;
                    }

                    this.listeners.forEach(listener => listener(
                        tooltip, e
                    ));
                },
                hideTooltip: e => {
                    const [, ...tooltips] = this.tooltips;
                    this.tooltips = tooltips;

                    this.listeners.forEach(listener => listener(
                        tooltips[0] || null, e
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
