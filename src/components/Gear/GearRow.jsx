import React from 'react';
import PropTypes from 'prop-types';
import style from './GearRow.module.css';
import Select from '../Inputs/Select/Select';
import map from 'lodash/map';
import cx from 'classnames';
import Overlay from '../App/Overlay/Overlay';
import { getAttributeValues, getAvailableCombinations } from './Attributes/index';
import { AVAILABILITY_ARMOR, AVAILABILITY_BACK, AVAILABILITY_TRINKET, AVAILABILITY_WEAPON } from './Attributes/Static';
import {
    GEAR_CATEGORY_ARMOR, GEAR_CATEGORY_TRINKET, GEAR_CATEGORY_WEAPON, GEAR_TYPE_TRINKET_BACK,
    RARITIES
} from './Constants';
import { ReactComponent as EditIcon } from './edit.svg';
import { ReactComponent as CopyIcon } from './copy.svg';

function slotToAvailability(slot) {
    return slot.type === GEAR_TYPE_TRINKET_BACK ? AVAILABILITY_BACK : {
        [GEAR_CATEGORY_ARMOR]: AVAILABILITY_ARMOR,
        [GEAR_CATEGORY_WEAPON]: AVAILABILITY_WEAPON,
        [GEAR_CATEGORY_TRINKET]: AVAILABILITY_TRINKET
    }[slot.type.category];
}

class GearRow extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            editing: false
        };
    }

    render() {
        const { rarity, itemstatId, slot, text } = this.props;

        const availableItemstats = getAvailableCombinations(slotToAvailability(slot));

        const selected = availableItemstats[itemstatId];
        const values = selected && getAttributeValues(itemstatId, rarity, slot.type);

        const { editing } = this.state;

        return (
            <div className={style.row}>
                <div className={style.header}>
                    <span className={cx(style.text, style[rarity.toLowerCase()])}>{selected && selected.name} {text || slot.type.id}</span>
                    <button onClick={() => this.toggleEditing()} className={style.editButton} ref={(button) => this.button = button}>
                        <EditIcon className={style.editIcon}/>
                    </button>
                </div>
                {values && this.renderAttributes(values)}
                {editing && this.renderEditingView(availableItemstats)}
            </div>
        );
    }

    toggleEditing() {
        const { top, left } = this.button.getBoundingClientRect();
        const buttonPosition = { left };

        if(window.innerHeight - top < 200) {
            buttonPosition.bottom = window.innerHeight - top;
        } else {
            buttonPosition.top = top;
        }

        this.setState(({editing}) => ({ editing: !editing, buttonPosition }));
    }

    renderEditingView(availableItemstats) {
        const buttonPosition = this.state.buttonPosition;

        return (
            <Overlay onClick={() => this.setState({ editing: false })}>
                <div className={buttonPosition.bottom ? style.dropup : style.dropdown} style={buttonPosition}>
                    <table><tbody>
                        <tr>
                            <td>Rarity:</td>
                            <td>{this.renderRaritySelect()}</td>
                            <td>
                                <button className={style.copyButton} onClick={() => this.props.onCopyRarity(this.props.rarity)}>
                                    <CopyIcon className={style.copyIcon}/>Copy to all
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Prefix:</td>
                            <td>{this.renderAttributeSelect(availableItemstats)}</td>
                            <td>
                                <button className={style.copyButton} onClick={() => this.props.onCopyItemstatId(this.props.itemstatId)}>
                                    <CopyIcon className={style.copyIcon}/>Copy to all
                                </button>
                            </td>
                        </tr>
                        {this.props.slot.upgrades.map((upgrade, index) => (
                            <tr>
                                <td>Upgrade:</td>
                                <td>{this.renderAttributeSelect(availableItemstats)}</td>
                                <td>
                                    <button className={style.copyButton} onClick={() => this.props.onCopyItemstatId(this.props.itemstatId)}>
                                        <CopyIcon className={style.copyIcon}/>Copy to all
                                    </button>
                                </td>
                            </tr>
                        ))}
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
                {RARITIES.map(rarity => (
                    <Select.Option value={rarity} key={rarity}>{rarity}</Select.Option>
                ))}
            </Select>
        );
    }

    renderAttributeSelect(availableAttributeSets) {
        return (
            <Select
                onChange={this.props.onItemstatIdChange}
                value={this.props.itemstatId}
                placeholder="Stats">
                {map(availableAttributeSets, (stat, id) => (
                    <Select.Option value={parseInt(id)} key={id} keywords={[stat.name , ...stat.attributes]}>
                        {stat.name}
                    </Select.Option>
                ))}
            </Select>
        );
    }

    renderAttributes(values) {
        return (
            <span className={style.attributes}>
                {values && map(values, (value, key) => (
                    <span className={style.attribute} key={key}><span>{value}</span><span>{key}</span></span>
                ))}
            </span>
        );
    }
}

GearRow.propTypes = {
    slot: PropTypes.shape({
        type: PropTypes.shape({
            id: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired
        }).isRequired,
        id: PropTypes.number.isRequired
    }).isRequired
};

export default GearRow;
