import forEach from 'lodash/forEach';
import { handleAction, handleActions } from 'redux-actions';
import * as actions from '../actions';
import { handleSimpleAction } from './utils';

/** Reducer for the available skill ids for the selected profession. */
export const availableSkillIds = handleAction(actions.FETCH_PROFESSION, (state, action) => {
    const skills = [];

    forEach(action.payload.weapons, weapon => {
        forEach(weapon.skills, skill => skills.push(skill.id));
    });

    forEach(action.payload.training, training => {
        forEach(training.track, skill => skill.type === 'Skill' && skills.push(skill.skill_id));
    });

    forEach(action.payload.skills, skill => {
        skills.push(skill.id);
    });

    return skills;
}, []);

/** Reducer for the available skill objects for the selected profession. */
export const availableSkillObjects = handleSimpleAction(actions.FETCH_AVAILABLE_SKILLS, {});

/** Reducer for the available profession skill objects for the selected profession. */
export const availableProfessionSkillObjects = handleAction(actions.FETCH_PROFESSION, (state, action) => action.payload.skills, []);

/** Reducer for the selected skill ids. */
export const selectedSkillIds = handleActions({
    // Set the skill id
    [actions.SET_SELECTED_SKILL_ID]: (state, action) => {
        const { slotId, skillId } = action.payload;

        // swap skills if the new skill is already equipped in another slot
        const newState = state.map((id) => id === skillId ? state[slotId] : id);

        // set skill
        newState[slotId] = skillId;

        return newState;
    },

    // Reset all skill ids
    [actions.WIPE_ALL_SELECTED_SKILL_IDS]: () => [],
    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    availableSkillIds,
    availableSkillObjects,
    availableProfessionSkillObjects,
    selectedSkillIds
};
