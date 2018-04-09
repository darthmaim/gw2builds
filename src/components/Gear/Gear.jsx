import React from 'react';
import map from 'lodash/map';
import { weaponIs2Handed } from '../../utils/gw2';
import Row from './RowContainer';
import style from './Gear.css';
import * as GearConstants from './Constants';

const SET = {
    NORMAL_1: 0,
    NORMAL_2: 1,
    UNDERWATER_1: 2,
    UNDERWATER_2: 3
};

function slots({ selectedMainhandWeaponIds, hasMultipleWeaponsets }) {
    return {
        Armor: [
            { slot: GearConstants.GEAR_SLOT_ARMOR_HELM },
            { slot: GearConstants.GEAR_SLOT_ARMOR_SHOULDERS },
            { slot: GearConstants.GEAR_SLOT_ARMOR_COAT },
            { slot: GearConstants.GEAR_SLOT_ARMOR_GLOVES },
            { slot: GearConstants.GEAR_SLOT_ARMOR_LEGGINGS },
            { slot: GearConstants.GEAR_SLOT_ARMOR_BOOTS },
        ],
        /*Weapons: [
            { type: 'Weapon', slot: GEAR_TYPE_WEAPON_2HANDED, visible: weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_1]) },
            { type: 'Weapon', slot: GEAR_TYPE_WEAPON_1HANDED, visible: !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_1]) },
            { type: 'Weapon', slot: GEAR_TYPE_WEAPON_1HANDED, visible: !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_1]) },

            { type: 'Weapon', slot: GEAR_TYPE_WEAPON_2HANDED, visible: hasMultipleWeaponsets && weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_2]) },
            { type: 'Weapon', slot: GEAR_TYPE_WEAPON_1HANDED, visible: hasMultipleWeaponsets && !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_2]) },
            { type: 'Weapon', slot: GEAR_TYPE_WEAPON_1HANDED, visible: hasMultipleWeaponsets && !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_2]) },
        ],*/
        Trinkets: [
            { slot: GearConstants.GEAR_SLOT_TRINKET_BACK },
            { slot: GearConstants.GEAR_SLOT_TRINKET_ACCESSORY1 },
            { slot: GearConstants.GEAR_SLOT_TRINKET_ACCESSORY2 },
            { slot: GearConstants.GEAR_SLOT_TRINKET_AMULET },
            { slot: GearConstants.GEAR_SLOT_TRINKET_RING1 },
            { slot: GearConstants.GEAR_SLOT_TRINKET_RING2 },
        ],
        Underwater: [
            { slot: GearConstants.GEAR_SLOT_ARMOR_AQUATIC },
            //{ type: 'Weapon', slot: GEAR_TYPE_WEAPON_2HANDED },
            //{ type: 'Weapon', slot: GEAR_TYPE_WEAPON_2HANDED, visible: hasMultipleWeaponsets },
        ]
    };
}

export default ({selectedMainhandWeaponIds, selectedOffhandWeaponIds, hasMultipleWeaponsets }) => (
    <div className={style.panel}>
        {map(slots({ selectedMainhandWeaponIds, selectedOffhandWeaponIds, hasMultipleWeaponsets }), (rows, type) => (
            <section key={type} className={style.section}>
                <header className={style.header}>{type}</header>
                {map(rows, (row, index) =>
                    (row.visible === undefined || row.visible) &&
                    <Row key={index} slot={row.slot}/>
                )}
            </section>
        ))}
    </div>
);
