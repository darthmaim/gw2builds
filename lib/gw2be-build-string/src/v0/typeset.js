import _ from 'lodash';
import { Type as jBinaryType, Template as jBinaryTemplate } from 'jbinary';
import { lcFirst, ucFirst } from 'change-case';

/**
 * Gets the bits required to encode a given numbered value.
 * @param {Number} value - The value.
 * @param {Number} [minBits] - The minimum amount of bits to use.
 * @return {Number} The amount of bits required to encode the value.
 */
export function getBitsRequiredToEncodeNumber(value, minBits) {
    if (!value) {
        return 1;
    }

    const bits = Math.floor(Math.log2(Math.max(value, 1))) + 1;
    return minBits ? Math.max(minBits, bits) : bits;
}

/**
 * ADDING A NEW DATA FIELD:
 *  - If the data field has to be stored in a new block, add a new block first
 *  - Add the new data field to the corresponding block
 *  - If the data field uses a new custom number type, add a new custom number type first
 *  - If the data field uses a new and/or existing custom number type, add its path in customTypes below.
 */

const customTypes = {
    itemstat: [
        'gearStats.weaponA1',
        'gearStats.weaponA2',
        'gearStats.weaponB1',
        'gearStats.weaponB2',
        'gearStats.weaponAquaticA',
        'gearStats.weaponAquaticB',
        'gearStats.helm',
        'gearStats.shoulders',
        'gearStats.coat',
        'gearStats.gloves',
        'gearStats.leggings',
        'gearStats.boots',
        'gearStats.helmAquatic',
        'gearStats.backpack',
        'gearStats.accessory1',
        'gearStats.accessory2',
        'gearStats.amulet',
        'gearStats.ring1',
        'gearStats.ring2'
    ],
    pet: [
        'professionRanger.petA',
        'professionRanger.petB',
        'professionRanger.petAquaticA',
        'professionRanger.petAquaticB'
    ],
    skill: [
        'skills.healing',
        'skills.utility1',
        'skills.utility2',
        'skills.utility3',
        'skills.elite'
    ],
    specialization: [
        'specialization1.specialization',
        'specialization2.specialization',
        'specialization3.specialization'
    ],
    trait: [
        'specialization1.majorTrait1',
        'specialization1.majorTrait2',
        'specialization1.majorTrait3',
        'specialization2.majorTrait1',
        'specialization2.majorTrait2',
        'specialization2.majorTrait3',
        'specialization3.majorTrait1',
        'specialization3.majorTrait2',
        'specialization3.majorTrait3'
    ]
};

/**
 * ADDING A NEW BLOCK:
 *  - Define a new type called "BlockData<name>" where <name> is the block's name
 *  - Set the base types (for an example, check the existing ones)
 *  - Add the newly added type to EnumBlockId with a unique block id
 *
 * ADDING A NEW CUSTOM NUMBER TYPE:
 *  - Add a new property to Types (for an example, check the existing ones)
 *  - Change the _reserved property if needed (these types have a 5-bits value each)
 *
 * ADDING A NEW ENUM:
 *  - Add a new type called "Enum<name>" where <name> is the enum's name
 *  - Set the enumerator values (for an example, check the existing ones)
 *  - Be sure to give the enum a number as base type; this will cause it to use a bitfield type as base
 *    (use the maximum amount of bits required to store the maximum enum value)
 */

