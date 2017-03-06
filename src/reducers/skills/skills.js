import forEach from 'lodash/forEach';
import { handleAction } from 'redux-actions';
import * as actions from '../../actions';
import { handleSimpleAction } from '../utils';

/** Reducer for the available skill ids for the current profession. */
export const skillIds = handleAction(actions.FETCH_PROFESSION, (state, action) => {
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

export const professionSkills = handleAction(actions.FETCH_PROFESSION, (state, action) => {
    return action.payload.skills;
}, []);

export const skills = handleSimpleAction(actions.FETCH_SKILLS, {});

export default {
    skillIds,
    professionSkills,
    skills
};
