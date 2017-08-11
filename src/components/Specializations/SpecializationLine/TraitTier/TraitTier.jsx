import PropTypes from 'prop-types';
import React from 'react';
import TraitTooltip from '~/components/Tooltips/Traits/TooltipContainer';
import TraitConnection from '../TraitConnection';
import TraitMajorIcon from '../TraitMajorIcon';
import TraitMinorIcon from '../TraitMinorIcon';
import style from './traitTier.css';

const lineTranslate = ['up', 'mid', 'down'];

class TraitTier extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    getIcon(id) {
        if (id && this.props.availableTraitObjects && this.props.availableTraitObjects[id]) {
            return this.props.availableTraitObjects[id].icon;
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

        const minorTrait = this.props.availableTraitObjects && this.props.availableTraitObjects[this.props.minorTraitId];
        const majorTraits = this.props.availableTraitObjects ? this.props.majorTraitIds.map(id => this.props.availableTraitObjects[id]) : [null, null, null];

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
    traitTier: PropTypes.number,

    // Events
    onBackgroundClick: PropTypes.func,
    onTraitChange: PropTypes.func,

    // Redux states
    availableTraitObjects: PropTypes.object,
    majorTraitIds: PropTypes.arrayOf(PropTypes.number),
    minorTraitId: PropTypes.number,
    selectedMajorTraitId: PropTypes.number,
};

export default TraitTier;
