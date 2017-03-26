/* global window */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';
import Inertia from './TooltipInertia';
import style from './tooltip.css';

const INITAL_TOUCH_OFFSET = -148;

class TooltipElement extends Component {
    constructor(props, context) {
        super(props, context);

        this.tooltips = [];
        this.touch = {
            identifier: undefined,
            position: 0,
            offset: INITAL_TOUCH_OFFSET
        };

        this.state = {
            tooltip: null,
            touch: false
        };

        this.wasFlipped = false;
        this.inertia = new Inertia({
            update: this.handleInertiaUpdate.bind(this)
        });

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.setElementRef = this.setElementRef.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    componentDidMount() {
        this.unsubscribeTooltipChange = this.context.tooltipContext.onTooltipChange(
            (tooltip, event) => {
                const touch = event !== undefined && event.constructor.name === 'TouchEvent';
                this.setState({ tooltip, touch }, () => {
                    if(!tooltip) {
                        this.touch.offset = INITAL_TOUCH_OFFSET;
                    }

                    if (touch && this.element) {
                        this.inertia.setBound(-this.element.offsetHeight);
                        this.inertia.update(Math.min(-100, this.inertia.value), Date.now());
                    }
                });
            }
        );

        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        if (this.unsubscribeTooltipChange) {
            this.unsubscribeTooltipChange();
        }

        window.removeEventListener('mousemove', this.handleMouseMove);
        this.removeElementEventListeners();
    }

    handleMouseMove(e) {
        if (this.element && this.state.tooltip && !this.state.touch) {
            let { clientX: x, clientY: y } = e;
            const { width, height } = this.element.getBoundingClientRect();

            x = Math.min(x, window.innerWidth - width);

            const fitsBottom = y + height < window.innerHeight;
            const flipped = !fitsBottom && (this.wasFlipped || (y - height > 0));
            this.wasFlipped = flipped;

            y = flipped ? Math.max(y - height, 0) : Math.min(y, window.innerHeight - height);

            this.element.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    handleTouchStart(e) {
        if (this.touch.identifier !== undefined) {
            return;
        }

        e.preventDefault();
        this.inertia.setBound(-this.element.offsetHeight);

        this.touch.identifier = e.changedTouches[0].identifier;
        this.touch.position = e.changedTouches[0].screenY;
    }

    handleTouchMove(e) {
        if (this.touch.identifier === undefined) {
            return;
        }

        e.preventDefault();

        Array.from(e.changedTouches).forEach(touch => {
            if (touch.identifier === this.touch.identifier) {
                const delta = touch.screenY - this.touch.position;
                this.touch.position = touch.screenY;
                this.inertia.update(this.inertia.value + delta, Date.now());
            }
        });
    }

    handleTouchEnd(e) {
        if (this.touch.identifier === undefined) {
            return;
        }

        this.touch.identifier = undefined;

        this.inertia.start();
    }

    handleInertiaUpdate(value) {
        this.element.style.transform = `translateY(100%) translateY(${value}px)`;

        if (this.inertia.value >= 0) {
            this.inertia.stop();
            this.context.tooltipContext.hideTooltip();
        }
    }

    addElementEventListeners() {
        if (this.element) {
            this.element.addEventListener('touchstart', this.handleTouchStart);
            this.element.addEventListener('touchmove', this.handleTouchMove);
            this.element.addEventListener('touchend', this.handleTouchEnd);
        }
    }

    removeElementEventListeners() {
        if (this.element) {
            this.element.removeEventListener('touchstart', this.handleTouchStart);
            this.element.removeEventListener('touchmove', this.handleTouchMove);
            this.element.removeEventListener('touchend', this.handleTouchEnd);
        }
    }

    setElementRef(ref) {
        this.removeElementEventListeners();
        this.element = ref;
        this.addElementEventListeners();
    }

    render() {
        const tooltip = isFunction(this.state.tooltip) ? this.state.tooltip(this.state.touch) : this.state.tooltip;

        if (!tooltip) {
            return <div className={style.tooltip}/>;
        }

        return (
            <div className={this.state.touch ? style.touch : style.tooltip} ref={this.setElementRef}>
                {React.Children.only(tooltip)}
            </div>
        );
    }
}

TooltipElement.contextTypes = {
    tooltipContext: PropTypes.any
};

export default TooltipElement;
