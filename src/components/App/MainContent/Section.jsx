import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import style from './section.css';

class Section extends Component {
    render() {
        return (
            <div className={classnames(style.section, this.props.className)} ref={this.props.domRef}>
                <span className={style.anchor} ref={this.props.anchorRef}/>
                <div className={style.header}>{this.props.name}</div>
                <div className={style.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Section.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    domRef: PropTypes.func,
    anchorRef: PropTypes.func,
    className: PropTypes.string
};

export default Section;
