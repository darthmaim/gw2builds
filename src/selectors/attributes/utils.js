import { createSelector } from 'reselect';
import {
    GEAR_SLOT_ARMOR_AQUATIC,
    GEAR_SLOT_ARMOR_BOOTS,
    GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES, GEAR_SLOT_ARMOR_HELM, GEAR_SLOT_ARMOR_LEGGINGS,
    GEAR_SLOT_ARMOR_SHOULDERS, GEAR_SLOT_TRINKET_ACCESSORY1, GEAR_SLOT_TRINKET_ACCESSORY2, GEAR_SLOT_TRINKET_AMULET,
    GEAR_SLOT_TRINKET_BACK, GEAR_SLOT_TRINKET_RING1, GEAR_SLOT_TRINKET_RING2,
    RARITY_ASCENDED, RARITY_EXOTIC
} from '../../components/Gear/Constants';
import { getAttributeValues } from '../../components/Gear/Attributes/index';
import { attributeCombinations } from '../../components/Gear/Attributes/Static';

const getSelectedArmorItemstatIds = (state, props) => state.selectedArmorItemstatIds;
const getSelectedArmorIsAscended = (state, props) => state.selectedArmorIsAscended;
const getSelectedTrinketItemstatIds = (state, props) => state.selectedTrinketItemstatIds;
const getSelectedTrinketIsAscended = (state, props) => state.selectedTrinketIsAscended;

const getArmorSlots = (state, props) => [
    state.activeWeaponSet >= 2 ? GEAR_SLOT_ARMOR_AQUATIC : GEAR_SLOT_ARMOR_HELM,
    GEAR_SLOT_ARMOR_SHOULDERS, GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES,
    GEAR_SLOT_ARMOR_LEGGINGS, GEAR_SLOT_ARMOR_BOOTS
];

const getTrinketSlots = (state, props) => [
    GEAR_SLOT_TRINKET_BACK, GEAR_SLOT_TRINKET_ACCESSORY1, GEAR_SLOT_TRINKET_ACCESSORY2,
    GEAR_SLOT_TRINKET_AMULET, GEAR_SLOT_TRINKET_RING1, GEAR_SLOT_TRINKET_RING2
];

function attributeDetailsSelectorArmor(attribute) {
    return createSelector(
        [getArmorSlots, getSelectedArmorItemstatIds, getSelectedArmorIsAscended],
        (slots, itemstatIds, isAscended) => slots.filter(
            (slot) => itemstatIds[slot.id]
        ).map(
            (slot) => ({
                label: attributeCombinations[itemstatIds[slot.id]].name + ' ' + slot.type.id,
                value: getAttributeValues(
                    itemstatIds[slot.id],
                    isAscended[slot.id] ? RARITY_ASCENDED : RARITY_EXOTIC,
                    slot.type
                )[attribute] || 0
            })
        )
    )
}

function attributeDetailsSelectorTrinkets(attribute) {
    return createSelector(
        [getTrinketSlots, getSelectedTrinketItemstatIds, getSelectedTrinketIsAscended],
        (slots, itemstatIds, isAscended) => slots.filter(
            (slot) => itemstatIds[slot.id]
        ).map(
            (slot) => ({
                label: attributeCombinations[itemstatIds[slot.id]].name + ' ' + slot.type.id,
                value: getAttributeValues(
                    itemstatIds[slot.id],
                    isAscended[slot.id] ? RARITY_ASCENDED : RARITY_EXOTIC,
                    slot.type
                )[attribute] || 0
            })
        )
    )
}

export function createAttributeDetailSelector(attribute) {
    const armor = attributeDetailsSelectorArmor(attribute);
    const trinkets = attributeDetailsSelectorTrinkets(attribute);

    return createSelector(
        [armor, trinkets],
        (armor, trinkets) => [...armor, ...trinkets]
            .filter((detail) => detail.value !== 0)
    )
}

const reducer = (details) => details.reduce((total, detail) => total + detail.value, 0);

export function createAttributeReducer(details) {
    return createSelector([details], reducer);
}

export function capAttributeDetails(details, max) {
    const total = reducer(details);

    if(total <= max) {
        return details;
    }

    return details.concat([
        { label: 'Cap', value: max - total }
    ]);
}
