import React from 'react';
import map from 'lodash/map';
import { weaponIs2Handed } from '../../utils/gw2';
import GearRow from './GearRowContainer';
import UpgradeRow from './UpgradeRow';
import style from './Gear.module.css';
import * as GearConstants from './Constants';

const SET = {
    NORMAL_1: 0,
    NORMAL_2: 1,
    UNDERWATER_1: 2,
    UNDERWATER_2: 3
};

function slots({ selectedMainhandWeaponIds, selectedOffhandWeaponIds, hasMultipleWeaponsets }) {
    return {
        Armor: [
            { slot: GearConstants.GEAR_SLOT_ARMOR_HELM },
            { slot: GearConstants.GEAR_SLOT_ARMOR_SHOULDERS },
            { slot: GearConstants.GEAR_SLOT_ARMOR_COAT },
            { slot: GearConstants.GEAR_SLOT_ARMOR_GLOVES },
            { slot: GearConstants.GEAR_SLOT_ARMOR_LEGGINGS },
            { slot: GearConstants.GEAR_SLOT_ARMOR_BOOTS },
        ],
        Weapons: [
            { slot: GearConstants.GEAR_SLOT_WEAPON_TWOHAND1, visible: weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_1]), text: selectedMainhandWeaponIds[SET.NORMAL_1] },
            { slot: GearConstants.GEAR_SLOT_WEAPON_MAINHAND1, visible: !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_1]), text: selectedMainhandWeaponIds[SET.NORMAL_1] },
            { slot: GearConstants.GEAR_SLOT_WEAPON_OFFHAND1, visible: !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_1]), text: selectedOffhandWeaponIds[SET.NORMAL_1] },

            { slot: GearConstants.GEAR_SLOT_WEAPON_TWOHAND2, visible: hasMultipleWeaponsets && weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_2]), text: selectedMainhandWeaponIds[SET.NORMAL_2] },
            { slot: GearConstants.GEAR_SLOT_WEAPON_MAINHAND2, visible: hasMultipleWeaponsets && !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_2]), text: selectedMainhandWeaponIds[SET.NORMAL_2] },
            { slot: GearConstants.GEAR_SLOT_WEAPON_OFFHAND2, visible: hasMultipleWeaponsets && !weaponIs2Handed(selectedMainhandWeaponIds[SET.NORMAL_2]), text: selectedOffhandWeaponIds[SET.NORMAL_2] },
        ],
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
            { slot: GearConstants.GEAR_SLOT_WEAPON_AQUATIC1, text: selectedMainhandWeaponIds[SET.UNDERWATER_1] },
            { slot: GearConstants.GEAR_SLOT_WEAPON_AQUATIC2, visible: hasMultipleWeaponsets, text: selectedMainhandWeaponIds[SET.UNDERWATER_2] },
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
                    (<div className={style.slot}>
                        <GearRow key={index} slot={row.slot} text={row.text}/>
                        {map(row.slot.upgrades, (upgrade, index) => (
                            <UpgradeRow key={index} slot={upgrade}/>
                        ))}
                    </div>)
                )}
            </section>
        ))}
    </div>
);
