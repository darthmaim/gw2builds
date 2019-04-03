import { createSelector } from 'reselect';
import {
    GEAR_CATEGORY_ARMOR, GEAR_CATEGORY_TRINKET, GEAR_CATEGORY_WEAPON, GEAR_TYPE_WEAPON_OFFHAND, RARITY_ASCENDED,
    RARITY_EXOTIC
} from '../../components/Gear/Constants';

const getSelectedArmorIsAscended = (state) => state.selectedArmorIsAscended;
const getSelectedTrinketIsAscended = (state) => state.selectedTrinketIsAscended;
const getSelectedMainhandWeaponIsAscended = (state) => state.selectedMainhandWeaponIsAscended;
const getSelectedOffhandWeaponIsAscended = (state) => state.selectedOffhandWeaponIsAscended;
const getSelectedArmorItemstatIds = (state) => state.selectedArmorItemstatIds;
const getSelectedTrinketItemstatIds = (state) => state.selectedTrinketItemstatIds;
const getSelectedMainhandWeaponItemstatIds = (state) => state.selectedMainhandWeaponItemstatIds;
const getSelectedOffhandWeaponItemstatIds = (state) => state.selectedOffhandWeaponItemstatIds;
const getSlot = (state, props) => props.slot;

export const getRarityForSlot = createSelector(
    [getSlot, getSelectedArmorIsAscended, getSelectedTrinketIsAscended,
        getSelectedMainhandWeaponIsAscended, getSelectedOffhandWeaponIsAscended],
    (slot, armor, trinket, mainhand, offhand) => ({
        [GEAR_CATEGORY_ARMOR]: armor[slot.id],
        [GEAR_CATEGORY_WEAPON]: slot.type === GEAR_TYPE_WEAPON_OFFHAND ? offhand[slot.id] : mainhand[slot.id],
        [GEAR_CATEGORY_TRINKET]: trinket[slot.id]
    }[slot.type.category] ? RARITY_ASCENDED : RARITY_EXOTIC)
);

export const getItemstatIdForSlot = createSelector(
    [getSlot, getSelectedArmorItemstatIds, getSelectedTrinketItemstatIds,
        getSelectedMainhandWeaponItemstatIds, getSelectedOffhandWeaponItemstatIds],
    (slot, armor, trinket, mainhand, offhand) => ({
        [GEAR_CATEGORY_ARMOR]: armor[slot.id],
        [GEAR_CATEGORY_WEAPON]: slot.type === GEAR_TYPE_WEAPON_OFFHAND ? offhand[slot.id] : mainhand[slot.id],
        [GEAR_CATEGORY_TRINKET]: trinket[slot.id]
    })[slot.type.category]
);

export default {
    getRarityForSlot,
    getItemstatIdForSlot
};
