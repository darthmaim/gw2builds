import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getEditorModeConfiguration } from '../../editor-modes';
import Option from './Option';
import tl from './Messages';
import style from './style.css';

class Panel extends React.Component {
    static get gameModes() {
        return [
            { option: 'pve', content: <FormattedMessage {...tl.pve}/> },
            { option: 'pvp', content: <FormattedMessage {...tl.pvp}/> },
            { option: 'wvw', content: <FormattedMessage {...tl.wvw}/> }
        ].filter(i => getEditorModeConfiguration('gameModes')[i.option]);
    }

    static get professions() {
        return [
            { option: 'Guardian', content: <FormattedMessage {...tl.guardian}/> },
            { option: 'Revenant', content: <FormattedMessage {...tl.revenant}/> },
            { option: 'Warrior', content: <FormattedMessage {...tl.warrior}/> },
            { option: 'Engineer', content: <FormattedMessage {...tl.engineer}/> },
            { option: 'Ranger', content: <FormattedMessage {...tl.ranger}/> },
            { option: 'Thief', content: <FormattedMessage {...tl.thief}/> },
            { option: 'Elementalist', content: <FormattedMessage {...tl.elementalist}/> },
            { option: 'Mesmer', content: <FormattedMessage {...tl.mesmer}/> },
            { option: 'Necromancer', content: <FormattedMessage {...tl.necromancer}/> }
        ].filter(i => getEditorModeConfiguration('professions')[i.option]);
    }

    static get races() {
        return [
            { option: 'none', content: <FormattedMessage {...tl.noRace}/> },
            { option: 'Asura', content: <FormattedMessage {...tl.asura}/> },
            { option: 'Charr', content: <FormattedMessage {...tl.charr}/> },
            { option: 'Human', content: <FormattedMessage {...tl.human}/> },
            { option: 'Norn', content: <FormattedMessage {...tl.norn}/> },
            { option: 'Sylvari', content: <FormattedMessage {...tl.sylvari}/> }
        ].filter(i => getEditorModeConfiguration('races')[i.option]);
    }

    isSelected(group, option) {
        return this.props[group] === option;
    }

    render() {
        return (
            <div className={style.columns}>
                {getEditorModeConfiguration('gameModesEnabled') ? this.renderColumn('gameMode', this.props.onGameModeChange, 'Game Mode', this.constructor.gameModes) : <ul className={style.column}/>}
                {getEditorModeConfiguration('professionsEnabled') ? this.renderColumn('profession', this.props.onProfessionChange, 'Profession', this.constructor.professions) : <ul className={style.column}/>}
                {getEditorModeConfiguration('racesEnabled') ? this.renderColumn('race', this.props.onRaceChange, 'Race', this.constructor.races) : <ul className={style.column}/>}
            </div>
        );
    }

    renderColumn(group, onSelected, header, items) {
        return (
            <ul className={style.column}>
                <li className={style.columnHeader}>{header}</li>
                {items.map(i => {
                    return (
                        <Option
                            key={`${group.toLowerCase()}-${i.option}`}
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
