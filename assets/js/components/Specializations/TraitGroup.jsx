'use strict';

import React from 'react';
import style from './trait.css';
import { TraitConnection, TraitMajorIcon, TraitMinorIcon } from './index';

const lineTranslate = ['up', 'mid', 'down'];

class TraitGroup extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleTraitChange = this.handleTraitChange.bind(this);
    }

    handleTraitChange(traitId) {
        if (this.props.onChange) {
            this.props.onChange(this.props.type, traitId);
        }
    }

    handleClick(e) {
        if (this.props.onBackgroundClick && e.currentTarget === e.target) {
            this.props.onBackgroundClick();
        }
    }

    render() {
        const line = lineTranslate[this.props.selected - 1];
        return (
            <div className={style[this.props.type]} onClick={this.handleClick}>
                {this.props.type === 'adept' ? <TraitConnection from="start" to="mid"/> : null}
                <TraitMinorIcon
                    imageUrl="https://render.guildwars2.com/file/ADBABE00177C2A79CA7725F2217D2165CB086239/1012507.png"/>
                <TraitConnection from="mid" to={line}/>
                <div className={style.majorIcons}>
                    <TraitMajorIcon
                        imageUrl="https://render.guildwars2.com/file/705378A42A30BE9912BE7D0910057C00CD1CDDF2/1012498.png"
                        traitId={1} isSelected={this.props.selected === 1} onSelected={this.handleTraitChange}/>
                    <TraitMajorIcon
                        imageUrl="https://render.guildwars2.com/file/705378A42A30BE9912BE7D0910057C00CD1CDDF2/1012498.png"
                        traitId={2} isSelected={this.props.selected === 2} onSelected={this.handleTraitChange}/>
                    <TraitMajorIcon
                        imageUrl="https://render.guildwars2.com/file/705378A42A30BE9912BE7D0910057C00CD1CDDF2/1012498.png"
                        traitId={3} isSelected={this.props.selected === 3} onSelected={this.handleTraitChange}/>
                </div>
                {this.props.type !== 'grandmaster' ? <TraitConnection from={line} to="mid"/> : null}
            </div>
        );
    }
}

TraitGroup.propTypes = {
    onBackgroundClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    selected: React.PropTypes.number,
    type: React.PropTypes.string
};

export default TraitGroup;
