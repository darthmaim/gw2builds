'use strict';

import { createAction } from 'redux-actions';
import fp from 'lodash/fp';

/**
 * Creates a chained action.
 * @param {function} action - The first action of the chain.
 * @param {function[]|function} dispatchChain - The following actions in the chain after the first action has been executed.
 * @return {function(...[*])} The chained action.
 */
export function createChainedAction(action, dispatchChain) {
    // Make sure it's an array
    if (!Array.isArray(dispatchChain)) {
        dispatchChain = [dispatchChain];
    }

    // Return a function that creates a function that's consumed by the redux-thunk middleware
    // The arguments are carried over to the inner action calls
    return (...args) => {
        return dispatch => {
            const toExecute = action.then ? action(...args) : Promise.resolve(action(...args));
            let disp = dispatch(toExecute);
            // Expand our dispatch chain into separate sequential dispatches
            for (let toDispatch of dispatchChain) {
                disp = disp.then(result => dispatch(toDispatch(result.payload)));
            }
            return disp;
        };
    };
}

/**
 * Creates a state aware action. A state aware action has the function `getState()` available in the payload.
 * @param {string} actionType - The action type id.
 * @param {function} [payloadCreator] - The payload creator function from redux-actions.
 * @param {function} [metaCreator] - The meta creator function from redux-actions.
 * @return {function(...[*])} The state aware action.
 */
export function createStateAwareAction(actionType, payloadCreator, metaCreator) {
    if (!payloadCreator) {
        payloadCreator = arg => arg;
    }
    return (...args) => {
        return (dispatch, getState) => {
            const newPayloadCreator = (...args) => {
                // Inject the getState function into the payload
                const payload = payloadCreator(...args);
                payload.getState = getState;
                return payload;
            };
            return dispatch(createAction(actionType, newPayloadCreator, metaCreator)(...args));
        };
    };
}

/**
 * Create a GW2 API action. A GW2 API action automatically sets the locale before giving focus to apiCall.
 * @param {string} actionType - The action type id.
 * @param {function(Object, Object, ...[*])} apiCall - The GW2 API client callback with the client as parameter.
 * @return {function(...[*])} The GW2 API action.
 */
export function createApiAction(actionType, apiCall) {
    return (...args) => {
        return (dispatch, getState, Gw2Api) => {
            return dispatch(createAction(actionType, (...args) => {
                return apiCall(getState(), Gw2Api.language(getState().language), ...args);
            })(...args));
        };
    };
}

/**
 * Converts an array to an object, indexed by the `id` property.
 * @param {Object[]} array - The array.
 * @return {Object.<number, Object>} The indexed object.
 */
export function convertToIndexed(array) {
    return fp.keyBy(i => i.id)(array);
}

export default {
    createChainedAction,
    createStateAwareAction,
    createApiAction,
    convertToIndexed
};
