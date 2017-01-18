import React from 'react';
import style from './selectionPopup.css';
import { SpecializationIcon } from './index';

class SelectionPopup extends React.Component {
    constructor() {
        super();
        this.handleOnIconClick = this.handleOnIconClick.bind(this);
    }

    handleOnIconClick(id) {
        if (this.props.onSpecializationChange) {
            this.props.onSpecializationChange(id, this.props.activeSpecializationIds, this.props.specializations);
            if (this.props.onWantsClose) {
                // There is a small bug that causes the specialization to not update when the popup isn't closed.
                // Now we want to close it after selecting a specialization anyway, so it doesn't matter much.
                // But in case we ever want to change that, keep this in mind.
                this.props.onWantsClose();
            }
        }
    }

    renderSpecializations(ids) {
        if (ids) {
            return ids.map(id => {
                const specialization = this.props.specializations[id];
                return (
                    <SpecializationIcon
                        key={id}
                        icon={specialization.icon}
                        id={id}
                        isSelected={this.props.activeSpecializationIds.indexOf(id) > -1}
                        name={specialization.name}
                        onClick={this.handleOnIconClick}/>
                );
            });
        }
    }

    render() {
        return (
            <div className={style.selectionPopup}>
                <div className={style.selectionPopupLeft} onClick={this.props.onWantsClose}/>
                <div className={style.selectionPopupInner}>
                    <div className={style.selectionPopupTitle}>
                        {/* TODO: i18n */!this.props.supportsElite ? 'Core Specializations' : 'Core and Elite Specializations'}
                    </div>
                    <div className={style.specializationIcons}>
                        <div>{this.renderSpecializations(this.props.availableCoreSpecializationIds)}</div>
                        {this.props.supportsElite ?
                            <div>{this.renderSpecializations(this.props.availableEliteSpecializationIds)}</div> :
                            null
                        }
                        <div>{this.renderSpecializations()}</div>
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
    supportsElite: React.PropTypes.bool,

    // Events
    onSpecializationChange: React.PropTypes.func,
    onWantsClose: React.PropTypes.func,

    // Redux states
    activeSpecializationIds: React.PropTypes.arrayOf(React.PropTypes.number),
    availableCoreSpecializationIds: React.PropTypes.arrayOf(React.PropTypes.number),
    availableEliteSpecializationIds: React.PropTypes.arrayOf(React.PropTypes.number),
    specializations: React.PropTypes.object
};

export default SelectionPopup;
