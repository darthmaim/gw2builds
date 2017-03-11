import React, { Component } from 'react';
import style from './section.css';

class Section extends Component {
    render() {
        return (
            <div className={[style.section, this.props.className].join(' ')} ref={this.props.domRef}>
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
    name: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
    domRef: React.PropTypes.func,
    anchorRef: React.PropTypes.func,
    className: React.PropTypes.string
};

export default Section;
