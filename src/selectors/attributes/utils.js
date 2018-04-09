import { createSelector } from 'reselect';
import {
    GEAR_SLOT_ARMOR_AQUATIC,
    GEAR_SLOT_ARMOR_BOOTS,
    GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES, GEAR_SLOT_ARMOR_HELM, GEAR_SLOT_ARMOR_LEGGINGS,
    GEAR_SLOT_ARMOR_SHOULDERS, RARITY_ASCENDED, RARITY_EXOTIC
} from '../../components/Gear/Constants';
import { getAttributeValues } from '../../components/Gear/Attributes/index';
import { attributeCombinations } from '../../components/Gear/Attributes/Static';

const getSelectedArmorItemstatIds = (state, props) => state.selectedArmorItemstatIds;
const getSelectedArmorIsAscended = (state, props) => state.selectedArmorIsAscended;
const getArmorSlots = (state, props) => [
    state.activeWeaponSet >= 2 ? GEAR_SLOT_ARMOR_AQUATIC : GEAR_SLOT_ARMOR_HELM,
    GEAR_SLOT_ARMOR_SHOULDERS, GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES,
    GEAR_SLOT_ARMOR_LEGGINGS, GEAR_SLOT_ARMOR_BOOTS
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

export function createAttributeDetailSelector(attribute) {
    const armor = attributeDetailsSelectorArmor(attribute);

    return createSelector(
        [armor], (armor) => armor.filter((detail) => detail.value !== 0)
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
