import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import TooltipElement from './TooltipElement';

const ContextShape = PropTypes.shape({
    setTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    onTooltipChange: PropTypes.func,
    update: PropTypes.func
});

class TooltipContext extends Component {
    constructor(props, context) {
        super(props, context);

        this.setRef = this.setRef.bind(this);

        this.tooltips = [];
        this.listeners = [];
        this.lastWasTouch = false;
        this.ref = null;
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
                },
                update: () => {
                    this.ref && this.ref.forceUpdate();
                }
            }
        };
    }

    setRef(ref) {
        this.ref = ref;
    }

    render() {
        return (
            <Fragment>
                <TooltipElement ref={this.setRef}/>
                {React.Children.only(this.props.children)}
            </Fragment>
        );
    }
}

TooltipContext.propTypes = {
    children: PropTypes.node.isRequired
};

TooltipContext.childContextTypes = {
    tooltipContext: ContextShape
};

export default TooltipContext;
export { ContextShape };
