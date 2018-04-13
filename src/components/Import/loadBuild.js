import { setImportDialogVisible } from '../../actions';
import { loadBuild as load } from '../../utils/build-string'
import { setIsLoading } from '../../actions';
import { api } from '../../utils/api';
import keyBy from 'lodash/fp/keyBy';
import isEqual from 'lodash/isEqual';
import { attributeCombinations } from '../Gear/Attributes/Static';

const normalizeAttributesFromCombination = (attributes) => {
    if(attributes.length === 7) return attributes.sort();
    const major = attributes.length === 4 ? 2 : 1;
    return attributes.slice(0, major).sort().concat(attributes.slice(major).sort());
};

const normalizedAttributeCombinations = Object.entries(attributeCombinations).map(
    ([key, { attributes }]) => ({ key, attributes: normalizeAttributesFromCombination(attributes) })
);

export const TYPE_PVE = 'pve';
export const TYPE_PVP = 'pvp';
export const TYPE_WVW = 'wvw';

export default (dispatch, state) => (type, { character }) => {
    console.log(`Loading ${type} build of ${character.name}`);
    dispatch(setIsLoading({ loading: true }));

    const itemIds = character.equipment.map(({id}) => id);

    api.items().many(itemIds).then((items) => {
        const itemsById = keyBy(i => i.id)(items);
        const equipmentSlots = keyBy(i => i.slot)(character.equipment.map(i => ({...i, item: itemsById[i.id]})));

        const weaponType = (slot) => {
            const weapon = equipmentSlots[slot] ? equipmentSlots[slot].item.details.type : undefined;
            switch(weapon) {
                case 'Harpoon': return 'Spear';
                case 'LongBow': return 'Longbow';
                default: return weapon;
            }
        };

        const isAscended = (slot) => {
            return equipmentSlots[slot] ? equipmentSlots[slot].item.rarity === 'Ascended' : false;
        };

        const itemstat = (slot) => {
            const equipped = equipmentSlots[slot] ? equipmentSlots[slot] : undefined;

            if(!equipped) {
                console.info('Nothing equipped in ' + slot);
                return undefined;
            }

            const compareAttr = ([attr1, val1], [attr2, val2]) => {
                return val1 === val2 ? attr1.localeCompare(attr2) : val2 - val1;
            };

            const attributes = equipped.stats
                ? Object.entries(equipped.stats.attributes)
                : (equipped.item.details.infix_upgrade
                    ? equipped.item.details.infix_upgrade.attributes.map(a => [a.attribute, a.modifier])
                    : undefined);

            if(!attributes) {
                console.info('Item without attributes equipped in ' + slot);
                return undefined;
            }

            const normalizedAttributes = attributes.sort(compareAttr).map(([attr]) => attr);

            const match = normalizedAttributeCombinations.find(
                ({ attributes }) => isEqual(attributes, normalizedAttributes)
            );

            if(!match) {
                console.warn('No match for ',  normalizedAttributes, equipped);
                return undefined;
            }

            return match.key;
        };

        const specialization = (index) => {
            const spec = character.specializations[type][index];

            return spec ? {
                specialization: spec.id,
                majorTrait1: spec.traits[0],
                majorTrait2: spec.traits[1],
                majorTrait3: spec.traits[2],
            } : undefined;
        };

        const build = {
            general: {
                gameMode: type,
                profession: character.profession,
                race: character.race
            },
            specialization1: specialization(0),
            specialization2: specialization(1),
            specialization3: specialization(2),
            weapons: {
                weaponA1: weaponType('WeaponA1'),
                weaponA2: weaponType('WeaponA2'),
                weaponB1: weaponType('WeaponB1'),
                weaponB2: weaponType('WeaponB2'),
                aquaticA: weaponType('WeaponAquaticA'),
                aquaticB: weaponType('WeaponAquaticB')
            },
            skills: {
                healing: character.skills[type].heal,
                utility1: character.skills[type].utilities[0],
                utility2: character.skills[type].utilities[1],
                utility3: character.skills[type].utilities[2],
                elite:  character.skills[type].elite
            },
            gearStats: {
                accessory1: itemstat('Accessory1'),
                accessory1IsAscended: isAscended('Accessory1'),
                accessory2: itemstat('Accessory2'),
                accessory2IsAscended: isAscended('Accessory2'),
                amulet: itemstat('Amulet'),
                amuletIsAscended: isAscended('Amulet'),
                backpack: itemstat('Backpack'),
                backpackIsAscended: isAscended('Backpack'),
                boots: itemstat('Boots'),
                bootsIsAscended: isAscended('Boots'),
                coat: itemstat('Coat'),
                coatIsAscended: isAscended('Coat'),
                gloves: itemstat('Gloves'),
                glovesIsAscended: isAscended('Gloves'),
                helm: itemstat('Helm'),
                helmAquatic: itemstat('HelmAquatic'),
                helmAquaticIsAscended: isAscended('HelmAquatic'),
                helmIsAscended: isAscended('Helm'),
                leggings: itemstat('Leggings'),
                leggingsIsAscended: isAscended('Leggings'),
                ring1: itemstat('Ring1'),
                ring1IsAscended: isAscended('Ring1'),
                ring2: itemstat('Ring2'),
                ring2IsAscended: isAscended('Ring2'),
                shoulders: itemstat('Shoulders'),
                shouldersIsAscended: isAscended('Shoulders'),
                weaponA1: itemstat('WeaponA1'),
                weaponA1IsAscended: isAscended('WeaponA1'),
                weaponA2: itemstat('WeaponA2'),
                weaponA2IsAscended: isAscended('WeaponA2'),
                weaponAquaticA: itemstat('WeaponAquaticA'),
                weaponAquaticAIsAscended: isAscended('WeaponAquaticA'),
                weaponAquaticB: itemstat('WeaponAquaticB'),
                weaponAquaticBIsAscended: isAscended('WeaponAquaticB'),
                weaponB1: itemstat('WeaponB1'),
                weaponB1IsAscended: isAscended('WeaponB1'),
                weaponB2: itemstat('WeaponB2'),
                weaponB2IsAscended: isAscended('WeaponB2'),
            }
        };

        console.log(build);

        load(dispatch, build);
    });

    dispatch(setImportDialogVisible(false));
}
