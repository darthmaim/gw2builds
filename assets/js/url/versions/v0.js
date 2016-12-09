'use strict';

import _ from 'lodash';

/**
 * The mappings.
 * @type {object<number, object<string, string>>}
 */
const mapping = {
    // Id ranges from 0 - 255 (8-byte integer)
    1: {
        build: 'u:build',
        gameMode: 'e:gameMode',
        profession: 'e:profession',
        race: 'e:race'
    },
    11: {
        specialization1: 'u:specialization',
        majorTrait11: 'u:trait',
        majorTrait12: 'u:trait',
        majorTrait13: 'u:trait'
    },
    12: {
        specialization2: 'u:specialization',
        majorTrait21: 'u:trait',
        majorTrait22: 'u:trait',
        majorTrait23: 'u:trait'
    },
    13: {
        specialization3: 'u:specialization',
        majorTrait31: 'u:trait',
        majorTrait32: 'u:trait',
        majorTrait33: 'u:trait'
    }
};

/**
 * The available enumerators.
 * @type {object<string, object<string, number>>}
 */
const enums = {
    gameMode: {
        pve: 1,
        pvp: 2,
        wvw: 3
    },
    profession: {
        guardian: 1,
        revenant: 2,
        warrior: 3,
        engineer: 4,
        ranger: 5,
        thief: 6,
        elementalist: 7,
        mesmer: 8,
        necromancer: 9
    },
    race: {
        asura: 1,
        charr: 2,
        human: 3,
        norn: 4,
        sylvari: 5
    }
};

/**
 * Determines the amount of bits there have to be used for variable bit-width values.
 * @param {object<string, *>} data - The raw data, see docs/url.md for more information.
 * @return {object<string, number>} The amount of bits needed per type.
 */
function determineStoreBits(data) {
    const bits = {};
    _.forOwn(mapping, map => _.forOwn(map, (type, name) => {
        const _type = type.split(':');
        const storeType = _type[0];
        let value = data[name];
        let storeBits = 1;
        if (storeType === 'e') {
            // Enum, get the highest possible value
            value = _.max(_.values(enums[_type[1]]));
        }
        if (value !== undefined && value !== null) {
            storeBits = Math.max(Math.min(Math.floor(Math.log2(value)) + 1, 32), storeBits); // Range 1-32 bits
        }
        if (!bits[type] || bits[type] < storeBits) {
            bits[type] = storeBits;
        }
    }));
    return bits;
}

/**
 * Serializes the amount of bits needed to encode/decode variable bit-width values.
 * @param {object<string, number>} bits - The bit dictionary.
 * @param {DataView} view - The data view.
 * @param {number} offset - The current offset to serialize the data to.
 * @return {number} The amount of bytes written.
 */
function serializeBitUsage(bits, view, offset) {
    // These bits are stored from right to left
    // Bit 0-4: build - TODO: this one might be redundant
    // Bit 5-9: specialization
    // Bit 10-14: trait
    // Bit 15-19: reserved
    // Bit 20-24: reserved
    // Bit 25-29: reserved
    const bitVal = (bits['u:build'] ? (bits['u:build'] & 0x1F) : 0) |
        (bits['u:specialization'] ? (bits['u:specialization'] & 0x1F) << 5 : 0) |
        (bits['u:trait'] ? (bits['u:trait'] & 0x1F) << 10 : 0);
    view.setUint32(offset, bitVal);
    return 4;
}

/**
 * Serializes a data block.
 * @param {number} id - The unique id that identifies this block.
 * @param {object<string, *>} data - The raw data, see docs/url.md for more information.
 * @param {object<string, number>} bits - The bit dictionary.
 * @param {DataView} view - The data view
 * @param {number} offset - The current offset to serialize the data to.
 * @return {number} The amount of bytes written.
 */
function serializeBlock(id, data, bits, view, offset) {
    let bytesWritten = 1; // Simulate that we have written the block id that will only be written at the end if the block is used
    let bitsFree = 0;
    let blockUsed = false;

    _.forOwn(mapping[id], (type, name) => {
        const _type = type.split(':');
        const storeType = _type[0];
        let value = data[name] || 0; // If value doesn't happen to exist, set to 0
        if (storeType === 'e') {
            // Enum, replace the value with the actual value
            value = enums[_type[1]][value];
        }
        const bitsUsage = bits[type];

        if (value !== 0) {
            // Any value that does not equal 0 means that the block has to be stored
            // If none of the values in this block meets this requirement, it's assumed the block is not used
            // and will therefore not be stored
            blockUsed = true;
        }

        // The values are tightly packed together when stored (meaning no gabs)
        // The bits are stored in sequence and no special transformation is used
        // If valueA is '011011001', it stores '01101100 10000000' with 7 bits free for the next value
        // If valueB is '0101', it stores (combined with A) '01101100 10101000' with 3 bits free for the next value
        if (bitsFree > 0) {
            // Store a maximum of bitsFree bits of value in the previous byte
            let prevByte = view.getUint8(offset + bytesWritten - 1);
            const shift = bitsUsage - bitsFree;
            if (shift >= 0) {
                prevByte |= value >>> shift;
                view.setUint8(offset + bytesWritten - 1, prevByte);
                value = (value & (1 << shift) - 1) << (32 - shift); // Remaining value to store, shifted to the most-left side of a 32-bit uint
                view.setUint32(offset + bytesWritten, value);
                const addedBytes = Math.ceil(shift / 8);
                bytesWritten += addedBytes;
                bitsFree = (addedBytes * 8) - shift;
            } else {
                prevByte |= value << -shift;
                view.setUint8(offset + bytesWritten - 1, prevByte);
                bitsFree -= bitsUsage;
            }
        } else {
            value <<= 32 - bitsUsage; // Shift the value to the most-left side of a 32-bit uint
            view.setUint32(offset + bytesWritten, value);
            const addedBytes = Math.ceil(bitsUsage / 8);
            bytesWritten += addedBytes;
            bitsFree = (addedBytes * 8) - bitsUsage;
        }
    });

    if (blockUsed) {
        view.setUint8(offset, id);
        return bytesWritten;
    }
    return 0;
}

/**
 * Serializes data.
 * @param {object<string, *>} data - The raw data to serialize, see docs/url.md for more information.
 * @return {Uint8Array} The serialized data.
 */
function serialize(data) {
    const buffer = new ArrayBuffer(64); // TODO: Find a way to determine the size beforehand
    const view = new DataView(buffer);
    const bits = determineStoreBits(data);
    let offset = 0;

    // Version
    view.setUint8(offset, 0);
    offset += 1;

    // Number of bits usage
    offset += serializeBitUsage(bits, view, offset);

    // Write blocks
    for (let id of Object.keys(mapping)) {
        offset += serializeBlock(id, data, bits, view, offset);
    }

    return new Uint8Array(buffer.slice(0, offset));
}

export default serialize;
