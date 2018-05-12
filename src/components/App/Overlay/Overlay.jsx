import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Overlay.css';

let overlayRoot;
function getOverlayRoot() {
    if(!overlayRoot) {
        overlayRoot = document.createElement('div');
        document.body.appendChild(overlayRoot);
    }

    return overlayRoot;
}

class Overlay extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);

        // create overlay element
        this.element = document.createElement('div');
        this.element.className = style.overlay;
        this.element.addEventListener('click', this.handleOnClick);
    }

    handleOnClick(e) {
        if(e.target === this.element && this.props.onClick) {
            this.props.onClick(e);
        }
    }

    componentDidMount() {
        getOverlayRoot().appendChild(this.element);
    }

    componentWillUnmount() {
        getOverlayRoot().removeChild(this.element);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.element);
    }
}

Overlay.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func
};

export default Overlay;
