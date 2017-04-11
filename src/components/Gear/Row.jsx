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
        const { type, slot, language, text } = this.props;

        const availableAttributeSets = attributeSets[type] !== undefined && attributeSets[type][slot] !== undefined
            ? (attributeSets[type][slot][this.state.rarity] || [])
            : [];

        const selected = availableAttributeSets.filter(set => set.id == this.state.stats)[0];

        return (
            <div className={style.row}>
                {this.renderRaritySelect()}
                {this.renderAttributeSelect(availableAttributeSets, language)}
                {text}
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

    renderAttributeSelect(availableAttributeSets, language) {
        return (
            <Select
                onChange={stats => this.setState({stats})}
                value={this.state.stats}
                placeholder="Stats">
                {availableAttributeSets.map(set => (
                    <option value={set.id} key={set.id}>{set.names[language]}</option>
                ))}
            </Select>
        );
    }

    renderAttributes(selected) {
        return (
            <span className={style.attributes}>
                {selected && map(selected.attributes, (value, key) => (
                    <span key={key}>{key}: <span>{value}</span></span>
                ))}
            </span>
        );
    }
};

