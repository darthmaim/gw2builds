import { createAction } from 'redux-actions';
import { createApiAction, convertToIndexed } from './utils';

export const SET_ACTIVE_WEAPON_SET = 'SET_ACTIVE_WEAPON_SET';

export const SET_SELECTED_MAINHAND_WEAPON_ID = 'SET_SELECTED_MAINHAND_WEAPON_ID';
export const SET_SELECTED_OFFHAND_WEAPON_ID = 'SET_SELECTED_OFFHAND_WEAPON_ID';
export const WIPE_ALL_SELECTED_WEAPON_IDS = 'WIPE_ALL_SELECTED_WEAPON_IDS';

export const SET_SELECTED_SKILL_ID = 'SET_SELECTED_SKILL_ID';
export const WIPE_ALL_SELECTED_SKILL_IDS = 'WIPE_ALL_SELECTED_SKILL_IDS';

export const SET_ACTIVE_ATTUNEMENT = 'SET_ACTIVE_ATTUNEMENT';

export const FETCH_AVAILABLE_SKILLS = 'FETCH_AVAILABLE_SKILLS';

/** Action to swap two set specializations with each other. Params: { specializationLine1, specializationLine2 } */
export const setActiveWeaponSet = createAction(SET_ACTIVE_WEAPON_SET);

/** Action to set a specific mainhand weapon. Params: { weaponSet, weaponId } */
export const setSelectedMainhandWeaponId = createAction(SET_SELECTED_MAINHAND_WEAPON_ID);
export const setActiveMainhandWeaponId = createAction(SET_SELECTED_MAINHAND_WEAPON_ID, payload => ({ weaponSet: payload.activeWeaponSet, weaponId: payload.weaponId }));

/** Action to set a specific offhand weapon. Params: { weaponSet, weaponId } */
export const setSelectedOffhandWeaponId = createAction(SET_SELECTED_OFFHAND_WEAPON_ID);
export const setActiveOffhandWeaponId = createAction(SET_SELECTED_OFFHAND_WEAPON_ID, payload => ({ weaponSet: payload.activeWeaponSet, weaponId: payload.weaponId }));

export const wipeAllSelectedWeaponIds = createAction(WIPE_ALL_SELECTED_WEAPON_IDS);

/** Action to set a specific skill. Params: { slotId, skillId } */
export const setSelectedSkillId = createAction(SET_SELECTED_SKILL_ID);

/** Action to wipe the selected skills. Params: { } */
export const wipeAllSelectedSkillIds = createAction(WIPE_ALL_SELECTED_SKILL_IDS);

export const setActiveAttunement = createAction(SET_ACTIVE_ATTUNEMENT);

export const fetchAvailableSkills = createApiAction(
    FETCH_AVAILABLE_SKILLS,
    (state, api) => api.skills().many(state.availableSkillIds).then(convertToIndexed)
);

export default {
    SET_ACTIVE_WEAPON_SET,

    SET_SELECTED_MAINHAND_WEAPON_ID,
    SET_SELECTED_OFFHAND_WEAPON_ID,
    WIPE_ALL_SELECTED_WEAPON_IDS,

    SET_SELECTED_SKILL_ID,
    WIPE_ALL_SELECTED_SKILL_IDS,

    SET_ACTIVE_ATTUNEMENT,

    FETCH_AVAILABLE_SKILLS,

    setActiveWeaponSet,

    setSelectedMainhandWeaponId,
    setActiveMainhandWeaponId,
    setSelectedOffhandWeaponId,
    setActiveOffhandWeaponId,
    wipeAllSelectedWeaponIds,

    setSelectedSkillId,
    wipeAllSelectedSkillIds,

    setActiveAttunement,

    fetchAvailableSkills
};
