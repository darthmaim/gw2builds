import React from 'react';
import map from 'lodash/map';
import { weaponIs2Handed } from '~/utils/gw2';
import Row from './Row';
import style from './Gear.css';

const SET = {
    NORMAL_1: 0,
    NORMAL_2: 1,
    UNDERWATER_1: 2,
    UNDERWATER_2: 3
};

function slots({ activeMainhandWeapons, activeOffhandWeapons, hasMultipleWeaponsets }) {
    return {
        Armor: [
            { type: 'Armor', slot: 'Helm' },
            { type: 'Armor', slot: 'Shoulders' },
            { type: 'Armor', slot: 'Coat' },
            { type: 'Armor', slot: 'Gloves' },
            { type: 'Armor', slot: 'Leggings' },
            { type: 'Armor', slot: 'Boots' },
        ],
        Weapons: [
            { type: 'Weapon', slot: '2Handed', visible: weaponIs2Handed(activeMainhandWeapons[SET.NORMAL_1]) },
            { type: 'Weapon', slot: '1Handed', visible: !weaponIs2Handed(activeMainhandWeapons[SET.NORMAL_1]) },
            { type: 'Weapon', slot: '1Handed', visible: !weaponIs2Handed(activeMainhandWeapons[SET.NORMAL_1]) },

            { type: 'Weapon', slot: '2Handed', visible: hasMultipleWeaponsets && weaponIs2Handed(activeMainhandWeapons[SET.NORMAL_2]) },
            { type: 'Weapon', slot: '1Handed', visible: hasMultipleWeaponsets && !weaponIs2Handed(activeMainhandWeapons[SET.NORMAL_2]) },
            { type: 'Weapon', slot: '1Handed', visible: hasMultipleWeaponsets && !weaponIs2Handed(activeMainhandWeapons[SET.NORMAL_2]) },
        ],
        Trinkets: [
            { type: 'Back', slot: 'undefined' },
            { type: 'Trinket', slot: 'Accessory' },
            { type: 'Trinket', slot: 'Accessory' },
            { type: 'Trinket', slot: 'Amulet' },
            { type: 'Trinket', slot: 'Ring' },
            { type: 'Trinket', slot: 'Ring' },
        ],
        Underwater: [
            { type: 'Armor', slot: 'HelmAquatic' },
            { type: 'Weapon', slot: '2Handed' },
            { type: 'Weapon', slot: '2Handed', visible: hasMultipleWeaponsets },
        ]
    };
}

export default ({activeMainhandWeapons, activeOffhandWeapons, hasMultipleWeaponsets, language}) => (
    <div className={style.panel}>
        {map(slots({ activeMainhandWeapons, activeOffhandWeapons, hasMultipleWeaponsets }), (slots, type) => (
            <section key={type} className={style.section}>
                <header className={style.header}>{type}</header>
                {map(slots, (slot, index) =>
                    (slot.visible === undefined || slot.visible) &&
                    <Row key={index} language={language} type={slot.type} slot={slot.slot} text={slot.type + '.' + slot.slot}/>
                )}
            </section>
        ))}
    </div>
);
