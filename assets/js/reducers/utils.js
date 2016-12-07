'use strict';

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

export default {
    handleSimpleAction
};
