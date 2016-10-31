"use strict";

import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class TabsPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            prevTab: 0,
            selectedTab: 0
        };
        this.onTabHeaderClick = this.onTabHeaderClick.bind(this);
    }

    onTabHeaderClick(e) {
        this.setState({
            prevTab: this.state.selectedTab,
            selectedTab: e.props.tabId
        });
    }

    render() {
        return (
            <div className="tab-container">
                <ul className="tab-container-headers">
                    {this.renderHeaders()}
                </ul>
                {this.renderSelectedPanel()}
            </div>
        );
    }

    renderHeaders() {
        if (!this.props.headers) return null;
        return this.props.headers.map((h, i) => {
            return (
                <TabHeader key={i}
                           tabId={i}
                           onTabHeaderClick={this.onTabHeaderClick}>
                    {h}
                </TabHeader>
            );
        });
    }

    renderSelectedPanel() {
        if (!this.props.tabs || this.props.tabs.length < this.state.selectedTab) return null;

        const panel = this.props.tabs[this.state.selectedTab];
        let directionClass = "";
        if (this.state.prevTab < this.state.selectedTab) directionClass = "animate-from-right";
        else if (this.state.prevTab > this.state.selectedTab) directionClass = "animate-from-left";
        return (
            <ReactCSSTransitionGroup transitionName={directionClass}
                                     transitionEnterTimeout={500}
                                     transitionLeaveTimeout={500}
                                     className="tab-container-active-tab"
                                     component="div">
                <TabPanel key={this.state.selectedTab} tabId={this.state.selectedTab}>
                    {panel}
                </TabPanel>
            </ReactCSSTransitionGroup>
        );
    }
}

class TabHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            isSelected: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onTabHeaderClick) {
            this.props.onTabHeaderClick(this);
        }
    }

    render() {
        return (
            <li className="tab-container-header" onClick={this.onClick}>
                {this.props.children}
            </li>
        );
    }
}

class TabPanel extends React.Component {
    render() {
        return this.props.children;
    }
}

export default TabsPanel;
