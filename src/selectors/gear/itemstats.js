import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import {
    GEAR_CATEGORY_ARMOR, GEAR_CATEGORY_TRINKET, RARITY_ASCENDED,
    RARITY_EXOTIC
} from '../../components/Gear/Constants';

const getSelectedArmorIsAscended = (state) => state.selectedArmorIsAscended;
const getSelectedTrinketIsAscended = (state) => state.selectedTrinketIsAscended;
const getSelectedArmorItemstatIds = (state) => state.selectedArmorItemstatIds;
const getSelectedTrinketItemstatIds = (state) => state.selectedTrinketItemstatIds;
const getSlot = (state, props) => props.slot;

export const getRarityForSlot = createSelector(
    [getSlot, getSelectedArmorIsAscended, getSelectedTrinketIsAscended],
    (slot, armor, trinket) => ({
        [GEAR_CATEGORY_ARMOR]: armor[slot.id],
        Weapon: true,
        [GEAR_CATEGORY_TRINKET]: trinket[slot.id]
    }[slot.type.category] ? RARITY_ASCENDED : RARITY_EXOTIC)
);

export const getItemstatIdForSlot = createSelector(
    [getSlot, getSelectedArmorItemstatIds, getSelectedTrinketItemstatIds],
    (slot, armor, trinket) => ({
        [GEAR_CATEGORY_ARMOR]: armor[slot.id],
        [GEAR_CATEGORY_TRINKET]: trinket[slot.id]
    })[slot.type.category]
);

export default {
    getRarityForSlot
};
