import PropTypes from 'prop-types';
import React from 'react';
import style from './traitMinorIcon.module.css';
import mask from './trait-minor-mask.png';

const TraitMinorIcon = props => (
    <svg className={props.classes ? props.classes : style.minorIcon}>
        <defs>
            <mask id="minorTraitMask">
                <image xlinkHref={mask} width="64" height="64"/>
            </mask>
        </defs>
        <image xlinkHref={props.imageUrl} mask="url(#minorTraitMask)" width="64" height="64" transform="scale(0.65)"/>
    </svg>
);

TraitMinorIcon.propTypes = {
    classes: PropTypes.string,
    imageUrl: PropTypes.string
};

export default TraitMinorIcon;
