'use strict';

import React from 'react';
import style from './selectionPopup.css';

class SelectionPopup extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className={style.selectionPopup}>
                <div className={style.selectionPopupLeft} onClick={this.props.onWantsClose}/>
                <div className={style.selectionPopupInner}>
                    Some core {this.props.isElite ? 'and elite' : null } specializations here
                </div>
                <svg className={style.selectionPopupBorderTop} onClick={this.props.onWantsClose}>
                    <polygon points="0,36 15,36 15,0 14,0 13,34 0,35"/>
                </svg>
                <svg className={style.selectionPopupBorderBottom} onClick={this.props.onWantsClose}>
                    <polygon points="0,0 15,0 15,36 14,36 13,2 0,1"/>
                </svg>
            </div>
        );
    }
}

SelectionPopup.propTypes = {
    isElite: React.PropTypes.bool,
    onWantsClose: React.PropTypes.func
};

export default SelectionPopup;
