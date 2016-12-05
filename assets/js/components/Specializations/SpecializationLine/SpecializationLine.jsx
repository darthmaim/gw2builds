'use strict';

import _ from 'lodash';
import React from 'react';
import onClickOutside from 'react-onclickoutside';
import fp from 'lodash/fp';
import { SelectionPopup } from '../SelectionPopup';
import style from './specializationLine.css';
import { TraitGroup } from './index';

class SpecializationLine extends React.Component {
    constructor() {
        super();
        this.state = {
            tier1: null,
            tier2: null,
            tier3: null,
            isSelectionPopupOpen: false
        };
        this.handleCloseSelectionPopup = this.handleCloseSelectionPopup.bind(this);
        this.handleSpecializationChange = this.handleSpecializationChange.bind(this);
        this.handleToggleSelectionPopup = this.handleToggleSelectionPopup.bind(this);
        this.handleTraitChange = this.handleTraitChange.bind(this);
    }

    getSpecialization(id) {
        if (id) {
            return this.props.availableCoreSpecializations.concat(this.props.availableEliteSpecializations).find(s => s.id === id);
        }
    }

    getSpecializationBackgroundImage() {
        if (this.props.activeSpecializations && this.props.availableTraits) {
            const spec = this.getSpecialization(this.props.activeSpecializations[this.props.id]);
            if (spec) {
                return spec.background;
            }
        }
        return '';
    }

    getSpecializationTraits(tier) {
        if (this.props.activeSpecializations && this.props.availableTraits) {
            const spec = this.getSpecialization(this.props.activeSpecializations[this.props.id]);
            if (spec) {
                const traitIds = spec.minor_traits.filter(t => this.props.availableTraits[t].tier === tier)
                    .concat(spec.major_traits.filter(t => this.props.availableTraits[t].tier === tier));
                return fp.pickBy(t => traitIds.includes(t.id))(this.props.availableTraits);
            }
        }
    }

    getSpecializationMinorTrait(tier) {
        const traits = this.getSpecializationTraits(tier);
        if (traits) {
            return _.values(traits).find(t => t.slot.toLowerCase() === 'minor').id;
        }
    }

    getSpecializationMajorTraits(tier) {
        const traits = this.getSpecializationTraits(tier);
        if (traits) {
            return _.values(traits)
                .filter(t => t.slot.toLowerCase() === 'major')
                .sort((a, b) => a.order - b.order)
                .map(t => t.id);
        }
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
        this.setState({
            tier1: null,
            tier2: null,
            tier3: null
        });
        if (this.props.onSpecializationChange) {
            this.props.onSpecializationChange(this.props.id, id);
        }
    }

    handleTraitChange(tier, trait) {
        this.setState({
            [`tier${tier}`]: trait
        });
        if (this.props.onTraitChange) {
            this.props.onTraitChange(this.props.id, tier, trait);
        }
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
                    tier={1}
                    minorTrait={this.getSpecializationMinorTrait(1)}
                    majorTraits={this.getSpecializationMajorTraits(1)}
                    availableTraits={this.getSpecializationTraits(1)}
                    selectedMajorTrait={this.state.tier1}
                    onBackgroundClick={this.handleToggleSelectionPopup}
                    onChange={this.handleTraitChange}/>
                <TraitGroup
                    tier={2}
                    minorTrait={this.getSpecializationMinorTrait(2)}
                    majorTraits={this.getSpecializationMajorTraits(2)}
                    availableTraits={this.getSpecializationTraits(2)}
                    selectedMajorTrait={this.state.tier2}
                    onBackgroundClick={this.handleToggleSelectionPopup}
                    onChange={this.handleTraitChange}/>
                <TraitGroup
                    tier={3}
                    minorTrait={this.getSpecializationMinorTrait(3)}
                    majorTraits={this.getSpecializationMajorTraits(3)}
                    availableTraits={this.getSpecializationTraits(3)}
                    selectedMajorTrait={this.state.tier3}
                    onBackgroundClick={this.handleToggleSelectionPopup}
                    onChange={this.handleTraitChange}/>
            </div>
        );
    }
}

SpecializationLine.propTypes = {
    activeSpecializations: React.PropTypes.arrayOf(React.PropTypes.number),
    availableCoreSpecializations: React.PropTypes.arrayOf(React.PropTypes.object),
    availableEliteSpecializations: React.PropTypes.arrayOf(React.PropTypes.object),
    availableTraits: React.PropTypes.object,
    id: React.PropTypes.number,
    isElite: React.PropTypes.bool,
    onSpecializationChange: React.PropTypes.func,
    onTraitChange: React.PropTypes.func
};

export default onClickOutside(SpecializationLine);
