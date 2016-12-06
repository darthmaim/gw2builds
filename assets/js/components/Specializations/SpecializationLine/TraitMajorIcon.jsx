'use strict';

import React from 'react';
import style from './traitMajorIcon.css';

class TraitMajorIcon extends React.Component {
    constructor() {
        super();
        this.handleSelected = this.handleSelected.bind(this);
    }

    handleSelected() {
        if (this.props.onSelected) {
            this.props.onSelected(this.props.traitId);
        }
    }

    render() {
        return (
            <svg
                className={this.props.isSelected ? style.majorIconSelected : style.majorIcon}
                onClick={this.handleSelected}>
                <defs>
                    <mask id="majorTraitMask">
                        <image xlinkHref="../img/trait-major-mask.png" width="64" height="64"/>
                    </mask>
                </defs>
                <image
                    xlinkHref={this.props.imageUrl}
                    mask="url(#majorTraitMask)"
                    width="64"
                    height="64"
                    transform="scale(0.65)"/>
            </svg>
        );
    }
}

TraitMajorIcon.propTypes = {
    imageUrl: React.PropTypes.string,
    isSelected: React.PropTypes.bool,
    traitId: React.PropTypes.number,

    // Events
    onSelected: React.PropTypes.func
};

export default TraitMajorIcon;
