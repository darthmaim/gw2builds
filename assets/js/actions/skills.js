import { createAction } from 'redux-actions';
import { createApiAction, convertToIndexed } from './utils';

export const SET_ACTIVE_WEAPON_SET = 'SET_ACTIVE_WEAPON_SET';

export const SET_ACTIVE_MAINHAND_WEAPON_ID = 'SET_ACTIVE_MAINHAND_WEAPON_ID';
export const SET_ACTIVE_OFFHAND_WEAPON_ID = 'SET_ACTIVE_OFFHAND_WEAPON_ID';
export const WIPE_ALL_SELECTED_WEAPON_IDS = 'WIPE_ALL_SELECTED_WEAPON_IDS';

export const SET_ATTUNEMENT = 'SET_ATTUNEMENT';

export const FETCH_AVAILABLE_SKILLS = 'FETCH_AVAILABLE_SKILLS';

/** Action to swap two set specializations with each other. Params: { specializationLine1, specializationLine2 } */
export const setActiveWeaponSet = createAction(SET_ACTIVE_WEAPON_SET);

export const setActiveMainhandWeaponId = createAction(SET_ACTIVE_MAINHAND_WEAPON_ID);
export const setActiveOffhandWeaponId = createAction(SET_ACTIVE_OFFHAND_WEAPON_ID);
export const wipeAllSelectedWeaponIds = createAction(WIPE_ALL_SELECTED_WEAPON_IDS);

export const setAttunement = createAction(SET_ATTUNEMENT);

export const fetchAvailableSkills = createApiAction(
    FETCH_AVAILABLE_SKILLS,
    (state, api) => api.skills().many(state.availableSkillIds).then(convertToIndexed)
);

export default {
    SET_ACTIVE_WEAPON_SET,

    SET_ACTIVE_MAINHAND_WEAPON_ID,
    SET_ACTIVE_OFFHAND_WEAPON_ID,
    WIPE_ALL_SELECTED_WEAPON_IDS,

    SET_ATTUNEMENT,

    FETCH_AVAILABLE_SKILLS,

    setActiveWeaponSet,

    setActiveMainhandWeaponId,
    setActiveOffhandWeaponId,
    wipeAllSelectedWeaponIds,

    setAttunement,

    fetchAvailableSkills
};
