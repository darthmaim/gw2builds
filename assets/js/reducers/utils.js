import { handleAction } from 'redux-actions';

/**
 * A generalized reducer function for handling simple actions.
 * @param {string} actionType - The action type id.
 * @param {*} defaultState - The default state of the reducer.
 * @param {string} [prop] - The property name of the payload item.
 * @return {*} The reducer.
 */
export function handleSimpleAction(actionType, defaultState, prop) {
    return handleAction(actionType, (state, action) => prop ? action.payload[prop] : action.payload, defaultState);
}

/**
 * Swaps two elements in an array in place.
 * @param {*[]} array - The array.
 * @param {number} posA - First position.
 * @param {number} posB - Second position.
 */
export function swapElements(array, posA, posB) {
    const temp = array[posA];
    array[posA] = array[posB];
    array[posB] = temp;
}

export default {
    handleSimpleAction,
    swapElements
};
