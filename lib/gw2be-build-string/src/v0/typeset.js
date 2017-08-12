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
    Align: jBinaryType({
        read: function () {
            this.binary.view.alignBy();
        },
        write: function () {
            this.binary.view.alignBy();
        }
    }),

    SkipBits: jBinaryTemplate({
        setParams: function (length) {
            this.baseType = length;
        },
        read: function () {
            this.baseRead();
        },
        write: function (data) {
            this.baseWrite(data);
        }
    }),

    TypeBits: jBinaryTemplate({
        setParams: function () {
            this.baseType = 5;
        },
        read: function () {
            return this.baseRead() + 1;
        },
        write: function (data) {
            this.baseWrite(data - 1);
        }
    }),

    Types: {
        _unused: ['SkipBits', 2],
        _reserved: ['SkipBits', 20],
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

    BlockId: 'uint8',

    EnumBlockId: ['enum', 'BlockId', {
        1: 'BlockDataGeneral',
        11: 'BlockDataSpecialization1',
        12: 'BlockDataSpecialization2',
        13: 'BlockDataSpecialization3',
        21: 'BlockDataWeapons'
    }],

    BlockDataGeneral: jBinaryTemplate({
        setParams: function () {
            this.baseType = {
                build: ['bitfield', 17],
                gameMode: 'EnumGameMode',
                profession: 'EnumProfession',
                race: 'EnumRace',
                _align: 'Align' // Currently 6 bits unused
            };
        },
        read: function () {
            const data = this.baseRead();
            // Convert build
            data.build += 65536;
            return data;
        },
        write: function (data) {
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
        setParams: function (types) {
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
        setParams: function (types) {
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

    Block: jBinaryTemplate({
        setParams: function (types) {
            this.baseType = {
                id: 'EnumBlockId',
                data: jBinaryTemplate({
                    getBaseType: context => [context.id, types]
                })
            };
        },
        read: function () {
            return this.baseRead();
        },
        write: function (data) {
            if (data.data) {
                for (let key of Object.keys(data.data)) {
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
        setParams: function (types) {
            this.baseType = ['array', ['Block', types]];
        }
    }),

    BuildSettings: jBinaryTemplate({
        setParams: function () {
            this.baseType = {
                types: 'Types',
                blocks: jBinaryTemplate({
                    getBaseType: context => ['BlocksArray', context.types]
                })
            };
        },
        read: function () {
            const data = {};
            for (let block of this.baseRead().blocks) {
                data[lcFirst(block.id.replace('BlockData', ''))] = block.data;
            }
            return data;
        },
        write: function (data) {
            // Determine types first
            const types = _.mapValues(customTypes, list => {
                let bits = 1;
                for (let path of list) {
                    bits = getBitsRequiredToEncodeNumber(_.at(data, path), bits);
                }
                return bits;
            });
            // Create blocks
            const blocks = _.map(data, (blockData, blockId) => ({
                id: `BlockData${ucFirst(blockId)}`,
                data: blockData
            }));
            this.baseWrite({ types, blocks });
        }
    })
};