export default {
    bool: jBinaryTemplate({
        setParams() {
            this.baseType = 1;
        },
        read() {
            return this.baseRead() === 1;
        },
        write(data) {
            this.baseWrite(data ? 1 : 0);
        }
    }),

    Align: jBinaryType({
        read() {
            this.binary.view.alignBy();
        },
        write() {
            this.binary.view.alignBy();
        }
    }),

    SkipBits: jBinaryTemplate({
        setParams(length) {
            this.baseType = length;
        },
        read() {
            this.baseRead();
        },
        write(data) {
            this.baseWrite(data);
        }
    }),

    TypeBits: jBinaryTemplate({
        setParams() {
            this.baseType = 5;
        },
        read() {
            return this.baseRead() + 1;
        },
        write(data) {
            this.baseWrite(data - 1);
        }
    }),

    Types: {
        _unused: ['SkipBits', 2],
        _reserved: ['SkipBits', 5],
        itemstat: 'TypeBits',
        pet: 'TypeBits',
        skill: 'TypeBits',
        trait: 'TypeBits',
        specialization: 'TypeBits'
    },

    EnumGameMode: ['enum', 2, {
        1: 'pve',
        2: 'pvp',
        3: 'wvw'
    }],

    EnumProfession: ['enum', 4, {
        1: 'Guardian',
        2: 'Revenant',
        3: 'Warrior',
        4: 'Engineer',
        5: 'Ranger',
        6: 'Thief',
        7: 'Elementalist',
        8: 'Mesmer',
        9: 'Necromancer'
    }],

    EnumRace: ['enum', 3, {
        1: 'Asura',
        2: 'Charr',
        3: 'Human',
        4: 'Norn',
        5: 'Sylvari'
    }],

    EnumWeapon: ['enum', 5, {
        1: 'Axe',
        2: 'Dagger',
        3: 'Mace',
        4: 'Pistol',
        5: 'Sword',
        6: 'Scepter',
        7: 'Focus',
        8: 'Shield',
        9: 'Torch',
        10: 'Warhorn',
        11: 'Greatsword',
        12: 'Hammer',
        13: 'Longbow',
        14: 'Rifle',
        15: 'Short bow',
        16: 'Staff'
    }],

    EnumWeaponAquatic: ['enum', 2, {
        1: 'Harpoon gun',
        2: 'Spear',
        3: 'Trident'
    }],

    EnumLegend: ['enum', 4, {
        1: 'Assassin',
        2: 'Demon',
        3: 'Dwarf',
        4: 'Centaur',
        5: 'Dragon',
        6: 'Renegade'
    }],

    EnumAttunement: ['enum', 3, {
        1: 'Fire',
        2: 'Water',
        3: 'Air',
        4: 'Earth'
    }],

    BlockId: 'uint8',

    EnumBlockId: ['enum', 'BlockId', {
        1: 'BlockDataGeneral',
        11: 'BlockDataSpecialization1',
        12: 'BlockDataSpecialization2',
        13: 'BlockDataSpecialization3',
        21: 'BlockDataWeapons',
        22: 'BlockDataSkills',
        31: 'BlockDataProfessionGuardian',
        32: 'BlockDataProfessionRevenant',
        33: 'BlockDataProfessionWarrior',
        34: 'BlockDataProfessionEngineer',
        35: 'BlockDataProfessionRanger',
        36: 'BlockDataProfessionThief',
        37: 'BlockDataProfessionElementalist',
        38: 'BlockDataProfessionMesmer',
        39: 'BlockDataProfessionNecromancer',
        41: 'BlockDataGearStats'
    }],

    BlockDataGeneral: jBinaryTemplate({
        setParams() {
            this.baseType = {
                build: 17,
                gameMode: 'EnumGameMode',
                profession: 'EnumProfession',
                race: 'EnumRace',
                _align: 'Align' // Currently 6 bits unused
            };
        },
        read() {
            const data = this.baseRead();
            // Convert build
            data.build += 65536;
            return data;
        },
        write(data) {
            const _data = Object.assign({}, data);
            // Convert build
            _data.build = Math.min(Math.max(_data.build - 65536, 0), 65535);
            // Convert race if game mode is PvP
            if (_data.gameMode === 'pvp') {
                _data.race = undefined;
            }
            this.baseWrite(_data);
        }
    }),

    BlockDataSpecialization: jBinaryTemplate({
        setParams(types) {
            this.baseType = {
                specialization: types.specialization,
                majorTrait1: types.trait,
                majorTrait2: types.trait,
                majorTrait3: types.trait,
                _align: 'Align'
            };
        }
    }),
    BlockDataSpecialization1: 'BlockDataSpecialization',
    BlockDataSpecialization2: 'BlockDataSpecialization',
    BlockDataSpecialization3: 'BlockDataSpecialization',

    BlockDataWeapons: jBinaryTemplate({
        setParams() {
            this.baseType = {
                weaponA1: 'EnumWeapon',
                weaponA2: 'EnumWeapon',
                weaponB1: 'EnumWeapon',
                weaponB2: 'EnumWeapon',
                aquaticA: 'EnumWeaponAquatic',
                aquaticB: 'EnumWeaponAquatic',
                _align: 'Align'
            };
        }
    }),

    BlockDataSkills: jBinaryTemplate({
        setParams(types) {
            this.baseType = {
                healing: types.skill,
                utility1: types.skill,
                utility2: types.skill,
                utility3: types.skill,
                elite: types.skill,
                _align: 'Align'
            };
        }
    }),

    BlockDataProfessionReserved: jBinaryTemplate({
        setParams() {
            this.baseType = {
                _align: 'Align'
            };
        }
    }),

    BlockDataProfessionGuardian: 'BlockDataProfessionReserved',

    BlockDataProfessionRevenant: jBinaryTemplate({
        setParams() {
            this.baseType = {
                legendA: 'EnumLegend',
                legendB: 'EnumLegend',
                _align: 'Align'
            };
        }
    }),

    BlockDataProfessionWarrior: 'BlockDataProfessionReserved',

    BlockDataProfessionEngineer: 'BlockDataProfessionReserved',

    BlockDataProfessionRanger: jBinaryTemplate({
        setParams(types) {
            this.baseType = {
                petA: types.pet,
                petB: types.pet,
                petAquaticA: types.pet,
                petAquaticB: types.pet,
                _align: 'Align'
            };
        }
    }),

    BlockDataProfessionThief: 'BlockDataProfessionReserved',

    BlockDataProfessionElementalist: jBinaryTemplate({
        setParams() {
            this.baseType = {
                attunement: 'EnumAttunement',
                prevAttunementWeaver: 'EnumAttunement',
                _align: 'Align'
            };
        }
    }),

    BlockDataProfessionMesmer: 'BlockDataProfessionReserved',

    BlockDataProfessionNecromancer: 'BlockDataProfessionReserved',

    BlockDataGearStats: jBinaryTemplate({
        setParams(types) {
            this.baseType = {
                weaponA1: types.itemstat,
                weaponA2: types.itemstat,
                weaponB1: types.itemstat,
                weaponB2: types.itemstat,
                weaponAquaticA: types.itemstat,
                weaponAquaticB: types.itemstat,
                helm: types.itemstat,
                shoulders: types.itemstat,
                coat: types.itemstat,
                gloves: types.itemstat,
                leggings: types.itemstat,
                boots: types.itemstat,
                helmAquatic: types.itemstat,
                backpack: types.itemstat,
                accessory1: types.itemstat,
                accessory2: types.itemstat,
                amulet: types.itemstat,
                ring1: types.itemstat,
                ring2: types.itemstat,
                weaponA1IsAscended: 'bool',
                weaponA2IsAscended: 'bool',
                weaponB1IsAscended: 'bool',
                weaponB2IsAscended: 'bool',
                weaponAquaticAIsAscended: 'bool',
                weaponAquaticBIsAscended: 'bool',
                helmIsAscended: 'bool',
                shouldersIsAscended: 'bool',
                coatIsAscended: 'bool',
                glovesIsAscended: 'bool',
                leggingsIsAscended: 'bool',
                bootsIsAscended: 'bool',
                helmAquaticIsAscended: 'bool',
                backpackIsAscended: 'bool',
                accessory1IsAscended: 'bool',
                accessory2IsAscended: 'bool',
                amuletIsAscended: 'bool',
                ring1IsAscended: 'bool',
                ring2IsAscended: 'bool',
                _align: 'Align'
            };
        }
    }),

    Block: jBinaryTemplate({
        setParams(types) {
            this.baseType = {
                id: 'EnumBlockId',
                data: jBinaryTemplate({
                    getBaseType: context => [context.id, types]
                })
            };
        },
        read() {
            return this.baseRead();
        },
        write(data) {
            if (data.data) {
                for (const key of Object.keys(data.data)) {
                    if (data.data[key]) {
                        // We only write the data when at least one property has actual data in it
                        this.baseWrite(data);
                        break;
                    }
                }
            }
        }
    }),

    BlocksArray: jBinaryTemplate({
        setParams(types) {
            this.baseType = ['array', ['Block', types]];
        }
    }),

    BuildSettings: jBinaryTemplate({
        setParams() {
            this.baseType = {
                types: 'Types',
                blocks: jBinaryTemplate({
                    getBaseType: context => ['BlocksArray', context.types]
                })
            };
        },
        read() {
            const data = {};
            for (const block of this.baseRead().blocks) {
                if (block.id) {
                    data[lcFirst(block.id.replace('BlockData', ''))] = block.data;
                }
            }
            return data;
        },
        write(data) {
            // Create blocks
            const generalBlock = data.general;
            const blocks = _.map(data, (blockData, blockId) => ({
                id: `BlockData${ucFirst(blockId)}`,
                data: blockData
            })).filter(block => {
                // Filter profession blocks
                return !(block.id.startsWith('BlockDataProfession') && block.id !== `BlockDataProfession${ucFirst(generalBlock.profession)}`);
            });

            // Determine types
            const types = _.mapValues(customTypes, list => {
                let bits = 1;
                for (const path of list) {
                    bits = getBitsRequiredToEncodeNumber(_.at(data, path), bits);
                }
                return bits;
            });

            this.baseWrite({ types, blocks });
        }
    })
};
