'use strict';

import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { SelectionPopupContainer as SelectionPopup } from '../SelectionPopup';
import style from './specializationLine.css';
import { TraitTierContainer as TraitTier } from './index';

class SpecializationLine extends React.Component {
    constructor() {
        super();
        this.state = {
            isSelectionPopupOpen: false
        };
        this.handleCloseSelectionPopup = this.handleCloseSelectionPopup.bind(this);
        this.handleToggleSelectionPopup = this.handleToggleSelectionPopup.bind(this);
    }

    getSpecializationBackgroundImage() {
        if (this.props.selectedSpecialization) {
            const spec = this.props.specializations[this.props.selectedSpecialization];
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
                    { this.props.supportsElite ?
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
                        onWantsClose={this.handleCloseSelectionPopup}
                        specializationLine={this.props.specializationLine}
                        supportsElite={this.props.supportsElite}/> :
                    null
                }
                <TraitTier
                    specializationLine={this.props.specializationLine}
                    traitTier={1}
                    onBackgroundClick={this.handleToggleSelectionPopup}/>
                <TraitTier
                    specializationLine={this.props.specializationLine}
                    traitTier={2}
                    onBackgroundClick={this.handleToggleSelectionPopup}/>
                <TraitTier
                    specializationLine={this.props.specializationLine}
                    traitTier={3}
                    onBackgroundClick={this.handleToggleSelectionPopup}/>
            </div>
        );
    }
}

SpecializationLine.propTypes = {
    supportsElite: React.PropTypes.bool,
    specializationLine: React.PropTypes.number,

    // Redux states
    selectedSpecialization: React.PropTypes.number,
    specializations: React.PropTypes.object
};

export default onClickOutside(SpecializationLine);
