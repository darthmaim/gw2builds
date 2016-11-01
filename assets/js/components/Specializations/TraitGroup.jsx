import React from 'react';
import { TraitLine } from './index';
import style from './trait.css';

class TraitGroup extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    onChange(trait) {
        if (this.props.onChange) this.props.onChange(this.props.type, trait);
    }

    render() {
        let line;
        switch(this.props.selected) {
            case 1:
                line = "up";
                break;
            case 2:
                line = "mid";
                break;
            case 3:
                line = "down";
                break;
        }

        return (
            <div className={style[this.props.type]}>
                {this.props.type == "adept" ? <TraitLine from="mid" to="mid"/> : ""}
                <svg className={style.minorIcon}>
                    <defs>
                        <clipPath id="clip">
                            <polygon points="56,18 32,4 8,18 8,46 32,60 56,46"/>
                        </clipPath>
                    </defs>
                    <image xlinkHref="https://render.guildwars2.com/file/5A9347250FEF7B3431ECE3F6689EDCE20FB96CB6/1012483.png" clipPath="url(#clip)" width="64" height="64" transform="scale(0.65)"/>
                </svg>
                <TraitLine from="mid" to={line}/>
                <div className={style.major}>
                    <div className={this.props.selected == 1 ? style.majorIconSelected : style.majorIcon} onClick={() => this.onChange(1)}/>
                    <div className={this.props.selected == 2 ? style.majorIconSelected : style.majorIcon} onClick={() => this.onChange(2)}/>
                    <div className={this.props.selected == 3 ? style.majorIconSelected : style.majorIcon} onClick={() => this.onChange(3)}/>
                </div>
                {this.props.type != "grandmaster" ? <TraitLine from={line} to="mid"/> : ""}
            </div>
        );
    }
}

export default TraitGroup;
