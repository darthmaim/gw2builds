'use strict';

import { createAction } from 'redux-actions';
import { createApiAction, convertToIndexed } from './utils';

export const FETCH_TRAITS = 'FETCH_TRAITS';
export const SET_MAJOR_TRAIT = 'SET_MAJOR_TRAIT';
export const WIPE_ACTIVE_TRAITS = 'WIPE_ACTIVE_TRAITS';
export const WIPE_ALL_ACTIVE_TRAITS = 'WIPE_ALL_ACTIVE_TRAITS';

/** Action to fetch the current traits from the GW2 API. */
export const fetchTraits = createApiAction(
    FETCH_TRAITS,
    (state, api) => api.traits().many(state.traitIds).then(convertToIndexed)
);

/** Action to set a specific major trait in a trait tier of a specialization line. Params: { specializationLine, traitTier, traitId } */
export const setMajorTrait = createAction(SET_MAJOR_TRAIT);

/** Action to wipe the active traits of a specific specialization line. Params: { specializationLine } */
export const wipeActiveTraits = createAction(WIPE_ACTIVE_TRAITS);

/** Action to wipe all active traits of every specialization lines. Params: {} */
export const wipeAllActiveTraits = createAction(WIPE_ALL_ACTIVE_TRAITS);

export default {
    FETCH_TRAITS,
    SET_MAJOR_TRAIT,
    WIPE_ACTIVE_TRAITS,
    WIPE_ALL_ACTIVE_TRAITS,

    fetchTraits,
    setMajorTrait,
    wipeActiveTraits,
    wipeAllActiveTraits
};
