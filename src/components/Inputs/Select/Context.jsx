import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContextShape from './ContextShape';

class SelectContext extends Component {
    constructor(props, context) {
        super(props, context);

        this.listeners = [];
    }

    //noinspection JSUnusedGlobalSymbols
    getChildContext() {
        return {
            selectContext: {
                showDropdown: (dropdown) => {
                    this.listeners.forEach(listener => listener(dropdown));
                },
                hideDropdown: () => {
                    this.listeners.forEach(listener => listener(null));
                },
                addListener: (cb) => {
                    this.listeners.push(cb);
                }
            }
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}

SelectContext.propTypes = {
    children: PropTypes.node.isRequired
};

SelectContext.childContextTypes = {
    selectContext: ContextShape
};

export default SelectContext;
