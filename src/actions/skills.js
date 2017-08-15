import { createAction } from 'redux-actions';
import { createApiAction, convertToIndexed } from './utils';

export const SET_SELECTED_SKILL_ID = 'SET_SELECTED_SKILL_ID';
export const WIPE_ALL_SELECTED_SKILL_IDS = 'WIPE_ALL_SELECTED_SKILL_IDS';

export const FETCH_AVAILABLE_SKILLS = 'FETCH_AVAILABLE_SKILLS';

/** Action to set a specific skill. Params: { slotId, skillId } */
export const setSelectedSkillId = createAction(SET_SELECTED_SKILL_ID);

/** Action to wipe the selected skills. Params: { } */
export const wipeAllSelectedSkillIds = createAction(WIPE_ALL_SELECTED_SKILL_IDS);

export const fetchAvailableSkills = createApiAction(
    FETCH_AVAILABLE_SKILLS,
    (state, api) => api.skills().many(state.availableSkillIds).then(convertToIndexed)
);

export default {
    SET_SELECTED_SKILL_ID,
    WIPE_ALL_SELECTED_SKILL_IDS,

    FETCH_AVAILABLE_SKILLS,

    setSelectedSkillId,
    wipeAllSelectedSkillIds,

    fetchAvailableSkills
};
