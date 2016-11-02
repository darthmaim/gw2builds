'use strict';

import React from 'react';

class RegularPanel extends React.Component {
    render() {
        return (
            <div className="regular-container">
                {this.props.children}
            </div>
        );
    }
}

export default RegularPanel;
