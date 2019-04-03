import { createSelector } from 'reselect';
import {
    GEAR_SLOT_ARMOR_AQUATIC,
    GEAR_SLOT_ARMOR_BOOTS,
    GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES, GEAR_SLOT_ARMOR_HELM, GEAR_SLOT_ARMOR_LEGGINGS,
    GEAR_SLOT_ARMOR_SHOULDERS, GEAR_SLOT_TRINKET_ACCESSORY1, GEAR_SLOT_TRINKET_ACCESSORY2, GEAR_SLOT_TRINKET_AMULET,
    GEAR_SLOT_TRINKET_BACK, GEAR_SLOT_TRINKET_RING1, GEAR_SLOT_TRINKET_RING2, GEAR_SLOT_WEAPON_AQUATIC1,
    GEAR_SLOT_WEAPON_AQUATIC2,
    GEAR_SLOT_WEAPON_MAINHAND1,
    GEAR_SLOT_WEAPON_MAINHAND2,
    GEAR_SLOT_WEAPON_OFFHAND1, GEAR_SLOT_WEAPON_OFFHAND2,
    GEAR_SLOT_WEAPON_TWOHAND1, GEAR_SLOT_WEAPON_TWOHAND2, GEAR_TYPE_WEAPON_OFFHAND,
    RARITY_ASCENDED, RARITY_EXOTIC
} from '../../components/Gear/Constants';
import { getAttributeValues } from '../../components/Gear/Attributes/index';
import { attributeCombinations } from '../../components/Gear/Attributes/Static';
import { getIsTwoHandedActive } from '../gear/weapons';

const getSelectedArmorItemstatIds = (state, props) => state.selectedArmorItemstatIds;
const getSelectedArmorIsAscended = (state, props) => state.selectedArmorIsAscended;

const getSelectedTrinketItemstatIds = (state, props) => state.selectedTrinketItemstatIds;
const getSelectedTrinketIsAscended = (state, props) => state.selectedTrinketIsAscended;

const getSelectedMainhandWeaponItemstatIds = (state, props) => state.selectedMainhandWeaponItemstatIds;
const getSelectedMainhandWeaponIsAscended = (state, props) => state.selectedMainhandWeaponIsAscended;
const getSelectedOffhandWeaponItemstatIds = (state, props) => state.selectedOffhandWeaponItemstatIds;
const getSelectedOffhandWeaponIsAscended = (state, props) => state.selectedOffhandWeaponIsAscended;
const getActiveWeaponSet = (state, props) => state.activeWeaponSet;

const getArmorSlots = (state, props) => [
    state.activeWeaponSet >= 2 ? GEAR_SLOT_ARMOR_AQUATIC : GEAR_SLOT_ARMOR_HELM,
    GEAR_SLOT_ARMOR_SHOULDERS, GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES,
    GEAR_SLOT_ARMOR_LEGGINGS, GEAR_SLOT_ARMOR_BOOTS
];

const getTrinketSlots = (state, props) => [
    GEAR_SLOT_TRINKET_BACK, GEAR_SLOT_TRINKET_ACCESSORY1, GEAR_SLOT_TRINKET_ACCESSORY2,
    GEAR_SLOT_TRINKET_AMULET, GEAR_SLOT_TRINKET_RING1, GEAR_SLOT_TRINKET_RING2
];

const getWeaponSlots = createSelector(
    [getActiveWeaponSet, getIsTwoHandedActive],
    (set, twoHanded) => {
        switch(set) {
            case 0: return twoHanded ? [GEAR_SLOT_WEAPON_TWOHAND1] : [GEAR_SLOT_WEAPON_MAINHAND1, GEAR_SLOT_WEAPON_OFFHAND1];
            case 1: return twoHanded ? [GEAR_SLOT_WEAPON_TWOHAND2] : [GEAR_SLOT_WEAPON_MAINHAND2, GEAR_SLOT_WEAPON_OFFHAND2];
            case 2: return [GEAR_SLOT_WEAPON_AQUATIC1];
            case 3: return [GEAR_SLOT_WEAPON_AQUATIC2];
            default: return [];
        }

    }
);

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

function attributeDetailsSelectorWeapons(attribute) {
    return createSelector(
        [getWeaponSlots, getSelectedMainhandWeaponItemstatIds, getSelectedMainhandWeaponIsAscended,
            getSelectedOffhandWeaponItemstatIds, getSelectedOffhandWeaponIsAscended],
        (slots, mainhandItemstatIds, mainhandIsAscended, offhandItemstatIds, offhandIsAscended) => slots.filter(
            (slot) => slot.type === GEAR_TYPE_WEAPON_OFFHAND ? offhandItemstatIds[slot.id] : mainhandItemstatIds[slot.id]
        ).map(
            (slot) => ({
                label: attributeCombinations[(slot.type === GEAR_TYPE_WEAPON_OFFHAND ? offhandItemstatIds[slot.id] : mainhandItemstatIds[slot.id])].name + ' ' + slot.type.id,
                value: getAttributeValues(
                    slot.type === GEAR_TYPE_WEAPON_OFFHAND ? offhandItemstatIds[slot.id] : mainhandItemstatIds[slot.id],
                    slot.type === GEAR_TYPE_WEAPON_OFFHAND ? offhandIsAscended[slot.id] : mainhandIsAscended[slot.id] ? RARITY_ASCENDED : RARITY_EXOTIC,
                    slot.type
                )[attribute] || 0
            })
        )
    )
}

export function createAttributeDetailSelector(attribute) {
    const armor = attributeDetailsSelectorArmor(attribute);
    const trinkets = attributeDetailsSelectorTrinkets(attribute);
    const weapons = attributeDetailsSelectorWeapons(attribute);

    return createSelector(
        [armor, trinkets, weapons],
        (armor, trinkets, weapons) => [...armor, ...trinkets, ...weapons]
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
