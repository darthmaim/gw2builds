import { createSelector } from 'reselect';
import {
    GEAR_SLOT_ARMOR_BOOTS,
    GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES, GEAR_SLOT_ARMOR_HELM, GEAR_SLOT_ARMOR_LEGGINGS,
    GEAR_SLOT_ARMOR_SHOULDERS
} from '../../components/Gear/Constants';
import { createAttributeReducer } from './utils';

const armorData = {
    //                       Rarity |    Exotic   |   Ascended   |
    //                  Armor Class | L    M    H |  L    M    H |
    [GEAR_SLOT_ARMOR_HELM.id]:      [ 73,  97, 121,  77, 102, 127],
    [GEAR_SLOT_ARMOR_SHOULDERS.id]: [ 73,  97, 121,  77, 102, 127],
    [GEAR_SLOT_ARMOR_COAT.id]:      [314, 338, 363, 330, 355, 381],
    [GEAR_SLOT_ARMOR_GLOVES.id]:    [133, 157, 182, 140, 165, 191],
    [GEAR_SLOT_ARMOR_LEGGINGS.id]:  [194, 218, 242, 203, 229, 254],
    [GEAR_SLOT_ARMOR_BOOTS.id]:     [133, 157, 182, 140, 165, 191],
};

const SLOTS = [
    GEAR_SLOT_ARMOR_HELM, GEAR_SLOT_ARMOR_SHOULDERS, GEAR_SLOT_ARMOR_COAT,
    GEAR_SLOT_ARMOR_GLOVES, GEAR_SLOT_ARMOR_LEGGINGS, GEAR_SLOT_ARMOR_BOOTS
];

const getSelectedProfession = (state) => state.selectedProfession;
const getSelectedArmorIsAscended = (state, props) => state.selectedArmorIsAscended;

const getArmorClass = createSelector(
    [getSelectedProfession],
    profession => {
        switch (profession) {
            case 'Elementalist':
            case 'Mesmer':
            case 'Necromancer':
                return 0;
            case 'Ranger':
            case 'Thief':
            case 'Engineer':
                return 1;
            case 'Guardian':
            case 'Warrior':
            case 'Revenant':
                return 2;
            default:
                return 0;
        }
    }
);

// TODO: shields, aquatic helm
export const getAttributeDefenseDetails = createSelector(
    [getArmorClass, getSelectedArmorIsAscended],
    (armorClass, isAscended) => {
        return [{ label: 'Base', value: 0 }].concat(SLOTS.map(
            (slot) => ({
                label: slot.type.id,
                value: armorData[slot.id][armorClass + (isAscended[slot.id] ? 3 : 0)]
            })
        ))
    }
);

export const getAttributeDefense = createAttributeReducer(getAttributeDefenseDetails);
