'use strict';

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class OverlayPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const wasOpen = this.state.open;
        let changed = false;
        if (e.currentTarget.className.match(/overlay-container-header/)) {
            // Only toggle state when clicking on the header
            this.setState({ open: !this.state.open });
            changed = true;
        } else if (e.target.className.match(/overlay-container-content-container/)) {
            // Only close when clicking outside the content container
            this.setState({ open: false });
            changed = true;
        }
        if (changed && wasOpen && this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div className="overlay-container">
                <div className="overlay-container-header" onClick={this.onClick}>
                    {this.renderHeader()}
                </div>
                {this.renderPanel()}
            </div>
        );
    }

    renderHeader() {
        if (!this.props.header) {
            return null;
        }
        return this.props.header;
    }

    renderPanel() {
        if (!this.props.panel) {
            return null;
        }
        return (
            <ReactCSSTransitionGroup transitionName="animate"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                className="overlay-container-panel"
                component="div"
                >
                {this.state.open ? <div className="overlay-container-content-container" onClick={this.onClick}>
                    <div className="overlay-container-content">{this.props.panel}</div>
                </div> : ''}
            </ReactCSSTransitionGroup>
        );
    }
}

export default OverlayPanel;
