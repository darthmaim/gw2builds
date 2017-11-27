import React from 'react';
import style from './Row.css';
import Select from '../Inputs/Select/Select';
import map from 'lodash/map';

const RARITIES = ['Exotic', 'Ascended'];

export default class Row extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = { stats: undefined, rarity: undefined };
    }

    render() {
        const { type, slot, text, availableItemstats } = this.props;

        const itemstats = availableItemstats.filter(
            (stat) => stat.type === type && stat.subtype === slot && stat.rarity === this.state.rarity
        );
        const selected = itemstats.filter(
            (stat) => stat.id === this.state.stats
        )[0];

        return (
            <div className={style.row}>
                <div className={style.header}>
                    {this.renderRaritySelect()}
                    {this.renderAttributeSelect(itemstats)}
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
                    <Select.Option value={rarity} key={rarity}>{rarity}</Select.Option>
                ))}
            </Select>
        );
    }

    renderAttributeSelect(availableAttributeSets) {
        return (
            <Select
                onChange={stats => this.setState({stats: parseInt(stats)})}
                value={this.state.stats}
                placeholder="Stats">
                {availableAttributeSets.map((stat) => (
                    <Select.Option value={stat.id} key={stat.id}>{stat.name}</Select.Option>
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

