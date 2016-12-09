'use strict';

export { default as serialize } from './versions/v0';

/**
 * Converts the serialized data to a URL safe base64 encoded string.
 * @param {Uint8Array} data - The serialized data.
 * @return {string} URL safe base64 encoded string.
 */
export function toBase64(data) {
    return btoa(String.fromCharCode.apply(null, data)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
