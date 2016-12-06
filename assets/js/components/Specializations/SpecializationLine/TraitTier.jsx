'use strict';

import React from 'react';
import TraitTooltip from '../../../containers/traitTooltip';
import style from './traitTier.css';
import { TraitConnection, TraitMajorIcon, TraitMinorIcon } from './index';

const lineTranslate = ['up', 'mid', 'down'];

class TraitTier extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    getIcon(id) {
        if (id && this.props.traits && this.props.traits[id]) {
            return this.props.traits[id].icon;
        }
    }

    getMinorIcon() {
        return this.getIcon(this.props.minorTraitId);
    }

    getMajorIcon(index) {
        if (this.props.majorTraitIds) {
            return this.getIcon(this.props.majorTraitIds[index]);
        }
    }

    handleClick(e) {
        if (this.props.onBackgroundClick && e.currentTarget === e.target) {
            this.props.onBackgroundClick();
        }
    }

    render() {
        let line;
        if (this.props.majorTraitIds && this.props.selectedMajorTraitId) {
            line = lineTranslate[this.props.majorTraitIds.indexOf(this.props.selectedMajorTraitId)];
        }

        const minorTrait = this.props.traits && this.props.traits[this.props.minorTraitId];
        const majorTraits = this.props.traits ? this.props.majorTraitIds.map(id => this.props.traits[id]) : [null, null, null];

        return (
            <div className={style.traitTier} onClick={this.handleClick}>
                {this.props.traitTier === 1 ? (this.props.minorTraitId ? <TraitConnection from="start" to="mid"/> : <TraitConnection/>) : null}
                <TraitTooltip trait={minorTrait}>
                    <TraitMinorIcon imageUrl={this.getMinorIcon()}/>
                </TraitTooltip>
                <TraitConnection from="mid" to={line}/>
                <div className={style.majorIcons}>
                    <TraitTooltip trait={majorTraits[0]}>
                        <TraitMajorIcon
                            imageUrl={this.getMajorIcon(0)}
                            traitId={this.props.majorTraitIds ? this.props.majorTraitIds[0] : null}
                            isSelected={this.props.majorTraitIds && this.props.majorTraitIds[0] === this.props.selectedMajorTraitId}
                            onSelected={this.props.onTraitChange}/>
                    </TraitTooltip>
                    <TraitTooltip trait={majorTraits[1]}>
                        <TraitMajorIcon
                            imageUrl={this.getMajorIcon(1)}
                            traitId={this.props.majorTraitIds ? this.props.majorTraitIds[1] : null}
                            isSelected={this.props.majorTraitIds && this.props.majorTraitIds[1] === this.props.selectedMajorTraitId}
                            onSelected={this.props.onTraitChange}/>
                    </TraitTooltip>
                    <TraitTooltip trait={majorTraits[2]}>
                        <TraitMajorIcon
                            imageUrl={this.getMajorIcon(2)}
                            traitId={this.props.majorTraitIds ? this.props.majorTraitIds[2] : null}
                            isSelected={this.props.majorTraitIds && this.props.majorTraitIds[2] === this.props.selectedMajorTraitId}
                            onSelected={this.props.onTraitChange}/>
                    </TraitTooltip>
                </div>
                {this.props.traitTier !== 3 ? <TraitConnection from={line} to="mid"/> : null}
            </div>
        );
    }
}

TraitTier.propTypes = {
    specializationLine: React.PropTypes.number,
    traitTier: React.PropTypes.number,

    // Events
    onBackgroundClick: React.PropTypes.func,
    onTraitChange: React.PropTypes.func,

    // Redux states
    majorTraitIds: React.PropTypes.arrayOf(React.PropTypes.number),
    minorTraitId: React.PropTypes.number,
    selectedMajorTraitId: React.PropTypes.number,
    traits: React.PropTypes.object
};

export default TraitTier;
