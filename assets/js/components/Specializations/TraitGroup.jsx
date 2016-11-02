"use strict";

import React from 'react';
import { TraitConnection, TraitMajorIcon, TraitMinorIcon } from './index';
import style from './trait.css';

const lineTranslate = ["up", "mid", "down"];

class TraitGroup extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(trait) {
        if (this.props.onChange) this.props.onChange(this.props.type, trait);
    }

    render() {
        const line = lineTranslate[this.props.selected - 1];
        return (
            <div className={style[this.props.type]}>
                {this.props.type == "adept" ? <TraitConnection from="start" to="mid"/> : null}
                <TraitMinorIcon imageUrl="https://render.guildwars2.com/file/ADBABE00177C2A79CA7725F2217D2165CB086239/1012507.png"/>
                <TraitConnection from="mid" to={line}/>
                <div className={style.majorIcons}>
                    <TraitMajorIcon imageUrl="https://render.guildwars2.com/file/705378A42A30BE9912BE7D0910057C00CD1CDDF2/1012498.png" isSelected={this.props.selected == 1} onClick={() => this.onChange(1)}/>
                    <TraitMajorIcon imageUrl="https://render.guildwars2.com/file/705378A42A30BE9912BE7D0910057C00CD1CDDF2/1012498.png" isSelected={this.props.selected == 2} onClick={() => this.onChange(2)}/>
                    <TraitMajorIcon imageUrl="https://render.guildwars2.com/file/705378A42A30BE9912BE7D0910057C00CD1CDDF2/1012498.png" isSelected={this.props.selected == 3} onClick={() => this.onChange(3)}/>
                </div>
                {this.props.type != "grandmaster" ? <TraitConnection from={line} to="mid"/> : null}
            </div>
        );
    }
}

export default TraitGroup;
