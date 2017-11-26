/**
 * Returns the value in an object at the given path. Supports sub-paths indicated with a dot.
 * @param {Object} obj - The object.
 * @param {string} path - The path.
 * @returns {*} The value.
 */
export function at(obj, path) {
    const splitPath = path.split('.');
    let result = obj;
    while (splitPath.length > 0) {
        if (!result[splitPath[0]]) {
            return undefined;
        }
        result = result[splitPath[0]];
        splitPath.splice(0, 1);
    }
    return result;
}

export default {
    at
};
