import { createAction } from 'redux-actions';
import { createApiAction, convertToIndexed, createChainedAction } from './utils';

export const FETCH_AVAILABLE_SKILLS = 'FETCH_AVAILABLE_SKILLS';
export const SET_SELECTED_SKILL_ID = 'SET_SELECTED_SKILL_ID';
export const WIPE_ALL_SELECTED_SKILL_IDS = 'WIPE_ALL_SELECTED_SKILL_IDS';

const skillIdProviders = [
    (state) => state.availableSkillIds,
    (state) => state.availableEngineerToolbeltSkillIds
];

/** Action to fetch the available skills from the GW2 API. */
export const fetchAvailableSkills = createApiAction(
    FETCH_AVAILABLE_SKILLS,
    (state, api) => api.skills().many(
        [].concat.apply([], skillIdProviders.map(
            (provider) => provider(state)
        ))
    ).then(convertToIndexed)
);

/** Action to fetch skills and related skills from the GW2 API. */
export const fetchAvailableSkillsWithRelated = createChainedAction(
    fetchAvailableSkills,
    [fetchAvailableSkills]
);

/** Action to set a selected skill id. Params: { slotId, skillId } */
export const setSelectedSkillId = createAction(SET_SELECTED_SKILL_ID);

/** Action to wipe the selected skills. Params: { } */
export const wipeAllSelectedSkillIds = createAction(WIPE_ALL_SELECTED_SKILL_IDS);

export default {
    FETCH_AVAILABLE_SKILLS,
    SET_SELECTED_SKILL_ID,
    WIPE_ALL_SELECTED_SKILL_IDS,

    fetchAvailableSkills,
    fetchAvailableSkillsWithRelated,
    setSelectedSkillId,
    wipeAllSelectedSkillIds
};
