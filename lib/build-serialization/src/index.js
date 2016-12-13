import { toBase64, fromBase64 } from './utils';
import { serialize as serializeV0, deserialize as deserializeV0 } from './v0';

/**
 * Serializes data.
 * @param {Object<String, *>} data - The raw data to serialize, see docs/build-serialization.md for more information.
 * @param {Boolean} [base64=true] - Whether to serialize into base64 or not.
 * @return {Uint8Array|String} The serialized data.
 */
export function serialize(data, base64) {
    // Default to latest version
    const _data = [0].concat(serializeV0(data));

    return base64 === true || base64 === undefined || base64 === null ? toBase64(_data) : _data;
}

/**
 * Deserializes data.
 * @param {Uint8ClampedArray|Uint8Array|Array<Number>|String} data - The raw data to deserialize, see docs/build-serialization.md for more information.
 * @return {Object<String, *>|undefined} The deserialized data, or undefined if the version is not supported.
 */
export function deserialize(data) {
    const _data = typeof(data) === 'string' ? fromBase64(data) : data;

    // Get the version (stored in the first byte)
    const version = _data[0];

    switch (version) {
        case 0: return deserializeV0(_data.slice(1));
    }
}

export default {
    serialize,
    deserialize
};
