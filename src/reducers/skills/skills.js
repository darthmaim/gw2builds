import forEach from 'lodash/forEach';
import { handleAction } from 'redux-actions';
import * as actions from '../../actions';
import { handleSimpleAction } from '../../reducers/utils';

/** Reducer for the available skill ids for the current profession. */
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

export const availableSkillObjects = handleSimpleAction(actions.FETCH_AVAILABLE_SKILLS, {});

export const availableProfessionSkillObjects = handleAction(actions.FETCH_PROFESSION, (state, action) => {
    return action.payload.skills;
}, []);

export default {
    availableSkillIds,
    availableSkillObjects,
    availableProfessionSkillObjects
};
