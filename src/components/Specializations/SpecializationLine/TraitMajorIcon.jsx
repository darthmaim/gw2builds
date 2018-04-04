import PropTypes from 'prop-types';
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
            <div onClick={this.handleSelected}>
                <svg className={this.props.isSelected ? style.majorIconSelected : style.majorIcon}>
                    <defs>
                        <mask id="majorTraitMask">
                            <image xlinkHref="../img/specializations/trait-major-mask.png" width="64" height="64"/>
                        </mask>
                    </defs>
                    <image
                        xlinkHref={this.props.imageUrl}
                        mask="url(#majorTraitMask)"
                        width="64"
                        height="64"
                        transform="scale(0.65)"/>
                </svg>
            </div>
        );
    }
}

TraitMajorIcon.propTypes = {
    imageUrl: PropTypes.string,
    isSelected: PropTypes.bool,
    traitId: PropTypes.number,

    // Events
    onSelected: PropTypes.func
};

export default TraitMajorIcon;
