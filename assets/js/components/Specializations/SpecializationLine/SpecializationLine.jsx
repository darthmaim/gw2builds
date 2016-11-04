'use strict';

import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { SelectionPopup } from '../SelectionPopup';
import style from './specializationLine.css';
import { TraitGroup } from './index';

class Line extends React.Component {
    constructor() {
        super();
        this.state = {
            adept: null,
            master: null,
            grandmaster: null,
            isSelectionPopupOpen: false
        };
        this.handleCloseSelectionPopup = this.handleCloseSelectionPopup.bind(this);
        this.handleSpecializationChange = this.handleSpecializationChange.bind(this);
        this.handleToggleSelectionPopup = this.handleToggleSelectionPopup.bind(this);
        this.handleTraitChange = this.handleTraitChange.bind(this);
    }

    getSpecializationBackgroundImage() {
        if (this.props.activeSpecializations.length > this.props.id) {
            const specId = this.props.activeSpecializations[this.props.id];
            const spec = this.props.availableCoreSpecializations.concat(this.props.availableEliteSpecializations).find(s => s.id === specId);
            if (spec) {
                return spec.background;
            }
        }
        return '';
    }

    handleClickOutside() {
        this.handleCloseSelectionPopup();
    }

    handleCloseSelectionPopup() {
        this.setState({
            isSelectionPopupOpen: false
        });
    }

    handleSpecializationChange(id) {
        if (this.props.onSpecializationChange) {
            this.props.onSpecializationChange(this.props.id, id);
        }
    }

    handleTraitChange(type, trait) {
        this.setState({
            [type]: trait
        });
    }

    handleToggleSelectionPopup() {
        this.setState({
            isSelectionPopupOpen: !this.state.isSelectionPopupOpen
        });
    }

    render() {
        return (
            <div className={style.line}>
                <div className={style.background}>
                    <div className={style.backgroundEmpty}/>
                    <div
                        className={style.backgroundImage}
                        style={{ backgroundImage: `url(${this.getSpecializationBackgroundImage()})` }}/>
                    <div className={style.backgroundHover}/>
                    <div className={style.backgroundOverlay} onClick={this.handleToggleSelectionPopup}/>
                    { this.props.isElite ?
                        <div className={style.backgroundEliteOverlay} onClick={this.handleToggleSelectionPopup}/> :
                        null
                    }
                    <svg className={style.backgroundIcon} onClick={this.handleToggleSelectionPopup}>
                        <defs>
                            <polygon
                                id="specializationIconPath"
                                points="165,161 119,134 73,160 73,214 119,240 165,214"/>
                            <clipPath id="specializationIconClip">
                                <use xlinkHref="#specializationIconPath"/>
                            </clipPath>
                        </defs>
                        <g transform="translate(0,-120)">
                            <use xlinkHref="#specializationIconPath" stroke="black" strokeWidth="4"/>
                            <use xlinkHref="#specializationIconPath" stroke="white" strokeWidth="2"/>
                            <image
                                xlinkHref={this.getSpecializationBackgroundImage()}
                                width="1024" height="256" clipPath="url(#specializationIconClip)"/>
                        </g>
                    </svg>
                </div>
                <div className={style.arrow} onClick={this.handleToggleSelectionPopup}>
                    <svg width="7" height="12">
                        <polygon points="0,0 7,6 0,12"/>
                    </svg>
                </div>
                { this.state.isSelectionPopupOpen ?
                    <SelectionPopup
                        {...this.props}
                        onSpecializationChange={this.handleSpecializationChange}
                        onWantsClose={this.handleCloseSelectionPopup}/> :
                    null
                }
                <TraitGroup
                    type="adept"
                    selected={this.state.adept}
                    onBackgroundClick={this.handleToggleSelectionPopup}
                    onChange={this.handleTraitChange}/>
                <TraitGroup
                    type="master"
                    selected={this.state.master}
                    onBackgroundClick={this.handleToggleSelectionPopup}
                    onChange={this.handleTraitChange}/>
                <TraitGroup
                    type="grandmaster"
                    selected={this.state.grandmaster}
                    onBackgroundClick={this.handleToggleSelectionPopup}
                    onChange={this.handleTraitChange}/>
            </div>
        );
    }
}

Line.propTypes = {
    activeSpecializations: React.PropTypes.arrayOf(React.PropTypes.number),
    availableCoreSpecializations: React.PropTypes.arrayOf(React.PropTypes.object),
    availableEliteSpecializations: React.PropTypes.arrayOf(React.PropTypes.object),
    id: React.PropTypes.number,
    isElite: React.PropTypes.bool,
    onSpecializationChange: React.PropTypes.func
};

export default onClickOutside(Line);
