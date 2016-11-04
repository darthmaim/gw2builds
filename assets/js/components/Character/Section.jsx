import React, { Component } from 'react';

import style from './section.css';

class Section extends Component {
    render() {
        return (
            <div className={style.section}>
                <div className={style.header}>{this.props.name}</div>
                <div className={style.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Section.propTypes = {
    name: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired
};

export default Section;
