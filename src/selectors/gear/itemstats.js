import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

export const armorSlots = [
    'Helm',
    'Shoulders',
    'Coat',
    'Gloves',
    'Leggings',
    'Boots',
    'HelmAquatic'
];

export const trinketSlots = [
    'Back',
    'Accessory1',
    'Accessory2',
    'Amulet',
    'Ring1',
    'Ring2',
];

const getAvailableItemstats = (state) => state.availableItemstats;
const getSelectedArmorIsAscended = (state) => state.selectedArmorIsAscended;
const getSelectedTrinketIsAscended = (state) => state.selectedTrinketIsAscended;
const getType = (state, props) => props.type;
const getSlot = (state, props) => props.slot;

export const getRarities = () => ['Exotic', 'Ascended'];

export const getRarityForSlot = createSelector(
    [getType, getSlot, getSelectedArmorIsAscended, getSelectedTrinketIsAscended],
    (type, slot, armor, trinket) => ({
        Armor: armor[armorSlots.indexOf(slot)],
        Weapon: true,
        Trinket: trinket[trinketSlots.indexOf(slot)],
        Back: trinket[0]
    }[type] ? 'Ascended' : 'Exotic')
);

export const getAvailableItemstatsForSlot = createSelector(
    [getAvailableItemstats, getRarityForSlot, getType, getSlot],
    (availableItemstats, rarity, type, slot) => sortBy(availableItemstats.filter(
        (stat) => stat.rarity === rarity && stat.type === type && (!slot || stat.subtype === slot.replace(/[12]/, ''))
    ), 'name')
);

export default {
    armorSlots,
    trinketSlots,

    getRarityForSlot,
    getAvailableItemstatsForSlot,
    getRarities
};
