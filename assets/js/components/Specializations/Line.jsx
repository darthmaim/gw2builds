import React from 'react';
import { TraitGroup } from './index';
import style from './line.css';

class Line extends React.Component {
    constructor() {
        super();
        this.state = {
            adept: null,
            master: null,
            grandmaster: null
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(type, trait) {
        this.setState({
            [type]: trait
        });
    }

    render() {
        return (
            <div className={style.line}>
                <svg className={style.background}>
                    <defs>
                        <polygon id="icon" points="161,165 119,141 77,165 77,213 119,237 161,213"/>
                        <clipPath id="clip">
                            <use xlinkHref="#icon"/>
                        </clipPath>
                        <image id="image" xlinkHref="https://render.guildwars2.com/file/9D9F0DA395FDB21423981FAC2CABC850CF7E0A62/1012053.png" width="1024" height="256"/>
                    </defs>
                    <rect width="645" height="134" fill="black"/>
                    <use className={style.backgroundImage} xlinkHref="#image" opacity="0.5" transform="translate(0,-120)"/>
                    <use xlinkHref="#icon" stroke="black" strokeWidth="4" transform="translate(0,-120)"/>
                    <use xlinkHref="#icon" stroke="white" strokeWidth="2" transform="translate(0,-120)"/>
                    <use xlinkHref="#image" clipPath="url(#clip)" transform="translate(0,-120)"/>
                </svg>
                <div className={style.arrow}>
                    <svg width="7" height="12">
                        <polygon points="0,0 7,6 0,12"/>
                    </svg>
                </div>
                <TraitGroup type="adept" selected={this.state.adept} onChange={this.onChange}/>
                <TraitGroup type="master" selected={this.state.master} onChange={this.onChange}/>
                <TraitGroup type="grandmaster" selected={this.state.grandmaster} onChange={this.onChange}/>
            </div>
        );
    }
}

export default Line;
