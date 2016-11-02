'use strict';

import React from 'react';
import style from './line.css';
import { TraitGroup } from './index';

class Line extends React.Component {
    constructor() {
        super();
        this.state = {
            adept: null,
            master: null,
            grandmaster: null
        };
        this.handleOnTraitChange = this.handleOnTraitChange.bind(this);
    }

    handleOnTraitChange(type, trait) {
        this.setState({
            [type]: trait
        });
    }

    render() {
        return (
            <div className={style.line}>
                <div className={style.background}>
                    <div className={style.backgroundEmpty}/>
                    <div className={style.backgroundImage} style={{ backgroundImage: 'url(https://render.guildwars2.com/file/9D9F0DA395FDB21423981FAC2CABC850CF7E0A62/1012053.png)' }}/>
                    <div className={style.backgroundHover}/>
                    <div className={style.backgroundOverlay}/>
                    { this.props.isElite ? <div className={style.backgroundEliteOverlay}/> : null}
                    <svg className={style.backgroundIcon}>
                        <defs>
                            <polygon id="specializationIconPath" points="165,161 119,134 73,160 73,214 119,240 165,214"/>
                            <clipPath id="specializationIconClip">
                                <use xlinkHref="#specializationIconPath"/>
                            </clipPath>
                        </defs>
                        <g transform="translate(0,-120)">
                            <use xlinkHref="#specializationIconPath" stroke="black" strokeWidth="4"/>
                            <use xlinkHref="#specializationIconPath" stroke="white" strokeWidth="2"/>
                            <image xlinkHref="https://render.guildwars2.com/file/9D9F0DA395FDB21423981FAC2CABC850CF7E0A62/1012053.png" width="1024" height="256" clipPath="url(#specializationIconClip)"/>
                        </g>
                    </svg>
                </div>
                <div className={style.arrow}>
                    <svg width="7" height="12">
                        <polygon points="0,0 7,6 0,12"/>
                    </svg>
                </div>
                <TraitGroup type="adept" selected={this.state.adept} onChange={this.handleOnTraitChange}/>
                <TraitGroup type="master" selected={this.state.master} onChange={this.handleOnTraitChange}/>
                <TraitGroup type="grandmaster" selected={this.state.grandmaster} onChange={this.handleOnTraitChange}/>
            </div>
        );
    }
}

Line.propTypes = {
    isElite: React.PropTypes.bool
};

export default Line;
