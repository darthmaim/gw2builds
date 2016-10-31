"use strict";

import React from "react";

export class TraitsPanelHeader extends React.Component {
    render() {
        return <div>Traits</div>;
    }
}

export class TraitsPanel extends React.Component {
    render() {
        return (
            <div className="specializations">
                <SpecializationLine/>
                <SpecializationLine/>
                <SpecializationLine/>
            </div>
        );
    }
}

class SpecializationLine extends React.Component {
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
            <div className="specialization-line">
                <svg className="specialization-background">
                    <defs>
                        <polygon id="icon" points="161,165 119,141 77,165 77,213 119,237 161,213"/>
                        <clipPath id="clip">
                            <use xlinkHref="#icon"/>
                        </clipPath>
                        <image id="image" xlinkHref="https://render.guildwars2.com/file/9D9F0DA395FDB21423981FAC2CABC850CF7E0A62/1012053.png" width="1024" height="256"/>
                    </defs>
                    <rect width="645" height="134" fill="black"/>
                    <use id="background" xlinkHref="#image" opacity="0.5" transform="translate(0,-120)"/>
                    <use xlinkHref="#icon" stroke="black" strokeWidth="4" transform="translate(0,-120)"/>
                    <use xlinkHref="#icon" stroke="white" strokeWidth="2" transform="translate(0,-120)"/>
                    <use xlinkHref="#image" clipPath="url(#clip)" transform="translate(0,-120)"/>
                </svg>
                <div className="specialization-arrow">
                    <svg className="specialization-arrow-icon" width="7" height="12">
                        <polygon points="0,0 7,6 0,12"/>
                    </svg>
                </div>
                <SpecializationLineTraitGroup type="adept" selected={this.state.adept} onChange={this.onChange}/>
                <SpecializationLineTraitGroup type="master" selected={this.state.master} onChange={this.onChange}/>
                <SpecializationLineTraitGroup type="grandmaster" selected={this.state.grandmaster} onChange={this.onChange}/>
            </div>
        );
    }
}

class SpecializationLineTraitGroup extends React.Component {
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
            <div className={`specialization-traits-block specialization-traits-${this.props.type}`}>
                {this.props.type == "adept" ? <SpecializationLineTraitLine from="mid" to="mid"/> : ""}
                <svg className="specialization-traits-minor-icon">
                    <defs>
                        <clipPath id="clip">
                            <polygon points="56,18 32,4 8,18 8,46 32,60 56,46"/>
                        </clipPath>
                    </defs>
                    <image xlinkHref="https://render.guildwars2.com/file/5A9347250FEF7B3431ECE3F6689EDCE20FB96CB6/1012483.png" clipPath="url(#clip)" width="64" height="64" transform="scale(0.65)"/>
                </svg>
                <SpecializationLineTraitLine from="mid" to={line}/>
                <div className="specialization-traits-major">
                    <div className={`specialization-traits-major-icon specialization-traits-major-icon-up ${this.props.selected == 1 ? "selected" : ""}`} onClick={() => this.onChange(1)}/>
                    <div className={`specialization-traits-major-icon specialization-traits-major-icon-mid ${this.props.selected == 2 ? "selected" : ""}`} onClick={() => this.onChange(2)}/>
                    <div className={`specialization-traits-major-icon specialization-traits-major-icon-down ${this.props.selected == 3 ? "selected" : ""}`} onClick={() => this.onChange(3)}/>
                </div>
                {this.props.type != "grandmaster" ? <SpecializationLineTraitLine from={line} to="mid"/> : ""}
            </div>
        );
    }
}

class SpecializationLineTraitLine extends React.Component {
    render() {
        if (this.props.from && this.props.to) {
            return <div className={`specialization-traits-line ${this.props.from}-${this.props.to}`}/>
        }
        return <div className="specialization-traits-line"/>
    }
}

export default {
    TraitsPanelHeader,
    TraitsPanel
};
