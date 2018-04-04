import React from 'react';
import style from './Row.css';
import Select from '../Inputs/Select/Select';
import map from 'lodash/map';
import cx from 'classnames';
import Overlay from '../App/Overlay/Overlay';
import Tooltip from '../Tooltips/Tooltip';

const RARITIES = ['Exotic', 'Ascended'];

export default class Row extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            stats: undefined,
            editing: false
        };
    }

    render() {
        const { text, availableItemstats } = this.props;

        const selected = availableItemstats.filter(
            (stat) => stat.id === this.state.stats
        )[0];

        const { editing } = this.state;

        return (
            <div className={style.row}>
                <div className={style.header}>
                    <span className={cx(style.text, style[this.props.rarity.toLowerCase()])}>{selected && selected.name} {text}</span>
                    <button onClick={() => this.toggleEditing()} className={style.editButton} ref={(button) => this.button = button}>
                        <img src="/img/general/edit.svg"/>
                    </button>
                </div>
                {this.renderAttributes(selected)}
                {editing && this.renderEditingView(availableItemstats)}
            </div>
        );
    }

    toggleEditing() {
        const { top, left } = this.button.getBoundingClientRect();
        this.setState(({editing}) => ({ editing: !editing, buttonPosition: { top, left } }));
    }

    renderEditingView(availableItemstats) {
        const { top, left } = this.state.buttonPosition;

        return (
            <Overlay onClick={() => this.setState({ editing: false })}>
                <div className={style.dropdown} style={{ top, left }}>
                    <table><tbody>
                        <tr>
                            <td>Rarity:</td>
                            <td>{this.renderRaritySelect()}</td>
                            <td>
                                <button className={style.copyButton}><img src="/img/general/copy.svg"/>Copy to all</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Itemstats:</td>
                            <td>{this.renderAttributeSelect(availableItemstats)}</td>
                            <td>
                                <button className={style.copyButton}><img src="/img/general/copy.svg"/>Copy to all</button>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
            </Overlay>
        )
    }

    renderRaritySelect() {
        return (
            <Select
                onChange={this.props.onRarityChange}
                value={this.props.rarity}
                placeholder="Rarity">
                {this.props.rarities.map(rarity => (
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

