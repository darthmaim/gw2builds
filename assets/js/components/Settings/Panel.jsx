import React from "react";
import { FormattedMessage } from "react-intl";
import { getEditorModeConfiguration } from "../../editor-modes";
import { Option, Messages as tl } from '.';
import style from './style.css';

class Panel extends React.Component {
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
            <div className={style.columns}>
                {getEditorModeConfiguration("languagesEnabled") ? this.renderColumn("language", this.props.onLanguageChange, "Language", this.constructor.languages) : <ul className={style.column}/>}
                {getEditorModeConfiguration("gameModesEnabled") ? this.renderColumn("gameMode", this.props.onGameModeChange, "Game Mode", this.constructor.gameModes) : <ul className={style.column}/>}
                {getEditorModeConfiguration("professionsEnabled") ? this.renderColumn("profession", this.props.onProfessionChange, "Profession", this.constructor.professions) : <ul className={style.column}/>}
                {getEditorModeConfiguration("racesEnabled") ? this.renderColumn("race", this.props.onRaceChange, "Race", this.constructor.races) : <ul className={style.column}/>}
            </div>
        );
    }

    renderColumn(group, onSelected, header, items) {
        return (
            <ul className={style.column}>
                <li className={style.columnHeader}>{header}</li>
                {items.map(i => {
                    return (
                        <Option key={`${group.toLowerCase()}-${i.option}`}
                                       group={group.toLowerCase()}
                                       option={i.option}
                                       selected={this.isSelected(group, i.option)}
                                       onSelected={onSelected}>
                            {i.content}
                        </Option>
                    );
                })}
            </ul>
        );
    }
}

export default Panel;
