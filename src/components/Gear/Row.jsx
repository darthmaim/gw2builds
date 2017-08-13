import React from 'react';
import style from './Row.css';
import Select from '~/components/Inputs/Select';
import attributeSets from '~/../assets/gear.json';
import map from 'lodash/map';

const RARITIES = ['Exotic', 'Ascended'];

export default class Row extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = { stats: undefined, rarity: undefined };
    }

    render() {
        const { type, slot, selectedLanguage, text } = this.props;

        const availableAttributeSets = attributeSets[type] && attributeSets[type][slot] && attributeSets[type][slot][this.state.rarity]
            ? (attributeSets[type][slot][this.state.rarity].itemstats || [])
            : [];

        const selected = availableAttributeSets.filter(set => set.id === this.state.stats)[0];

        return (
            <div className={style.row}>
                <div className={style.header}>
                    {this.renderRaritySelect()}
                    {this.renderAttributeSelect(availableAttributeSets, selectedLanguage)}
                    <span className={style.text}>{text}</span>
                </div>
                {this.renderAttributes(selected)}
            </div>
        );
    }

    renderRaritySelect() {
        return (
            <Select
                onChange={rarity => this.setState({rarity})}
                value={this.state.rarity}
                placeholder="Rarity">
                {RARITIES.map(rarity => (
                    <option value={rarity} key={rarity}>{rarity}</option>
                ))}
            </Select>
        );
    }

    renderAttributeSelect(availableAttributeSets, selectedLanguage) {
        return (
            <Select
                onChange={stats => this.setState({stats: parseInt(stats)})}
                value={this.state.stats}
                placeholder="Stats">
                {availableAttributeSets.map(set => (
                    <option value={set.id} key={set.id}>{set.names[selectedLanguage]}</option>
                ))}
            </Select>
        );
    }

    renderAttributes(selected) {
        return (
            <span className={style.attributes}>
                {selected && map(selected.attributes, (value, key) => (
                    <span className={style.attribute} key={key}><span>{value}</span><span>{key}</span></span>
                ))}
            </span>
        );
    }
};

