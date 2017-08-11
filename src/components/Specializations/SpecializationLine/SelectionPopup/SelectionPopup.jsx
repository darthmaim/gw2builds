import PropTypes from 'prop-types';
import React from 'react';
import SpecializationIcon from './SpecializationIcon';
import style from './selectionPopup.css';

class SelectionPopup extends React.Component {
    constructor() {
        super();
        this.handleOnIconClick = this.handleOnIconClick.bind(this);
    }

    handleOnIconClick(id) {
        if (this.props.onSpecializationChange) {
            this.props.onSpecializationChange(id, this.props.selectedSpecializationIds, this.props.availableSpecializationObjects);
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
                const specialization = this.props.availableSpecializationObjects[id];
                return (
                    <SpecializationIcon
                        key={id}
                        icon={specialization.icon}
                        id={id}
                        isSelected={this.props.selectedSpecializationIds.indexOf(id) > -1}
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
    supportsElite: PropTypes.bool,

    // Events
    onSpecializationChange: PropTypes.func,
    onWantsClose: PropTypes.func,

    // Redux states
    selectedSpecializationIds: PropTypes.arrayOf(PropTypes.number),
    availableCoreSpecializationIds: PropTypes.arrayOf(PropTypes.number),
    availableEliteSpecializationIds: PropTypes.arrayOf(PropTypes.number),
    availableSpecializationObjects: PropTypes.object
};

export default SelectionPopup;
