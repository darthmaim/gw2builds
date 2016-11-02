"use strict";

import React from 'react';
import style from './traitIcon.css';

export default (props) => (
    <svg className={props.isSelected ? style.majorIconSelected : style.majorIcon} onClick={props.onClick}>
        <defs>
            <mask id="majorTraitMask">
                <image xlinkHref="../img/trait-major-mask.png" width="64" height="64"/>
            </mask>
        </defs>
        <image xlinkHref={props.imageUrl} mask="url(#majorTraitMask)" width="64" height="64" transform="scale(0.65)"/>
    </svg>
);
