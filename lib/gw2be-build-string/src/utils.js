import _ from 'lodash';

/* eslint-disable no-use-before-define */
const atob = atob || require('atob');
const btoa = btoa || require('btoa');
/* eslint-enable no-use-before-define */

/**
 * Converts data to a URL safe base64 encoded string.
 * @param {Uint8ClampedArray|Uint8Array|Array} data - The data.
 * @return {string} URL safe base64 encoded string.
 */
export function toBase64(data) {
    let array = data;
    if (!(array instanceof Uint8ClampedArray)) {
        array = new Uint8ClampedArray(array);
    }
    return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Converts a URL safe base64 encoded string to data.
 * @param {String} string - The URL safe base64 encoded string.
 * @return {Array} The data.
 */
export function fromBase64(string) {
    let str = string.replace(/-/g, '+').replace(/_/g, '/');
    return Array.from(atob(str)).map(c => c.charCodeAt(0));
}

export default {
    toBase64,
    fromBase64
};
