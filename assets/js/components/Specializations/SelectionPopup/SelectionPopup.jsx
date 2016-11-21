'use strict';

import React from 'react';
import style from './selectionPopup.css';
import { SpecializationIcon } from './index';

class SelectionPopup extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleOnIconClick = this.handleOnIconClick.bind(this);
    }

    handleOnIconClick(id) {
        if (this.props.onSpecializationChange) {
            this.props.onSpecializationChange(id);
            if (this.props.onWantsClose) {
                // There is a small bug that causes the specialization to not update when the popup isn't closed.
                // Now we want to close it after selecting a specialization anyway, so it doesn't matter much.
                // But in case we ever want to change that, keep this in mind.
                this.props.onWantsClose();
            }
        }
    }

    renderSpecializations(specializations) {
        return specializations.map(spec =>
            <SpecializationIcon
                key={spec.id}
                icon={spec.icon}
                id={spec.id}
                isSelected={this.props.activeSpecializations.includes(spec.id)}
                name={spec.name}
                onClick={this.handleOnIconClick}/>
        );
    }

    render() {
        return (
            <div className={style.selectionPopup}>
                <div className={style.selectionPopupLeft} onClick={this.props.onWantsClose}/>
                <div className={style.selectionPopupInner}>
                    <div className={style.selectionPopupTitle}>
                        {/* TODO: i18n */!this.props.isElite ? 'Core Specializations' : 'Core and Elite Specializations'}
                    </div>
                    <div className={style.specializationIcons}>
                        <div>{this.renderSpecializations(this.props.availableCoreSpecializations)}</div>
                        {this.props.isElite ?
                            <div>{this.renderSpecializations(this.props.availableEliteSpecializations)}</div> :
                            null
                        }
                    </div>
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
    activeSpecializations: React.PropTypes.arrayOf(React.PropTypes.number),
    availableCoreSpecializations: React.PropTypes.arrayOf(React.PropTypes.object),
    availableEliteSpecializations: React.PropTypes.arrayOf(React.PropTypes.object),
    isElite: React.PropTypes.bool,
    onSpecializationChange: React.PropTypes.func,
    onWantsClose: React.PropTypes.func
};

export default SelectionPopup;
