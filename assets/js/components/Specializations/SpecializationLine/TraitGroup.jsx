'use strict';

import React from 'react';
import style from './traitGroup.css';
import { TraitConnection, TraitMajorIcon, TraitMinorIcon } from './index';
import TraitTooltip from '../../../containers/traitTooltip';

const lineTranslate = ['up', 'mid', 'down'];

class TraitGroup extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleTraitChange = this.handleTraitChange.bind(this);
    }

    getIcon(id) {
        if (id && this.props.availableTraits && this.props.availableTraits[id]) {
            return this.props.availableTraits[id].icon;
        }
    }

    getMinorIcon() {
        return this.getIcon(this.props.minorTrait);
    }

    getMajorIcon(index) {
        if (this.props.majorTraits) {
            return this.getIcon(this.props.majorTraits[index]);
        }
    }

    handleTraitChange(traitId) {
        if (this.props.onChange) {
            this.props.onChange(this.props.tier, traitId);
        }
    }

    handleClick(e) {
        if (this.props.onBackgroundClick && e.currentTarget === e.target) {
            this.props.onBackgroundClick();
        }
    }

    render() {
        let line;
        if (this.props.majorTraits && this.props.selectedMajorTrait) {
            line = lineTranslate[this.props.majorTraits.indexOf(this.props.selectedMajorTrait)];
        }

        const minorTrait = this.props.availableTraits && this.props.availableTraits[this.props.minorTrait];
        const majorTraits = this.props.availableTraits ? this.props.majorTraits.map(t => this.props.availableTraits[t]) : [null, null, null];

        return (
            <div className={style.traitGroup} onClick={this.handleClick}>
                {this.props.tier === 1 ? <TraitConnection from="start" to="mid"/> : null}
                <TraitTooltip trait={minorTrait}>
                    <TraitMinorIcon imageUrl={this.getMinorIcon()}/>
                </TraitTooltip>
                <TraitConnection from="mid" to={line}/>
                <div className={style.majorIcons}>
                    <TraitTooltip trait={majorTraits[0]}>
                        <TraitMajorIcon
                            imageUrl={this.getMajorIcon(0)}
                            traitId={this.props.majorTraits ? this.props.majorTraits[0] : null}
                            isSelected={this.props.majorTraits && this.props.majorTraits[0] === this.props.selectedMajorTrait}
                            onSelected={this.handleTraitChange}/>
                    </TraitTooltip>
                    <TraitTooltip trait={majorTraits[1]}>
                        <TraitMajorIcon
                            imageUrl={this.getMajorIcon(1)}
                            traitId={this.props.majorTraits ? this.props.majorTraits[1] : null}
                            isSelected={this.props.majorTraits && this.props.majorTraits[1] === this.props.selectedMajorTrait}
                            onSelected={this.handleTraitChange}/>
                    </TraitTooltip>
                    <TraitTooltip trait={majorTraits[2]}>
                        <TraitMajorIcon
                            imageUrl={this.getMajorIcon(2)}
                            traitId={this.props.majorTraits ? this.props.majorTraits[2] : null}
                            isSelected={this.props.majorTraits && this.props.majorTraits[2] === this.props.selectedMajorTrait}
                            onSelected={this.handleTraitChange}/>
                    </TraitTooltip>
                </div>
                {this.props.tier !== 3 ? <TraitConnection from={line} to="mid"/> : null}
            </div>
        );
    }
}

TraitGroup.propTypes = {
    availableTraits: React.PropTypes.object,
    minorTrait: React.PropTypes.number,
    majorTraits: React.PropTypes.arrayOf(React.PropTypes.number),
    onBackgroundClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    selectedMajorTrait: React.PropTypes.number,
    tier: React.PropTypes.number
};

export default TraitGroup;
