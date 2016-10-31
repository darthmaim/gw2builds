"use strict";

import React from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import OverlayPanel from "../base/overlay-panel";
import { getEditorModeConfiguration } from "../../editor-modes";

class SettingsPanel extends React.Component {
    render() {
        return (
            <div className="settings-panel">
                <OverlayPanel
                    header={<SettingsPanelHeader {...this.props}/>}
                    panel={<SettingsPanelPanel onLanguageChange={this.props.onLanguageChange}
                                               onGameModeChange={this.props.onGameModeChange}
                                               onProfessionChange={this.props.onProfessionChange}
                                               onRaceChange={this.props.onRaceChange}
                                               {...this.props}
                    />}
                    onClose={this.onClose}
                />
            </div>
        );
    }
}

class SettingsPanelHeader extends React.Component {
    render() {
        return (
            <ul className="settings-header">
                {getEditorModeConfiguration("languagesEnabled") ? <li className={this.props.language ? `language-${this.props.language}` : ""}/> : ""}
                {getEditorModeConfiguration("gameModesEnabled") ? <li className={this.props.gameMode ? `gamemode-${this.props.gameMode}` : ""}/> : ""}
                {getEditorModeConfiguration("professionsEnabled") ? <li className={this.props.profession ? `profession-${this.props.profession}` : ""}/> : ""}
                {getEditorModeConfiguration("racesEnabled") ? <li className={this.props.race ? `race-${this.props.race}` : ""}/> : ""}
            </ul>
        );
    }
}

class SettingsPanelPanel extends React.Component {
    static get languages() {
        return [
            { option: "en", content: "English" },
            { option: "de", content: "Deutsch" },
            { option: "fr", content: "Français" },
            { option: "es", content: "Español" }
        ].filter(i => getEditorModeConfiguration("languages")[i.option]);
    }

    static get gameModes() {
        return [
            { option: "pve", content: <FormattedMessage {...tl.pve}/> },
            { option: "pvp", content: <FormattedMessage {...tl.pvp}/> },
            { option: "wvw", content: <FormattedMessage {...tl.wvw}/> }
        ].filter(i => getEditorModeConfiguration("gameModes")[i.option]);
    }

    static get professions() {
        return [
            { option: "guardian", content: <FormattedMessage {...tl.guardian}/> },
            { option: "revenant", content: <FormattedMessage {...tl.revenant}/>},
            { option: "warrior", content: <FormattedMessage {...tl.warrior}/> },
            { option: "engineer", content: <FormattedMessage {...tl.engineer}/> },
            { option: "ranger", content: <FormattedMessage {...tl.ranger}/> },
            { option: "thief", content: <FormattedMessage {...tl.thief}/> },
            { option: "elementalist", content: <FormattedMessage {...tl.elementalist}/> },
            { option: "mesmer", content: <FormattedMessage {...tl.mesmer}/> },
            { option: "necromancer", content: <FormattedMessage {...tl.necromancer}/> }
        ].filter(i => getEditorModeConfiguration("professions")[i.option]);
    }

    static get races() {
        return [
            { option: "none", content: <FormattedMessage {...tl.noRace}/> },
            { option: "asura", content: <FormattedMessage {...tl.asura}/> },
            { option: "charr", content: <FormattedMessage {...tl.charr}/> },
            { option: "human", content: <FormattedMessage {...tl.human}/> },
            { option: "norn", content: <FormattedMessage {...tl.norn}/> },
            { option: "sylvari", content: <FormattedMessage {...tl.sylvari}/> }
        ].filter(i => getEditorModeConfiguration("races")[i.option]);
    }

    isSelected(group, option) {
        return this.props[group] == option;
    }

    render() {
        return (
            <div className="columns">
                {getEditorModeConfiguration("languagesEnabled") ? this.renderColumn("language", this.props.onLanguageChange, "Language", this.constructor.languages) : <ul/>}
                {getEditorModeConfiguration("gameModesEnabled") ? this.renderColumn("gameMode", this.props.onGameModeChange, "Game Mode", this.constructor.gameModes) : <ul/>}
                {getEditorModeConfiguration("professionsEnabled") ? this.renderColumn("profession", this.props.onProfessionChange, "Profession", this.constructor.professions) : <ul/>}
                {getEditorModeConfiguration("racesEnabled") ? this.renderColumn("race", this.props.onRaceChange, "Race", this.constructor.races) : <ul/>}
            </div>
        );
    }

    renderColumn(group, onSelected, header, items) {
        return (
            <ul className={`${group}-column`}>
                <li className="column-header">{header}</li>
                {items.map(i => {
                    return (
                        <SettingOption key={`${group.toLowerCase()}-${i.option}`}
                                       group={group.toLowerCase()}
                                       option={i.option}
                                       selected={this.isSelected(group, i.option)}
                                       onSelected={onSelected}>
                            {i.content}
                        </SettingOption>
                    );
                })}
            </ul>
        );
    }
}

class SettingOption extends React.Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onSelected) {
            this.props.onSelected(this.props.option);
        }
    }

    render() {
        return (
            <li className={`option ${this.props.group}-${this.props.option} ${this.props.selected ? "selected" : ""}`}
                onClick={this.onClick}>
                {this.props.children}
            </li>
        );
    }
}

const tl = defineMessages({
    pve: {
        id: "gameMode.pve",
        description: "PvE",
        defaultMessage: "PvE"
    },
    pvp: {
        id: "gameMode.pvp",
        description: "PvP",
        defaultMessage: "PvP"
    },
    wvw: {
        id: "gameMode.wvw",
        description: "WvW",
        defaultMessage: "WvW"
    },
    guardian: {
        id: "profession.guardian",
        description: "Guardian",
        defaultMessage: "Guardian"
    },
    revenant: {
        id: "profession.revenant",
        description: "Revenant",
        defaultMessage: "Revenant"
    },
    warrior: {
        id: "profession.warrior",
        description: "Warrior",
        defaultMessage: "Warrior"
    },
    engineer: {
        id: "profession.engineer",
        description: "Engineer",
        defaultMessage: "Engineer"
    },
    ranger: {
        id: "profession.ranger",
        description: "Ranger",
        defaultMessage: "Ranger"
    },
    thief: {
        id: "profession.thief",
        description: "Thief",
        defaultMessage: "Thief"
    },
    elementalist: {
        id: "profession.elementalist",
        description: "Elementalist",
        defaultMessage: "Elementalist"
    },
    mesmer: {
        id: "profession.mesmer",
        description: "Mesmer",
        defaultMessage: "Mesmer"
    },
    necromancer: {
        id: "profession.necromancer",
        description: "Necromancer",
        defaultMessage: "Necromancer"
    },
    noRace: {
        id: "race.noRace",
        description: "No race",
        defaultMessage: "No race"
    },
    asura: {
        id: "race.asura",
        description: "Asura",
        defaultMessage: "Asura"
    },
    charr: {
        id: "race.charr",
        description: "Charr",
        defaultMessage: "Charr"
    },
    human: {
        id: "race.human",
        description: "Human",
        defaultMessage: "Human"
    },
    norn: {
        id: "race.norn",
        description: "Norn",
        defaultMessage: "Norn"
    },
    sylvari: {
        id: "race.sylvari",
        description: "Sylvari",
        defaultMessage: "Sylvari"
    },
});

export default SettingsPanel;
